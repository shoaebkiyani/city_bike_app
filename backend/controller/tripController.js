const asyncHandler = require("express-async-handler");
const Trip = require("../models/tripsModel");

/* Get all trips */
/* GET /api/trips */
const getTrips = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || "";
  const order = Number(req.query.order) || -1;
  const duration = Number(req.query.duration) || "";
  const skip = (page - 1) * limit;

  try {
    const totalTrips = await Trip.countDocuments();
    let searchResults = [];
    if (!search) {
      searchResults = 0;
    } else {
      searchResults = await Trip.countDocuments({
        departure_station_name: { $regex: search, $options: "i" },
      });
    }

    let durationCountResults = [];

    let match = {};
    if (search) {
      match.$or = [
        { departure_station_name: new RegExp(search, "i") },
        { return_station_name: new RegExp(search, "i") },
      ];
    }
    if (duration) {
      match.$and = [
        { departure_station_name: new RegExp(search, "i") },
        { duration_sec: { $lt: duration } },
      ];
    }
    if (duration) {
      match.$and = [
        { return_station_name: new RegExp(search, "i") },
        { duration_sec: { $lte: duration } },
      ];
    }

    const trips = await Trip.aggregate(
      [
        {
          $project: {
            departure_date: true,
            return_date: true,
            departure_station_id: true,
            departure_station_name: true,
            return_station_id: true,
            return_station_name: true,
            covered_distance_m: { $divide: ["$covered_distance_m", 1000] },
            duration_sec: { $divide: ["$duration_sec", 60] },
          },
        },
        { $match: match },
        {
          $sort: {
            //departure_station_id: order,
            departure_date: order,
            // duration_sec: order,
          },
        },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            _id: true,
            departure_date: true,
            return_date: true,
            departure_station_id: true,
            departure_station_name: true,
            return_station_id: true,
            return_station_name: true,
            covered_distance_m: { $round: ["$covered_distance_m", 2] },
            duration_sec: { $round: ["$duration_sec", 2] },
          },
        },
      ],
      { allowDiskUse: true }
    );

    res.status(200).json({
      trips,
      page,
      limit,
      skip,
      order,
      durationCountResults,
      search,
      searchResults,
      totalTrips,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

/* Add trip */
/* POST /api/trips */
const setTrips = asyncHandler(async (req, res) => {
  const {
    departure_date,
    return_date,
    departure_station_id,
    departure_station_name,
    return_station_id,
    return_station_name,
    covered_distance_m,
    duration_sec,
  } = req.body;

  if (
    !departure_date ||
    !return_date ||
    !departure_station_id ||
    !departure_station_name ||
    !return_station_id ||
    !return_station_name ||
    !covered_distance_m ||
    !duration_sec
  ) {
    res.status(400);
    /* express error handler */
    throw new Error("Please add all fields");
  }

  /* Create Trip Document */
  const trip = await Trip.create({
    departure_date,
    return_date,
    departure_station_id,
    departure_station_name,
    return_station_id,
    return_station_name,
    covered_distance_m,
    duration_sec,
  });

  if (trip) {
    res.status(201).json({
      _id: trip.id,
      departure_date: trip.departure_date,
      return_date: trip.return_date,
      departure_station_id: trip.departure_station_id,
      departure_station_name: trip.departure_station_name,
      return_station_id: trip.return_station_id,
      return_station_name: trip.return_station_name,
      covered_distance_m: trip.covered_distance_m,
      duration_sec: trip.duration_sec,
    });
  } else {
    res.status(400);
    throw new Error("Invalid trip data");
  }
});

module.exports = {
  getTrips,
  setTrips,
};
