const fs = require('fs');

const indexFile = 'index.html';
let indexContent = fs.readFileSync(indexFile, 'utf8');

const newHealsGrid = `      <div class="heals-bento-grid">

        <!-- 1. Cooking -->
        <div class="heal-card card-huge-dark">
          <div class="heal-bg-number">01</div>
          <div class="heal-card-top">
            <div class="heal-icon">
              <svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor"><path d="M232,96H209.49l19.55-39.09A8,8,0,0,0,224,44H168a8,8,0,0,0-8,8V96H128V56a8,8,0,0,0-5.09-7.39l-88-32A8,8,0,0,0,24,24V216a8,8,0,0,0,16,0V168H224a8,8,0,0,0,8-8V104A8,8,0,0,0,232,96Zm-56-36h31.05l-16,32H176ZM40,55.63l72,26.18V152H40ZM224,152H128V112h96Z"/></svg>
            </div>
            <div class="heal-number">01</div>
          </div>
          <div class="heal-card-bottom">
            <h3 data-en="Pure Cooking" data-hi="शुद्ध खाना पकाना">Pure Cooking</h3>
            <p data-en="High smoke point, rich flavor. Replaces refined oils completely. Safe for high-heat tadka and slow cooking alike." data-hi="उच्च स्मोक पॉइंट, समृद्ध स्वाद। परिष्कृत तेलों को पूरी तरह से बदलता है।">High smoke point, rich flavor. Replaces refined oils completely. Safe for high-heat tadka and slow cooking alike.</p>
          </div>
        </div>

        <!-- 2. Baby Massage -->
        <div class="heal-card card-light">
          <div class="heal-bg-number">02</div>
          <div class="heal-card-top">
            <div class="heal-icon">
              <svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor"><path d="M200,80a72.08,72.08,0,0,0-64-71.28V8a8,8,0,0,0-16,0V8.72A72,72,0,0,0,56,80v24H40a8,8,0,0,0-8,8v88a48.05,48.05,0,0,0,48,48H176a48.05,48.05,0,0,0,48-48V112a8,8,0,0,0-8-8H200ZM72,80a56,56,0,0,1,112,0v24H72Zm136,112a32,32,0,0,1-32,32H80a32,32,0,0,1-32-32V120H208Z"/></svg>
            </div>
            <div class="heal-number">02</div>
          </div>
          <div class="heal-card-bottom">
            <h3 data-en="Baby Massage" data-hi="शिशु मालिश">Baby Massage</h3>
            <p data-en="Warm ghee massaged gently on newborns strengthens bones and nourishes skin. A generations-old Indian tradition." data-hi="नवजात शिशुओं पर गर्म घी की मालिश हड्डियों को मजबूत बनाती है और त्वचा को पोषण देती है।">Warm ghee massaged gently on newborns strengthens bones and nourishes skin. A generations-old Indian tradition.</p>
          </div>
        </div>

        <!-- 3. Nasal & Cold -->
        <div class="heal-card card-cream">
          <div class="heal-bg-number">03</div>
          <div class="heal-card-top">
            <div class="heal-icon">
              <svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm56-80a56,56,0,0,1-112,0,8,8,0,0,1,16,0,40,40,0,0,0,80,0,8,8,0,0,1,16,0Z"/></svg>
            </div>
            <div class="heal-number">03</div>
          </div>
          <div class="heal-card-bottom">
            <h3 data-en="Nasal Relief — Zukam" data-hi="नाक से राहत — जुकाम">Nasal Relief — Zukam</h3>
            <p data-en="A few warm drops of ghee in each nostril (Nasya) clears congestion and soothes dry nasal passages. Ancient Ayurvedic remedy." data-hi="प्रत्येक नथुने में गर्म घी की कुछ बूंदें (नस्य) जमाव को साफ करती हैं। प्राचीन आयुर्वेदिक उपाय।">A few warm drops of ghee in each nostril (Nasya) clears congestion and soothes dry nasal passages. Ancient Ayurvedic remedy.</p>
          </div>
        </div>

        <!-- 4. Chest/Body Rub -->
        <div class="heal-card card-wide-gold">
          <div class="heal-bg-number">04</div>
          <div class="heal-card-top">
            <div class="heal-icon">
              <svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C226.84,135.89,206.74,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/></svg>
            </div>
            <div class="heal-number">04</div>
          </div>
          <div class="heal-card-bottom">
            <h3 data-en="Chest & Body Warmth" data-hi="छाती व शरीर की गर्माहट">Chest & Body Warmth</h3>
            <p data-en="Warm ghee rubbed on the chest and back during cold or fever provides deep warmth and relief. No chemicals, pure comfort." data-hi="सर्दी या बुखार के दौरान छाती और पीठ पर गर्म घी की मालिश गहरी गर्माहट और राहत प्रदान करती है।">Warm ghee rubbed on the chest and back during cold or fever provides deep warmth and relief. No chemicals, pure comfort.</p>
          </div>
        </div>

        <!-- 5. Hair Oiling -->
        <div class="heal-card card-light">
          <div class="heal-bg-number">05</div>
          <div class="heal-card-top">
            <div class="heal-icon">
              <svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor"><path d="M213.85,125.46l-112-80A8,8,0,0,0,88,48v24H40A16,16,0,0,0,24,88v80a16,16,0,0,0,16,16H88v24a8,8,0,0,0,13.85,5.46l112-80a8,8,0,0,0,0-13.08ZM104,208V187.63L196.92,128,104,68.37Z"/></svg>
            </div>
            <div class="heal-number">05</div>
          </div>
          <div class="heal-card-bottom">
            <h3 data-en="Hair & Scalp Nourishment" data-hi="बाल व खोपड़ी का पोषण">Hair & Scalp Nourishment</h3>
            <p data-en="Warm ghee massaged into the scalp reduces dryness, frizz, and promotes healthy hair growth. Works especially well in winters." data-hi="खोपड़ी में गर्म घी की मालिश रूखापन और घुंघरालेपन को कम करती है और स्वस्थ बालों के विकास को बढ़ावा देती है।">Warm ghee massaged into the scalp reduces dryness, frizz, and promotes healthy hair growth. Works especially well in winters.</p>
          </div>
        </div>

        <!-- 6. Cracked Heels -->
        <div class="heal-card card-light">
          <div class="heal-bg-number">06</div>
          <div class="heal-card-top">
            <div class="heal-icon">
              <svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor"><path d="M229.19,147.4A96,96,0,0,0,32,128c0,32.73,15.36,61.58,39.23,80H64a8,8,0,0,0,0,16H192a8,8,0,0,0,0-16h-5.54A95.5,95.5,0,0,0,224,136C224,139.84,223.38,143.57,229.19,147.4ZM128,208a79.79,79.79,0,0,1-52.37-19.5A48,48,0,0,1,128,160a48.32,48.32,0,0,1,52.1,28.24A79.85,79.85,0,0,1,128,208Z"/></svg>
            </div>
            <div class="heal-number">06</div>
          </div>
          <div class="heal-card-bottom">
            <h3 data-en="Cracked Heels & Dry Skin" data-hi="फटी एड़ियाँ व रूखी त्वचा">Cracked Heels & Dry Skin</h3>
            <p data-en="Apply ghee on cracked heels before sleeping — nature's deepest moisturizer. No petroleum, no parabens." data-hi="सोने से पहले फटी एड़ियों पर घी लगाएं — प्रकृति का सबसे गहरा मॉइस्चराइजर।">Apply ghee on cracked heels before sleeping — nature's deepest moisturizer. No petroleum, no parabens.</p>
          </div>
        </div>

        <!-- 7. Diya / Lamp -->
        <div class="heal-card card-wide-black">
          <div class="heal-bg-number">07</div>
          <div class="heal-card-top">
            <div class="heal-icon">
              <svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor"><path d="M176,120a48,48,0,1,0-96,0c0,16,5.1,32.2,14.77,46.09L128,208l33.23-41.91C170.9,152.2,176,136,176,120Zm-48,72-22.16-27.95A63.56,63.56,0,0,1,93.11,120,34.89,34.89,0,1,1,128,154.89,35.24,35.24,0,0,1,105.84,164.05Z"/></svg>
            </div>
            <div class="heal-number">07</div>
          </div>
          <div class="heal-card-bottom">
            <h3 data-en="Diya & Sacred Lamp" data-hi="दीया व पवित्र लैंप">Diya & Sacred Lamp</h3>
            <p data-en="Pure ghee burns clean with no soot — the traditional choice for diyas, havan, and religious ceremonies. Purifies the air naturally." data-hi="शुद्ध घी बिना कालिख के जलती है — दीयों, हवन और धार्मिक समारोहों के लिए पारंपरिक विकल्प।">Pure ghee burns clean with no soot — the traditional choice for diyas, havan, and religious ceremonies. Purifies the air naturally.</p>
          </div>
        </div>

      </div>`;

