const config = require("../config");

const Mailer = require("../services/Mailer");

const Queue = require("bee-queue");

// task queue
const mailQueue = new Queue("mailer", config.queueOptions);
const Enqueue = {
  notify: (mailData) => {
    let jobData = {
      param: mailData,
      work: "notify",
    };
    console.log(jobData);
    return mailQueue.createJob(jobData).save();
  },
  editSubscription: (mailData) => {
    let jobData = {
      param: mailData,
      work: "editSubscription",
    };
    return mailQueue.createJob(jobData).save();
  },
};

mailQueue.process(config.workersMailer, async (job) => {
  const res = await Mailer[job.data.work](job.data.param);
  return res;
});

module.exports = Enqueue;
