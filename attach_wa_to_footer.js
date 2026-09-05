const fs = require('fs');

// 1. Unified Footer Component
const footerWaPill = `          <a href="https://wa.me/917018168156?text=Hello%20Swarna%20Care,%20I%20need%20help%20with%20my%20order%20or%20products." 
             class="footer-wa-card" 
             target="_blank" 
             rel="noopener noreferrer" 
             aria-label="Contact Swarna Care on WhatsApp">
            <div class="footer-wa-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.25-1.92 1.33-.5.08-1.15.11-3.69-.94-2.17-.9-3.57-3.11-3.68-3.26-.11-.15-.88-1.17-.88-2.23 0-1.06.56-1.58.76-1.8.2-.22.44-.28.59-.28.15 0 .3 0 .43.01.14.01.32-.05.5.39.19.46.65 1.58.71 1.7.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z"/>
              </svg>
            </div>
            <div class="footer-wa-text">
              <span class="f-wa-title" data-en="Need Help?" data-hi="सहायता चाहिए?">Need Help?</span>
              <span class="f-wa-sub" data-en="Chat with us" data-hi="चैट करें">Chat with us</span>
            </div>
            <div class="footer-wa-arrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </a>`;

const siteFooterHtml = `  <!-- Site Footer -->
  <footer class="site-footer" style="margin-top: 40px;">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>Swarna</h3>
          <p>Dedicated to pure Vedic nutrition with zero chemicals and ethical Gir cow care.</p>
          <div style="color: var(--color-gold); font-size: 0.85rem; margin-top: 6px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" class="green-verified-icon">
              <circle cx="12" cy="12" r="10" fill="#10B981" />
              <path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg> <span style="margin-left: 5px;">100% Pure &bull; Natural Vedic Freshness</span>
          </div>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="product.html">Featured Drop</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contact & Care</h4>
          <div class="footer-contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>+91 7018168156</span>
          </div>
          <div class="footer-contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-svg"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            <span>care@swarnanaturals.com</span>
          </div>
${footerWaPill}
        </div>
      </div>

      <div class="footer-bottom">
        <div>© 2026 Swarna. All Rights Reserved.</div>
      </div>
    </div>
  </footer>`;

const pages = ['index.html', 'about.html', 'shop.html', 'contact.html', 'verify.html', 'product.html'];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Remove ALL floating whatsapp code
  content = content.replace(/<!-- Draggable[\s\S]*?<\/div>\s*<\/div>/g, '');
  content = content.replace(/<div\s+id="swarna-wa-widget"[\s\S]*?<\/div>\s*<\/div>/g, '');
  content = content.replace(/<!-- Floating WhatsApp[\s\S]*?<\/a>/g, '');
  content = content.replace(/<a\s+[^>]*class="swarna-help-pill"[\s\S]*?<\/a>/g, '');
  content = content.replace(/<a\s+[^>]*class="floating-whatsapp"[\s\S]*?<\/a>/g, '');

  // Replace or insert site footer
  if (content.includes('<footer class="site-footer"')) {
    content = content.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/, siteFooterHtml);
  } else if (file === 'product.html') {
    // Add before policy modal or drawer in product.html
    content = content.replace('<!-- Policy Guidelines Modal -->', siteFooterHtml + '\n\n  <!-- Policy Guidelines Modal -->');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated footer in ${file}`);
});

// Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');

const footerWaCSS = `
/* ==========================================================================
   STATIC FOOTER WHATSAPP HELP CARD (NO FLOATING)
   ========================================================================== */
.footer-wa-card {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 1.5px solid #25d366;
  border-radius: 9999px;
  padding: 5px 14px 5px 6px;
  margin-top: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(37, 211, 102, 0.2);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  width: fit-content;
  box-sizing: border-box;
}

.footer-wa-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(37, 211, 102, 0.35);
  border-color: #1ebe5d;
  background: #fdfdfd;
}

.footer-wa-icon {
  width: 34px;
  height: 34px;
  background: #25d366;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(37, 211, 102, 0.35);
}
.footer-wa-icon svg {
  fill: #ffffff;
  display: block;
}

.footer-wa-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  text-align: left;
}

.f-wa-title {
  font-size: 0.68rem;
  color: #64748b;
  font-weight: 500;
}

.f-wa-sub {
  font-size: 0.82rem;
  color: #0f172a;
  font-weight: 700;
}

.footer-wa-arrow {
  width: 22px;
  height: 22px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #16a34a;
  flex-shrink: 0;
  margin-left: 2px;
}

/* Hide floating elements */
.swarna-wa-widget, .floating-whatsapp, .swarna-help-pill {
  display: none !important;
}
`;

css += '\n' + footerWaCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended footer WhatsApp CSS to styles.css');
