const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
  },
  class_test: {
    type: String,
    required: true,
  },
  class_num: {
    type: Number,
    required: true,
  },
  attendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("Class", classSchema);
