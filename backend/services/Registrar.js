const UsersModel = require("../models/Users");
const Subscriber = require("./Subscriber");
const { v4: uuid_v4 } = require("uuid");

const Mailer = require("../subscribers/Mailer")

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
    let uuid = uuid_v4();
    const newUser = await UsersModel.addUser({
      user_id: uuid,
      email: email,
    });
    Mailer.portal({user_email: email, user_id: uuid});
    return newUser;
  } else {
    
    Mailer.portal({user_email: email, user_id: users[0].user_id});
    return users[0];
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
