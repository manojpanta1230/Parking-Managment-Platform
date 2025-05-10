const express = require("express");
const router = express.Router();

const {
  savePlate,
  getLatestPlate,
  bookSlot,
  getAllPlates,
  unbookSlot,
  releasePlateByNumber, // <-- new controller
} = require("../controllers/plateController");

router.post("/", savePlate);                 // POST from ESP32-CAM
router.get("/latest", getLatestPlate);       // GET latest plate
router.get("/getallplates", getAllPlates);               // GET all plates
router.post("/book", bookSlot);             // POST to book a slot
router.post("/release/:plate", releasePlateByNumber);

// ✅ New: Admin route to manually mark a plate as exited
router.post("/release/:plate", releasePlateByNumber);
// Route for unbooking
router.post("/unbook", unbookSlot);
module.exports = router;
