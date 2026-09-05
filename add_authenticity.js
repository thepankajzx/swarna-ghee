const fs = require('fs');

// --- 1. CSS UPDATES ---
let css = fs.readFileSync('styles.css', 'utf8');
const newCSS = `
/* -- Trust Strip ---------------------------------------------------------- */
.trust-strip {
  background: #fff;
  border-top: 1px solid #f0ece3;
  border-bottom: 1px solid #f0ece3;
  padding: 32px 0;
  overflow: hidden;
}
.trust-strip .container {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  overflow-x: auto;
  -ms-overflow-style: none; scrollbar-width: none;
  padding-bottom: 8px; /* Room for scroll */
}
.trust-strip .container::-webkit-scrollbar { display: none; }
.trust-item {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  min-width: 140px; flex: 1;
}
.trust-icon {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: #fffbeb;
  border: 1px solid #fde68a;
  display: flex; align-items: center; justify-content: center;
  color: #b48529; margin-bottom: 12px;
}
.trust-item h4 { font-size: 0.85rem; color: #0f172a; margin: 0 0 4px; font-weight: 700; }
.trust-item p { font-size: 0.75rem; color: #64748b; margin: 0; line-height: 1.3; }

/* -- Comparison Section --------------------------------------------------- */
.comparison-section { padding: 80px 0; background: #fafaf8; }
.comparison-header { text-align: center; margin-bottom: 48px; }
.comparison-tag { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: #b48529; font-weight: 700; display: block; margin-bottom: 12px; }
.comparison-title { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #0f172a; margin: 0 0 16px; }
.comparison-subtitle { color: #64748b; font-size: 0.95rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }
.comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 1000px; margin: 0 auto; align-items: stretch; }
.comp-card { border-radius: 16px; padding: 40px; position: relative; }
.comp-card.bad { background: #fff; border: 1px solid #e2e8f0; }
.comp-card.good { background: #1e1b18; border: 2px solid #d4af37; color: #fff; box-shadow: 0 20px 40px rgba(212,175,55,0.1); transform: scale(1.02); z-index: 2; }
.comp-badge { position: absolute; top: -14px; right: 24px; background: #d4af37; color: #1e1b18; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; padding: 6px 12px; border-radius: 20px; text-transform: uppercase; }
.comp-card h3 { font-family: 'Playfair Display', serif; font-size: 1.6rem; margin: 0 0 4px; }
.comp-card.bad h3 { color: #0f172a; }
.comp-card.good h3 { color: #d4af37; }
.comp-desc { font-size: 0.85rem; margin: 0 0 32px; }
.comp-card.bad .comp-desc { color: #64748b; }
.comp-card.good .comp-desc { color: rgba(255,255,255,0.7); }
.comp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
.comp-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 0.95rem; line-height: 1.5; }
.comp-card.bad .comp-list li { color: #334155; }
.comp-card.good .comp-list li { color: #fff; }
.comp-icon { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;}
.comp-card.bad .comp-icon { background: #fee2e2; color: #ef4444; }
.comp-card.good .comp-icon { background: #10b981; color: #fff; }

@media (max-width: 768px) { 
  .comparison-grid { grid-template-columns: 1fr; gap: 40px; } 
  .comp-card.good { transform: none; } 
}

/* -- FAQ Section ---------------------------------------------------------- */
.faq-section { padding: 80px 0; background: #fdfcf9; border-top: 1px solid #f0ece3; }
.faq-header { text-align: center; margin-bottom: 48px; }
.faq-container { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
.faq-item { background: #fff; border: 1px solid #eee8dc; border-radius: 12px; overflow: hidden; transition: all 0.3s; }
.faq-item.active { border-color: #d4af37; box-shadow: 0 8px 24px rgba(212,175,55,0.08); }
.faq-question { padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 600; color: #0f172a; font-size: 1.05rem; }
.faq-icon { color: #d4af37; font-size: 1.2rem; transition: transform 0.3s; display: flex; align-items: center; justify-content: center; }
.faq-item.active .faq-icon { transform: rotate(45deg); }
.faq-answer { padding: 0 24px; max-height: 0; overflow: hidden; transition: all 0.3s ease-out; color: #64748b; line-height: 1.6; font-size: 0.95rem; }
.faq-item.active .faq-answer { padding-bottom: 24px; max-height: 500px; }
`;

if (!css.includes('.trust-strip')) {
  css += '\n' + newCSS;
  fs.writeFileSync('styles.css', css, 'utf8');
  console.log('Appended new CSS components to styles.css');
}

// --- 2. JS UPDATES ---
let js = fs.readFileSync('app.js', 'utf8');
if (!js.includes('.faq-item')) {
  const faqJs = `
// FAQ Accordion Logic
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if(question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if(!isActive) item.classList.add('active');
      });
    }
  });
});
`;
  js += '\n' + faqJs;
  fs.writeFileSync('app.js', js, 'utf8');
  console.log('Appended FAQ logic to app.js');
}

