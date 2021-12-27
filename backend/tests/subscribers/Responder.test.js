const Responder = require('../../subscribers/Responder');
const MockResponderService = require('../mocks/services/Responder');
// mock redis is broken, but real redis works fine

wait = async (ms) => {
  await new Promise(resolve => setTimeout(resolve, ms));
}

beforeAll(async () => {
  jest.setTimeout(30000);
});

describe("Testing Subscriber Responder", () => {
  test("Successfully enqueue and forward to the service", async () => {
    const mockApiResult = [
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
    await Responder(mockApiResult, MockResponderService.service);
    await wait(5000);

    expect(MockResponderService.resultsList[0]).toMatchObject(mockApiResult)
  })
})
