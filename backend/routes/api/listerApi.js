const router = require("express").Router();
const listerController = require("../../controllers/listerController");

router.post("/search", listerController.getSearchResults);

router.post("/sections", listerController.getSections);

module.exports = router;
