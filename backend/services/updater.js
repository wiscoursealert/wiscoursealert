const { setIntervalAsync } = require("set-interval-async/fixed");
const axios = require("axios");
const courseModel = require("../models/Courses");
const responder = require("../subscribers/responder");

// termCode = 1222 is for fall 2021
const getCourseDetail = async (subject_id, course_id, termCode = "1222") => {
  const url = `https://public.enroll.wisc.edu/api/search/v1/enrollmentPackages/${termCode}/${subject_id}/${course_id}`;
  const results = await axios(url);
  return results.data;
};

// repeat every 10 seconds
const timer = setIntervalAsync(async () => {
  console.log("Hello :D");

  const allCourse = await courseModel.getAll();

  for (let i = 0; i < allCourse.length; i++) {
    const course = allCourse[i];
    // get course detail (containing sections)
    const results = await getCourseDetail(course.subject_id, course.course_id);
    // responder call
    responder(results);
  }
}, 10000);

module.exports = timer;
