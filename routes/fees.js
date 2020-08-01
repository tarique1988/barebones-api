const express = require("express");
const feeBookRouter = express.Router({ mergeParams: true });
const {
	GetFeeBookByUID,
	GetAllFeebooks,
	AddFeePaymentsByUID,
} = require("../controllers/fees");

feeBookRouter.route("/").get(GetAllFeebooks);
feeBookRouter.route("/:uid").get(GetFeeBookByUID).put(AddFeePaymentsByUID);

module.exports = feeBookRouter;
