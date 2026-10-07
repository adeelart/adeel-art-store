/*
  =========================================================
  EDITABLE SITE CONFIGURATION
  Update only this section to change the store name, contact details,
  payment accounts, delivery charges, and product data.

  PRODUCT IMAGE URL 1 / 2 / 3:
  Paste your own image URLs in each product below. The site automatically
  uses them in the product card, gallery, modal, and order summary.
  =========================================================
*/
const EMAILJS_CONFIG = {
  serviceId: 'service_ql1eftm',
  templateId: 'template_t1a8khs',
  publicKey: 'wxozZMxAMk4ZQLGrk'
};

const CONFIG = {
  storeName: 'ADEEL ART',
  logoText: 'ADEEL ART',
  phone: '+92 3058716194',
  email: 'adeel1152000@gmail.com',
  whatsapp: '+92 3058716194',
  ownerEmail: 'adeel1152000@gmail.com',
  deliveryCharges: 350,
  jazzCashDetails: 'JazzCash: 03058716194\nAccount Title: Adeel Rajpoot',
  nayapayDetails: 'NayaPay: 03187803469\nAccount Title: Adeel Rajpoot',
  shopUrl: '#shop',
  contactWhatsAppLink: 'https://wa.me/923058716194?text=Hi%20I%20want%20to%20order%20a%20custom%20sketch',
  customSketchMessage: 'Hi, I want to order a custom sketch. Please share details about the artwork, reference photos, and pricing.'
};

const basicSketches = [
  {
    id: 'basic-1',
    name: 'City Silence',
    category: 'Basic Sketches',
    productType: 'Basic',
    imageUrls: [
      'https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80'
    ],
    originalPrice: 4500,
    salePrice: 3200,
    description: 'A minimal city-inspired sketch with soft pencil texture and calm composition. Ideal for desks, quiet corners, and thoughtful gifting.',
    availability: 'In Stock',
    productId: 'BSK-101',
    discountLabel: '29% Off'
  },
  {
    id: 'basic-2',
    name: 'Window Light',
    category: 'Basic Sketches',
    productType: 'Basic',
    imageUrls: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80'
    ],
    originalPrice: 5200,
    salePrice: 3900,
    description: 'Quiet lines and atmospheric depth bring warmth into a small, elegant sketch for interior styling and personal shelves.',
    availability: 'In Stock',
    productId: 'BSK-102',
    discountLabel: '25% Off'
  },
  {
    id: 'basic-3',
    name: 'Bloom Study',
    category: 'Basic Sketches',
    productType: 'Basic',
    imageUrls: [
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80'
    ],
    originalPrice: 6100,
    salePrice: 4600,
    description: 'A floral composition with a soft, hand-drawn finish that suits art lovers seeking a calm, uplifting statement piece.',
    availability: 'In Stock',
    productId: 'BSK-103',
    discountLabel: '25% Off'
  }
];

const mediumSketches = [
  {
    id: 'medium-1',
    name: 'Portrait in Motion',
    category: 'Medium Sketches',
    productType: 'Medium',
    imageUrls: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
    ],
    originalPrice: 9500,
    salePrice: 7200,
    description: 'Defined facial features and a graceful shading balance produce a richer portrait that feels personal and distinct.',
    availability: 'In Stock',
    productId: 'MSK-201',
    discountLabel: '24% Off'
  },
  {
    id: 'medium-2',
    name: 'Midnight Muse',
    category: 'Medium Sketches',
    productType: 'Medium',
    imageUrls: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
    ],
    originalPrice: 11000,
    salePrice: 8500,
    description: 'A dramatic yet elegant portrait with softly layered shading, perfect for collectors wanting a more expressive centerpiece.',
    availability: 'Limited',
    productId: 'MSK-202',
    discountLabel: '23% Off'
  },
  {
    id: 'medium-3',
    name: 'Golden Hour',
    category: 'Medium Sketches',
    productType: 'Medium',
    imageUrls: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
    ],
    originalPrice: 9800,
    salePrice: 7300,
    description: 'Warm tones and confident linework create a stylish character sketch with emotional detail and classic composition.',
    availability: 'In Stock',
    productId: 'MSK-203',
    discountLabel: '25% Off'
  }
];

const highEndSketches = [
  {
    id: 'high-1',
    name: 'The Atelier Portrait',
    category: 'High-End / Professional Sketches',
    productType: 'High-End',
    imageUrls: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80'
    ],
    originalPrice: 18000,
    salePrice: 14600,
    description: 'A premium detail-rich portrait designed for collectors, homes, and statement decor. Refined texture and detail push the aesthetic further.',
    availability: 'In Stock',
    productId: 'HSK-301',
    discountLabel: '19% Off'
  },
  {
    id: 'high-2',
    name: 'Collector’s Muse',
    category: 'High-End / Professional Sketches',
    productType: 'High-End',
    imageUrls: [
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80'
    ],
    originalPrice: 22000,
    salePrice: 17800,
    description: 'Designed for a premium art collection, this sketch combines expressive lines, tonal depth, and highly refined portrait finish.',
    availability: 'Limited',
    productId: 'HSK-302',
    discountLabel: '19% Off'
  },
  {
    id: 'high-3',
    name: 'Architect of Memory',
    category: 'High-End / Professional Sketches',
    productType: 'High-End',
    imageUrls: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80'
    ],
    originalPrice: 19500,
    salePrice: 15900,
    description: 'A high-end crafted portrait that blends expressive handwork and compelling realism for premium display spaces.',
    availability: 'In Stock',
    productId: 'HSK-303',
    discountLabel: '18% Off'
  }
];

