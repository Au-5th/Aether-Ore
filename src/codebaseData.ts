export interface CodeFile {
  name: string;
  path: string;
  language: string;
  content: string;
}

export const CODEBASE_FILES: CodeFile[] = [
  {
    name: "index.html",
    path: "index.html",
    language: "html",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AETHER & ORE | Engineered Skincare & Machined Hardware</title>
  
  <!-- Preload Critical Above-The-Fold Assets (LCP < 1.2s) -->
  <link rel="preload" href="assets/hero photograph of an anodized dark titanium flask with knurled copper cap.webp" as="image" fetchpriority="high">
  
  <link rel="stylesheet" href="/css/variables.css">
  <link rel="stylesheet" href="/css/layout.css">
  <link rel="stylesheet" href="/css/components.css">
</head>
<body>
  <!-- Multi-Tier Rotating Announcement Bar -->
  <div class="announcement-bar-wrapper" id="announcement-bar" role="region" aria-label="Announcements">
    <div class="announcement-track">
      <span class="announcement-item active">FORMULATED FOR THE BORDERLAND OF WATER AND ROCK</span>
      <span class="announcement-item">GET A FREE BRASS TRAVEL VAULT ON ORDERS OVER $150</span>
      <span class="announcement-item">SHIPPED WORLDWIDE IN MILITARY-GRADE PACKAGING</span>
    </div>
  </div>

  <header class="main-header">
    <div class="header-container">
      <a href="/" class="brand-logo font-display">AETHER & ORE</a>
      <nav class="main-nav">
        <a href="#collection">COLLECTION</a>
        <a href="#climate-widget">CLIMATE CONTROLLER</a>
        <a href="#b2b">B2B PORTAL</a>
      </nav>
      <div class="header-actions">
        <button id="cart-toggle-btn" class="cart-trigger" aria-label="Open Cart">
          BAG [<span id="cart-count-badge">0</span>]
        </button>
      </div>
    </div>
  </header>

  <main id="main-content">
    <!-- Fast-Lane Split Hero Section -->
    <section class="split-hero">
      <div class="hero-brand-column">
        <span class="category-tag">SYSTEM ALPHA</span>
        <h1 class="font-display">TACTILE PHYSICAL ARMOR</h1>
        <p class="brand-manifesto">We do not formulate for cosmetic vanity. We forge protective barriers for extreme physical environments. refined through engineering, AETHER & ORE supplies high-performance dermatological armor designed to outlast the user.</p>
        <div class="coordinates">64°08'47.1"N 21°56'24.8"W • ARCTIC DRIFT</div>
      </div>
      
      <div class="hero-transaction-column">
        <div class="hero-image-bounds">
          <img src="assets/hero photograph of an anodized dark titanium flask with knurled copper cap.webp" alt="Anodized Titanium Flask on Nordic Fjords" fetchpriority="high" width="600" height="400">
        </div>
        <div class="transaction-box shadow-tactile">
          <div class="product-header">
            <h3>ANODIZED TITANIUM FLASK</h3>
            <span class="price-indicator" id="hero-active-price">$120.00</span>
          </div>
          
          <form id="hero-quick-add-form">
            <!-- Purchase Option Selector -->
            <div class="purchase-selector">
              <label class="purchase-option active">
                <input type="radio" name="hero_purchase" value="one_time" checked>
                <div class="option-details">
                  <span class="option-title">ONE-TIME SHIPMENT</span>
                  <span class="option-price">$120.00</span>
                </div>
              </label>
              <label class="purchase-option">
                <input type="radio" name="hero_purchase" value="subscription">
                <div class="option-details">
                  <span class="option-title">AUTOPILOT SUBSCRIPTION (20% OFF)</span>
                  <span class="option-price">$96.00 / MONTH</span>
                </div>
              </label>
            </div>

            <!-- Variant & Quantity Section -->
            <div class="form-matrix">
              <div class="form-group">
                <label for="hero-variant">FINISH</label>
                <select id="hero-variant" class="input-flat">
                  <option value="v1_raw">Raw Brushed Titanium (42 left)</option>
                  <option value="v1_basalt">Anodized Basalt Black (15 left)</option>
                  <option value="v1_copper">Forged Copper Accent (8 left)</option>
                </select>
              </div>
              <div class="form-group">
                <label>QTY</label>
                <div class="quantity-stepper">
                  <button type="button" class="qty-btn" id="hero-qty-dec">-</button>
                  <input type="number" id="hero-qty" value="1" min="1" readonly>
                  <button type="button" class="qty-btn" id="hero-qty-inc">+</button>
                </div>
              </div>
            </div>

            <button type="submit" class="btn-primary w-full">ADD TO ACTIVE GEAR SYSTEM</button>
          </form>
        </div>
      </div>
    </section>

    <!-- Asymmetric Product Collection Grid -->
    <section class="collection-section" id="collection">
      <h2 class="section-title font-display">TACTICAL CARE COLLECTION</h2>
      <div class="asymmetric-grid">
        <!-- Flagship double-width cell handled in layout -->
      </div>
    </section>
  </main>

  <!-- Sticky Bottom Cart Bar -->
  <div class="sticky-cart-bar" id="sticky-bar">
    <div class="sticky-bar-container">
      <div class="sticky-bar-product">
        <span class="font-display">ANODIZED TITANIUM FLASK</span>
        <span class="variant-desc" id="sticky-selected-variant">Raw Brushed Titanium</span>
      </div>
      <div class="sticky-bar-action">
        <span class="font-mono text-copper" id="sticky-price">$120.00</span>
        <button id="sticky-add-btn" class="btn-primary">ADD TO BAG</button>
      </div>
    </div>
  </div>

  <!-- AJAX Slide-Out Cart Drawer -->
  <div class="cart-drawer-overlay" id="cart-overlay"></div>
  <div class="cart-drawer" id="cart-drawer" aria-hidden="true">
    <div class="drawer-header">
      <h3 class="font-display">BAG GEAR</h3>
      <button id="cart-close-btn" class="drawer-close">CLOSE [X]</button>
    </div>
    
    <!-- Tiered Free Gift Progress Bar -->
    <div class="free-gift-progress-wrapper">
      <div class="progress-info">
        <span id="free-gift-message">Add $30.00 more to unlock BRASS TRAVEL VAULT</span>
        <span class="font-mono" id="progress-percentage">80%</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar" id="free-gift-bar" style="width: 80%;"></div>
      </div>
    </div>

    <div class="cart-items" id="cart-items-container">
      <!-- Generated via JavaScript -->
    </div>

    <div class="drawer-footer">
      <div class="summary-line">
        <span>SUBTOTAL</span>
        <span id="cart-subtotal">$0.00</span>
      </div>
      <button class="btn-primary w-full shadow-tactile" id="checkout-trigger">INITIATE PLUS SECURE CHECKOUT</button>
    </div>
  </div>

  <!-- Schema.org JSON-LD (Module 5) -->
  <script type="application/ld+json" id="structured-data">
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Anodized Titanium Hydration Flask",
      "image": [
        "assets/hero photograph of an anodized dark titanium flask with knurled copper cap.webp"
      ],
      "description": "Grade-5 vacuum-insulated tactical titanium flask with micro-milled exterior grip.",
      "sku": "THF-RAW-500",
      "mpn": "AO-THF-01",
      "brand": {
        "@type": "Brand",
        "name": "AETHER & ORE"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4.9",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Aris Vance"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.95",
        "reviewCount": "148"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://aetherandore.com/products/titanium-flask",
        "priceCurrency": "USD",
        "price": "120.00",
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "AETHER & ORE"
        }
      }
    }
  </script>

  <script src="/js/products.js"></script>
  <script src="/js/cart.js"></script>
  <script src="/js/app.js"></script>
