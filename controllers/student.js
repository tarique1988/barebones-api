const Student = require("../models/Student");
const asyncHandler = require("../middlewares/asyncHandler");
const Counter = require("../models/Counter");
const ErrorResponse = require("../utils/errorResponse");

// description      Get all students
// route            GET /api/students
// access           Public/Private
exports.GetStudents = asyncHandler(async (req, res, next) => {
	const students = await Student.find();
	res.status(200).json({ success: true, data: students });
});

// description      Add a student
// route            POST /api/students/
// access           Public/Private
exports.AddStudent = asyncHandler(async (req, res, next) => {
	let studentCounter = await Counter.find({ id: "student" });
	if (studentCounter.length === 0) {
		studentCounter = await Counter.create({
			id: "student",
			sequenceValue: 200_001,
		});
	} else {
		studentCounter = await Counter.findOneAndUpdate(
			{ id: "student" },
			{
				$inc: { sequenceValue: 1 },
			}
		);
	}
	req.body.uid = studentCounter.sequenceValue;
	let student = await Student.create(req.body);
	res.status(200).json({ success: true, data: student });
});

// description      Get a student
// route            GET /api/students/:id
// route            GET /api/students/uid/:uid
// access           Public/Private
exports.GetStudent = asyncHandler(async (req, res, next) => {
	let student;
	if (!req.params.uid) {
		student = await Student.findById(req.params.id);
		if (!student) {
			return next(
				new ErrorResponse(`Student with id ${req.params.id} not found.`, 404)
			);
		}
	} else {
		student = await Student.findOne({ uid: req.params.uid });
		if (!student) {
			return next(
				new ErrorResponse(`Student with uid: ${req.params.uid} not found.`, 404)
			);
		}
	}
	res.status(200).json({ success: true, data: student });
});

// description      Update a student
// route            PUT /api/students/:id
// route            PUT /api/students/uid/:id
// access           Public/Private
exports.UpdateStudent = asyncHandler(async (req, res, next) => {
	let student;
	if (!req.params.uid) {
		student = await Student.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!student) {
			return next(
				new ErrorResponse(`Student with id ${req.params.id} not found.`, 404)
			);
		}
	} else {
		student = await Student.findOneAndUpdate(
			{ uid: req.params.uid },
			req.body,
			{ new: true }
		);
		if (!student) {
			return next(
				new ErrorResponse(`Student with uid: ${req.params.uid} not found.`, 404)
			);
		}
	}
	res.status(200).json({ success: true, data: student });
});

// description      Delete a student
// route            DELETE /api/students/:id
// route            DELETE /api/students/uid/:uid
// access           Public/Private
exports.DeleteStudent = asyncHandler(async (req, res, next) => {
	let student;
	if (!req.params.uid) {
		student = await Student.findByIdAndRemove(req.params.id);
		if (!student) {
			return next(
				new ErrorResponse(`Student with id ${req.params.id} not found.`, 404)
			);
		}
	} else {
		student = await Student.findOneAndRemove({ uid: req.params.uid });
		if (!student) {
			return next(
				new ErrorResponse(`Student with uid: ${req.params.uid} not found.`, 404)
			);
		}
	}
	res.status(200).json({ success: true, data: student });
});