let allProducts = [...basicSketches, ...mediumSketches, ...highEndSketches];
let siteContent = null;
let shopCategories = ['Basic Sketches', 'Medium Sketches', 'High-End / Professional Sketches', 'Custom Sketch'];

const state = {
  cart: JSON.parse(localStorage.getItem('sketchStoreCart') || '[]'),
  selectedProduct: null,
  currentOrder: null,
  orderNumber: null
};

const elements = {
  featuredProducts: document.getElementById('featuredProducts'),
  productGrid: document.getElementById('productGrid'),
  emptyProducts: document.getElementById('emptyProducts'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartItems: document.getElementById('cartItems'),
  cartEmpty: document.getElementById('cartEmpty'),
  cartCount: document.getElementById('cartCount'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartDelivery: document.getElementById('cartDelivery'),
  cartTotal: document.getElementById('cartTotal'),
  searchInput: document.getElementById('searchInput'),
  categoryFilter: document.getElementById('categoryFilter'),
  priceFilter: document.getElementById('priceFilter'),
  clearFilters: document.getElementById('clearFilters'),
  checkoutSubtotal: document.getElementById('checkoutSubtotal'),
  checkoutDelivery: document.getElementById('checkoutDelivery'),
  checkoutTotal: document.getElementById('checkoutTotal'),
  checkoutForm: document.getElementById('checkoutForm'),
  checkoutOrderSummaryList: document.getElementById('checkoutOrderSummaryList'),
  onlinePaymentBox: document.getElementById('onlinePaymentBox'),
  jazzCashDetails: document.getElementById('jazzCashDetails'),
  nayapayDetails: document.getElementById('nayaPayDetails'),
  productModalOverlay: document.getElementById('productModalOverlay'),
  productModal: document.getElementById('productModal'),
  modalMainImage: document.getElementById('modalMainImage'),
  thumbnailRow: document.getElementById('thumbnailRow'),
  modalCategory: document.getElementById('modalCategory'),
  modalTitle: document.getElementById('modalTitle'),
  modalDescription: document.getElementById('modalDescription'),
  modalOriginalPrice: document.getElementById('modalOriginalPrice'),
  modalSalePrice: document.getElementById('modalSalePrice'),
  modalAvailability: document.getElementById('modalAvailability'),
  checkoutModalOverlay: document.getElementById('checkoutModalOverlay'),
  confirmationOverlay: document.getElementById('confirmationOverlay'),
  confirmationOrderNumber: document.getElementById('confirmationOrderNumber'),
  confirmationCustomerName: document.getElementById('confirmationCustomerName'),
  confirmationTotal: document.getElementById('confirmationTotal'),
  confirmationPaymentMethod: document.getElementById('confirmationPaymentMethod'),
  confirmationDetails: document.getElementById('confirmationDetails'),
  trackingInput: document.getElementById('trackingInput'),
  trackingResult: document.getElementById('trackingResult'),
  loaderOverlay: document.getElementById('loaderOverlay'),
  mobileMenu: document.getElementById('mobileMenu'),
  cartToggle: document.getElementById('cartToggle'),
  closeCart: document.getElementById('closeCart'),
  checkoutBtn: document.getElementById('checkoutBtn'),
  continueShoppingBtn: document.getElementById('continueShoppingBtn'),
  menuToggle: document.getElementById('menuToggle')
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

function getProductImageStyle(product, index = 0) {
  const adjustment = product.imageAdjustments?.[index] || { x: 50, y: 50, zoom: 1 };
  const x = Math.max(0, Math.min(100, Number(adjustment.x) || 50));
  const y = Math.max(0, Math.min(100, Number(adjustment.y) || 50));
  const zoom = Math.max(1, Math.min(2.5, Number(adjustment.zoom) || 1));
  return `--image-focus-x:${x}%;--image-focus-y:${y}%;--image-zoom:${zoom}`;
}

async function loadSiteContent() {
  const isPreview = new URLSearchParams(window.location.search).has('preview');
  if (isPreview) {
    try {
      const draft = JSON.parse(localStorage.getItem('adeel-art-preview') || 'null');
      localStorage.removeItem('adeel-art-preview');
      if (draft) siteContent = draft;
    } catch {
      localStorage.removeItem('adeel-art-preview');
    }
    const badge = document.createElement('div');
    badge.className = 'draft-preview-banner';
    badge.textContent = 'PREVIEW · Unpublished changes';
    document.body.prepend(badge);
  }

  if (!siteContent) {
    try {
      const response = await fetch('/content/site-content.json', { cache: 'no-store' });
      if (response.ok) siteContent = await response.json();
    } catch {
      siteContent = null;
    }
  }

  if (!Array.isArray(siteContent?.products)) return;
  allProducts = siteContent.products.map((product) => ({
    ...product,
    availability: product.availability || 'In Stock',
    paymentAvailability: product.paymentAvailability || 'Both Available',
    imageUrls: (product.imageUrls || []).filter(Boolean)
  }));
  const availableIds = new Set(allProducts.map((product) => product.id));
  const validCart = state.cart.filter((item) => availableIds.has(item.productId));
  if (validCart.length !== state.cart.length) {
    state.cart = validCart;
    saveCart();
  }
  shopCategories = siteContent.categories || shopCategories;
  const settings = siteContent.settings || {};
  const payment = settings.payment || {};
  Object.assign(CONFIG, {
    storeName: settings.storeName || CONFIG.storeName,
    deliveryCharges: Number(settings.deliveryCharges ?? CONFIG.deliveryCharges),
    jazzCashDetails: `${payment.jazzCashName || ''}: ${payment.jazzCashNumber || ''}`,
    nayapayDetails: `${payment.nayaPayName || ''}: ${payment.nayaPayNumber || ''}`,
    paymentSettings: payment
  });
  renderManagedCategories();
  renderManagedAbout();
  renderManagedFAQ();
}

function renderManagedCategories() {
  const categoryGrid = document.getElementById('categoryGrid');
  if (categoryGrid) {
    categoryGrid.innerHTML = shopCategories.map((category, index) => {
      const isCustom = category.toLowerCase().includes('custom');
      return `<article class="category-card glass-panel reveal-up ${index ? `delay-${Math.min(index, 3)}` : ''} ${isCustom ? 'custom-card' : ''}">
        <span class="badge ${isCustom ? 'badge-strong' : 'badge-soft'}">${isCustom ? 'Custom' : escapeHtml(category.split(' ')[0])}</span>
        <h3>${escapeHtml(category)}</h3>
        <p>${isCustom ? 'Commission a personal artwork from a photo, memory, or inspiration.' : 'Explore hand-drawn pieces from this collection.'}</p>
        ${isCustom ? '<button class="primary-button narrow" id="customSketchCardBtn">Order via WhatsApp</button>' : `<button class="link-button" data-category="${escapeHtml(category)}">View collection</button>`}
      </article>`;
    }).join('');
  }

  if (elements.categoryFilter) {
    const previous = elements.categoryFilter.value;
    elements.categoryFilter.innerHTML = '<option value="all">All Categories</option>' + shopCategories
      .filter((category) => !category.toLowerCase().includes('custom'))
      .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('');
    elements.categoryFilter.value = shopCategories.includes(previous) ? previous : 'all';
  }
}

function renderManagedAbout() {
  const about = siteContent?.settings?.about;
  const section = document.getElementById('about');
  if (!about || !section) return;
  const heading = section.querySelector('.about-copy h2');
  const paragraphs = section.querySelectorAll('.about-copy p');
  if (heading) heading.textContent = about.heading || '';
  (about.paragraphs || []).forEach((text, index) => {
    if (paragraphs[index]) paragraphs[index].textContent = text;
  });
}

function renderManagedFAQ() {
  const list = document.querySelector('.faq-list');
  const entries = siteContent?.settings?.faq;
  if (!list || !Array.isArray(entries)) return;
  list.innerHTML = entries.map((item) => `<div class="faq-item glass-panel reveal-up">
    <button class="faq-question">${escapeHtml(item.question)}<span>+</span></button>
    <div class="faq-answer"><p>${escapeHtml(item.answer)}</p></div>
  </div>`).join('');
}

function formatPrice(value) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(value);
}

function getProductById(productId) {
  return allProducts.find((product) => product.id === productId) || null;
}

function getCartItemCount() {
  return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return state.cart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    if (!product) return sum;
    return sum + product.salePrice * item.quantity;
  }, 0);
}

