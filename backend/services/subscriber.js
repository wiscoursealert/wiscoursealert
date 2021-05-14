const courseModel = require('../models/Courses');

const subscriber = {};

subscribe = async (course_id, section_id, email) => {

  console.log('subscribe');

  const courses = await courseModel.getCourse(course_id);
  console.log('course:', courses);

  // if there is no course in this database, add new course
  if (courses.length === 0) {
    courseModel.addCourse({ course_id: course_id });
  }

}

unsubscribe = async (course_id, section_id, email) => {

}

subscriber.updateUser = async (user, type) => {
  const email = user.email;
  const courses = user.subscribed;
  for (let i = 0; i < courses.length; i++) {
    const course_id = courses[i].course_id;
    const sections = courses[i].sections;
    for (let j = 0; j < sections.length; j++) {
      const section_id = sections[j].section_id;

      console.log('course_id, section_id', course_id, section_id);
      if (type === 'subscribe') {
        await subscribe(course_id, section_id, email);
      }
      if (type === 'unsubscribe') {
        await unsubscribe(course_id, section_id, email);
      }
    }
  }
}

module.exports = subscriber;