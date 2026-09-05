const fs = require('fs');

const compactFooterHtml = `  <!-- Site Ultra-Compact Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-compact-row">
        <!-- Brand & Tagline -->
        <div class="footer-brand-box">
          <span class="footer-brand-name">Swarna</span>
          <span class="footer-brand-tagline">100% Pure Vedic A2 Gir Cow Bilona Ghee</span>
        </div>

        <!-- Quick Links (Inline) -->
        <div class="footer-nav-inline">
          <a href="index.html">Home</a>
          <span class="f-dot">&bull;</span>
          <a href="product.html">Featured Drop</a>
          <span class="f-dot">&bull;</span>
          <a href="about.html">Our Story</a>
          <span class="f-dot">&bull;</span>
          <a href="verify.html">Our Promise</a>
          <span class="f-dot">&bull;</span>
          <a href="contact.html">Contact</a>
        </div>

        <!-- Help Pill -->
        <div class="footer-action-box">
          <a href="https://wa.me/917018168156?text=Hello%20Swarna%20Care,%20I%20need%20help%20with%20my%20order%20or%20products." 
             class="footer-wa-card" 
             target="_blank" 
             rel="noopener noreferrer" 
             aria-label="Contact Swarna Care on WhatsApp">
            <div class="footer-wa-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.25-1.92 1.33-.5.08-1.15.11-3.69-.94-2.17-.9-3.57-3.11-3.68-3.26-.11-.15-.88-1.17-.88-2.23 0-1.06.56-1.58.76-1.8.2-.22.44-.28.59-.28.15 0 .3 0 .43.01.14.01.32-.05.5.39.19.46.65 1.58.71 1.7.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z"/>
              </svg>
            </div>
            <div class="footer-wa-text">
              <span class="f-wa-title" data-en="Need Help?" data-hi="सहायता?">Need Help?</span>
              <span class="f-wa-sub" data-en="Chat with us" data-hi="चैट करें">Chat with us</span>
            </div>
            <div class="footer-wa-arrow">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </a>
        </div>
      </div>

      <!-- Bottom Line: Copyright & Admin -->
      <div class="footer-bottom">
        <div>© 2026 Swarna. All Rights Reserved. &bull; Himachal Pradesh</div>
        <div class="footer-admin-wrap">
          <a href="admin.html" class="footer-admin-link" title="Admin Portal">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>Admin</span>
          </a>
        </div>
      </div>
    </div>
  </footer>`;

const pages = ['index.html', 'about.html', 'shop.html', 'contact.html', 'verify.html', 'product.html'];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace site footer with ultra compact version
  content = content.replace(/<!-- Site (?:Ultra-Compact )?Footer -->[\s\S]*?<\/footer>/, compactFooterHtml);
  content = content.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/, compactFooterHtml);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated compact footer in ${file}`);
});

// Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');

const ultraCompactCSS = `
/* ==========================================================================
   ULTRA-COMPACT 2-LINE FOOTER (DESKTOP & MOBILE)
   ========================================================================== */
.site-footer {
  background: #12100e !important;
  color: #94a3b8 !important;
  padding: 22px 0 16px !important;
  margin-top: 30px !important;
  margin-bottom: 0 !important;
  position: relative !important;
  z-index: 10 !important;
}

.footer-compact-row {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  flex-wrap: wrap !important;
  gap: 14px 20px !important;
  padding-bottom: 14px !important;
}

.footer-brand-box {
  display: flex !important;
  flex-direction: column !important;
  gap: 2px !important;
}
.footer-brand-name {
  font-family: 'Playfair Display', serif !important;
  font-size: 1.2rem !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  letter-spacing: 0.02em !important;
  line-height: 1.1 !important;
}
.footer-brand-tagline {
  font-size: 0.7rem !important;
  color: #d4af37 !important;
  letter-spacing: 0.03em !important;
}

.footer-nav-inline {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  flex-wrap: wrap !important;
  font-size: 0.76rem !important;
  font-weight: 600 !important;
}
.footer-nav-inline a {
  color: #cbd5e1 !important;
  text-decoration: none !important;
  transition: color 0.2s !important;
}
.footer-nav-inline a:hover {
  color: #d4af37 !important;
}
.f-dot {
  color: rgba(255, 255, 255, 0.2) !important;
  font-size: 0.6rem !important;
}

.footer-wa-card {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: #ffffff !important;
  border: 1.5px solid #25d366 !important;
  border-radius: 9999px !important;
  padding: 4px 12px 4px 6px !important;
  margin: 0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
  flex-shrink: 0 !important;
}
.footer-wa-card:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3) !important;
}
.footer-wa-icon {
  width: 28px !important;
  height: 28px !important;
  background: #25d366 !important;
  color: #ffffff !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}
.footer-wa-icon svg {
  width: 16px !important;
  height: 16px !important;
  fill: #ffffff !important;
}
.f-wa-title { font-size: 0.62rem !important; }
.f-wa-sub { font-size: 0.74rem !important; }
.footer-wa-arrow {
  width: 18px !important;
  height: 18px !important;
}
.footer-wa-arrow svg {
  width: 10px !important;
  height: 10px !important;
}

.footer-bottom {
  padding-top: 12px !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 10px !important;
  font-size: 0.68rem !important;
  color: rgba(255, 255, 255, 0.4) !important;
}

@media (max-width: 768px) {
  .site-footer {
    padding: 16px 0 14px !important;
    margin-top: 20px !important;
  }
  .footer-compact-row {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 10px !important;
    padding-bottom: 10px !important;
  }
  .footer-brand-name {
    font-size: 1.05rem !important;
  }
  .footer-nav-inline {
    gap: 6px !important;
    font-size: 0.72rem !important;
  }
  .footer-bottom {
    flex-direction: row !important;
    justify-content: space-between !important;
    font-size: 0.65rem !important;
    padding-top: 8px !important;
  }
}
`;

css += '\n' + ultraCompactCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended ultra compact footer CSS to styles.css');