function saveCart() {
  localStorage.setItem('sketchStoreCart', JSON.stringify(state.cart));
}

function updateCartCount() {
  elements.cartCount.textContent = String(getCartItemCount());
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove('show'), 2200);
}

function addToCart(productId, quantity = 1, silent = false) {
  const existingIndex = state.cart.findIndex((item) => item.productId === productId);
  const product = getProductById(productId);

  if (!product) return;
  if (product.availability === 'Out of Stock') {
    showToast('This artwork is currently out of stock');
    return;
  }

  if (existingIndex >= 0) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({ productId, quantity });
  }

  saveCart();
  renderCart();
  updateCartCount();

  if (!silent) {
    showToast(`${product.name} added to cart`);
  }
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.productId !== productId);
  saveCart();
  renderCart();
  updateCartCount();
  showToast('Item removed from cart');
}

function updateCartItem(productId, delta) {
  const item = state.cart.find((entry) => entry.productId === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCart();
  updateCartCount();
}

function renderCart() {
  const cartItems = state.cart;
  elements.cartItems.innerHTML = '';

  if (!cartItems.length) {
    elements.cartEmpty.hidden = false;
    elements.cartItems.style.display = 'none';
  } else {
    elements.cartEmpty.hidden = true;
    elements.cartItems.style.display = 'grid';
  }

  let subtotal = 0;

  cartItems.forEach((item) => {
    const product = getProductById(item.productId);
    if (!product) return;

    const productTotal = product.salePrice * item.quantity;
    subtotal += productTotal;

    const card = document.createElement('div');
    card.className = 'cart-item';
    const outOfStock = product.availability === 'Out of Stock';
    card.innerHTML = `
      <div class="cart-image-frame"><img src="${escapeHtml(product.imageUrls[0] || '')}" alt="${escapeHtml(product.name)}" style="${getProductImageStyle(product)}" /></div>
      <div class="cart-item-body">
        <h4>${escapeHtml(product.name)}</h4>
        <p>${formatPrice(product.salePrice)} each</p>
        ${outOfStock ? '<p class="stock-out-label">Out of Stock</p>' : ''}
        <div class="cart-qty">
          <button class="qty-btn" data-action="decrease" data-product-id="${escapeHtml(product.id)}" ${outOfStock ? 'disabled' : ''}>−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-product-id="${escapeHtml(product.id)}" ${outOfStock ? 'disabled' : ''}>+</button>
        </div>
      </div>
      <div class="cart-item-side">
        <strong>${formatPrice(productTotal)}</strong>
        <button class="remove-item" data-product-id="${escapeHtml(product.id)}">Remove</button>
      </div>
    `;
    elements.cartItems.appendChild(card);
  });

  const delivery = cartItems.length ? CONFIG.deliveryCharges : 0;
  const total = subtotal + delivery;

  elements.cartSubtotal.textContent = formatPrice(subtotal);
  elements.cartDelivery.textContent = formatPrice(delivery);
  elements.cartTotal.textContent = formatPrice(total);

  elements.checkoutSubtotal.textContent = formatPrice(subtotal);
  elements.checkoutDelivery.textContent = formatPrice(delivery);
  elements.checkoutTotal.textContent = formatPrice(total);
  renderCheckoutSummary();
}

function renderProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.productId = product.id;
  const discount = Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
  const outOfStock = product.availability === 'Out of Stock';

  card.innerHTML = `
    <div class="product-media">
      <button class="product-image-open quick-view" type="button" data-product-id="${escapeHtml(product.id)}" aria-label="View ${escapeHtml(product.name)} details">
        <img src="${escapeHtml(product.imageUrls[0] || '')}" alt="${escapeHtml(product.name)}" loading="lazy" style="${getProductImageStyle(product)}" />
      </button>
      <span class="product-badge">${escapeHtml(product.productType)}</span>
    </div>
    <div class="product-body">
      <div class="product-meta">
        <span>${escapeHtml(product.category)}</span>
        <span class="${outOfStock ? 'stock-out-label' : ''}">${escapeHtml(product.availability)}</span>
      </div>
      <h3><button class="product-title-open quick-view" type="button" data-product-id="${escapeHtml(product.id)}">${escapeHtml(product.name)}</button></h3>
      <p class="product-description">${escapeHtml(product.description)}</p>
      <div class="price-row">
        <span class="old-price">${formatPrice(product.originalPrice)}</span>
        <span class="sale-price">${formatPrice(product.salePrice)}</span>
        <span class="discount-tag">${escapeHtml(product.discountLabel || `${discount}% Off`)}</span>
      </div>
      <div class="product-actions">
        <button class="card-action primary add-to-cart" data-product-id="${escapeHtml(product.id)}" ${outOfStock ? 'disabled' : ''}>${outOfStock ? 'Out of Stock' : 'Add to Cart'}</button>
        <button class="card-action secondary quick-view" data-product-id="${escapeHtml(product.id)}">View Details</button>
      </div>
    </div>
  `;

  return card;
}

