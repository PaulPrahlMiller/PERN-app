const db = require("../config/db");

const createStudent = async (req, res, next) => {
  const { name, email } = req.body;

  // Check if user with email exists
  const userExists = await db
    .oneOrNone("SELECT email FROM student WHERE email=($1)", [email])
    .catch(next);

  if (userExists) {
    return res
      .status(409)
      .json({ error: `User with email ${email} already exists` });
  }

  return await db
    .one(
      "INSERT INTO student (name, email) VALUES ($1, $2) RETURNING unit_id AS student_id, name, email",
      [name, email]
    )
    .then((data) => res.status(201).json(data))
    .catch(next);
};

const deleteStudent = async (req, res, next) => {
  const id = req.params.id;

  await db
    .none("DELETE FROM registration WHERE student_id=($1)", [id])
    .catch(next);

  return await db
    .one(
      "DELETE FROM student WHERE unit_id=($1) RETURNING unit_id AS student_id, name, email",
      [id]
    )
    .then((data) => res.status(202).json(data))
    .catch(next);
};

const getStudents = async (req, res, next) => {
  return await db
    .any("SELECT * FROM student ORDER BY unit_id ASC")
    .then((data) => res.status(200).json(data))
    .catch(next);
};

module.exports = {
  createStudent,
  getStudents,
  deleteStudent,
};
