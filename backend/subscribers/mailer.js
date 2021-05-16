const config = require('../config');

const mailer = require('../services/mailer')

const Queue = require('bee-queue');

// task queue
const mailQueue = new Queue('mailer', config.queueOptions);
const enqueue = {
  notify: (mailData) => {
    let jobData = {
      param: mailData,
      work: "notify"
    }
    console.log(jobData)
    return mailQueue.createJob(jobData).save()
  },
  editSubscription: (mailData) => {
    let jobData = {
      param: mailData,
      work: "editSubscription"
    }
    return mailQueue.createJob(jobData).save()
  }
}

mailQueue.process(config.workersMailer, async (job) => {
  const res = await mailer[job.data.work](job.data.param)
  return res
})

module.exports = enqueue