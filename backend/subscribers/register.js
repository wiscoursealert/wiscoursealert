// const config = require('../config');
// const register = require('../services/register')
// const Queue = require('bee-queue');

// // task queue
// const registerQueue = new Queue('register', config.queueOptions);
// const enqueue = {
//   getUser: (userData) => {
//     let jobData = {
//       param: userData,
//       work: "getUser"
//     }
//     console.log(jobData)
//     return registerQueue.createJob(jobData).save()
//   },
//   addUser: (userData) => {
//     let jobData = {
//       param: userData,
//       work: "addUser"
//     }
//     console.log(jobData)
//     return registerQueue.createJob(jobData).save()
//   },
//   updateUser: (userData) => {
//     let jobData = {
//       param: userData,
//       work: "updateUser"
//     }
//     console.log(jobData)
//     return registerQueue.createJob(jobData).save()
//   }
// }

// registerQueue.process(config.workersRegister, async (job) => {
//   const res = await register[job.data.work](job.data.param)
//   return res
// })

// module.exports = enqueue