</body>
</html>`
  },
  {
    name: "variables.css",
    path: "css/variables.css",
    language: "css",
    content: `:root {
  /* Industrial Luxury Palette - Absolute Contrast */
  --basalt-slate: #0B0D0E;
  --canvas-white: #F0F4F8;
  --forged-copper: #D96B43;
  --nordic-navy: #0A1C36;
  --hazard-red: #D01C24;
  --neutral-dark: #14171A;
  --neutral-mid: #2A2F33;
  --neutral-light: #A4ACB4;

  /* Fonts */
  --font-display: 'Monument Extended', 'Space Grotesk', sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* 8-Point Spatial System Rules */
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  --spacing-5: 40px;
  --spacing-6: 48px;
  --spacing-8: 64px;

  /* Absolute Zero-Border-Radius Policy */
  --border-radius-zero: 0px;
  
  /* Tactile Block Shadows */
  --block-shadow: 4px 4px 0px 0px var(--basalt-slate);
  --block-shadow-copper: 4px 4px 0px 0px var(--forged-copper);
}`
  },
  {
    name: "layout.css",
    path: "css/layout.css",
    language: "css",
    content: `/* Layout Styling & Spatial Grid Constraints */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--basalt-slate);
  color: var(--canvas-white);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.font-display {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.font-mono {
  font-family: var(--font-mono);
}

.main-header {
  position: sticky;
  top: 36px; /* Announcement height clearance */
  left: 0;
  width: 100%;
  background: rgba(11, 13, 14, 0.95);
  border-bottom: 1px solid var(--neutral-mid);
  z-index: 100;
  backdrop-filter: blur(8px);
}

.header-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--spacing-2) var(--spacing-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  color: var(--canvas-white);
  text-decoration: none;
  font-size: 20px;
}

