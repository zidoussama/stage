const Product = require('../models/Product');


exports.createProduct = async (req, res) => {
    try {
        const { name, price, category, description, stock, state, discount, size, Composition, otherinfo, concern, typedepeau, ingredients , genre , Brand } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        const imageUrls = req.files.map(file => file.path); // Get Cloudinary URLs

        const product = new Product({
            name,
            price,
            category,
            description,
            stock,
            imageUrls,
            state,
            Brand,
            discount,
            size,
            Composition,
            otherinfo,
            concern,
            typedepeau,
            ingredients,
            genre
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, price, category, description, stock, state, discount, size, Composition, otherinfo, concern, typedepeau, ingredients, genre, Brand } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map(file => file.path);
            product.imageUrls = imageUrls;
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.category = category || product.category;
        product.description = description || product.description;
        product.stock = stock || product.stock;
        product.state = state || product.state;
        product.discount = discount || product.discount;
        product.size = size || product.size;
        product.Composition = Composition || product.Composition;
        product.otherinfo = otherinfo || product.otherinfo;
        product.concern = concern || product.concern;
        product.typedepeau = typedepeau || product.typedepeau;
        product.ingredients = ingredients || product.ingredients;
        product.genre = genre || product.genre;
        product.Brand = Brand || product.Brand;

        await product.save();
        res.status(200).json({ message: 'Product updated', product });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product deleted', product });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
