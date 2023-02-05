const mongoose = require("mongoose");

/* Remove warnings */
mongoose.set("strictQuery", false);

const csvTripsReader = require("../csvTripsReader");
const csvStationsReader = require("../csvStationsReader");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_COMPASS_URI);
    const conn = mongoose.connection.once("open", async () => {
      console.log(
        `MongoDB Connected ${mongoose.connection.host}`.yellow.underline
      );
      if ((await conn.db.collection("trips").countDocuments()) > 0) {
        console.log(`Trips database is already populated`.red);
      }
      if ((await conn.db.collection("stations").countDocuments()) > 0) {
        console.log(`Stations database is already populated`.red);
      }
      if ((await conn.db.collection("trips").countDocuments()) < 1) {
        await csvTripsReader(conn);
      }
      if ((await conn.db.collection("stations").countDocuments()) < 1) {
        await csvStationsReader(conn);
      }
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
