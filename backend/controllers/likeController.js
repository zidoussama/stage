// backend/controllers/likeController.js

const Like = require('../models/Likes');

// Create or toggle a like
exports.toggleLike = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let like = await Like.findOne({ user: userId, product: productId });

    if (like) {
      // Toggle the like status
      like.is_liked = !like.is_liked;
      await like.save();
      return res.status(200).json({ message: 'Like status updated', like });
    }

    // No like exists yet, create one
    like = new Like({
      user: userId,
      product: productId,
      is_liked: true
    });

    await like.save();
    res.status(201).json({ message: 'Product liked', like });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all likes for a product
exports.getLikesForProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const likes = await Like.find({ product: productId, is_liked: true }).populate('user');
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get liked products for a user
exports.getUserLikes = async (req, res) => {
  const { userId } = req.params;

  try {
    const likes = await Like.find({ user: userId, is_liked: true }).populate('product');
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
