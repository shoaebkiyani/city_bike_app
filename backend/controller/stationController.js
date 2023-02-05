const asyncHandler = require("express-async-handler");
const Station = require("../models/stationsModel");

const getStationsData = asyncHandler(async (req, res) => {
  const stations = await Station.find({});
  res.status(200).json(stations);
});

module.exports = { getStationsData };