function renderFeaturedProducts() {
  const featuredProducts = allProducts.filter((product) => product.featured);
  const featured = (featuredProducts.length ? featuredProducts : allProducts).slice(0, 3);
  const heroProduct = featured[0];
  if (heroProduct) {
    const heroButton = document.getElementById('heroArtworkOpen');
    const heroImage = document.getElementById('heroArtworkImage');
    heroButton.dataset.productId = heroProduct.id;
    heroImage.src = heroProduct.imageUrls[0] || '';
    heroImage.alt = heroProduct.name;
    heroImage.style.cssText = getProductImageStyle(heroProduct);
    document.getElementById('heroArtworkName').textContent = heroProduct.name;
    document.getElementById('heroArtworkPrice').textContent = `From ${formatPrice(heroProduct.salePrice)}`;
  }
  elements.featuredProducts.innerHTML = '';
  featured.forEach((product) => {
    elements.featuredProducts.appendChild(renderProductCard(product));
  });
}

function getFilteredProducts() {
  const searchTerm = elements.searchInput.value.trim().toLowerCase();
  const categoryValue = elements.categoryFilter.value;
  const priceValue = elements.priceFilter.value;

  return allProducts.filter((product) => {
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.productType.toLowerCase().includes(searchTerm);

    const matchesCategory = categoryValue === 'all' || product.category === categoryValue || product.productType === categoryValue;

    let matchesPrice = true;
    if (priceValue !== 'all') {
      const [min, max] = priceValue.split('-');
      const productPrice = product.salePrice;
      if (priceValue === '15000+') {
        matchesPrice = productPrice >= 15000;
      } else if (max) {
        matchesPrice = productPrice >= Number(min) && productPrice <= Number(max);
      }
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });
}

function renderShopProducts() {
  const filtered = getFilteredProducts();
  elements.productGrid.innerHTML = '';

  if (!filtered.length) {
    elements.emptyProducts.hidden = false;
    return;
  }

  elements.emptyProducts.hidden = true;
  filtered.forEach((product) => {
    elements.productGrid.appendChild(renderProductCard(product));
  });
}

function openProductModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  state.selectedProduct = product;
  elements.productModal.scrollTop = 0;
  elements.modalMainImage.src = product.imageUrls[0];
  elements.modalMainImage.alt = product.name;
  elements.modalMainImage.style.cssText = getProductImageStyle(product, 0);
  elements.modalCategory.textContent = product.category;
  elements.modalTitle.textContent = product.name;
  elements.modalDescription.textContent = product.description;
  elements.modalOriginalPrice.textContent = formatPrice(product.originalPrice);
  elements.modalSalePrice.textContent = formatPrice(product.salePrice);
  elements.modalAvailability.textContent = product.availability;
  const outOfStock = product.availability === 'Out of Stock';
  document.getElementById('modalAddToCart').disabled = outOfStock;
  document.getElementById('modalBuyNow').disabled = outOfStock;
  document.getElementById('modalAddToCart').textContent = outOfStock ? 'Out of Stock' : 'Add to Cart';
  document.getElementById('modalBuyNow').textContent = outOfStock ? 'Unavailable' : 'Buy Now';

  elements.thumbnailRow.innerHTML = '';
  product.imageUrls.forEach((image, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = index === 0 ? 'active' : '';
    button.innerHTML = `<img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)} view ${index + 1}" loading="lazy" style="${getProductImageStyle(product, index)}" />`;
    button.addEventListener('click', () => {
      elements.modalMainImage.src = image;
      elements.modalMainImage.style.cssText = getProductImageStyle(product, index);
      [...elements.thumbnailRow.children].forEach((thumb) => thumb.classList.remove('active'));
      button.classList.add('active');
    });
    elements.thumbnailRow.appendChild(button);
  });

  elements.productModalOverlay.classList.remove('hidden');
}

