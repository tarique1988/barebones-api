const studentRouter = require("express").Router();
const { GetStudents } = require("../controllers/student");

studentRouter.route("/").get(GetStudents);

module.exports = studentRouter;
