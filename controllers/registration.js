const db = require("../config/db");

const registerToCourse = async (req, res, next) => {
  const { studentId, courseCode } = req.body;

  // Check if student exists
  const student = await db.oneOrNone(
    "SELECT * FROM student WHERE unit_id=($1)",
    [studentId]
  );

  if (!student) {
    return res.status(400).json({ error: "Student doesn't exist" });
  }

  // Check if course exists
  const course = await db.oneOrNone(
    "SELECT * FROM course WHERE course_code=($1)",
    [courseCode]
  );

  if (!course) {
    return res.status(400).json({ error: "Course doesn't exist" });
  }

  // Register the student
  await db
    .one(
      "INSERT INTO registration (student_id, course_id) VALUES ($1, $2) RETURNING student_id, course_id, unix_timestamp",
      [studentId, courseCode]
    )
    .then((data) => res.status(201).json(data))
    .catch((error) => {
      if (error.code === "23505") {
        return res.status(409).json({
          error: `Student is already registered to ${course.course_name} course`,
        });
      }
      next(error);
    });
};

const removeFromCourse = async (req, res, next) => {
  const { studentId, courseCode } = req.body;

  await db
    .one(
      "DELETE FROM registration WHERE student_id=($1) AND course_id=($2) RETURNING student_id, course_id",
      [studentId, courseCode]
    )
    .then((response) => res.status(200).send(response))
    .catch((error) => {
      if (error.code === 0) {
        return res
          .status(400)
          .json({ error: "Student is not registered for that course" });
      }
      next(error);
    });
};

const getAllRegistered = async (req, res, next) => {
  const query = `
    SELECT
      student.unit_id AS student_id,
      student.name AS student_name,
      course.course_name,
      registration.unix_timestamp
    FROM student
    JOIN registration
    ON student.unit_id = registration.student_id
    JOIN course
    ON registration.course_id = course.course_code
    ORDER BY unix_timestamp DESC
    LIMIT 5
  `;
  await db
    .any(query)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

module.exports = {
  registerToCourse,
  getAllRegistered,
  removeFromCourse,
};
