import { useEffect } from 'react';

export default function CartSidebar({ isOpen, onClose, cartItems, onUpdateQty, onRemove, onCheckout }) {
    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <>
            <div className="cart-overlay" onClick={onClose} id="cart-overlay" />
            <aside className="cart-sidebar" id="cart-sidebar">
                <div className="cart-header">
                    <h3>Your Basket 🛒</h3>
                    <button className="cart-close" onClick={onClose} aria-label="Close cart" id="cart-close-btn">✕</button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <div className="cart-empty-icon">🛒</div>
                        <p>Your basket is empty</p>
                        <button className="btn-primary" style={{ marginTop: '0.5rem' }} onClick={onClose}>
                            Start Shopping →
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div className="cart-item" key={item.id} id={`cart-item-${item.id}`}>
                                    <div
                                        className="cart-item-img"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '36px', flexShrink: 0
                                        }}
                                    >
                                        {item.emoji}
                                    </div>
                                    <div className="cart-item-info">
                                        <div className="cart-item-name">{item.name}</div>
                                        <div className="cart-item-price">₹{(item.price * item.qty).toFixed(2)}</div>
                                        <div className="cart-item-qty">
                                            <button
                                                className="qty-btn"
                                                onClick={() => onUpdateQty(item.id, item.qty - 1)}
                                                aria-label="Decrease quantity"
                                            >−</button>
                                            <span className="qty-num">{item.qty}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => onUpdateQty(item.id, item.qty + 1)}
                                                aria-label="Increase quantity"
                                            >+</button>
                                        </div>
                                    </div>
                                    <button
                                        className="cart-item-remove"
                                        onClick={() => onRemove(item.id)}
                                        aria-label="Remove item"
                                    >
                                        🗑
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div style={{
                                background: '#f8fdf9', borderRadius: 12, padding: '1rem',
                                marginBottom: '1rem', border: '1px solid #dcfce7'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontSize: 13, color: '#6b7280' }}>Subtotal ({cartItems.length} items)</span>
                                    <span style={{ fontSize: 15, fontWeight: 700 }}>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontSize: 13, color: '#6b7280' }}>Shipping</span>
                                    <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>FREE 🎉</span>
                                </div>
                                <div style={{
                                    borderTop: '1px solid #dcfce7', paddingTop: 8,
                                    display: 'flex', justifyContent: 'space-between'
                                }}>
                                    <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
                                    <span style={{ fontSize: 20, fontWeight: 800, color: '#16a34a' }}>
                                        ₹{subtotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button className="checkout-btn" id="checkout-btn" onClick={onCheckout}>
                                Checkout — ₹{subtotal.toFixed(2)} 🌿
                            </button>
                            <button
                                onClick={onClose}
                                style={{
                                    width: '100%', padding: '12px', marginTop: '0.75rem',
                                    background: 'transparent', color: '#6b7280', border: 'none',
                                    fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                                }}
                            >
                                ← Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}
