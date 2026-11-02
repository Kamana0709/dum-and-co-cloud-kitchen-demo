# DUM & CO. — Cloud Kitchen Demo

A fictional, mobile-first cloud kitchen storefront built as a Taksha Nexus sales demo.

## Stack
- Next.js 15 App Router
- React 19
- Plain CSS (CSS variables, Grid and Flexbox)
- Lucide React icons
- Local sample menu data

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Features
- Responsive editorial-style storefront and brand story
- Searchable menu with category filters
- Product detail pages with portion and spice customisation
- Cart with quantity controls and persistent browser storage
- Checkout form with basic Indian mobile number validation
- Demo order confirmation and reference number
- Kitchen owner dashboard at `/dashboard` with order status management, menu availability and sample analytics
- Browser-local order handoff from checkout to the kitchen dashboard
- SEO metadata and GitHub Actions build workflow

## GitHub setup
Suggested repository: `dum-and-co-cloud-kitchen-demo`

## Demo limitations
This is a front-end sales demo. It does not process payments, create real orders, calculate actual delivery availability, or send kitchen tickets. Checkout stores demo orders in browser local storage so the owner dashboard can display and update them. The dashboard is a public demo screen with no authentication; sample orders and menu availability are browser-local and are not shared across devices.

## Before a real client launch
- Replace demo brand, menu, prices, photos and contact details
- Configure verified WhatsApp Business or ordering integrations
- Add delivery zones, tax, delivery fee and minimum order rules
- Integrate a payment provider after merchant onboarding
- Add a secure order API, database and kitchen order ticket workflow
- Add privacy policy, terms, refund and cancellation policies
- Use licensed/approved food photography and optimise images