// Replace in index.html
const startTag = '<div class="heals-grid">';
const endTag = '</div>\r\n    </div>\r\n  </section>';
const htmlStart = indexContent.indexOf(startTag);
const sectionEnd = indexContent.indexOf('</section>', htmlStart);
if (htmlStart > -1 && sectionEnd > -1) {
  indexContent = indexContent.substring(0, htmlStart) + newHealsGrid + '\n' + indexContent.substring(sectionEnd);
  fs.writeFileSync(indexFile, indexContent, 'utf8');
  console.log('index.html updated successfully.');
} else {
  console.error('Could not find heals grid in index.html');
}

// Replace CSS
const cssFile = 'styles.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const newCSS = `
/* ── 7 Ways Swarna Heals (BENTO LUXURY GRID) ────────────────────────────── */
.heals-bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(260px, auto);
  gap: 24px;
}

.heal-card {
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  border: 1px solid #eee8dc;
  background: #fff;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}
.heal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border-color: #d4af37;
}

.heal-bg-number {
  position: absolute;
  right: -10px;
  bottom: -30px;
  font-size: 10rem;
  font-weight: 900;
  line-height: 1;
  color: #0f172a;
  opacity: 0.02;
  z-index: -1;
  font-family: 'Playfair Display', serif;
  pointer-events: none;
  transition: all 0.5s ease;
}
.heal-card:hover .heal-bg-number {
  transform: scale(1.05) translate(-10px, -10px);
  opacity: 0.05;
}

