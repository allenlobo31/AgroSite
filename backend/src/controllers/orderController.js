const Order = require('../models/Order');
const Product = require('../models/Product');

function toOrderDto(order) {
  return {
    id: String(order._id),
    customer: order.customer,
    customerEmail: order.customerEmail,
    phone: order.phone,
    address: order.address,
    items: order.items,
    subtotal: Number(order.subtotal),
    total: Number(order.total),
    status: order.status,
    date: order.date,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

async function createOrder(req, res, next) {
  try {
    const { items = [], customer, customerEmail, phone, address } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const resolvedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.id);
      if (!product) {
        return res.status(400).json({ error: `Product not found: ${item.id}` });
      }

      const qty = Number(item.qty || 0);
      if (!qty || qty < 1) {
        return res.status(400).json({ error: `Invalid quantity for product: ${item.id}` });
      }

      const lineTotal = Number((product.price * qty).toFixed(2));
      subtotal += lineTotal;

      resolvedItems.push({
        productId: product._id,
        name: product.name,
        qty,
        price: Number(product.price),
        total: lineTotal,
      });
    }

    const order = await Order.create({
      customer: customer || req.user.name || req.user.email,
      customerEmail: req.user.email || customerEmail || '',
      phone: phone || '',
      address: address || '',
      items: resolvedItems,
      subtotal: Number(subtotal.toFixed(2)),
      total: Number(subtotal.toFixed(2)),
      status: 'pending',
      date: new Date().toISOString().slice(0, 10),
    });

    res.status(201).json(toOrderDto(order));
  } catch (error) {
    next(error);
  }
}

async function getOrders(req, res, next) {
  try {
    const { email } = req.query;

    let filter = {};

    if (req.user.role === 'admin') {
      filter = email ? { customerEmail: String(email).toLowerCase() } : {};
    } else {
      filter = { customerEmail: req.user.email };
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.json({ orders: orders.map(toOrderDto) });
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(toOrderDto(order));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
};
