const dbHandler = require('./db-handler')
const responder = require('../services/responder')
const courseModel = require('../models/Courses')
const userModel = require('../models/Users')

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

mockDbData1 = async () => {
  await courseModel.addCourse({
    course_id: "CS101",
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
  //const result = await courseModel.getAll()
  //console.log(result)

  await userModel.addUser({
    user_id: "U1-1",
    email: "guy1-1@mail.com"
  })
  await userModel.addUser({
    user_id: "U1-2",
    email: "guy1-2@mail.com"
  })
  await userModel.addUser({
    user_id: "U2-1",
    email: "guy2-1@mail.com"
  })
  await userModel.addUser({
    user_id: "U2-2",
    email: "guy2-2@mail.com"
  })
  await userModel.addUser({
    user_id: "U3-1",
    email: "guy3-1@mail.com"
  })
  await userModel.addUser({
    user_id: "U3-2",
    email: "guy3-2@mail.com"
  })
  await userModel.addUser({
    user_id: "U4-1",
    email: "guy4-1@mail.com"
  })
  await userModel.addUser({
    user_id: "U4-2",
    email: "guy4-2@mail.com"
  })
}

test('test1', async () => {
  await mockDbData1()
  mockResult = [
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

  const res = await responder(mockResult, true)
  res.sort((x, y) => (x.email > y.email)? 1:-1)

  expect(res).toMatchObject(expected)
})