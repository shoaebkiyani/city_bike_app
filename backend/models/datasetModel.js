const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const datasetSchema = new Schema(
  {
    fid: {
      type: String,
      required: true,
      unique: true,
    },
    id: {
      type: String,
      //   required: true,
    },
    nimi: {
      type: String,
      //   required: true,
    },
    namn: {
      type: String,
      //required: true,
    },
    name: {
      type: String,
      // required: true,
    },
    osoite: {
      type: String,
      //required: true,
    },
    adress: {
      type: String,
      //required: true,
    },
    kaupunki: {
      type: String,
      //required: true,
    },
    stad: {
      type: String,
      //required: true,
    },
    operaattor: {
      type: String,
      //required: true,
    },
    kapasiteet: {
      type: String,
      //required: true,
    },
    x: {
      type: String,
      //required: true,
    },
    y: {
      type: String,
      //required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dataset", datasetSchema);
