const Mongoose = require('../mocks/mongoose')               // mock

const Mailer = require('../mocks/Mailer')
const Responder = require('../../services/Responder')
const CoursesModel = require('../../models/Courses')
const UsersModel = require('../../models/Users')

beforeAll(async () => await Mongoose.connect());
afterEach(async () => await Mongoose.clearDatabase());
afterAll(async () => await Mongoose.closeDatabase());

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

describe("Testing Service Responder", () => {
  test("Responder responds correctly", async () => {
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

    await Responder(mockApiResult, Mailer);
    let res = Mailer.notifyList;
    res = res.map((mailData) => {
      let x = {
        email: mailData.user_email,
        section_id: mailData.section_id
      };
      return x;
    })
    res.sort((x, y) => (x.email > y.email)? 1:-1)
  
    expect(res).toMatchObject(expected)
  })
})