function closeProductModal() {
  elements.productModalOverlay.classList.add('hidden');
}

function backToHome() {
  closeProductModal();
  history.replaceState({}, '', `${location.pathname}${location.search}#home`);
  document.getElementById('home').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToCheckout() {
  const modal = elements.checkoutModalOverlay;
  if (!modal) return;

  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const formTop = modal.querySelector('.checkout-form');
    if (formTop) {
      formTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 60);
}

function openCheckoutModal() {
  const cartItems = state.cart;
  if (!cartItems.length) {
    showToast('Your cart is empty');
    return;
  }

  if (cartItems.some((entry) => getProductById(entry.productId)?.availability === 'Out of Stock')) {
    showToast('Remove out-of-stock items from your cart before checkout');
    return;
  }

  renderCheckoutSummary();
  elements.checkoutModalOverlay.classList.remove('hidden');
  setTimeout(() => {
    elements.checkoutModalOverlay.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 60);
}

function closeCheckoutModal() {
  elements.checkoutModalOverlay.classList.add('hidden');
}

function renderCheckoutSummary() {
  const subtotal = getCartTotal();
  const delivery = state.cart.length ? CONFIG.deliveryCharges : 0;
  const total = subtotal + delivery;

  elements.checkoutSubtotal.textContent = formatPrice(subtotal);
  elements.checkoutDelivery.textContent = formatPrice(delivery);
  elements.checkoutTotal.textContent = formatPrice(total);
  refreshPaymentOptions();

  elements.checkoutOrderSummaryList.innerHTML = '';

  if (!state.cart.length) {
    elements.checkoutOrderSummaryList.innerHTML = '<p>No items in the cart.</p>';
    return;
  }

  state.cart.forEach((entry) => {
    const product = getProductById(entry.productId);
    if (!product) return;

    const item = document.createElement('div');
    item.className = 'preview-item';
    item.innerHTML = `
      <div class="preview-image-frame"><img src="${escapeHtml(product.imageUrls[0] || '')}" alt="${escapeHtml(product.name)}" style="${getProductImageStyle(product)}" /></div>
      <div>
        <h4>${escapeHtml(product.name)}</h4>
        <p>Qty: ${entry.quantity}</p>
      </div>
      <strong>${formatPrice(product.salePrice * entry.quantity)}</strong>
    `;
    elements.checkoutOrderSummaryList.appendChild(item);
  });
}

function refreshPaymentOptions() {
  const payment = CONFIG.paymentSettings || { codEnabled: true, onlineEnabled: true };
  const products = state.cart.map((entry) => getProductById(entry.productId)).filter(Boolean);
  const supports = (product, method) => {
    const availability = product.paymentAvailability || 'Both Available';
    return availability === 'Both Available' ||
      (method === 'Cash on Delivery' && availability === 'COD Available') ||
      (method === 'Online Payment' && availability === 'Online Payment Available');
  };
  const allowed = {
    'Cash on Delivery': Boolean(payment.codEnabled) && products.every((product) => supports(product, 'Cash on Delivery')),
    'Online Payment': Boolean(payment.onlineEnabled) && products.every((product) => supports(product, 'Online Payment'))
  };

  document.querySelectorAll('[data-payment-option]').forEach((label) => {
    const radio = label.querySelector('input');
    const enabled = Boolean(allowed[radio.value]);
    label.hidden = !enabled;
    radio.disabled = !enabled;
    if (!enabled) radio.checked = false;
  });

  let selected = [...document.querySelectorAll('input[name="paymentMethod"]')].find((radio) => radio.checked && !radio.disabled);
  if (!selected) {
    const fallback = [...document.querySelectorAll('input[name="paymentMethod"]')].find((radio) => !radio.disabled);
    if (fallback) fallback.checked = true;
    selected = fallback;
  }
  const message = document.getElementById('paymentAvailabilityMessage');
  const submit = elements.checkoutForm?.querySelector('[type="submit"]');
  if (message) {
    message.hidden = Boolean(selected);
    message.textContent = 'No payment method is available for every item in this cart.';
  }
  if (submit) submit.disabled = !selected;
  elements.onlinePaymentBox.classList.toggle('hidden', selected?.value !== 'Online Payment');
}

function buildOrderData(formData) {
  const orderItems = state.cart.map((entry) => {
    const product = getProductById(entry.productId);
    return {
      productId: entry.productId,
      name: product ? product.name : 'Unknown',
      price: product ? product.salePrice : 0,
      quantity: entry.quantity,
      image: product ? product.imageUrls[0] : ''
    };
  });

  const subtotal = getCartTotal();
  const delivery = orderItems.length ? CONFIG.deliveryCharges : 0;
  const total = subtotal + delivery;

  return {
    orderNumber: generateOrderNumber(),
    customerName: formData.get('fullName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    city: formData.get('city'),
    address: formData.get('address'),
    notes: formData.get('notes') || '',
    paymentMethod: formData.get('paymentMethod'),
    items: orderItems,
    subtotal,
    delivery,
    total,
    orderDate: new Date().toISOString(),
    status: 'Order Received'
  };
}

function generateOrderNumber() {
  const storedOrders = JSON.parse(localStorage.getItem('sketchStoreOrders') || '[]');
  const numbers = storedOrders.map((order) => Number(order.orderNumber) || 0);
  const maxNumber = numbers.length ? Math.max(...numbers) : 99;
  return maxNumber + 1;
}

async function submitOrder(event) {
  event.preventDefault();
  if (state.cart.some((entry) => getProductById(entry.productId)?.availability === 'Out of Stock')) {
    showToast('Remove out-of-stock items from your cart before checkout');
    return;
  }
  const formData = new FormData(elements.checkoutForm);
  let order = buildOrderData(formData);
  const localPreview = window.location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(window.location.hostname);

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(order)
    });
    if (response.ok) {
      const result = await response.json();
      order = result.order;
    } else if (response.status === 404 && localPreview) {
      showToast('Local preview order only; deploy Netlify Functions for order management.');
    } else {
      const result = await response.json().catch(() => ({}));
      showToast(result.error || 'Order could not be accepted. Your cart is unchanged.');
      return;
    }
  } catch (error) {
    if (error.name !== 'TypeError' || !localPreview) {
      showToast('Order service is unavailable. Your cart is unchanged.');
      return;
    }
  }

  const allOrders = JSON.parse(localStorage.getItem('sketchStoreOrders') || '[]');
  allOrders.push(order);
  localStorage.setItem('sketchStoreOrders', JSON.stringify(allOrders));

  state.currentOrder = order;
  const delivery = order.items.length ? CONFIG.deliveryCharges : 0;
  const nextOrder = { ...order, delivery };

  localStorage.setItem('latestSketchOrder', JSON.stringify(nextOrder));

  state.cart = [];
  saveCart();
  renderCart();
  updateCartCount();
  closeCheckoutModal();
  showConfirmation(order);
  sendOrderEmails(order);
}

