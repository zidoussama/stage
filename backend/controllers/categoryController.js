const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const { name, categoryType } = req.body;
        const existing = await Category.findOne({ name });
        if (existing) return res.status(400).json({ message: 'Category already exists' });
        if (categoryType !== undefined && (!Array.isArray(categoryType) || categoryType.some(item => typeof item !== 'string'))) {
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
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, categoryType } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // If new image(s) uploaded, delete old ones and replace
        if (req.files && req.files.length > 0) {
            // Delete old image(s)
            if (category.imageUrl && category.imageUrl.length > 0) {
                for (const oldPath of category.imageUrl) {
                    fs.unlink(path.join(__dirname, '..', oldPath), (err) => {
                        if (err) console.error('Failed to delete old image:', err);
                    });
                }
            }

            // Set new image path(s)
            category.imageUrl = req.files.map(file => file.path);
        }

        // Update other fields
        if (name) category.name = name;
        if (categoryType) category.categoryType = categoryType;

        await category.save();

        res.status(200).json({ message: 'Category updated', category });

    } catch (err) {
        console.error('Update Category Error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
