const bcrypt = require('bcryptjs');
const User = require('../models/User');

const ADMIN_EMAIL = 'admin@agrosite';

function toUserDto(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    role: user.role || 'user',
    memberSince: user.createdAt,
  };
}

async function signup(req, res, next) {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    const phone = String(req.body?.phone || '').trim();

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const role = email === ADMIN_EMAIL ? 'admin' : 'user';

    const user = await User.create({
      name,
      email,
      passwordHash,
      phone,
      role,
    });

    return res.status(201).json({
      message: 'Signup successful',
      user: toUserDto(user),
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.json({
      message: 'Login successful',
      user: toUserDto(user),
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  signup,
  login,
};
