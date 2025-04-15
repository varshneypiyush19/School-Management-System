const mongoose = require("mongoose");
const examinationSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
  },
  examDate: {
    type: Date,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  examtype: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("Examination", examinationSchema);
