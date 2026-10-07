const root = document.getElementById('adminRoot');
const loginView = document.getElementById('loginView');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const dashboardMount = document.getElementById('dashboardMount');
const toastElement = document.getElementById('adminToast');
const ORDER_STATES = ['Order Received', 'Confirmed', 'Processing', 'Preparing', 'Shipped', 'Delivered', 'Cancelled'];
const state = { content: null, published: null, orders: [], section: 'Dashboard', editingId: null, saving: false };

const clone = (value) => JSON.parse(JSON.stringify(value));
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const formatPrice = (value) => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(Number(value) || 0);

function notify(message) {
  toastElement.textContent = message;
  toastElement.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toastElement.classList.remove('show'), 3200);
}

async function api(url, options = {}) {
  const response = await fetch(url, { credentials: 'same-origin', ...options, headers: { ...(options.body ? { 'content-type': 'application/json' } : {}), ...(options.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status}).`);
  return data;
}

function setLoginError(message) {
  loginError.textContent = message;
  loginError.hidden = !message;
}

function markDirty() {
  sessionStorage.setItem('adeel-admin-draft', JSON.stringify(state.content));
  const status = document.getElementById('changeStatus');
  if (status) status.textContent = 'Changes Not Published';
}

function dashboardShell() {
  loginView.hidden = true;
  dashboardMount.innerHTML = `
    <div class="admin-layout">
      <aside class="sidebar">
        <div class="sidebar-brand"><img src="adeel-art-logo.svg" alt="ADEEL ART" /></div>
        <div class="sidebar-label">Workspace</div>
        <nav class="nav-list" id="adminNav">
          ${['Dashboard','Products','Add Product','Stock Management','Orders','Payment Settings','Website Settings','About Artist','FAQ','Security'].map((item, index) => `<button class="nav-item ${item === state.section ? 'active' : ''}" data-section="${item}"><span class="nav-icon">${['▦','▤','＋','◉','▧','¤','⚙','✎','?','⌑'][index]}</span>${item}</button>`).join('')}
        </nav>
        <div class="sidebar-bottom"><button class="button" data-action="preview">Preview Changes</button><button class="button primary" data-action="publish">Publish Changes</button><button class="button" data-action="logout">Logout</button></div>
      </aside>
      <section class="main-column">
        <header class="topbar"><h1 id="topTitle">${escapeHtml(state.section)}</h1><div class="topbar-actions"><span class="status-pill"><i class="status-dot"></i><span id="changeStatus">Changes Saved</span></span><button class="button" data-action="preview">Preview</button><button class="button primary" data-action="publish">Publish</button><button class="button" data-action="logout">Logout</button></div></header>
        <main class="content" id="adminContent"></main>
      </section>
    </div>`;
  dashboardMount.hidden = false;
  const changeStatus = document.getElementById('changeStatus');
  if (changeStatus && sessionStorage.getItem('adeel-admin-draft')) changeStatus.textContent = 'Changes Not Published';
  renderSection();
}

function renderDashboard() {
  const products = state.content.products;
  const inStock = products.filter((product) => product.availability !== 'Out of Stock').length;
  const outOfStock = products.length - inStock;
  const pending = state.orders.filter((order) => !['Delivered', 'Cancelled'].includes(order.status)).length;
  const completed = state.orders.filter((order) => order.status === 'Delivered').length;
  return `<div class="page-heading"><div><span class="eyebrow">Store overview</span><h2>Dashboard</h2><p>Catalog and order activity at a glance.</p></div><span class="help">Last published: ${escapeHtml(state.published?.publishedAt ? new Date(state.published.publishedAt).toLocaleString() : 'Not published yet')}</span></div>
    <div class="stats-grid">${[['Total Products',products.length],['In Stock',inStock],['Out of Stock',outOfStock],['Total Orders',state.orders.length],['Pending Orders',pending],['Completed Orders',completed]].map(([label,value]) => `<article class="panel stat-card"><span>${label}</span><strong data-count="${value}">0</strong></article>`).join('')}</div>
    <div class="publish-banner panel"><div><strong>Current catalog: ${products.length} products</strong><p>Pending changes are drafts until you preview and publish.</p></div><div class="row-actions"><button class="button" data-action="preview">Preview Changes</button><button class="button primary" data-action="publish">Publish Changes</button></div></div>
    <div class="two-col"><section class="panel panel-pad"><div class="panel-title">Recent Products</div><div class="product-list">${products.slice(0,5).map(productRow).join('')}</div></section><section class="panel panel-pad"><div class="panel-title">Latest Orders</div>${state.orders.length ? `<div class="product-list">${state.orders.slice(-5).reverse().map(order => `<div class="product-row"><div><strong>#${order.orderNumber}</strong></div><div><h3>${escapeHtml(order.customerName)}</h3><p>${escapeHtml(order.status)} · ${formatPrice(order.total)}</p></div></div>`).join('')}</div>` : '<div class="empty-note">No orders have been received.</div>'}</section></div>`;
}

function productRow(product) {
  const stockClass = product.availability === 'Out of Stock' ? 'stock out' : 'stock';
  return `<article class="product-row"><img src="${escapeHtml(product.imageUrls?.[0] || '')}" alt="" /><div><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.category)} · <s>${formatPrice(product.originalPrice)}</s> ${formatPrice(product.salePrice)} · ${escapeHtml(product.paymentAvailability || 'Both Available')} <span class="${stockClass}">${escapeHtml(product.availability || 'In Stock')}</span></p></div><div class="row-actions"><button class="button" data-action="edit-product" data-id="${escapeHtml(product.id)}">Edit</button><button class="button" data-action="stock-toggle" data-id="${escapeHtml(product.id)}">${product.availability === 'Out of Stock' ? 'Restock' : 'Out of stock'}</button><button class="button danger" data-action="delete-product" data-id="${escapeHtml(product.id)}">Delete</button></div></article>`;
}

function renderProducts(stockOnly = false) {
  const products = state.content.products;
  return `<div class="page-heading"><div><span class="eyebrow">Catalog</span><h2>${stockOnly ? 'Stock Management' : 'Products'}</h2><p>${products.length} ${stockOnly ? 'inventory items' : 'products'} · edits remain drafts until published.</p></div><button class="button primary" data-section="Add Product">Add Product</button></div>
    <div class="toolbar"><input id="productSearch" type="search" placeholder="Search products" /><select id="productCategoryFilter"><option value="all">All categories</option>${state.content.categories.map(category => `<option>${escapeHtml(category)}</option>`).join('')}</select>${stockOnly ? '<select id="stockFilter"><option value="all">All stock states</option><option>In Stock</option><option>Out of Stock</option></select>' : ''}</div>
    <div class="panel panel-pad"><div class="product-list" id="managedProducts">${products.length ? products.map(productRow).join('') : '<div class="empty-note">No products in this view.</div>'}</div></div>`;
}

function productForm(product = null) {
  const current = product || { id: '', name: '', category: state.content.categories[0] || '', description: '', imageUrls: [], imageAdjustments: [], originalPrice: '', salePrice: '', availability: 'In Stock', paymentAvailability: 'Both Available', featured: false };
  const imageFields = [0,1,2].map(index => {
    const adjustment = current.imageAdjustments?.[index] || { x: 50, y: 50, zoom: 1 };
    const focusX = Math.max(0, Math.min(100, Number(adjustment.x) || 50));
    const focusY = Math.max(0, Math.min(100, Number(adjustment.y) || 50));
    const zoom = Math.max(1, Math.min(2.5, Number(adjustment.zoom) || 1));
    return `<div class="field"><label for="image${index}">Image URL ${index + 1}</label><input id="image${index}" name="image${index}" type="url" value="${escapeHtml(current.imageUrls[index] || '')}" placeholder="https://..." data-image-input="${index}" /><div class="image-preview" data-image-preview="${index}" data-focus-x="${focusX}" data-focus-y="${focusY}" data-zoom="${zoom}">Paste an image URL to preview</div></div>`;
  }).join('');
  return `<div class="page-heading"><div><span class="eyebrow">${product ? 'Edit product' : 'New listing'}</span><h2>${product ? 'Edit Product' : 'Add Product'}</h2><p>Products are published from the versioned static catalog.</p></div></div>
    <form class="panel panel-pad" id="productForm" data-id="${escapeHtml(current.id)}">
      <div class="form-grid">
        <div class="field"><label for="productName">Product Name</label><input id="productName" name="name" required value="${escapeHtml(current.name)}" /></div>
        <div class="field"><label for="productCategory">Category</label><select id="productCategory" name="category">${state.content.categories.map(category => `<option ${current.category === category ? 'selected' : ''}>${escapeHtml(category)}</option>`).join('')}</select></div>
        <div class="field"><label for="originalPrice">Original Price (PKR)</label><input id="originalPrice" name="originalPrice" type="number" min="0" required value="${escapeHtml(current.originalPrice)}" /></div>
        <div class="field"><label for="salePrice">Sale Price (PKR)</label><input id="salePrice" name="salePrice" type="number" min="0" required value="${escapeHtml(current.salePrice)}" /></div>
        <div class="field"><label for="availability">Stock Status</label><select id="availability" name="availability"><option ${current.availability !== 'Out of Stock' ? 'selected' : ''}>In Stock</option><option ${current.availability === 'Out of Stock' ? 'selected' : ''}>Out of Stock</option></select></div>
        <div class="field"><label for="paymentAvailability">Payment Availability</label><select id="paymentAvailability" name="paymentAvailability">${['Both Available','COD Available','Online Payment Available'].map(value => `<option ${current.paymentAvailability === value ? 'selected' : ''}>${value}</option>`).join('')}</select></div>
        <div class="field full-width"><label for="productDescription">Description</label><textarea id="productDescription" name="description" required>${escapeHtml(current.description)}</textarea></div>
        <div class="image-fields field full-width">${imageFields}</div>
        <label class="check-row field full-width"><input type="checkbox" name="featured" ${current.featured ? 'checked' : ''} /> Featured product</label>
      </div>
      <p class="help">At least one image is required. Every entered image URL must load before publishing.</p>
      <div class="form-actions"><button class="button" type="button" data-section="Products">Cancel</button>${product ? '<button class="button danger" type="button" data-action="delete-product">Delete Product</button>' : ''}<button class="button primary" type="submit">Save Draft</button></div>
    </form>`;
}

function renderPaymentSettings() {
  const payment = state.content.settings.payment;
  return `<div class="page-heading"><div><span class="eyebrow">Checkout</span><h2>Payment Settings</h2><p>Payment instructions are shown in checkout only after online payment is selected.</p></div></div><form class="panel panel-pad" id="paymentForm"><div class="form-grid">
    <label class="check-row"><input name="codEnabled" type="checkbox" ${payment.codEnabled ? 'checked' : ''} /> Enable Cash on Delivery</label><label class="check-row"><input name="onlineEnabled" type="checkbox" ${payment.onlineEnabled ? 'checked' : ''} /> Enable Online Payment</label>
    <div class="field"><label>JazzCash Name</label><input name="jazzCashName" value="${escapeHtml(payment.jazzCashName)}" /></div><div class="field"><label>JazzCash Number</label><input name="jazzCashNumber" value="${escapeHtml(payment.jazzCashNumber)}" /></div>
    <div class="field"><label>NayaPay Name</label><input name="nayaPayName" value="${escapeHtml(payment.nayaPayName)}" /></div><div class="field"><label>NayaPay Number</label><input name="nayaPayNumber" value="${escapeHtml(payment.nayaPayNumber)}" /></div>
    <div class="field"><label>Delivery Charges (PKR)</label><input name="deliveryCharges" type="number" min="0" value="${escapeHtml(state.content.settings.deliveryCharges)}" /></div>
    </div><div class="form-actions"><button class="button primary" type="submit">Save Draft</button></div></form>`;
}

function renderWebsiteSettings() {
  return `<div class="page-heading"><div><span class="eyebrow">Store setup</span><h2>Website Settings</h2><p>Manage public category navigation and store identity.</p></div></div><form class="panel panel-pad" id="websiteForm"><div class="form-grid"><div class="field"><label>Store Name</label><input name="storeName" value="${escapeHtml(state.content.settings.storeName)}" required /></div><div class="field full-width"><label>Public Categories / Menus</label><textarea name="categories" required>${escapeHtml(state.content.categories.join('\n'))}</textarea><small>One category per line. Add, rename, or remove the categories shown on the public site.</small></div></div><div class="form-actions"><button class="button primary" type="submit">Save Draft</button></div></form>`;
}

function renderAbout() {
  const about = state.content.settings.about;
  return `<div class="page-heading"><div><span class="eyebrow">Public content</span><h2>About Artist</h2></div></div><form class="panel panel-pad" id="aboutForm"><div class="form-grid"><div class="field full-width"><label>Heading</label><input name="heading" value="${escapeHtml(about.heading)}" required /></div>${about.paragraphs.map((text,index) => `<div class="field full-width"><label>Paragraph ${index + 1}</label><textarea name="paragraph${index}">${escapeHtml(text)}</textarea></div>`).join('')}</div><div class="form-actions"><button class="button primary" type="submit">Save Draft</button></div></form>`;
}

function renderFaq() {
  return `<div class="page-heading"><div><span class="eyebrow">Public content</span><h2>FAQ</h2></div><button class="button" data-action="add-faq">Add question</button></div><form class="panel panel-pad" id="faqForm"><div class="product-list">${state.content.settings.faq.map((item,index) => `<div class="panel panel-pad faq-row" data-faq-index="${index}"><div class="form-grid"><div class="field"><label>Question</label><input name="question${index}" value="${escapeHtml(item.question)}" required /></div><div class="field"><label>Answer</label><textarea name="answer${index}" required>${escapeHtml(item.answer)}</textarea></div></div><div class="form-actions"><button class="button danger" type="button" data-action="delete-faq" data-index="${index}">Remove</button></div></div>`).join('')}</div><div class="form-actions"><button class="button primary" type="submit">Save Draft</button></div></form>`;
}

function renderOrders() {
  return `<div class="page-heading"><div><span class="eyebrow">Order desk</span><h2>Orders</h2><p>${state.orders.length} server-stored orders · order sequence starts at 100.</p></div><button class="button" data-action="refresh-orders">Refresh</button></div><div class="panel panel-pad table-wrap">${state.orders.length ? `<table><thead><tr><th>Order</th><th>Customer</th><th>Delivery</th><th>Products</th><th>Total</th><th>Payment</th><th>Date</th><th>Status</th></tr></thead><tbody>${state.orders.slice().reverse().map(order => `<tr><td>#${order.orderNumber}</td><td>${escapeHtml(order.customerName)}<br>${escapeHtml(order.phone)}<br>${escapeHtml(order.email || '')}</td><td>${escapeHtml(order.address)}, ${escapeHtml(order.city)}</td><td>${(order.items || []).map(item => `${escapeHtml(item.name)} × ${item.quantity}`).join('<br>')}</td><td>${formatPrice(order.total)}</td><td>${escapeHtml(order.paymentMethod)}</td><td>${new Date(order.orderDate).toLocaleString()}</td><td><select class="order-status" data-order="${order.orderNumber}">${ORDER_STATES.map(status => `<option ${order.status === status ? 'selected' : ''}>${status}</option>`).join('')}</select></td></tr>`).join('')}</tbody></table>` : '<div class="empty-note">Orders will appear here when the site is deployed with Netlify Functions.</div>'}</div>`;
}

function renderSecurity() {
  return `<div class="page-heading"><div><span class="eyebrow">Account</span><h2>Security</h2><p>Set a unique administrator password. Changing it ends this session.</p></div></div><form class="panel panel-pad" id="passwordForm"><div class="form-grid"><div class="field full-width"><label>Current Password</label><input name="currentPassword" type="password" autocomplete="current-password" required /></div><div class="field"><label>New Password</label><input name="newPassword" type="password" minlength="12" autocomplete="new-password" required /></div><div class="field"><label>Confirm New Password</label><input name="confirmPassword" type="password" minlength="12" autocomplete="new-password" required /></div></div><div class="form-actions"><button class="button primary" type="submit">Change Admin Password</button></div></form>`;
}

function renderSection() {
  const content = document.getElementById('adminContent');
  if (!content) return;
  document.getElementById('topTitle').textContent = state.section;
  const sections = {
    'Dashboard': renderDashboard,
    'Products': () => renderProducts(false),
    'Add Product': () => productForm(state.editingId ? state.content.products.find(item => item.id === state.editingId) : null),
    'Stock Management': () => renderProducts(true),
    'Orders': renderOrders,
    'Payment Settings': renderPaymentSettings,
    'Website Settings': renderWebsiteSettings,
    'About Artist': renderAbout,
    'FAQ': renderFaq,
    'Security': renderSecurity
  };
  content.innerHTML = (sections[state.section] || renderDashboard)();
  content.querySelectorAll('[data-image-input]').forEach((input) => {
    if (input.value) showImagePreview(Number(input.dataset.imageInput), input.value, content.querySelector(`[data-image-preview="${input.dataset.imageInput}"]`));
  });
  content.querySelectorAll('[data-count]').forEach(node => {
    const target = Number(node.dataset.count);
    const start = performance.now();
    const animate = (now) => { const progress = Math.min(1, (now - start) / 520); node.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) requestAnimationFrame(animate); };
    requestAnimationFrame(animate);
  });
}

function switchSection(section) {
  state.section = section;
  state.editingId = null;
  dashboardMount.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.section === section));
  renderSection();
  if (location.pathname !== '/admin/dashboard') history.pushState({}, '', '/admin/dashboard');
}

