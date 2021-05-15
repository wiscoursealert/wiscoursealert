const config = require('../config');

const mailer = require('../services/mailer')

const Queue = require('bee-queue');

// task queue
const mailQueue = new Queue('mailer', config.queueOptions);
const enqueue = {
  notify: (mailData) => {
    jobData = {
      param: mailData,
      work: mailer.notify
    }
    return mailQueue.createJob(jobData).save()
  },
  editSubscription: (mailData) => {
    jobData = {
      param: mailData,
      work: mailer.editSubscription
    }
    return mailQueue.createJob(jobData).save()
  }
}

mailQueue.process(async (job) => {
  const res = await job.data.work(job.data.param)
  return res
})

module.exports = enqueue