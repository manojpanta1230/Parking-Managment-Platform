const express = require("express");
const router = express.Router();
const { createBooking, getAllBookings } = require("../controllers/BookingController");

// Route to create a new booking
router.post("/", createBooking);

// Route to fetch all bookings
router.get("/", getAllBookings);

module.exports = router;
