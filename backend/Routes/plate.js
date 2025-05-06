const express = require("express");
const router = express.Router();
const {
  savePlate,
  getLatestPlate,
  isAnyPlateDetected,
    getAllPlates,  
} = require("../controllers/plateController");

router.post("/", savePlate);           // POST from ESP32-CAM
router.get("/latest", getLatestPlate); // GET from React
router.get("/occupied", isAnyPlateDetected)
router.get("/", getAllPlates); // GET /api/plates


module.exports = router;