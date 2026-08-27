# 🌿 AURA BOTANICA — Organic Unisex Hair Oil E-Commerce Platform

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2D1?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF4154?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

A **production-quality, fully responsive frontend e-commerce web application** built for **AURA BOTANICA** — a modern luxury organic unisex hair oil brand. Designed with a **Quiet Luxury** aesthetic, editorial typography, natural organic motion curves, and seamless shopping interactions.

---

## ✨ Key Features

### 🛍️ E-Commerce & Product Discovery
* **Curated Botanical Catalog**: Multi-category browsing (Growth & Density, Dry & Damaged Repair, Scalp Health, Daily Gloss, and Ritual Bundles).
* **Interactive Size & Price Selection**: Dynamic bottle size selection (50ml, 100ml, 150ml) with instant price calculations.
* **Quick View Modal**: Inspect formulation details, key ingredients, usage instructions, and add to bag without leaving the page.
* **Slide-Over Cart Drawer**: Real-time bag drawer with quantity controls, free shipping progress bar threshold, and promo code support.
* **Persistent State**: Persistent shopping bag and saved wishlist powered by `Zustand` and `localStorage`.

### 🔬 Interactive Brand Experiences
* **Live Before/After Hair Transformation Slider**: Hardware-accelerated pointer-capture slider comparing real unconditioned dry hair with silky, nourished hair after a 6-week botanical oil ritual.
* **60-Second Consultation Hair Quiz**: Interactive 4-question consultation algorithm delivering personalized botanical routine recommendations.
* **Botanical Apothecary Ingredient Library**: Educational provenance library highlighting origins, cold-pressed extraction methods, and bio-active benefits for French Rosemary, Jamaican Black Castor, Moroccan Argan, and Sonoran Jojoba.
* **Educational Hair Ritual Guide**: Comprehensive trichologist-approved application guide with step-by-step illustrations.

### 💳 Complete Checkout Flow
* **Multi-Step Guided Checkout**: Step 1 (Contact & Shipping) → Step 2 (Payment Simulation) → Step 3 (Review & Confirmation).
* **Full Form Validation**: Type-safe forms with `React Hook Form` and `Zod` validation.
* **Order Confirmation Receipt**: Generates a unique order number, tracking confirmation, and purchase summary.

### 📱 100% Cross-Device Responsiveness
* Custom-crafted breakpoints for **ultra-compact mobile (320px–480px)**, tablets, laptops, and wide screens.
* Dedicated mobile slide-over filter sheet and single-line responsive header.
* Zero layout shifts, no horizontal scroll bugs, and fully touch-optimized tap targets.

---

## 🎨 Design System & Palette

| Token | Hex Code | Description |
| :--- | :--- | :--- |
| **Deep Forest Green** | `#18352A` | Primary brand accent & typography |
| **Soft Sage Green** | `#87977A` | Secondary badges & subtle accents |
| **Warm Earth Olive** | `#526B52` | Natural botanical borders |
| **Warm Ivory** | `#FFFDF8` | Clean, calm background base |
| **Soft Cream** | `#F6F2E9` | Card surfaces & elevated sections |
| **Warm Gold** | `#C5A059` | Review stars & highlight badges |

**Typography**: Cormorant Garamond & Playfair Display (Serif Headings) + Plus Jakarta Sans (Clean Modern Body).

---

## 🚀 Tech Stack

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components, Suspense)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) (Custom cubic-bezier luxury motion easing curves)
* **Icons**: [Lucide React](https://lucide.dev/)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with `persist` middleware)
* **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx             # Root layout with Toast & Modal providers
│   ├── page.tsx               # Homepage with 9 curated sections
│   ├── globals.css            # Custom fonts & smooth scroll definitions
│   ├── shop/                  # Filterable shop catalog
│   ├── product/[slug]/        # Detailed Product Page (PDP)
│   ├── cart/                  # Dedicated cart review page
│   ├── checkout/              # 3-step checkout experience
│   ├── wishlist/              # Saved favorites collection
│   ├── account/               # Mock client ritualist dashboard
│   ├── ingredients/           # Living botanical ingredient library
│   ├── hair-guide/            # 4-step hair oiling ritual guide
│   ├── journal/               # Hair health articles & editorial blog
│   └── contact/               # Studio inquiry & FAQ concierge
├── components/
│   ├── home/                  # Hero, BeforeAfterSlider, HairQuiz, etc.
│   ├── layout/                # Navbar, Footer, CartDrawer, SearchModal
│   ├── product/               # ProductCard, ProductGrid, ProductGallery
│   └── ui/                    # Rating, Badge, Toast, AnimatedReveal
├── data/                      # Products, Categories, Ingredients, Articles
├── store/                     # Zustand stores (Cart, Wishlist, UI state)
├── lib/                       # Motion presets, formatters, utilities
└── public/                    # High-resolution generated botanical imagery
```

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/aura-botanica-ecommerce.git
cd aura-botanica-ecommerce
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📄 License

This project is licensed under the MIT License — feel free to use it for personal or commercial projects.

---

Crafted with 🌿 for **AURA BOTANICA**.
