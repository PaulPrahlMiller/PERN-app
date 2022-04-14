const router = require("express").Router();
const {
  getAllRegistered,
  registerToCourse,
  removeFromCourse,
} = require("../controllers/registration");

router.get("/", getAllRegistered);

router.post("/", registerToCourse);

router.delete("/", removeFromCourse);

module.exports = router;
