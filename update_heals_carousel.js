const fs = require('fs');

// --- 1. UPDATE index.html ---
const htmlFile = 'index.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

const newHtml = `      <div class="heals-horizontal-track">
        
        <!-- 1. Cooking -->
        <div class="heal-slide-card">
          <div class="heal-slide-img">
            <div class="heal-slide-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
          </div>
          <div class="heal-slide-content">
            <h3 data-en="<span>01</span> Pure Cooking" data-hi="<span>01</span> शुद्ध खाना पकाना"><span>01</span> Pure Cooking</h3>
            <p data-en="High smoke point, rich flavor. Replaces refined oils completely. Safe for high-heat tadka and slow cooking alike." data-hi="उच्च स्मोक पॉइंट, समृद्ध स्वाद। परिष्कृत तेलों को पूरी तरह से बदलता है।">High smoke point, rich flavor. Replaces refined oils completely. Safe for high-heat tadka and slow cooking alike.</p>
          </div>
        </div>

        <!-- 2. Baby Massage -->
        <div class="heal-slide-card">
          <div class="heal-slide-img">
            <div class="heal-slide-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
          </div>
          <div class="heal-slide-content">
            <h3 data-en="<span>02</span> Baby Massage" data-hi="<span>02</span> शिशु मालिश"><span>02</span> Baby Massage</h3>
            <p data-en="Warm ghee massaged gently on newborns strengthens bones and nourishes skin. A generations-old Indian tradition." data-hi="नवजात शिशुओं पर गर्म घी की मालिश हड्डियों को मजबूत बनाती है और त्वचा को पोषण देती है।">Warm ghee massaged gently on newborns strengthens bones and nourishes skin. A generations-old Indian tradition.</p>
          </div>
        </div>

        <!-- 3. Nasal & Cold -->
        <div class="heal-slide-card">
          <div class="heal-slide-img">
            <div class="heal-slide-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
          </div>
          <div class="heal-slide-content">
            <h3 data-en="<span>03</span> Nasal Relief" data-hi="<span>03</span> नाक से राहत"><span>03</span> Nasal Relief</h3>
            <p data-en="A few warm drops of ghee in each nostril clears congestion and soothes dry passages. Ancient Ayurvedic remedy." data-hi="प्रत्येक नथुने में गर्म घी की कुछ बूंदें जमाव को साफ करती हैं।">A few warm drops of ghee in each nostril clears congestion and soothes dry passages. Ancient Ayurvedic remedy.</p>
          </div>
        </div>

        <!-- 4. Chest/Body Rub -->
        <div class="heal-slide-card">
          <div class="heal-slide-img">
            <div class="heal-slide-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
          </div>
          <div class="heal-slide-content">
            <h3 data-en="<span>04</span> Chest & Body Warmth" data-hi="<span>04</span> छाती व शरीर की गर्माहट"><span>04</span> Chest & Body Warmth</h3>
            <p data-en="Warm ghee rubbed on the chest and back during cold or fever provides deep warmth and relief. No chemicals." data-hi="सर्दी या बुखार के दौरान छाती और पीठ पर गर्म घी की मालिश गहरी गर्माहट देती है।">Warm ghee rubbed on the chest and back during cold or fever provides deep warmth and relief. No chemicals.</p>
          </div>
        </div>

        <!-- 5. Hair Oiling -->
        <div class="heal-slide-card">
          <div class="heal-slide-img">
            <div class="heal-slide-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
          </div>
          <div class="heal-slide-content">
            <h3 data-en="<span>05</span> Hair Nourishment" data-hi="<span>05</span> बालों का पोषण"><span>05</span> Hair Nourishment</h3>
            <p data-en="Warm ghee massaged into the scalp reduces dryness, frizz, and promotes healthy hair growth." data-hi="खोपड़ी में गर्म घी की मालिश रूखापन कम करती है और स्वस्थ बालों के विकास को बढ़ाती है।">Warm ghee massaged into the scalp reduces dryness, frizz, and promotes healthy hair growth.</p>
          </div>
        </div>

        <!-- 6. Cracked Heels -->
        <div class="heal-slide-card">
          <div class="heal-slide-img">
            <div class="heal-slide-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
          </div>
          <div class="heal-slide-content">
            <h3 data-en="<span>06</span> Cracked Heels" data-hi="<span>06</span> फटी एड़ियाँ"><span>06</span> Cracked Heels</h3>
            <p data-en="Apply ghee on cracked heels before sleeping — nature's deepest moisturizer. No petroleum, no parabens." data-hi="सोने से पहले फटी एड़ियों पर घी लगाएं — प्रकृति का सबसे गहरा मॉइस्चराइजर।">Apply ghee on cracked heels before sleeping — nature's deepest moisturizer. No petroleum, no parabens.</p>
          </div>
        </div>

        <!-- 7. Diya / Lamp -->
        <div class="heal-slide-card">
          <div class="heal-slide-img">
            <div class="heal-slide-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
          </div>
          <div class="heal-slide-content">
            <h3 data-en="<span>07</span> Diya & Sacred Lamp" data-hi="<span>07</span> दीया व लैंप"><span>07</span> Diya & Sacred Lamp</h3>
            <p data-en="Pure ghee burns clean with no soot — the traditional choice for diyas, havan, and religious ceremonies." data-hi="शुद्ध घी बिना कालिख के जलती है — दीयों, हवन और धार्मिक समारोहों के लिए पारंपरिक विकल्प।">Pure ghee burns clean with no soot — the traditional choice for diyas, havan, and religious ceremonies.</p>
          </div>
        </div>

      </div>
    </div>
  </section>`;

