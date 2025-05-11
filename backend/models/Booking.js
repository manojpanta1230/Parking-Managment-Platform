const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },                // Name of the person who booked the slot
  vehicleNumber: { type: String, required: true },       // Vehicle number entered
  slot: { type: Number, required: true },                // Slot number (e.g., 0, 1, ...)
  booked: { type: Boolean, default: true },              // Booking status (whether the slot is booked or not)
  entryTime: { type: Date, default: Date.now },          // Entry time when the booking was made
}, { timestamps: true }); // Include timestamps for created and updated times

module.exports = mongoose.model("Booking", BookingSchema);
