import express from 'express';
import Category from '../models/main/Category.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new category
router.post('/', async (req, res) => {
    const { name, description, image } = req.body;
    const category = new Category({ name, description, image });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get category by Id
router.get('/:id', getCategory, (req, res) => {
    res.json(res.category);
});

// Update category
router.patch('/:id', getCategory, async (req, res) => {
    const { name, description, image } = req.body;
    if (name != null) res.category.name = name;
    if (description != null) res.category.description = description;
    if (image != null) res.category.image = image;
    try {
        const updatedCategory = await res.category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete category
router.delete('/:id', getCategory, async (req, res) => {
    try {
        await Category.deleteOne({ _id: res.category._id });
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get category by id
async function getCategory(req, res, next) {
    let category;
    try {
        category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.category = category;
    next();
}

export default router;