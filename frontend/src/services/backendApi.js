const API_BASE_URL = (import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5002/api').replace(/\/$/, '');
const API_FALLBACK_URLS = ['http://localhost:5001/api', 'http://localhost:5002/api'];

let preferredApiBaseUrl = API_BASE_URL;

function getApiBaseCandidates() {
  return [preferredApiBaseUrl, API_BASE_URL, ...API_FALLBACK_URLS]
    .map((url) => String(url || '').replace(/\/$/, ''))
    .filter(Boolean)
    .filter((url, index, arr) => arr.indexOf(url) === index);
}

async function request(path, options = {}) {
  const candidates = getApiBaseCandidates();
  let lastError;
  const { headers: customHeaders = {}, ...restOptions } = options;

  for (const baseUrl of candidates) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        ...restOptions,
        headers: {
          'Content-Type': 'application/json',
          ...customHeaders,
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = data && typeof data === 'object' ? data.error : '';
        throw new Error(message || `Request failed: ${response.status}`);
      }

      preferredApiBaseUrl = baseUrl;
      return data || {};
    } catch (error) {
      // Retry on connectivity issues; surface API errors immediately.
      const isNetworkError = error instanceof TypeError;
      if (!isNetworkError) {
        throw error;
      }
      lastError = error;
    }
  }

  throw lastError || new Error('Failed to connect to backend API');
}

function buildAuthHeaders(user) {
  if (!user?.email) return {};

  return {
    'x-user-email': String(user.email),
    'x-user-name': String(user.name || ''),
    'x-user-role': String(user.role || 'user'),
  };
}

function normalizeProduct(product) {
  return {
    ...product,
    id: String(product.id || product._id || ''),
    price: Number(product.price || 0),
    stock: Number(product.stock || 0),
    original: product.original != null ? Number(product.original) : null,
    rating: Number(product.rating || 4.5),
    reviews: Number(product.reviews || 0),
    badge: product.badge || 'new',
    image: product.image || '/product-apple.png',
  };
}

export async function fetchProducts() {
  const data = await request('/products', { method: 'GET' });
  return Array.isArray(data.products) ? data.products.map(normalizeProduct) : [];
}

export async function createProduct(product, user) {
  const data = await request('/products', {
    method: 'POST',
    headers: buildAuthHeaders(user),
    body: JSON.stringify(product),
  });
  return normalizeProduct(data);
}

export async function updateProduct(productId, product, user) {
  const data = await request(`/products/${productId}`, {
    method: 'PATCH',
    headers: buildAuthHeaders(user),
    body: JSON.stringify(product),
  });
  return normalizeProduct(data);
}

export async function deleteProduct(productId, user) {
  return request(`/products/${productId}`, {
    method: 'DELETE',
    headers: buildAuthHeaders(user),
  });
}

function normalizeOrder(order) {
  return {
    ...order,
    id: String(order.id || order._id || ''),
    subtotal: Number(order.subtotal || 0),
    total: Number(order.total || 0),
    items: Array.isArray(order.items) ? order.items : [],
    status: order.status || 'pending',
    date: order.date || new Date().toISOString().slice(0, 10),
  };
}

export async function placeOrder(payload, user) {
  const data = await request('/orders', {
    method: 'POST',
    headers: buildAuthHeaders(user),
    body: JSON.stringify(payload),
  });
  return normalizeOrder(data);
}

export async function fetchOrders({ user, email = '' } = {}) {
  const query = email ? `?email=${encodeURIComponent(email)}` : '';
  const data = await request(`/orders${query}`, {
    method: 'GET',
    headers: buildAuthHeaders(user),
  });
  return Array.isArray(data.orders) ? data.orders.map(normalizeOrder) : [];
}

export async function updateOrderStatus(orderId, status, user) {
  const data = await request(`/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: buildAuthHeaders(user),
    body: JSON.stringify({ status }),
  });
  return normalizeOrder(data);
}

export async function signupUser(payload) {
  const data = await request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.user;
}

export async function loginUser(payload) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.user;
}
