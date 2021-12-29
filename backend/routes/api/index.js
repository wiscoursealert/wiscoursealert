const router = require("express").Router();

router.use("/users", require("./users"));

router.use("/lister", require("./lister"));

module.exports = router;
