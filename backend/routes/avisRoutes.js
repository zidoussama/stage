const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware'); // import your auth middleware
const { createAvis, getAllAvis, getAvisByProduct, deleteAvis, updateAvis } = require('../controllers/avisController');

// Public routes
router.get('/', getAllAvis);
router.get('/:productId', getAvisByProduct);

// Protected routes
router.post('/', authMiddleware, createAvis);
router.put('/:avisId', authMiddleware, updateAvis);
router.delete('/:avisId', authMiddleware, deleteAvis);

module.exports = router;
