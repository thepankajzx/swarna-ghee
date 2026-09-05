const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

const cardBadgeFixCSS = `
/* ==========================================================================
   PRODUCT CARD PILLS FIX (ZERO CLIPPING / BEAUTIFUL LUXURY PLACEMENT)
   ========================================================================== */
.m-card-image-wrap {
  position: relative !important;
}

/* Variant / Promo Pill (Top-Left on Image) */
.m-variant-pill {
  position: absolute !important;
  top: 8px !important;
  left: 8px !important;
  background: rgba(255, 255, 255, 0.96) !important;
  backdrop-filter: blur(6px) !important;
  -webkit-backdrop-filter: blur(6px) !important;
  padding: 3px 8px !important;
  border-radius: 9999px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
  font-size: 0.68rem !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  border: 1px solid rgba(0, 0, 0, 0.06) !important;
  z-index: 6 !important;
  white-space: nowrap !important;
}

.m-variant-pill .m-dot {
  width: 6px !important;
  height: 6px !important;
  border-radius: 50% !important;
  background: #10b981 !important;
  flex-shrink: 0 !important;
}

/* Rating Pill (Bottom-Left on Image) */
.m-card-bottom-badges {
  position: absolute !important;
  bottom: 8px !important;
  left: 8px !important;
  right: auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  z-index: 6 !important;
  pointer-events: none !important;
}

.m-rating-pill {
  background: rgba(255, 255, 255, 0.96) !important;
  backdrop-filter: blur(6px) !important;
  -webkit-backdrop-filter: blur(6px) !important;
  padding: 3px 8px !important;
  border-radius: 9999px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
  font-size: 0.7rem !important;
  font-weight: 700 !important;
  color: #1e293b !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  border: 1px solid rgba(0, 0, 0, 0.06) !important;
  white-space: nowrap !important;
}

.m-rating-pill svg {
  width: 11px !important;
  height: 11px !important;
}

@media (max-width: 480px) {
  .m-variant-pill {
    top: 6px !important;
    left: 6px !important;
    padding: 2px 7px !important;
    font-size: 0.62rem !important;
  }
  .m-card-bottom-badges {
    bottom: 6px !important;
    left: 6px !important;
  }
  .m-rating-pill {
    padding: 2px 7px !important;
    font-size: 0.65rem !important;
  }
}
`;

css += '\n' + cardBadgeFixCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended product card badge fix to styles.css');
