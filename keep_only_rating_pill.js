const fs = require('fs');

const ratingPillHtml = (rating, reviews) => `            <div class="m-card-bottom-badges">
              <div class="m-rating-pill">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span class="m-rate-score">${rating}</span>
                <span class="m-divider">|</span>
                <span class="m-rate-count">${reviews}</span>
              </div>
            </div>`;

// 1. Update product.html
let prod = fs.readFileSync('product.html', 'utf8');
prod = prod.replace(
  '<img src="./images/swarna-500ml.jpg" alt="A2 Ghee 1000ml" class="m-card-img" />\n            </div>',
  '<img src="./images/swarna-500ml.jpg" alt="A2 Ghee 1000ml" class="m-card-img" />\n' + ratingPillHtml('5.0', '56') + '\n          </div>'
);
prod = prod.replace(
  '<img src="./images/swarna-250ml.jpg" alt="A2 Ghee 250ml" class="m-card-img" style="object-fit: cover;" />\n            </div>',
  '<img src="./images/swarna-250ml.jpg" alt="A2 Ghee 250ml" class="m-card-img" style="object-fit: cover;" />\n' + ratingPillHtml('4.8', '38') + '\n          </div>'
);
fs.writeFileSync('product.html', prod, 'utf8');
console.log('Updated rating pill in product.html');

// 2. Update shop.html
let shop = fs.readFileSync('shop.html', 'utf8');
// Clean any leftover badge tags and insert clean rating pill in each card
shop = shop.replace(/(<div class="m-card-image-wrap">[\s\S]*?<img [^>]+>)([\s\S]*?)(<\/div>\s*<div class="m-card-details">)/g, (match, p1, p2, p3) => {
  return p1 + '\n' + ratingPillHtml('4.9', '48') + '\n          ' + p3;
});
fs.writeFileSync('shop.html', shop, 'utf8');
console.log('Updated rating pills in shop.html');

// 3. Update index.html dynamic render template
let index = fs.readFileSync('index.html', 'utf8');
index = index.replace(
  /\$\{p\.badge \? `[\s\S]*?` : ''\}/g,
  '' // Remove variant pill from dynamic cards
);
fs.writeFileSync('index.html', index, 'utf8');
console.log('Cleaned variant pill from dynamic index.html');

// 4. Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');

const onlyRatingPillCSS = `
/* ==========================================================================
   ONLY RATING PILL ON PRODUCT CARDS (CLEAN & NON-OVERLAPPING)
   ========================================================================== */
.m-card-bottom-badges {
  position: absolute !important;
  bottom: 8px !important;
  left: 8px !important;
  right: auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  z-index: 6 !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: none !important;
}

.m-rating-pill {
  background: rgba(255, 255, 255, 0.96) !important;
  backdrop-filter: blur(4px) !important;
  -webkit-backdrop-filter: blur(4px) !important;
  padding: 3px 8px !important;
  border-radius: 9999px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
  font-size: 0.7rem !important;
  font-weight: 700 !important;
  color: #1e293b !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
  border: 1px solid rgba(0, 0, 0, 0.04) !important;
  white-space: nowrap !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.m-rating-pill svg {
  width: 11px !important;
  height: 11px !important;
  fill: #f59e0b !important;
  stroke: #f59e0b !important;
  flex-shrink: 0 !important;
}

.m-rating-pill .m-divider {
  color: #cbd5e1 !important;
  margin: 0 1px !important;
}

.m-rating-pill .m-rate-count {
  color: #64748b !important;
  font-weight: 600 !important;
}

/* Strictly hide any variant badge pills */
.m-variant-pill {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

@media (max-width: 480px) {
  .m-card-bottom-badges {
    bottom: 6px !important;
    left: 6px !important;
  }
  .m-rating-pill {
    padding: 2px 6px !important;
    font-size: 0.65rem !important;
  }
}
`;

css += '\n' + onlyRatingPillCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended ONLY rating pill styling to styles.css');
