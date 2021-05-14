const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  course_id: {
    type: String,
    required: true
  },
  sections: [{
    section_id: {
      type: String,
      required: true
    },
    subscribers: [{
      email: {
        type: String,
        required: true
      },
      last_sent: {
        type: Date,
        default: "null"
      }
    }],
    status: {
      type: String,
      default: "unknown"
    },
    prev_status: {
      type: String,
      default: "unknown"
    }
  }]
});

// status can be 'OPEN', 'WAITLISTED', 'CLOSED', or 'unknown'

module.exports = mongoose.model('Courses', CourseSchema);

const Courses = mongoose.model('Courses');
const courseModel = {}

courseModel.getCourse = (course_id) => {
  return Courses.find({course_id: course_id})
}

courseModel.updateCourse = async (updated_course) => {
  const updatedCourse = await Courses.findByIdAndUpdate(updated_course._id, updated_course, {new: true})
  return updatedCourse
}

module.exports = courseModel;
