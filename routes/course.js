const router = require("express").Router();
const {
  getCourses,
  createCourse,
  deleteCourse,
} = require("../controllers/course");

router.get("/", getCourses);

router.post("/", createCourse);

router.delete("/:id", deleteCourse);

module.exports = router;
