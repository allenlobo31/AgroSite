const ADMIN_EMAIL = 'admin@agrosite';

function getUserFromHeaders(req) {
  const emailHeader = req.headers['x-user-email'];
  const roleHeader = req.headers['x-user-role'];
  const nameHeader = req.headers['x-user-name'];

  if (!emailHeader) return null;

  const email = String(emailHeader).trim().toLowerCase();
  const requestedRole = String(roleHeader || 'user').trim().toLowerCase();
  const isAdmin = requestedRole === 'admin' || email === ADMIN_EMAIL;

  return {
    email,
    name: String(nameHeader || '').trim(),
    role: isAdmin ? 'admin' : 'user',
  };
}

function requireAuth(req, res, next) {
  const user = getUserFromHeaders(req);

  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  req.user = user;
  return next();
}

function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  return next();
}

module.exports = {
  requireAuth,
  requireAdmin,
};
