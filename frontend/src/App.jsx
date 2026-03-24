import { useState, useEffect } from 'react';
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



// Toast notification
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="toast" id="add-to-cart-toast">
      <span className="toast-icon">✅</span>
      {message}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'login' | 'signup'
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

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Auth pages (full-screen, no Navbar/Footer) ──
  if (page === 'login') return <LoginPage onNavigate={navigate} />;
  if (page === 'signup') return <SignupPage onNavigate={navigate} />;

  // ── Main site ──
  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onLogin={() => navigate('login')}
        onSignup={() => navigate('signup')}
      />
      <main>
        <Hero />
        <Features />
        <Products onAddToCart={addToCart} />
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
        <Toast message={toast} onDone={() => setToast(null)} />
      )}
    </>
  );
}

