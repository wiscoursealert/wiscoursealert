//// Load config
require('dotenv/config')

const redis = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
}
exports.redis = redis;

exports.workersResponder = 1;
exports.workersMailer = 1;
exports.workersRegister = 1;

const notifierMail = {
    sender: "no_reply." + process.env.MAIL_USERNAME,
}
exports.notifierMail = notifierMail;

exports.apiUrl = "https://public.enroll.wisc.edu/api";
exports.termCode = "1222";            // Fall 2021