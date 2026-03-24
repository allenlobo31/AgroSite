import { useState } from 'react';

export default function LoginPage({ onNavigate }) {
    const [showPw, setShowPw] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onNavigate('home');
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
        }}>
            {/* Background darkening overlay */}
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,30,10,0.45)', zIndex: 0, backdropFilter: 'blur(12px)', }} />

            {/* Card */}
            <div style={{
                width: '100%',
                maxWidth: 900,
                background: 'white',
                borderRadius: 28,
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                boxShadow: '0 40px 100px rgba(0,0,0,0.45)',
                minHeight: 560,
                position: 'relative',
                zIndex: 1,
            }}>

                {/* ── LEFT: Form ── */}
                <div style={{ padding: '3rem 3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                    {/* Logo */}
                    <div
                        onClick={() => onNavigate('home')}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem', cursor: 'pointer', width: 'fit-content' }}
                    >
                        <div style={{
                            width: 32, height: 32,
                            background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                            borderRadius: 8,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 15, boxShadow: '0 4px 12px rgba(34,197,94,0.4)',
                        }}>🌿</div>
                        <span style={{
                            fontFamily: 'Playfair Display, Georgia, serif',
                            fontWeight: 700, fontSize: 20, color: '#0a0f0d',
                        }}>Agro<span style={{ color: '#16a34a' }}>Site</span></span>
                    </div>

                    {/* Heading */}
                    <h1 style={{
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontSize: 32, fontWeight: 700, color: '#0a0f0d',
                        lineHeight: 1.15, marginBottom: '0.5rem', letterSpacing: '-0.5px',
                    }}>
                        Welcome back
                    </h1>
                    <p style={{ fontSize: 14, color: '#6b7280', marginBottom: '2rem' }}>
                        Sign in to access your orders and favourites.
                    </p>




                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                            required
                            style={{
                                padding: '13px 16px', borderRadius: 12,
                                border: '1.5px solid #e5e7eb', fontSize: 14,
                                outline: 'none', fontFamily: 'Inter, sans-serif',
                                color: '#111827', background: '#f9fafb',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={e => e.target.style.borderColor = '#16a34a'}
                            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />

                        <div style={{ position: 'relative' }}>
                            <input
                                id="login-password"
                                type={showPw ? 'text' : 'password'}
                                placeholder="Password"
                                value={form.password}
                                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                                required
                                style={{
                                    width: '100%', padding: '13px 48px 13px 16px', borderRadius: 12,
                                    border: '1.5px solid #e5e7eb', fontSize: 14,
                                    outline: 'none', fontFamily: 'Inter, sans-serif',
                                    color: '#111827', background: '#f9fafb',
                                    boxSizing: 'border-box', transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.target.style.borderColor = '#16a34a'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                            <button type="button" onClick={() => setShowPw(p => !p)} style={{
                                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: 16, color: '#9ca3af', lineHeight: 1,
                            }}>{showPw ? '🙈' : '👁️'}</button>
                        </div>

                        <div style={{ textAlign: 'right', marginTop: '-4px' }}>
                            <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: 13, color: '#16a34a', fontWeight: 500, textDecoration: 'none' }}>
                                Forgot password?
                            </a>
                        </div>

                        <button id="login-submit-btn" type="submit" style={{
                            padding: '14px', marginTop: '0.25rem',
                            background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                            color: 'white', border: 'none', borderRadius: 12,
                            fontSize: 15, fontWeight: 700, cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            boxShadow: '0 6px 24px rgba(34,197,94,0.4)',
                            transition: 'all 0.3s ease',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(34,197,94,0.5)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px rgba(34,197,94,0.4)'; }}
                        >
                            Log In
                        </button>
                    </form>

                    {/* Switch to signup */}
                    <p style={{ textAlign: 'center', fontSize: 14, color: '#6b7280', marginTop: '1.5rem' }}>
                        Don't have an account?{' '}
                        <button onClick={() => onNavigate('signup')} style={{
                            background: 'none', border: 'none', color: '#16a34a',
                            fontWeight: 700, cursor: 'pointer', fontSize: 14,
                            fontFamily: 'Inter, sans-serif', padding: 0,
                        }}>Sign Up</button>
                    </p>
                </div>

                {/* ── RIGHT: Nature image panel ── */}
                <RightPanel />
            </div>
        </div>
    );
}

/* ── Shared right-panel: blurred hero-bg.png ── */
export function RightPanel() {
    return (
        <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0 28px 28px 0',
            minHeight: 560,
        }}>
            {/* Background image — fills the panel */}
            <img
                src="/hero-bg.png"
                alt="Fresh farm landscape"
                style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                }}
            />

            {/* Blur glass layer */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(5, 30, 12, 0.30)',
            }} />




        </div>
    );
}
