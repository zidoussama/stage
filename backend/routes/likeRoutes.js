const express = require('express');
const router = express.Router();
const {
  toggleLike,
  getLikesForProduct,
  getUserLikes
} = require('../controllers/likeController');
const authMiddleware = require('../auth/authMiddleware');


router.post('/', authMiddleware, toggleLike);
router.get('/product/:productId', authMiddleware, getLikesForProduct);
router.get('/user/:userId', authMiddleware, getUserLikes);

module.exports = router;