.main-nav a {
  color: var(--neutral-light);
  text-decoration: none;
  font-size: 13px;
  font-family: var(--font-mono);
  margin-left: var(--spacing-4);
  letter-spacing: 0.1em;
  transition: color 0.2s ease;
}

.main-nav a:hover {
  color: var(--forged-copper);
}

.split-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 120px);
  border-bottom: 1px solid var(--neutral-mid);
}

.hero-brand-column {
  padding: var(--spacing-6) var(--spacing-4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--neutral-mid);
}

.hero-transaction-column {
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--neutral-dark);
}

@media (max-width: 968px) {
  .split-hero {
    grid-template-columns: 1fr;
  }
  .hero-brand-column {
    border-right: none;
    border-bottom: 1px solid var(--neutral-mid);
  }
}`
  },
  {
    name: "components.css",
    path: "css/components.css",
    language: "css",
    content: `/* Multi-Tier Announcement */
.announcement-bar-wrapper {
  height: 36px;
  background-color: var(--forged-copper);
  color: var(--basalt-slate);
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.announcement-track {
  position: relative;
  width: 100%;
  height: 100%;
}

.announcement-item {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.announcement-item.active {
  opacity: 1;
}

/* Tactile Buttons & Flat Fields */
.btn-primary {
  background-color: var(--forged-copper);
  color: var(--basalt-slate);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--basalt-slate);
  border-radius: var(--border-radius-zero);
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.15s, transform 0.15s;
}

.btn-primary:hover {
  background-color: var(--canvas-white);
  transform: translate(-2px, -2px);
  box-shadow: 2px 2px 0px var(--forged-copper);
}

.input-flat {
  background-color: var(--basalt-slate);
  border: 1px solid var(--neutral-mid);
  color: var(--canvas-white);
  font-family: var(--font-mono);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius-zero);
  width: 100%;
  outline: none;
}

.input-flat:focus {
  border-color: var(--forged-copper);
}

/* AJAX Cart Slideout Drawer */
.cart-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(11, 13, 14, 0.85);
  backdrop-filter: blur(4px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 500;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: -450px;
  width: 450px;
  height: 100%;
  background-color: var(--basalt-slate);
  border-left: 1px solid var(--neutral-mid);
  transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 600;
  display: flex;
  flex-direction: column;
}

.cart-drawer.active {
  right: 0;
}

/* Progress Bar Tier System */
.free-gift-progress-wrapper {
  padding: var(--spacing-2) var(--spacing-3);
  background-color: var(--neutral-dark);
  border-bottom: 1px solid var(--neutral-mid);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 11px;
  margin-bottom: var(--spacing-1);
}

.progress-track {
  height: 6px;
  background-color: var(--neutral-mid);
  width: 100%;
}

.progress-bar {
  height: 100%;
  background-color: var(--forged-copper);
  transition: width 0.4s ease;
}`
  },
  {
    name: "products.js",
    path: "js/products.js",
    language: "javascript",
    content: `// Client-Side Shopify Hydration Schema Representation
