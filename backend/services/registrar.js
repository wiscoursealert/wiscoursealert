const { v4: uuid_v4 } = require("uuid");
const usersRepository = require("../repositories/users");
const subscriberService = require("./subscriber");
const mailerSubscriber = require("../subscribers/mailer")
const config = require("../config");

const getUser = async (user_id) => {
  const users = await usersRepository.findUserID(user_id);
  if (users.length === 1) {
    return users[0];
  } else {
    throw Error("Error: user id does not exist");
  }
};

const addUser = async (emailRaw) => {
  const email = emailRaw.toLowerCase();
  if(!email.match('^[A-Za-z0-9._%+-]+@wisc.edu$')){
    throw Error("Your must use @wisc.edu email to register");
  }
  const users = await usersRepository.findEmail(email);
  if (users.length === 0) {
    let uuid = uuid_v4();
    const newUser = await usersRepository.create({
      user_id: uuid,
      email: email,
    });
    mailerSubscriber.portal({user_email: email, user_id: uuid});
    return newUser;
  } else {
    mailerSubscriber.portal({user_email: email, user_id: users[0].user_id});
    return users[0];
  }
};

const updateUser = async ({ user_id, newUser }) => {
  Object.assign(newUser, {email: newUser.email.toLowerCase()});
  const dupUsers = await usersRepository.findEmail(newUser.email);
  if (dupUsers.length === 1){
    if (dupUsers[0].user_id !== user_id){
      throw Error("Error: mismatched user_id");
    }
  } else{
    throw Error("Error: user email does not exist");
  }
  if(newUser.delay < config.policies.minDelay){
    throw Error("Error: delay must be at least " + config.policies.minDelay.toString());
  }
  const users = await usersRepository.findUserID(user_id);
  if (users.length === 1) {
    const user = users[0];
    await subscriberService.updateUser(user, "unsubscribe");
    const updatedUser = await usersRepository.update(newUser);
    await subscriberService.updateUser(updatedUser, "subscribe");
    return updatedUser;
  } else {
    throw Error("Error: user id does not exist");
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser
};