async function loadDashboard() {
  const [published, orderResult] = await Promise.all([api('/api/admin/content'), api('/api/orders')]);
  state.published = published;
  state.content = JSON.parse(sessionStorage.getItem('adeel-admin-draft') || 'null') || clone(published);
  state.orders = orderResult.orders || [];
  state.section = 'Dashboard';
  dashboardShell();
  history.replaceState({}, '', '/admin/dashboard');
}

async function imageIsValid(url) {
  if (!url) return false;
  return new Promise(resolve => {
    const image = new Image();
    const timer = setTimeout(() => { image.src = ''; resolve(false); }, 10000);
    image.onload = () => { clearTimeout(timer); resolve(true); };
    image.onerror = () => { clearTimeout(timer); resolve(false); };
    image.src = url;
  });
}

async function showImagePreview(index, url, box) {
  box.classList.remove('error');
  if (!url) { box.textContent = 'Paste an image URL to preview'; return; }
  if (!/^https?:\/\//i.test(url) || !await imageIsValid(url)) {
    if (box.closest('form')?.querySelector(`[data-image-input="${index}"]`)?.value.trim() !== url) return;
    box.classList.add('error'); box.textContent = 'Image URL could not be loaded.'; return;
  }
  if (box.closest('form')?.querySelector(`[data-image-input="${index}"]`)?.value.trim() !== url) return;
  const focusX = Math.max(0, Math.min(100, Number(box.dataset.focusX) || 50));
  const focusY = Math.max(0, Math.min(100, Number(box.dataset.focusY) || 50));
  const zoom = Math.max(1, Math.min(2.5, Number(box.dataset.zoom) || 1));
  box.innerHTML = `<div class="image-crop-window" data-crop-window="${index}" data-focus-x="${focusX}" data-focus-y="${focusY}" data-zoom="${zoom}" style="--focus-x:${focusX}%;--focus-y:${focusY}%;--crop-zoom:${zoom}">
      <img src="${escapeHtml(url)}" alt="Image ${index + 1} preview" draggable="false" />
      <span class="crop-hint">Drag to reposition</span>
    </div>
    <div class="image-crop-controls">
      <label>Zoom <input type="range" min="100" max="250" step="1" value="${Math.round(zoom * 100)}" data-image-zoom="${index}" /></label>
      <button class="button" type="button" data-action="image-reset" data-index="${index}">Reset</button>
      <small data-focus-label="${index}">${focusX}% · ${focusY}%</small>
    </div>`;
}

