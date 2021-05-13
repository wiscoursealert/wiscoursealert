const mongoose = require('mongoose');
const User = mongoose.model('Users');
const { v4: uuid_v4 } = require('uuid');

const userModel = require('../models/Users');

const userController = {};

userController.get = async (req, res) => {
  try {
    const users = await userModel.findUserID(req.body.user_id);
    if (users.length === 1) {
      res.json(users);
    }
    else {
      res.status(500).json({ message: 'Error: user_id not found' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

userController.post = async (req, res) => {
  try {
    const users = await userModel.findEmail(req.body.email);
    if (users.length === 0) {
      const newUser = await userModel.addUser({ 
        user_id: uuid_v4(),
        email: req.body.email
      });
      res.json(newUser);
    }
    else {
      res.status(500).json({ message: 'Error: this email is already existed' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

userController.put = async (req, res) => {
  try {
    const users = await userModel.findUserID(req.body.user.user_id);
    if (users.length === 1) {
      const updatedUser = await userModel.updateUser(req.body.user);
      res.json(updatedUser);
    }
    else {
      res.status(500).json({ message: 'Error: user_id not found' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

module.exports = userController;