function sendOrderEmails(order) {
  const params = {
    order_id: `${order.orderNumber}`,
    payment_method: order.paymentMethod,
    customer: {
      full_name: order.customerName,
      phone: order.phone,
      email: order.email,
      city: order.city,
      address: order.address,
      instructions: order.notes || ''
    },
    cost: {
      subtotal: String(order.subtotal),
      shipping: String(order.delivery),
      total: String(order.total)
    },
    orders: order.items.map((item) => ({
      name: item.name,
      units: item.quantity,
      price: String(item.price * item.quantity)
    }))
  };

  window.__lastEmailParams = params;

  if (window.emailjs && typeof window.emailjs.send === 'function') {
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, params)
      .then(() => {
        showToast('Order email sent successfully');
      })
      .catch(() => {
        const customerSubject = encodeURIComponent(`Your order confirmation - ${CONFIG.storeName}`);
        const customerBody = encodeURIComponent(formatCustomerOrderEmail(order));
        const customerMailto = `mailto:${order.email}?subject=${customerSubject}&body=${customerBody}`;
        const ownerSubject = encodeURIComponent(`New Order Received`);
        const ownerBody = encodeURIComponent(formatOwnerOrderEmail(order));
        const ownerMailto = `mailto:${CONFIG.ownerEmail}?subject=${ownerSubject}&body=${ownerBody}`;
        setTimeout(() => {
          window.open(ownerMailto, '_blank', 'noopener,noreferrer');
          window.location.href = customerMailto;
        }, 200);
      });
    return;
  }

  const customerSubject = encodeURIComponent(`Your order confirmation - ${CONFIG.storeName}`);
  const customerBody = encodeURIComponent(formatCustomerOrderEmail(order));
  const customerMailto = `mailto:${order.email}?subject=${customerSubject}&body=${customerBody}`;
  const ownerSubject = encodeURIComponent(`New Order Received`);
  const ownerBody = encodeURIComponent(formatOwnerOrderEmail(order));
  const ownerMailto = `mailto:${CONFIG.ownerEmail}?subject=${ownerSubject}&body=${ownerBody}`;
  setTimeout(() => {
    window.open(ownerMailto, '_blank', 'noopener,noreferrer');
    window.location.href = customerMailto;
  }, 200);
}

