const express = require("express");
const router = express.Router();

const { getTrips, setTrips } = require("../controller/tripController");

router.route("/").get(getTrips).post(setTrips);

module.exports = router;
