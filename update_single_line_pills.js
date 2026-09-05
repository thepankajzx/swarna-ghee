const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

const pillGlobalRules = `
/* ==========================================================================
   GLOBAL STRICT SINGLE-LINE RULE FOR ALL PILLS, BADGES, TAGS & CHIPS
   ========================================================================== */
.pdp-capsule-badge,
.herb-pill,
.marquee-pill-item,
.m-rating-pill,
.m-discount-tag,
.m-variant-pill,
.pdp-discount-pill,
.free-badge-green,
.drawer-pill-btn,
.comp-badge,
.math-badge,
.hero-trust-chip,
.section-tag,
.himalayan-tag,
.comparison-tag,
.heals-section-tag,
.makers-tag,
.archive-filter-pill,
.category-story-label {
  white-space: nowrap !important;
  display: inline-flex !important;
  align-items: center !important;
  flex-shrink: 0 !important;
}

/* Specific PDP Spec Capsule Badge (100% Vedic Bilona) */
.pdp-spec-badge-row {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  margin-bottom: 12px !important;
  flex-wrap: wrap !important;
}

.pdp-capsule-badge {
  border: 1px solid #cbd5e1 !important;
  border-radius: 9999px !important;
  padding: 4px 10px !important;
  font-size: clamp(0.56rem, 2.2vw, 0.72rem) !important;
  font-weight: 700 !important;
  color: #334155 !important;
  letter-spacing: 0.02em !important;
  background: #ffffff !important;
  line-height: 1.2 !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}

.pdp-sku-text {
  font-size: clamp(0.62rem, 2vw, 0.72rem) !important;
  color: #64748b !important;
  font-weight: 600 !important;
  white-space: nowrap !important;
}

@media (max-width: 480px) {
  .pdp-capsule-badge {
    font-size: 0.6rem !important;
    padding: 3px 8px !important;
    letter-spacing: 0 !important;
  }
  .drawer-pill-btn {
    font-size: 0.68rem !important;
    padding: 6px 8px !important;
  }
  .herb-pill {
    font-size: 0.62rem !important;
    padding: 3px 8px !important;
  }
  .comp-badge {
    font-size: 0.62rem !important;
    padding: 4px 8px !important;
  }
}
`;

css += '\n' + pillGlobalRules;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended single-line pill rules to styles.css');
