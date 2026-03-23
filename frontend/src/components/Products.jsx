import { useState } from 'react';

const ALL_PRODUCTS = [
    {
        id: 1, name: 'Organic Fuji Apples', category: 'Fruits',
        price: 4.99, original: 6.99, rating: 4.8, reviews: 214,
        badge: 'organic', image: '/product-apple.png', emoji: '🍎'
    },
    {
        id: 2, name: 'Vine Ripened Tomatoes', category: 'Vegetables',
        price: 3.49, original: null, rating: 4.7, reviews: 186,
        badge: 'new', image: '/product-tomato.png', emoji: '🍅'
    },
    {
        id: 3, name: 'Baby Spinach Leaves', category: 'Vegetables',
        price: 2.99, original: 3.99, rating: 4.9, reviews: 312,
        badge: 'sale', image: '/product-spinach.png', emoji: '🥬'
    },
    {
        id: 4, name: 'Farm Fresh Carrots', category: 'Vegetables',
        price: 2.49, original: null, rating: 4.6, reviews: 97,
        badge: 'organic', image: '/product-carrot.png', emoji: '🥕'
    },
    {
        id: 5, name: 'Raw Wildflower Honey', category: 'Pantry',
        price: 12.99, original: 15.99, rating: 5.0, reviews: 423,
        badge: 'organic', image: '/product-honey.png', emoji: '🍯'
    },
    {
        id: 6, name: 'Heirloom Seed Kit', category: 'Seeds',
        price: 24.99, original: 34.99, rating: 4.8, reviews: 156,
        badge: 'sale', image: '/feature-seeds.png', emoji: '🌰'
    },
    {
        id: 7, name: 'Premium Garden Tools Set', category: 'Tools',
        price: 49.99, original: 64.99, rating: 4.7, reviews: 89,
        badge: 'new', image: '/feature-tools.png', emoji: '🪴'
    },
    {
        id: 8, name: 'Organic Compost Mix', category: 'Fertilizers',
        price: 14.99, original: null, rating: 4.5, reviews: 67,
        badge: 'organic', image: '/feature-seeds.png', emoji: '🌿'
    },
];

const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Seeds', 'Tools', 'Pantry', 'Fertilizers'];

function StarRating({ rating }) {
    return (
        <div className="stars">
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#e5e7eb' }}>★</span>
            ))}
        </div>
    );
}

export default function Products({ onAddToCart }) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [wishlist, setWishlist] = useState(new Set());

    const filtered = activeCategory === 'All'
        ? ALL_PRODUCTS
        : ALL_PRODUCTS.filter(p => p.category === activeCategory);

    const toggleWishlist = (id) => {
        setWishlist(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const badgeClass = { organic: 'badge-organic', sale: 'badge-sale', new: 'badge-new' };

    return (
        <section className="section products-section" id="products">
            <div className="section-inner">
                <div className="products-header">
                    <div>
                        <span className="section-tag">Fresh Picks</span>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>Our Best Products</h2>
                    </div>
                    <div className="categories-filter">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                                id={`cat-${cat.toLowerCase()}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="products-grid">
                    {filtered.map(product => (
                        <div className="product-card" key={product.id} id={`product-${product.id}`}>
                            <div className="product-img-wrap">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentNode.style.display = 'flex';
                                        e.target.parentNode.style.alignItems = 'center';
                                        e.target.parentNode.style.justifyContent = 'center';
                                        e.target.parentNode.style.fontSize = '64px';
                                        e.target.parentNode.textContent = product.emoji;
                                    }}
                                />
                                <span className={`product-badge ${badgeClass[product.badge]}`}>
                                    {product.badge === 'organic' ? '🌿 Organic' : product.badge === 'sale' ? '🔥 Sale' : '✨ New'}
                                </span>
                                <button
                                    className="product-wishlist"
                                    onClick={() => toggleWishlist(product.id)}
                                    aria-label="Add to wishlist"
                                    id={`wishlist-${product.id}`}
                                >
                                    {wishlist.has(product.id) ? '❤️' : '🤍'}
                                </button>
                            </div>

                            <div className="product-info">
                                <div className="product-category">{product.category}</div>
                                <div className="product-name">{product.name}</div>
                                <div className="product-rating">
                                    <StarRating rating={product.rating} />
                                    <span className="rating-count">({product.reviews})</span>
                                </div>
                                <div className="product-footer">
                                    <div className="product-price">
                                        <span className="price-current">${product.price.toFixed(2)}</span>
                                        {product.original && (
                                            <span className="price-original">${product.original.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => onAddToCart(product)}
                                        aria-label={`Add ${product.name} to cart`}
                                        id={`add-cart-${product.id}`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button className="btn-primary" style={{
                        background: 'white',
                        color: '#16a34a',
                        border: '1.5px solid #16a34a',
                        boxShadow: 'none'
                    }} id="view-all-btn">
                        View All Products →
                    </button>
                </div>
            </div>
        </section>
    );
}
