const mongoose = require('mongoose');
const Brand = require('./Brand');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    imageUrls: {
    type: [String], 
    },

    size: {
        type: String,
    },
    Composition: {
        type: String,
    },
    otherinfo:{
        type: String
    },
    state: {
        type: String,
        enum: ['none', 'sold','sale', 'new in store', 'vent flash','FeaturedProducts'],
        default: 'none'
    },
    discount: {
        type: Number,
        default: 0
    },
    concern: {
        type: [String],
    },
    typedepeau: {
        type: [String],
    },
    ingredients: {
        type: [String],
    },
    genre: {
        type: String,
    },
    Brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
