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
import { ALL_PRODUCTS, INITIAL_ADMIN_ORDERS } from './components/productsData';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  placeOrder,
  fetchOrders,
  updateOrderStatus,
  signupUser,
  loginUser,
} from './services/backendApi';

const USER_SESSION_STORAGE_KEY = 'agrosite_user_session';
const CART_STORAGE_KEY = 'agrosite_cart_items';

function getStoredUserSession() {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(USER_SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.email) {
      window.localStorage.removeItem(USER_SESSION_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    window.localStorage.removeItem(USER_SESSION_STORAGE_KEY);
    return null;
  }
}

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
  const restoredUserSession = getStoredUserSession();
  const restoredCartItems = getStoredCartItems();

  // ── Auth state ──
  const [user, setUser] = useState(restoredUserSession);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(Boolean(restoredUserSession?.role === 'admin'));

  // ── Navigation ──
  const [page, setPage] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/admin') {
      return 'admin-login';
    }
    return 'home';
  });
  const [postAuthRedirect, setPostAuthRedirect] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // ── Cart ──
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ADMIN_ORDERS);

  const mapApiOrder = useCallback((order) => {
    const items = Array.isArray(order.items)
      ? order.items.map((item) => (
        typeof item === 'string' ? item : `${item.name} x${item.qty}`
      ))
      : [];

    return {
      id: order.id,
      customer: order.customer || order.customerEmail || 'Customer',
      items,
      total: Number(order.total || 0),
      status: order.status || 'pending',
      date: order.date || new Date().toISOString().slice(0, 10),
      phone: order.phone || '',
      address: order.address || '',
    };
  }, []);

  const loadOrders = useCallback(async (currentUser = user, email = '') => {
    if (!currentUser?.email) return [];
    const orderEmailFilter = currentUser.role === 'admin' ? email : currentUser.email;
    return fetchOrders({ user: currentUser, email: orderEmailFilter });
  }, [user]);

  useEffect(() => {
    if (!user?.email) return;

    let active = true;

    const hydrateOrders = async () => {
      try {
        const apiOrders = await loadOrders(user);
        if (active) setOrders(apiOrders.map(mapApiOrder));
      } catch {
        if (active) setToast('Could not sync orders from backend. Showing local data.');
      }
    };

    hydrateOrders();

    return () => {
      active = false;
    };
  }, [loadOrders, mapApiOrder, user]);

  const loadProducts = useCallback(async () => {
    return fetchProducts();
  }, []);

  useEffect(() => {
    let active = true;

    const hydrateProducts = async () => {
      try {
        const apiProducts = await loadProducts();
        if (active) setProducts(apiProducts);
      } catch {
        if (active) setToast('Could not sync products from backend. Showing local data.');
      }
    };

    hydrateProducts();

    return () => {
      active = false;
    };
  }, [loadProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (user?.email) {
      window.localStorage.setItem(USER_SESSION_STORAGE_KEY, JSON.stringify(user));
      return;
    }

    window.localStorage.removeItem(USER_SESSION_STORAGE_KEY);
  }, [user]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (cartItems.length > 0) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      return;
    }

    window.localStorage.removeItem(CART_STORAGE_KEY);
  }, [cartItems]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.location.pathname === '/admin' && user?.role === 'admin') {
      setIsAdminAuthenticated(true);
      setPage('admin');
    }
  }, [user]);

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

  const completePostLoginNavigation = () => {

    if (postAuthRedirect === 'checkout') {
      setPostAuthRedirect(null);
      navigate('checkout');
      return;
    }

    navigate('home');
  };

  const handleLogin = async ({ email, password }) => {
    const loggedInUser = await loginUser({ email, password });
    setUser(loggedInUser);
    completePostLoginNavigation();
  };

  const handleSignup = async ({ name, email, password, phone }) => {
    await signupUser({ name, email, password, phone });
    setToast('Signup successful. Please login to continue.');
    navigate('login');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdminAuthenticated(false);
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

    if (!user?.email) {
      setCartOpen(false);
      setPostAuthRedirect('checkout');
      setToast('Please login to continue to checkout.');
      navigate('login');
      return;
    }

    setCartOpen(false);
    navigate('checkout');
  };

  const handlePlaceOrder = async ({ address, phone, saveAsDefault }) => {
    try {
      if (!user?.email) {
        setToast('Please login to place an order.');
        navigate('login');
        return;
      }

      const payload = {
        customer: user?.name || user?.email || 'Guest Customer',
        customerEmail: user?.email || '',
        phone,
        address,
        items: cartItems.map((item) => ({ id: item.id, qty: item.qty })),
      };

      await placeOrder(payload, user);

      if (saveAsDefault) {
        setUser((prev) => {
          if (!prev) return prev;
          return { ...prev, phone, address };
        });
      }

      const apiOrders = await loadOrders(user);
      setOrders(apiOrders.map(mapApiOrder));
      setCartItems([]);
      setToast('Order placed successfully!');
      navigate('home');
    } catch (error) {
      setToast(error.message || 'Failed to place order');
    }
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'accepted', user);
      const apiOrders = await loadOrders(user);
      setOrders(apiOrders.map(mapApiOrder));
      setToast('Order accepted');
    } catch (error) {
      setToast(error.message || 'Failed to update order');
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'rejected', user);
      const apiOrders = await loadOrders(user);
      setOrders(apiOrders.map(mapApiOrder));
      setToast('Order rejected');
    } catch (error) {
      setToast(error.message || 'Failed to update order');
    }
  };

  const handleSaveProduct = async ({ productId, productData }) => {
    try {
      const payload = {
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock),
      };

      if (productId) {
        const updatedProduct = await updateProduct(productId, payload, user);
        setProducts((prev) => prev.map((item) => (item.id === productId ? updatedProduct : item)));
      } else {
        const createdProduct = await createProduct(payload, user);
        setProducts((prev) => [createdProduct, ...prev]);
      }

      loadProducts()
        .then((apiProducts) => setProducts(apiProducts))
        .catch(() => {
          // Keep the optimistic UI state if background sync fails.
        });

      setToast('Product saved successfully!');
      return true;
    } catch (error) {
      setToast(error.message || 'Failed to save product');
      return false;
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId, user);
      const apiProducts = await loadProducts();
      setProducts(apiProducts);
      setToast('Product deleted successfully!');
      return true;
    } catch (error) {
      setToast(error.message || 'Failed to delete product');
      return false;
    }
  };

  const handleAdminLogin = ({ email, password }) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        name: 'Admin',
        email: ADMIN_EMAIL,
        role: 'admin',
        memberSince: new Date(),
      };
      setIsAdminAuthenticated(true);
      setUser(adminUser);
      loadOrders(adminUser);
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
  if (page === 'signup')  return <SignupPage  onNavigate={navigate} onSignup={handleSignup} />;
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
        products={products}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
        orders={orders}
        onAcceptOrder={handleAcceptOrder}
        onRejectOrder={handleRejectOrder}
      />
    );
  }
  if (page === 'product') return (
    <ProductDetailPage
      productId={selectedProductId}
      products={products}
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
        <Products products={products} onAddToCart={addToCart} onProductClick={(id) => navigate('product', id)} />
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

function getStoredCartItems() {
  if (typeof window === 'undefined') return [];

  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }

    return parsed.filter((item) => (
      item
      && typeof item === 'object'
      && item.id != null
      && Number.isFinite(Number(item.price))
      && Number.isFinite(Number(item.qty))
      && Number(item.qty) > 0
    ));
  } catch {
    window.localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
}