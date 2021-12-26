const Mailer = require('../../subscribers/Mailer');
const MockMailerService = require('../mocks/services/Mailer');
// mock redis is broken, but real redis works fine

wait = async (ms) => {
  await new Promise(resolve => setTimeout(resolve, ms));
}

beforeAll(async () => {
  jest.setTimeout(30000);
});

describe("Testing Subscriber Mailer", async () => {
  test("Successfully enqueue a notifier mail and forward to the service", async () => {
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
    await Mailer.notify(mailData, MockMailerService);
    await wait(5000);

    expect(MockMailerService.notifyList).toEqual([mailData]);
   });

   test("Successfully enqueue a portal mail and forward to the service", async () => {
    const mailData = {
      user_id: "2b15adb2-f644-4cf1-afb4-a670cac7461d", 
      user_email: "hello@world.com"
    }
    await Mailer.portal(mailData, MockMailerService);
    await wait(5000);

    expect(MockMailerService.editList).toEqual([mailData]);
   });
})