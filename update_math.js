const fs = require('fs');
const cssFile = 'styles.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const startIndex = cssContent.indexOf('/* -- Math of Authenticity (Product Page) ---------------------------------- */');
const endIndex = cssContent.indexOf('/* -- Video Placeholder ---------------------------------------------------- */');

if (startIndex !== -1 && endIndex !== -1) {
    const newCSS = `/* -- Math of Authenticity (Product Page) ---------------------------------- */
.math-section {
  margin: 32px 0;
  background: #fdfcf9;
  border: 1px solid #f0ece3;
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.02);
}
.math-section::before {
  content: '';
  position: absolute;
  top: -100px; right: -100px;
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
  pointer-events: none;
}
.math-tag {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #b48529;
  font-weight: 700;
  margin-bottom: 8px;
  display: block;
}
.math-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  color: #0f172a;
  margin: 0 0 24px;
}
.math-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  position: relative;
  z-index: 1;
}
.math-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  min-width: 70px;
}
.math-step-icon {
  width: 44px;
  height: 44px;
  background: #fff;
  border: 1px solid #eee8dc;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: #d4af37;
  box-shadow: 0 4px 12px rgba(212,175,55,0.04);
}
.math-step-icon svg { width: 22px; height: 22px; }
.math-step-val {
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
  line-height: 1.2;
}
.math-step-label {
  font-size: 0.65rem;
  color: #64748b;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.math-arrow {
  color: #cbd5e1;
  margin-bottom: 24px;
  flex-shrink: 0;
}
.math-arrow svg { display: block; width: 16px; height: 16px; }

/* The final step highlight */
.math-step:last-of-type {
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
  padding: 16px 12px;
  border-radius: 12px;
  border: 1px solid #fde68a;
  flex: 1.1;
  position: relative;
}
/* Ensure the inner style overrides in HTML don't break the new theme */
.math-step:last-of-type .math-step-val { color: #854d0e !important; }
.math-step:last-of-type .math-step-icon {
  background: #d4af37 !important;
  color: #fff !important;
  border: none;
  box-shadow: 0 4px 12px rgba(212,175,55,0.2);
}
.math-step:last-of-type .math-step-label { color: #a16207 !important; }

.math-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0ece3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.math-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fafaf8;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
}
.math-badge svg { color: #d4af37; }
.math-footer-text {
  color: #64748b;
  font-size: 0.75rem;
  margin: 0;
}

@media (max-width: 640px) {
  .math-flow { flex-wrap: wrap; justify-content: center; gap: 16px; }
  .math-step { flex: unset; min-width: 40%; }
  .math-step:last-of-type { min-width: 100%; margin-top: 8px; }
  .math-arrow { display: none; }
  .math-footer { flex-direction: column; align-items: flex-start; text-align: left; }
}

`;
    cssContent = cssContent.substring(0, startIndex) + newCSS + cssContent.substring(endIndex);
    fs.writeFileSync(cssFile, cssContent, 'utf8');
    console.log('Successfully updated math section to premium day theme');
} else {
    console.log('Failed to find math section markers');
}
