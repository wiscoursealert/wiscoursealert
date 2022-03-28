const config = require("../config");
const axios = require("axios");

const pageSize = 10000;       // display course per page

const getSearchResults = async (queryString) => {
  const url = config.apiUrl + "/search/v1";
  const payload = {
    page: 1,                      // scroll down == increase page
    pageSize: pageSize, 
    queryString: queryString,
    selectedTerm: config.termCode,
    sortOrder: "SCORE",
  };
  const apiResult = await axios.post(url, payload);
  /* format
    * [{
    *     "course_name": "COMP SCI 699"
    *     "course_id": "69420",
    *     "subject_id": "266"
    * }]
    */
  const courses = await apiResult.data.hits.map((entry) => {
    return {
      course_id: entry.courseId,
      course_name: entry.courseDesignation,
      course_full_name: entry.title,
      subject_id: entry.subject.subjectCode,
    };
  });
  return courses;
};

const getSections = async (subject_id, course_id) => {
  const url = config.apiUrl + "/search/v1/enrollmentPackages/" + config.termCode + "/" + subject_id + "/" + course_id
  const apiResult = await axios.get(url);
  /* format
    * [{   
    *     "section_id": "32635",
    *     "status": "WAITLISTED",
    *     "lecture_name": "002",
    *     "discussion_name": "326"
    * }]
    */
  const sections = await apiResult.data.map((entry) => {
    return {
      section_id: entry.id,
      status: entry.packageEnrollmentStatus.status,
      lecture_name: entry.sections
        .filter((x) => x.type == "LEC")
        .map((x) => {
          return x.sectionNumber;
        })[0],
      discussion_name: entry.sections
        .filter((x) => x.type == "DIS")
        .map((x) => {
          return x.sectionNumber;
        })[0],
      Lab_name: entry.sections
        .filter((x) => x.type == "LAB")
        .map((x) => {
          return x.sectionNumber;
        })[0],
    };
  });
  return sections;
};

module.exports = {
  getSearchResults,
  getSections
};
