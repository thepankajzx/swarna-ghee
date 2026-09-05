const fs = require('fs');

const widgetHtml = `  <!-- Draggable & Expandable WhatsApp Concierge -->
  <div id="swarna-wa-widget" class="swarna-wa-widget collapsed">
    <div class="swarna-wa-trigger" id="swarna-wa-trigger" title="Need Help? Chat with us">
      <div class="wa-widget-icon">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.25-1.92 1.33-.5.08-1.15.11-3.69-.94-2.17-.9-3.57-3.11-3.68-3.26-.11-.15-.88-1.17-.88-2.23 0-1.06.56-1.58.76-1.8.2-.22.44-.28.59-.28.15 0 .3 0 .43.01.14.01.32-.05.5.39.19.46.65 1.58.71 1.7.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z"/>
        </svg>
      </div>
      <div class="wa-widget-content">
        <div class="wa-widget-text">
          <span class="wa-w-title" data-en="Need Help?" data-hi="सहायता चाहिए?">Need Help?</span>
          <span class="wa-w-sub" data-en="Chat with us" data-hi="चैट करें">Chat with us</span>
        </div>
        <div class="wa-arrow-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  </div>`;

const pages = ['index.html', 'about.html', 'shop.html', 'contact.html', 'verify.html', 'product.html'];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Clean old whatsapp widgets
  content = content.replace(/<!-- Floating WhatsApp[\s\S]*?<\/a>/g, '');
  content = content.replace(/<!-- Draggable[\s\S]*?<\/div>\s*<\/div>/g, '');
  content = content.replace(/<a\s+[^>]*class="swarna-help-pill"[\s\S]*?<\/a>/g, '');
  content = content.replace(/<div\s+id="swarna-wa-widget"[\s\S]*?<\/div>\s*<\/div>/g, '');
  
  if (content.includes('</body>')) {
    content = content.replace('</body>', widgetHtml + '\n</body>');
  } else {
    content += '\n' + widgetHtml;
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated widget in ${file}`);
});

// Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');

// Remove old help pill CSS if present
const waCSS = `
/* ==========================================================================
   INTERACTIVE DRAGGABLE & EXPANDABLE WHATSAPP WIDGET
   ========================================================================== */
.swarna-wa-widget {
  position: fixed;
  bottom: 84px;
  right: 16px;
  z-index: 9999;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}

.swarna-wa-trigger {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(37, 211, 102, 0.3);
  cursor: grab;
  transition: width 0.32s cubic-bezier(0.34, 1.4, 0.64, 1),
              padding 0.32s cubic-bezier(0.34, 1.4, 0.64, 1),
              box-shadow 0.25s ease,
              border-color 0.25s ease;
  overflow: hidden;
  border: 1.5px solid #25d366;
  height: 52px;
  box-sizing: border-box;
}

.swarna-wa-trigger:active {
  cursor: grabbing;
}

/* Collapsed State: Compact Circular Icon */
.swarna-wa-widget.collapsed .swarna-wa-trigger {
  width: 52px;
  padding: 0;
  justify-content: center;
}
.swarna-wa-widget.collapsed .wa-widget-content {
  opacity: 0;
  max-width: 0;
  padding-left: 0;
  pointer-events: none;
  transform: translateX(10px);
}

/* Expanded State: Full Pill */
.swarna-wa-widget.expanded .swarna-wa-trigger {
  width: auto;
  padding: 6px 14px 6px 7px;
  background: #ffffff;
  border-color: #25d366;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22), 0 4px 14px rgba(37, 211, 102, 0.4);
}
.swarna-wa-widget.expanded .wa-widget-content {
  opacity: 1;
  max-width: 220px;
  padding-left: 10px;
  pointer-events: auto;
  transform: translateX(0);
}

.wa-widget-icon {
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
.wa-widget-icon svg {
  display: block;
  fill: #ffffff;
}

.wa-widget-content {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: opacity 0.2s ease, max-width 0.32s ease, transform 0.2s ease, padding 0.2s ease;
  white-space: nowrap;
}

.wa-widget-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  text-align: left;
}

.wa-w-title {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 500;
}

.wa-w-sub {
  font-size: 0.84rem;
  color: #0f172a;
  font-weight: 700;
}

.wa-arrow-chip {
  width: 24px;
  height: 24px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #16a34a;
  flex-shrink: 0;
}

@media (min-width: 992px) {
  .swarna-wa-widget {
    bottom: 24px;
    right: 24px;
  }
  .swarna-wa-trigger {
    height: 56px;
  }
  .swarna-wa-widget.collapsed .swarna-wa-trigger {
    width: 56px;
  }
  .wa-widget-icon {
    width: 42px;
    height: 42px;
  }
}

@media (max-width: 480px) {
  .swarna-wa-widget {
    bottom: 80px;
    right: 14px;
  }
  .swarna-wa-trigger {
    height: 48px;
  }
  .swarna-wa-widget.collapsed .swarna-wa-trigger {
    width: 48px;
  }
  .wa-widget-icon {
    width: 34px;
    height: 34px;
  }
  .wa-widget-icon svg {
    width: 20px;
    height: 20px;
  }
  .wa-w-title { font-size: 0.65rem; }
  .wa-w-sub { font-size: 0.76rem; }
}
`;

css += '\n' + waCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended Draggable WhatsApp CSS to styles.css');

// Update app.js
let js = fs.readFileSync('app.js', 'utf8');

const draggableJs = `
// ── Draggable & Expandable WhatsApp Concierge Logic ──
(function initDraggableWhatsApp() {
  function setup() {
    const widget = document.getElementById('swarna-wa-widget');
    const trigger = document.getElementById('swarna-wa-trigger');
    if (!widget || !trigger) return;

    let isDragging = false;
    let hasMoved = false;
    let startX, startY;
    let initialLeft, initialTop;

    function onStart(e) {
      const point = e.touches ? e.touches[0] : e;
      startX = point.clientX;
      startY = point.clientY;
      hasMoved = false;
      isDragging = true;

      const rect = widget.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      widget.style.right = 'auto';
      widget.style.bottom = 'auto';
      widget.style.left = initialLeft + 'px';
      widget.style.top = initialTop + 'px';
    }

    function onMove(e) {
      if (!isDragging) return;
      const point = e.touches ? e.touches[0] : e;
      const deltaX = point.clientX - startX;
      const deltaY = point.clientY - startY;

      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        hasMoved = true;
        if (e.cancelable) e.preventDefault();
      }

      if (hasMoved) {
        const maxX = window.innerWidth - widget.offsetWidth - 10;
        const maxY = window.innerHeight - widget.offsetHeight - 10;
        const newX = Math.max(10, Math.min(maxX, initialLeft + deltaX));
        const newY = Math.max(10, Math.min(maxY, initialTop + deltaY));

        widget.style.left = newX + 'px';
        widget.style.top = newY + 'px';
      }
    }

    function onEnd() {
      if (!isDragging) return;
      isDragging = false;

      if (hasMoved) {
        // Snap smoothly to closest edge
        const rect = widget.getBoundingClientRect();
        const midX = window.innerWidth / 2;
        widget.style.transition = 'left 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)';
        if (rect.left + rect.width / 2 < midX) {
          widget.style.left = '16px';
        } else {
          widget.style.left = (window.innerWidth - widget.offsetWidth - 16) + 'px';
        }
        setTimeout(() => { widget.style.transition = ''; }, 300);
        return;
      }

      // Tap Interaction:
      if (widget.classList.contains('collapsed')) {
        // Expand
        widget.classList.remove('collapsed');
        widget.classList.add('expanded');
      } else {
        // Open WhatsApp
        const waUrl = "https://wa.me/917018168156?text=Hello%20Swarna%20Care,%20I%20need%20help%20with%20my%20order%20or%20products.";
        window.open(waUrl, '_blank');
      }
    }

    trigger.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    trigger.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);

    // Auto-collapse when clicking outside
    document.addEventListener('click', (e) => {
      if (!widget.contains(e.target) && widget.classList.contains('expanded')) {
        widget.classList.remove('expanded');
        widget.classList.add('collapsed');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
`;

js += '\n' + draggableJs;
fs.writeFileSync('app.js', js, 'utf8');
console.log('Appended draggable WhatsApp logic to app.js');
