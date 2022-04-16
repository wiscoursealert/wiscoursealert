const router = require("express").Router();

router.use("/users", require("./users"));

router.use("/", require("./ping"));

router.use("/", require("./lister"));


module.exports = router;
