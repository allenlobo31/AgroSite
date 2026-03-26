import { useState } from 'react';

export default function AdminLogin({ onNavigate, onAdminLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onAdminLogin({
      email: form.email.trim(),
      password: form.password,
    });

    if (!success) {
      setError('Invalid admin credentials. Use admin@agrosite for both fields.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 40%, #bbf7d0 100%)',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: '#ffffff',
        borderRadius: 20,
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
        padding: '2rem',
      }}>
        <h1 style={{
          margin: 0,
          fontSize: 28,
          color: '#14532d',
          fontWeight: 800,
          letterSpacing: '-0.03em',
        }}>
          Admin Login
        </h1>

        <p style={{ color: '#4b5563', fontSize: 14, marginTop: 8, marginBottom: 24 }}>
          Sign in to access the AgroSite admin dashboard.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, email: e.target.value }));
              if (error) setError('');
            }}
            placeholder="Admin username"
            required
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              border: '1.5px solid #d1d5db',
              fontSize: 14,
              outline: 'none',
            }}
          />

          <input
            type="password"
            value={form.password}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, password: e.target.value }));
              if (error) setError('');
            }}
            placeholder="Admin password"
            required
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              border: '1.5px solid #d1d5db',
              fontSize: 14,
              outline: 'none',
            }}
          />

          {error && (
            <p style={{ margin: 0, color: '#dc2626', fontSize: 13, fontWeight: 600 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              marginTop: 6,
              border: 'none',
              borderRadius: 10,
              padding: '12px 14px',
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Login to Dashboard
          </button>
        </form>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          style={{
            marginTop: 14,
            border: 'none',
            background: 'transparent',
            color: '#166534',
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
