const config = require("../config");
const linkGenerator = require("./linkGenerator");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: config.mailer.service,
  auth: {
    type: "OAuth2",
    user: config.mailer.email,
    pass: config.mailer.password,
    clientId: config.mailer.oAuth.clientId,
    clientSecret: config.mailer.oAuth.clientSecret,
    refreshToken: config.mailer.oAuth.refreshToken,
  },
});

generateNotifierSubject = (course_name, lecture_name, discussion_name, lab_name, prev_status, new_status) => {
  let subject = course_name;
  if(lecture_name != null){
    subject += ", LEC " + lecture_name;
  }
  if(discussion_name != null){
    subject += ", DIS " + discussion_name;
  }
  if(lab_name != null){
    subject += ", LAB " + lab_name;
  }
  subject += " has changed its status from " + prev_status + " to " + new_status;
  return subject;
};

generateNotifierBodyHtml = (subscription_link) => {
  return "<a href=" + subscription_link + ">Please click this link to manage your subscriptions</a><br><br><br>Wiscoursealert Automated Mailing System";
};

const notify = (mailData) => {
  // receive parameters
  let {user_id, user_email, course_name, lecture_name, lab_name, discussion_name, prev_status, new_status} = mailData;

  // setup email contents
  let mailContents = {
    from: config.mailer.email,
    to: user_email,
    subject: generateNotifierSubject(course_name, lecture_name, discussion_name, lab_name, prev_status, new_status),
    html: generateNotifierBodyHtml(linkGenerator(user_id)),
  };

  return transporter.sendMail(mailContents, function (err, data){
    if(err){
      console.error(err);
      return false;
    }
    return true;
  })
};

const portal = (mailData) => {
  // receive parameters
  let {user_email, user_id} = mailData;

  // setup email contents
  let mailContents = {
    from: config.mailer.email,
    to: user_email,
    subject: "Your wiscoursealert Subscription Management Portal",
    html: generateNotifierBodyHtml(linkGenerator(user_id)),
  };

  return transporter.sendMail(mailContents, function (err, data){
    if(err){
      console.error(err);
      return false;
    }
    return true;
  })
};

module.exports = {
  notify,
  portal
};
