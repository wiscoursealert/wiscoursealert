const dotenv = require('dotenv')
dotenv.config()

exports.port = (process.env.PORT)? process.env.PORT:3001
exports.isProduction = (process.env.NODE_ENV === 'production')

