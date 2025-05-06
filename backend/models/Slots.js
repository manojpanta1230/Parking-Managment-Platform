const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slot: Number,
  isOccupied: Boolean
});

module.exports = mongoose.model("Slot", slotSchema);
