const asyncHandler = require("express-async-handler");
const Trip = require("../models/datasetModel");
const Dataset = require("../models/datasetModel");

// Get all trips
// GET /api/trips
const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({});
  res.status(200).json(trips);
});

const getDataset = asyncHandler(async (req, res) => {
  const dataset = await Dataset.find({});
  res.status(200).json(dataset);
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
  getDataset,
};
