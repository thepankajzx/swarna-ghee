const fs = require('fs');

// 1. Update app.js Coverflow rendering and tap logic
let js = fs.readFileSync('app.js', 'utf8');

// Replace the render and attachEvents in CoverflowCarousel
const oldRenderBlockStart = js.indexOf('class CoverflowCarousel {');
const oldRenderBlockEnd = js.indexOf('// Initialize Coverflow Carousel', oldRenderBlockStart);

if (oldRenderBlockStart !== -1 && oldRenderBlockEnd !== -1) {
  const newCoverflowClass = `class CoverflowCarousel {
  constructor(containerId, items) {
    this.container = document.getElementById(containerId);
    this.items = items || [];
    this.currentIndex = 0;
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.hasMoved = false;
    this.autoPlayTimer = null;
    if (this.container && this.items.length > 0) {
      this.init();
    }
  }
  init() {
    this.render();
    this.updateSlides();
    this.attachEvents();
    this.startAutoPlay();
  }
  render() {
    this.container.innerHTML = \`
      <section class="hero-showcase-section">
        <div class="coverflow-stage" id="coverflow-stage">
          <!-- Left Arrow -->
          <button class="coverflow-side-btn left" id="coverflow-prev" aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div class="coverflow-track" id="coverflow-track">
            \${this.items.map((item, idx) => \`
              <div class="coverflow-slide" data-index="\${idx}" data-link="\${item.link || '#'}">
                <div class="coverflow-card-inner">
                  \${item.isDiagram ? \`
                    <div class="coverflow-diagram-card">
                      <div class="diagram-bg-radial"></div>
                      <div class="diagram-top-pill">✦ VEDIC BILONA CYCLE ✦</div>
                      <div class="diagram-main-circle">
                        <div class="d-circle-center">
                          <span class="d-circle-icon">✨</span>
                          <span class="d-circle-text">Swarna<br>Pure Ghee</span>
                        </div>
                        <div class="d-orbit-node node-top">
                          <span class="d-node-icon">🏔️</span>
                          <span class="d-node-title">Gir Cow</span>
                        </div>
                        <div class="d-orbit-node node-right">
                          <span class="d-node-icon">🏺</span>
                          <span class="d-node-title">Curd</span>
                        </div>
                        <div class="d-orbit-node node-bottom">
                          <span class="d-node-icon">🔥</span>
                          <span class="d-node-title">Slow Fire</span>
                        </div>
                        <div class="d-orbit-node node-left">
                          <span class="d-node-icon">🪵</span>
                          <span class="d-node-title">Bilona</span>
                        </div>
                      </div>
                      <div class="diagram-footer-stats">
                        <div class="d-stat-pill"><strong>12+</strong> Households</div>
                        <div class="d-stat-pill"><strong>0%</strong> Chem</div>
                        <div class="d-stat-pill"><strong>A2</strong> Pure</div>
                      </div>
                    </div>
                  \` : \`
                    <img src="\${item.image}" alt="\${item.title}" class="coverflow-img">
                  \`}
                  <div class="slide-overlay-info">
                    <div class="slide-info-left">
                      <div class="slide-title">\${item.title}</div>
                      <div class="slide-category">\${item.subtitle || ''}</div>
                    </div>
                    <div class="slide-info-right">
                      <div class="slide-price-current">\${item.price || ''}</div>
                      \${item.mrp ? \`<div class="slide-price-mrp">\${item.mrp}</div>\` : ''}
                    </div>
                  </div>
                </div>
              </div>
            \`).join('')}
          </div>
          <!-- Right Arrow -->
          <button class="coverflow-side-btn right" id="coverflow-next" aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </section>
    \`;
  }
  attachEvents() {
    const prevBtn = document.getElementById('coverflow-prev');
    const nextBtn = document.getElementById('coverflow-next');
    const stage = document.getElementById('coverflow-stage');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stopAutoPlay();
        this.prev();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stopAutoPlay();
        this.next();
      });
    }
    if (stage) {
      // Tap / Click handling for mobile & desktop
      stage.addEventListener('click', (e) => {
        const slide = e.target.closest('.coverflow-slide');
        if (slide) {
          const idx = parseInt(slide.dataset.index, 10);
          if (idx === this.currentIndex) {
            if (slide.dataset.link && slide.dataset.link !== '#') {
              window.location.href = slide.dataset.link;
            }
          } else {
            this.stopAutoPlay();
            this.goTo(idx);
          }
        }
      });
      // Touch Handling with tap vs drag distinction
      stage.addEventListener('touchstart', (e) => {
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        this.currentX = this.startX;
        this.hasMoved = false;
        this.stopAutoPlay();
      }, { passive: true });
      stage.addEventListener('touchmove', (e) => {
        if (!this.isDragging) return;
        this.currentX = e.touches[0].clientX;
        if (Math.abs(this.startX - this.currentX) > 12) {
          this.hasMoved = true;
        }
      }, { passive: true });
      stage.addEventListener('touchend', () => {
        if (!this.isDragging) return;
        this.isDragging = false;
        if (this.hasMoved) {
          const diff = this.startX - this.currentX;
          if (Math.abs(diff) > 30) {
            diff > 0 ? this.next() : this.prev();
          }
        }
      });
      stage.addEventListener('mouseenter', () => this.stopAutoPlay());
      stage.addEventListener('mouseleave', () => this.startAutoPlay());
    }
  }
  updateSlides() {
    const slides = this.container.querySelectorAll('.coverflow-slide');
    const total = this.items.length;
    slides.forEach((slide, idx) => {
      slide.className = 'coverflow-slide';
      const diff = (idx - this.currentIndex + total) % total;
      if (diff === 0) slide.classList.add('active');
      else if (diff === 1) slide.classList.add('next-1');
      else if (diff === 2) slide.classList.add('next-2');
      else if (diff === total - 1) slide.classList.add('prev-1');
      else if (diff === total - 2) slide.classList.add('prev-2');
      else slide.classList.add('hidden-offscreen');
    });
  }
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateSlides();
  }
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateSlides();
  }
  goTo(idx) {
    this.currentIndex = idx;
    this.updateSlides();
  }
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => this.next(), 4000);
  }
  stopAutoPlay() {
    if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
  }
}
`;
  js = js.substring(0, oldRenderBlockStart) + newCoverflowClass + js.substring(oldRenderBlockEnd);
}

