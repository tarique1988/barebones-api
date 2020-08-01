const studentRouter = require("express").Router();
const {
	GetStudents,
	AddStudent,
	GetStudent,
	UpdateStudent,
	DeleteStudent,
} = require("../controllers/student");

const { GetFeeBookByUID, AddFeePaymentsByUID } = require("../controllers/fees");

studentRouter
	.route("/feebooks/:uid")
	.get(GetFeeBookByUID)
	.put(AddFeePaymentsByUID);

studentRouter.route("/").get(GetStudents).post(AddStudent);

studentRouter
	.route("/:id")
	.get(GetStudent)
	.put(UpdateStudent)
	.delete(DeleteStudent);

studentRouter
	.route("/uid/:uid")
	.get(GetStudent)
	.put(UpdateStudent)
	.delete(DeleteStudent);

module.exports = studentRouter;
