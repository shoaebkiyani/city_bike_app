const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    departure_date: {
      type: String,
      required: true,
      unique: true,
    },
    return_date: {
      type: String,
      required: true,
    },
    departure_station_id: {
      type: String,
      required: true,
    },
    departure_station_name: {
      type: String,
      required: true,
    },
    return_station_id: {
      type: String,
      required: true,
    },
    return_station_name: {
      type: String,
      required: true,
    },
    covered_distance_m: {
      type: Number,
      required: true,
    },
    duration_sec: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);
