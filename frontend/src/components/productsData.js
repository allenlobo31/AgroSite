export const ALL_PRODUCTS = [
  {
    id: 1, name: 'Organic Fuji Apples', category: 'Fruits',
    price: 4.99, original: 6.99, rating: 4.8, reviews: 214,
    badge: 'organic', image: '/product-apple.png',
  },
  {
    id: 2, name: 'Vine Ripened Tomatoes', category: 'Vegetables',
    price: 3.49, original: null, rating: 4.7, reviews: 186,
    badge: 'new', image: '/product-tomato.png',
  },
  {
    id: 3, name: 'Baby Spinach Leaves', category: 'Vegetables',
    price: 2.99, original: 3.99, rating: 4.9, reviews: 312,
    badge: 'sale', image: '/product-spinach.png',
  },
  {
    id: 4, name: 'Farm Fresh Carrots', category: 'Vegetables',
    price: 2.49, original: null, rating: 4.6, reviews: 97,
    badge: 'organic', image: '/product-carrot.png',
  },
  {
    id: 5, name: 'Raw Wildflower Honey', category: 'Pantry',
    price: 12.99, original: 15.99, rating: 5.0, reviews: 423,
    badge: 'organic', image: '/product-honey.png',
  },
  {
    id: 6, name: 'Heirloom Seed Kit', category: 'Seeds',
    price: 24.99, original: 34.99, rating: 4.8, reviews: 156,
    badge: 'sale', image: '/feature-seeds.png',
  },
  {
    id: 7, name: 'Premium Garden Tools Set', category: 'Tools',
    price: 49.99, original: 64.99, rating: 4.7, reviews: 89,
    badge: 'new', image: '/feature-tools.png',
  },
  {
    id: 8, name: 'Organic Compost Mix', category: 'Fertilizers',
    price: 14.99, original: null, rating: 4.5, reviews: 67,
    badge: 'organic', image: '/feature-seeds.png',
  },
];

export const PRODUCT_CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Seeds', 'Tools', 'Pantry', 'Fertilizers'];

export const PRODUCT_FORM_CATEGORIES = ['Fruits', 'Vegetables', 'Seeds', 'Tools', 'Pantry', 'Fertilizers'];

export const NON_FOOD_CATEGORIES = ['Seeds', 'Tools', 'Fertilizers'];

export const PRODUCT_BADGE_LABELS = {
  organic: 'Organic',
  sale: 'Sale',
  new: 'New',
};

