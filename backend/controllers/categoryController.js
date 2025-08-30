const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const { name, categoryType } = req.body;
        const existing = await Category.findOne({ name });
        if (existing) return res.status(400).json({ message: 'Category already exists' });
        if (!Array.isArray(categoryType) || categoryType.some(item => typeof item !== 'string')) {
            return res.status(400).json({ message: 'categoryType should be an array of strings' });
        }

        let imageUrl = '';
        if (req.file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: 'Invalid file type. Only jpg and png allowed' });
            }
            imageUrl = req.file.path;
        }
        const category = new Category({
            name,
            categoryType,
            imageUrl
        });
        await category.save();

        res.status(201).json({ message: 'Category created', category });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);

        if (!category) return res.status(404).json({ message: 'Category not found' });

        res.status(200).json({ message: 'Category deleted', category });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