function formatCustomerOrderEmail(order) {
  return [
    `Hello ${order.customerName},`,
    '',
    `Thank you for shopping with ${CONFIG.storeName}.`,
    `Your order #${order.orderNumber} has been confirmed.`,
    '',
    `Order Date: ${new Date(order.orderDate).toLocaleDateString()}`,
    `Payment Method: ${order.paymentMethod}`,
    `Total: ${formatPrice(order.total)}`,
    '',
    'Order Details:',
    ...order.items.map((item) => `- ${item.name} x ${item.quantity} (${formatPrice(item.price * item.quantity)})`),
    `Delivery: ${formatPrice(order.delivery)}`,
    '',
    `Shipping Address: ${order.address}, ${order.city}`,
    `Contact: ${order.phone}`,
    '',
    'Regards,',
    CONFIG.storeName
  ].join('\n');
}

function formatOwnerOrderEmail(order) {
  return [
    `New order received for ${CONFIG.storeName}.`,
    '',
    `Order Number: #${order.orderNumber}`,
    `Customer Name: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Email: ${order.email}`,
    `City: ${order.city}`,
    `Address: ${order.address}`,
    `Payment Method: ${order.paymentMethod}`,
    '',
    'Items:',
    ...order.items.map((item) => `- ${item.name} x ${item.quantity} (${formatPrice(item.price * item.quantity)})`),
    '',
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Delivery: ${formatPrice(order.delivery)}`,
    `Total: ${formatPrice(order.total)}`,
    '',
    `Customer Notes: ${order.notes || 'None'}`
  ].join('\n');
}

function showConfirmation(order) {
  elements.confirmationCustomerName.textContent = order.customerName;
  elements.confirmationTotal.textContent = formatPrice(order.total);
  elements.confirmationPaymentMethod.textContent = order.paymentMethod;

  elements.confirmationDetails.innerHTML = `
    <strong>Order details</strong><br />
    ${order.items.map((item) => `• ${escapeHtml(item.name)} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`).join('<br />')}<br />
    <br />
    <strong>Delivery:</strong> ${escapeHtml(order.address)}, ${escapeHtml(order.city)}<br />
    <strong>Phone:</strong> ${escapeHtml(order.phone)}<br />
    <strong>Status:</strong> ${escapeHtml(order.status)}
  `;

  elements.confirmationOverlay.classList.remove('hidden');

  const orderLink = `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hi, I need help with my order. ')}`;
  const orderBtn = document.getElementById('whatsappOrderBtn');
  orderBtn.href = orderLink;
}

function closeConfirmation() {
  elements.confirmationOverlay.classList.add('hidden');
}

function handleSearchFilters() {
  renderShopProducts();
}

function bindFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    button.addEventListener('click', () => {
      item.classList.toggle('active');
      const icon = button.querySelector('span');
      icon.textContent = item.classList.contains('active') ? '−' : '+';
    });
  });
}

