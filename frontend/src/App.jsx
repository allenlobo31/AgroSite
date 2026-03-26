import { useState, useEffect, useCallback } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import PromoBanner from './components/PromoBanner';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import ProductDetailPage from './components/ProductDetailPage';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import CheckoutPage from './components/CheckoutPage';

// Toast notification
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="toast" id="add-to-cart-toast">
      <span className="toast-icon">&#10003;</span>
      {message}
    </div>
  );
}

export default function App() {
  const ADMIN_EMAIL = 'admin@agrosite';
  const ADMIN_PASSWORD = 'admin@agrosite';

  // ── Auth state ──
  const [user, setUser] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // ── Navigation ──
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  // ── Cart ──
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [orders, setOrders] = useState([
    { id: 101, customer: 'John Doe', items: ['Tomatoes', 'Potatoes'], total: 150, status: 'pending', date: '2026-03-26', phone: '9876543210', address: 'Lakeview Road, Pune' },
    { id: 102, customer: 'Jane Smith', items: ['Carrots', 'Apples'], total: 240, status: 'pending', date: '2026-03-26', phone: '9123456780', address: 'Sunrise Colony, Mumbai' },
    { id: 103, customer: 'Bob Johnson', items: ['Tomatoes'], total: 50, status: 'accepted', date: '2026-03-25', phone: '9988776655', address: 'Hill Park Street, Nashik' },
  ]);

  // ── Check URL for admin access ──
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setPage('admin-login');
    }
  }, []);

  const cartCount = cartItems.reduce((sum, it) => sum + it.qty, 0);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(it => it.id === product.id);
      if (existing) {
        return prev.map(it => it.id === product.id ? { ...it, qty: it.qty + 1 } : it);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`"${product.name}" added to basket!`);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCartItems(prev => prev.filter(it => it.id !== id));
    } else {
      setCartItems(prev => prev.map(it => it.id === id ? { ...it, qty } : it));
    }
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(it => it.id !== id));
  };

  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const navigate = (target, id = null) => {
    if (target === 'admin') {
      setPage(isAdminAuthenticated ? 'admin' : 'admin-login');
    } else {
      setPage(target);
    }
    if (id) setSelectedProductId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called by LoginPage / SignupPage on successful submit
  const handleLogin = (userData) => {
    setUser(userData);
    navigate('home');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('home');
  };

  const handleUserProfileUpdate = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev;

      const next = { ...prev, ...updates };
      const prevSaved = JSON.stringify(prev.savedAddresses || []);
      const nextSaved = JSON.stringify(next.savedAddresses || []);

      const unchanged = (
        prev.name === next.name
        && prev.phone === next.phone
        && prev.address === next.address
        && prevSaved === nextSaved
      );

      return unchanged ? prev : next;
    });
  }, []);

  const handleStartCheckout = () => {
    if (cartItems.length === 0) return;
    setCartOpen(false);
    navigate('checkout');
  };

  const handlePlaceOrder = ({ address, phone, saveAsDefault }) => {
    const orderItems = cartItems.map((item) => `${item.name} x${item.qty}`);
    const customerName = user?.name || user?.email || 'Guest Customer';

    const newOrder = {
      id: Date.now(),
      customer: customerName,
      items: orderItems,
      total: Number(cartSubtotal.toFixed(2)),
      status: 'pending',
      date: new Date().toISOString().slice(0, 10),
      phone,
      address,
    };

    setOrders((prev) => [newOrder, ...prev]);

    if (saveAsDefault) {
      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, phone, address };
      });
    }

    setCartItems([]);
    setToast('Order placed successfully!');
    navigate('home');
  };

  const handleAcceptOrder = (orderId) => {
    setOrders((prev) => prev.map((o) => (
      o.id === orderId ? { ...o, status: 'accepted' } : o
    )));
  };

  const handleRejectOrder = (orderId) => {
    setOrders((prev) => prev.map((o) => (
      o.id === orderId ? { ...o, status: 'rejected' } : o
    )));
  };

  const handleAdminLogin = ({ email, password }) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setUser({
        name: 'Admin',
        email: ADMIN_EMAIL,
        memberSince: new Date(),
      });
      setPage('admin');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    if (user?.email === ADMIN_EMAIL) {
      setUser(null);
    }
    navigate('home');
  };

  const handleToastDone = useCallback(() => setToast(null), []);
  // ── Auth / Profile / Product pages (full-screen) ──
  if (page === 'login')   return <LoginPage  onNavigate={navigate} onLogin={handleLogin} />;
  if (page === 'signup')  return <SignupPage  onNavigate={navigate} onLogin={handleLogin} />;
  if (page === 'profile') {
    return (
      <ProfilePage
        onNavigate={navigate}
        user={user}
        onLogout={handleLogout}
        onUserUpdate={handleUserProfileUpdate}
      />
    );
  }
  if (page === 'admin-login') return <AdminLogin onNavigate={navigate} onAdminLogin={handleAdminLogin} />;
  if (page === 'checkout') {
    return (
      <CheckoutPage
        onNavigate={navigate}
        user={user}
        cartItems={cartItems}
        subtotal={cartSubtotal}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }
  if (page === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLogin onNavigate={navigate} onAdminLogin={handleAdminLogin} />;
    }
    return (
      <Admin
        onNavigate={navigate}
        user={user}
        onLogout={handleAdminLogout}
        orders={orders}
        onAcceptOrder={handleAcceptOrder}
        onRejectOrder={handleRejectOrder}
      />
    );
  }
  if (page === 'product') return (
    <ProductDetailPage
      productId={selectedProductId}
      onNavigate={navigate}
      onAddToCart={addToCart}
    />
  );

  // ── Main site ──
  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        user={user}
        onLogin={() => navigate('login')}
        onSignup={() => navigate('signup')}
        onProfile={() => navigate('profile')}
        onLogout={handleLogout}
      />
      <main>
        <Hero />
        <Features />
        <Products onAddToCart={addToCart} onProductClick={(id) => navigate('product', id)} />
        <PromoBanner />
      </main>
      <Footer />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={handleStartCheckout}
      />

      {toast && (
        <Toast message={toast} onDone={handleToastDone} />
      )}
    </>
  );
}