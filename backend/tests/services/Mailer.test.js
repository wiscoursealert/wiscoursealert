const Mailer = require('../../services/Mailer');
const nodemailerMock = require('nodemailer-mock');

beforeEach(() => nodemailerMock.mock.reset());

describe("Testing Service Mailer", async () => {
  test("Send notifying email correctly", async () => {
    const mailData = {
      user_id: "2b15adb2-f644-4cf1-afb4-a670cac7461d", 
      user_email: "hello@world.com", 
      course_name: "CS123", 
      lecture_name: "007", 
      lab_name: null, 
      discussion_name: "002", 
      prev_status: "WAITLISTED", 
      new_status: "AVAILABLE"
    }
    await Mailer.notify(mailData);

    expect(nodemailerMock.mock.getSentMail().length).toBe(1);
    expect(nodemailerMock.mock.getSentMail()[0].subject).toBe(`${mailData.course_name}, LEC ${mailData.lecture_name}, DIS ${mailData.discussion_name} has changed its status from ${mailData.prev_status} to ${mailData.new_status}`);
  });

  test("Send portal email correctly", async () => {
    const user_id = "2b15adb2-f644-4cf1-afb4-a670cac7461d";
    const user_email = "hello@world.com";
    await Mailer.portal(user_email, user_id);

    expect(nodemailerMock.mock.getSentMail().length).toBe(1);
    expect(nodemailerMock.mock.getSentMail()[0].subject).toBe("Your wiscoursealert Subscription Management Portal");
  });
})