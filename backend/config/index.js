//// Load config
require('dotenv/config')

const queueOptions = {
  removeOnSuccess: true,
  redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
  },
}

exports.queueOptions = queueOptions

exports.workersResponder = 4
exports.workersMailer = 4
