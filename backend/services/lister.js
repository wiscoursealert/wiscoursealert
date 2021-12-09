const axios = require("axios");
const lister = {};

lister.getSearchResults = async (queryString) => {
  let searchResult = {};
  try {
    //posting
    url = "https://public.enroll.wisc.edu/api/search/v1";
    payload = {
      // may change later
      page: 1, // scroll down == increase page
      pageSize: 20, // display course per page
      queryString: queryString,
      selectedTerm: "1222",
      sortOrder: "SCORE",
    };
    searchResult = await axios.post(url, payload);

    // mapping
    /* format
        [
        {
            "course_name": "COMP SCI 699"
            "course_id": "69420",
            "subject_id": "266"
        },
        ...
        ]
        */
    const courses = await searchResult.data.hits.map((entry) => {
      return {
        course_id: entry.courseId,
        course_name: entry.courseDesignation,
        subject_id: entry.subject.subjectCode,
      };
    });
    return courses;
  } catch (err) {
    console.log("lister err " + err);
    res.status(500).json({ message: err });
  }
};

lister.getSections = async (subject_id, course_id) => {
  let api_req = {};
  let termCode = "1222"; // fall2021
  let url =
    "https://public.enroll.wisc.edu/api/search/v1/enrollmentPackages/" +
    termCode +
    "/" +
    subject_id +
    "/" +
    course_id +
    "/";
  api_req = await axios.get(url);
  /* format
    [       {   "section_id": "32635",
                "status": "WAITLISTED",
                "lecture_name": "002",
                "discussion_name": "326"
            }, 
            ...
    ]
    */
  const sections = api_req.data.map((entry) => {
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

module.exports = lister;
