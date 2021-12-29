const Router = require("express").Router();
const Lister = require("../../controllers/Lister");

Router.post("/search", Lister.getSearchResults);

Router.post("/sections", Lister.getSections);

module.exports = Router;
