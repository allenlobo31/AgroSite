import { useMemo, useState } from 'react';
import { ALL_PRODUCTS, PRODUCT_BADGE_LABELS, PRODUCT_CATEGORIES } from './productsData';

const STAR_ARRAY = [1, 2, 3, 4, 5];

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {STAR_ARRAY.map((i) => (
        <span
          key={i}
          style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#e5e7eb', fontSize: 13, lineHeight: 1 }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function AllProduct({ products = ALL_PRODUCTS, onNavigate, onProductClick, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return (products || []).filter((product) => {
      const categoryOk = activeCategory === 'All' || product.category === activeCategory;
      const searchOk = !term
        || String(product.name || '').toLowerCase().includes(term)
        || String(product.category || '').toLowerCase().includes(term);

      return categoryOk && searchOk;
    });
  }, [activeCategory, products, search]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf9', fontFamily: 'Inter, sans-serif' }}>
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid #f3f4f6',
          padding: '0 2rem',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 12px rgba(0,0,0,0.05)',
        }}
      >
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
          ← Back to Store
        </button>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 7,
              background: 'linear-gradient(135deg,#16a34a,#22c55e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: 'white',
            }}
          >
            AG
          </div>
          <span
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: 700,
              fontSize: 18,
              color: '#0a0f0d',
            }}
          >
            Agro<span style={{ color: '#16a34a' }}>Site</span>
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.25rem' }}>
        <div
          style={{
            background: 'white',
            border: '1px solid #ecfdf3',
            borderRadius: 18,
            boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
            padding: '1.25rem',
            marginBottom: '1rem',
          }}
        >
          <h1 style={{ margin: 0, fontFamily: 'Playfair Display, Georgia, serif', fontSize: 34, color: '#0f172a' }}>
            All Products
          </h1>
          <p style={{ margin: '8px 0 14px', color: '#6b7280', fontSize: 14 }}>
            Browse all products with category, rating, stock, pricing, and quick actions.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name or category"
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
            />

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    border: activeCategory === cat ? '1px solid #16a34a' : '1px solid #e5e7eb',
                    background: activeCategory === cat ? '#f0fdf4' : 'white',
                    color: activeCategory === cat ? '#166534' : '#4b5563',
                    borderRadius: 999,
                    padding: '8px 12px',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 10 }}>
          Showing {visibleProducts.length} product{visibleProducts.length === 1 ? '' : 's'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 }}>
          {visibleProducts.length === 0 ? (
            <div
              style={{
                background: 'white',
                border: '1px solid #ecfdf3',
                borderRadius: 14,
                padding: '1rem',
                color: '#6b7280',
                gridColumn: '1 / -1',
              }}
            >
              No products match your filter.
            </div>
          ) : (
            visibleProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: 'white',
                  border: '1px solid #ecfdf3',
                  borderRadius: 14,
                  boxShadow: '0 6px 20px rgba(15,23,42,0.04)',
                  padding: '0.9rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: 170,
                    borderRadius: 12,
                    border: '1px solid #f3f4f6',
                    background: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '85%', height: '85%', objectFit: 'contain' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                <div style={{ minHeight: 94 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 16 }}>{product.name}</div>
                    <span
                      style={{
                        background: '#f0fdf4',
                        color: '#166534',
                        border: '1px solid #bbf7d0',
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '2px 8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {PRODUCT_BADGE_LABELS[product.badge] || product.badge || 'Product'}
                    </span>
                  </div>

                  <div style={{ marginTop: 4, color: '#6b7280', fontSize: 13 }}>
                    Category: <strong style={{ color: '#374151' }}>{product.category}</strong>
                  </div>
                  <div style={{ marginTop: 2, color: '#6b7280', fontSize: 13 }}>
                    Stock: <strong style={{ color: product.stock < 10 ? '#dc2626' : '#166534' }}>{product.stock}</strong>
                  </div>

                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Stars rating={product.rating || 4.5} />
                    <span style={{ fontSize: 12, color: '#6b7280' }}>({Number(product.reviews || 0)} reviews)</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 8 }}>
                  <div style={{ fontWeight: 800, color: '#16a34a', fontSize: 20 }}>₹{Number(product.price || 0).toFixed(2)}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <button
                      onClick={() => onProductClick(product.id)}
                      style={{
                        border: '1px solid #d1d5db',
                        background: 'white',
                        color: '#374151',
                        borderRadius: 8,
                        padding: '9px 10px',
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      style={{
                        border: 'none',
                        background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                        color: 'white',
                        borderRadius: 8,
                        padding: '9px 10px',
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
