const Lister = require('../../services/Lister');

describe("Testing Service Lister", async () => {
  test("Returns search result correctly", async () => {
    const queryString = "COMP SCI 577"
    const res = await Lister.getSearchResults(queryString);

    expect(res[0].course_full_name).toBe("Introduction to Algorithms");
  });
})