const ShopifyProducts = [
  {
    id: "prod_1",
    title: "Anodized Titanium Flask",
    price: 120.00,
    subscriptionPrice: 96.00,
    size: "500ml",
    isFlagship: true,
    variants: [
      { id: "v1_raw", name: "Raw Brushed Titanium", sku: "THF-RAW-500" },
      { id: "v1_basalt", name: "Anodized Basalt Black", sku: "THF-BSL-500" }
    ]
  },
  {
    id: "prod_2",
    title: "Basalt Volcanic Exfoliating Block",
    price: 35.00,
    subscriptionPrice: 28.00,
    size: "150g",
    isFlagship: false,
    variants: [
      { id: "v2_standard", name: "Standard Block", sku: "VEB-STD-150" }
    ]
  }
];`
  },
  {
    name: "cart.js",
    path: "js/cart.js",
    language: "javascript",
    content: `// High-Performance AJAX Cart Store Implementation
class ShopifyCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('ao_cart_items')) || [];
    this.freeGiftThreshold = 150.00; // Unlock Brass Travel Vault
  }

  addItem(productId, variantId, quantity, isSubscription) {
    const existing = this.items.find(i => i.productId === productId && i.variantId === variantId && i.isSubscription === isSubscription);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ productId, variantId, quantity, isSubscription });
    }
    this.save();
    this.dispatchUpdate();
  }

  save() {
    localStorage.setItem('ao_cart_items', JSON.stringify(this.items));
  }

  get subtotal() {
    return this.items.reduce((sum, item) => {
      const prod = ShopifyProducts.find(p => p.id === item.productId);
      const price = item.isSubscription ? prod.subscriptionPrice : prod.price;
      return sum + (price * item.quantity);
    }, 0);
  }

  dispatchUpdate() {
    const event = new CustomEvent('cart:updated', { detail: { cart: this } });
    window.dispatchEvent(event);
  }
}`
  },
  {
    name: "app.js",
    path: "js/app.js",
    language: "javascript",
    content: `// Core Interaction, Announcement Rotators, Scroll Triggers
document.addEventListener('DOMContentLoaded', () => {
  // Rotate announcements
  const items = document.querySelectorAll('.announcement-item');
  let currentIdx = 0;
  setInterval(() => {
    items[currentIdx].classList.remove('active');
    currentIdx = (currentIdx + 1) % items.length;
    items[currentIdx].classList.add('active');
  }, 4000);

  // Sticky bottom cart scroll observer
  const stickyBar = document.getElementById('sticky-bar');
  const scrollThreshold = 400;
  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      stickyBar.classList.add('active');
    } else {
      stickyBar.classList.remove('active');
    }
  }, { passive: true });
});`
  },
  {
    name: "product-hero.liquid",
    path: "sections/product-hero.liquid",
    language: "liquid",
    content: `{% comment %}
  AETHER & ORE — Product Hero Section (OS 2.0)
  Renders the primary PDP hero with metafield-driven specs.
  Compatible with Shopify Online Store 2.0 section architecture.
{% endcomment %}

{%- liquid
  assign current_variant = product.selected_or_first_available_variant
  assign material_grade = product.metafields.custom.material_grade | default: 'Grade-5 Titanium'
  assign thermal_limit = product.metafields.custom.thermal_limit | default: '-40°C to +120°C'
  assign origin_coords = product.metafields.custom.origin_coordinates | default: '64°08N 21°56W'
-%}

<section
  id="product-hero-{{ section.id }}"
  class="product-hero"
  data-section-type="product-hero"
  data-product-id="{{ product.id }}"
