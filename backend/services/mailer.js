const nodemailer = require('nodemailer');
const linkGenerator = require('./linkGenerator');
require('dotenv/config')

mailer = {}

mailer.notify = async ({user_id, user_email, course_name, lecture_name, discussion_name, prev_status, new_status}) => {

  ////
  subscription_link = linkGenerator(user_id);
  /////
  console.log("sending email to:"+user_email)

  // create reusable transporter object using developers.google Gmailv1 api
  // follow https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
  let transporter = await nodemailer.createTransport({
    service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
  });
  // set mail option
  let mailOptions = {
    from: generateSender(),
    to: generateRecipient(user_email),
    subject: generateSubject(course_name, lecture_name, discussion_name),
    html: generateHtml(subscription_link)
  };

  let result = true
  //need to fix await
  //now return before finishing sendMail
  // send mail with defined transport object
  await transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
        result = false
        console.log("Error " + err);
    } else {
        console.log("Email sent successfully");
    }
  });
  return result
}

generateSender = () =>{
    return "no_reply."+process.env.MAIL_USERNAME;
}

generateRecipient = (user_email) =>{
    return user_email;
}

generateSubject = (course_name, lecture_name, discussion_name) =>{
    return course_name+" is open for enrollment"
}

generateText = (course_name, lecture_name, discussion_name, prev_status, new_status) =>{
    return course_name+", lecture: "+lecture_name+", discussion: "+discussion_name+ " just changed from "+prev_status+" to "+new_status+" and is now open for enrollment"
}

generateHtml = (subscription_link) =>{
    return '<a href='+subscription_link+'>manage subscription</a>'
}

mailer.editSubscription = ({user_email, subscription_link}) =>{

}

module.exports = mailer;