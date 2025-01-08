import express from 'express';
import Booking from '../models/user/Booking.js';

const router = express.Router();

// Get all Bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new Booking
router.post('/', async (req, res) => {
    const { userId, providerId, serviceId, date, time, status } = req.body;
    const booking = new Booking({ userId, providerId, serviceId, date, time, status });
    try {
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Booking by id
router.get('/:id', getBooking, (req, res) => {
    res.json(res.booking);
});

// Update Booking
router.patch('/:id', getBooking, async (req, res) => {
    const updateFields = ['providerId', 'title', 'description', 'price', 'duration', 'image', 'status', 'discount'];

    updateFields.forEach(field => {
        if (req.body[field] != null) {
            res.booking[field] = req.body[field];
        }
    });

    try {
        const updatedBooking = await res.booking.save();
        res.json(updatedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Booking
router.delete('/:id', getBooking, async (req, res) => {
    try {
        await Booking.deleteOne({ _id: res.booking._id });
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get Booking by id
async function getBooking(req, res, next) {
    let booking;
    try {
        booking = await Booking.findById(req.params.id);
        if (booking == null) {
            return res.status(404).json({ message: 'Booking not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.booking = booking;
    next();
}

export default router;