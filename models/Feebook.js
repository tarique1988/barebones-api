const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
	month: {
		type: String,
		enum: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const feebookSchema = new mongoose.Schema(
	{
		student: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
			required: true,
		},
		uid: {
			type: Number,
			required: true,
		},
		feeEntries: {
			type: [feeSchema],
		},
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Feebook", feebookSchema);
