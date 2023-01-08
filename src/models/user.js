const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  }, // Gallinula user id
  user_name: {
    type: String,
    required: true,
  }, // Gallinula username
  email: {
    type: String,
    required: true,
  }, // Gallinula email
  joined_at: {
    type: Date,
    required: true,
    default: Date.now,
  }, // 加入course.gallinula.com的时间
  user_status: {
    type: String,
    required: true,
  },
  // confirmed: 正式用户
  // waitlisted: 排队用户
  // pending: 未激活，等待上传第一个syllabus
  // disabled: 被禁用
  n_bolt: {
    type: Number,
    required: true,
  }, // bolt number
  unlocked_course_ids: [{ course_id: String, unlock_date: Date }],
  uploaded_syllabus_ids: [{ syllabus_id: String }],
  uploaded_review_ids: [{ review_id: String }],
  invite_code: {
    type: String,
    required: true,
  }, // 随机生成的Invite Code，用于网站参数
  inviter_id: {
    type: String,
    required: false,
  }, // 邀请人的Gallinula Id
  invitee_ids: [{ invitee_id: String }], // 被邀请人的Gallinula Ids
});

module.exports = mongoose.model("users", schema);