// --- 3. HTML CONTENT BLOCKS ---
const trustStripHTML = `
  <!-- Trust Strip -->
  <section class="trust-strip">
    <div class="container">
      <div class="trust-item">
        <div class="trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg></div>
        <h4>Traditional Bilona</h4><p>Curd churned method</p>
      </div>
      <div class="trust-item">
        <div class="trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3M2 21h20"></path></svg></div>
        <h4>100% Gir Cow</h4><p>Indigenous A2 breed</p>
      </div>
      <div class="trust-item">
        <div class="trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
        <h4>0% Chemicals</h4><p>No added preservatives</p>
      </div>
      <div class="trust-item">
        <div class="trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
        <h4>Danedar Texture</h4><p>Rich aroma & grains</p>
      </div>
      <div class="trust-item">
        <div class="trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path></svg></div>
        <h4>Slow Fire Made</h4><p>Small artisanal batches</p>
      </div>
      <div class="trust-item">
        <div class="trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg></div>
        <h4>100% Pure</h4><p>100% natural</p>
      </div>
    </div>
  </section>
`;

const comparisonHTML = `
  <!-- Comparison Section -->
  <section class="comparison-section">
    <div class="container">
      <div class="comparison-header">
        <span class="comparison-tag">Why Bilona?</span>
        <h2 class="comparison-title" data-en="A Timeless Method. A Richer Result." data-hi="एक कालातीत विधि। एक समृद्ध परिणाम।">A Timeless Method. A Richer Result.</h2>
        <p class="comparison-subtitle" data-en="See why authentic A2 Bilona Ghee stands completely apart from industrial cream-based ghee." data-hi="देखें कि क्यों प्रामाणिक ए2 बिलोना घी औद्योगिक क्रीम-आधारित घी से बिल्कुल अलग है।">See why authentic A2 Bilona Ghee stands completely apart from industrial cream-based ghee.</p>
      </div>
      <div class="comparison-grid">
        <!-- Bad -->
        <div class="comp-card bad">
          <h3 data-en="Conventional Ghee" data-hi="पारंपरिक घी">Conventional Ghee</h3>
          <p class="comp-desc" data-en="Industrial, Mass-Market Ghee" data-hi="औद्योगिक, मास-मार्केट घी">Industrial, Mass-Market Ghee</p>
          <ul class="comp-list">
            <li><div class="comp-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div> <span data-en="Made from stored cream" data-hi="संग्रहीत क्रीम से बना">Made from stored cream</span></li>
            <li><div class="comp-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div> <span data-en="High-speed machine processed" data-hi="हाई-स्पीड मशीन संसाधित">High-speed machine processed</span></li>
            <li><div class="comp-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div> <span data-en="Mixed hybrid cow milk" data-hi="मिश्रित संकर गाय का दूध">Mixed hybrid cow milk</span></li>
            <li><div class="comp-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div> <span data-en="Added artificial preservatives" data-hi="कृत्रिम परिरक्षक जोड़े गए">Added artificial preservatives</span></li>
            <li><div class="comp-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div> <span data-en="High-heat nutrient loss" data-hi="उच्च गर्मी में पोषक तत्वों की हानि">High-heat nutrient loss</span></li>
          </ul>
        </div>
        <!-- Good -->
        <div class="comp-card good">
          <div class="comp-badge" data-en="The Pure Choice" data-hi="शुद्ध विकल्प">The Pure Choice</div>
          <h3 data-en="Swarna A2 Ghee" data-hi="स्वर्ण ए2 घी">Swarna A2 Ghee</h3>
          <p class="comp-desc" data-en="Handcrafted Vedic Golden Purity" data-hi="हस्तनिर्मित वैदिक स्वर्ण शुद्धता">Handcrafted Vedic Golden Purity</p>
          <ul class="comp-list">
            <li><div class="comp-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div> <span data-en="100% Cultured Curd Bilona" data-hi="100% सुसंस्कृत दही बिलोना">100% Cultured Curd Bilona</span></li>
            <li><div class="comp-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div> <span data-en="Slow wooden churned" data-hi="धीमी लकड़ी का मंथन">Slow wooden churned</span></li>
            <li><div class="comp-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div> <span data-en="Pure indigenous Gir cows" data-hi="शुद्ध स्वदेशी गिर गायें">Pure indigenous Gir cows</span></li>
            <li><div class="comp-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div> <span data-en="Zero chemicals & additives" data-hi="शून्य रसायन और योजक">Zero chemicals & additives</span></li>
            <li><div class="comp-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div> <span data-en="Danedar texture & aroma" data-hi="दानेदार बनावट और सुगंध">Danedar texture & aroma</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
`;

