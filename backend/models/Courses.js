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
    subscriber_email: [String],
    status: {
      type: String,
      default: 0
    },
    prev_status: {
      type: String,
      default: 0
    }
  }]
});

// status can be 'open', 'waitlist', 'closed', or 'unknown'

module.exports = mongoose.model('Courses', CourseSchema);