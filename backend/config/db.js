const mongoose = require("mongoose");
// Remove warnings
mongoose.set("strictQuery", false);

const csvTripsReader = require("../csvTripsReader");
const datasetReader = require("../csvDatasetReader");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_ATLAS_URI);
    const conn = mongoose.connection.once("open", async () => {
      console.log(
        `MongoDB Connected ${mongoose.connection.host}`.yellow.underline
      );
      if ((await conn.db.collection("trips").countDocuments()) > 0) {
        console.log("Trips database is already populated");
      }
      if ((await conn.db.collection("datasets").countDocuments()) > 0) {
        console.log("Dataset databse is already populated");
      }
      if ((await conn.db.collection("trips").countDocuments()) < 1) {
        csvTripsReader(conn);
      }
      if ((await conn.db.collection("datasets").countDocuments()) < 1) {
        datasetReader(conn);
      }
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
