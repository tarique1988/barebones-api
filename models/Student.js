const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required!"],
		},
		middleName: {
			type: String,
		},
		lastName: {
			type: String,
			required: [true, "Last name is required!"],
		},
		createdAt: {
			type: Date,
			default: () => {
				Date.now() + 330 * 60 * 1000;
			},
		},
		lastModifiedAt: {
			type: Date,
		},
		dateOfBirth: {
			type: Date,
		},
		uid: {
			type: Number,
			required: true,
			unique: true,
		},
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Student", StudentSchema);
