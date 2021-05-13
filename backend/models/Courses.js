const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  course_id: Number,
  sections: [Number],
  status: [Number],
  prev_status: [Number]
});

module.exports = mongoose.model('Courses', CourseSchema);