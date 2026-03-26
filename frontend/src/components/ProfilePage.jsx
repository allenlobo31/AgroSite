import { useState } from 'react';

/* ── Format date helper ── */
const formatDate = (date) => {
  if (!date) return 'Not set';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

/* ── Generate mock orders with relative dates ── */
const generateMockOrders = () => {
  const today = new Date();
  
  return [
    {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: formatDate(new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000)), // 5 days ago
      status: 'Delivered',
      total: 34.96,
      items: [
        { name: 'Organic Fuji Apples', qty: 2, price: 4.99 },
        { name: 'Raw Wildflower Honey', qty: 1, price: 12.99 },
        { name: 'Baby Spinach Leaves', qty: 4, price: 2.99 },
      ],
    },
    {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: formatDate(new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000)), // 12 days ago
      status: 'Delivered',
      total: 52.47,
      items: [
        { name: 'Heirloom Seed Kit', qty: 1, price: 24.99 },
        { name: 'Farm Fresh Carrots', qty: 3, price: 2.49 },
        { name: 'Vine Ripened Tomatoes', qty: 5, price: 3.49 },
      ],
    },
    {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: formatDate(new Date(today.getTime() - 18 * 24 * 60 * 60 * 1000)), // 18 days ago
      status: 'Processing',
      total: 64.98,
      items: [
        { name: 'Premium Garden Tools Set', qty: 1, price: 49.99 },
        { name: 'Organic Compost Mix', qty: 1, price: 14.99 },
      ],
    },
  ];
};

const statusColors = {
  Delivered: { bg: '#f0fdf4', text: '#16a34a', dot: '#22c55e' },
  Processing: { bg: '#fefce8', text: '#ca8a04', dot: '#eab308' },
  Shipped: { bg: '#eff6ff', text: '#2563eb', dot: '#3b82f6' },
  Cancelled: { bg: '#fef2f2', text: '#dc2626', dot: '#ef4444' },
};

