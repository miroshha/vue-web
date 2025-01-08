import express from 'express';
import Provider from '../models/provider/Provider.js';
import Service from "../models/provider/Service.js";

const router = express.Router();

// Get all providers
router.get('/', async (req, res) => {
    try {
        const provideres = await Provider.find();
        res.json(provideres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new provider
router.post('/', async (req, res) => {
    const { id, category, name, ownerId, description, image, rating, location, phone, workingHours } = req.body;
    const provider = new Provider({ id, category, name, ownerId, description, image, rating, location, phone, workingHours });
    try {
        const newProvider = await provider.save();
        res.status(201).json(newProvider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get provider by Id
router.get('/:id', getProvider, (req, res) => {
    res.json(res.provider);
});

// Get services by provider id
router.get('/:id/services', getProvidersServices, (req, res) => {
    res.json(res.services);
});

// Update provider
router.patch('/:id', getProvider, async (req, res) => {
    const updateFields = ['id', 'category', 'name', 'ownerId', 'description', 'image', 'rating', 'location', 'phone', 'workingHours'];

    // Обновляем только те поля, которые присутствуют в req.body
    updateFields.forEach(field => {
        if (req.body[field] != null) {
            res.provider[field] = req.body[field];
        }
    });

    try {
        const updatedProvider = await res.provider.save();
        res.json(updatedProvider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete provider
router.delete('/:id', getProvider, async (req, res) => {
    try {
        await Provider.deleteOne({ _id: res.provider._id });
        res.json({ message: 'Provider deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get provider by id
async function getProvider(req, res, next) {
    let provider;
    try {
        provider = await Provider.findById(req.params.id);
        if (provider == null) {
            return res.status(404).json({ message: 'provider not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.provider = provider;
    next();
}

// Middleware to get services by provider id
async function getProvidersServices(req, res, next) {
    let services;
    try {
        services = await Service.find({ providerId: req.params.id });
        if (services == null) {
            return res.status(404).json({ message: 'services not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.services = services;
    next();
}

export default router;