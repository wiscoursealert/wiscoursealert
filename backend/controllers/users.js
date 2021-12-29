const RegistrarService = require("../services/Registrar");

const Users = {};

Users.getUser = async (req, res) => {
  try {
    const user = await RegistrarService.getUser(req.body.user_id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

Users.addUser = async (req, res) => {
  try {
    const newUser = await RegistrarService.addUser(req.body.email);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

Users.updateUser = async (req, res) => {
  try {
    const updatedUser = await RegistrarService.updateUser({
      user_id: req.body.user_id,
      newUser: req.body,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = Users;
