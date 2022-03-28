const axios = require("axios");

const config = require("../config");
const coursesRepository = require("../repositories/courses");
const responder = require("../subscribers/responder");

const fetchCourse = async (subject_id, course_id) => {
  const url = `${config.apiUrl}/search/v1/enrollmentPackages/${config.termCode}/${subject_id}/${course_id}`;
  const results = await axios(url);
  return results.data;
};

const fetchAllAndForward = async () => {
  const allResults = [];
  const allCourse = await coursesRepository.all();

  for (let i = 0; i < allCourse.length; i++) {
    const course = allCourse[i];
    // get course detail (containing sections)
    allResults.push(await fetchCourse(course.subject_id, course.course_id));
  }
  // responder call
  await responder(allResults);
};

module.exports = fetchAllAndForward;
