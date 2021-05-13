const router = require('express').Router();
const userController = require('../../controllers/users');

// returns user of this user_id
router.get('/', userController.getUser);

// registers a new user
router.post('/', userController.addUser);

// update an existing user
router.put('/', userController.updateUser);

module.exports = router;