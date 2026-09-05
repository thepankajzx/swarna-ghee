const fs = require('fs');

const waHtml = `  <!-- Floating WhatsApp Help & Support -->
  <a href="https://wa.me/917018168156?text=Hello%20Swarna%20Care,%20I%20need%20help%20with%20my%20order%20or%20have%20a%20question." class="floating-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Customer Support on WhatsApp">
    <span class="wa-help-badge" data-en="Need Help? Chat with us" data-hi="सहायता चाहिए? चैट करें">Need Help? <strong>Chat with us</strong></span>
    <div class="wa-icon-box">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
    </div>
  </a>`;

const pages = ['index.html', 'about.html', 'shop.html', 'contact.html', 'verify.html', 'product.html'];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // If it already has floating-whatsapp, replace it
  if (content.includes('class="floating-whatsapp"')) {
    content = content.replace(/<!-- Floating WhatsApp -->[\s\S]*?<\/a>/, waHtml);
    content = content.replace(/<a\s+href="https:\/\/wa\.me\/[^"]*"\s+class="floating-whatsapp"[\s\S]*?<\/a>/, waHtml);
  } else {
    // If missing (like in product.html), insert before </body> or before first <script> at bottom
    if (content.includes('</body>')) {
      content = content.replace('</body>', waHtml + '\n</body>');
    } else {
      content += '\n' + waHtml;
    }
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated WhatsApp Help Button in ${file}`);
});

// Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');

const waCSS = `
/* ==========================================================================
   FLOATING WHATSAPP HELP BUTTON
   ========================================================================== */
.floating-whatsapp {
  position: fixed;
  bottom: 84px; /* Above mobile sticky bar */
  right: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 99;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.wa-help-badge {
  background: #ffffff;
  color: #0f172a;
  padding: 7px 13px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 500;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  border: 1px solid #e2e8f0;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
}
.wa-help-badge strong {
  color: #16a34a;
  font-weight: 700;
}

.wa-icon-box {
  width: 52px;
  height: 52px;
  background-color: #25d366;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 18px rgba(37, 211, 102, 0.45);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  flex-shrink: 0;
}

.floating-whatsapp:hover .wa-icon-box {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.6);
}
.floating-whatsapp:hover .wa-help-badge {
  border-color: #25d366;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.16);
}

@media (min-width: 992px) {
  .floating-whatsapp {
    bottom: 24px;
    right: 24px;
  }
  .wa-icon-box {
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 480px) {
  .wa-help-badge {
    font-size: 0.72rem;
    padding: 5px 10px;
  }
}
`;

// Replace old .floating-whatsapp rules if existing, or append
css += '\n' + waCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Updated styles.css with WhatsApp Help Button styling');
