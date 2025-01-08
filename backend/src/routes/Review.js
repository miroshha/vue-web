import express from 'express';
import Review from '../models/user/Review.js';

const router = express.Router();

// Get all Reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new Review
router.post('/', async (req, res) => {
    const { userId, providerId, serviceId, rating, description } = req.body;
    const review = new Review({ userId, providerId, serviceId, rating, description });
    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Review
router.delete('/:id', getReview, async (req, res) => {
    try {
        await Review.deleteOne({ _id: res.review._id });
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get Review by id
async function getReview(req, res, next) {
    let review;
    try {
        review = await Review.findById(req.params.id);
        if (review == null) {
            return res.status(404).json({ message: 'Review not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.Review = review;
    next();
}

export default router;