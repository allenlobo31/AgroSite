import { useState } from 'react';
import './Admin.css';
import { PRODUCT_FORM_CATEGORIES } from './productsData';

export default function Admin({ onNavigate, user, onLogout, products = [], onSaveProduct, onDeleteProduct, orders = [], onAcceptOrder, onRejectOrder }) {
  const [activeTab, setActiveTab] = useState('products');

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '', image: '' });
  const [showForm, setShowForm] = useState(false);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      image: product.image || '',
    });
    setShowForm(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (!onSaveProduct) return;

    const success = await onSaveProduct({
      productId: editingProduct?.id,
      productData: {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
      },
    });

    if (success) handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '', category: '', image: '' });
    setShowForm(false);
  };

  const handleDeleteProduct = async (id) => {
    if (!onDeleteProduct) return;
    if (confirm('Are you sure you want to delete this product?')) {
      await onDeleteProduct(id);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAcceptOrder = (orderId) => {
    if (onAcceptOrder) onAcceptOrder(orderId);
  };

  const handleRejectOrder = (orderId) => {
    if (confirm('Are you sure you want to reject this order?')) {
      if (onRejectOrder) onRejectOrder(orderId);
    }
  };

  const calculateInventoryStats = () => {
    const totalItems = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStockItems = products.filter((p) => p.stock < 50);
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    return { totalItems, lowStockItems, totalValue };
  };

  const stats = calculateInventoryStats();

  const renderProductsTab = () => (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>Product Management</h2>
        <button
          className="btn-add-product"
          onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', price: '', stock: '', category: '', image: '' });
            setShowForm(true);
          }}
        >
          + Add New Product
        </button>
      </div>

      {showForm && (
        <div className="product-form-container">
          <div className="form-box">
            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSaveProduct}>
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleFormChange}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select category</option>
                  {PRODUCT_FORM_CATEGORIES.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Product Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  placeholder="https://example.com/product.jpg"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save">Save Product</button>
                <button type="button" className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="products-grid">
        {products.length === 0 ? (
          <p className="no-data">No products found. Add your first product above.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">₹{product.price}</p>
                <p className="stock">
                  Stock:{' '}
                  <span className={product.stock < 50 ? 'low-stock' : ''}>
                    {product.stock} units
                  </span>
                </p>
              </div>
              <div className="product-actions">
                <button className="btn-edit" onClick={() => handleEditProduct(product)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="admin-tab-content">
      <h2>Order Management</h2>
      <div className="orders-container">
        {orders.length === 0 ? (
          <p className="no-data">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={`order-card status-${order.status}`}>
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status-badge ${order.status}`}>{order.status.toUpperCase()}</span>
              </div>

              <div className="order-details">
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Items:</strong> {order.items.join(', ')}</p>
                {order.phone && <p><strong>Phone:</strong> {order.phone}</p>}
                {order.address && <p><strong>Address:</strong> {order.address}</p>}
                <p><strong>Total:</strong> ₹{order.total}</p>
              </div>

              {order.status === 'pending' && (
                <div className="order-actions">
                  <button className="btn-accept" onClick={() => handleAcceptOrder(order.id)}>Accept Order</button>
                  <button className="btn-reject" onClick={() => handleRejectOrder(order.id)}>Reject Order</button>
                </div>
              )}

              {order.status === 'accepted' && <div className="order-status">Accepted</div>}
              {order.status === 'rejected' && <div className="order-status rejected">Rejected</div>}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderInventoryTab = () => (
    <div className="admin-tab-content">
      <h2>Inventory Report</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Items in Stock</h3>
          <p className="stat-number">{stats.totalItems}</p>
        </div>
        <div className="stat-card">
          <h3>Inventory Value</h3>
          <p className="stat-number">₹{stats.totalValue.toLocaleString()}</p>
        </div>
        <div className="stat-card warning">
          <h3>Low Stock Items</h3>
          <p className="stat-number">{stats.lowStockItems.length}</p>
        </div>
      </div>

      <div className="inventory-section">
        <h3>Detailed Inventory</h3>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Unit Price</th>
              <th>Stock</th>
              <th>Total Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className={product.stock < 50 ? 'low-stock-row' : ''}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>₹{(product.price * product.stock).toLocaleString()}</td>
                <td>
                  <span className={`status ${product.stock < 50 ? 'low' : 'ok'}`}>
                    {product.stock < 50 ? 'Low' : 'OK'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {stats.lowStockItems.length > 0 && (
        <div className="low-stock-alert">
          <h3>Low Stock Alert</h3>
          <ul>
            {stats.lowStockItems.map((item) => (
              <li key={item.id}>{item.name} - Only {item.stock} units remaining</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return renderProductsTab();
      case 'orders':
        return renderOrdersTab();
      case 'inventory':
        return renderInventoryTab();
      default:
        return null;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <button className="btn-topbar-back" onClick={() => onNavigate('home')}>
          &larr; Back to Store
        </button>

        <div className="admin-brand">
          <div className="admin-brand-icon">AG</div>
          <span className="admin-brand-text">
            Agro<span>Site</span>
          </span>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            {user && <p className="welcome-msg">Welcome, {user.email}!</p>}
          </div>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
        </div>

        <div className="admin-content">{renderTabContent()}</div>

        <div className="admin-footer">
          <button className="btn-back" onClick={() => onNavigate('home')}>&larr; Back to Home</button>
        </div>
      </div>
    </div>
  );
}
