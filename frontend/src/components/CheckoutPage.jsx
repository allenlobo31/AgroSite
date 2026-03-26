import { useMemo, useState } from 'react';

export default function CheckoutPage({ onNavigate, user, cartItems, subtotal, onPlaceOrder }) {
  const savedAddresses = useMemo(() => {
    if (Array.isArray(user?.savedAddresses) && user.savedAddresses.length > 0) {
      return user.savedAddresses;
    }

    if (user?.address || user?.phone) {
      return [{
        id: 'profile-default',
        label: 'Profile Default',
        isDefault: true,
        name: user?.name || 'Account',
        address: user?.address || '',
        phone: user?.phone || '',
      }];
    }

    return [];
  }, [user]);

  const defaultSavedAddress = savedAddresses.find((addr) => addr.isDefault) || savedAddresses[0] || null;
  const [selectedAddressId, setSelectedAddressId] = useState(defaultSavedAddress ? String(defaultSavedAddress.id) : 'manual');
  const [address, setAddress] = useState(defaultSavedAddress?.address || '');
  const [phone, setPhone] = useState(defaultSavedAddress?.phone || user?.phone || '');
  const [saveAsDefault, setSaveAsDefault] = useState(!defaultSavedAddress);
  const [errors, setErrors] = useState({});

  const selectedSavedAddress = savedAddresses.find((addr) => String(addr.id) === selectedAddressId);
  const usingProfileAddress = Boolean(selectedSavedAddress) && selectedAddressId !== 'manual';

  const cartSummary = useMemo(() => (
    cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      qty: item.qty,
      lineTotal: Number((item.price * item.qty).toFixed(2)),
    }))
  ), [cartItems]);

  const handleSavedAddressChange = (value) => {
    setSelectedAddressId(value);
    if (value === 'manual') return;

    const selected = savedAddresses.find((addr) => String(addr.id) === value);
    if (!selected) return;

    setAddress(selected.address || '');
    setPhone((selected.phone || '').replace(/\D/g, ''));
    setErrors({});
  };

  const validate = () => {
    const nextErrors = {};
    const finalAddress = address;
    const finalPhone = phone;

    if (!finalAddress.trim()) {
      nextErrors.address = 'Address is required';
    }

    const digits = finalPhone.replace(/\D/g, '');
    if (digits.length < 10) {
      nextErrors.phone = 'Phone number must be at least 10 digits';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      onNavigate('home');
      return;
    }

    if (!validate()) return;

    const finalAddress = address.trim();
    const finalPhone = phone.replace(/\D/g, '');

    onPlaceOrder({
      address: finalAddress,
      phone: finalPhone,
      saveAsDefault,
    });
  };

  const readonlyDefaults = usingProfileAddress;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf9', fontFamily: 'Inter, sans-serif' }}>
      <div style={{
        background: 'white',
        borderBottom: '1px solid #f3f4f6',
        padding: '0 2rem',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 12px rgba(0,0,0,0.05)',
      }}>
        <button
          onClick={() => onNavigate('home')}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#6b7280',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: 8,
          }}
        >
          &larr; Back to Store
        </button>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            background: 'linear-gradient(135deg, #16a34a, #22c55e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            color: 'white',
          }}>
            AG
          </div>
          <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, fontSize: 18, color: '#0a0f0d' }}>
            Agro<span style={{ color: '#16a34a' }}>Site</span>
          </span>
        </div>
      </div>

      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '2rem 1.25rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1rem',
      }}>
        <section style={{
          background: 'white',
          border: '1px solid #ecfdf3',
          borderRadius: 18,
          boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
          padding: '1.25rem',
        }}>
          <h1 style={{ margin: 0, fontSize: 28, color: '#0f172a' }}>Checkout Details</h1>
          <p style={{ color: '#6b7280', marginTop: 6, marginBottom: 18 }}>Enter shipping address and phone to place your order.</p>

          {savedAddresses.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#334155', fontSize: 13 }}>
                Select Address From Profile
              </label>
              <select
                value={selectedAddressId}
                onChange={(e) => handleSavedAddressChange(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  border: '1.5px solid #d1d5db',
                  borderRadius: 10,
                  padding: '10px 12px',
                  background: '#f9fafb',
                  color: '#111827',
                  fontSize: 14,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {savedAddresses.map((addr) => (
                  <option key={addr.id} value={String(addr.id)}>
                    {addr.label || 'Address'}{addr.isDefault ? ' (Default)' : ''}
                  </option>
                ))}
                <option value="manual">Enter New Address</option>
              </select>
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#334155', fontSize: 13 }}>Address</label>
            <textarea
              rows={4}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
              }}
              disabled={readonlyDefaults}
              placeholder="Enter full delivery address"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                border: errors.address ? '1.5px solid #ef4444' : '1.5px solid #d1d5db',
                borderRadius: 10,
                padding: '10px 12px',
                background: readonlyDefaults ? '#f3f4f6' : '#f9fafb',
                color: '#111827',
                fontSize: 14,
                resize: 'vertical',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            {errors.address && <p style={{ color: '#dc2626', margin: '6px 0 0', fontSize: 12 }}>{errors.address}</p>}
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#334155', fontSize: 13 }}>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, ''));
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              disabled={readonlyDefaults}
              placeholder="Enter 10+ digit phone number"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                border: errors.phone ? '1.5px solid #ef4444' : '1.5px solid #d1d5db',
                borderRadius: 10,
                padding: '10px 12px',
                background: readonlyDefaults ? '#f3f4f6' : '#f9fafb',
                color: '#111827',
                fontSize: 14,
                fontFamily: 'Inter, sans-serif',
              }}
            />
            {errors.phone && <p style={{ color: '#dc2626', margin: '6px 0 0', fontSize: 12 }}>{errors.phone}</p>}
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, fontSize: 14, color: '#334155' }}>
            <input
              type="checkbox"
              checked={saveAsDefault}
              onChange={(e) => setSaveAsDefault(e.target.checked)}
              disabled={usingProfileAddress}
            />
            Save these details as default in profile
          </label>

          <button
            onClick={handlePlaceOrder}
            style={{
              width: '100%',
              border: 'none',
              borderRadius: 12,
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Place Order
          </button>
        </section>

        <aside style={{
          background: 'white',
          border: '1px solid #ecfdf3',
          borderRadius: 18,
          boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
          padding: '1.25rem',
          height: 'fit-content',
        }}>
          <h2 style={{ marginTop: 0, color: '#0f172a' }}>Order Summary</h2>

          {cartSummary.length === 0 ? (
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Your cart is empty.</p>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              {cartSummary.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 14, color: '#334155' }}>
                  <span>{item.name} x{item.qty}</span>
                  <strong>${item.lineTotal.toFixed(2)}</strong>
                </div>
              ))}

              <div style={{ borderTop: '1px solid #dcfce7', paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>Total</span>
                <span style={{ fontWeight: 800, color: '#16a34a', fontSize: 18 }}>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
