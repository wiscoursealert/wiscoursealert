const Queue = require("bee-queue");
const redis = require("redis");

const config = require("../config");
const defaultResponder = require("../services/responder");
let responder = defaultResponder;                                                        // TODO: find a better pattern

const setResponder = (responder=null) => {
  if(responder != null){
    responder = responder;
  }
  else{
    responder = defaultResponder;
  }
}

// Redis
const client = redis.createClient(config.redis);
client.on('ready', () => {
  console.log('Redis is now ready');
})

// task queue
/*
suggestion:
- do the Producer-Consumer architecture instead of task queueing with the size of 2 (time complexity and correctness should be similar, but PC should be lighter)
	- Use sleep-wake mechanics to reduce resource
	- Also need locks
  - still limit to "current" and "next" since more queue size will only add useless deprecated updates
- Only keep two "task": current and next
- next task is set/replaced if current task is still running and the Updater fetches a newer result
	- (replacement is probably beneficial iff task length can be vary, otherwise just improve by a constant)
							1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6
		Ignore: 	/ / X / X X / X X /                         // current policy
		Replace: 	/ > / > > / > > /                             
- scale by bucket only to keep the chronological order
- when testing, set delays for the mock responder service to custom queueing conditions
- also test if the subscriber queue the task and returns immediately without waiting
*/
const respondQueue = new Queue("responder", {redis: client, removeOnSuccess: true, removeOnFailure: true});
const maxQueueSize = 2;
let queueSize = 0;    //// WARNING: INVOLVING THIS VARIABLE MEANS NOT SCALABLE (MUST HAVE 1 UPDATER AND 1 rESPONDER/WORKER)
respondQueue.on('ready', () => {
  console.log('respondQueue is now ready');
  queueSize = 0;
});
respondQueue.on('error', (err) => {
  console.error(`A respondQueue error happened: ${err.message}`);
});
respondQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error ${err.message}`);
  queueSize -= 1;
});
respondQueue.on('succeeded', (job, result) => {
  console.log(`Job ${job.id} succeeded with result: ${result}`);
  queueSize -= 1;
});

// if 1 updater --> run synchronously, 1 at a time until done, must await for this
const enqueue = async (results, responder=null) => {
  // need clean up -- dirty work just for testing
  setResponder(responder);
  // end of need clean up
  if(queueSize >= maxQueueSize){
    // ignore policy
    console.log("Queuesize = " + queueSize + ", ignoring");
    return false;
  }
  let succ = false;
  await respondQueue.createJob(results).save().then(onfulfilled=() => {
    queueSize += 1;
    succ = true;
  });
  console.log("Queuesize = " + (queueSize-1) + "+1, success");
  return succ;
};


respondQueue.process(config.workersCount.responder, async (job) => {
  await responder(job.data);
  // job will leave queue after the process is succeed
  return true;
});

module.exports = enqueue;
