const express = require("express");
const router = express.Router();
const { getAllSlots, updateSlot } = require("../controllers/slotController");

router.get("/", getAllSlots);
router.put("/:slotId", updateSlot);

module.exports = router;