const startHtmlIdx = htmlContent.indexOf('<div class="heals-bento-grid">');
const endHtmlIdx = htmlContent.indexOf('</section>', startHtmlIdx);
if (startHtmlIdx !== -1 && endHtmlIdx !== -1) {
  htmlContent = htmlContent.substring(0, startHtmlIdx) + newHtml + htmlContent.substring(endHtmlIdx + 10);
  fs.writeFileSync(htmlFile, htmlContent, 'utf8');
  console.log('Updated index.html');
}

// --- 2. UPDATE styles.css ---
const cssFile = 'styles.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const newCSS = `/* ── 7 Ways Swarna Heals (HORIZONTAL SCROLL) ────────────────────────────── */
.heals-horizontal-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0 4px 32px; /* Bottom padding for scrollbar/shadow space */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  margin: 0 -16px; /* Bleed to edge on mobile */
  padding-left: 16px;
  padding-right: 16px;
}
.heals-horizontal-track::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

@media (min-width: 768px) {
  .heals-horizontal-track {
    margin: 0;
    padding-left: 4px;
    padding-right: 4px;
    /* On desktop, allow a subtle scrollbar if needed, but horizontal scrolling is native for mice with shift+scroll or trackpads */
  }
}

.heal-slide-card {
  flex: 0 0 280px;
  scroll-snap-align: start;
  border: 1px solid #f0ece3;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
}
.heal-slide-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.06);
  border-color: #d4af37;
}

.heal-slide-img {
  width: 100%;
  aspect-ratio: 4/3;
  background: #fafaf8;
  position: relative;
  border-bottom: 1px solid #f0ece3;
}
.heal-slide-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.heal-slide-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  color: #cbd5e1;
}
.heal-slide-placeholder svg {
  width: 36px;
  height: 36px;
}

.heal-slide-content {
  padding: 24px 20px;
  background: #fff;
  flex-grow: 1;
}
.heal-slide-content h3 {
  font-size: 1.15rem;
  font-family: 'Playfair Display', serif;
  color: #0f172a;
  margin: 0 0 10px;
  line-height: 1.3;
}
.heal-slide-content h3 span {
  color: #d4af37;
  font-size: 0.8rem;
  margin-right: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  letter-spacing: 0.1em;
  font-weight: 700;
}
.heal-slide-content p {
  font-size: 0.88rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .heal-slide-card {
    flex: 0 0 85%;
  }
}
`;

const startCssIdx = cssContent.indexOf('/* ── 7 Ways Swarna Heals (BENTO LUXURY GRID)');
const endCssIdx = cssContent.indexOf('/* -- Himalayan Difference', startCssIdx);

if (startCssIdx !== -1 && endCssIdx !== -1) {
  cssContent = cssContent.substring(0, startCssIdx) + newCSS + cssContent.substring(endCssIdx);
  fs.writeFileSync(cssFile, cssContent, 'utf8');
  console.log('Updated styles.css');
} else {
  console.log('Could not find CSS bounds', startCssIdx, endCssIdx);
}
