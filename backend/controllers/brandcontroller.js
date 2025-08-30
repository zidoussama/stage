const brand = require('../models/Brand');

exports.createBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const existing = await brand.findOne({ name });
        if (existing) return res.status(400).json({ message: 'Brand already exists' });

        const newBrand = new brand({ name });
        await newBrand.save();

        res.status(201).json({ message: 'Brand created', brand: newBrand });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.getBrands = async (req, res) => {
    try {
        const brands = await brand.find().sort({ createdAt: -1 });
        res.status(200).json(brands);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
