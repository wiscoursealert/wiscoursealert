const Router = require("express").Router();
const Users = require("../../controllers/Users");

// returns user of this user_id
Router.get("/", Users.getUser);

// registers a new user
Router.post("/", Users.addUser);

// update an existing user
Router.put("/", Users.updateUser);

module.exports = Router;
