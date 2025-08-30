const express = require('express');
const router = express.Router();
const {
  toggleLike,
  getLikesForProduct,
  getUserLikes
} = require('../controllers/likeController');


router.post('/', toggleLike);
router.get('/product/:productId', getLikesForProduct);
router.get('/user/:userId', getUserLikes);

module.exports = router;
