const { setIntervalAsync } = require('set-interval-async/fixed');
const axios = require('axios').default;

// const getCourseList = async () => {
//   const result = await axios.post('https://public.enroll.wisc.edu/api/search/v1/', {
//     filters: [],
//     pageSize: 2000,
//     queryString: "*",
//     selectedTerm: "1216",
//     sortOrder: "SCORE"
//   });
//   const courses = await result.data.hits.map(entry => {
//     return {
//       course_id: entry.courseId,
//       course_name: entry.courseDesignation
//     }
//   });
//   return courses;
// }

const timer = setIntervalAsync(async () => {
  console.log('Hello');

  // update course database
  //   1. access-database to get all subscribed sections
  //   2. for each section(course), get sections and status from enroll.wisc api
  //   3. for each course, update-to-database new status

  // get the list of courses that the status has changed
  //   1. access-database to get courses
  //   2. find sections that status has changed

  // send an email to users
  //   1. access-database to get a list of users
  //   2. for each user, find changed sections and customize notification message
  //   3. call email service to send the notification


  
  // courses = getAllSubscribedCourses(); (Courses controller)

  // for course in courses:
  //   for section in course.section: 
  //     get status (wisc api)
  //     update database (Courses model)
  //     send email (responder)

}, 1000);

module.exports = timer;