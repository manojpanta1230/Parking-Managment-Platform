// models/Plate.js

const mongoose = require("mongoose");

const PlateSchema = new mongoose.Schema({
  // 🔍 Auto-detection fields
  plate: String,
  score: Number,
  regionCode: String,
  timestamp: String, // detection timestamp from camera/API
  rawJson: Object,

  // 📦 Booking fields
  name: String,            // person who booked
  vehicleNumber: String,   // vehicle number manually entered
  slot: Number,            // slot number (0, 1, ...)
  booked: {                // status flag
    type: Boolean,
    default: false,
  },

  // 🕐 Timing
  entryTime: Date,         // when car entered
  exitTime: Date,          // when car exited
  price: Number,           // total price ($1/min)
}, { timestamps: true });

module.exports = mongoose.model("Plates", PlateSchema);
