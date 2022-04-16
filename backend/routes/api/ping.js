const router = require("express").Router();
const ping = require("../../controllers/ping");

// search for courses
router.get("/ping", ping.ping);

module.exports = router;
