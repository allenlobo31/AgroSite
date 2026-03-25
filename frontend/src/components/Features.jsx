// Professional SVG icon set — no emojis (outside component for optimization)
const ICONS = {
  seed: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" /><path d="M20 7a8 8 0 0 1-8 5 8 8 0 0 1-8-5 8 8 0 0 1 8-5 8 8 0 0 1 8 5z" />
    </svg>
  ),
  truck: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v4h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  leaf: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  tag: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  refresh: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-5" />
    </svg>
  ),
};

const FEATURES = [
  {
    iconKey: 'seed',
    title: 'Where Nature Grows Best',
    desc: 'More than a shop — a complete agricultural ecosystem with seeds, tools, fertilizers, and fresh produce all under one platform.',
    dark: true,
  },
  {
    iconKey: 'truck',
    title: 'Farm-to-door delivery',
    desc: 'Fresh produce delivered straight from certified farms to your home. No middlemen, just pure freshness.',
  },
  {
    iconKey: 'leaf',
    title: '100% Organic Certified',
    desc: 'Every product meets strict organic certification standards. No pesticides, no additives — just nature.',
  },
  {
    iconKey: 'tag',
    title: 'Best Price Guarantee',
    desc: "Competitive prices directly from farmers. If you find a lower price elsewhere, we'll match it.",
  },
  {
    iconKey: 'refresh',
    title: 'Easy Returns',
    desc: 'Not satisfied? No worries. Our hassle-free return policy ensures complete satisfaction.',
  },
];

export default function Features() {
  const [dark, ...rest] = FEATURES;

  return (
    <section className="section features-section" id="features">
      <div className="section-inner">
        <div style={{ maxWidth: 600 }}>
          <span className="section-tag">Why Choose Us</span>
          <h2 className="section-title">Built for modern<br />farmers &amp; gardeners</h2>
          <p className="section-subtitle">
            AgroSite brings together the best of organic farming with the convenience of
            premium e-commerce — always fresh, always natural.
          </p>
        </div>

        <div className="features-grid" style={{ marginTop: '3rem' }}>

          {/* Large dark hero card */}
          <div
            className="feature-card"
            style={{
              background: '#0a0f0d',
              color: 'white',
              gridRow: 'span 2',
              position: 'relative',
              overflow: 'hidden',
              minHeight: 380,
            }}
          >
            {/* Decorative green glow */}
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 180, height: 180, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Icon */}
            <div
              className="feature-icon"
              style={{
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.25)',
                color: '#4ade80',
              }}
            >
              {ICONS[dark.iconKey]}
            </div>

            <h3 className="feature-title" style={{ color: 'white', fontSize: 24, marginTop: '1.25rem' }}>
              {dark.title}
            </h3>
            <p className="feature-desc" style={{ color: 'rgba(255,255,255,0.58)', marginTop: '0.75rem' }}>
              {dark.desc}
            </p>

            {/* Bottom accent line */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #16a34a, #22c55e, transparent)',
            }} />
          </div>

          {/* Smaller feature cards */}
          {rest.map((f) => (
            <div className="feature-card" key={f.iconKey}>
              <div className="feature-icon">{ICONS[f.iconKey]}</div>
              <h3 className="feature-title" style={{ marginTop: '1rem' }}>{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
