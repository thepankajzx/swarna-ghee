/* ─────────────────────────────────────────────
   Swarna Admin Portal — JavaScript Logic
   ───────────────────────────────────────────── */

let adminToken = '';
let productsData = { products: [], settings: {}, batches: [], media: {} };

// ── Auth ──────────────────────────────────────
async function doLogin() {
  const pw = document.getElementById('admin-pw').value.trim();
  if (!pw) return;
  const errEl = document.getElementById('login-error');
  errEl.style.display = 'none';
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    const data = await res.json();
    if (data.ok) {
      adminToken = data.token;
      sessionStorage.setItem('swa_admin', adminToken);
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('admin-app').style.display = 'flex';
      loadAll();
    } else {
      errEl.style.display = 'block';
    }
  } catch {
    errEl.textContent = 'Server error. Make sure the server is running.';
    errEl.style.display = 'block';
  }
}

function doLogout() {
  sessionStorage.removeItem('swa_admin');
  location.reload();
}

// Auto-login from session
window.addEventListener('DOMContentLoaded', () => {
  const saved = sessionStorage.getItem('swa_admin');
  if (saved) {
    adminToken = saved;
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').style.display = 'flex';
    loadAll();
  }
});

// ── Tab Navigation ────────────────────────────
function showTab(name) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  document.querySelectorAll('.sidebar-nav-item').forEach(b => {
    if (b.textContent.trim().toLowerCase().startsWith(name === 'settings' ? 'settings' : name === 'products' ? 'prod' : name === 'media' ? 'media' : 'lab')) {
      b.classList.add('active');
    }
  });
  // easier: match by onclick
  document.querySelectorAll('.sidebar-nav-item').forEach(b => {
    if (b.getAttribute('onclick') === `showTab('${name}')`) b.classList.add('active');
  });
}

// ── Load All Data ─────────────────────────────
async function loadAll() {
  try {
    const res = await fetch('/api/products');
    productsData = await res.json();
    renderProducts();
    renderBatches();
    loadSettings();
  } catch (e) {
    showToast('Could not load data from server', 'error');
  }
}

