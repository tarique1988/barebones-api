const mongoose = require("mongoose");

const getFeeEntries = () => {
	const year = new Date().getFullYear();
	return {
		january: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		february: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		march: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		april: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		may: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		june: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		july: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		august: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		september: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		october: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		november: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
		december: {
			year,
			isPaid: false,
			paidOn: undefined,
		},
	};
};

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
			type: Object,
			default: getFeeEntries,
		},
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Feebook", feebookSchema);
