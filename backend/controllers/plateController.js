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
// Controller for booking a slot
// Controller to create or update the booking for a plate based on plate number
const bookSlot = async (req, res) => {
  const { name, vehicleNumber, slot } = req.body;

  try {
    // Step 1: Check if the same vehicle (plate number) is already detected and booked
    const existingBooking = await Plate.findOne({ plate: vehicleNumber, booked: true });

    if (existingBooking) {
      // If the plate is already booked, send a response that the booking already exists
      return res.status(400).json({ message: `Vehicle with plate ${vehicleNumber} is already booked.` });
    }

    // Step 2: Check if the slot is already booked
    const existingSlotBooking = await Plate.findOne({ slot, booked: true });

    if (existingSlotBooking) {
      return res.status(400).json({ message: "This slot is already booked." });
    }

    // Step 3: Create a new booking for the selected slot
    const newBooking = new Plate({
      name,
      vehicleNumber,
      slot,
      booked: true, // Mark the slot as booked
      entryTime: new Date(), // Set the current time as entry time
    });

    // Step 4: Save the new booking to the database
    await newBooking.save();

    // Step 5: Respond with a success message and the booking details
    res.status(200).json({ message: "Slot booked successfully!", booking: newBooking });
  } catch (err) {
    console.error("Error booking slot:", err);
    res.status(500).json({ message: "Server error while booking the slot", error: err.message });
  }
};
// Controller to delete a booking (cancel the booking)
const deleteBooking = async (req, res) => {
  const { slotId } = req.params;  // Slot ID from URL parameters
  const { name } = req.body;  // User name from request body

  try {
    // Find and delete the booking by slot ID and user name
    const deletedBooking = await Plate.findOneAndDelete({
      _id: slotId,
      name: name,  // Ensure it's the correct user cancelling the booking
      booked: true,  // Ensure the booking exists and is active
    });

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found or already canceled." });
    }

    res.status(200).json({ message: "Booking canceled and data removed successfully." });
  } catch (err) {
    console.error("Error canceling booking:", err);
    res.status(500).json({ message: "Server error while canceling booking." });
  }
};

// Controller for unbooking a slot
// controllers/bookingController.js
// Controller to cancel the booking
const updateSlot = async (req, res) => {
  const { _id } = req.params;  // The _id of the booking (plate booking) from the URL parameter
  const { name } = req.body;   // The name of the user from the request body

  try {
    // Find the booking by _id and user name, and toggle the booked status
    const booking = await Plate.findOne({ _id, name }); // Find the booking by slot ID and user name

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Toggle the booked status
    const updatedBooking = await Plate.findOneAndUpdate(
      { _id, name },
      { 
        booked: !booking.booked,  // Toggle booked status
        exitTime: booking.booked ? new Date() : null  // If canceling, set exitTime; if booking, leave it null
      },
      { new: true }
    );

    res.status(200).json({ message: updatedBooking.booked ? "Booking confirmed" : "Booking canceled", booking: updatedBooking });
  } catch (err) {
    console.error("Error toggling booking:", err);
    res.status(500).json({ message: "Server error while toggling booking." });
  }
};

const updateSlotStatus = async (req, res) => {
  const { slotId } = req.params; // Get slotId from request
  const { booked } = req.body;  // Get the updated booked status

  try {
    const slot = await Plate.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    slot.booked = booked;  // Update the booked status
    await slot.save();  // Save the updated slot

    res.status(200).json({ message: "Slot status updated successfully", slot });
  } catch (err) {
    res.status(500).json({ message: "Error updating slot status", error: err.message });
  }
};
module.exports = {
  savePlate,
  getLatestPlate,
  isAnyPlateDetected,
  getAllPlates,
  releasePlateByNumber,
  bookSlot,
  updateSlot,
  deleteBooking,
  updateSlotStatus,
};