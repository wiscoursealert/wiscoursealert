const Queue = require("bee-queue");
const redis = require("redis");

const config = require("../config");
const defaultMailer = require("../services/mailer");
let mailer = defaultMailer;                           // TODO: find a better pattern

const setMailer = (mailer=null) => {
  if(mailer != null){
    mailer = mailer;
  }
  else{
    mailer = defaultMailer;
  }
}

// Redis
const client = redis.createClient(config.redis);
client.on('ready', () => {
  console.log('Redis is now ready');
})

// task queue
const mailQueue = new Queue("mailer", {redis: client, removeOnSuccess: true});
mailQueue.on('ready', () => {
  console.log('mailQueue is now ready');
});
mailQueue.on('error', (err) => {
  console.err(`A mailQueue error happened: ${err.message}`);
});
mailQueue.on('failed', (job, err) => {
  console.err(`Job ${job.id} failed with error ${err.message}`);
});
mailQueue.on('succeeded', (job, result) => {
  console.log(`Job ${job.id} succeeded with result: ${result}`);
});

const enqueue = {
  notify: (mailData, mailer=null) => {
    // need clean up -- dirty work just for testing
    setMailer(mailer);
    // end of need clean up
    let jobData = {
      param: mailData,
      work: "notify",
    };
    return mailQueue.createJob(jobData).save();
  },
  portal: (mailData, mailer=null) => {
    // need clean up -- dirty work just for testing
    setMailer(mailer);
    // end of need clean up
    let jobData = {
      param: mailData,
      work: "portal",
    };
    return mailQueue.createJob(jobData).save();
  },
};

mailQueue.process(config.workersCount.mailer, async (job) => {
  try{
    await mailer[job.data.work](job.data.param);
  } catch (err){
    console.err(err);
    return false;
  }
  return true;
});

module.exports = enqueue;
