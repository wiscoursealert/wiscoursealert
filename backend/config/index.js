//// Load config
require('dotenv/config')

const redis = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
}
const workersResponder = 1;
const workersMailer = 1;
const workersRegister = 1;

const notifierMail = {
    sender: "no_reply." + process.env.MAIL_USERNAME,
}

const apiUrl = "https://public.enroll.wisc.edu/api";
const termCode = 1222;              // Fall 2021



exports.redis = redis;
exports.workersResponder = workersResponder;
exports.workersMailer = workersMailer;
exports.workersRegister = workersRegister;
exports.notifierMail = notifierMail;
exports.apiUrl = apiUrl
exports.termCode = termCode;            