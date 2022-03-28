const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  subject_id: {
    type: String,
    required: true,
  },
  sections: [
    {
      section_id: {
        type: String,
        required: true,
      },
      subscribers: [
        {
          email: {
            type: String,
            required: true,
          },
          last_sent: {
            type: Date,
            default: 0,
          },
        },
      ],
      status: {
        type: String,
        default: "unknown",
      },
      prev_status: {
        type: String,
        default: "unknown",
      },
    },
  ],
});
// status can be 'OPEN', 'WAITLISTED', 'CLOSED', or 'unknown'

const Courses = mongoose.model("Courses", CourseSchema);

const find = (course_id) => {
  return Courses.find({ course_id: course_id });
};

const create = async (adding_course) => {
  const course = new Courses(adding_course);
  const savedCourse = await course.save();
  return savedCourse;
};

const update = async (updated_course) => {
  const updatedCourse = await Courses.findByIdAndUpdate(
    updated_course._id,
    updated_course,
    { new: true }
  );
  return updatedCourse;
};

const remove = async (removing_course) => {
  await Courses.deleteOne({ _id: removing_course._id });
};

const all = () => {
  return Courses.find({}); // async
};

module.exports = {
  find,
  create,
  update,
  remove,
  all
};
