// const mongoose=require('mongoose');
const { default: mongoose } = require("mongoose");
const HttpError = require("../models/http-error");
const { Course } = require("../models/course-schema");

const getAllCourses = async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find({}, "-__v");
  } catch (err) {
    const error = new HttpError(
      "Fetching courses failed, please try again later",
      500
    );
    return next(err);
  }
  res.status(200).json({
    courses: courses.map((course) => course.toObject({ getters: true })),
  });
};
const getUgOrPgCourses = async (req, res, next) => {
  const level = req.params.level;
  let courses;
  try {
    courses = await Course.find({ level: level }, "-__v");
  } catch (err) {
    const error = new HttpError(
      "Fetching courses failed, please try again later",
      500
    );
    return next(err);
  }
  res.status(200).json({
    courses: courses.map((course) => course.toObject({ getters: true })),
  });
};

const createCourse = async (req, res, next) => {
  // add validation for req using express-validator package

  const { courseName, duration, level } = req.body;

  const createdCourse = new Course({
    courseName: courseName,
    duration: duration,
    level: level,
  });

  try {
    await createdCourse.save();
  } catch (err) {
    const error = new HttpError(
      "Creating course failed, please try again later!!!",
      500
    );
    return next(error);
  }
  res.status(201).json({ course: createdCourse });
};

const deleteCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete course!!!",
      500
    );
    return next(error);
  }
  if (!course) {
    const error = new HttpError("Could not find course for the given id", 404);
    return next(error);
  }

  try {
    await course.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete course!!!",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted course!" });
};

const updateCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  const { courseName, duration, level } = req.body;
  let course;
  try {
    course = await Course.findById(courseId);
    console.log(course);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the course",
      500
    );
    return next(error);
  }

  if (!course) {
    const error = new HttpError(
      "Could not find the course for the given id to update!",
      404
    );
    return next(error);
  }

  course.courseName = courseName;
  course.duration = duration;
  course.level = level;

  try {
    await course.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the course.",
      500
    );
    return next(error);
  }
  res.status(200).json({ course: course.toObject({ getters: true }) });
};

exports.getAllCourses = getAllCourses;
exports.getUgOrPgCourses = getUgOrPgCourses;
exports.createCourse = createCourse;
exports.deleteCourse = deleteCourse;
exports.updateCourse = updateCourse;