// Update the items array in app.js
js = js.replace(
  /swarnaProducts\.push\(\{\s*title:\s*"ETHICAL PASTURES",[\s\S]*?\}\);/,
  `swarnaProducts.push({
          title: "VEDIC BILONA PROCESS",
          subtitle: "100% Curd Churned Heritage",
          price: "Explore →",
          mrp: "",
          isDiagram: true,
          link: "about.html"
        });`
);

js = js.replace(
  /\{ title: "ETHICAL PASTURES", subtitle: "Grass-Fed", price: "View", mrp: "", image: "\.\/images\/farm-cows\.jpg", link: "about\.html" \}/,
  `{ title: "VEDIC BILONA PROCESS", subtitle: "100% Curd Churned", price: "Explore →", mrp: "", isDiagram: true, link: "about.html" }`
);

fs.writeFileSync('app.js', js, 'utf8');
console.log('Updated app.js with diagram card & click handler');

// 2. Update styles.css with diagram card CSS
let css = fs.readFileSync('styles.css', 'utf8');

const diagramCSS = `
/* ==========================================================================
   AUTHENTIC VEDIC BILONA DIAGRAM CARD (COVERFLOW CAROUSEL)
   ========================================================================== */
.coverflow-diagram-card {
  width: 100%;
  height: 100%;
  background: linear-gradient(155deg, #181512 0%, #2a2118 60%, #15110d 100%) !important;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 22px 14px 76px; /* Room for frosted bottom bar */
  box-sizing: border-box;
  overflow: hidden;
  border: 1.5px solid rgba(212, 175, 55, 0.4) !important;
}

.diagram-bg-radial {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

.diagram-top-pill {
  background: rgba(212, 175, 55, 0.15) !important;
  border: 1px solid rgba(212, 175, 55, 0.5) !important;
  color: #f7e7b4 !important;
  font-size: 0.62rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.12em !important;
  padding: 3px 10px !important;
  border-radius: 9999px !important;
  text-transform: uppercase !important;
  z-index: 2;
  white-space: nowrap !important;
}

.diagram-main-circle {
  position: relative;
  width: 155px;
  height: 155px;
  border-radius: 50%;
  border: 1.5px dashed rgba(212, 175, 55, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 0;
  z-index: 2;
}

.d-circle-center {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #d4af37, #9a781b);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #181512;
  text-align: center;
  box-shadow: 0 0 18px rgba(212, 175, 55, 0.45);
}
.d-circle-icon { font-size: 1rem; line-height: 1; }
.d-circle-text { font-size: 0.58rem; font-weight: 800; line-height: 1.1; margin-top: 2px; }

.d-orbit-node {
  position: absolute;
  background: #181512;
  border: 1.5px solid #d4af37;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}
.d-node-icon { font-size: 0.78rem; line-height: 1; }
.d-node-title { font-size: 0.5rem; color: #f7e7b4; font-weight: 700; margin-top: 1px; }

.node-top { top: -20px; left: calc(50% - 20px); }
.node-right { right: -20px; top: calc(50% - 20px); }
.node-bottom { bottom: -20px; left: calc(50% - 20px); }
.node-left { left: -20px; top: calc(50% - 20px); }

.diagram-footer-stats {
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 2;
  width: 100%;
  justify-content: center;
}
.d-stat-pill {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  color: #e2e8f0 !important;
  font-size: 0.6rem !important;
  padding: 3px 6px !important;
  border-radius: 6px !important;
  display: flex !important;
  align-items: center !important;
  gap: 3px !important;
  white-space: nowrap !important;
}
.d-stat-pill strong { color: #d4af37 !important; font-weight: 800 !important; }

@media (min-width: 992px) {
  .diagram-main-circle {
    width: 190px;
    height: 190px;
  }
  .d-circle-center {
    width: 88px;
    height: 88px;
  }
  .d-orbit-node {
    width: 48px;
    height: 48px;
  }
  .node-top { top: -24px; left: calc(50% - 24px); }
  .node-right { right: -24px; top: calc(50% - 24px); }
  .node-bottom { bottom: -24px; left: calc(50% - 24px); }
  .node-left { left: -24px; top: calc(50% - 24px); }
}
`;

css += '\n' + diagramCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended diagram CSS to styles.css');
