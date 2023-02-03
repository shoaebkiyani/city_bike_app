const express = require("express");
const router = express.Router();
const {
  getTrips,
  setTrips,
  getDataset,
} = require("../controller/tripController");

router.route("/").get(getTrips).post(setTrips);
router.route("/").get(getDataset);

module.exports = router;
