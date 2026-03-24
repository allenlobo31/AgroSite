import { useState } from 'react';
import { ALL_PRODUCTS } from './Products';

/* ── Extended product details map ── */
const PRODUCT_DETAILS = {
  1: {
    description: 'Hand-picked from certified organic orchards in Washington State, our Fuji Apples are naturally sweet with a satisfying crunch. Grown without synthetic pesticides and harvested at peak ripeness for maximum flavor and nutrition.',
    highlights: ['Certified USDA Organic', 'No synthetic pesticides', 'Harvested at peak ripeness', 'Rich in fibre & Vitamin C'],
    nutrition: { calories: 95, carbs: '25g', fibre: '4g', sugar: '19g', protein: '0.5g', vitC: '14%' },
    origin: 'Washington State, USA',
    weight: '1 kg pack',
    shelf: '7–10 days (refrigerated)',
    stock: 48,
  },
  2: {
    description: 'Sun-ripened on the vine for a naturally sweet, tangy flavour. Our tomatoes are sourced from small-batch farms and arrive within 24 hours of harvest, ensuring maximum freshness in every bite.',
    highlights: ['Vine-ripened for full flavour', 'No artificial ripening agents', 'Rich in lycopene & antioxidants', 'Harvested within 24 hours'],
    nutrition: { calories: 18, carbs: '4g', fibre: '1g', sugar: '3g', protein: '1g', vitC: '28%' },
    origin: 'Maharashtra, India',
    weight: '500g pack',
    shelf: '5–7 days (room temp)',
    stock: 72,
  },
  3: {
    description: 'Tender baby spinach leaves, harvested young for a mild flavour and silky texture. Perfect for salads, smoothies, or a quick sauté. Washed and packed within hours of harvest.',
    highlights: ['Pre-washed, ready to eat', 'High in iron & folate', 'No wilting or yellowing', 'Packed within hours of harvest'],
    nutrition: { calories: 7, carbs: '1g', fibre: '1g', sugar: '0g', protein: '1g', vitC: '15%' },
    origin: 'Ooty, Tamil Nadu',
    weight: '200g bag',
    shelf: '5–6 days (refrigerated)',
    stock: 34,
  },
  4: {
    description: 'Crisp, vibrant carrots straight from family-run organic farms. Naturally sweet with earthy undertones, these are perfect for roasting, juicing, or snacking raw.',
    highlights: ['High in beta-carotene', 'No wax coating', 'Farm-direct sourcing', 'Natural soil-to-shelf traceability'],
    nutrition: { calories: 41, carbs: '10g', fibre: '3g', sugar: '5g', protein: '1g', vitC: '6%' },
    origin: 'Pune, Maharashtra',
    weight: '1 kg pack',
    shelf: '14 days (refrigerated)',
    stock: 60,
  },
  5: {
    description: 'Sourced from free-range beehives in unpolluted wildflower meadows, this raw honey is unfiltered and unheated — preserving all its natural enzymes, antioxidants, and floral complexity.',
    highlights: ['Raw & unfiltered', 'No added sugar or preservatives', 'Antibacterial properties', 'Cold-extracted to retain enzymes'],
    nutrition: { calories: 64, carbs: '17g', fibre: '0g', sugar: '17g', protein: '0g', vitC: '0%' },
    origin: 'Coorg, Karnataka',
    weight: '500g jar',
    shelf: '24 months (sealed)',
    stock: 22,
  },
  6: {
    description: 'A curated collection of heirloom, non-GMO seeds for the serious home gardener. Includes 12 varieties of vegetables, herbs, and flowers — all open-pollinated for seed saving year after year.',
    highlights: ['12 seed varieties included', 'Non-GMO & open-pollinated', 'Germination rate >90%', 'Includes planting guide'],
    nutrition: { calories: '-', carbs: '-', fibre: '-', sugar: '-', protein: '-', vitC: '-' },
    origin: 'Sourced across India',
    weight: '12 seed packets',
    shelf: '2 years (cool, dry storage)',
    stock: 15,
  },
  7: {
    description: 'Professional-grade garden tools engineered for durability and comfort. The ergonomic handles reduce hand fatigue during extended use. Set includes trowel, transplanter, weeder, cultivator, and pruning shears.',
    highlights: ['Stainless steel blades', 'Ergonomic rubber grip', '5-piece complete set', 'Rust & corrosion resistant'],
    nutrition: { calories: '-', carbs: '-', fibre: '-', sugar: '-', protein: '-', vitC: '-' },
    origin: 'Made in India',
    weight: '1.2 kg set',
    shelf: 'Multi-year lifespan',
    stock: 8,
  },
  8: {
    description: 'A rich blend of composted organic matter, vermicompost, and beneficial microbes. Conditions soil structure, boosts microbial activity, and delivers slow-release nutrients for lush, productive growth.',
    highlights: ['100% organic inputs', 'Enriched with vermicompost', 'Improves soil water retention', 'Safe for edible plants'],
    nutrition: { calories: '-', carbs: '-', fibre: '-', sugar: '-', protein: '-', vitC: '-' },
    origin: 'Produced in Bengaluru',
    weight: '5 kg bag',
    shelf: '12 months (sealed)',
    stock: 29,
  },
};

