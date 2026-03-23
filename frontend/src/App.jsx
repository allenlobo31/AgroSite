import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import PromoBanner from './components/PromoBanner';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

// Partners section inline
function Partners() {
  const partners = [
    'USDA ORGANIC', 'NON-GMO PROJECT', 'RAINFOREST ALLIANCE', 'FAIR TRADE', 'B CORP', 'DEMETER'
  ];
  return (
    <div className="partners-section">
      <div className="partners-inner">
        <p className="partners-label">Backed by certified partners and visionary farms</p>
        <div className="partners-logos">
          {partners.map(p => (
            <span key={p} className="partner-logo">{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

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

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Partners />
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
