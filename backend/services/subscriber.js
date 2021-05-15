const courseModel = require('../models/Courses');

const subscriber = {};

touchCourse = async (course_id) => {
  const courses = await courseModel.getCourse(course_id);

  var course;
  // if course with course_id doesn't exist, add it
  if (courses.length === 0) {
    course = await courseModel.addCourse({ course_id: course_id });
  }
  else {
    course = courses[0];
  }
  return course;
}

touchSection = async (course_id, section_id) => {
  const course = await touchCourse(course_id);
  const sectionIndex = course.sections.findIndex(section => {
    return section.section_id === section_id;
  });
  // if section doesn't exist in this course, add it
  if (sectionIndex === -1) {
    course.sections.push({ section_id: section_id });
  }
  const updatedCourse = await courseModel.updateCourse(course);
  return updatedCourse;
}

subscribe = async (course_id, section_id, email) => {
  const course = await touchSection(course_id, section_id);
  course.sections = course.sections.map(section => {
    if (section.section_id === section_id) {
      // if section doesn't have this email, add it
      if (section.subscribers.findIndex(user => user.email == email) === -1) {
        section.subscribers.push({ email: email });
      }
    }
    return section;
  });
  const updatedCourse = await courseModel.updateCourse(course);
  return updatedCourse;
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