>
  <div class="product-hero__media">
    {%- for media in product.media -%}
      {%- case media.media_type -%}
        {%- when 'image' -%}
          <div
            class="product-hero__slide{% if forloop.first %} product-hero__slide--active{% endif %}"
            data-media-id="{{ media.id }}"
          >
            {{ media | image_url: width: 1200 | image_tag:
              loading: 'lazy',
              fetchpriority: forloop.first | ternary: 'high' | default: 'auto',
              sizes: '(min-width: 1024px) 50vw, 100vw',
              widths: '375,750,1100,1500',
              class: 'product-hero__image'
            }}
          </div>
        {%- when 'video' -%}
          {{ media | video_tag: autoplay: true, loop: true, muted: true, class: 'product-hero__video' }}
      {%- endcase -%}
    {%- endfor -%}
  </div>

  <div class="product-hero__info">
    <span class="product-hero__tag font-mono">{{ product.type | upcase }}</span>
    <h1 class="product-hero__title font-display">{{ product.title }}</h1>
    <p class="product-hero__description">{{ product.description | strip_html | truncate: 200 }}</p>

    {%- comment %} Metafield-Driven Tactical Specs {% endcomment -%}
    <div class="product-hero__specs">
      <div class="spec-row">
        <span class="spec-label">ALLOY GRADE</span>
        <span class="spec-value">{{ material_grade }}</span>
      </div>
      <div class="spec-row">
        <span class="spec-label">THERMAL RANGE</span>
        <span class="spec-value">{{ thermal_limit }}</span>
      </div>
      <div class="spec-row">
        <span class="spec-label">ORIGIN COORDS</span>
        <span class="spec-value">{{ origin_coords }}</span>
      </div>
    </div>

    {%- comment %} Variant Selector {% endcomment -%}
    {%- unless product.has_only_default_variant -%}
      <div class="product-hero__variants">
        {%- for option in product.options_with_values -%}
          <fieldset class="variant-fieldset" data-option-index="{{ forloop.index0 }}">
            <legend class="variant-legend font-mono">{{ option.name | upcase }}</legend>
            {%- for value in option.values -%}
              <label class="variant-swatch{% if option.selected_value == value %} variant-swatch--active{% endif %}">
                <input
                  type="radio"
                  name="{{ option.name }}"
                  value="{{ value | escape }}"
                  {% if option.selected_value == value %}checked{% endif %}
                  data-option-position="{{ forloop.index }}"
                >
                <span>{{ value }}</span>
              </label>
            {%- endfor -%}
          </fieldset>
        {%- endfor -%}
      </div>
    {%- endunless -%}

    {%- comment %} Dynamic Price Display {% endcomment -%}
    <div class="product-hero__price" data-price-wrapper>
      {%- if current_variant.compare_at_price > current_variant.price -%}
        <s class="price--compare">{{ current_variant.compare_at_price | money }}</s>
      {%- endif -%}
      <span class="price--current" data-product-price>{{ current_variant.price | money }}</span>
    </div>

    {%- comment %} Add to Cart Form {% endcomment -%}
    {%- form 'product', product, id: 'product-hero-form', data-product-form: '' -%}
      <input type="hidden" name="id" value="{{ current_variant.id }}">
      <div class="product-hero__quantity">
        <button type="button" class="qty-btn" data-qty-change="-1" aria-label="Decrease">−</button>
        <input type="number" name="quantity" value="1" min="1" max="{{ current_variant.inventory_quantity }}" class="qty-input" aria-label="Quantity">
        <button type="button" class="qty-btn" data-qty-change="+1" aria-label="Increase">+</button>
      </div>
      <button type="submit" class="product-hero__cta"{% unless current_variant.available %} disabled{% endunless %}>
        {%- if current_variant.available -%}
          ADD TO EXPEDITION BAG — {{ current_variant.price | money }}
        {%- else -%}
          SOLD OUT — JOIN WAITLIST
        {%- endif -%}
      </button>
    {%- endform -%}
  </div>
</section>

{% schema %}
{
  "name": "Product Hero",
  "tag": "section",
  "class": "section-product-hero",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_specs",
      "label": "Show tactical specifications",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_reviews",
      "label": "Show aggregate rating badge",
      "default": true
    },
    {
      "type": "select",
      "id": "media_layout",
      "label": "Media layout",
      "options": [
        { "value": "split", "label": "Split hero (50/50)" },
        { "value": "full", "label": "Full-width stacked" },
        { "value": "gallery", "label": "Thumbnail gallery" }
      ],
      "default": "split"
    },
    {
      "type": "range",
      "id": "image_aspect",
      "min": 50,
      "max": 150,
      "step": 5,
      "unit": "%",
      "label": "Image aspect ratio scale",
      "default": 100
    }
  ],
  "presets": [
    {
      "name": "Product Hero",
      "category": "Product"
    }
  ]
}
{% endschema %}`
  },
  {
    name: "price.liquid",
    path: "snippets/price.liquid",
    language: "liquid",
    content: `{% comment %}
  AETHER & ORE — Price Snippet
  Renders money with currency conversion support.
  Usage: {% render 'price', price: variant.price, compare: variant.compare_at_price %}
{% endcomment %}

