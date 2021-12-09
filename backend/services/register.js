const userModel = require("../models/Users");
const subscriber = require("./subscriber");
const { v4: uuid_v4 } = require("uuid");

const register = {};

register.getUser = async (user_id) => {
  const users = await userModel.findUserID(user_id);
  if (users.length === 1) {
    return users[0];
  } else {
    return Error("Error: user id does not exist");
  }
};

register.addUser = async (email) => {
  const users = await userModel.findEmail(email);
  if (users.length === 0) {
    const newUser = await userModel.addUser({
      user_id: uuid_v4(),
      email: email,
    });
    return newUser;
  } else {
    return Error("Error: this email already exists");
  }
};

register.updateUser = async ({ user_id, newUser }) => {
  const users = await userModel.findUserID(user_id);
  if (users.length === 1) {
    const user = users[0];
    await subscriber.updateUser(user, "unsubscribe");
    const updatedUser = await userModel.updateUser(newUser);
    await subscriber.updateUser(updatedUser, "subscribe");
    return updatedUser;
  } else {
    return Error("Error: user id does not exist");
  }
};

module.exports = register;
