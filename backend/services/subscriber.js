const courseModel = require('../models/Courses');

const subscriber = {};

findCourse = async (course_id, course_name, subject_id) => {
  const courses = await courseModel.getCourse(course_id);

  var course;
  // if course with course_id doesn't exist, add it
  if (courses.length === 0) {
    course = await courseModel.addCourse({ 
      course_id: course_id,
      course_name: course_name,
      subject_id: subject_id 
    });
  }
  else {
    course = courses[0];
  }
  return course;
}

findSection = async (course_id, course_name, subject_id, section_id) => {
  const course = await findCourse(course_id, course_name, subject_id);
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

subscribe = async (course_id, course_name, subject_id, section_id, email) => {

  const course = await findSection(course_id, course_name, subject_id, section_id);
  
  course.sections = course.sections.map(section => {
    if (section.section_id === section_id) {
      // if section doesn't have this email, add it
      if (section.subscribers.findIndex(user => user.email === email) === -1) {
        section.subscribers.push({ email: email });
      }
    }
    return section;
  });
  
  const updatedCourse = await courseModel.updateCourse(course);
  return updatedCourse;
}

unsubscribe = async (course_id, course_name, subject_id, section_id, email) => {
  const course = (await courseModel.getCourse(course_id))[0];
  // remove email from this section
  course.sections = course.sections.map(section => {
    if (section.section_id === section_id) {
      // remove email from this section
      section.subscribers = section.subscribers.filter(subscriber => subscriber.email !== email);
    }
    return section;
  });
  // remove section without subscribers
  course.sections = course.sections.filter(section => {
    return section.subscribers.length !== 0;
  });

  const updatedCourse = await courseModel.updateCourse(course);
  
  // remove course with no sections
  if (updatedCourse.sections.length === 0) {
    courseModel.removeCourse(updatedCourse);
  }
}

subscriber.updateUser = async (user, type) => {

  const email = user.email;
  const courses = user.subscribed;
  for (let i = 0; i < courses.length; i++) {
    
    const course = courses[i];

    const course_id   = course.course_id,
          course_name = course.course_name,
          subject_id  = course.subject_id;
    
    const sections = course.sections;

    for (let j = 0; j < sections.length; j++) {
      
      const section_id = sections[j].section_id;
      
      if (type === 'subscribe') {
        await subscribe(course_id, course_name, subject_id, section_id, email);
      }
      
      if (type === 'unsubscribe') {
        await unsubscribe(course_id, course_name, subject_id, section_id, email);
      }

    }

  }
}

module.exports = subscriber;