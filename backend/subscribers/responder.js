const config = require('../config');

const responder = require('../services/responder')

const Queue = require('bee-queue');

// task queue
const respondQueue = new Queue('responder', config.queueOptions);
const enqueue = (results) => {
  return respondQueue.createJob(results).save()
}
respondQueue.process(config.workersResponder, async (job) => {
  const res = await responder(job.data)
  return res
})

module.exports = enqueue