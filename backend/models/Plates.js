const mongoose = require("mongoose");

const PlateSchema = new mongoose.Schema({
  plate: String,
  score: Number,
  regionCode: String,
  timestamp: String, // original detection timestamp (from API)
  rawJson: Object,   // raw response from API

  entryTime: Date,   // when plate is first seen
  exitTime: Date,    // when plate is seen again
  price: Number      // price in dollars ($1/min)
}, { timestamps: true });

module.exports = mongoose.model("Plates", PlateSchema);
