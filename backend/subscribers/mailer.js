const config = require("../config");

const defaultMailer = require("../services/Mailer");
let Mailer = defaultMailer;

const Queue = require("bee-queue");
const Redis = require("redis");

const setMailer = (mailer=null) => {
  if(mailer != null){
    Mailer = mailer;
  }
  else{
    Mailer = defaultMailer;
  }
}

// redis
const client = Redis.createClient(config.redis);
client.on('ready', () => {
  console.log('Redis is now ready');
})

// task queue
const mailQueue = new Queue("mailer", {redis: client, removeOnSuccess: true});
mailQueue.on('ready', () => {
  console.log('mailQueue is now ready');
});
mailQueue.on('error', (err) => {
  console.log(`A mailQueue error happened: ${err.message}`);
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

mailQueue.process(config.workersMailer, async (job) => {
  const res = await Mailer[job.data.work](job.data.param);
  return res;
});

module.exports = enqueue;
