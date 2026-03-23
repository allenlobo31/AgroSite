import { useState, useEffect } from 'react';

export default function Navbar({ cartCount, onCartOpen }) {
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
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }}>Reviews</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo('newsletter'); }}>Contact</a></li>
            </ul>

            {/* Actions */}
            <div className="nav-actions">
                <button className="nav-cart-btn" onClick={onCartOpen} aria-label="Open cart" id="nav-cart-btn">
                    🛒
                    {cartCount > 0 && (
                        <span className="cart-badge">{cartCount}</span>
                    )}
                </button>
                <button className="nav-cta-btn" onClick={() => scrollTo('products')}>Shop Now</button>

                {/* Hamburger */}
                <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                    <span style={{ color: scrolled ? '#374151' : 'white' }} />
                    <span style={{ color: scrolled ? '#374151' : 'white' }} />
                    <span style={{ color: scrolled ? '#374151' : 'white' }} />
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
                    {['Shop', 'About', 'Reviews', 'Contact'].map((item, i) => (
                        <a key={i} href="#" onClick={(e) => {
                            e.preventDefault();
                            scrollTo(['products', 'features', 'testimonials', 'newsletter'][i]);
                        }} style={{
                            fontSize: '16px', fontWeight: '500', color: '#374151',
                            textDecoration: 'none', padding: '0.5rem 0',
                            borderBottom: '1px solid #f9fafb'
                        }}>
                            {item}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}
