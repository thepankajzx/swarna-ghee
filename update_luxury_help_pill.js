const fs = require('fs');

const helpPillHtml = `  <!-- Floating WhatsApp Help & Care Concierge -->
  <a href="https://wa.me/917018168156?text=Hello%20Swarna%20Care,%20I%20need%20help%20with%20my%20order%20or%20products." 
     class="swarna-help-pill" 
     target="_blank" 
     rel="noopener noreferrer" 
     aria-label="Contact Swarna Care on WhatsApp">
    <div class="help-pill-icon">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.25-1.92 1.33-.5.08-1.15.11-3.69-.94-2.17-.9-3.57-3.11-3.68-3.26-.11-.15-.88-1.17-.88-2.23 0-1.06.56-1.58.76-1.8.2-.22.44-.28.59-.28.15 0 .3 0 .43.01.14.01.32-.05.5.39.19.46.65 1.58.71 1.7.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z"/>
      </svg>
    </div>
    <div class="help-pill-text">
      <span class="help-title" data-en="Need Help?" data-hi="सहायता चाहिए?">Need Help?</span>
      <span class="help-sub" data-en="Chat with us" data-hi="चैट करें">Chat with us</span>
    </div>
  </a>`;

const pages = ['index.html', 'about.html', 'shop.html', 'contact.html', 'verify.html', 'product.html'];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove any old floating-whatsapp or swarna-help-pill
  content = content.replace(/<!-- Floating WhatsApp[\s\S]*?<\/a>/g, '');
  content = content.replace(/<a\s+href="https:\/\/wa\.me\/[^"]*"\s+class="floating-whatsapp"[\s\S]*?<\/a>/g, '');
  content = content.replace(/<a\s+href="https:\/\/wa\.me\/[^"]*"\s+class="swarna-help-pill"[\s\S]*?<\/a>/g, '');
  
  // Cleanly insert the new pill before </body>
  if (content.includes('</body>')) {
    content = content.replace('</body>', helpPillHtml + '\n</body>');
  } else {
    content += '\n' + helpPillHtml;
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated Help Pill in ${file}`);
});

// Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');

const pillCSS = `
/* ==========================================================================
   LUXURY FLOATING HELP PILL
   ========================================================================== */
.swarna-help-pill {
  position: fixed;
  bottom: 84px; /* Above mobile action bar */
  right: 16px;
  z-index: 999;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 1.5px solid #25d366;
  border-radius: 9999px;
  padding: 6px 15px 6px 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(37, 211, 102, 0.25);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  -webkit-tap-highlight-color: transparent;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
}

.swarna-help-pill:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18), 0 4px 14px rgba(37, 211, 102, 0.4);
  background: #ffffff;
  border-color: #1ebe5d;
}

.help-pill-icon {
  width: 38px;
  height: 38px;
  background: #25d366;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(37, 211, 102, 0.4);
}
.help-pill-icon svg {
  display: block;
  fill: #ffffff;
}

.help-pill-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  text-align: left;
}

.help-title {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.help-sub {
  font-size: 0.84rem;
  color: #0f172a;
  font-weight: 700;
}

@media (min-width: 992px) {
  .swarna-help-pill {
    bottom: 24px;
    right: 24px;
    padding: 8px 18px 8px 10px;
    gap: 12px;
  }
  .help-pill-icon {
    width: 42px;
    height: 42px;
  }
  .help-title {
    font-size: 0.74rem;
  }
  .help-sub {
    font-size: 0.88rem;
  }
}

@media (max-width: 480px) {
  .swarna-help-pill {
    bottom: 80px;
    right: 12px;
    padding: 5px 12px 5px 6px;
    gap: 8px;
    max-width: calc(100vw - 24px);
  }
  .help-pill-icon {
    width: 34px;
    height: 34px;
  }
  .help-pill-icon svg {
    width: 18px;
    height: 18px;
  }
  .help-title {
    font-size: 0.65rem;
  }
  .help-sub {
    font-size: 0.78rem;
  }
}
`;

css += '\n' + pillCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended luxury help pill CSS');
