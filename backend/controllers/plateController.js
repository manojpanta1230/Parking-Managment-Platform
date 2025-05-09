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
const releasePlateByNumber = async (req, res) => {
  try {
    const { plate } = req.params;

    const activeEntry = await Plate.findOne({
      plate,
      entryTime: { $exists: true },
      exitTime: { $exists: false },
    }).sort({ createdAt: -1 });

    if (!activeEntry) {
      return res.status(404).json({ message: "No active entry found" });
    }

    const now = new Date();
    const durationMinutes = Math.ceil((now - new Date(activeEntry.entryTime)) / 60000);

    activeEntry.exitTime = now;
    activeEntry.price = durationMinutes * 1; // $1 per min
    await activeEntry.save();

    res.json({ message: "Plate released", data: activeEntry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const bookSlot = async (req, res) => {
  const { name, vehicleNumber, slot } = req.body;

  try {
    // Check if the slot is already booked and not released
    const existing = await Plate.findOne({ slot, exitTime: null });
    if (existing) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const newBooking = new Plate({
      name,
      vehicleNumber,
      slot,
      booked: true,
    });

    await newBooking.save();
    res.status(200).json({ message: "Slot booked successfully!" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Controller for unbooking a slot
const unbookSlot = async (req, res) => {
  try {
    const { name, slot } = req.body;
    const existingBooking = await Plate.findOne({ name, slot, exitTime: null });

    if (!existingBooking) {
      return res.status(400).json({ message: "No booking found for this slot." });
    }

    existingBooking.exitTime = new Date(); // Mark the exit time
    await existingBooking.save();

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};



module.exports = {
  savePlate,
  getLatestPlate,
  isAnyPlateDetected,
  getAllPlates,
  releasePlateByNumber,
  bookSlot,
  unbookSlot,
};