const faqHTML = `
  <!-- FAQ Section -->
  <section class="faq-section">
    <div class="container">
      <div class="faq-header">
        <span class="comparison-tag">Questions, Answered</span>
        <h2 class="comparison-title" data-en="Everything You'd Like To Know" data-hi="वह सब कुछ जो आप जानना चाहेंगे">Everything You'd Like To Know</h2>
        <p class="comparison-subtitle" data-en="Still curious? Our ghee care team is always here to assist your wellness journey." data-hi="अभी भी उत्सुक हैं? हमारी घी देखभाल टीम आपकी वेलनेस यात्रा में सहायता के लिए हमेशा मौजूद है।">Still curious? Our ghee care team is always here to assist your wellness journey.</p>
      </div>
      <div class="faq-container">
        
        <div class="faq-item">
          <div class="faq-question">
            <span data-en="What makes Bilona Ghee different?" data-hi="बिलोना घी को क्या अलग बनाता है?">What makes Bilona Ghee different?</span>
            <div class="faq-icon">+</div>
          </div>
          <div class="faq-answer" data-en="Traditional Bilona Ghee begins with cultured curd, which is churned with a wooden bilona to separate fresh butter and then slowly heated over low fire. This patient method gives the ghee its distinctive nutty aroma, granular texture, and superior bio-availability." data-hi="पारंपरिक बिलोना घी की शुरुआत कल्चर्ड दही से होती है, जिसे लकड़ी के बिलोना से मथा जाता है।">Traditional Bilona Ghee begins with cultured curd, which is churned with a wooden bilona to separate fresh butter and then slowly heated over low fire. This patient method gives the ghee its distinctive nutty aroma, granular texture, and superior bio-availability.</div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span data-en="Is Swarna ghee made only from indigenous (Desi) cows?" data-hi="क्या स्वर्ण घी केवल स्वदेशी गायों से बना है?">Is Swarna ghee made only from indigenous (Desi) cows?</span>
            <div class="faq-icon">+</div>
          </div>
          <div class="faq-answer" data-en="Yes, absolutely. We source our milk exclusively from purebred, pasture-grazed Gir cows in Himachal Pradesh." data-hi="हाँ बिल्कुल।">Yes, absolutely. We source our milk exclusively from purebred, pasture-grazed Gir cows in Himachal Pradesh.</div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span data-en="Why does the texture change with the season?" data-hi="मौसम के साथ बनावट क्यों बदलती है?">Why does the texture change with the season?</span>
            <div class="faq-icon">+</div>
          </div>
          <div class="faq-answer" data-en="Pure ghee melts in summer and solidifies in winter. The famous 'danedar' (granular) texture is a natural property of A2 Bilona ghee, proving it has not been homogenized or artificially stabilized." data-hi="शुद्ध घी गर्मियों में पिघल जाता है और सर्दियों में जम जाता है।">Pure ghee melts in summer and solidifies in winter. The famous 'danedar' (granular) texture is a natural property of A2 Bilona ghee, proving it has not been homogenized or artificially stabilized.</div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span data-en="Does it contain preservatives or artificial colors?" data-hi="क्या इसमें परिरक्षक या कृत्रिम रंग हैं?">Does it contain preservatives or artificial colors?</span>
            <div class="faq-icon">+</div>
          </div>
          <div class="faq-answer" data-en="Zero. Swarna Ghee is 100% pure and natural, free from any preservatives, colors, or chemical additives." data-hi="शून्य। स्वर्ण घी 100% शुद्ध और प्राकृतिक है।">Zero. Swarna Ghee is 100% pure and natural, free from any preservatives, colors, or chemical additives.</div>
        </div>

      </div>
    </div>
  </section>
`;

// Update product.html
let prod = fs.readFileSync('product.html', 'utf8');

// Insert Trust Strip after hero
if (!prod.includes('trust-strip')) {
  prod = prod.replace('</section>\r\n\r\n  <!-- MATH OF AUTHENTICITY -->', '</section>\r\n' + trustStripHTML + '\r\n  <!-- MATH OF AUTHENTICITY -->');
}
// Insert Comparison after math section
if (!prod.includes('comparison-section')) {
  prod = prod.replace('</div>\r\n  </div>\r\n\r\n  <!-- Process Video Placeholder -->', '</div>\r\n  </div>\r\n' + comparisonHTML + '\r\n  <!-- Process Video Placeholder -->');
}
// Insert FAQ before footer
if (!prod.includes('faq-section')) {
  prod = prod.replace('<!-- Site Footer -->', faqHTML + '\r\n  <!-- Site Footer -->');
}
fs.writeFileSync('product.html', prod, 'utf8');
console.log('Updated product.html');

// Update index.html
let index = fs.readFileSync('index.html', 'utf8');

if (!index.includes('trust-strip')) {
  index = index.replace('<!-- Horizontal Category Stories', trustStripHTML + '\r\n  <!-- Horizontal Category Stories');
}
if (!index.includes('comparison-section')) {
  index = index.replace('<!-- ═══════════════════════════════════════════════\r\n       HIMALAYAN DIFFERENCE SECTION', comparisonHTML + '\r\n  <!-- ═══════════════════════════════════════════════\r\n       HIMALAYAN DIFFERENCE SECTION');
}
if (!index.includes('faq-section')) {
  index = index.replace('<!-- Site Footer -->', faqHTML + '\r\n  <!-- Site Footer -->');
}
fs.writeFileSync('index.html', index, 'utf8');
console.log('Updated index.html');
