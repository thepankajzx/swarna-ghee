const fs = require('fs');

// 1. Update Footer HTML across all pages
const footerBottomHtml = `      <div class="footer-bottom">
        <div>© 2026 Swarna. All Rights Reserved.</div>
        <div class="footer-admin-wrap">
          <a href="admin.html" class="footer-admin-link" title="Admin Portal">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>Admin Portal</span>
          </a>
        </div>
      </div>`;

const pages = ['index.html', 'about.html', 'shop.html', 'contact.html', 'verify.html', 'product.html'];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Remove any floating admin button
  content = content.replace(/<a\s+href="admin\.html"\s+class="admin-entry-btn"[\s\S]*?<\/a>/g, '');

  // Replace footer-bottom section
  content = content.replace(/<div class="footer-bottom">[\s\S]*?<\/div>\s*<\/div>\s*<\/footer>/, footerBottomHtml + '\n    </div>\n  </footer>');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated footer admin & removed floating button in ${file}`);
});

// 2. Update styles.css to eliminate white space below footer
let css = fs.readFileSync('styles.css', 'utf8');

const footerFixes = `
/* ==========================================================================
   FOOTER ZERO-GAP & ADMIN LINK STYLES
   ========================================================================== */
body {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.site-footer {
  margin-bottom: 0 !important;
  padding-bottom: 36px !important;
  background: var(--color-dark, #181512) !important;
  color: #fff !important;
  position: relative !important;
  z-index: 10 !important;
}

@media (max-width: 768px) {
  /* On mobile with sticky bar, add padding INSIDE footer so content is accessible, zero space below footer */
  .site-footer {
    padding-bottom: 84px !important;
  }
}

.footer-bottom {
  padding-top: 20px !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 12px !important;
  font-size: 0.75rem !important;
  color: rgba(255, 255, 255, 0.5) !important;
}

.footer-admin-link {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  color: rgba(255, 255, 255, 0.45) !important;
  font-size: 0.72rem !important;
  text-decoration: none !important;
  padding: 4px 10px !important;
  border-radius: 6px !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  background: rgba(255, 255, 255, 0.03) !important;
  transition: all 0.2s ease !important;
}

.footer-admin-link:hover {
  color: #d4af37 !important;
  border-color: #d4af37 !important;
  background: rgba(212, 175, 55, 0.1) !important;
}

/* Hide floating admin button completely */
.admin-entry-btn {
  display: none !important;
}
`;

css += '\n' + footerFixes;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended footer gap and admin fixes to styles.css');
