const express = require("express");
const router = express.Router();

const { getStationsData } = require("../controller/stationController");

router.route("/").get(getStationsData);

module.exports = router;
