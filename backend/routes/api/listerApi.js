const router = require('express').Router();
const listerController = require("../../controllers/listerController");

router.post('/', listerController.getSearchResults );


module.exports = router;
