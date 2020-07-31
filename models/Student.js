const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
	someField: {
		type: String,
		required: [true, "some field is required!"],
	},
	someOtherField: {
		type: String,
	},
});

module.exports = mongoose.model("Student", StudentSchema);
