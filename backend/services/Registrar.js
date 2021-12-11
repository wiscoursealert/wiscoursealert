const UsersModel = require("../models/Users");
const Subscriber = require("./Subscriber");
const { v4: uuid_v4 } = require("uuid");

const Registrar = {};

Registrar.getUser = async (user_id) => {
  const users = await UsersModel.findUserID(user_id);
  if (users.length === 1) {
    return users[0];
  } else {
    return Error("Error: user id does not exist");
  }
};

Registrar.addUser = async (email) => {
  const users = await UsersModel.findEmail(email);
  if (users.length === 0) {
    const newUser = await UsersModel.addUser({
      user_id: uuid_v4(),
      email: email,
    });
    return newUser;
  } else {
    return Error("Error: this email already exists");
  }
};

Registrar.updateUser = async ({ user_id, newUser }) => {
  const users = await UsersModel.findUserID(user_id);
  if (users.length === 1) {
    const user = users[0];
    await Subscriber.updateUser(user, "unsubscribe");
    const updatedUser = await UsersModel.updateUser(newUser);
    await Subscriber.updateUser(updatedUser, "subscribe");
    return updatedUser;
  } else {
    return Error("Error: user id does not exist");
  }
};

module.exports = Registrar;