/* ── Star rating ── */
function Stars({ rating, size = 16 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? '#f59e0b' : '#e5e7eb', lineHeight: 1 }}>&#9733;</span>
      ))}
    </div>
  );
}

/* ── Badge ── */
function Badge({ type }) {
  const map = {
    organic: { label: 'Organic', bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
    sale:    { label: 'Sale',    bg: '#fef3c7', color: '#92400e', border: '#fde68a' },
    new:     { label: 'New',     bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe' },
  };
  const s = map[type] || map.organic;
  return (
    <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {s.label}
    </span>
  );
}

export default function ProductDetailPage({ productId, onNavigate, onAddToCart }) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  const details = PRODUCT_DETAILS[productId] || {};
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [added, setAdded] = useState(false);

  // Related products (same category, excluding current)
  const related = ALL_PRODUCTS.filter(p => p.category === product?.category && p.id !== productId).slice(0, 3);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: '1rem' }}>&#9785;</div>
          <p style={{ color: '#6b7280' }}>Product not found.</p>
          <button onClick={() => onNavigate('home')} style={{ marginTop: '1rem', padding: '10px 24px', background: '#16a34a', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const discount = product.original ? Math.round((1 - product.price / product.original) * 100) : 0;
  const isFood = !['Seeds', 'Tools', 'Fertilizers'].includes(product.category);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf9', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Top bar ── */}
      <div style={{ background: 'white', borderBottom: '1px solid #f3f4f6', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 12px rgba(0,0,0,0.05)' }}>
        <button
          onClick={() => onNavigate('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#6b7280', fontFamily: 'Inter, sans-serif', padding: '6px 12px', borderRadius: 8, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6 }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#111827'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#6b7280'; }}
        >
          &larr; Back
        </button>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 13, color: '#9ca3af' }}>
          <span style={{ cursor: 'pointer', color: '#16a34a' }} onClick={() => onNavigate('home')}>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span style={{ color: '#374151', fontWeight: 500 }}>{product.name}</span>
        </div>

        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: 'linear-gradient(135deg,#16a34a,#22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', letterSpacing: '-0.5px', fontFamily: 'Inter, sans-serif' }}>AG</div>
          <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, fontSize: 18, color: '#0a0f0d' }}>Agro<span style={{ color: '#16a34a' }}>Site</span></span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* ── Main Product section ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start', marginBottom: '3rem' }}>

          {/* Left — image */}
          <div>
            <div style={{
              background: 'white', borderRadius: 24,
              overflow: 'hidden', aspectRatio: '1',
              boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
              border: '1px solid #f3f4f6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '85%', height: '85%', objectFit: 'contain' }}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              {/* Fallback placeholder */}
              <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: '#f0fdf4', fontSize: 80, color: '#86efac' }}>
                &#9646;
              </div>

              {/* Badge overlay */}
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <Badge type={product.badge} />
              </div>

              {discount > 0 && (
                <div style={{ position: 'absolute', top: 16, right: 16, background: '#ef4444', color: 'white', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>
                  -{discount}%
                </div>
              )}
            </div>

            {/* Thumbnail strip placeholder */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ width: 72, height: 72, borderRadius: 12, background: 'white', border: i === 1 ? '2px solid #16a34a' : '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>
                  <img src={product.image} alt="" style={{ width: '80%', height: '80%', objectFit: 'contain', opacity: i === 1 ? 1 : 0.4 }} onError={e => e.target.style.display = 'none'} />
                </div>
              ))}
            </div>
          </div>

          {/* Right — Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Category + name */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                {product.category}
              </div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#0a0f0d', lineHeight: 1.2, letterSpacing: '-0.5px', margin: 0 }}>
                {product.name}
              </h1>
            </div>

            {/* Rating row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Stars rating={product.rating} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{product.rating.toFixed(1)}</span>
              <span style={{ fontSize: 13, color: '#9ca3af' }}>({product.reviews} reviews)</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#d1d5db' }} />
              <span style={{ fontSize: 13, color: details.stock < 20 ? '#dc2626' : '#16a34a', fontWeight: 500 }}>
                {details.stock < 20 ? `Only ${details.stock} left` : `${details.stock} in stock`}
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: '#0a0f0d', letterSpacing: '-1px' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.original && (
                <>
                  <span style={{ fontSize: 20, color: '#9ca3af', textDecoration: 'line-through' }}>${product.original.toFixed(2)}</span>
                  <span style={{ background: '#fef3c7', color: '#92400e', fontSize: 13, fontWeight: 700, padding: '2px 10px', borderRadius: 20 }}>Save ${(product.original - product.price).toFixed(2)}</span>
                </>
              )}
            </div>

            {/* Short description */}
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>
              {details.description}
            </p>

            {/* Key highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {(details.highlights || []).map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#dcfce7', border: '1px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#16a34a', flexShrink: 0, fontWeight: 700 }}>&#10003;</span>
                  {h}
                </div>
              ))}
            </div>

            {/* Origin / Weight / Shelf life */}
            <div style={{ background: '#f9fafb', borderRadius: 14, padding: '1rem 1.25rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', border: '1px solid #f3f4f6' }}>
              {[
                { label: 'Origin', value: details.origin },
                { label: 'Pack Size', value: details.weight },
                { label: 'Shelf Life', value: details.shelf },
              ].map(m => (
                <div key={m.label}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{m.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* ── Add to cart zone ── */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingTop: '0.5rem' }}>

              {/* Qty stepper */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: 'white' }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: 42, height: 50, border: 'none', background: 'none', fontSize: 18, cursor: 'pointer', color: '#374151', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >&#8722;</button>
                <span style={{ width: 40, textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#111827' }}>{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  style={{ width: 42, height: 50, border: 'none', background: 'none', fontSize: 18, cursor: 'pointer', color: '#374151', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >&#43;</button>
              </div>

              {/* Add to cart button */}
              <button
                id="detail-add-to-cart-btn"
                onClick={handleAddToCart}
                style={{
                  flex: 1, height: 50,
                  background: added ? '#15803d' : 'linear-gradient(135deg,#16a34a,#22c55e)',
                  color: 'white', border: 'none', borderRadius: 12,
                  fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  boxShadow: '0 6px 20px rgba(34,197,94,0.35)',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => { if (!added) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(34,197,94,0.45)'; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 20px rgba(34,197,94,0.35)'; }}
              >
                {added ? 'Added to Cart ✓' : `Add ${qty > 1 ? `${qty} ` : ''}to Cart — $${(product.price * qty).toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>

        {/* ── Tabs: Details / Nutrition / Reviews ── */}
        <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6', overflow: 'hidden', marginBottom: '3rem' }}>

          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid #f3f4f6' }}>
            {(['details', ...(isFood ? ['nutrition'] : []), 'reviews']).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '1rem 1.75rem', border: 'none', cursor: 'pointer',
                background: 'none', fontFamily: 'Inter, sans-serif',
                fontSize: 14, fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? '#16a34a' : '#6b7280',
                borderBottom: activeTab === tab ? '2px solid #16a34a' : '2px solid transparent',
                textTransform: 'capitalize', transition: 'all 0.2s',
                marginBottom: -1,
              }}>
                {tab === 'details' ? 'Product Details' : tab === 'nutrition' ? 'Nutrition Info' : 'Customer Reviews'}
              </button>
            ))}
          </div>

          <div style={{ padding: '2rem' }}>

            {/* Details tab */}
            {activeTab === 'details' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, margin: 0 }}>{details.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {(details.highlights || []).map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.75rem 1rem', background: '#f8fdf9', borderRadius: 10, border: '1px solid #dcfce7' }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nutrition tab */}
            {activeTab === 'nutrition' && isFood && (
              <div>
                <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: '1.25rem' }}>Per 100g serving</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {Object.entries(details.nutrition || {}).map(([key, val]) => (
                    <div key={key} style={{ background: '#f9fafb', borderRadius: 12, padding: '1rem', textAlign: 'center', border: '1px solid #f3f4f6' }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#0a0f0d', marginBottom: 4 }}>{val}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'capitalize', fontWeight: 500 }}>
                        {key === 'vitC' ? 'Vitamin C' : key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews tab */}
            {activeTab === 'reviews' && (
              <div>
                {/* Summary */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6', marginBottom: '1.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 56, fontWeight: 800, color: '#0a0f0d', lineHeight: 1, letterSpacing: '-2px' }}>{product.rating.toFixed(1)}</div>
                    <Stars rating={product.rating} size={18} />
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{product.reviews} reviews</div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {[5, 4, 3, 2, 1].map(star => {
                      const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 7 : star === 2 ? 2 : 1;
                      return (
                        <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ fontSize: 12, color: '#6b7280', minWidth: 8 }}>{star}</span>
                          <span style={{ fontSize: 12, color: '#f59e0b' }}>&#9733;</span>
                          <div style={{ flex: 1, height: 6, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: '#f59e0b', borderRadius: 4 }} />
                          </div>
                          <span style={{ fontSize: 12, color: '#9ca3af', minWidth: 28 }}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample reviews */}
                {[
                  { name: 'Priya S.', stars: 5, date: 'Mar 18, 2024', text: `Absolutely love the quality! The ${product.name} were super fresh and exactly as described. Will definitely order again.` },
                  { name: 'Rahul M.', stars: 4, date: 'Mar 10, 2024', text: 'Great product overall. Came well-packaged and arrived on time. Slight delay on delivery but the quality made up for it.' },
                  { name: 'Ananya K.', stars: 5, date: 'Feb 28, 2024', text: 'Best quality I\'ve found online. The farm-fresh difference is noticeable compared to supermarket produce.' },
                ].map((r, i) => (
                  <div key={i} style={{ paddingBottom: '1.25rem', marginBottom: '1.25rem', borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#16a34a,#22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white' }}>{r.name[0]}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{r.name}</div>
                          <Stars rating={r.stars} size={12} />
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: '#9ca3af' }}>{r.date}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#0a0f0d', marginBottom: '1.5rem' }}>
              More from {product.category}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
              {related.map(p => (
                <div
                  key={p.id}
                  onClick={() => onNavigate('product', p.id)}
                  style={{ background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid #f3f4f6', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'; }}
                >
                  <div style={{ height: 160, background: '#f8fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <img src={p.image} alt={p.name} style={{ height: '100%', objectFit: 'contain' }} onError={e => e.target.style.display = 'none'} />
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{p.category}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 6 }}>{p.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#16a34a' }}>${p.price.toFixed(2)}</span>
                      <Stars rating={p.rating} size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
