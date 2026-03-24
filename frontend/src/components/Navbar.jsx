import { useState, useEffect } from 'react';

export default function Navbar({ cartCount, onCartOpen, onLogin, onSignup }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navClass = `navbar ${scrolled ? 'scrolled' : 'transparent'}`;

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    const isLight = scrolled; // text is dark when scrolled

    return (
        <nav className={navClass} id="navbar">
            {/* Logo */}
            <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <div className="nav-logo-icon">🌿</div>
                <span className="nav-logo-text">Agro<span>Site</span></span>
            </a>

            {/* Desktop Links */}
            <ul className="nav-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo('products'); }}>Shop</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>About</a></li>
            </ul>

            {/* Actions */}
            <div className="nav-actions">
                {/* Cart */}
                <button className="nav-cart-btn" onClick={onCartOpen} aria-label="Open cart" id="nav-cart-btn">
                    🛒
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>

                {/* Login — ghost */}
                <button
                    id="nav-login-btn"
                    onClick={onLogin}
                    style={{
                        padding: '8px 18px',
                        background: 'transparent',
                        border: `1.5px solid ${isLight ? 'rgba(22,163,74,0.6)' : 'rgba(255,255,255,0.4)'}`,
                        borderRadius: 25,
                        fontSize: 14, fontWeight: 500, cursor: 'pointer',
                        color: isLight ? '#16a34a' : 'white',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = isLight ? 'rgba(22,163,74,0.08)' : 'rgba(255,255,255,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                    Log In
                </button>

                {/* Sign Up — filled */}
                <button id="nav-signup-btn" className="nav-cta-btn" onClick={onSignup}>
                    Sign Up
                </button>

                {/* Hamburger */}
                <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                    <span style={{ color: isLight ? '#374151' : 'white' }} />
                    <span style={{ color: isLight ? '#374151' : 'white' }} />
                    <span style={{ color: isLight ? '#374151' : 'white' }} />
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div style={{
                    position: 'fixed', top: 70, left: 0, right: 0,
                    background: 'white', padding: '1.5rem 2rem',
                    borderBottom: '1px solid #f3f4f6',
                    display: 'flex', flexDirection: 'column', gap: '1rem',
                    zIndex: 999,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}>
                    {['Shop', 'About'].map((item, i) => (
                        <a key={i} href="#" onClick={(e) => {
                            e.preventDefault();
                            scrollTo(['products', 'features'][i]);
                        }} style={{
                            fontSize: '16px', fontWeight: '500', color: '#374151',
                            textDecoration: 'none', padding: '0.5rem 0',
                            borderBottom: '1px solid #f9fafb'
                        }}>
                            {item}
                        </a>
                    ))}
                    <button onClick={() => { onLogin(); setMobileOpen(false); }} style={{
                        padding: '12px', border: '1.5px solid #16a34a', borderRadius: 10,
                        background: 'transparent', color: '#16a34a', fontWeight: 600,
                        cursor: 'pointer', fontSize: 15, fontFamily: 'Inter, sans-serif',
                    }}>Log In</button>
                    <button onClick={() => { onSignup(); setMobileOpen(false); }} style={{
                        padding: '12px', border: 'none', borderRadius: 10,
                        background: 'linear-gradient(135deg,#16a34a,#22c55e)', color: 'white',
                        fontWeight: 600, cursor: 'pointer', fontSize: 15,
                        fontFamily: 'Inter, sans-serif',
                    }}>Sign Up</button>
                </div>
            )}
        </nav>
    );
}
