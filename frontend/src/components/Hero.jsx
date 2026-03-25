

export default function Hero() {
    return (
        <section id="hero" style={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* ── Background image ── */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: "url('/hero-bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
            }} />

            {/* ── Dark green tinted overlay ── */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(5,46,22,0.92) 0%, rgba(10,40,20,0.82) 60%, rgba(22,163,74,0.35) 100%)',
                zIndex: 1,
            }} />




            {/* ── Main content ── */}
            <div style={{
                position: 'relative', zIndex: 2,
                flex: 1,
                maxWidth: 1280,
                margin: '0 auto',
                width: '100%',
                padding: '0 2.5rem',
                paddingTop: 70,
                display: 'flex',
                alignItems: 'center',
                gap: '3rem',
                minHeight: 'calc(100vh - 160px)',
            }}>

                {/* ── LEFT: Text ── */}
                <div style={{ flex: '0 0 48%', maxWidth: 520 }}>

                    
                    {/* Headline */}
                    <h1 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(42px, 5.5vw, 72px)',
                        fontWeight: 700,
                        color: 'white',
                        lineHeight: 1.08,
                        letterSpacing: '-2px',
                        marginBottom: '1.25rem',
                        animation: 'fadeInUp 0.7s 0.1s ease both',
                    }}>
                        Taste the Best<br />
                        <span style={{ color: '#4ade80' }}>that Grows Fresh</span>
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        fontSize: 15, color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.75, maxWidth: 420,
                        marginBottom: '1.75rem',
                        animation: 'fadeInUp 0.7s 0.2s ease both',
                    }}>
                        Premium organic produce, seeds &amp; farming essentials  sourced
                        directly from certified farms and delivered fresh to your doorstep.
                    </p>




                </div>

                {/* ── RIGHT: Featured product image ── */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeInUp 0.9s 0.15s ease both',
                }}>
                    <div style={{ position: 'relative', width: 'min(460px, 45vw)', aspectRatio: '1' }}>

                        {/* Glow ring */}
                        <div style={{
                            position: 'absolute', inset: -20,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)',
                            animation: 'glowPulse 3s ease-in-out infinite',
                        }} />

                        {/* Outer glass ring */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            borderRadius: '50%',
                            border: '2px solid rgba(34,197,94,0.25)',
                            backdropFilter: 'blur(2px)',
                        }} />

                        {/* Main circular image */}
                        <div style={{
                            width: '100%', height: '100%',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '5px solid rgba(255,255,255,0.12)',
                            boxShadow: '0 30px 90px rgba(0,0,0,0.45), 0 0 0 1px rgba(34,197,94,0.15)',
                            position: 'relative',
                        }}>
                            <img
                                src="/products-banner.png"
                                alt="Fresh organic produce"
                                style={{
                                    width: '100%', height: '100%',
                                    objectFit: 'cover',
                                    transform: 'scale(1.05)',
                                }}
                            />
                            {/* Inner gradient overlay */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'radial-gradient(circle at 30% 70%, rgba(5,46,22,0.3) 0%, transparent 60%)',
                            }} />
                        </div>

                        {/* Floating badge — top right */}
                        <div style={{
                            position: 'absolute', top: '8%', right: '-8%',
                            background: 'rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: 14, padding: '10px 14px',
                            display: 'flex', alignItems: 'center', gap: 8,
                            animation: 'floatBadge 4s ease-in-out infinite',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'white', lineHeight: 1.2 }}>100% Original</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>Certified</div>
                            </div>
                        </div>

                        {/* Floating badge — bottom left */}
                        <div style={{
                            position: 'absolute', bottom: '10%', left: '-10%',
                            background: 'rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: 14, padding: '10px 14px',
                            display: 'flex', alignItems: 'center', gap: 8,
                            animation: 'floatBadge 4s ease-in-out infinite 1.5s',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'white', lineHeight: 1.2 }}>4.9 Rating</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>50K+ happy customers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* ── Keyframes injected via style tag ── */}
            <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes leafFloat {
          0%, 100% { transform: rotate(-30deg) translateY(0); }
          50% { transform: rotate(-25deg) translateY(-15px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }

        @media (max-width: 900px) {
          #hero [style*="flex: 0 0 48%"] { flex: 1 1 100% !important; max-width: 100% !important; }
          #hero [style*="flex: 1"][style*="justifyContent: center"] { display: none !important; }
          #hero [style*="gridTemplateColumns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 480px) {
          #hero [style*="gridTemplateColumns: repeat(4"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
