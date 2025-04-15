const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  startTime: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
