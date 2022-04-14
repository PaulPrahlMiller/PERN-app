const db = require("../config/db");

const getCourses = async (req, res, next) => {
  return await db
    .any("SELECT * FROM course")
    .then((data) => res.send(data))
    .catch(next);
};

const createCourse = async (req, res, next) => {
  const { courseCode, name, description } = req.body;

  const courseExists = await db
    .oneOrNone("SELECT course_code FROM course WHERE course_code=($1)", [
      courseCode,
    ])
    .catch(next);

  if (courseExists) {
    return res
      .status(409)
      .json({ error: `A course with code ${courseCode} already exists` });
  }

  return await db
    .one(
      "INSERT INTO course (course_code, course_name, course_description) VALUES ($1, $2, $3) RETURNING course_code, course_name, course_description",
      [courseCode, name, description]
    )
    .then((data) => res.status(201).json(data))
    .catch(next);
};

const deleteCourse = async (req, res, next) => {
  const id = req.params.id;

  await db
    .none("DELETE FROM registration WHERE course_id=($1)", [id])
    .catch(next);

  return await db
    .one(
      "DELETE FROM course WHERE course_code=($1) RETURNING course_code, course_name, course_description",
      [id]
    )
    .then((data) => res.status(202).json(data))
    .catch(next);
};

module.exports = {
  getCourses,
  createCourse,
  deleteCourse,
};
