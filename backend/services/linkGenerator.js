generateLink = (user_id) => {
  let editUrl = process.env.URL_MAIN + "/?token=" + user_id;
  return editUrl;
};

module.exports = generateLink;
