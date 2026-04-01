const express = require('express');
const { signup, login, updateProfile } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.patch('/profile', requireAuth, updateProfile);

module.exports = router;
