const Slot = require("../models/Slots");
// This controller handles the logic for fetching and updating slots in the database

const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find().sort({ slot: 1 });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch slots" });
  }
};

const updateSlot = async (req, res) => {
  const { slotId } = req.params;
  const { isOccupied } = req.body;

  try {
    const updated = await Slot.findOneAndUpdate(
      { slot: parseInt(slotId) },
      { isOccupied },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update slot" });
  }
};

module.exports = { getAllSlots, updateSlot };
