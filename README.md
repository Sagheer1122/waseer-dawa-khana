# 🌿 WASEER HERBAL HAIR OIL — Official E-Commerce Store

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2D1?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)

A modern, high-performance, **full-stack serverless e-commerce platform** crafted for **WASEER Herbal Hair Oil** — by the product of **WASEER Dawa Khana**. Designed with a quiet luxury editorial aesthetic, lightning-fast image delivery, real-time MongoDB database synchronization, and direct WhatsApp order placement tailored for customers across Pakistan.

---

## ✨ Key Store Features

### 🛍️ Live Catalog & Shopping Experience
* **Pure Unani Formulation Discovery**: Categorized formulations (Hair Growth & Density, Scalp Treatment, Anti-Hair Fall, Herbal Care, and Value Bundles).
* **Variant & Bottle Size Selection**: Real-time pricing across multiple sizes (50ml Starter, 100ml Full Treatment, 200ml Family Value Pack) synchronized dynamically with MongoDB.
* **0ms Product Detail Server Hydration**: Server Component PDP (`/product/[slug]`) fetching directly from MongoDB for instant first-paint with zero client image flashing.
* **Slide-Over Cart Drawer**: Real-time cart management with free shipping progress bar, promo code validation, and persistent state (`Zustand` + `localStorage`).
* **Instant WhatsApp Checkout**: 1-click WhatsApp order generation pre-filling customer address, selected sizes, quantities, and cash-on-delivery (COD) totals.

### 🔬 Interactive Brand & Haircare Features
* **Before / After Hair Transformation Slider**: Hardware-accelerated interactive slider showcasing real 6-week hair transformation results.
* **60-Second Consultation Hair Quiz**: Interactive consultation questionnaire delivering targeted herbal routine recommendations.
* **Botanical Provenance Library**: Highlighting authentic ingredients (Amla, Sikakai, Kalonji, French Rosemary, Fenugreek, Bhringraj, Neem, Aloe Vera).
* **The Hair Journal**: Dedicated editorial publication with custom-crafted photography exploring hair porosity, pre-wash oiling rituals, and botanical science.

### 🔐 Business Owner Admin Portal
* **Discreet Instant Access**: Access anywhere from the storefront using the secret keyboard shortcut **`Alt + A`** or **`Ctrl + Shift + A`**.
* **Live Product Inventory Management**: Add, edit, discount, and manage bottle sizes and stock levels with instant synchronization to the live store.
* **Cloudinary Asset Uploads**: Serverless image uploads direct to Cloudinary CDN with automatic thumbnail generation.
* **Order Tracking & Stats**: Real-time dashboard showing total revenue, pending orders, stock levels, and product count.
* **Secure Authentication**: Stateless JWT session cookie protection verified through Next.js Edge middleware.

---

## 🎨 Design System & Color Palette

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Forest Green** | `#18352A` | Primary brand identity & typography |
| **Soft Sage Green** | `#87977A` | Accent badges & delicate borders |
| **Warm Earth Olive** | `#526B52` | Natural botanical accents |
| **Warm Ivory** | `#FFFDF8` | Clean, calm background base |
| **Soft Cream** | `#F6F2E9` | Elevated card surfaces |
| **Heritage Gold** | `#C5A059` | Ratings, highlights, and primary CTA buttons |

**Typography**: Cormorant Garamond & Playfair Display (Serif Headings) + Plus Jakarta Sans (Clean Modern Body).

---

## 🚀 Technology Stack

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components, Route Handlers)
* **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) (Luxury easing curves & micro-interactions)
* **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose](https://mongoosejs.com/) (Singleton connection cache)
* **Media & CDN**: [Cloudinary](https://cloudinary.com/) (Serverless media uploads)
* **Authentication**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js) + [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) with HTTP-only cookies
* **State Management**: [Zustand](https://github.com/pmndrs/zustand) with local storage persistence
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
├── backend/                       # Serverless Backend Architecture
│   ├── config/                    # MongoDB Atlas singleton & Cloudinary setup
│   │   ├── db.ts
│   │   └── cloudinary.ts
│   ├── models/                    # Mongoose database models
│   │   ├── Product.ts
│   │   ├── Admin.ts
│   │   └── Order.ts
│   ├── services/                  # Business logic & services
│   │   ├── productService.ts
│   │   ├── orderService.ts
│   │   ├── authService.ts
│   │   └── uploadService.ts
│   ├── middleware/                # Server-side auth guard (verifyAdmin.ts)
│   └── utils/                     # WhatsApp helper & standard API responses
│
├── app/
│   ├── api/                       # Next.js Serverless Route Handlers
│   │   ├── auth/ (login, logout, me)
│   │   ├── products/ ([id])
│   │   ├── upload/ (Cloudinary)
│   │   ├── orders/ ([id])
│   │   └── admin/stats/
│   │
│   ├── admin/                     # Store Owner Admin Dashboard
│   │   ├── login/                 # Secure admin login
│   │   ├── products/              # Inventory, prices & variant management
│   │   ├── orders/                # WhatsApp customer order management
│   │   └── page.tsx               # Analytics overview
│   │
│   ├── shop/                      # Live product catalog
│   ├── product/[slug]/            # Server-rendered PDP (zero flash)
│   ├── journal/                   # Editorial hair articles & guides
│   ├── checkout/                  # Guided order placement
│   └── layout.tsx                 # Root layout & SEO metadata
│
├── components/                    # UI & Feature Components
│   ├── admin/                     # Admin header & sidebar
│   ├── home/                      # Hero, FeaturedProduct, Quiz, Slider
│   ├── layout/                    # Navbar, Footer, MobileMenu, StoreLayoutShell
│   ├── product/                   # ProductCard, Gallery, DetailClient
│   └── ui/                        # Toast, Rating, Badge, Accordion
│
├── data/                          # Fallback seeds & static assets
├── lib/                           # Motion tokens & API clients
├── middleware.ts                  # Edge middleware route protection
└── public/images/                 # Optimized local assets & compressed media
```

---

## 🛠️ Environment Configuration

Create a `.env.local` file in your root folder:

```env
# MongoDB Atlas Database URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/waseer_ecommerce?retryWrites=true&w=majority

# Admin JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key_here

# Default Admin Credentials (auto-seeded on first run)
ADMIN_DEFAULT_EMAIL=admin@waseerhairoil.com
ADMIN_DEFAULT_PASSWORD=YourSecurePassword123!
ADMIN_DEFAULT_NAME=WASEER Admin

# Cloudinary CDN Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Business WhatsApp Order Destination (e.g. 923239009042)
WHATSAPP_NUMBER=923239009042

# Live Website URL
NEXT_PUBLIC_SITE_URL=https://waseerhairoil.com
```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Access the store
Open http://localhost:3000

# 4. Access the Admin Panel
Press Alt + A on any page or navigate to http://localhost:3000/admin/login
```

---

## ☁️ Deployment (Vercel)

This repository is built for **zero-configuration serverless deployment on Vercel**:
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Configure your **Environment Variables** in Vercel Project Settings (`MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `WHATSAPP_NUMBER`).
3. Ensure MongoDB Atlas Network Access allows `0.0.0.0/0` (anywhere).
4. Every `git push origin main` will automatically trigger an instant production build and deployment.

---

## 📄 License

This project is proprietary and confidential.

Crafted with 🌿 for **WASEER HERBAL HAIR OIL — WASEER Dawa Khana**.
