const express = require("express");
const path = require("path");
const studentRoutes = require("./routes/student");
const courseRoutes = require("./routes/course");
const registrationRoutes = require("./routes/registration");

const app = express();

app.use(express.json());

app.use("/api/student", studentRoutes);

app.use("/api/course", courseRoutes);

app.use("/api/registration", registrationRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal server error" });
});

app.use(express.static(path.join(__dirname, "client", "dist")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
