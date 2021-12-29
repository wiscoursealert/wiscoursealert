const config = require("../config");

const CoursesModel = require("../models/Courses");
const Responder = require("../subscribers/Responder");

const axios = require("axios");

const fetchCourse = async (subject_id, course_id) => {
  const url = `${config.apiUrl}/search/v1/enrollmentPackages/${config.termCode}/${subject_id}/${course_id}`;
  const results = await axios(url);
  return results.data;
};

// repeat every 10 seconds
const fetchAllAndForward = async () => {
  const allResults = [];
  const allCourse = await CoursesModel.getAll();

  for (let i = 0; i < allCourse.length; i++) {
    const course = allCourse[i];
    // get course detail (containing sections)
    allResults.push(await fetchCourse(course.subject_id, course.course_id));
  }
  // responder call
  await Responder(allResults);
};

module.exports = fetchAllAndForward;