{%- liquid
  assign price_amount = price | money_without_trailing_zeros
  assign has_compare = false
  if compare and compare > price
    assign has_compare = true
    assign compare_amount = compare | money_without_trailing_zeros
    assign savings_pct = compare | minus: price | times: 100.0 | divided_by: compare | round
  endif
-%}

<div class="price-display" data-price-display>
  {%- if has_compare -%}
    <s class="price-display__compare" aria-label="Original price">
      {{ compare_amount }}
    </s>
    <span class="price-display__badge">SAVE {{ savings_pct }}%</span>
  {%- endif -%}

  <span class="price-display__current" data-price-current aria-label="Sale price">
    {{ price_amount }}
  </span>

  {%- if product.metafields.custom.subscription_discount -%}
    {%- assign sub_pct = product.metafields.custom.subscription_discount | plus: 0 -%}
    {%- assign sub_price = price | times: 100 | minus: price | times: sub_pct | divided_by: 100 | money_without_trailing_zeros -%}
    <div class="price-display__subscription">
      <span class="sub-label">AUTOPILOT ({{ sub_pct }}% OFF)</span>
      <span class="sub-price">{{ sub_price }}/shipment</span>
    </div>
  {%- endif -%}
</div>`
  },
  {
    name: "storefront-api.graphql",
    path: "lib/storefront-api.graphql",
    language: "graphql",
    content: `# ═══════════════════════════════════════════════════════════════
# AETHER & ORE — Storefront API GraphQL Operations
# Headless React client queries against Shopify Storefront API
# API Version: 2024-10 | Access: Storefront Access Token
# ═══════════════════════════════════════════════════════════════

# ─── PRODUCT BY HANDLE ────────────────────────────────────────
# Fetches a single product with all variants, metafields,
# media, and SEO data for the headless PDP.

query ProductByHandle($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
  product(handle: $handle) {
    id
    title
    handle
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    seo {
      title
      description
    }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    media(first: 10) {
      edges {
        node {
          mediaContentType
          alt
          ... on MediaImage {
            image {
              url(transform: { maxWidth: 1200, preferredContentType: WEBP })
              altText
              width
              height
            }
          }
          ... on Video {
            sources { url mimeType width height }
          }
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image {
            url(transform: { maxWidth: 800, preferredContentType: WEBP })
            altText
          }
        }
      }
    }
    # Custom metafields for tactical specs
    materialGrade: metafield(namespace: "custom", key: "material_grade") { value }
    thermalLimit: metafield(namespace: "custom", key: "thermal_limit") { value }
    originCoords: metafield(namespace: "custom", key: "origin_coordinates") { value }
    subscriptionDiscount: metafield(namespace: "custom", key: "subscription_discount") { value type }
  }
}

# ─── COLLECTION BY HANDLE ─────────────────────────────────────
# Powers the Tactical Collection grid with sorting & filtering.

query CollectionByHandle(
  $handle: String!
  $first: Int = 24
  $after: String
  $sortKey: ProductCollectionSortKeys = BEST_SELLING
  $reverse: Boolean = false
  $filters: [ProductFilter!]
) {
  collection(handle: $handle) {
    id
    title
    description
    image { url altText }
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, filters: $filters) {
      pageInfo { hasNextPage endCursor }
      filters {
        id label type
        values { id label count input }
      }
      edges {
        node {
          id
          title
          handle
          productType
          availableForSale
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          compareAtPriceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 2) {
            edges {
              node {
                url(transform: { maxWidth: 600, preferredContentType: WEBP })
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node { id sku availableForSale quantityAvailable }
            }
          }
        }
      }
    }
  }
}

# ─── CART MUTATIONS ───────────────────────────────────────────
# Headless cart lifecycle: create → add lines → update → checkout.

mutation CartCreate($input: CartInput!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
  cartCreate(input: $input) {
    cart {
      ...CartFragment
    }
    userErrors { field message }
  }
}

mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFragment
    }
    userErrors { field message }
  }
}

mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFragment
    }
    userErrors { field message }
  }
}

mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ...CartFragment
    }
    userErrors { field message }
  }
}

# ─── CART FRAGMENT ────────────────────────────────────────────
# Reusable fragment for consistent cart data shape.

