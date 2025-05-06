const Plate = require("../Models/Plates");

// @desc   Save plate data from ESP32-CAM
const savePlate = async (req, res) => {
  try {
    const data = req.body;
    const result = data.results?.[0];

    if (!result) {
      return res.status(400).json({ message: "No plate data received" });
    }

    const plateNumber = result.plate;
    const now = new Date(data.timestamp || Date.now());

    // Check if this plate already has an entry without exit
    const existingEntry = await Plate.findOne({ plate: plateNumber, exitTime: null });

    if (!existingEntry) {
      // ✅ First detection → Save entry time only
      const newEntry = new Plate({
        plate: plateNumber,
        score: result.score,
        regionCode: result.region?.code,
        timestamp: data.timestamp,
        rawJson: data,
        entryTime: now
      });

      await newEntry.save();
      return res.status(201).json({ message: "Entry recorded", plate: newEntry });
    } else {
      // ✅ Second detection → Mark as exit
      const entryTime = new Date(existingEntry.entryTime);
      const exitTime = now;
      const durationMs = exitTime - entryTime;
      const durationMins = Math.ceil(durationMs / 60000); // Round up
      const price = durationMins * 1;

      existingEntry.exitTime = exitTime;
      existingEntry.timestamp = data.timestamp;
      existingEntry.price = price;
      existingEntry.rawJson = data;

      await existingEntry.save();

      return res.status(200).json({
        message: "Exit recorded",
        duration: `${durationMins} minutes`,
        price: `$${price}`,
        plate: existingEntry,
      });
    }
  } catch (error) {
    console.error("Error saving plate:", error);
    res.status(500).json({ error: error.message });
  }
};
// @desc   Get the latest plate detection result
const getLatestPlate = async (req, res) => {
  try {
    const latest = await Plate.findOne().sort({ createdAt: -1 });
    res.status(200).json(latest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllPlates = async (req, res) => {
  try {
    const plates = await Plate.find().sort({ timestamp: -1 });
    res.status(200).json(plates);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch plates" });
  }
};
const isAnyPlateDetected = async (req, res) => {
  try {
    const plateExists = await Plate.exists({});
    res.json({ occupied: !!plateExists });
  } catch (err) {
    console.error("Error checking plate:", err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  savePlate,
  getLatestPlate,
  isAnyPlateDetected,
  getAllPlates,
};