const config = require("../config");

const defaultResponder = require("../services/Responder");
let Responder = defaultResponder;

const Queue = require("bee-queue");
const Redis = require("redis");

const setResponder = (responder=null) => {
  if(responder != null){
    Responder = responder;
  }
  else{
    Responder = defaultResponder;
  }
}

// redis
const client = Redis.createClient(config.redis);
client.on('ready', () => {
  console.log('Redis is now ready');
})

// task queue
const respondQueue = new Queue("responder", {redis: client, removeOnSuccess: true});
respondQueue.on('ready', () => {
  console.log('respondQueue is now ready');
});
respondQueue.on('error', (err) => {
  console.log(`A respondQueue error happened: ${err.message}`);
});
respondQueue.on('succeeded', (job, result) => {
  console.log(`Job ${job.id} succeeded with result: ${result}`);
});

const enqueue = (results, responder=null) => {
  // need clean up -- dirty work just for testing
  setResponder(responder);
  // end of need clean up

  return respondQueue.createJob(results).retries(5).save();
};


respondQueue.process(config.workersResponder, async (job) => {
  const res = await Responder(job.data);
  return res;
});

module.exports = enqueue;
