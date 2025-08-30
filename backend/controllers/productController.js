const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        // Destructure fields from req.body
        const { 
            name, 
            price, 
            category, 
            description, 
            stock, 
            state, 
            discount, 
            size, 
            Composition, 
            otherinfo, 
            concern, 
            typedepeau, 
            ingredients, 
            genre, 
            Brand 
        } = req.body;

        // Check if files exist in the request
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        // Extract file paths from the uploaded images
        const imageUrls = req.files.map(file => file.path);

        // Create a new product document
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

        // Save the product
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        // Fetch all products and populate necessary references
        const products = await Product.find()
            .populate('category')
            .populate('Brand'); // Add other fields if needed to populate (e.g. concern, typedepeau)

        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        // Find product by ID and populate references
        const product = await Product.findById(req.params.id)
            .populate('category')
            .populate('Brand'); // Add other fields if needed to populate

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        // Destructure fields from req.body
        const { 
            name, 
            price, 
            category, 
            description, 
            stock, 
            state, 
            discount, 
            size, 
            Composition, 
            otherinfo, 
            concern, 
            typedepeau, 
            ingredients, 
            genre, 
            Brand 
        } = req.body;

        // Find product by ID
        const product = await Product.findById(req.params.id);

        // If product not found, return 404
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If files are uploaded, update the image URLs
        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map(file => file.path);
            product.imageUrls = imageUrls;
        }

        // Update the fields with the new values or keep the old ones if not provided
        product.set({
            name: name || product.name,
            price: price || product.price,
            category: category || product.category,
            description: description || product.description,
            stock: stock || product.stock,
            state: state || product.state,
            discount: discount || product.discount,
            size: size || product.size,
            Composition: Composition || product.Composition,
            otherinfo: otherinfo || product.otherinfo,
            concern: concern || product.concern,
            typedepeau: typedepeau || product.typedepeau,
            ingredients: ingredients || product.ingredients,
            genre: genre || product.genre,
            Brand: Brand || product.Brand
        });

        // Save the updated product
        await product.save();
        res.status(200).json({ message: 'Product updated', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        // Find and delete the product by ID
        const product = await Product.findByIdAndDelete(req.params.id);

        // If product not found, return 404
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Respond with success message
        res.status(200).json({ message: 'Product deleted', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
s