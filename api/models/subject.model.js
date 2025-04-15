const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
  },
  subject_name: {
    type: String,
    required: true,
  },
  subject_codename: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
