// backend/routes/likeRoutes.js

const express = require('express');
const router = express.Router();
const {
  toggleLike,
  getLikesForProduct,
  getUserLikes
} = require('../controllers/likeController');
const authMiddleware = require('../auth/authMiddleware');


router.post('/', authMiddleware, toggleLike);
router.get('/product/:productId',  getLikesForProduct);
router.get('/user/:userId', getUserLikes);

module.exports = router;
