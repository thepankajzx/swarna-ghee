const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ─── Admin Config ──────────────────────────────────────────────────
const ADMIN_PASSWORD = 'swarna@2024'; // Change this to your own password
const ADMIN_TOKEN = Buffer.from(ADMIN_PASSWORD).toString('base64');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// ─── MIME Types ───────────────────────────────────────────────────
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
};

// ─── Parse multipart form data (no external deps) ─────────────────
function parseMultipart(body, boundary) {
  const parts = [];
  const boundaryBuf = Buffer.from('--' + boundary);
  let start = 0;

  while (start < body.length) {
    const boundaryStart = indexOf(body, boundaryBuf, start);
    if (boundaryStart === -1) break;
    const headerStart = boundaryStart + boundaryBuf.length + 2; // skip \r\n
    const headerEnd = indexOf(body, Buffer.from('\r\n\r\n'), headerStart);
    if (headerEnd === -1) break;

    const headerStr = body.slice(headerStart, headerEnd).toString();
    const nextBoundary = indexOf(body, boundaryBuf, headerEnd);
    const dataEnd = nextBoundary === -1 ? body.length : nextBoundary - 2; // trim \r\n
    const data = body.slice(headerEnd + 4, dataEnd);

    // Parse headers
    const headers = {};
    headerStr.split('\r\n').forEach(line => {
      const [key, ...vals] = line.split(':');
      if (key) headers[key.trim().toLowerCase()] = vals.join(':').trim();
    });

    const disposition = headers['content-disposition'] || '';
    const nameMatch = disposition.match(/name="([^"]+)"/);
    const filenameMatch = disposition.match(/filename="([^"]+)"/);
    parts.push({
      name: nameMatch ? nameMatch[1] : null,
      filename: filenameMatch ? filenameMatch[1] : null,
      contentType: headers['content-type'] || 'text/plain',
      data,
    });

    start = nextBoundary === -1 ? body.length : nextBoundary;
  }
  return parts;
}

function indexOf(buf, search, start = 0) {
  for (let i = start; i <= buf.length - search.length; i++) {
    let found = true;
    for (let j = 0; j < search.length; j++) {
      if (buf[i + j] !== search[j]) { found = false; break; }
    }
    if (found) return i;
  }
  return -1;
}

// ─── Auth check ───────────────────────────────────────────────────
function isAuthorized(req) {
  const auth = req.headers['x-admin-token'];
  return auth === ADMIN_TOKEN;
}

function sendJSON(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
}

// ─── Collect request body ─────────────────────────────────────────
function collectBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

// ─── Main Server ──────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const method = req.method.toUpperCase();
  let reqPath = req.url.split('?')[0];

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE', 'Access-Control-Allow-Headers': 'Content-Type,x-admin-token' });
    return res.end();
  }

  // ── Admin API Routes ─────────────────────────────────────────────

  // Auth check
  if (reqPath === '/api/admin/login' && method === 'POST') {
    const body = await collectBody(req);
    const { password } = JSON.parse(body.toString());
    if (password === ADMIN_PASSWORD) {
      return sendJSON(res, { token: ADMIN_TOKEN, ok: true });
    }
    return sendJSON(res, { ok: false, error: 'Wrong password' }, 401);
  }

  // Get products
  if (reqPath === '/api/products' && method === 'GET') {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return sendJSON(res, JSON.parse(data));
  }

  // Save products (admin)
  if (reqPath === '/api/admin/products' && method === 'POST') {
    if (!isAuthorized(req)) return sendJSON(res, { error: 'Unauthorized' }, 401);
    const body = await collectBody(req);
    const current = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    const updates = JSON.parse(body.toString());
    current.products = updates.products;
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(current, null, 2));
    return sendJSON(res, { ok: true });
  }

  // Save settings (fssai, maker stats)
  if (reqPath === '/api/admin/settings' && method === 'POST') {
    if (!isAuthorized(req)) return sendJSON(res, { error: 'Unauthorized' }, 401);
    const body = await collectBody(req);
    const current = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    const updates = JSON.parse(body.toString());
    current.settings = { ...current.settings, ...updates };
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(current, null, 2));
    return sendJSON(res, { ok: true });
  }

  // Save batches
  if (reqPath === '/api/admin/batches' && method === 'POST') {
    if (!isAuthorized(req)) return sendJSON(res, { error: 'Unauthorized' }, 401);
    const body = await collectBody(req);
    const current = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    const updates = JSON.parse(body.toString());
    current.batches = updates.batches;
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(current, null, 2));
    return sendJSON(res, { ok: true });
  }

  // Upload file (image, video, PDF)
  if (reqPath === '/api/admin/upload' && method === 'POST') {
    if (!isAuthorized(req)) return sendJSON(res, { error: 'Unauthorized' }, 401);
    const contentType = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=(.+)/);
    if (!boundaryMatch) return sendJSON(res, { error: 'No boundary' }, 400);

    const body = await collectBody(req);
    const parts = parseMultipart(body, boundaryMatch[1]);
    const results = [];

    for (const part of parts) {
      if (part.filename) {
        const ext = path.extname(part.filename).toLowerCase();
        const safeName = Date.now() + '_' + part.filename.replace(/[^a-z0-9._-]/gi, '_');
        const filePath = path.join(UPLOADS_DIR, safeName);
        fs.writeFileSync(filePath, part.data);
        results.push({ name: part.name, filename: safeName, url: '/uploads/' + safeName });

        // Save media reference to products.json
        if (part.name === 'himalayan_image' || part.name === 'makers_video' || part.name === 'process_video') {
          const current = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
          if (!current.media) current.media = {};
          current.media[part.name] = '/uploads/' + safeName;
          fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(current, null, 2));
        }
      }
    }
    return sendJSON(res, { ok: true, files: results });
  }

  // Delete batch PDF
  if (reqPath.startsWith('/api/admin/batch-delete/') && method === 'DELETE') {
    if (!isAuthorized(req)) return sendJSON(res, { error: 'Unauthorized' }, 401);
    const batchId = reqPath.split('/').pop();
    const current = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    current.batches = (current.batches || []).filter(b => b.id !== batchId);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(current, null, 2));
    return sendJSON(res, { ok: true });
  }

  // ── Static File Serving ──────────────────────────────────────────
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  // Serve uploads folder
  if (reqPath.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, reqPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
      return fs.createReadStream(filePath).pipe(res);
    }
    res.writeHead(404); return res.end('Not found');
  }

  const filePath = path.join(PUBLIC_DIR, reqPath);
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Swarna Server running at http://localhost:${PORT}/`);
  console.log(`📱 LAN access: http://10.206.252.79:${PORT}/`);
  console.log(`🔐 Admin panel: http://localhost:${PORT}/admin.html`);
});
