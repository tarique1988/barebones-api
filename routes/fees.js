const express = require("express");
const feesRouter = express.Router({ mergeParams: true });
const { GetFeesbookByUID, GetAllFeebooks } = require("../controllers/fees");

feesRouter.route("/").get(GetAllFeebooks);
feesRouter.route("/:uid").get(GetFeesbookByUID);

module.exports = feesRouter;
