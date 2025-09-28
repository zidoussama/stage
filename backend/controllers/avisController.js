const avis = require('../models/Avis');
const Product = require('../models/Product');
const User = require('../models/Users');

exports.createAvis = async (req, res) => {
    try {
        const { productId, text } = req.body;
        const userId = req.user.id; 

        const product = await Product.findById(productId);
        const user = await User.findById(userId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newAvis = new avis({ productId, userId, text });
        await newAvis.save();

        res.status(201).json({ message: 'Avis created', avis: newAvis });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.getAvisByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const avisList = await avis.find({ productId }).populate('userId', 'firstname lastname').sort({ date: -1 });
        res.status(200).json(avisList);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.deleteAvis = async (req, res) => {
    try {
        const { avisId } = req.params;
        const deletedAvis = await avis.findByIdAndDelete(avisId);
        if (!deletedAvis) return res.status(404).json({ message: 'Avis not found' });
        res.status(200).json({ message: 'Avis deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.getAllAvis = async (req, res) => {
    try {
        const avisList = await avis.find().populate('userId', 'firstname lastname').populate('productId', 'name').sort({ date: -1 });
        res.status(200).json(avisList);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.updateAvis = async (req, res) => {
    try {
        const { avisId } = req.params;
        const { text } = req.body;
        const updatedAvis = await avis.findByIdAndUpdate(avisId, { text }, { new: true });
        if (!updatedAvis) return res.status(404).json({ message: 'Avis not found' });
        res.status(200).json({ message: 'Avis updated', avis: updatedAvis });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};