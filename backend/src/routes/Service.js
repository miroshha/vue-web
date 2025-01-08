import express from 'express';
import Service from '../models/provider/Service.js';

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new service
router.post('/', async (req, res) => {
    const { providerId, title, description, price, duration, image, status, discount } = req.body;
    const service = new Service({ providerId, title, description, price, duration, image, status, discount });
    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Service by id
router.get('/:id', getService, (req, res) => {
    res.json(res.service);
});

// Update Service
router.patch('/:id', getService, async (req, res) => {
    const updateFields = ['providerId', 'title', 'description', 'price', 'duration', 'image', 'status', 'discount'];

    // Обновляем только те поля, которые присутствуют в req.body
    updateFields.forEach(field => {
        if (req.body[field] != null) {
            res.service[field] = req.body[field];
        }
    });

    try {
        const updatedService = await res.service.save();
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Service
router.delete('/:id', getService, async (req, res) => {
    try {
        await Service.deleteOne({ _id: res.service._id });
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get Service by id
async function getService(req, res, next) {
    let service;
    try {
        service = await Service.findById(req.params.id);
        if (service == null) {
            return res.status(404).json({ message: 'Service not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.service = service;
    next();
}

export default router;