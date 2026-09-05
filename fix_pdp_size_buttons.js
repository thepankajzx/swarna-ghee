const fs = require('fs');

// 1. Update styles.css with PDP Size Selector styles
let css = fs.readFileSync('styles.css', 'utf8');

const sizeBtnCSS = `
/* ==========================================================================
   PDP SIZE SELECTOR BUTTONS (LUXURY ATELIER STYLE)
   ========================================================================== */
.pdp-option-group {
  margin: 20px 0 16px;
}

.pdp-option-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.pdp-label-bold {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0f172a;
}

.pdp-selected-sub {
  font-size: 0.74rem;
  color: #64748b;
  font-weight: 500;
}

.pdp-size-selector {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.pdp-size-btn {
  flex: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 12px 14px !important;
  background: #ffffff !important;
  border: 1.5px solid #cbd5e1 !important;
  border-radius: 12px !important;
  font-size: 0.88rem !important;
  font-weight: 700 !important;
  color: #1e293b !important;
  cursor: pointer !important;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04) !important;
  text-align: center !important;
  white-space: nowrap !important;
  outline: none !important;
}

.pdp-size-btn:hover {
  border-color: #d4af37 !important;
  background: #fffdfa !important;
  transform: translateY(-1px) !important;
}

.pdp-size-btn.active {
  background: #0f172a !important;
  color: #ffffff !important;
  border-color: #0f172a !important;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25) !important;
}

@media (max-width: 480px) {
  .pdp-size-selector {
    gap: 8px !important;
  }
  .pdp-size-btn {
    padding: 10px 8px !important;
    font-size: 0.8rem !important;
    border-radius: 10px !important;
  }
}
`;

css += '\n' + sizeBtnCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Added PDP Size Selector CSS to styles.css');

// 2. Fix Rupee Symbol in product.html
let prod = fs.readFileSync('product.html', 'utf8');
prod = prod.replace(/priceEl\.textContent\s*=\s*'(\?|&#8377;|₹)'\s*\+/g, "priceEl.textContent = '₹' +");
prod = prod.replace(/origPriceEl\.textContent\s*=\s*'(\?|&#8377;|₹)'\s*\+/g, "origPriceEl.textContent = '₹' +");
fs.writeFileSync('product.html', prod, 'utf8');
console.log('Fixed currency symbol in product.html');
