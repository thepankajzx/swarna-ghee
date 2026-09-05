const fs = require('fs');

// 1. Clean inline margin from product.html
let prod = fs.readFileSync('product.html', 'utf8');
prod = prod.replace('<div class="pdp-option-group" style="margin-top: 18px;">', '<div class="pdp-option-group">');
fs.writeFileSync('product.html', prod, 'utf8');
console.log('Removed inline margin from product.html');

// 2. Update styles.css with tight, cohesive spacing
let css = fs.readFileSync('styles.css', 'utf8');

const tightSpacingCSS = `
/* ==========================================================================
   TIGHT PDP SIZE & CTA SPACING (NO EXCESS GAP)
   ========================================================================== */
.pdp-option-group {
  margin: 12px 0 10px !important;
}

.pdp-option-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  margin-bottom: 6px !important;
}

.pdp-label-bold {
  font-size: 0.74rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  color: #0f172a !important;
}

.pdp-selected-sub {
  font-size: 0.72rem !important;
  color: #64748b !important;
}

.pdp-size-selector {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  width: 100% !important;
  margin-bottom: 0 !important;
}

.pdp-size-btn {
  padding: 10px 12px !important;
  font-size: 0.85rem !important;
  border-radius: 10px !important;
}

.pdp-cta-row {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 10px !important;
  width: 100% !important;
  margin-top: 10px !important;
}

@media (max-width: 480px) {
  .pdp-option-group {
    margin: 10px 0 8px !important;
  }
  .pdp-option-header {
    margin-bottom: 5px !important;
  }
  .pdp-cta-row {
    margin-top: 8px !important;
    gap: 8px !important;
  }
  .pdp-size-btn {
    padding: 9px 6px !important;
    font-size: 0.78rem !important;
  }
}
`;

css += '\n' + tightSpacingCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended tight PDP spacing to styles.css');
