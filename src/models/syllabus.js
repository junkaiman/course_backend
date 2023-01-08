const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  course_prof: {
    type: String,
    required: true,
  },
  course_section: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  meta_user_id: {
    type: String,
    required: true,
  },
  meta_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Syllabus", schema);
