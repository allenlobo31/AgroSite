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
  // ── Auth state ──
  const [user, setUser] = useState(null);

  // ── Navigation ──
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  // ── Cart ──
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

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

  const navigate = (target, id = null) => {
    setPage(target);
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

  const handleToastDone = useCallback(() => setToast(null), []);
  // ── Auth / Profile / Product pages (full-screen) ──
  if (page === 'login')   return <LoginPage  onNavigate={navigate} onLogin={handleLogin} />;
  if (page === 'signup')  return <SignupPage  onNavigate={navigate} onLogin={handleLogin} />;
  if (page === 'profile') return <ProfilePage onNavigate={navigate} user={user} onLogout={handleLogout} />;
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
      />

      {toast && (
        <Toast message={toast} onDone={handleToastDone} />
      )}
    </>
  );
}