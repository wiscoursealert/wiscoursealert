const router = require('express').Router();
const userController = require('../../controllers/users');

// returns user of this user_id
router.get('/', userController.get);

// registers a new user
router.post('/', userController.post);

// update an existing user
router.put('/', userController.put);

module.exports = router;