function updateCropWindow(cropWindow) {
  const focusX = Math.max(0, Math.min(100, Number(cropWindow.dataset.focusX) || 50));
  const focusY = Math.max(0, Math.min(100, Number(cropWindow.dataset.focusY) || 50));
  const zoom = Math.max(1, Math.min(2.5, Number(cropWindow.dataset.zoom) || 1));
  cropWindow.dataset.focusX = String(focusX);
  cropWindow.dataset.focusY = String(focusY);
  cropWindow.dataset.zoom = String(zoom);
  cropWindow.style.setProperty('--focus-x', `${focusX}%`);
  cropWindow.style.setProperty('--focus-y', `${focusY}%`);
  cropWindow.style.setProperty('--crop-zoom', String(zoom));
  const preview = cropWindow.closest('[data-image-preview]');
  preview.dataset.focusX = String(focusX);
  preview.dataset.focusY = String(focusY);
  preview.dataset.zoom = String(zoom);
  const index = cropWindow.dataset.cropWindow;
  const slider = preview.querySelector(`[data-image-zoom="${index}"]`);
  const label = preview.querySelector(`[data-focus-label="${index}"]`);
  if (slider) slider.value = String(Math.round(zoom * 100));
  if (label) label.textContent = `${Math.round(focusX)}% · ${Math.round(focusY)}%`;
}

