const config = require("../config");

const { setIntervalAsync } = require("set-interval-async/fixed");
const axios = require("axios");

const CoursesModel = require("../models/Courses");
const Responder = require("../subscribers/Responder");

// termCode = 1222 is for fall 2021
const getCourseDetail = async (subject_id, course_id) => {
  const url = `${config.apiUrl}/search/v1/enrollmentPackages/${config.termCode}/${subject_id}/${course_id}`;
  const results = await axios(url);
  return results.data;
};

// repeat every 10 seconds
const timer = setIntervalAsync(async () => {
  try{
    console.log("Fetching courses...");
    const allResults = [];
    const allCourse = await CoursesModel.getAll();

    for (let i = 0; i < allCourse.length; i++) {
      const course = allCourse[i];
      // get course detail (containing sections)
      allResults.push(await getCourseDetail(course.subject_id, course.course_id));
    }
    // responder call
    await Responder(allResults);
  } catch (err) {
    console.error(err);
  }
}, config.fetchCooldown);

module.exports = timer;
