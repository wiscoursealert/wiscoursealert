const config = require("../config");

const Responder = require("../services/Responder");

const Queue = require("bee-queue");

// task queue
const respondQueue = new Queue("responder", config.queueOptions);
const Enqueue = (results) => {
  return respondQueue.createJob(results).save();
};
respondQueue.process(config.workersResponder, async (job) => {
  const res = await Responder(job.data);
  return res;
});

module.exports = Enqueue;
