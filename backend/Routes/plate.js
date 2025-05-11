const express = require("express");
const router = express.Router();

const {
  savePlate,
  getLatestPlate,
  bookSlot,
  getAllPlates,
  updateSlot,
  deleteBooking,
updateSlotStatus ,
  releasePlateByNumber, // <-- new controller
} = require("../controllers/plateController");

router.post("/", savePlate);                  // POST from ESP32-CAM
router.get("/latest", getLatestPlate);        // GET latest plate
router.get("/", getAllPlates);   // GET all plates
router.post("/book", bookSlot);              // POST to book a slot
router.post("/release/:plate", releasePlateByNumber);
 router.get("/getallplates", getAllPlates); // GET all plates

// ✅ Updated Route for deleting a slot (Unbook)
router.put("/update/:_id", updateSlot);   // Use DELETE method for canceling booking by slot ID
//router.post("/unbook", unbookSlot);
router.delete("/delete/:slotId", deleteBooking);

router.patch("/update/:slotId", updateSlotStatus);
module.exports = router;
