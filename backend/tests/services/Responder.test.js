const Mongoose = require('../mocks/mongoose')               // mock

const Mailer = require('../mocks/services/Mailer')
const Responder = require('../../services/Responder')
const CoursesModel = require('../../models/Courses')
const UsersModel = require('../../models/Users')

insertMockDbData1 = async () => {
  await CoursesModel.addCourse({
    course_id: "CS101",
    course_name: "Outro to Quantum Super Machine-Learned Cryptocurrency",
    subject_id: "COMPSCI007",
    sections: [{
      section_id: "CS101_S01",
      subscribers: [
        { email: "guy1-1@mail.com", last_sent: Date.now() - 10*(60*1000)},
        { email: "guy1-2@mail.com", last_sent: Date.now() - 20*(60*1000)}
      ],
      status: "OPEN",
      prev_status: "unknown"
    },
    {
      section_id: "CS101_S02",
      subscribers: [
        { email: "guy2-1@mail.com", last_sent: Date.now() - 10*(60*1000)},
        { email: "guy2-2@mail.com", last_sent: Date.now() - 20*(60*1000)}
      ],
      status: "WAITLISTED",
      prev_status: "unknown"
    },
    {
      section_id: "CS101_S03",
      subscribers: [
        { email: "guy3-1@mail.com", last_sent: Date.now() - 10*(60*1000)},
        { email: "guy3-2@mail.com", last_sent: Date.now() - 20*(60*1000)}
      ],
      status: "WAITLISTED",
      prev_status: "unknown"
    },
    {
      section_id: "CS101_S04",
      subscribers: [
        { email: "guy4-1@mail.com", last_sent: Date.now() - 10*(60*1000)},
        { email: "guy4-2@mail.com", last_sent: Date.now() - 20*(60*1000)}
      ],
      status: "CLOSED",
      prev_status: "unknown"
    }]
  })

  await UsersModel.addUser({
    user_id: "U1-1",
    email: "guy1-1@mail.com"
  })
  await UsersModel.addUser({
    user_id: "U1-2",
    email: "guy1-2@mail.com"
  })
  await UsersModel.addUser({
    user_id: "U2-1",
    email: "guy2-1@mail.com"
  })
  await UsersModel.addUser({
    user_id: "U2-2",
    email: "guy2-2@mail.com"
  })
  await UsersModel.addUser({
    user_id: "U3-1",
    email: "guy3-1@mail.com"
  })
  await UsersModel.addUser({
    user_id: "U3-2",
    email: "guy3-2@mail.com"
  })
  await UsersModel.addUser({
    user_id: "U4-1",
    email: "guy4-1@mail.com"
  })
  await UsersModel.addUser({
    user_id: "U4-2",
    email: "guy4-2@mail.com"
  })
}
wait = async (ms) => {
  await new Promise(resolve => setTimeout(resolve, ms));
}

beforeAll(async () => await Mongoose.connect());
beforeEach(async () => await insertMockDbData1());
afterEach(async () => await Mongoose.clearDatabase());
afterAll(async () => await Mongoose.closeDatabase());

describe("Testing Service Responder", () => {
  const mockApiResult = [[
    {
      "id": "CS101_S01",
      "courseId": "CS101",
      "packageEnrollmentStatus": {
        "status": "OPEN"
      },
      "sections": [
        {
          "type": "LEC",
          "sectionNumber": "001"
        }
      ]
    },
    {
      "id": "CS101_S02",
      "courseId": "CS101",
      "packageEnrollmentStatus": {
        "status": "OPEN"
      },
      "sections": [
        {
          "type": "LEC",
          "sectionNumber": "002"
        }
      ]
    },
    {
      "id": "CS101_S03",
      "courseId": "CS101",
      "packageEnrollmentStatus": {
        "status": "WAITLISTED"
      },
      "sections": [
        {
          "type": "LEC",
          "sectionNumber": "003"
        }
      ]
    },
    {
      "id": "CS101_S04",
      "courseId": "CS101",
      "packageEnrollmentStatus": {
        "status": "WAITLISTED"
      },
      "sections": [
        {
          "type": "LEC",
          "sectionNumber": "004"
        }
      ]
    }
  ]]
  const expected = [{
    email: "guy2-2@mail.com",
    section_id: "CS101_S02"
  },
  {
    email: "guy4-2@mail.com",
    section_id: "CS101_S04"
  }]

  test("Responder responds correctly", async () => {
    await Responder(mockApiResult, Mailer);
    await wait(1000);
    let mails = Mailer.notifyList;
    mails = mails.map((mailData) => {
      let x = {
        email: mailData.user_email,
        section_id: mailData.section_id
      };
      return x;
    })
    mails.sort((x, y) => (x.email > y.email)? 1:-1)
  
    expect(mails).toMatchObject(expected)
  })

  test("Responder changes last_sent for notified users correctly", async () => {
    const approxSentTime = Date.now();
    await Responder(mockApiResult, Mailer);
    await wait(1000);
    const expectedSet = new Set(expected.map(({email, section_id}) => email + ";" + section_id));

    const courses = await CoursesModel.getAll();
    //console.log("approxSentTime  >>> " + approxSentTime)
    await Promise.all(courses.map(async ({sections}) => {
      sections.map(({section_id, subscribers}) => {
        subscribers.map(({email, last_sent}) => {
          //console.log(email + ";" + section_id + "  >>> " + last_sent.getTime())
          if(expectedSet.has(email + ";" + section_id)){
            expect(last_sent.getTime()).toBeGreaterThanOrEqual(approxSentTime);
          }
          else{
            expect(last_sent.getTime()).toBeLessThan(approxSentTime);
          }
        })
      })
    }))
  })
})
