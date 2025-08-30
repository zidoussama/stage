const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    deleteCategory
} = require('../controllers/categoryController');

const upload = require('../middleware/upload'); 


router.post('/', upload.single('image'), createCategory);
router.get('/', getCategories);
router.delete('/:id', deleteCategory);

module.exports = router;
