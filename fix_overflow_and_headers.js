const fs = require('fs');

// --- 1. Fix HTML Files (index.html & product.html) ---
['index.html', 'product.html'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Replace <div class="faq-header"> inside faq-section with <div class="faq-section-header">
  content = content.replace(
    /<section class="faq-section">\s*<div class="container">\s*<div class="faq-header">/g,
    '<section class="faq-section">\n    <div class="container">\n      <div class="faq-section-header">'
  );
  // Also general safety replace in case formatting varies
  content = content.replace(
    /<div class="faq-header">\s*<span class="comparison-tag">Questions, Answered<\/span>/g,
    '<div class="faq-section-header">\n          <span class="comparison-tag">Questions, Answered</span>'
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated FAQ header class in ${file}`);
});

// --- 2. Update styles.css ---
let css = fs.readFileSync('styles.css', 'utf8');

// Fix html and body at top of styles.css
css = css.replace(
  /html\s*\{[^}]+\}/,
  `html {
  scroll-behavior: smooth;
  font-size: 16px;
  text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
}`
);

css = css.replace(
  /body\s*\{[^}]+\}/,
  `body {
  font-family: var(--font-sans);
  background-color: var(--color-cream);
  color: var(--color-text-main);
  line-height: 1.55;
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
  position: relative;
  -webkit-font-smoothing: antialiased;
  padding-bottom: 74px; /* Space for mobile sticky action bar */
}`
);

// Append robust overflow protection and exact FAQ/Comparison/Trust styles
const fixesCSS = `
/* ==========================================================================
   GLOBAL OVERFLOW & SECTION HEADER FIXES
   ========================================================================== */
html, body {
  overflow-x: hidden !important;
  max-width: 100vw !important;
  width: 100% !important;
}

/* Ensure all full-width sections prevent horizontal bleed */
section, header, footer, 
.trust-strip, .comparison-section, .faq-section, .heals-section, 
.himalayan-section, .collection-section, .makers-section, .math-section {
  max-width: 100% !important;
  box-sizing: border-box !important;
  overflow-x: clip !important;
}

/* -- FAQ Section Header Fix (Prevent Horizontal Collision) -- */
.faq-section-header {
  text-align: center !important;
  margin-bottom: 36px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
}
.faq-section-header .comparison-tag {
  display: inline-block !important;
  margin: 0 auto 10px !important;
  text-align: center !important;
}
.faq-section-header .comparison-title {
  font-family: 'Playfair Display', serif !important;
  font-size: clamp(1.6rem, 3.5vw, 2.3rem) !important;
  color: #0f172a !important;
  margin: 0 0 12px !important;
  text-align: center !important;
  line-height: 1.25 !important;
}
.faq-section-header .comparison-subtitle {
  color: #64748b !important;
  font-size: 0.92rem !important;
  max-width: 540px !important;
  margin: 0 auto !important;
  text-align: center !important;
  line-height: 1.6 !important;
}

/* -- Comparison Header Fix -- */
.comparison-header {
  text-align: center !important;
  margin-bottom: 36px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
}
.comparison-header .comparison-tag {
  display: inline-block !important;
  margin: 0 auto 10px !important;
}
.comparison-header .comparison-title {
  font-family: 'Playfair Display', serif !important;
  font-size: clamp(1.6rem, 3.5vw, 2.3rem) !important;
  color: #0f172a !important;
  margin: 0 0 12px !important;
  text-align: center !important;
  line-height: 1.25 !important;
}
.comparison-header .comparison-subtitle {
  color: #64748b !important;
  font-size: 0.92rem !important;
  max-width: 540px !important;
  margin: 0 auto !important;
  text-align: center !important;
  line-height: 1.6 !important;
}

/* -- Horizontal Track & Trust Strip (Zero Body Overflow) -- */
.heals-horizontal-track {
  display: flex !important;
  gap: 16px !important;
  overflow-x: auto !important;
  scroll-snap-type: x mandatory !important;
  padding: 10px 4px 24px !important;
  margin: 0 !important;
  width: 100% !important;
  box-sizing: border-box !important;
  -webkit-overflow-scrolling: touch !important;
  scrollbar-width: none !important;
}
.heals-horizontal-track::-webkit-scrollbar {
  display: none !important;
}

.trust-strip .container {
  display: flex !important;
  justify-content: space-between !important;
  gap: 16px !important;
  overflow-x: auto !important;
  padding: 8px 4px 14px !important;
  margin: 0 auto !important;
  width: 100% !important;
  box-sizing: border-box !important;
  -webkit-overflow-scrolling: touch !important;
  scrollbar-width: none !important;
}
.trust-strip .container::-webkit-scrollbar {
  display: none !important;
}

/* Comparison Cards Scale Safety on Mobile */
@media (max-width: 768px) {
  .comp-card.good {
    transform: none !important;
  }
}
`;

css += '\n' + fixesCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended overflow and header fixes to styles.css');
