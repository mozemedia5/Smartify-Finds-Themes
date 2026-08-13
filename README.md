# Smartify Finds Shopify Theme

Smartify Finds is a premium, high-converting, mobile-first Shopify Online Store 2.0 theme built specifically for modern technology discovery, gadget stores, and intelligent electronics brands.

## Folder Architecture

The theme utilizes Shopify's native, standard structural hierarchy:

```
├── assets/             # Core stylesheets (theme.css) and ES6 vanilla scripts (theme.js)
├── config/             # Theme settings definition (settings_schema.json) and default presets (settings_data.json)
├── layout/             # Master layout template (theme.liquid) containing standard HTML head/body blocks
├── locales/            # Localization dictionary (en.default.json)
├── sections/           # Modular, merchant-configurable page sections
├── snippets/           # Reusable HTML/Liquid UI partial snippets (product-card, breadcrumbs, etc.)
└── templates/          # Standard Online Store 2.0 JSON templates mapping sections
```

## Features & Integration

- **Design System:** Controlled completely in the Shopify Theme Editor (colors, typography, border radii, widths).
- **Core Conversion Triggers:** Slide-out AJAX Cart Drawer, Keyboard-accessible Predictive search drawer, Multi-variant radio buttons, Technical Specifications blocks, "What's in the box" blocks.
- **Perfect Technical SEO:** Handled natively with clean schema breadcrumbs, structured schema.org JSON-LD definitions, clean descriptive alt tagging, and zero render-blocking dependencies.
- **Core Web Vitals Optimized:** Lightweight vanilla CSS and modern ES6 Javascript, avoiding bulky heavy third-party frameworks.

## Validation & Testing

To test and lint the theme locally:

1. Ensure the Shopify CLI is installed:
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```
2. Run validation against Shopify theme specifications:
   ```bash
   shopify theme check
   ```

## Shopify Admin Connection

To connect this theme directly to your live store:
1. Go to **Shopify Admin** &rarr; **Online Store** &rarr; **Themes**.
2. Click **Add Theme** &rarr; **Connect from GitHub**.
3. Select your repository `smartifyfinds_themes` and connect the `main` branch.
