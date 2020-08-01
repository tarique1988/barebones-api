const Student = require("../models/Student");
const FeeBook = require("../models/Feebook");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// description    Get all feesbooks
// route          GET api/feesbooks/
// access         Private
exports.GetAllFeebooks = asyncHandler(async (req, res, next) => {
	let feeBooks = await FeeBook.find().populate({
		path: "student",
		select: "firstName middleName lastName",
	});
	res.status(200).json({ success: true, data: feeBooks });
});

// description    Get Feesbook by UID
// route        GET api/feesbooks/:uid
// route        GET api/students/feesbooks/:uid
exports.GetFeesbookByUID = asyncHandler(async (req, res, next) => {
	let feesbooks = await FeeBook.find({ uid: req.params.uid }).populate({
		path: "student",
		select: "firstName middleName lastName",
	});
	if (feesbooks.length === 0) {
		return next(
			new ErrorResponse(
				`Feesbook not found for student with uid: ${req.params.uid}`
			)
		);
	}

	res.status(200).json({ success: true, feesbooks });
});