export const PRODUCT_BADGE_STYLES = {
  organic: { label: 'Organic', bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
  sale: { label: 'Sale', bg: '#fef3c7', color: '#92400e', border: '#fde68a' },
  new: { label: 'New', bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe' },
};

export const PRODUCT_DETAILS = {
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
    description: 'Sourced from free-range beehives in unpolluted wildflower meadows, this raw honey is unfiltered and unheated - preserving all its natural enzymes, antioxidants, and floral complexity.',
    highlights: ['Raw & unfiltered', 'No added sugar or preservatives', 'Antibacterial properties', 'Cold-extracted to retain enzymes'],
    nutrition: { calories: 64, carbs: '17g', fibre: '0g', sugar: '17g', protein: '0g', vitC: '0%' },
    origin: 'Coorg, Karnataka',
    weight: '500g jar',
    shelf: '24 months (sealed)',
    stock: 22,
  },
  6: {
    description: 'A curated collection of heirloom, non-GMO seeds for the serious home gardener. Includes 12 varieties of vegetables, herbs, and flowers - all open-pollinated for seed saving year after year.',
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

export const PRODUCT_REVIEW_DISTRIBUTION = [
  { star: 5, percent: 72 },
  { star: 4, percent: 18 },
  { star: 3, percent: 7 },
  { star: 2, percent: 2 },
  { star: 1, percent: 1 },
];

export const PRODUCT_SAMPLE_REVIEWS = [
  {
    name: 'Priya S.',
    stars: 5,
    date: 'Mar 18, 2024',
    text: 'Absolutely love the quality! The {productName} were super fresh and exactly as described. Will definitely order again.',
  },
  {
    name: 'Rahul M.',
    stars: 4,
    date: 'Mar 10, 2024',
    text: 'Great product overall. Came well-packaged and arrived on time. Slight delay on delivery but the quality made up for it.',
  },
  {
    name: 'Ananya K.',
    stars: 5,
    date: 'Feb 28, 2024',
    text: 'Best quality I\'ve found online. The farm-fresh difference is noticeable compared to supermarket produce.',
  },
];

export const ADMIN_SEED_PRODUCTS = [
  { id: 1, name: 'Tomatoes', price: 50, stock: 100, category: 'Vegetables' },
  { id: 2, name: 'Potatoes', price: 30, stock: 250, category: 'Vegetables' },
  { id: 3, name: 'Carrots', price: 40, stock: 150, category: 'Vegetables' },
  { id: 4, name: 'Apples', price: 80, stock: 200, category: 'Fruits' },
];

export const INITIAL_ADMIN_ORDERS = [
  {
    id: 101,
    customer: 'John Doe',
    items: ['Tomatoes', 'Potatoes'],
    total: 150,
    status: 'pending',
    date: '2026-03-26',
    phone: '9876543210',
    address: 'Lakeview Road, Pune',
  },
  {
    id: 102,
    customer: 'Jane Smith',
    items: ['Carrots', 'Apples'],
    total: 240,
    status: 'pending',
    date: '2026-03-26',
    phone: '9123456780',
    address: 'Sunrise Colony, Mumbai',
  },
  {
    id: 103,
    customer: 'Bob Johnson',
    items: ['Tomatoes'],
    total: 50,
    status: 'accepted',
    date: '2026-03-25',
    phone: '9988776655',
    address: 'Hill Park Street, Nashik',
  },
];

export const PROFILE_MOCK_ORDERS = [
  {
    id: 'ORD-AGRO-001',
    date: 'Mar 21, 2026',
    status: 'Delivered',
    total: 3496,
    items: [
      { name: 'Organic Fuji Apples', qty: 2, price: 499 },
      { name: 'Raw Wildflower Honey', qty: 1, price: 1299 },
      { name: 'Baby Spinach Leaves', qty: 4, price: 425 },
    ],
  },
  {
    id: 'ORD-AGRO-002',
    date: 'Mar 14, 2026',
    status: 'Delivered',
    total: 5247,
    items: [
      { name: 'Heirloom Seed Kit', qty: 1, price: 2499 },
      { name: 'Farm Fresh Carrots', qty: 3, price: 749 },
      { name: 'Vine Ripened Tomatoes', qty: 5, price: 399 },
    ],
  },
  {
    id: 'ORD-AGRO-003',
    date: 'Mar 08, 2026',
    status: 'Processing',
    total: 6498,
    items: [
      { name: 'Premium Garden Tools Set', qty: 1, price: 4999 },
      { name: 'Organic Compost Mix', qty: 1, price: 1499 },
    ],
  },
];

// Database seed content aligned with backend Product schema.
// Fields: name, category, price, stock, image, badge
export const DATABASE_SEED_PRODUCTS = [
  {
    name: 'Organic Fuji Apples',
    category: 'Fruits',
    price: 4.99,
    stock: 48,
    image: '/product-apple.png',
    badge: 'organic',
  },
  {
    name: 'Vine Ripened Tomatoes',
    category: 'Vegetables',
    price: 3.49,
    stock: 72,
    image: '/product-tomato.png',
    badge: 'new',
  },
  {
    name: 'Baby Spinach Leaves',
    category: 'Vegetables',
    price: 2.99,
    stock: 34,
    image: '/product-spinach.png',
    badge: 'sale',
  },
  {
    name: 'Farm Fresh Carrots',
    category: 'Vegetables',
    price: 2.49,
    stock: 60,
    image: '/product-carrot.png',
    badge: 'organic',
  },
  {
    name: 'Raw Wildflower Honey',
    category: 'Pantry',
    price: 12.99,
    stock: 22,
    image: '/product-honey.png',
    badge: 'organic',
  },
  {
    name: 'Heirloom Seed Kit',
    category: 'Seeds',
    price: 24.99,
    stock: 15,
    image: '/feature-seeds.png',
    badge: 'sale',
  },
  {
    name: 'Premium Garden Tools Set',
    category: 'Tools',
    price: 49.99,
    stock: 8,
    image: '/feature-tools.png',
    badge: 'new',
  },
  {
    name: 'Organic Compost Mix',
    category: 'Fertilizers',
    price: 14.99,
    stock: 29,
    image: '/feature-seeds.png',
    badge: 'organic',
  },
];

// Helper if you want to generate DB seed payload from catalog data dynamically.
export function buildDatabaseSeedProducts() {
  return ALL_PRODUCTS.map((product) => ({
    name: product.name,
    category: product.category,
    price: Number(product.price || 0),
    stock: Number(PRODUCT_DETAILS?.[product.id]?.stock || 0),
    image: product.image || '',
    badge: product.badge || '',
  }));
}