// ── Products ──────────────────────────────────
function renderProducts() {
  const tbody = document.getElementById('products-tbody');
  if (!productsData.products || productsData.products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#aaa;padding:24px">No products yet</td></tr>';
    return;
  }
  tbody.innerHTML = productsData.products.map((p, i) => `
    <tr>
      <td>${p.image ? `<img src="${p.image}" class="prod-img-thumb" onerror="this.style.display='none'" />` : '<div class="prod-img-placeholder"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div>'}</td>
      <td>
        <div style="font-weight:600;color:#0f172a;font-size:0.88rem">${p.title}</div>
        <div style="font-size:0.75rem;color:#94a3b8;margin-top:2px">${p.subtitle}</div>
      </td>
      <td style="font-size:0.8rem;color:#94a3b8">${p.sku}</td>
      <td style="font-weight:700;color:#0f172a">₹${p.price.toLocaleString()}</td>
      <td style="text-decoration:line-through;color:#94a3b8">₹${p.mrp.toLocaleString()}</td>
      <td>
        <span class="${p.visible !== false ? 'badge-visible' : 'badge-hidden'}" onclick="toggleVisibility(${i})" style="cursor:pointer" title="Click to toggle">
          ${p.visible !== false ? 'Visible' : 'Hidden'}
        </span>
      </td>
      <td>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm btn-ghost" onclick="editProduct(${i})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})">Remove</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function toggleVisibility(idx) {
  productsData.products[idx].visible = !productsData.products[idx].visible;
  renderProducts();
}

function editProduct(idx) {
  const p = productsData.products[idx];
  document.getElementById('modal-title').textContent = 'Edit Product';
  document.getElementById('edit-idx').value = idx;
  document.getElementById('edit-title').value = p.title;
  document.getElementById('edit-subtitle').value = p.subtitle;
  document.getElementById('edit-price').value = p.price;
  document.getElementById('edit-mrp').value = p.mrp;
  document.getElementById('edit-discount').value = p.discount || '';
  document.getElementById('edit-sku').value = p.sku;
  document.getElementById('edit-badge').value = p.badge || '';
  document.getElementById('edit-image').value = p.image;
  document.getElementById('edit-link').value = p.link;
  document.getElementById('edit-desc').value = p.description || '';
  document.getElementById('product-modal').classList.add('open');
}

function openAddProduct() {
  document.getElementById('modal-title').textContent = 'Add New Product';
  document.getElementById('edit-idx').value = '-1';
  ['title','subtitle','price','mrp','discount','sku','badge','image','link','desc'].forEach(f => {
    document.getElementById('edit-' + f).value = '';
  });
  document.getElementById('product-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('product-modal').classList.remove('open');
}

function saveProductEdit() {
  const idx = parseInt(document.getElementById('edit-idx').value);
  const p = {
    id: idx >= 0 ? productsData.products[idx].id : 'sw-' + Date.now(),
    title: document.getElementById('edit-title').value,
    subtitle: document.getElementById('edit-subtitle').value,
    price: parseInt(document.getElementById('edit-price').value) || 0,
    mrp: parseInt(document.getElementById('edit-mrp').value) || 0,
    discount: document.getElementById('edit-discount').value,
    sku: document.getElementById('edit-sku').value,
    badge: document.getElementById('edit-badge').value,
    image: document.getElementById('edit-image').value,
    link: document.getElementById('edit-link').value,
    description: document.getElementById('edit-desc').value,
    visible: true,
    rating: idx >= 0 ? (productsData.products[idx].rating || 5.0) : 5.0,
    reviews: idx >= 0 ? (productsData.products[idx].reviews || 0) : 0,
    category: idx >= 0 ? (productsData.products[idx].category || 'bilona') : 'bilona',
  };
  if (idx === -1) {
    productsData.products.push(p);
  } else {
    productsData.products[idx] = p;
  }
  renderProducts();
  closeModal();
  showToast('Product updated — click "Save All Changes" to persist');
}

function deleteProduct(idx) {
  if (!confirm('Remove this product?')) return;
  productsData.products.splice(idx, 1);
  renderProducts();
  showToast('Product removed — click "Save All Changes" to persist');
}

async function saveProducts() {
  try {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
      body: JSON.stringify({ products: productsData.products })
    });
    const d = await res.json();
    if (d.ok) showToast('Products saved successfully!', 'success');
    else showToast('Error saving products', 'error');
  } catch { showToast('Server error', 'error'); }
}

// ── Batches ───────────────────────────────────
function renderBatches() {
  const tbody = document.getElementById('admin-batches-tbody');
  const batches = productsData.batches || [];
  if (!batches.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#aaa;padding:24px;font-size:0.85rem">No batches yet. Add one above.</td></tr>';
    return;
  }
  tbody.innerHTML = batches.map((b, i) => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>${b.date}</td>
      <td>${b.size || 'All Sizes'}</td>
      <td>${b.report ? `<a href="${b.report}" target="_blank" style="color:#d4af37;font-weight:600">View PDF</a>` : '<span style="color:#aaa">Not uploaded</span>'}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteBatch(${i})">Remove</button></td>
    </tr>
  `).join('');
}

