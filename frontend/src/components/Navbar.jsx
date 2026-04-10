import { useState, useEffect } from 'react';

export default function Navbar({ cartCount, onCartOpen, user, onLogin, onSignup, onProfile, onLogout, onAllProducts }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navClass = `navbar ${scrolled ? 'scrolled' : 'transparent'}`;
    const isLight = scrolled;

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    // Initials avatar from name
    const initials = user
        ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
        : '';

    return (
        <nav className={navClass} id="navbar">
            {/* Logo */}
            <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <div className="nav-logo-icon" style={{ fontFamily: 'serif', fontSize: 13, fontWeight: 700, letterSpacing: '-0.5px', color: 'white' }}>AG</div>
                <span className="nav-logo-text">Agro<span>Site</span></span>
            </a>

            {/* Desktop nav links */}
            <ul className="nav-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo('products'); }}>Best Seller</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onAllProducts(); }}>All Products</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>About</a></li>
            </ul>

            {/* Actions */}
            <div className="nav-actions">

                {/* Cart */}
                <button className="nav-cart-btn" onClick={onCartOpen} aria-label="Open cart" id="nav-cart-btn"
                    style={{ fontSize: 15, fontWeight: 600 }}>
                    Cart
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>

                {user ? (
                    /* ── LOGGED IN: Profile avatar + Sign Out ── */
                    <>
                        {/* Avatar button */}
                        <button
                            id="nav-profile-btn"
                            onClick={onProfile}
                            aria-label="View profile"
                            title={user.name}
                            style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                                border: `2px solid ${isLight ? 'rgba(22,163,74,0.4)' : 'rgba(255,255,255,0.35)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 13, fontWeight: 700, color: 'white',
                                cursor: 'pointer', letterSpacing: '0.03em',
                                boxShadow: '0 2px 10px rgba(34,197,94,0.3)',
                                transition: 'all 0.2s',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                            onMouseLeave={e => e.currentTarget.style.transform = ''}
                        >
                            {initials}
                        </button>

                        {/* Sign Out */}
                        <button
                            id="nav-signout-btn"
                            onClick={onLogout}
                            style={{
                                padding: '8px 18px',
                                background: 'transparent',
                                border: `1.5px solid ${isLight ? 'rgba(220,38,38,0.5)' : 'rgba(255,255,255,0.35)'}`,
                                borderRadius: 25, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                                color: isLight ? '#dc2626' : 'white',
                                fontFamily: 'Inter, sans-serif', transition: 'all 0.25s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = isLight ? 'rgba(220,38,38,0.06)' : 'rgba(255,255,255,0.12)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    /* ── LOGGED OUT: Log In + Sign Up ── */
                    <>
                        <button
                            id="nav-login-btn"
                            onClick={onLogin}
                            style={{
                                padding: '8px 18px', background: 'transparent',
                                border: `1.5px solid ${isLight ? 'rgba(22,163,74,0.6)' : 'rgba(255,255,255,0.4)'}`,
                                borderRadius: 25, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                                color: isLight ? '#16a34a' : 'white',
                                fontFamily: 'Inter, sans-serif', transition: 'all 0.25s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = isLight ? 'rgba(22,163,74,0.08)' : 'rgba(255,255,255,0.12)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            Log In
                        </button>
                        <button id="nav-signup-btn" className="nav-cta-btn" onClick={onSignup}>
                            Sign Up
                        </button>
                    </>
                )}

                {/* Hamburger */}
                <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                    <span style={{ background: isLight ? '#374151' : 'white' }} />
                    <span style={{ background: isLight ? '#374151' : 'white' }} />
                    <span style={{ background: isLight ? '#374151' : 'white' }} />
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div style={{
                    position: 'fixed', top: 70, left: 0, right: 0,
                    background: 'white', padding: '1.5rem 2rem',
                    borderBottom: '1px solid #f3f4f6',
                    display: 'flex', flexDirection: 'column', gap: '1rem',
                    zIndex: 999, boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}>
                    {[{ label: 'Shop', id: 'products' }, { label: 'About', id: 'features' }].map((item) => (
                        <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                            style={{ fontSize: 16, fontWeight: 500, color: '#374151', textDecoration: 'none', padding: '0.5rem 0', borderBottom: '1px solid #f9fafb' }}>
                            {item.label}
                        </a>
                    ))}
                    <button onClick={() => { onAllProducts(); setMobileOpen(false); }} style={{ padding: '12px', border: '1.5px solid #16a34a', borderRadius: 10, background: 'transparent', color: '#16a34a', fontWeight: 600, cursor: 'pointer', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>All Products</button>
                    {user ? (
                        <>
                            <button onClick={() => { onProfile(); setMobileOpen(false); }} style={{ padding: '12px', border: '1.5px solid #16a34a', borderRadius: 10, background: 'transparent', color: '#16a34a', fontWeight: 600, cursor: 'pointer', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>My Profile</button>
                            <button onClick={() => { onLogout(); setMobileOpen(false); }} style={{ padding: '12px', border: '1.5px solid #ef4444', borderRadius: 10, background: 'transparent', color: '#ef4444', fontWeight: 600, cursor: 'pointer', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => { onLogin(); setMobileOpen(false); }} style={{ padding: '12px', border: '1.5px solid #16a34a', borderRadius: 10, background: 'transparent', color: '#16a34a', fontWeight: 600, cursor: 'pointer', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>Log In</button>
                            <button onClick={() => { onSignup(); setMobileOpen(false); }} style={{ padding: '12px', border: 'none', borderRadius: 10, background: 'linear-gradient(135deg,#16a34a,#22c55e)', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>Sign Up</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
