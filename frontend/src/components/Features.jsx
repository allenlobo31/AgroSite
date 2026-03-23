const FEATURES = [
    {
        icon: '🌱',
        title: 'Capital that grows',
        desc: 'From organic seeds to premium tools — invest in your harvest and watch your garden flourish with nature\'s finest products.',
        dark: true,
    },
    {
        icon: '🚚',
        title: 'Farm-to-door delivery',
        desc: 'Fresh produce delivered straight from certified farms to your home. No middlemen, just pure freshness.',
        dark: false,
    },
    {
        icon: '🌿',
        title: '100% Organic Certified',
        desc: 'Every product meets strict organic certification standards. No pesticides, no additives — just nature.',
        dark: false,
    },
    {
        icon: '💰',
        title: 'Best Price Guarantee',
        desc: 'Competitive prices directly from farmers. If you find a lower price elsewhere, we\'ll match it.',
        dark: false,
    },
    {
        icon: '🔄',
        title: 'Easy Returns',
        desc: 'Not satisfied? No worries. Our hassle-free return policy ensures complete satisfaction.',
        dark: false,
    },
];

export default function Features() {
    return (
        <section className="section features-section" id="features">
            <div className="section-inner">
                <div style={{ maxWidth: 600 }}>
                    <span className="section-tag">Why Choose Us</span>
                    <h2 className="section-title">Built for modern<br />farmers & gardeners</h2>
                    <p className="section-subtitle">
                        AgroSite brings together the best of organic farming with the convenience of
                        premium e-commerce — always fresh, always natural.
                    </p>
                </div>

                <div className="features-grid" style={{ marginTop: '3rem' }}>
                    {/* Large dark card */}
                    <div className="feature-card" style={{
                        background: '#0a0f0d',
                        color: 'white',
                        gridRow: 'span 2',
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: 380
                    }}>
                        <div className="feature-icon" style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            borderColor: 'rgba(34, 197, 94, 0.2)'
                        }}>
                            🌱
                        </div>
                        <h3 className="feature-title" style={{ color: 'white', fontSize: 26 }}>
                            Where Nature<br />Grows Best
                        </h3>
                        <p className="feature-desc" style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
                            More than a shop — a complete agricultural ecosystem with seeds, tools,
                            fertilizers, and fresh produce all under one platform.
                        </p>
                        <img
                            src="/feature-seeds.png"
                            alt="Seeds"
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '65%',
                                height: '50%',
                                objectFit: 'cover',
                                opacity: 0.5,
                                borderRadius: '14px 0 0 0'
                            }}
                        />
                    </div>

                    {/* Small cards */}
                    {FEATURES.slice(1).map((f, i) => (
                        <div className="feature-card" key={i}>
                            <div className="feature-icon">{f.icon}</div>
                            <h3 className="feature-title">{f.title}</h3>
                            <p className="feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
