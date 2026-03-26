const express = require('express');
const cors = require('cors');
const { getDbStatus } = require('./config/database');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const notFound = require('./middleware/notFound');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'agrosite-backend',
    database: getDbStatus(),
  });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);

app.use((err, req, res, next) => {
  const status = err.name === 'ValidationError' ? 400 : 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
  });
});

module.exports = app;
