const mongoose =require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