async function validateAllImages() {
  for (const product of state.content.products) {
    if (!product.imageUrls?.length || product.imageUrls.some(url => !/^https?:\/\//i.test(url))) throw new Error(`${product.name}: add at least one valid image URL.`);
    for (const url of product.imageUrls) if (!await imageIsValid(url)) throw new Error(`${product.name}: Image URL could not be loaded.`);
  }
}

async function saveProduct(form) {
  const formData = new FormData(form);
  const id = form.dataset.id || `product-${crypto.randomUUID()}`;
  const imageEntries = [0,1,2].map(index => {
    const imageUrl = String(formData.get(`image${index}`) || '').trim();
    const preview = form.querySelector(`[data-image-preview="${index}"]`);
    return imageUrl ? {
      url: imageUrl,
      adjustment: {
        x: Number(preview?.dataset.focusX) || 50,
        y: Number(preview?.dataset.focusY) || 50,
        zoom: Number(preview?.dataset.zoom) || 1
      }
    } : null;
  }).filter(Boolean);
  const imageUrls = imageEntries.map(entry => entry.url);
  if (!imageUrls.length) throw new Error('Add at least one product image URL.');
  for (const imageUrl of imageUrls) {
    if (!await imageIsValid(imageUrl)) throw new Error('Image URL could not be loaded.');
  }
  const category = String(formData.get('category'));
  const productType = category.toLowerCase().includes('basic') ? 'Basic' : category.toLowerCase().includes('medium') ? 'Medium' : category.toLowerCase().includes('high') ? 'High-End' : category;
  const product = {
    id, productId: state.content.products.find(item => item.id === id)?.productId || `ART-${String(Date.now()).slice(-6)}`,
    name: String(formData.get('name')).trim(), category, productType, description: String(formData.get('description')).trim(), imageUrls,
    imageAdjustments: imageEntries.map(entry => entry.adjustment),
    originalPrice: Number(formData.get('originalPrice')), salePrice: Number(formData.get('salePrice')),
    availability: String(formData.get('availability')), paymentAvailability: String(formData.get('paymentAvailability')),
    featured: formData.has('featured'), discountLabel: `${Math.max(0, Math.round((1 - Number(formData.get('salePrice')) / Math.max(1, Number(formData.get('originalPrice')))) * 100))}% Off`
  };
  const index = state.content.products.findIndex(item => item.id === id);
  if (index < 0) state.content.products.push(product); else state.content.products[index] = product;
  markDirty();
  state.section = 'Products';
  state.editingId = null;
  renderSection();
  notify('Product saved as an unpublished draft.');
}

function handleProductFilter() {
  const query = document.getElementById('productSearch')?.value.toLowerCase() || '';
  const category = document.getElementById('productCategoryFilter')?.value || 'all';
  const stock = document.getElementById('stockFilter')?.value || 'all';
  const rows = state.content.products.filter(product => (!query || product.name.toLowerCase().includes(query)) && (category === 'all' || product.category === category) && (stock === 'all' || product.availability === stock));
  const list = document.getElementById('managedProducts');
  if (list) list.innerHTML = rows.length ? rows.map(productRow).join('') : '<div class="empty-note">No matching products.</div>';
}

async function updateOrderStatus(select) {
  await api('/api/orders', { method: 'PATCH', body: JSON.stringify({ orderNumber: select.dataset.order, status: select.value }) });
  const order = state.orders.find(item => String(item.orderNumber) === select.dataset.order);
  if (order) order.status = select.value;
  notify('Order status updated.');
}

async function publishChanges() {
  await validateAllImages();
  const result = await api('/api/admin/publish', { method: 'POST', body: JSON.stringify(state.content) });
  state.content.publishedAt = result.publishedAt;
  state.content.version = result.publishedAt;
  state.published = clone(state.content);
  sessionStorage.removeItem('adeel-admin-draft');
  const status = document.getElementById('changeStatus');
  if (status) status.textContent = 'Changes Published Successfully';
  notify('Changes published successfully. Netlify will deploy the new catalog shortly.');
}

async function handleAction(action, target) {
  if (action === 'image-reset') {
    const cropWindow = target.closest('[data-image-preview]')?.querySelector(`[data-crop-window="${target.dataset.index}"]`);
    if (cropWindow) {
      cropWindow.dataset.focusX = '50';
      cropWindow.dataset.focusY = '50';
      cropWindow.dataset.zoom = '1';
      updateCropWindow(cropWindow);
    }
  }
  if (action === 'edit-product') { state.editingId = target.dataset.id; switchSection('Add Product'); }
  if (action === 'stock-toggle') {
    const product = state.content.products.find(item => item.id === target.dataset.id);
    if (product) { product.availability = product.availability === 'Out of Stock' ? 'In Stock' : 'Out of Stock'; markDirty(); renderSection(); }
  }
  if (action === 'delete-product') {
    const form = document.getElementById('productForm');
    const id = target.dataset.id || form?.dataset.id;
    const product = state.content.products.find(item => item.id === id);
    if (product && window.confirm('Are you sure you want to delete this product?')) {
      state.content.products = state.content.products.filter(item => item.id !== id);
      markDirty(); switchSection('Products'); notify('Product removed from draft. Publish to make it live.');
    }
  }
  if (action === 'preview') {
    localStorage.setItem('adeel-art-preview', JSON.stringify(state.content));
    window.open('/?preview=1', '_blank', 'noopener,noreferrer');
  }
  if (action === 'publish') {
    if (state.saving) return;
    state.saving = true;
    try { await publishChanges(); }
    catch (error) { notify(error.message.includes('Publishing failed') ? error.message : `Publishing failed. Your current live website is still unchanged. ${error.message}`); }
    finally { state.saving = false; }
  }
  if (action === 'logout') {
    await api('/api/admin/auth', { method: 'DELETE' }).catch(() => {});
    sessionStorage.removeItem('adeel-admin-draft');
    localStorage.removeItem('adeel-art-preview');
    dashboardMount.innerHTML = '';
    dashboardMount.hidden = true;
    loginView.hidden = false;
    loginForm.reset();
    history.replaceState({}, '', '/admin');
    document.getElementById('adminPassword').focus();
  }
  if (action === 'refresh-orders') {
    state.orders = (await api('/api/orders')).orders || [];
    renderSection();
  }
  if (action === 'add-faq') { state.content.settings.faq.push({ question: '', answer: '' }); markDirty(); renderSection(); }
  if (action === 'delete-faq') {
    const index = Number(target.dataset.index);
    state.content.settings.faq.splice(index, 1); markDirty(); renderSection();
  }
}

root.addEventListener('click', async event => {
  const navButton = event.target.closest('[data-section]');
  if (navButton) { switchSection(navButton.dataset.section); return; }
  const actionButton = event.target.closest('[data-action]');
  if (actionButton) {
    try { await handleAction(actionButton.dataset.action, actionButton); }
    catch (error) { notify(error.message); }
  }
});

root.addEventListener('input', event => {
  if (['productSearch', 'productCategoryFilter', 'stockFilter'].includes(event.target.id)) handleProductFilter();
  if (event.target.matches('[data-image-zoom]')) {
    const index = event.target.dataset.imageZoom;
    const cropWindow = document.querySelector(`[data-crop-window="${index}"]`);
    if (cropWindow) {
      cropWindow.dataset.zoom = String(Number(event.target.value) / 100);
      updateCropWindow(cropWindow);
    }
    return;
  }
  if (event.target.matches('[data-image-input]')) {
    const index = Number(event.target.dataset.imageInput);
    const box = document.querySelector(`[data-image-preview="${index}"]`);
    clearTimeout(event.target.previewTimer);
    event.target.previewTimer = setTimeout(() => showImagePreview(index, event.target.value.trim(), box), 350);
  }
});

root.addEventListener('pointerdown', event => {
  const cropWindow = event.target.closest('[data-crop-window]');
  if (!cropWindow) return;
  event.preventDefault();
  cropWindow.setPointerCapture(event.pointerId);
  cropWindow.dataset.dragging = 'true';
  cropWindow.dataset.pointerX = String(event.clientX);
  cropWindow.dataset.pointerY = String(event.clientY);
});

root.addEventListener('pointermove', event => {
  const cropWindow = event.target.closest('[data-crop-window]');
  if (!cropWindow || cropWindow.dataset.dragging !== 'true') return;
  const bounds = cropWindow.getBoundingClientRect();
  const zoom = Math.max(1, Number(cropWindow.dataset.zoom) || 1);
  const deltaX = event.clientX - Number(cropWindow.dataset.pointerX);
  const deltaY = event.clientY - Number(cropWindow.dataset.pointerY);
  cropWindow.dataset.focusX = String(Number(cropWindow.dataset.focusX) - deltaX / bounds.width * 100 / zoom);
  cropWindow.dataset.focusY = String(Number(cropWindow.dataset.focusY) - deltaY / bounds.height * 100 / zoom);
  cropWindow.dataset.pointerX = String(event.clientX);
  cropWindow.dataset.pointerY = String(event.clientY);
  updateCropWindow(cropWindow);
});

function stopImageDrag(event) {
  const cropWindow = event.target.closest('[data-crop-window]');
  if (cropWindow) cropWindow.dataset.dragging = 'false';
}

root.addEventListener('pointerup', stopImageDrag);
root.addEventListener('pointercancel', stopImageDrag);

root.addEventListener('change', async event => {
  if (event.target.matches('.order-status')) {
    try { await updateOrderStatus(event.target); } catch (error) { notify(error.message); }
  }
});

root.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.target;
  try {
    if (form.id === 'productForm') await saveProduct(form);
    if (form.id === 'paymentForm') {
      const data = new FormData(form);
      const payment = state.content.settings.payment;
      payment.codEnabled = data.has('codEnabled'); payment.onlineEnabled = data.has('onlineEnabled');
      payment.jazzCashName = String(data.get('jazzCashName')).trim(); payment.jazzCashNumber = String(data.get('jazzCashNumber')).trim();
      payment.nayaPayName = String(data.get('nayaPayName')).trim(); payment.nayaPayNumber = String(data.get('nayaPayNumber')).trim();
      state.content.settings.deliveryCharges = Number(data.get('deliveryCharges')) || 0; markDirty(); notify('Payment settings saved as draft.');
    }
    if (form.id === 'websiteForm') {
      const data = new FormData(form); const categories = String(data.get('categories')).split('\n').map(item => item.trim()).filter(Boolean);
      if (!categories.length) throw new Error('Add at least one public category.');
      const orphan = state.content.products.find(product => !categories.includes(product.category));
      if (orphan) throw new Error(`Move "${orphan.name}" to a remaining category before removing "${orphan.category}".`);
      state.content.settings.storeName = String(data.get('storeName')).trim(); state.content.categories = categories; markDirty(); notify('Website settings saved as draft.');
    }
    if (form.id === 'aboutForm') {
      const data = new FormData(form); state.content.settings.about.heading = String(data.get('heading')).trim();
      state.content.settings.about.paragraphs = [0,1].map(index => String(data.get(`paragraph${index}`) || '').trim()); markDirty(); notify('Artist information saved as draft.');
    }
    if (form.id === 'faqForm') {
      const data = new FormData(form); state.content.settings.faq = state.content.settings.faq.map((_, index) => ({ question: String(data.get(`question${index}`)).trim(), answer: String(data.get(`answer${index}`)).trim() })); markDirty(); notify('FAQ saved as draft.');
    }
    if (form.id === 'passwordForm') {
      const data = new FormData(form); await api('/api/admin/auth', { method: 'PUT', body: JSON.stringify(Object.fromEntries(data)) });
      notify('Password changed. Sign in with the new password.'); await handleAction('logout', form);
    }
  } catch (error) { notify(error.message); }
});

loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  setLoginError('');
  try {
    await api('/api/admin/auth', { method: 'POST', body: JSON.stringify({ password: document.getElementById('adminPassword').value }) });
    await loadDashboard();
  } catch (error) { setLoginError(error.message); }
});

window.addEventListener('popstate', async () => {
  try { await api('/api/admin/auth'); await loadDashboard(); }
  catch { dashboardMount.innerHTML = ''; dashboardMount.hidden = true; loginView.hidden = false; }
});

(async function initialize() {
  if (location.pathname === '/admin/dashboard') {
    try { await api('/api/admin/auth'); await loadDashboard(); } catch { history.replaceState({}, '', '/admin'); }
  } else {
    try { await api('/api/admin/auth'); await loadDashboard(); } catch { loginView.hidden = false; }
  }
})();
