const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

const compactMathCSS = `
/* ==========================================================================
   MOBILE ULTRA-COMPACT "MATH OF AUTHENTICITY" FLOW
   ========================================================================== */
@media (max-width: 640px) {
  .math-section {
    padding: 16px 14px !important;
    margin: 16px 0 !important;
    border-radius: 14px !important;
    background: #fdfcf9 !important;
  }
  .math-tag {
    font-size: 0.58rem !important;
    margin-bottom: 4px !important;
    letter-spacing: 0.12em !important;
  }
  .math-title {
    font-size: 1.15rem !important;
    margin-bottom: 12px !important;
    line-height: 1.25 !important;
  }
  
  /* Single-row swipeable compact track */
  .math-flow {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
    gap: 6px !important;
    padding: 4px 2px 8px !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 100% !important;
  }
  .math-flow::-webkit-scrollbar {
    display: none !important;
  }

  .math-step {
    flex: 0 0 95px !important;
    min-width: 95px !important;
    scroll-snap-align: start !important;
    padding: 10px 6px !important;
    background: #ffffff !important;
    border: 1px solid #f0ece3 !important;
    border-radius: 10px !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
  }
  
  .math-step-icon {
    width: 32px !important;
    height: 32px !important;
    border-radius: 8px !important;
    margin-bottom: 6px !important;
    box-shadow: 0 2px 6px rgba(0,0,0,0.03) !important;
  }
  .math-step-icon svg {
    width: 16px !important;
    height: 16px !important;
  }
  
  .math-step-val {
    font-size: 0.72rem !important;
    font-weight: 700 !important;
    margin-bottom: 2px !important;
    line-height: 1.2 !important;
  }
  .math-step-label {
    font-size: 0.58rem !important;
    line-height: 1.2 !important;
  }

  .math-arrow {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 -2px !important;
    color: #cbd5e1 !important;
    flex-shrink: 0 !important;
    transform: none !important;
  }
  .math-arrow svg {
    width: 12px !important;
    height: 12px !important;
    stroke-width: 3 !important;
  }

  .math-step:last-of-type {
    flex: 0 0 115px !important;
    min-width: 115px !important;
    padding: 10px 8px !important;
    margin-top: 0 !important;
    background: linear-gradient(135deg, #fffbeb, #fef3c7) !important;
    border: 1px solid #fde68a !important;
  }

  .math-footer {
    margin-top: 10px !important;
    padding-top: 10px !important;
    gap: 8px !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    flex-wrap: wrap !important;
  }
  .math-badge {
    padding: 4px 8px !important;
    font-size: 0.68rem !important;
    gap: 4px !important;
    border-radius: 12px !important;
  }
  .math-badge svg {
    width: 12px !important;
    height: 12px !important;
  }
  .math-footer-text {
    font-size: 0.68rem !important;
    margin: 0 !important;
  }
}
`;

css += '\n' + compactMathCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended compact mobile math CSS to styles.css');
