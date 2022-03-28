const Responder = require('../../subscribers/responder');
const MockResponderService = require('../mocks/services/responder');
// mock redis is broken, but real redis works fine

wait = async (ms) => {
  await new Promise(resolve => setTimeout(resolve, ms));
}

const pauseForReady = 2000;
const pauseForProcess = 200;
const serviceDelay = MockResponderService.delay;

beforeAll(async () => {
  jest.setTimeout(60000);
  await wait(pauseForReady);
});
beforeEach(() => {
  while(MockResponderService.resultsList.length > 0){
    MockResponderService.resultsList.pop();
  }
})
afterEach(async () => {
  await wait(pauseForProcess);
  while(MockResponderService.running){
    await wait(pauseForProcess + serviceDelay);
  }
})

describe("Testing Subscriber Responder", () => {
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
  const mockApiResult2 = [[
    {
      "id": "CS101_S99",
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
    }
  ]]
  const mockApiResult3 = [[
    {
      "id": "CS101_S98",
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
    }
  ]]
  test("Successfully enqueue a single task and forward to the service", async () => {
    await Responder(mockApiResult, MockResponderService.service);
    await wait(pauseForProcess + serviceDelay);

    expect(MockResponderService.resultsList[0]).toMatchObject(mockApiResult);
  })
  test("Enqueue a single task fast enough", async () => {
    const enough = 100;
    const t1 = Date.now();      // ms
    await Responder(mockApiResult, MockResponderService.service);
    const t2 = Date.now();

    expect(t2 - t1).toBeLessThan(enough);
    await wait(pauseForProcess + serviceDelay);
  })
  test("Ignore task if the queue is full", async () => {
    await Responder(mockApiResult, MockResponderService.service);
    await wait(pauseForProcess);
    await Responder(mockApiResult2, MockResponderService.service);
    await Responder(mockApiResult3, MockResponderService.service);
    await wait(3*(pauseForProcess + serviceDelay));

    expect(MockResponderService.resultsList.length).toBe(2);
    expect(MockResponderService.resultsList[0]).toMatchObject(mockApiResult);
    expect(MockResponderService.resultsList[1]).toMatchObject(mockApiResult2);
  })
  test("Enqueue task if the queue is released", async () => {
    await Responder(mockApiResult, MockResponderService.service);
    await wait(pauseForProcess);
    await Responder(mockApiResult2, MockResponderService.service);
    await wait(2*(pauseForProcess + serviceDelay));
    await Responder(mockApiResult3, MockResponderService.service);
    await wait(pauseForProcess + serviceDelay);

    expect(MockResponderService.resultsList.length).toBe(3);
    expect(MockResponderService.resultsList[0]).toMatchObject(mockApiResult);
    expect(MockResponderService.resultsList[1]).toMatchObject(mockApiResult2);
    expect(MockResponderService.resultsList[2]).toMatchObject(mockApiResult3);
  })
  test("Stays active when in drought of task", async () => {
    await Responder(mockApiResult, MockResponderService.service);
    await wait(pauseForProcess);
    await Responder(mockApiResult2, MockResponderService.service);
    await wait(10*(pauseForProcess + serviceDelay));
    await Responder(mockApiResult3, MockResponderService.service);
    await wait(pauseForProcess + serviceDelay);

    expect(MockResponderService.resultsList.length).toBe(3);
    expect(MockResponderService.resultsList[0]).toMatchObject(mockApiResult);
    expect(MockResponderService.resultsList[1]).toMatchObject(mockApiResult2);
    expect(MockResponderService.resultsList[2]).toMatchObject(mockApiResult3);
  })
  test("Enqueue a heavy load of tasks", async () => {
    await Responder(mockApiResult, MockResponderService.service);
    await wait(pauseForProcess);
    await Responder(mockApiResult2, MockResponderService.service);
    await wait(10*(pauseForProcess + serviceDelay));
    await Responder(mockApiResult3, MockResponderService.service);
    await wait(pauseForProcess + serviceDelay);

    expect(MockResponderService.resultsList.length).toBe(3);

    await Responder(mockApiResult, MockResponderService.service);
    await wait(pauseForProcess);
    await Responder(mockApiResult2, MockResponderService.service);
    await wait(2*(pauseForProcess + serviceDelay));
    await Responder(mockApiResult3, MockResponderService.service);
    await wait(pauseForProcess + serviceDelay);

    expect(MockResponderService.resultsList.length).toBe(6);

    await Responder(mockApiResult, MockResponderService.service);
    await wait(pauseForProcess);
    await Responder(mockApiResult2, MockResponderService.service);
    await Responder(mockApiResult3, MockResponderService.service);
    await wait(3*(pauseForProcess + serviceDelay));

    expect(MockResponderService.resultsList.length).toBe(8);

    await Responder(mockApiResult, MockResponderService.service);
    await wait(pauseForProcess);
    await Responder(mockApiResult2, MockResponderService.service);
    await wait(2*(pauseForProcess + serviceDelay));
    await Responder(mockApiResult3, MockResponderService.service);
    await wait(pauseForProcess + serviceDelay);

    expect(MockResponderService.resultsList.length).toBe(11);

    await Responder(mockApiResult, MockResponderService.service);
    await wait(pauseForProcess);
    await Responder(mockApiResult2, MockResponderService.service);
    await wait(10*(pauseForProcess + serviceDelay));
    await Responder(mockApiResult3, MockResponderService.service);
    await wait(pauseForProcess + serviceDelay);

    expect(MockResponderService.resultsList.length).toBe(14);

    await Responder(mockApiResult, MockResponderService.service);
    await wait(pauseForProcess);
    await Responder(mockApiResult2, MockResponderService.service);
    await Responder(mockApiResult3, MockResponderService.service);
    await wait(3*(pauseForProcess + serviceDelay));

    expect(MockResponderService.resultsList.length).toBe(16);

    for(let i = 0; i < 10; i++){
      await Responder(mockApiResult, MockResponderService.service);
      await wait(pauseForProcess + serviceDelay);
    }

    expect(MockResponderService.resultsList.length).toBe(26);
  })
})
