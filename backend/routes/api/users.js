const router = require("express").Router();
const users = require("../../controllers/users");

// returns user of this user_id
router.get("/", users.getUser);

// registers a new user
router.post("/", users.addUser);

// update an existing user
router.put("/", users.updateUser);

module.exports = router;