.heal-card-top { margin-bottom: 32px; }
.heal-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #d4af37;
  transition: transform 0.4s;
}
.heal-card:hover .heal-icon { transform: scale(1.1) rotate(-5deg); }
.heal-icon svg { display: block; width: 28px; height: 28px; }

.heal-number {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #d4af37;
  font-weight: 700;
  margin-bottom: 12px;
}

.heal-card h3 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 12px;
  line-height: 1.3;
  font-family: 'Playfair Display', serif;
}
.heal-card p {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  line-height: 1.7;
}

/* SPECIFIC CARDS (BENTO ROLES) */
.card-huge-dark {
  grid-column: span 2;
  grid-row: span 2;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border: none;
}
.card-huge-dark .heal-bg-number { color: #fff; opacity: 0.03; font-size: 16rem; right: -20px; bottom: -40px; }
.card-huge-dark:hover .heal-bg-number { opacity: 0.08; }
.card-huge-dark .heal-icon { background: rgba(212,175,55,0.15); width: 72px; height: 72px; border-radius: 20px; color: #d4af37; }
.card-huge-dark .heal-icon svg { width: 36px; height: 36px; }
.card-huge-dark h3 { color: #fff; font-size: 2.2rem; margin-bottom: 16px; }
.card-huge-dark p { color: rgba(255,255,255,0.7); font-size: 1.05rem; }

.card-light {
  background: #fafaf8;
}

.card-cream {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border-color: #fde68a;
}
.card-cream .heal-icon { background: #fff; box-shadow: 0 4px 12px rgba(212,175,55,0.1); }

.card-wide-gold {
  grid-column: span 2;
  background: linear-gradient(135deg, #d4af37 0%, #b48529 100%);
  border: none;
}
.card-wide-gold .heal-bg-number { color: #fff; opacity: 0.15; font-size: 12rem; right: 0; bottom: -40px; }
.card-wide-gold:hover .heal-bg-number { opacity: 0.25; }
.card-wide-gold .heal-icon { background: rgba(255,255,255,0.25); color: #fff; }
.card-wide-gold .heal-number { color: rgba(255,255,255,0.9); }
.card-wide-gold h3 { color: #fff; font-size: 1.7rem; }
.card-wide-gold p { color: rgba(255,255,255,0.9); }

.card-wide-black {
  grid-column: span 2;
  background: #181512;
  border: none;
}
.card-wide-black .heal-bg-number { color: #d4af37; opacity: 0.05; font-size: 12rem; right: 0; bottom: -30px; }
.card-wide-black:hover .heal-bg-number { opacity: 0.1; }
.card-wide-black .heal-icon { background: rgba(212,175,55,0.1); color: #d4af37; }
.card-wide-black h3 { color: #d4af37; font-size: 1.7rem; }
.card-wide-black p { color: rgba(255,255,255,0.6); }

/* RESPONSIVE BENTO */
@media (max-width: 1024px) {
  .heals-bento-grid { grid-template-columns: repeat(2, 1fr); }
  .card-wide-gold, .card-wide-black { grid-column: span 2; }
}
@media (max-width: 640px) {
  .heals-bento-grid { grid-template-columns: 1fr; gap: 16px; }
  .card-huge-dark, .card-wide-gold, .card-wide-black { grid-column: span 1; grid-row: span 1; }
  .card-huge-dark .heal-bg-number, .card-wide-gold .heal-bg-number, .card-wide-black .heal-bg-number { font-size: 8rem; right: -10px; bottom: -10px; }
  .card-huge-dark h3 { font-size: 1.6rem; }
}
`;

const cssStartTag = '.heals-grid {';
const cssEndTag = '/* -- Himalayan Difference';

const cssStart = cssContent.indexOf(cssStartTag);
const cssEnd = cssContent.indexOf(cssEndTag);

if (cssStart > -1 && cssEnd > -1) {
  cssContent = cssContent.substring(0, cssStart) + newCSS + '\n' + cssContent.substring(cssEnd);
  fs.writeFileSync(cssFile, cssContent, 'utf8');
  console.log('styles.css updated successfully.');
} else {
  console.error('Could not find heals css tags in styles.css');
}

// ALSO we need to remove the old responsive .heals-grid overrides.
const respRegex = /@media \([^\{]+\{\s*\.heals-grid\s*\{[^}]+\}\s*(?:\.heal-card\s*\{[^}]+\}\s*)?\}/g;
cssContent = cssContent.replace(respRegex, '');
fs.writeFileSync(cssFile, cssContent, 'utf8');

