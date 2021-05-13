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
      type: Number,
      default: 0
    },
    prev_status: {
      type: Number,
      default: 0
    }
  }]
});

module.exports = mongoose.model('Courses', CourseSchema);