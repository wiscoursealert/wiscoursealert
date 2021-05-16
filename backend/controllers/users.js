const register = require('../services/register');

const usersController = {};

usersController.getUser = async (req, res) => {
  try {
    const user = await register.getUser(req.body.user_id);
    res.json(user);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

usersController.addUser = async (req, res) => {
  try {
    const newUser = await register.addUser(req.body.email);
    res.json(newUser);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

usersController.updateUser = async (req, res) => {
  try {
    const updatedUser = await register.updateUser({ 
      user_id: req.body.user_id, 
      newUser: req.body
    });
    res.json(updatedUser);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

module.exports = usersController;