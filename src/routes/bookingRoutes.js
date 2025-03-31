import express from 'express';
import jwt from 'jsonwebtoken';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Get active bookings for the authenticated user
router.get('/active', authenticateToken, async(req, res) => {
    try {
        const activeBookings = await Reservation.find({
            user: req.user.id,
            status: 'active'
        }).populate('parkingSpot');

        res.json(activeBookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active bookings' });
    }
});

// Get booking history for the authenticated user
router.get('/history', authenticateToken, async(req, res) => {
    try {
        const bookingHistory = await Reservation.find({
            user: req.user.id,
            status: 'completed'
        }).populate('parkingSpot');

        res.json(bookingHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking history' });
    }
});

// Create a new booking
router.post('/', authenticateToken, async(req, res) => {
    try {
        const { parkingSpotId, startTime, endTime, vehicleNumber } = req.body;

        const newBooking = new Reservation({
            user: req.user.id,
            parkingSpot: parkingSpotId,
            startTime,
            endTime,
            vehicleNumber,
            status: 'active',
            totalAmount: 0 // This should be calculated based on your pricing logic
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking' });
    }
});

// Update booking status (e.g., complete or cancel)
router.patch('/:id', authenticateToken, async(req, res) => {
    try {
        const { status } = req.body;
        const booking = await Reservation.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this booking' });
        }

        booking.status = status;
        if (status === 'completed') {
            booking.endTime = new Date();
            // Calculate total amount based on duration and rates
            const duration = (booking.endTime - booking.startTime) / (1000 * 60 * 60); // hours
            booking.totalAmount = duration * booking.parkingSpot.rate;
        }

        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking' });
    }
});

export default router;