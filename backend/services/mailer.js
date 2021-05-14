const nodemailer = require('nodemailer');
require('dotenv/config')

mailer = {}

mailer.notify = async (course_name, lecture_name, discussion_name, prev_status, new_status, email, subscription_link) => {


  console.log("sending email to:"+email)

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
    to: generateRecipient(email),
    subject: generateSubject(course_name, lecture_name, discussion_name),
    text: generateText(course_name, lecture_name, discussion_name,prev_status, new_status)
  };

  let result = true
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

generateRecipient = (email) =>{
    return email;
}

generateSubject = (course_name, lecture_name, discussion_name) =>{
    return course_name+" is open for enrollment"
}

generateText = (course_name, lecture_name, discussion_name,prev_status, new_status) =>{
    return course_name+", lecture: "+lecture_name+", discussion: "+discussion_name+ "just changed from "+prev_status+" to "+new_status+" and is now open for enrollment"
}


mailer.editSubscription = (email, subscription_link) =>{

}

module.exports = mailer;