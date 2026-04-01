const Product = require('../models/Product');
const mongoose = require('mongoose');

function normalizeProductPayload(payload = {}) {
  return {
    name: String(payload.name || '').trim(),
    category: String(payload.category || '').trim(),
    price: Number(payload.price),
    stock: Number(payload.stock),
    image: String(payload.image || '').trim(),
    badge: String(payload.badge || '').trim(),
  };
}

async function getProducts(req, res, next) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const productPayload = normalizeProductPayload(req.body);

    if (!productPayload.name) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    if (!Number.isFinite(productPayload.price) || productPayload.price < 0) {
      return res.status(400).json({ error: 'Price must be a valid non-negative number' });
    }

    if (!Number.isFinite(productPayload.stock) || productPayload.stock < 0) {
      return res.status(400).json({ error: 'Stock must be a valid non-negative number' });
    }

    const product = await Product.create(productPayload);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product id' });
    }

    const updatePayload = normalizeProductPayload({ ...req.body, name: req.body?.name ?? undefined });
    const sanitizedUpdate = {};

    if (req.body?.name !== undefined) {
      if (!updatePayload.name) {
        return res.status(400).json({ error: 'Product name cannot be empty' });
      }
      sanitizedUpdate.name = updatePayload.name;
    }

    if (req.body?.category !== undefined) {
      sanitizedUpdate.category = updatePayload.category;
    }

    if (req.body?.price !== undefined) {
      if (!Number.isFinite(updatePayload.price) || updatePayload.price < 0) {
        return res.status(400).json({ error: 'Price must be a valid non-negative number' });
      }
      sanitizedUpdate.price = updatePayload.price;
    }

    if (req.body?.stock !== undefined) {
      if (!Number.isFinite(updatePayload.stock) || updatePayload.stock < 0) {
        return res.status(400).json({ error: 'Stock must be a valid non-negative number' });
      }
      sanitizedUpdate.stock = updatePayload.stock;
    }

    if (req.body?.image !== undefined) {
      sanitizedUpdate.image = updatePayload.image;
    }

    if (req.body?.badge !== undefined) {
      sanitizedUpdate.badge = updatePayload.badge;
    }

    const product = await Product.findByIdAndUpdate(id, sanitizedUpdate, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product id' });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
