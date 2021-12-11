generateLink = (user_id) => {
  let editUrl = "www.wiscoursealert.com" + "/?token=" + user_id;
  return editUrl;
};

module.exports = generateLink;