async function addBatch() {
  const id = document.getElementById('new-batch-id').value.trim();
  const date = document.getElementById('new-batch-date').value;
  const size = document.getElementById('new-batch-size').value.trim();
  const pdfInput = document.getElementById('new-batch-pdf');

  if (!id || !date) { showToast('Batch ID and date are required', 'error'); return; }

  let reportUrl = '';
  if (pdfInput.files.length > 0) {
    const formData = new FormData();
    formData.append('report', pdfInput.files[0]);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-token': adminToken },
        body: formData
      });
      const d = await res.json();
      if (d.ok && d.files[0]) reportUrl = d.files[0].url;
    } catch { showToast('PDF upload failed', 'error'); }
  }

  if (!productsData.batches) productsData.batches = [];
  productsData.batches.unshift({ id, date, size, report: reportUrl });
  renderBatches();
  document.getElementById('new-batch-id').value = '';
  document.getElementById('new-batch-date').value = '';
  document.getElementById('new-batch-size').value = '';
  pdfInput.value = '';
  showToast('Batch added — click "Save Batch Log" to persist');
}

function deleteBatch(idx) {
  if (!confirm('Remove this batch record?')) return;
  productsData.batches.splice(idx, 1);
  renderBatches();
}

async function saveBatches() {
  try {
    const res = await fetch('/api/admin/batches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
      body: JSON.stringify({ batches: productsData.batches || [] })
    });
    const d = await res.json();
    if (d.ok) showToast('Batch log saved!', 'success');
    else showToast('Error saving batches', 'error');
  } catch { showToast('Server error', 'error'); }
}

// ── Settings ──────────────────────────────────
function loadSettings() {
  const s = productsData.settings || {};
  document.getElementById('set-fssai').value = s.fssai_number || '';
  document.getElementById('set-verify-note').value = s.verify_page_note || '';
  document.getElementById('set-households').value = s.maker_households || '12+';
  document.getElementById('set-districts').value = s.maker_districts || '3';
  document.getElementById('set-method').value = s.maker_method || '100% Bilona Method';
}

async function saveSettings() {
  const settings = {
    fssai_number: document.getElementById('set-fssai').value.trim(),
    verify_page_note: document.getElementById('set-verify-note').value.trim(),
    maker_households: document.getElementById('set-households').value.trim(),
    maker_districts: document.getElementById('set-districts').value.trim(),
    maker_method: document.getElementById('set-method').value.trim(),
  };
  try {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
      body: JSON.stringify(settings)
    });
    const d = await res.json();
    if (d.ok) showToast('Settings saved!', 'success');
    else showToast('Error saving settings', 'error');
  } catch { showToast('Server error', 'error'); }
}

// ── File Upload ───────────────────────────────
async function handleUpload(input, fieldName, previewId, filenameId) {
  if (!input.files.length) return;
  const file = input.files[0];
  const progId = 'prog-' + (filenameId ? filenameId.replace('fn-', '') : fieldName);
  const progEl = document.getElementById(progId);
  const progBar = progEl ? progEl.querySelector('.upload-progress-bar') : null;

  if (progEl) { progEl.classList.add('visible'); if (progBar) progBar.style.width = '20%'; }

  const formData = new FormData();
  formData.append(fieldName, file);

  try {
    if (progBar) progBar.style.width = '60%';
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'x-admin-token': adminToken },
      body: formData
    });
    const d = await res.json();
    if (progBar) progBar.style.width = '100%';

    if (d.ok && d.files.length > 0) {
      const url = d.files[0].url;
      if (previewId) {
        const prev = document.getElementById(previewId);
        if (prev) { prev.src = url; prev.classList.add('visible'); }
      }
      if (filenameId) {
        const fn = document.getElementById(filenameId);
        if (fn) { fn.textContent = '✓ Uploaded: ' + d.files[0].filename; fn.classList.add('visible'); }
      }
      showToast('File uploaded successfully!', 'success');

      // Update media in productsData
      if (!productsData.media) productsData.media = {};
      productsData.media[fieldName] = url;
    } else {
      showToast('Upload failed', 'error');
    }
  } catch {
    showToast('Upload error. Check server.', 'error');
  }
  setTimeout(() => { if (progEl) progEl.classList.remove('visible'); }, 1500);
}

// ── Toast ─────────────────────────────────────
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  setTimeout(() => t.classList.remove('show'), 3000);
}
