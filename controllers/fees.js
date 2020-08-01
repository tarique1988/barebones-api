const Student = require("../models/Student");
const FeeBook = require("../models/Feebook");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Feebook = require("../models/Feebook");

// description    Get all feebooks
// route          GET api/feebooks/
// access         Private
exports.GetAllFeebooks = asyncHandler(async (req, res, next) => {
	let feeBooks = await FeeBook.find().populate({
		path: "student",
		select: "firstName middleName lastName",
	});
	res.status(200).json({ success: true, data: feeBooks });
});

// description    Get Feebook by UID
// route        GET api/feebooks/:uid
// route        GET api/students/feebooks/:uid
exports.GetFeeBookByUID = asyncHandler(async (req, res, next) => {
	let feebooks = await FeeBook.find({ uid: req.params.uid }).populate({
		path: "student",
		select: "firstName middleName lastName",
	});
	if (feebooks.length === 0) {
		return next(
			new ErrorResponse(
				`FeeBook not found for student with uid: ${req.params.uid}`
			)
		);
	}

	res.status(200).json({ success: true, feebooks });
});

// description      Receives an array of feeEntries and adds them to feeEntries of the student
// route            PUT api/feebooks/:uid
// route            PUT api/students/feebooks/:uid
// access           Private
exports.AddFeePaymentsByUID = asyncHandler(async (req, res, next) => {
	let newEntries = req.body.feeEntries;
	let currentFeeBook = await FeeBook.findOne({ uid: req.params.uid });
	let isExists = false;
	let entry = {};

	if (!currentFeeBook) {
		return next(new ErrorResponse(`Feebook not found!`, 404));
	}

	let oldEntries = currentFeeBook.feeEntries.map((entry) => entry.month);
	let existingEntries = newEntries.filter((entry) =>
		oldEntries.includes(entry.month)
	);
	let entries = newEntries.filter((entry) => !oldEntries.includes(entry.month));

	if (entries.length === 0) {
		return next(
			new ErrorResponse(`Nothing to add, the entries already exist!`, 400)
		);
	}
	entries.forEach((entry) => {
		currentFeeBook.feeEntries.push(entry);
	});
	await currentFeeBook.save();
	res
		.status(200)
		.json({
			success: true,
			existingEntries,
			newEntries: entries,
			currentFeeBook,
		});
});
