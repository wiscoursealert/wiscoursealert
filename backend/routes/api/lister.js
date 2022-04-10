const router = require("express").Router();
const lister = require("../../controllers/lister");

// search for courses
router.post("/search", lister.getSearchResults);

// get section details
router.post("/sections", lister.getSections);

module.exports = router;
