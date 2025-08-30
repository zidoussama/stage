const express = require('express');
const router = express.Router();
const {getUserProfile,updateUserProfile,deleteUserProfile} =require('../controllers/userController')
const authMiddleware = require('../auth/authMiddleware');


router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/profile', authMiddleware, deleteUserProfile);

module.exports = router;
