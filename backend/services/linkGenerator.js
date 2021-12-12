validateUUID = (user_id) => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(user_id);
}

generateLink = (user_id) => {
  if(!validateUUID(user_id)){
    throw new Error("User ID is not a valid UUID.");
  }
  let editUrl = process.env.URL_MAIN + "/?token=" + user_id;
  return editUrl;
};

module.exports = generateLink;
 