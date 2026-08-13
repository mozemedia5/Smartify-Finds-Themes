// Theme JS Initializations
document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  initPredictiveSearch();
  initVariantPickers();
  initMobileNavigation();
});

// Helper: Open Drawer
function openDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  const overlay = document.getElementById(`${drawerId}-overlay`) || document.querySelector('.drawer-overlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Helper: Close Drawer
function closeDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  const overlay = document.getElementById(`${drawerId}-overlay`) || document.querySelector('.drawer-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// 1. Slide-out Cart Drawer Logic
function initCartDrawer() {
  const cartIcon = document.querySelector('.cart-icon-trigger');
  const overlay = document.getElementById('cart-drawer-overlay');

  if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer('cart-drawer');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      closeDrawer('cart-drawer');
      closeDrawer('mobile-menu');
    });
  }

  // Bind close buttons
  document.querySelectorAll('.drawer-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const drawer = btn.closest('.drawer');
      if (drawer) {
        closeDrawer(drawer.id);
      }
    });
  });

  // AJAX Cart Operations (Progressive enhancement helper)
  const productForms = document.querySelectorAll('form[action="/cart/add"]');
  productForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(item => {
        updateCartDrawer();
        openDrawer('cart-drawer');
      })
      .catch(err => {
        console.error('Error adding to cart:', err);
        // Fallback to normal submit if ajax fails
        form.submit();
      });
    });
  });
}

// Dynamic cart drawer content updater
function updateCartDrawer() {
  fetch('/cart.js')
  .then(res => res.json())
  .then(cart => {
    // Update global cart counter bubbles
    document.querySelectorAll('.cart-count-bubble').forEach(b => {
      b.textContent = cart.item_count;
      b.style.display = cart.item_count > 0 ? 'flex' : 'none';
    });

    const body = document.querySelector('#cart-drawer .drawer-body');
    const footer = document.querySelector('#cart-drawer .drawer-footer');
    if (!body) return;

    if (cart.item_count === 0) {
      body.innerHTML = `<div class="text-center py-8"><p class="text-secondary mb-4">Your cart is empty.</p><a href="/collections/all" class="btn btn-primary">Continue Shopping</a></div>`;
      if (footer) footer.style.display = 'none';
    } else {
      let html = '<div class="cart-items-list">';
      cart.items.forEach(item => {
        html += `
          <div class="cart-item flex gap-4 py-4 border-b" style="display:flex; gap:1rem; border-bottom:1px solid var(--color-border); padding: 1rem 0;">
            <img src="${item.image || ''}" width="70" height="70" style="object-fit:cover; border-radius:var(--border-radius);" alt="${item.title}">
            <div style="flex:1;">
              <h4 style="font-size:1rem; margin-bottom:0.25rem;">${item.product_title}</h4>
              <p style="font-size:0.85rem; color:var(--color-text-secondary); margin-bottom:0.5rem;">${item.variant_title || ''}</p>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:600;">$${(item.final_line_price / 100).toFixed(2)}</span>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <input type="number" value="${item.quantity}" min="1" style="width:50px; padding:0.25rem; text-align:center;" onchange="changeCartQty(${item.key}, this.value)">
                  <button onclick="removeCartItem(${item.key})" style="background:none; border:none; color:var(--color-accent-purple); cursor:pointer; font-size:0.85rem;">Remove</button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      html += '</div>';
      body.innerHTML = html;

      if (footer) {
        footer.style.display = 'block';
        footer.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <span style="font-weight:bold;">Subtotal</span>
            <span style="font-size:1.25rem; font-weight:bold; color:var(--color-accent);">$${(cart.total_price / 100).toFixed(2)}</span>
          </div>
          <a href="/checkout" class="btn btn-primary" style="width:100%;">Proceed to Checkout</a>
        `;
      }
    }
  });
}

// Global scope helpers for drawer operations
window.removeCartItem = function(key) {
  fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: String(key), quantity: 0 })
  })
  .then(() => updateCartDrawer());
};

window.changeCartQty = function(key, qty) {
  fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: String(key), quantity: parseInt(qty) })
  })
  .then(() => updateCartDrawer());
};

// 2. Predictive Search Logic
function initPredictiveSearch() {
  const searchTrigger = document.querySelector('.search-trigger');
  const searchInput = document.querySelector('.predictive-search-input');
  const searchResults = document.getElementById('predictive-search-results');

  if (searchTrigger) {
    searchTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer('search-drawer');
      if (searchInput) setTimeout(() => searchInput.focus(), 100);
    });
  }

  if (searchInput && searchResults) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const query = searchInput.value.trim();
      if (!query) {
        searchResults.innerHTML = '';
        return;
      }

      debounceTimer = setTimeout(() => {
        fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`)
        .then(res => res.json())
        .then(data => {
          const products = data.resources.results.products;
          if (products && products.length > 0) {
            let html = '<div style="display:grid; gap:1rem;">';
            products.forEach(p => {
              html += `
                <a href="${p.url}" style="display:flex; gap:1rem; align-items:center; padding:0.5rem; border-radius:var(--border-radius); background:var(--color-bg-primary);" class="tech-card">
                  <img src="${p.image || ''}" width="40" height="40" style="object-fit:cover; border-radius:4px;">
                  <div>
                    <h4 style="font-size:0.95rem; color:var(--color-text-primary);">${p.title}</h4>
                    <span style="font-size:0.85rem; color:var(--color-accent);">$${p.price}</span>
                  </div>
                </a>
              `;
            });
            html += '</div>';
            searchResults.innerHTML = html;
          } else {
            searchResults.innerHTML = '<p class="text-secondary text-center py-4">No suggestions found.</p>';
          }
        });
      }, 300);
    });
  }
}

// 3. Variant Swatches and Options Syncing
function initVariantPickers() {
  const pickerContainers = document.querySelectorAll('.variant-picker');
  pickerContainers.forEach(container => {
    container.addEventListener('change', () => {
      const form = container.closest('form');
      if (!form) return;

      const selectedOptions = Array.from(container.querySelectorAll('input[type="radio"]:checked, select')).map(el => el.value);
      const variantJsonEl = form.querySelector('[data-variants-json]');
      if (!variantJsonEl) return;

      const variants = JSON.parse(variantJsonEl.textContent);
      const matchedVariant = variants.find(variant => {
        return variant.options.every((opt, idx) => opt === selectedOptions[idx]);
      });

      // Target both hidden input ID and select input ID field
      const masterSelect = form.querySelector('input[name="id"], select[name="id"]');
      const submitButton = form.querySelector('button[type="submit"]');
      const priceElement = form.querySelector('.product-price');

      if (matchedVariant) {
        if (masterSelect) masterSelect.value = matchedVariant.id;
        if (submitButton) {
          if (matchedVariant.available) {
            submitButton.disabled = false;
            submitButton.querySelector('.btn-text').textContent = 'Add to Cart';
          } else {
            submitButton.disabled = true;
            submitButton.querySelector('.btn-text').textContent = 'Sold Out';
          }
        }
        if (priceElement) {
          priceElement.textContent = `$${(matchedVariant.price / 100).toFixed(2)}`;
        }
      } else {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.querySelector('.btn-text').textContent = 'Unavailable';
        }
      }
    });
  });
}

// 4. Mobile responsive Menu
function initMobileNavigation() {
  const menuTrigger = document.querySelector('.mobile-menu-trigger');
  if (menuTrigger) {
    menuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer('mobile-menu');
    });
  }
}
