const express = require("express");
const coursesController = require("../controller/courses-controller");
// const checkAuth=require("../middleware/check-auth");

const route = express.Router();

route.get("/", coursesController.getAllCourses);
route.get("/:level", coursesController.getUgOrPgCourses);
//adding a middleware, if request doesnt have valid token, then we;ll throw error
// router.use(checkAuth);

route.post("/add-course", coursesController.createCourse);

route.delete("/:courseId", coursesController.deleteCourse);

route.patch("/:courseId", coursesController.updateCourse);

module.exports = route;
