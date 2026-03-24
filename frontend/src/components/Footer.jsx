const LINKS = {
    Shop: ['Fresh Produce', 'Organic Seeds', 'Garden Tools', 'Fertilizers', 'Honey & Pantry'],
    Company: ['About Us', 'Our Farms', 'Sustainability', 'Press', 'Careers'],
    Support: ['Help Center', 'Shipping Info', 'Returns', 'Track Order', 'Contact Us'],
};

const SOCIALS = ['🐦', '📸', '📘', '▶️'];
const SOCIAL_LABELS = ['Twitter', 'Instagram', 'Facebook', 'YouTube'];

export default function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="footer-inner">
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 38, height: 38,
                                background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                                borderRadius: 10,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 18, boxShadow: '0 4px 15px rgba(34,197,94,0.3)'
                            }}>🌿</div>
                            <span style={{
                                fontFamily: 'Playfair Display, serif',
                                fontWeight: 700, fontSize: 22,
                                color: 'white', letterSpacing: '-0.5px'
                            }}>
                                Agro<span style={{ color: '#4ade80' }}>Site</span>
                            </span>
                        </div>
                        <p>
                            Your trusted source for premium organic produce, seeds, and farming
                            essentials. Bringing nature's best directly to your home since 2020.
                        </p>
                        <div className="footer-socials">
                            {SOCIALS.map((icon, i) => (
                                <a key={i} href="#" className="social-btn" aria-label={SOCIAL_LABELS[i]}>
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(LINKS).map(([heading, items]) => (
                        <div className="footer-col" key={heading}>
                            <h4>{heading}</h4>
                            <ul>
                                {items.map(item => (
                                    <li key={item}><a href="#" onClick={e => e.preventDefault()}>{item}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


                <div className="footer-bottom">
                    <p>© 2024 AgroSite. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                            <a key={l} href="#" onClick={e => e.preventDefault()}>{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
