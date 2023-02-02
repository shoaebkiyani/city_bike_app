const asyncHandler = require("express-async-handler");

// Get all trips
// GET /api/trips
const getTrips = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Trips" });
});

// Add trip
// POST /api/trips
const setTrips = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    // express error handler
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Set Trips" });
});

module.exports = {
  getTrips,
  setTrips,
};
