const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory
} = require('../controllers/categoryController');

const upload = require('../middleware/upload'); 


router.post('/', upload.single('image'), createCategory);
router.get('/', getCategories);
router.delete('/:id', deleteCategory);
router.put('/:id', upload.single('image'), updateCategory);

module.exports = router;
