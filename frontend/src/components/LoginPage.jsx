import { useState } from 'react';

export default function LoginPage({ onNavigate, onLogin }) {
    const [showPw, setShowPw] = useState(false);
    const [form, setForm] = useState({ email: '', password: '', phone: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handlePhoneChange = (value) => {
        // Only allow digits
        const cleaned = value.replace(/\D/g, '');
        setForm(p => ({ ...p, phone: cleaned }));
        // Clear phone error when user corrects it
        if (cleaned.length >= 10 && errors.phone) {
            setErrors(p => ({ ...p, phone: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        
        if (!form.email) {
            newErrors.email = 'Email is required';
        }
        if (!form.password) {
            newErrors.password = 'Password is required';
        }
        if (form.phone && form.phone.length < 10) {
            newErrors.phone = 'Phone number must be at least 10 digits';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setSubmitting(true);
            await onLogin({
                email: form.email,
                password: form.password,
            });
        } catch (error) {
            const message = String(error?.message || 'Login failed');
            if (message === 'Invalid email') {
                setErrors({ email: 'Invalid email' });
            } else if (message === 'Invalid password') {
                setErrors({ password: 'Invalid password' });
            } else {
                setErrors({ form: message });
            }
        } finally {
            setSubmitting(false);
        }
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
                        {errors.form && <p style={{ color: '#ef4444', fontSize: 12, margin: '0 0 6px 0', fontWeight: 600 }}>{errors.form}</p>}
                        <input
                            id="login-email"
                            type="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={e => {
                                setForm(p => ({ ...p, email: e.target.value }));
                                if (e.target.value && errors.email) {
                                    setErrors(p => ({ ...p, email: '' }));
                                }
                            }}
                            required
                            style={{
                                padding: '13px 16px', borderRadius: 12,
                                border: errors.email ? '1.5px solid #ef4444' : '1.5px solid #e5e7eb', fontSize: 14,
                                outline: 'none', fontFamily: 'Inter, sans-serif',
                                color: '#111827', background: '#f9fafb',
                                transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box',
                            }}
                            onFocus={e => e.target.style.borderColor = errors.email ? '#ef4444' : '#16a34a'}
                            onBlur={e => e.target.style.borderColor = errors.email ? '#ef4444' : '#e5e7eb'}
                        />
                        {errors.email && <p style={{ color: '#ef4444', fontSize: 12, margin: '6px 0 0 0', fontWeight: 500 }}>{errors.email}</p>}

                        <div style={{ position: 'relative' }}>
                            <input
                                id="login-password"
                                type={showPw ? 'text' : 'password'}
                                placeholder="Password"
                                value={form.password}
                                onChange={e => {
                                    setForm(p => ({ ...p, password: e.target.value }));
                                    if (e.target.value && errors.password) {
                                        setErrors(p => ({ ...p, password: '' }));
                                    }
                                }}
                                required
                                style={{
                                    width: '100%', padding: '13px 48px 13px 16px', borderRadius: 12,
                                    border: errors.password ? '1.5px solid #ef4444' : '1.5px solid #e5e7eb', fontSize: 14,
                                    outline: 'none', fontFamily: 'Inter, sans-serif',
                                    color: '#111827', background: '#f9fafb',
                                    boxSizing: 'border-box', transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.target.style.borderColor = errors.password ? '#ef4444' : '#16a34a'}
                                onBlur={e => e.target.style.borderColor = errors.password ? '#ef4444' : '#e5e7eb'}
                            />
                            <button type="button" onClick={() => setShowPw(p => !p)} style={{
                                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: 16, color: '#9ca3af', lineHeight: 1,
                            }}>{showPw ? '🙈' : '👁️'}</button>
                        </div>
                        {errors.password && <p style={{ color: '#ef4444', fontSize: 12, margin: '6px 0 0 0', fontWeight: 500 }}>{errors.password}</p>}

                        <div>
                            <input
                                id="login-phone"
                                type="tel"
                                placeholder="Phone number (10+ digits)"
                                value={form.phone}
                                onChange={e => handlePhoneChange(e.target.value)}
                                style={{
                                    padding: '13px 16px', borderRadius: 12,
                                    border: errors.phone ? '1.5px solid #ef4444' : '1.5px solid #e5e7eb', fontSize: 14,
                                    outline: 'none', fontFamily: 'Inter, sans-serif',
                                    color: '#111827', background: '#f9fafb',
                                    transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box',
                                }}
                                onFocus={e => e.target.style.borderColor = errors.phone ? '#ef4444' : '#16a34a'}
                                onBlur={e => e.target.style.borderColor = errors.phone ? '#ef4444' : '#e5e7eb'}
                            />
                            {errors.phone && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 6, margin: '6px 0 0 0', fontWeight: 500 }}>{errors.phone}</p>}
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
                            disabled={submitting}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(34,197,94,0.5)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px rgba(34,197,94,0.4)'; }}
                        >
                            {submitting ? 'Logging In...' : 'Log In'}
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
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0 28px 28px 0', minHeight: 560 }}>
            {/* Background image */}
            <img src="/hero-bg.png" alt="Fresh farm landscape" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

            {/* Blur glass layer */}
            <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: 'rgba(5,30,12,0.30)' }} />

            {/* Vignette */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)' }} />

            {/* Centre card */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 20, padding: '1.75rem 2rem', textAlign: 'center', maxWidth: 260, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(34,197,94,0.25)', border: '1px solid rgba(34,197,94,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: 20, fontWeight: 700, color: '#86efac', letterSpacing: '-0.5px', fontFamily: 'Inter, sans-serif' }}>AG</div>
                    <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 22, fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Grow fresh,<br />live healthy</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>100% organic produce<br />delivered to your door</div>
                </div>

                {/* Stat pills */}
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[{ label: '4.9 Rating' }, { label: 'Free Delivery' }, { label: 'Farm Direct' }].map((p, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 25, padding: '5px 14px', fontSize: 12, fontWeight: 600, color: 'white' }}>
                            {p.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

