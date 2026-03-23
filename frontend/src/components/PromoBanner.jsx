export default function PromoBanner() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="banner-section">
            <div className="banner-inner">
                <div className="banner-content">
                    <div className="banner-tag">🌾 Seasonal Harvest</div>
                    <h2 className="banner-title">Fresh from the<br />field to your table</h2>
                    <p className="banner-desc">
                        Discover our curated selection of seasonal produce, harvested at peak ripeness
                        and delivered within 24 hours of picking. Taste the difference.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            className="btn-primary"
                            onClick={() => scrollTo('products')}
                            id="banner-shop-btn"
                        >
                            Shop Fresh Picks
                        </button>
                        <button
                            onClick={() => scrollTo('newsletter')}
                            id="banner-newsletter-btn"
                            style={{
                                padding: '14px 28px',
                                background: 'rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.8)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '50px',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            Get Notified →
                        </button>
                    </div>
                </div>
                <div className="banner-img">
                    <img src="/products-banner.png" alt="Fresh organic produce" />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to right, #0a0f0d 0%, transparent 40%)',
                    }} />
                </div>
            </div>
        </div>
    );
}