fragment CartFragment on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount { amount currencyCode }
    subtotalAmount { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        cost {
          totalAmount { amount currencyCode }
          amountPerQuantity { amount currencyCode }
          compareAtAmountPerQuantity { amount currencyCode }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            sku
            image {
              url(transform: { maxWidth: 200, preferredContentType: WEBP })
              altText
            }
            product { title handle }
            selectedOptions { name value }
          }
        }
        attributes { key value }
      }
    }
  }
  buyerIdentity {
    email
    countryCode
  }
  discountCodes { code applicable }
  discountAllocations {
    discountedAmount { amount currencyCode }
  }
}`
  },
  {
    name: "integrations.ts",
    path: "lib/integrations.ts",
    language: "typescript",
    content: `// ═══════════════════════════════════════════════════════════════
// AETHER & ORE — Third-Party Integration Layer
// Webhooks, Klaviyo Email CRM, GA4 Analytics, ReCharge Subscriptions
// ═══════════════════════════════════════════════════════════════

import crypto from 'crypto';
import type { Request, Response, NextFunction } from 'express';

// ─── SHOPIFY WEBHOOK HANDLER ─────────────────────────────────
// Verifies HMAC signature and routes webhook topics to handlers.

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET!;

export function verifyShopifyWebhook(req: Request, res: Response, next: NextFunction) {
  const hmacHeader = req.get('X-Shopify-Hmac-Sha256');
  if (!hmacHeader) return res.status(401).json({ error: 'Missing HMAC header' });

  const rawBody = (req as any).rawBody || JSON.stringify(req.body);
  const generatedHmac = crypto
    .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, 'utf8')
    .digest('base64');

  if (!crypto.timingSafeEqual(Buffer.from(hmacHeader), Buffer.from(generatedHmac))) {
    return res.status(401).json({ error: 'Invalid HMAC signature' });
  }
  next();
}

// Webhook topic router
export async function handleWebhook(topic: string, payload: any) {
  switch (topic) {
    case 'orders/create':
      await onOrderCreate(payload);
      break;
    case 'orders/paid':
      await onOrderPaid(payload);
      break;
    case 'customers/create':
      await onCustomerCreate(payload);
      break;
    case 'customers/update':
      await onCustomerUpdate(payload);
      break;
    case 'inventory_levels/update':
      await onInventoryUpdate(payload);
      break;
    case 'refunds/create':
      await onRefundCreate(payload);
      break;
    default:
      console.log('[webhook] Unhandled topic:', topic);
  }
}

async function onOrderCreate(order: any) {
  // Sync to Klaviyo, update VIP tier, trigger Flow
  await klaviyoTrackEvent('Placed Order', order.email, {
    orderId: order.id,
    value: parseFloat(order.total_price),
    items: order.line_items.map((li: any) => ({
      productId: li.product_id,
      sku: li.sku,
      name: li.title,
      quantity: li.quantity,
      price: parseFloat(li.price),
    })),
  });
  await ga4ServerEvent('purchase', {
    transaction_id: order.order_number.toString(),
    value: parseFloat(order.total_price),
    currency: order.currency,
    items: order.line_items.map((li: any) => ({
      item_id: li.sku,
      item_name: li.title,
      quantity: li.quantity,
      price: parseFloat(li.price),
    })),
  });
}

async function onOrderPaid(order: any) {
  // Update VIP loyalty points via Customer Metafield
  const points = Math.floor(parseFloat(order.total_price) * 10);
  await updateCustomerMetafield(order.customer.id, 'custom', 'loyalty_points', points);
}

async function onCustomerCreate(customer: any) {
  await klaviyoSubscribe(customer.email, {
    first_name: customer.first_name,
    last_name: customer.last_name,
    source: 'shopify_webhook',
  });
}

async function onCustomerUpdate(customer: any) {
  await klaviyoUpdateProfile(customer.email, {
    vip_tier: customer.tags?.includes('VIP_VANGUARD') ? 'vanguard' : 'operative',
    total_spent: customer.total_spent,
    orders_count: customer.orders_count,
  });
}

async function onInventoryUpdate(payload: any) {
  if (payload.available <= 5) {
    console.warn('[inventory] Low stock alert:', payload.inventory_item_id, 'Available:', payload.available);
  }
}

async function onRefundCreate(refund: any) {
  await klaviyoTrackEvent('Refund Issued', refund.order?.email, {
    refundId: refund.id,
    amount: refund.transactions?.[0]?.amount,
  });
}

