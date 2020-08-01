const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
	id: {
		type: String,
		required: [true, "You forgot to put the id!"],
		unique: true,
	},
	sequenceValue: {
		type: Number,
	},
});

module.exports = mongoose.model("Counter", CounterSchema);
