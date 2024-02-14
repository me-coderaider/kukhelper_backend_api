const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    courseName: { type: String, required: true, unique: true },
    duration: { type: Number, required: true },
    level: { type: String, required: true },
    // syllabus : [] // i think we should have separate table for the syllabus and using course Id we can fetch all of the courses
  },
  {
    timestamps: true,
  },
  { versionKey: false },
  { _id: false }
);

const syllabusSchema = new Schema(
  {
    courseName: { type: String, required: true },
    semester: { type: String, required: true },
  },
  {
    timestamps: true,
  },
  { _id: false }
);

const Course = mongoose.model("Course", courseSchema);
const Syllabus = mongoose.model("Syllabus", syllabusSchema);
module.exports = {
  Course,
  Syllabus,
};
