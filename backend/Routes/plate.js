const express = require("express");
const router = express.Router();

const {
  savePlate,
  getLatestPlate,
  isAnyPlateDetected,
  getAllPlates,
  releasePlateByNumber, // <-- new controller
} = require("../controllers/plateController");

router.post("/", savePlate);                 // POST from ESP32-CAM
router.get("/latest", getLatestPlate);       // GET latest plate

router.get("/", getAllPlates);               // GET all plates

// ✅ New: Admin route to manually mark a plate as exited
router.post("/release/:plate", releasePlateByNumber);

module.exports = router;
