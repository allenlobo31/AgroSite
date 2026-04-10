import { useState } from 'react';
import { ALL_PRODUCTS, PRODUCT_BADGE_LABELS, PRODUCT_CATEGORIES } from './productsData';

// Badge class mapping (outside component for optimization)
const BADGE_CLASS = { organic: 'badge-organic', sale: 'badge-sale', new: 'badge-new' };
const STAR_ARRAY = [1, 2, 3, 4, 5]; // Reuse to avoid recreation on every render

function StarRating({ rating }) {
    return (
        <div className="stars">
            {STAR_ARRAY.map(i => (
                <span key={i} style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#e5e7eb' }}>★</span>
            ))}
        </div>
    );
}

export default function Products({ products, onAddToCart, onProductClick, onViewAll }) {
    const [activeCategory, setActiveCategory] = useState('All');

    const productList = products || ALL_PRODUCTS;

    const filtered = activeCategory === 'All'
        ? productList
        : productList.filter(p => p.category === activeCategory);

    return (
        <section className="section products-section" id="products">
            <div className="section-inner">
                <div className="products-header">
                    <div>
                        <span className="section-tag">Fresh Picks</span>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>Our Best Products</h2>
                    </div>
                    <div className="categories-filter">
                        {PRODUCT_CATEGORIES.map(cat => (
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
                        <div
                            className="product-card"
                            key={product.id}
                            id={`product-${product.id}`}
                            onClick={() => onProductClick(product.id)}
                            style={{ cursor: 'pointer' }}
                        >
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
                                <span className={`product-badge ${BADGE_CLASS[product.badge]}`}>
                                    {PRODUCT_BADGE_LABELS[product.badge] || product.badge}
                                </span>

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
                                        <span className="price-current">₹{product.price.toFixed(2)}</span>
                                        {product.original && (
                                            <span className="price-original">₹{product.original.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
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
                    }} id="view-all-btn" onClick={onViewAll}>
                        View All Products →
                    </button>
                </div>
            </div>
        </section>
    );
}
