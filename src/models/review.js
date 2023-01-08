const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  }, // course_code的SHA1前10位
  course_prof: {
    type: String,
    required: true,
  },
  course_section: {
    type: String,
    required: true,
  },
  rating_general: {
    type: Number,
    required: true,
  },
  rating_workload: {
    type: Number,
    required: true,
  },
  rating_difficulty: {
    type: Number,
    required: true,
  },
  rating_teaching: {
    type: Number,
    required: true,
  },
  rating_grading: {
    type: Number,
    required: true,
  },
  rating_helpful: {
    type: Number,
    required: true,
  },
  review_content: {
    type: String,
    required: true,
  },
  meta_up: {
    type: Number,
    required: true,
  },
  meta_down: {
    type: Number,
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

module.exports = mongoose.model("Review", schema);
