export default function Hero() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-bg" />
            <div className="hero-overlay" />

            <div className="hero-content" style={{ width: '100%' }}>
                <div className="hero-badge">
                    <span className="hero-badge-dot" />
                    100% Certified Organic Products
                </div>

                <h1 className="hero-title">
                    Where Nature
                    <span className="green-highlight">Grows Fresh</span>
                </h1>

                <p className="hero-subtitle">
                    Premium organic produce, seeds & farming essentials — sourced directly
                    from trusted farms and delivered fresh to your doorstep.
                </p>

                <div className="hero-actions">
                    <button className="btn-primary" id="hero-shop-btn" onClick={() => scrollTo('products')}>
                        🌾 Shop Now
                    </button>
                    <button className="btn-outline" id="hero-learn-btn" onClick={() => scrollTo('features')}>
                        Learn More →
                    </button>
                </div>

                <div className="hero-stats">
                    <div className="hero-stat">
                        <div className="hero-stat-num">200+</div>
                        <div className="hero-stat-label">Products</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-num">50K+</div>
                        <div className="hero-stat-label">Customers</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-num">98%</div>
                        <div className="hero-stat-label">Satisfaction</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-num">30+</div>
                        <div className="hero-stat-label">Farm Partners</div>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-indicator">
                <div className="scroll-line" />
                Scroll
            </div>
        </section>
    );
}
