# MarketBénin — Product Definition

## Brand Identity
**MarketBénin** is a curated B2C marketplace for premium physical products sourced and sold directly by the brand. We specialize in authentic, high-quality goods with a focus on West African craftsmanship and global premium products.

## Users
- **Buyers (Primary)** — Urban professionals in Benin (Cotonou, Porto-Novo, Abomey-Calavi) seeking premium, authentic products. Age 22–50. Comfortable with WhatsApp commerce. Trust-driven.
- **Admin (Internal)** — Single or small team managing inventory, product data, fulfillment, and customer communication.

## Product Purpose
Simplify direct-to-consumer sales through a frictionless, WhatsApp-first marketplace where:
- Products are clearly presented with referral codes for supplier tracking
- Purchases route through WhatsApp for natural conversation
- Cart acts as a shopping list, not a checkout (message generation)
- Customer support happens in-app via messaging

## Core Flows
1. **Browse** — Discover products with images, price, referral code visible
2. **Wishlist** — Save favorites for later
3. **Add to Cart** — Build a shopping list
4. **Send via WhatsApp** — Cart becomes a pre-formatted WhatsApp message with product names, quantities, and reference codes
5. **Direct Chat** — Contact admin about specific products in-app

## Design Principles
- **Direct & Trustworthy** — No sales complexity. One clear path per interaction.
- **Warm Minimalism** — Generous spacing, readable typography, calming color palette
- **Speed & Focus** — Every page loads fast. No friction.
- **Mobile-First** — 90% of buyers use phones. Desktop is secondary.

## Anti-References
- Overly complex multi-vendor flows
- Dark mode (ambient: bright Benin daylight)
- Heavy animations or distracting motion
- Locked content behind authentication bloat

## Register
**Product** (UI serves sales), not Brand (design IS sales)

## Commerce Model
- Direct sales only (no multi-vendor, no auction, no commission splits)
- Products posted by admin
- Customers are buyers by default (no "seller role" selection)
- No payment integration (WhatsApp message is the order)
- Reference codes embedded in every product for back-office matching

---

## Database Structure (Next Steps)
- **Products**: id, name, price, description, image, reference_code, stock_status
- **Customers**: id, email, phone (WhatsApp), created_at
- **Wishlist**: customer_id, product_id
- **Cart**: customer_id, product_id, quantity (ephemeral, not persisted post-order)
- **Messages**: id, customer_id, subject (product_id reference), body, timestamp
