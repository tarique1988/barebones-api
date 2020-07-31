const Student = require("../models/Student");
const asyncHandler = require("../middlewares/asyncHandler");

// description      Get all students
// route            GET /api/students
// access           Public/Private
exports.GetStudents = asyncHandler(async (req, res, next) => {
	const students = await Student.find();
	res.status(200).json({ success: true, data: students });
});
