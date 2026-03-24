import { useState } from 'react';
import { RightPanel } from './LoginPage';

export default function SignupPage({ onNavigate, onLogin }) {
    const [showPw, setShowPw] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ name: form.name.trim() || form.email.split('@')[0], email: form.email, phone: '' });
    };

    const inputStyle = {
        padding: '13px 16px', borderRadius: 12,
        border: '1.5px solid #e5e7eb', fontSize: 14,
        outline: 'none', fontFamily: 'Inter, sans-serif',
        color: '#111827', background: '#f9fafb',
        width: '100%', boxSizing: 'border-box',
        transition: 'border-color 0.2s',
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
                <div style={{ padding: '2.75rem 3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                    {/* Logo */}
                    <div
                        onClick={() => onNavigate('home')}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.75rem', cursor: 'pointer', width: 'fit-content' }}
                    >
                        <div style={{
                            width: 32, height: 32,
                            background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                            borderRadius: 8,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 13, fontWeight: 700, color: 'white',
                            boxShadow: '0 4px 12px rgba(34,197,94,0.4)',
                            fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px',
                        }}>AG</div>
                        <span style={{
                            fontFamily: 'Playfair Display, Georgia, serif',
                            fontWeight: 700, fontSize: 20, color: '#0a0f0d',
                        }}>Agro<span style={{ color: '#16a34a' }}>Site</span></span>
                    </div>

                    {/* Heading */}
                    <h1 style={{
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontSize: 30, fontWeight: 700, color: '#0a0f0d',
                        lineHeight: 1.15, marginBottom: '0.4rem', letterSpacing: '-0.5px',
                    }}>
                        Start with us
                    </h1>
                    <p style={{ fontSize: 14, color: '#6b7280', marginBottom: '1.75rem' }}>
                        Join 50,000+ growers getting fresh produce delivered.
                    </p>





                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <input
                            id="signup-name"
                            type="text"
                            placeholder="Full name"
                            value={form.name}
                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                            required
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = '#16a34a'}
                            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />

                        <input
                            id="signup-email"
                            type="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                            required
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = '#16a34a'}
                            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />

                        <div style={{ position: 'relative' }}>
                            <input
                                id="signup-password"
                                type={showPw ? 'text' : 'password'}
                                placeholder="Create password"
                                value={form.password}
                                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                                required
                                style={{ ...inputStyle, paddingRight: 48 }}
                                onFocus={e => e.target.style.borderColor = '#16a34a'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                            <button type="button" onClick={() => setShowPw(p => !p)} style={{
                                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: 16, color: '#9ca3af', lineHeight: 1,
                            }}>{showPw ? '🙈' : '👁️'}</button>
                        </div>

                        {/* Password strength hint */}
                        {form.password.length > 0 && (
                            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} style={{
                                        flex: 1, height: 3, borderRadius: 3,
                                        background: form.password.length >= i * 3
                                            ? (form.password.length >= 10 ? '#16a34a' : form.password.length >= 6 ? '#fbbf24' : '#ef4444')
                                            : '#e5e7eb',
                                        transition: 'background 0.3s',
                                    }} />
                                ))}
                                <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 4, whiteSpace: 'nowrap' }}>
                                    {form.password.length >= 10 ? 'Strong 💪' : form.password.length >= 6 ? 'Good' : 'Weak'}
                                </span>
                            </div>
                        )}

                        <button id="signup-submit-btn" type="submit" style={{
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
                            Start Growing
                        </button>
                    </form>

                    {/* Switch to login */}
                    <p style={{ textAlign: 'center', fontSize: 14, color: '#6b7280', marginTop: '1.25rem' }}>
                        Already have an account?{' '}
                        <button onClick={() => onNavigate('login')} style={{
                            background: 'none', border: 'none', color: '#16a34a',
                            fontWeight: 700, cursor: 'pointer', fontSize: 14,
                            fontFamily: 'Inter, sans-serif', padding: 0,
                        }}>Log in</button>
                    </p>
                </div>

                {/* ── RIGHT: Nature image panel ── */}
                <RightPanel />
            </div>
        </div>
    );
}