function bindEvents() {
  elements.searchInput.addEventListener('input', handleSearchFilters);
  elements.categoryFilter.addEventListener('change', handleSearchFilters);
  elements.priceFilter.addEventListener('change', handleSearchFilters);
  elements.clearFilters.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.categoryFilter.value = 'all';
    elements.priceFilter.value = 'all';
    renderShopProducts();
  });

  document.addEventListener('click', (event) => {
    const addToCartButton = event.target.closest('.add-to-cart');
    if (addToCartButton) {
      addToCart(addToCartButton.dataset.productId);
    }

    const quickViewButton = event.target.closest('.quick-view');
    if (quickViewButton) {
      openProductModal(quickViewButton.dataset.productId);
    }

    const qtyButton = event.target.closest('.qty-btn');
    if (qtyButton) {
      const { productId, action } = qtyButton.dataset;
      updateCartItem(productId, action === 'increase' ? 1 : -1);
    }

    const removeButton = event.target.closest('.remove-item');
    if (removeButton) {
      removeFromCart(removeButton.dataset.productId);
    }

    const modalBuyNow = event.target.closest('#modalBuyNow');
    if (modalBuyNow) {
      const { selectedProduct } = state;
      if (selectedProduct) {
        addToCart(selectedProduct.id, 1, true);
        closeProductModal();
        openCheckoutModal();
      }
    }

    const modalAddToCart = event.target.closest('#modalAddToCart');
    if (modalAddToCart) {
      const { selectedProduct } = state;
      if (selectedProduct) {
        addToCart(selectedProduct.id);
      }
    }

    const sectionCategory = event.target.closest('[data-category]');
    if (sectionCategory) {
      const category = sectionCategory.dataset.category;
      elements.categoryFilter.value = category;
      renderShopProducts();
      const shopSection = document.getElementById('shop');
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (event.target.closest('#customSketchBtn') || event.target.closest('#customSketchCardBtn')) {
      const message = encodeURIComponent(CONFIG.customSketchMessage);
      const url = `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${message}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    if (event.target.closest('#cartToggle')) {
      elements.cartDrawer.classList.add('open');
    }

    if (event.target.closest('#closeCart') || event.target.closest('#continueShoppingBtn')) {
      elements.cartDrawer.classList.remove('open');
    }

    if (event.target.closest('#checkoutBtn')) {
      elements.cartDrawer.classList.remove('open');
      openCheckoutModal();
      scrollToCheckout();
    }

    if (event.target.closest('#closeCheckoutModal')) {
      closeCheckoutModal();
    }

    if (event.target.closest('#closeProductModal')) {
      closeProductModal();
    }

    if (event.target.closest('#backToHomeBtn')) {
      backToHome();
    }

    if (event.target.closest('#contactUsBtn')) {
      closeConfirmation();
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }

    if (event.target.closest('#searchTrigger')) {
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
      elements.searchInput.focus();
    }

    if (event.target.closest('#menuToggle')) {
      elements.mobileMenu.style.display = elements.mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    }

    const mobileLink = event.target.closest('.mobile-menu a');
    if (mobileLink) {
      elements.mobileMenu.style.display = 'none';
    }
  });

  elements.checkoutForm.addEventListener('submit', submitOrder);

  document.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const isOnline = radio.value === 'Online Payment' && radio.checked;
      elements.onlinePaymentBox.classList.toggle('hidden', !isOnline);
      refreshPaymentOptions();
    });
  });

  document.getElementById('closeProductModal').addEventListener('click', closeProductModal);
  document.getElementById('closeCheckoutModal').addEventListener('click', closeCheckoutModal);
  document.getElementById('closeCart').addEventListener('click', () => elements.cartDrawer.classList.remove('open'));
  document.getElementById('continueShoppingBtn').addEventListener('click', () => elements.cartDrawer.classList.remove('open'));
  document.getElementById('whatsappOrderBtn').addEventListener('click', () => {
    closeConfirmation();
  });

  document.getElementById('wishlistTrigger').addEventListener('click', () => {
    showToast('Wishlist feature ready for future extension');
  });

  const productModalOverlay = document.getElementById('productModalOverlay');
  productModalOverlay.addEventListener('click', (event) => {
    if (event.target === productModalOverlay) {
      closeProductModal();
    }
  });

  const checkoutModalOverlay = document.getElementById('checkoutModalOverlay');
  checkoutModalOverlay.addEventListener('click', (event) => {
    if (event.target === checkoutModalOverlay) {
      closeCheckoutModal();
    }
  });

  const confirmationOverlay = document.getElementById('confirmationOverlay');
  confirmationOverlay.addEventListener('click', (event) => {
    if (event.target === confirmationOverlay) {
      closeConfirmation();
    }
  });

  const imageViewer = document.getElementById('imageViewer');
  const imageViewerImage = document.getElementById('imageViewerImage');
  const closeImageViewer = () => {
    imageViewer.classList.add('hidden');
    imageViewerImage.classList.remove('zoomed');
  };
  elements.modalMainImage.addEventListener('click', () => {
    imageViewerImage.src = elements.modalMainImage.src;
    imageViewerImage.alt = elements.modalMainImage.alt;
    imageViewerImage.style.cssText = elements.modalMainImage.style.cssText;
    imageViewer.classList.remove('hidden');
  });
  imageViewerImage.addEventListener('click', () => imageViewerImage.classList.toggle('zoomed'));
  document.getElementById('closeImageViewer').addEventListener('click', closeImageViewer);
  imageViewer.addEventListener('click', (event) => {
    if (event.target === imageViewer) closeImageViewer();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeImageViewer();
  });
}

function initPaymentBox() {
  elements.jazzCashDetails.textContent = CONFIG.jazzCashDetails;
  elements.nayapayDetails.textContent = CONFIG.nayapayDetails;
}

function initLoader() {
  setTimeout(() => {
    elements.loaderOverlay.classList.add('hidden');
  }, 900);
}

async function start() {
  await loadSiteContent();
  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  renderFeaturedProducts();
  renderShopProducts();
  renderCart();
  updateCartCount();
  bindFAQ();
  bindEvents();
  initPaymentBox();
  initLoader();
}

window.addEventListener('DOMContentLoaded', () => start().catch((error) => {
  console.error('Store initialization failed:', error);
  initLoader();
}));
