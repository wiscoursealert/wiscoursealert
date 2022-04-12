const registrarService = require("../services/registrar");

const getUser = async (req, res) => {
  try {
    const user = await registrarService.getUser(req.query.user_id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await registrarService.addUser(req.body.email);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await registrarService.updateUser({
      user_id: req.body.user_id,
      newUser: req.body,
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

module.exports = {
  getUser, 
  addUser, 
  updateUser
};
