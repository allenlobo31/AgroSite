const bcrypt = require('bcryptjs');
const User = require('../models/User');

const ADMIN_EMAIL = 'admin@agrosite';

function toUserDto(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
    savedAddresses: Array.isArray(user.savedAddresses) ? user.savedAddresses : [],
    role: user.role || 'user',
    memberSince: user.createdAt,
  };
}

function normalizeSavedAddresses(addresses = []) {
  if (!Array.isArray(addresses)) return [];

  const normalized = addresses
    .filter((item) => item && typeof item === 'object')
    .map((item, index) => ({
      id: String(item.id || `addr-${Date.now()}-${index}`),
      label: String(item.label || '').trim(),
      name: String(item.name || '').trim(),
      address: String(item.address || '').trim(),
      phone: String(item.phone || '').trim(),
      isDefault: Boolean(item.isDefault),
    }))
    .filter((item) => item.address);

  if (normalized.length === 0) return [];

  if (!normalized.some((item) => item.isDefault)) {
    normalized[0].isDefault = true;
  }

  return normalized;
}

async function signup(req, res, next) {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    const phone = String(req.body?.phone || '').trim();
    const address = String(req.body?.address || '').trim();

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
      address,
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

async function updateProfile(req, res, next) {
  try {
    const userEmail = String(req.user?.email || '').trim().toLowerCase();

    if (!userEmail) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updates = {};

    if (req.body?.name !== undefined) {
      const name = String(req.body.name || '').trim();
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      updates.name = name;
    }

    if (req.body?.phone !== undefined) {
      updates.phone = String(req.body.phone || '').trim();
    }

    if (req.body?.address !== undefined) {
      updates.address = String(req.body.address || '').trim();
    }

    if (req.body?.savedAddresses !== undefined) {
      updates.savedAddresses = normalizeSavedAddresses(req.body.savedAddresses);
      const defaultAddress = updates.savedAddresses.find((item) => item.isDefault) || updates.savedAddresses[0];
      if (defaultAddress) {
        updates.address = defaultAddress.address;
        if (!updates.phone) {
          updates.phone = defaultAddress.phone;
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updates, {
      new: true,
      runValidators: true,
    });

    return res.json({
      message: 'Profile updated',
      user: toUserDto(updatedUser),
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  signup,
  login,
  updateProfile,
};
