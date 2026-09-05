const fs = require('fs');

// 1. Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');

const hidePillsCSS = `
/* ==========================================================================
   HIDE ALL PRODUCT CARD OVERLAY PILLS/BADGES COMPLETELY
   ========================================================================== */
.m-card-bottom-badges,
.m-variant-pill,
.m-rating-pill {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
`;

css += '\n' + hidePillsCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended rule to hide all card pills in styles.css');

// 2. Clean HTML files
const pages = ['product.html', 'shop.html', 'index.html'];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Remove m-card-bottom-badges blocks
  content = content.replace(/<div class="m-card-bottom-badges">[\s\S]*?<\/div>\s*<\/div>/g, '</div>');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Removed card badge markup from ${file}`);
});
