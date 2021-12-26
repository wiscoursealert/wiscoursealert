const Mongoose = require('../mocks/mongoose')
const MockResponderService = require('../mocks/Responder');
// mock redis is broken, but real redis works fine
const Responder = require('../../subscribers/responder')
const CoursesModel = require('../../models/Courses')
const UsersModel = require('../../models/Users')

wait = async (ms) => {
  await new Promise(resolve => setTimeout(resolve, ms));
}

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
  //const result = await CoursesModel.getAll()
  //console.log(result)

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

beforeAll(async () => {
  jest.setTimeout(30000);
  await Mongoose.connect()
});
afterEach(async () => await Mongoose.clearDatabase());
afterAll(async () => await Mongoose.closeDatabase());

describe("Testing Subscriber Responder", () => {
  test("Successfully enqueue and forward to the service", async () => {
    // define test data
    await insertMockDbData1()
    mockApiResult = [
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
    ]
    const expected = [{
      email: "guy2-2@mail.com",
      section_id: "CS101_S02"
    },
    {
      email: "guy4-2@mail.com",
      section_id: "CS101_S04"
    }]

    // enqueue and wait for processing
    await Responder(mockApiResult, MockResponderService.service);
    await wait(5000);

    expect(MockResponderService.resultsList[0]).toMatchObject(mockApiResult)
  })
})
