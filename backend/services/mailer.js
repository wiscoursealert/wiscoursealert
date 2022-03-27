const config = require("../config");

const LinkGenerator = require("./LinkGenerator");

const nodemailer = require("nodemailer");

// create reusable transporter object using developers.google Gmailv1 api
// follow https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

Mailer = {};
Mailer.notify = async (mailData) => {
  // receive parameters
  let {user_id, user_email, course_name, lecture_name, lab_name, discussion_name, prev_status, new_status} = mailData;

  // setup email contents
  let mailContents = {
    from: config.notifierMail.sender,
    to: user_email,
    subject: generateNotifierSubject(course_name, lecture_name, discussion_name, lab_name, prev_status, new_status),
    html: generateNotifierBodyHtml(LinkGenerator(user_id)),
  };

  return transporter.sendMail(mailContents, function (err, data){
    if(err){
      throw err;
    }
    return true;
  })
};

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

Mailer.portal = (mailData) => {
  let {user_email, user_id} = mailData;     // must be in this "big object" form to support subscriber

  // setup email contents
  let mailContents = {
    from: config.notifierMail.sender,
    to: user_email,
    subject: "Your wiscoursealert Subscription Management Portal",
    html: generateNotifierBodyHtml(LinkGenerator(user_id)),
  };

  return transporter.sendMail(mailContents, function (err, data){
    if(err){
      throw err;
    }
    return true;
  })
};

module.exports = Mailer;
