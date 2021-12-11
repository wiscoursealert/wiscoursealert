const Router = require("express").Router();

Router.use("/api", require("./api"));

module.exports = Router;
