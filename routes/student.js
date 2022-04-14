const router = require("express").Router();
const {
  getStudents,
  createStudent,
  deleteStudent,
} = require("../controllers/student");

router.get("/", getStudents);

router.post("/", createStudent);

router.delete("/:id", deleteStudent);

module.exports = router;