export default function ProfilePage({ onNavigate, user, onLogout }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  // Generate mock orders from member signup date
  const mockOrders = generateMockOrders();
  
  // Address state management - initialize with user's initial address if provided
  const [addresses, setAddresses] = useState(() => {
    const defaultAddr = {
      id: 1,
      label: 'Home',
      isDefault: true,
      name: user?.name || '',
      address: user?.address || '',
      phone: user?.phone || '',
    };
    return user?.address ? [defaultAddr] : [{ ...defaultAddr, address: '' }];
  });
  
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [addressDraft, setAddressDraft] = useState(null);

  // Format membership date
  const memberSinceFormatted = user?.memberSince
    ? new Date(user.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'March 2024';

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    member: memberSinceFormatted,
  });
  const [draft, setDraft] = useState({ ...profile });

  const saveProfile = () => {
    setProfile({ ...draft });
    setEditing(false);
  };

  // Address management functions
  const startEditAddress = (id) => {
    const addr = addresses.find(a => a.id === id);
    setAddressDraft({ ...addr });
    setEditingAddressId(id);
  };

  const startAddAddress = () => {
    setAddressDraft({
      id: Date.now(),
      label: '',
      name: profile.name,
      address: '',
      phone: profile.phone,
      isDefault: false,
    });
    setShowAddAddressForm(true);
  };

  const saveAddress = () => {
    if (!addressDraft.label.trim() || !addressDraft.address.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    if (editingAddressId) {
      setAddresses(prev =>
        prev.map(a => (a.id === editingAddressId ? addressDraft : a))
      );
      setEditingAddressId(null);
    } else {
      setAddresses(prev => [...prev, addressDraft]);
      setShowAddAddressForm(false);
    }
    setAddressDraft(null);
  };

  const cancelAddressEdit = () => {
    setEditingAddressId(null);
    setShowAddAddressForm(false);
    setAddressDraft(null);
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev =>
      prev.map(a => ({ ...a, isDefault: a.id === id }))
    );
  };

  const deleteAddress = (id) => {
    if (addresses.find(a => a.id === id).isDefault && addresses.length > 1) {
      alert('Cannot delete default address. Set another as default first.');
      return;
    }
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  // Phone input validation - only digits
  const handlePhoneChange = (value) => {
    return value.replace(/\D/g, '');
  };

  const initials = profile.name
    ? profile.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : profile.email.slice(0, 2).toUpperCase();

  const inputCls = {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid #e5e7eb', borderRadius: 10,
    fontSize: 14, fontFamily: 'Inter, sans-serif',
    color: '#111827', background: '#f9fafb',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const TABS = [
    { id: 'profile', label: 'My Profile' },
    { id: 'orders', label: 'Past Orders' },
    { id: 'address', label: 'Address' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf9', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Top Bar ── */}
      <div style={{
        background: 'white', borderBottom: '1px solid #f3f4f6',
        padding: '0 2rem', height: 64,
        display: 'flex', alignItems: 'center', gap: '1rem',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 12px rgba(0,0,0,0.05)',
      }}>
        <button
          onClick={() => onNavigate('home')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 500, color: '#6b7280',
            fontFamily: 'Inter, sans-serif', padding: '6px 12px',
            borderRadius: 8, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#111827'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#6b7280'; }}
        >
          &larr; Back to Store
        </button>
        <div style={{ flex: 1 }} />

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30, height: 30,
            background: 'linear-gradient(135deg, #16a34a, #22c55e)',
            borderRadius: 7, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 12, fontWeight: 700,
            color: 'white', letterSpacing: '-0.5px',
            fontFamily: 'Inter, sans-serif',
          }}>AG</div>
          <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, fontSize: 18, color: '#0a0f0d' }}>
            Agro<span style={{ color: '#16a34a' }}>Site</span>
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{ position: 'sticky', top: 84 }}>

          {/* Avatar card */}
          <div style={{
            background: 'white', borderRadius: 20,
            padding: '2rem 1.5rem',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
            textAlign: 'center', marginBottom: '1rem',
          }}>
            {/* Initials avatar */}
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              border: '3px solid #bbf7d0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, fontWeight: 700, color: 'white',
              margin: '0 auto 1rem',
              letterSpacing: '-0.5px', fontFamily: 'Inter, sans-serif',
              boxShadow: '0 4px 20px rgba(34,197,94,0.2)',
            }}>
              {initials}
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 4 }}>
              {profile.name || 'Account'}
            </div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: '1rem' }}>
              {profile.email}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              borderRadius: 20, padding: '4px 14px',
              fontSize: 12, fontWeight: 600, color: '#16a34a',
            }}>
              <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
              Member since {profile.member}
            </div>
          </div>

          {/* Nav tabs */}
          <div style={{
            background: 'white', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
          }}>
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                id={`profile-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%', padding: '13px 18px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  border: 'none', cursor: 'pointer',
                  background: activeTab === tab.id ? '#f0fdf4' : 'white',
                  borderLeft: activeTab === tab.id ? '3px solid #16a34a' : '3px solid transparent',
                  borderBottom: i < TABS.length - 1 ? '1px solid #f9fafb' : 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif', textAlign: 'left',
                }}
                onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.background = '#f9fafb'; }}
                onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.background = 'white'; }}
              >
                <span style={{
                  fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 500,
                  color: activeTab === tab.id ? '#16a34a' : '#374151',
                }}>{tab.label}</span>
              </button>
            ))}

            {/* Sign Out */}
            <button
              onClick={onLogout}
              style={{
                width: '100%', padding: '13px 18px',
                display: 'flex', alignItems: 'center', gap: 10,
                border: 'none', borderTop: '1px solid #f3f4f6',
                cursor: 'pointer', background: 'white',
                borderLeft: '3px solid transparent',
                transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif', textAlign: 'left',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderLeftColor = '#ef4444'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderLeftColor = 'transparent'; }}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: '#ef4444' }}>Sign Out</span>
            </button>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div>

          {/* ════ PROFILE TAB ════ */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#0a0f0d', marginBottom: 4, letterSpacing: '-0.5px' }}>My Profile</h1>
                  <p style={{ fontSize: 14, color: '#9ca3af' }}>Manage your personal information</p>
                </div>
                {!editing ? (
                  <button id="edit-profile-btn" onClick={() => { setDraft({ ...profile }); setEditing(true); }} style={{
                    padding: '10px 22px',
                    background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                    color: 'white', border: 'none', borderRadius: 10,
                    fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 15px rgba(34,197,94,0.3)',
                    transition: 'all 0.2s',
                  }}>Edit Profile</button>
                ) : (
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button onClick={() => setEditing(false)} style={{ padding: '10px 20px', background: '#f3f4f6', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>Cancel</button>
                    <button id="save-profile-btn" onClick={saveProfile} style={{ padding: '10px 22px', background: 'linear-gradient(135deg, #16a34a, #22c55e)', color: 'white', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 15px rgba(34,197,94,0.3)' }}>Save Changes</button>
                  </div>
                )}
              </div>

              {/* Info card */}
              <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {[
                    { label: 'Full Name', key: 'name', type: 'text' },
                    { label: 'Email Address', key: 'email', type: 'email' },
                    { label: 'Phone Number', key: 'phone', type: 'tel' },
                    { label: 'Member Since', key: 'member', type: 'text', readOnly: true },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 6 }}>
                        {field.label}
                      </label>
                      {editing && !field.readOnly ? (
                        <input
                          id={`profile-${field.key}`}
                          type={field.type}
                          value={draft[field.key]}
                          onChange={e => {
                            const value = field.key === 'phone' ? handlePhoneChange(e.target.value) : e.target.value;
                            setDraft(p => ({ ...p, [field.key]: value }));
                          }}
                          style={inputCls}
                          onFocus={e => e.target.style.borderColor = '#16a34a'}
                          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />
                      ) : (
                        <div style={{ fontSize: 15, fontWeight: 500, color: '#111827', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                          {profile[field.key] || <span style={{ color: '#d1d5db' }}>Not set</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
                {[
                  { label: 'Total Orders', value: mockOrders.length, color: '#16a34a' },
                  { label: 'Total Spent', value: `$${mockOrders.reduce((s, o) => s + o.total, 0).toFixed(2)}`, color: '#7c3aed' },
                  { label: 'Items Purchased', value: mockOrders.flatMap(o => o.items).reduce((s, i) => s + i.qty, 0), color: '#ea580c' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'white', borderRadius: 16, padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ ORDERS TAB ════ */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#0a0f0d', marginBottom: 4, letterSpacing: '-0.5px' }}>Past Orders</h1>
                <p style={{ fontSize: 14, color: '#9ca3af' }}>{mockOrders.length} orders in your history</p>
              </div>

              {mockOrders.map(order => {
                const s = statusColors[order.status] || statusColors.Delivered;
                const open = expandedOrder === order.id;
                return (
                  <div key={order.id} style={{ background: 'white', borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
                    <button
                      onClick={() => setExpandedOrder(open ? null : order.id)}
                      style={{ width: '100%', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', textAlign: 'left' }}
                    >
                      {/* Order info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 3 }}>{order.id}</div>
                        <div style={{ fontSize: 12, color: '#9ca3af' }}>{order.date}</div>
                      </div>

                      {/* Item count */}
                      <div style={{ fontSize: 13, color: '#6b7280', minWidth: 60 }}>
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>

                      {/* Status */}
                      <div style={{ padding: '4px 14px', borderRadius: 20, background: s.bg, color: s.text, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5, minWidth: 96, justifyContent: 'center' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
                        {order.status}
                      </div>

                      {/* Total */}
                      <div style={{ textAlign: 'right', minWidth: 70 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#16a34a' }}>${order.total.toFixed(2)}</div>
                      </div>

                      {/* Chevron */}
                      <span style={{ fontSize: 11, color: '#9ca3af', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', display: 'inline-block', marginLeft: 2 }}>&#9660;</span>
                    </button>

                    {/* Expanded item list */}
                    {open && (
                      <div style={{ borderTop: '1px solid #f3f4f6', padding: '1rem 1.75rem 1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                          {order.items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.7rem 1rem', background: '#f9fafb', borderRadius: 10 }}>
                              <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#111827' }}>{item.name}</div>
                              <div style={{ fontSize: 12, color: '#9ca3af', minWidth: 50 }}>Qty: {item.qty}</div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: '#16a34a' }}>${(item.price * item.qty).toFixed(2)}</div>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px dashed #e5e7eb' }}>
                          <span style={{ fontSize: 13, color: '#6b7280' }}>Order Total (free shipping included)</span>
                          <span style={{ fontSize: 18, fontWeight: 800, color: '#0a0f0d' }}>${order.total.toFixed(2)}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
                          <button style={{ padding: '8px 18px', borderRadius: 8, border: '1.5px solid #e5e7eb', background: 'white', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = '#16a34a'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                          >Reorder</button>
                          <button style={{ padding: '8px 18px', borderRadius: 8, border: '1.5px solid #e5e7eb', background: 'white', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>View Invoice</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ════ ADDRESS TAB ════ */}
          {activeTab === 'address' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#0a0f0d', marginBottom: 4, letterSpacing: '-0.5px' }}>Delivery Address</h1>
                <p style={{ fontSize: 14, color: '#9ca3af' }}>Manage your saved delivery addresses</p>
              </div>

              {/* Address list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    style={{
                      background: 'white',
                      borderRadius: 20,
                      padding: '1.75rem',
                      boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                      border: addr.isDefault ? '2px solid #22c55e' : '1px solid #e5e7eb',
                      position: 'relative',
                      transition: 'all 0.2s',
                    }}
                  >
                    {addr.isDefault && (
                      <div style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: '#16a34a',
                        color: 'white',
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: 20,
                        letterSpacing: '0.05em',
                      }}>
                        DEFAULT
                      </div>
                    )}

                    <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {addr.label}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 4 }}>
                      {addr.name}
                    </div>
                    <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: '1rem' }}>
                      {addr.address}<br />
                      India &middot; {addr.phone}
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => startEditAddress(addr.id)}
                        id={`edit-address-${addr.id}`}
                        style={{
                          padding: '8px 18px',
                          border: '1.5px solid #16a34a',
                          borderRadius: 8,
                          background: 'transparent',
                          color: '#16a34a',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f0fdf4'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        Edit
                      </button>

                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          style={{
                            padding: '8px 18px',
                            border: '1.5px solid #d1d5db',
                            borderRadius: 8,
                            background: 'transparent',
                            color: '#6b7280',
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.color = '#16a34a'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#6b7280'; }}
                        >
                          Set as Default
                        </button>
                      )}

                      {addresses.length > 1 && (
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          style={{
                            padding: '8px 18px',
                            border: '1.5px solid #fecaca',
                            borderRadius: 8,
                            background: 'transparent',
                            color: '#dc2626',
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add new address button */}
              {!showAddAddressForm && editingAddressId === null && (
                <button
                  onClick={startAddAddress}
                  id="add-address-btn"
                  style={{
                    background: 'white',
                    borderRadius: 20,
                    padding: '1.5rem',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                    border: '2px dashed #d1fae5',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    color: '#16a34a',
                    fontWeight: 600,
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#f0fdf4';
                    e.currentTarget.style.borderColor = '#22c55e';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#d1fae5';
                  }}
                >
                  + Add New Address
                </button>
              )}

              {/* Address edit form */}
              {(showAddAddressForm || editingAddressId !== null) && addressDraft && (
                <div style={{
                  background: 'white',
                  borderRadius: 20,
                  padding: '2rem',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                  border: '1px solid #f3f4f6',
                }}>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#0a0f0d',
                    marginBottom: '1.5rem',
                  }}>
                    {editingAddressId ? 'Edit Address' : 'Add New Address'}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#9ca3af',
                        marginBottom: 6,
                      }}>
                        Address Label (e.g., Home, Office)
                      </label>
                      <input
                        type="text"
                        value={addressDraft.label}
                        onChange={e => setAddressDraft(p => ({ ...p, label: e.target.value }))}
                        id="address-label"
                        placeholder="Enter label"
                        style={inputCls}
                        onFocus={e => e.target.style.borderColor = '#16a34a'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#9ca3af',
                        marginBottom: 6,
                      }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={addressDraft.name}
                        onChange={e => setAddressDraft(p => ({ ...p, name: e.target.value }))}
                        id="address-name"
                        placeholder="Enter full name"
                        style={inputCls}
                        onFocus={e => e.target.style.borderColor = '#16a34a'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>

                    <div style={{ gridColumn: '1 / 3' }}>
                      <label style={{
                        display: 'block',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#9ca3af',
                        marginBottom: 6,
                      }}>
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={addressDraft.address}
                        onChange={e => setAddressDraft(p => ({ ...p, address: e.target.value }))}
                        id="address-street"
                        placeholder="e.g., 123 Main Street, City, State, Pincode"
                        style={inputCls}
                        onFocus={e => e.target.style.borderColor = '#16a34a'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#9ca3af',
                        marginBottom: 6,
                      }}>
                        Phone NumberhandlePhoneChange(e.target.value)
                      </label>
                      <input
                        type="tel"
                        value={addressDraft.phone}
                        onChange={e => setAddressDraft(p => ({ ...p, phone: e.target.value }))}
                        id="address-phone"
                        placeholder="Enter phone number"
                        style={inputCls}
                        onFocus={e => e.target.style.borderColor = '#16a34a'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={cancelAddressEdit}
                      style={{
                        padding: '10px 20px',
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                        color: '#6b7280',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                      onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveAddress}
                      id="save-address-btn"
                      style={{
                        padding: '10px 22px',
                        background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        boxShadow: '0 4px 15px rgba(34,197,94,0.3)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      {editingAddressId ? 'Update Address' : 'Add Address'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
