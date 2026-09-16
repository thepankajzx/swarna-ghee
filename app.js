
// Global Bag Drawer Helpers
window.openCart = function() {
  if (typeof window.syncCartAndRender === 'function') {
    window.syncCartAndRender();
  }
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  if (cartDrawer) cartDrawer.classList.add('active');
  if (cartOverlay) cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeCart = function() {
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  if (cartDrawer) cartDrawer.classList.remove('active');
  if (cartOverlay) cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
};

// Global Nav Drawer Helpers
window.openNavDrawer = function() {
  const navDrawer = document.getElementById('nav-drawer');
  const navOverlay = document.getElementById('nav-drawer-overlay');
  if (navDrawer) navDrawer.classList.add('active');
  if (navOverlay) navOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeNavDrawer = function() {
  const navDrawer = document.getElementById('nav-drawer');
  const navOverlay = document.getElementById('nav-drawer-overlay');
  if (navDrawer) navDrawer.classList.remove('active');
  if (navOverlay) navOverlay.classList.remove('active');
  document.body.style.overflow = '';
};
/* ==========================================================================
   Swarna - INTERACTIVE FUNCTIONALITY (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial State & Elements
  const state = {
    cart: JSON.parse(localStorage.getItem('swarna_cart') || '[]'),
    selectedProductVariant: {
      id: 'a2-bilona-ghee-500ml',
      name: 'Organic Bilona A2 Gir Cow Ghee',
      size: '500ml',
      price: 1099,
      originalPrice: 1400,
      image: './images/swarna-500ml.jpg'
    },
    heroQty: 1
  };

  const productVariants = {
    '250ml': {
      id: 'a2-bilona-ghee-250ml',
      name: 'Organic Bilona A2 Gir Cow Ghee',
      size: '250ml',
      price: 599,
      originalPrice: 750,
      image: './images/swarna-500ml.jpg',
      discount: '20% OFF'
    },
    '500ml': {
      id: 'a2-bilona-ghee-500ml',
      name: 'Organic Bilona A2 Gir Cow Ghee',
      size: '500ml',
      price: 1099,
      originalPrice: 1400,
      image: './images/swarna-500ml.jpg',
      discount: '21% OFF'
    },
    '1000ml': {
      id: 'a2-bilona-ghee-1000ml',
      name: 'Organic Bilona A2 Gir Cow Ghee',
      size: '1000ml (1 Litre)',
      price: 1999,
      originalPrice: 2500,
      image: './images/swarna-500ml.jpg',
      discount: '20% OFF'
    }
  };

  
  // Atelier-Style Navigation Drawer Controller
  const navDrawer = document.getElementById('nav-drawer');
  const navOverlay = document.getElementById('nav-drawer-overlay');
  const navCloseBtn = document.getElementById('nav-drawer-close');
  const navToggles = document.querySelectorAll('.mobile-menu-toggle');

  function openNavDrawer() {
    if (navDrawer && navOverlay) {
      navDrawer.classList.add('active');
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeNavDrawer() {
    if (navDrawer && navOverlay) {
      navDrawer.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  navToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openNavDrawer();
    });
  });

  if (navCloseBtn) navCloseBtn.addEventListener('click', closeNavDrawer);
  if (navOverlay) navOverlay.addEventListener('click', closeNavDrawer);

  // Theme switcher in drawer
  const themeDay = document.getElementById('theme-day');
  const themeNight = document.getElementById('theme-night');
  if (themeDay && themeNight) {
    themeDay.addEventListener('click', () => {
      themeDay.classList.add('active');
      themeNight.classList.remove('active');
      document.body.classList.remove('dark-theme');
    });
    themeNight.addEventListener('click', () => {
      themeNight.classList.add('active');
      themeDay.classList.remove('active');
      document.body.classList.add('dark-theme');
    });
  }

    // Close on click outside or on nav links
    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        const mainNav = document.querySelector('.main-nav');
        if (mainNav) mainNav.classList.remove('active');
      });
    });

  // 3. Product Variant Selector (Hero Showcase)
  const sizeButtons = document.querySelectorAll('.size-btn');
  const priceCurrent = document.getElementById('product-price-val');
  const priceOriginal = document.getElementById('product-price-orig');
  const priceDiscount = document.getElementById('product-price-disc');
  const heroQtyVal = document.getElementById('hero-qty-val');
  const heroQtyMinus = document.getElementById('hero-qty-minus');
  const heroQtyPlus = document.getElementById('hero-qty-plus');

  if (sizeButtons.length > 0) {
    sizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const size = btn.getAttribute('data-size');
        const variant = productVariants[size];
        if (variant) {
          state.selectedProductVariant = variant;
          if (priceCurrent) priceCurrent.textContent = '₹' + variant.price.toLocaleString('en-IN');
          if (priceOriginal) priceOriginal.textContent = '₹' + variant.originalPrice.toLocaleString('en-IN');
          if (priceDiscount) priceDiscount.textContent = variant.discount;
        }
      });
    });
  }

  // Hero Quantity Selector
  if (heroQtyMinus && heroQtyPlus && heroQtyVal) {
    heroQtyMinus.addEventListener('click', () => {
      if (state.heroQty > 1) {
        state.heroQty--;
        heroQtyVal.textContent = state.heroQty;
      }
    });
    heroQtyPlus.addEventListener('click', () => {
      state.heroQty++;
      heroQtyVal.textContent = state.heroQty;
    });
  }

  // 4. Cart State Management
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartCountBadges = document.querySelectorAll('.cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotalVal = document.getElementById('cart-subtotal-val');
  const checkoutBtn = document.getElementById('checkout-btn');

  function saveCart() {
    try {
      localStorage.setItem('swarna_cart', JSON.stringify(state.cart));
    } catch (e) {}
    updateCartUI();
  }

  function updateCartUI() {
    try {
      const saved = localStorage.getItem('swarna_cart');
      if (saved) {
        state.cart = JSON.parse(saved);
      }
    } catch (e) {}

    const totalCount = state.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
    });

    const bodyContainer = document.getElementById('cart-drawer-body') || document.getElementById('cart-items');
    if (!bodyContainer) return;

    if (!state.cart || state.cart.length === 0) {
      bodyContainer.innerHTML = `
        <div class="cart-empty-card">
          <div class="cart-empty-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 6px;">Your Bag is empty</h3>
          <p style="color: #64748b; font-size: 0.84rem; line-height: 1.4; margin-bottom: 18px;">Discover 100% pure Vedic A2 Bilona Ghee handcrafted in brass & clay vessels.</p>
          <button class="btn btn-primary" style="width: 100%; border-radius: 24px; padding: 12px;" onclick="window.closeCart(); location.href='index.html#shop-collection'">+ EXPLORE DROPS</button>
        </div>
      `;
      return;
    }

    let subtotal = 0;
    state.cart.forEach(item => {
      const price = Number(item.price) || 1099;
      const qty = Number(item.quantity) || 1;
      subtotal += price * qty;
    });

    bodyContainer.innerHTML = `
      <!-- Card 1: Items In Bag -->
      <div class="cart-section-card">
        <div class="cart-card-header">
          <span class="cart-items-count-text">${totalCount} ${totalCount === 1 ? 'ITEM' : 'ITEMS'} IN YOUR BAG</span>
          <a href="index.html#shop-collection" class="add-more-drops-link" onclick="window.closeCart();">+ ADD MORE DROPS</a>
        </div>
        <div class="cart-card-divider"></div>
        
        <div class="cart-items-list">
          ${state.cart.map((item, index) => {
            const itemPrice = Number(item.price) || 1099;
            const itemQty = Number(item.quantity) || 1;
            const itemTotal = itemPrice * itemQty;
            const itemImg = item.image || './images/swarna-500ml.jpg';
            const itemSize = item.size ? item.size.toUpperCase() : '500ML';
            return `
              <div class="atelier-cart-item">
                <div class="cart-item-thumb">
                  <img src="${itemImg}" alt="${item.name || 'Pure A2 Ghee'}" onerror="this.src='./images/swarna-500ml.jpg'" />
                </div>
                <div class="atelier-item-details">
                  <h4 class="atelier-item-title">${(item.name || 'ORGANIC BILONA A2 GIR COW GHEE').toUpperCase()}</h4>
                  <div class="atelier-item-meta">A2 BILONA &bull; SIZE: ${itemSize}</div>
                  <div class="atelier-item-sub">Cultured Curd Butter &bull; Glass Jar</div>
                  <div class="atelier-item-price">₹${itemTotal.toLocaleString('en-IN')}</div>
                  
                  <div class="atelier-item-actions-row">
                    <div class="atelier-qty-pill">
                      <button type="button" class="qty-pill-btn" onclick="window.changeCartQty(${index}, -1)">−</button>
                      <span class="qty-pill-num">${itemQty}</span>
                      <button type="button" class="qty-pill-btn" onclick="window.changeCartQty(${index}, 1)">+</button>
                    </div>
                    <button type="button" class="save-for-later-btn" onclick="window.removeCartItem(${index})">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Card 2: Order Summary -->
      <div class="cart-section-card summary-card">
        <h3 class="summary-card-title">ORDER SUMMARY</h3>
        
        <div class="summary-line-row">
          <span>Items Subtotal (${totalCount} ${totalCount === 1 ? 'item' : 'items'})</span>
          <span style="font-weight: 700; color: #0f172a;">₹${subtotal.toLocaleString('en-IN')}</span>
        </div>
        
        <div class="summary-line-row">
          <span>Pan-India Shipping</span>
          <span class="free-badge-green">FREE</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-total-row">
          <span class="total-label">TOTAL AMOUNT</span>
          <span class="total-val">₹${subtotal.toLocaleString('en-IN')}</span>
        </div>

        <!-- Big Green Buy Button -->
        <button type="button" class="atelier-green-buy-btn" onclick="window.location.href='checkout.html';">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span>BUY / CONFIRM ORDER</span>
        </button>
      </div>
    `;
  }

  window.syncCartAndRender = () => {
    try {
      const saved = localStorage.getItem('swarna_cart');
      state.cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
      state.cart = [];
    }
    updateCartUI();
  };

  window.changeCartQty = (index, delta) => {
    if (state.cart && state.cart[index]) {
      state.cart[index].quantity = (Number(state.cart[index].quantity) || 1) + delta;
      if (state.cart[index].quantity <= 0) {
        state.cart.splice(index, 1);
      }
      saveCart();
    }
  };

  window.removeCartItem = (index) => {
    if (state.cart && state.cart[index]) {
      state.cart.splice(index, 1);
      saveCart();
      showToast('Item removed from cart');
    }
  };

  window.addToCart = (product, qty = 1) => {
    try {
      const saved = localStorage.getItem('swarna_cart');
      if (saved) state.cart = JSON.parse(saved);
    } catch (e) {}

    const existingIndex = state.cart.findIndex(i => i.id === product.id && i.size === product.size);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity = (Number(state.cart[existingIndex].quantity) || 1) + qty;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        size: product.size,
        price: Number(product.price) || 1099,
        image: product.image,
        quantity: qty
      });
    }
    saveCart();
    showToast(`Added ${qty} jar${qty > 1 ? 's' : ''} to your bag!`);
    window.openCart();
  };

  // Add to cart from Hero Section
  const heroAddToCartBtn = document.getElementById('hero-add-to-cart');
  if (heroAddToCartBtn) {
    heroAddToCartBtn.addEventListener('click', () => {
      window.addToCart(state.selectedProductVariant, state.heroQty);
    });
  }

  const heroBuyNowBtn = document.getElementById('hero-buy-now');
  if (heroBuyNowBtn) {
    heroBuyNowBtn.addEventListener('click', () => {
      window.addToCart(state.selectedProductVariant, state.heroQty);
      window.location.href = 'checkout.html';
    });
  }

  if (cartBtn) cartBtn.addEventListener('click', window.openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', window.closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', window.closeCart);

  // 5. Toast Notification System
  let toastTimeout;
  function showToast(msg) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-svg"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg> ${msg}`;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-question');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(f => f.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 7. Quick Checkout Modal Simulation
  const checkoutModal = document.getElementById('checkout-modal');
  const closeCheckoutModalBtn = document.getElementById('close-checkout-modal');
  const checkoutForm = document.getElementById('checkout-form');
  const orderSuccessCard = document.getElementById('order-success-message');

  function openCheckoutModal() {
    closeCart();
    window.location.href = 'checkout.html';
  }

  function closeCheckoutModal() {
    if (checkoutModal) {
      checkoutModal.classList.remove('active');
      document.body.style.overflow = '';
      if (orderSuccessCard) orderSuccessCard.style.display = 'none';
      if (checkoutForm) checkoutForm.style.display = 'block';
    }
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', openCheckoutModal);
  }
  if (closeCheckoutModalBtn) {
    closeCheckoutModalBtn.addEventListener('click', closeCheckoutModal);
  }
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const customerName = document.getElementById('cust-name').value.trim();
      const customerPhone = document.getElementById('cust-phone').value.trim();
      const customerAddress = document.getElementById('cust-address').value.trim();
      const payMethodRadio = document.querySelector('input[name="pay-method"]:checked');
      const payMethod = payMethodRadio ? (payMethodRadio.value === 'COD' ? 'Cash on Delivery (COD) [+₹25 fee]' : 'Direct UPI / Online Transfer') : 'Cash on Delivery (COD)';

      // Determine Items Ordered (From Cart or Selected PDP Variant)
      let itemsListText = '';
      let grandTotal = 0;

      if (state.cart && state.cart.length > 0) {
        state.cart.forEach((item, idx) => {
          const itemCost = item.price * item.quantity;
          grandTotal += itemCost;
          itemsListText += `• ${item.name} (${item.size || '500ml'}) × ${item.quantity} = ₹${itemCost.toLocaleString('en-IN')}\n`;
        });
      } else {
        const fallback = (typeof window.getCurrentVariant === 'function') ? window.getCurrentVariant() : {
          name: 'Organic Bilona A2 Gir Cow Ghee',
          size: '500ml',
          price: 1099
        };
        grandTotal = fallback.price;
        itemsListText = `• ${fallback.name} (${fallback.size}) × 1 = ₹${fallback.price.toLocaleString('en-IN')}\n`;
      }

      const orderRefId = 'SWARNA-' + Math.floor(100000 + Math.random() * 900000);

      // Construct Custom WhatsApp Message with order details
      const waMessage = 
`🛍️ *NEW SWARNA PURE A2 GHEE ORDER*
*Ref ID:* ${orderRefId}
----------------------------------------
*📦 ORDERED ITEMS:*
${itemsListText}
*💰 Total Amount:* ₹${grandTotal.toLocaleString('en-IN')}
*🚚 Delivery:* Free Express Dispatch from HP
----------------------------------------
*👤 Customer Name:* ${customerName}
*📱 Mobile:* ${customerPhone}
*📍 Delivery Address:* ${customerAddress}
*💳 Payment Mode:* ${payMethod}
----------------------------------------
_For 100% Safe Delivery & Verified Transaction, please confirm my order!_`;

      const waUrl = `https://wa.me/917018168156?text=${encodeURIComponent(waMessage)}`;

      // Clear cart
      state.cart = [];
      saveCart();

      // Show instant confirmation & open WhatsApp
      checkoutForm.style.display = 'none';
      if (orderSuccessCard) {
        orderSuccessCard.style.display = 'block';
        const nameEl = document.getElementById('order-cust-name');
        const refEl = document.getElementById('order-id-val');
        if (nameEl) nameEl.textContent = customerName;
        if (refEl) refEl.textContent = orderRefId;
        
        // Add direct WhatsApp trigger button to success card
        orderSuccessCard.innerHTML = `
          <div style="margin-bottom: 14px; display: flex; justify-content: center;">
            <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h3 style="color: #0f172a; font-size: 1.5rem; font-weight: 800; margin-bottom: 6px;">Opening WhatsApp...</h3>
          <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 18px;">Connecting you directly with Swarna Founders on WhatsApp with your pre-filled order details.</p>
          <a href="${waUrl}" target="_blank" class="whatsapp-order-btn" style="text-decoration: none; margin-bottom: 12px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
            <span>Open WhatsApp Chat Directly</span>
          </a>
          <button class="btn btn-primary" style="width: 100%; margin-top: 8px;" onclick="location.href='index.html'">Continue Browsing</button>
        `;
      }

      // Auto redirect to WhatsApp
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 300);
    });
  }

  // 8. Contact Form Handler (for contact page)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent to Swarna.');
      contactForm.reset();
    });
  }

  // 9. Newsletter Subscriber
  const newsletterForms = document.querySelectorAll('.newsletter-box');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to Swarna updates!');
      form.reset();
    });
  });

  // Initial render
  updateCartUI();
});


// Mobile-First Sticky Bar & Touch Handlers
window.getCurrentVariant = () => {
  return (typeof state !== 'undefined' && state.selectedProductVariant) ? state.selectedProductVariant : {
    id: 'a2-bilona-ghee-500ml',
    name: 'Organic Bilona A2 Gir Cow Ghee',
    size: '500ml',
    price: 1099,
    image: './images/swarna-500ml.jpg'
  };
};

window.quickBuyMobile = () => {
  const variant = window.getCurrentVariant();
  window.addToCart(variant, 1);
  const checkoutModal = document.getElementById('checkout-modal');
  if (checkoutModal) {
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

function syncMobileBar() {
  const mPrice = document.getElementById('mobile-bar-price-val');
  const mSize = document.getElementById('mobile-bar-size-val');
  const variant = window.getCurrentVariant();
  if (mPrice && variant) {
    mPrice.textContent = '₹' + variant.price.toLocaleString('en-IN');
  }
  if (mSize && variant) {
    mSize.textContent = variant.size + ' Jar';
  }
}

document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(syncMobileBar, 50);
  });
});

// ==========================================================================
// Atelier 3D Coverflow Carousel Controller
// ==========================================================================
function initAtelierCarousel() {
  const wrapper = document.getElementById('carousel-wrapper');
  const cards = document.querySelectorAll('.carousel-card');
  const dots = document.querySelectorAll('.c-dot');
  if (!wrapper || cards.length === 0) return;

  function updateActiveCard() {
    const wrapperCenter = wrapper.getBoundingClientRect().left + wrapper.offsetWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(wrapperCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    cards.forEach((card, i) => {
      if (i === closestIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === closestIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  wrapper.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveCard);
  }, { passive: true });

  window.scrollCarouselToIndex = function(index) {
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  // Initial call
  setTimeout(updateActiveCard, 100);
}

document.addEventListener('DOMContentLoaded', () => {
  initAtelierCarousel();
});

// ==========================================================================
// 3D COVERFLOW CAROUSEL CLASS (USER SPECIFIED)
// ==========================================================================
class CoverflowCarousel {
  constructor(containerId, items) {
    this.container = document.getElementById(containerId);
    this.items = items || [];
    this.currentIndex = 0;
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.hasMoved = false;
    this.autoPlayTimer = null;
    if (this.container && this.items.length > 0) {
      this.init();
    }
  }
  init() {
    this.render();
    this.updateSlides();
    this.attachEvents();
    this.startAutoPlay();
  }
  render() {
    this.container.innerHTML = `
      <section class="hero-showcase-section">
        <div class="coverflow-stage" id="coverflow-stage">
          <!-- Left Arrow -->
          <button class="coverflow-side-btn left" id="coverflow-prev" aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div class="coverflow-track" id="coverflow-track">
            ${this.items.map((item, idx) => `
              <div class="coverflow-slide" data-index="${idx}" data-link="${item.link || '#'}">
                <div class="coverflow-card-inner">
                  ${item.isDiagram ? `
                    <div class="coverflow-diagram-card">
                      <div class="diagram-bg-radial"></div>
                      <div class="diagram-top-pill">✦ VEDIC BILONA CYCLE ✦</div>
                      <div class="diagram-main-circle">
                        <div class="d-circle-center">
                          <span class="d-circle-icon">✨</span>
                          <span class="d-circle-text">Swarna<br>Pure Ghee</span>
                        </div>
                        <div class="d-orbit-node node-top">
                          <span class="d-node-icon">🏔️</span>
                          <span class="d-node-title">Gir Cow</span>
                        </div>
                        <div class="d-orbit-node node-right">
                          <span class="d-node-icon">🏺</span>
                          <span class="d-node-title">Curd</span>
                        </div>
                        <div class="d-orbit-node node-bottom">
                          <span class="d-node-icon">🔥</span>
                          <span class="d-node-title">Slow Fire</span>
                        </div>
                        <div class="d-orbit-node node-left">
                          <span class="d-node-icon">🪵</span>
                          <span class="d-node-title">Bilona</span>
                        </div>
                      </div>
                      <div class="diagram-footer-stats">
                        <div class="d-stat-pill"><strong>12+</strong> Households</div>
                        <div class="d-stat-pill"><strong>0%</strong> Chem</div>
                        <div class="d-stat-pill"><strong>A2</strong> Pure</div>
                      </div>
                    </div>
                  ` : `
                    <img src="${item.image}" alt="${item.title}" class="coverflow-img">
                  `}
                  <div class="slide-overlay-info">
                    <div class="slide-info-left">
                      <div class="slide-title">${item.title}</div>
                      <div class="slide-category">${item.subtitle || ''}</div>
                    </div>
                    <div class="slide-info-right">
                      <div class="slide-price-current">${item.price || ''}</div>
                      ${item.mrp ? `<div class="slide-price-mrp">${item.mrp}</div>` : ''}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <!-- Right Arrow -->
          <button class="coverflow-side-btn right" id="coverflow-next" aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </section>
    `;
  }
  attachEvents() {
    const prevBtn = document.getElementById('coverflow-prev');
    const nextBtn = document.getElementById('coverflow-next');
    const stage = document.getElementById('coverflow-stage');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stopAutoPlay();
        this.prev();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stopAutoPlay();
        this.next();
      });
    }
    if (stage) {
      // Tap / Click handling for mobile & desktop
      stage.addEventListener('click', (e) => {
        const slide = e.target.closest('.coverflow-slide');
        if (slide) {
          const idx = parseInt(slide.dataset.index, 10);
          if (idx === this.currentIndex) {
            if (slide.dataset.link && slide.dataset.link !== '#') {
              window.location.href = slide.dataset.link;
            }
          } else {
            this.stopAutoPlay();
            this.goTo(idx);
          }
        }
      });
      // Touch Handling with tap vs drag distinction
      stage.addEventListener('touchstart', (e) => {
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        this.currentX = this.startX;
        this.hasMoved = false;
        this.stopAutoPlay();
      }, { passive: true });
      stage.addEventListener('touchmove', (e) => {
        if (!this.isDragging) return;
        this.currentX = e.touches[0].clientX;
        if (Math.abs(this.startX - this.currentX) > 12) {
          this.hasMoved = true;
        }
      }, { passive: true });
      stage.addEventListener('touchend', () => {
        if (!this.isDragging) return;
        this.isDragging = false;
        if (this.hasMoved) {
          const diff = this.startX - this.currentX;
          if (Math.abs(diff) > 30) {
            diff > 0 ? this.next() : this.prev();
          }
        }
      });
      stage.addEventListener('mouseenter', () => this.stopAutoPlay());
      stage.addEventListener('mouseleave', () => this.startAutoPlay());
    }
  }
  updateSlides() {
    const slides = this.container.querySelectorAll('.coverflow-slide');
    const total = this.items.length;
    slides.forEach((slide, idx) => {
      slide.className = 'coverflow-slide';
      const diff = (idx - this.currentIndex + total) % total;
      if (diff === 0) slide.classList.add('active');
      else if (diff === 1) slide.classList.add('next-1');
      else if (diff === 2) slide.classList.add('next-2');
      else if (diff === total - 1) slide.classList.add('prev-1');
      else if (diff === total - 2) slide.classList.add('prev-2');
      else slide.classList.add('hidden-offscreen');
    });
  }
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateSlides();
  }
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateSlides();
  }
  goTo(idx) {
    this.currentIndex = idx;
    this.updateSlides();
  }
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => this.next(), 4000);
  }
  stopAutoPlay() {
    if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
  }
}
// Initialize Coverflow Carousel with Pure Swarna Ghee Jars dynamically
document.addEventListener('DOMContentLoaded', () => {
  const customContainer = document.getElementById('my-custom-carousel');
  if (customContainer) {
    fetch('/api/products').catch(() => fetch('products.json'))
      .then(res => res.json())
      .then(data => {
        const swarnaProducts = data.products
          .filter(p => p.visible !== false)
          .map(p => ({
            title: p.title.toUpperCase() + (p.title.includes(p.subtitle.split(' ')[0]) ? '' : ` (${p.subtitle.split(' ')[0]})`),
            subtitle: p.subtitle,
            price: `₹${p.price.toLocaleString()}`,
            mrp: `₹${p.mrp.toLocaleString()}`,
            image: p.image,
            link: p.link
          }));

        // Fallback if not enough products for a cool coverflow
        if (swarnaProducts.length < 5) {
          swarnaProducts.push({
          title: "VEDIC BILONA PROCESS",
          subtitle: "100% Curd Churned Heritage",
          price: "Explore →",
          mrp: "",
          isDiagram: true,
          link: "about.html"
        });
        }
        new CoverflowCarousel('my-custom-carousel', swarnaProducts);
      })
      .catch(err => {
        console.error('Failed to load products for carousel', err);
        // Fallback hardcoded data in case server fails
        const fallback = [
          { title: "A2 BILONA GHEE (500ML)", subtitle: "Cultured Curd Butter", price: "₹1,099", mrp: "₹1,400", image: "./images/swarna-500ml.jpg", link: "product.html?size=500ml" },
          { title: "1000ML VALUE PACK", subtitle: "100% Pure Gir Cow", price: "₹1,999", mrp: "₹2,500", image: "./images/swarna-1000ml.jpg", link: "product.html?size=1000ml" },
          { title: "250ML STARTER PACK", subtitle: "Brass Simmered", price: "₹599", mrp: "₹750", image: "./images/swarna-250ml.jpg", link: "product.html?size=250ml" },
          { title: "GOLDEN DANEDAR GHEE", subtitle: "Vedic Churned", price: "₹1,399", mrp: "₹1,800", image: "./images/swarna-250ml.jpg", link: "product.html?size=500ml" },
          { title: "VEDIC BILONA PROCESS", subtitle: "100% Curd Churned", price: "Explore →", mrp: "", isDiagram: true, link: "about.html" }
        ];
        new CoverflowCarousel('my-custom-carousel', fallback);
      });
  }
});



// ── Draggable & Expandable WhatsApp Concierge Logic ──
(function initDraggableWhatsApp() {
  function setup() {
    const widget = document.getElementById('swarna-wa-widget');
    const trigger = document.getElementById('swarna-wa-trigger');
    if (!widget || !trigger) return;

    let isDragging = false;
    let hasMoved = false;
    let startX, startY;
    let initialLeft, initialTop;

    function onStart(e) {
      const point = e.touches ? e.touches[0] : e;
      startX = point.clientX;
      startY = point.clientY;
      hasMoved = false;
      isDragging = true;

      const rect = widget.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      widget.style.right = 'auto';
      widget.style.bottom = 'auto';
      widget.style.left = initialLeft + 'px';
      widget.style.top = initialTop + 'px';
    }

    function onMove(e) {
      if (!isDragging) return;
      const point = e.touches ? e.touches[0] : e;
      const deltaX = point.clientX - startX;
      const deltaY = point.clientY - startY;

      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        hasMoved = true;
        if (e.cancelable) e.preventDefault();
      }

      if (hasMoved) {
        const maxX = window.innerWidth - widget.offsetWidth - 10;
        const maxY = window.innerHeight - widget.offsetHeight - 10;
        const newX = Math.max(10, Math.min(maxX, initialLeft + deltaX));
        const newY = Math.max(10, Math.min(maxY, initialTop + deltaY));

        widget.style.left = newX + 'px';
        widget.style.top = newY + 'px';
      }
    }

    function onEnd() {
      if (!isDragging) return;
      isDragging = false;

      if (hasMoved) {
        // Snap smoothly to closest edge
        const rect = widget.getBoundingClientRect();
        const midX = window.innerWidth / 2;
        widget.style.transition = 'left 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)';
        if (rect.left + rect.width / 2 < midX) {
          widget.style.left = '16px';
        } else {
          widget.style.left = (window.innerWidth - widget.offsetWidth - 16) + 'px';
        }
        setTimeout(() => { widget.style.transition = ''; }, 300);
        return;
      }

      // Tap Interaction:
      if (widget.classList.contains('collapsed')) {
        // Expand
        widget.classList.remove('collapsed');
        widget.classList.add('expanded');
      } else {
        // Open WhatsApp
        const waUrl = "https://wa.me/917018168156?text=Hello%20Swarna%20Care,%20I%20need%20help%20with%20my%20order%20or%20products.";
        window.open(waUrl, '_blank');
      }
    }

    trigger.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    trigger.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);

    // Auto-collapse when clicking outside
    document.addEventListener('click', (e) => {
      if (!widget.contains(e.target) && widget.classList.contains('expanded')) {
        widget.classList.remove('expanded');
        widget.classList.add('collapsed');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