// ─── KLAVIYO EMAIL CRM ───────────────────────────────────────
// Server-side Klaviyo integration for email capture, event
// tracking, and profile management.

const KLAVIYO_PRIVATE_KEY = process.env.KLAVIYO_PRIVATE_KEY!;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!;
const KLAVIYO_API = 'https://a.klaviyo.com/api';

export async function klaviyoSubscribe(email: string, properties: Record<string, any> = {}) {
  const res = await fetch(KLAVIYO_API + '/profile-subscription-bulk-create-jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': \`Klaviyo-API-Key \${KLAVIYO_PRIVATE_KEY}\`,
      'revision': '2024-10-15',
    },
    body: JSON.stringify({
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          profiles: {
            data: [{
              type: 'profile',
              attributes: { email, ...properties, subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } } },
            }],
          },
        },
        relationships: {
          list: { data: { type: 'list', id: KLAVIYO_LIST_ID } },
        },
      },
    }),
  });
  if (!res.ok) console.error('[klaviyo] Subscribe error:', await res.text());
  return res.ok;
}

export async function klaviyoTrackEvent(eventName: string, email: string, properties: Record<string, any>) {
  const res = await fetch(KLAVIYO_API + '/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': \`Klaviyo-API-Key \${KLAVIYO_PRIVATE_KEY}\`,
      'revision': '2024-10-15',
    },
    body: JSON.stringify({
      data: {
        type: 'event',
        attributes: {
          metric: { data: { type: 'metric', attributes: { name: eventName } } },
          profile: { data: { type: 'profile', attributes: { email } } },
          properties,
          time: new Date().toISOString(),
        },
      },
    }),
  });
  if (!res.ok) console.error('[klaviyo] Track event error:', await res.text());
}

export async function klaviyoUpdateProfile(email: string, properties: Record<string, any>) {
  // Uses Klaviyo's profile upsert endpoint
  const res = await fetch(KLAVIYO_API + '/profile-import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': \`Klaviyo-API-Key \${KLAVIYO_PRIVATE_KEY}\`,
      'revision': '2024-10-15',
    },
    body: JSON.stringify({
      data: {
        type: 'profile',
        attributes: { email, properties },
      },
    }),
  });
  if (!res.ok) console.error('[klaviyo] Update profile error:', await res.text());
}

// ─── GOOGLE ANALYTICS 4 — SERVER-SIDE EVENTS ─────────────────
// Measurement Protocol for reliable server-side event tracking.

const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID!;
const GA4_API_SECRET = process.env.GA4_API_SECRET!;

export async function ga4ServerEvent(eventName: string, params: Record<string, any>) {
  const endpoint = \`https://www.google-analytics.com/mp/collect?measurement_id=\${GA4_MEASUREMENT_ID}&api_secret=\${GA4_API_SECRET}\`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: params.client_id || 'server_' + Date.now(),
      events: [{
        name: eventName,
        params: {
          ...params,
          engagement_time_msec: 100,
          session_id: params.session_id || Date.now().toString(),
        },
      }],
    }),
  });
  if (!res.ok) console.error('[ga4] Server event error:', res.status);
}

// ─── SHOPIFY ADMIN API — CUSTOMER METAFIELD UPDATE ───────────
// Updates customer metafields (loyalty points, VIP tier, etc.)

const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const SHOPIFY_STORE = process.env.SHOPIFY_STORE_DOMAIN!;

export async function updateCustomerMetafield(
  customerId: string | number,
  namespace: string,
  key: string,
  value: any
) {
  const gid = typeof customerId === 'number' ? \`gid://shopify/Customer/\${customerId}\` : customerId;
  const mutation = \`
    mutation MetafieldsSet(\$metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: \$metafields) {
        metafields { id namespace key value }
        userErrors { field message }
      }
    }
  \`;
  const res = await fetch(\`https://\${SHOPIFY_STORE}/admin/api/2024-10/graphql.json\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        metafields: [{
          ownerId: gid,
          namespace,
          key,
          value: JSON.stringify(value),
          type: 'number_integer',
        }],
      },
    }),
  });
  const data = await res.json();
  if (data.errors) console.error('[admin-api] Metafield error:', data.errors);
  return data;
}
`
  }
];
