# MarketBénin — Design System

## Color Palette (OKLCH)
All colors tinted toward primary (warm violet), chroma reduced near extremes per impeccable guidelines.

### Light Mode (Primary)
- **Background**: `oklch(98.5% 0.008 38)` — warm off-white, not pure white
- **Card/Surface**: `oklch(100% 0 0)` — pure white for elevated surfaces
- **Text Primary**: `oklch(12% 0.02 258)` — deep charcoal, slightly cool-tinted
- **Text Secondary**: `oklch(55% 0.01 258)` — muted gray
- **Border**: `oklch(88% 0.015 258)` — light gray, warm-tinted
- **Primary Accent**: `oklch(60% 0.18 258)` — vibrant violet, for CTAs and highlights
- **Primary Light**: `oklch(92% 0.04 258)` — violet background tint
- **Success**: `oklch(65% 0.12 142)` — muted green
- **Warning**: `oklch(68% 0.14 48)` — warm amber
- **Danger**: `oklch(58% 0.20 25)` — muted red

### Dark Mode (Minimal use on secondary pages only)
- **Background**: `oklch(8% 0.012 258)`
- **Card**: `oklch(14% 0.008 258)`
- **Text Primary**: `oklch(96% 0.01 258)`
- **Text Secondary**: `oklch(60% 0.01 258)`
- **Primary Accent**: `oklch(70% 0.16 258)`

---

## Typography

### Font Stack
- **Primary (Headlines, CTAs)**: `Inter`, system sans-serif
  - Weights: 500 (medium), 600 (semibold), 700 (bold), 800 (extra bold)
  - Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui`
  
- **Secondary (Body, Labels)**: `Inter`, system sans-serif
  - Weights: 400 (regular), 500 (medium)

### Scale & Hierarchy
Aim for ≥1.25 ratio between steps.

| Usage | Size | Line Height | Weight | Letter Spacing |
|-------|------|-------------|--------|-----------------|
| H1 (Page Title) | 2.5rem (40px) | 1.1 | 800 | -0.02em |
| H2 (Section) | 2rem (32px) | 1.15 | 700 | -0.015em |
| H3 (Subsection) | 1.5rem (24px) | 1.2 | 600 | 0 |
| Button / Label | 1rem (16px) | 1.5 | 600 | 0 |
| Body Large | 1.125rem (18px) | 1.6 | 400 | 0.2px |
| Body Regular | 0.95rem (15px) | 1.65 | 400 | 0.3px |
| Small / Caption | 0.813rem (13px) | 1.5 | 500 | 0.25px |

### Line Length
- Body text: 65–72ch max
- Product descriptions: 60ch max
- Form labels: no limit (single line expected)

---

## Spacing & Layout

### Base Unit: 4px
All spacing in multiples of 4px for consistency.

| Token | Value | Use Cases |
|-------|-------|-----------|
| xs | 4px | Component internal, icon gaps |
| sm | 8px | Tight related elements |
| md | 12px | Section internal padding |
| lg | 16px | Card padding, medium gaps |
| xl | 24px | Section vertical gaps |
| 2xl | 32px | Large section spacing |
| 3xl | 48px | Page-level section breaks |
| 4xl | 64px | Hero spacing, major breakpoints |

### Rhythm Rules
- Never use the same spacing consecutively (e.g., no lg + lg side-by-side)
- Vary: xs → sm → md → lg across a single component
- Between sections: lg or xl (not xs/sm)
- Hero to content: 3xl or 4xl

---

## Components

### Button
- **Primary CTA** (WhatsApp, Checkout)
  - Background: `oklch(60% 0.18 258)` (primary)
  - Padding: 12px 20px (sm devices), 16px 28px (desktop)
  - Border Radius: 6px
  - Font: 600 weight, 1rem size
  - Hover: `oklch(55% 0.16 258)`
  - Active: `oklch(50% 0.14 258)`
  
- **Secondary** (Back, Cancel, Add to Wishlist)
  - Border: 1px `oklch(88% 0.015 258)`
  - Background: transparent
  - Padding: 12px 16px
  - Hover: Background `oklch(92% 0.04 258)`

### Card
- Background: white
- Border: none
- Border Radius: 8px
- Padding: 16px (mobile), 20px (desktop)
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.08)` (subtle)
- No nested cards

### Product Grid
- Mobile: 1 column, full width with 16px gutters
- Tablet: 2 columns, 12px gutter
- Desktop: 3 columns, 16px gutter
- Item aspect ratio: 1 (square for images), flex layout for text below

### Form Input
- Border: 1px `oklch(88% 0.015 258)`
- Border Radius: 4px
- Padding: 12px 16px
- Font: body regular
- Focus: border `oklch(60% 0.18 258)`, shadow `0 0 0 3px oklch(92% 0.04 258)`

---

## Motion & Interactions

### Transitions
- Standard duration: 200ms
- Easing: `cubic-bezier(0.2, 1, 0.4, 1)` (default ease-out)
- Hover effects: color or opacity only (never animate layout)

### Micro-interactions
- Button hover: -2px shadow lift, slight color shift
- Card hover: +1px shadow, no movement
- Input focus: border + subtle glow
- Loading state: spinner at 2 rotations/second

---

## Dark Mode (Minimal Use)
- Only available on secondary pages (Admin, Chat, Profile)
- Not the default
- Same token structure; use `@media (prefers-color-scheme: dark)` for opt-in

---

## Responsive Breakpoints
- **Mobile**: 320px – 480px
- **Tablet**: 481px – 1024px
- **Desktop**: 1025px+

All typography scales down to mobile; spacing follows.

---

## Accessibility
- All text: min 16px on mobile, 15px on desktop (no smaller)
- Contrast ratio: ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Focus states: always visible (outline or shadow)
- Forms: labels always paired with inputs (not placeholder-only)

---

## Page Composition Example: Product Listing

```
[Header: Logo + Search + Account icon]
   16px gap

[Filter bar (mobile: collapsed, desktop: visible)]
   24px gap

[Product Grid: 3 cols desktop, 1 col mobile]
   Each card: 
   - Image (square, auto-crop)
   - 8px gap
   - Product name (H3 style)
   - 4px gap
   - Price (H2 style, primary color)
   - 8px gap
   - Buttons: [Wishlist heart] [Add to Cart] [WhatsApp CTA]

   24px gap between cards
   
[Pagination or "Load More" button]
   32px gap to footer

[Footer: Links, Contact info]
```
