# Project: Amish Built Garages - Lead Generation Machine

## 1. Vision & Core Mission
We are building a premium, high-conversion lead generation platform for "Amish Built Garages" (US Market). 
The core goal is **CONVERSION**. Every pixel and every line of code must work towards getting the user to click "Get a Quote".

**Core Values:** - **Amish Quality:** Trustworthy, solid, hand-crafted feel.
- **Modern Performance:** Instant loading, smooth animations, mobile-first.
- **Simplicity:** Don't overwhelm the user; guide them to the goal.

## 2. Technical Stack
- **Framework:** Next.js (App Router, latest stable).
- **Styling:** Tailwind CSS.
- **Animations:** Framer Motion (use sparingly for "premium" feel, no "cheap" effects).
- **Icons:** Lucide React.
- **Forms/Email:** Resend + React Email via Server Actions.
- **Deployment:** DigitalOcean App Platform / Droplet.

## 3. Visual Identity (Design System)
Always stick to the "Amish Modern" palette:
- **Primary:** Deep Forest Green (#1a2e1a) - Trust & Nature.
- **Secondary/Accents:** Warm Copper (#b87333) - Craftsmanship & Action.
- **Neutral:** Rich Charcoal (#2d2d2d) - Solidity.
- **Background:** Off-White/Cream (#fcfaf7) - Clean & Premium.

## 4. Key Features & Logic
### A. Interactive Visualizer (The Star Feature)
- **Architecture:** Layered PNG images (stacked via absolute positioning) for instant feedback.
- **Logic:** Use a clean State Management (Zustand or React Context) to sync visualizer choices with the Quote Form.
- **Mobile First:** The visualizer must be perfectly usable with one thumb.

### B. Multi-step Quote Form
- **Flow:** Engagement first (What size? What style?) -> Contact info last.
- **Validation:** High-quality validation using Zod + React Hook Form.

## 5. Development Principles (THE GOLDEN RULES)
1. **Mobile-First Always:** Never write a component without checking its mobile view. 80% of users are on smartphones.
2. **Performance Budget:** Keep animations GPU-accelerated. Optimize images using `next/image`.
3. **No Code Bloat:** Don't install heavy libraries for simple tasks. Prefer native CSS/Tailwind.
4. **Server Actions:** Use Server Actions for all form submissions. No unnecessary API routes.
5. **SEO Excellence:** Semantic HTML only. Proper H1-H6 hierarchy. Optimized Meta-tags for Local SEO.

## 6. Communication Style
- If the instruction is unclear, ask for clarification.
- Suggest "Premium" UX improvements if you see a better way to handle a feature.
- Always provide accessible (ARIA) and clean code.



File Architecture: 
/app
  /layout.tsx           # Root layout: Fonts, Metadata, Viewport
  /page.tsx             # Home: Assembled from /components/sections
  /quote
    /page.tsx           # Separate Lead Capture page (optional)
  /opengraph-image.tsx  # Dynamic/Static OG image generator
  /globals.css          # Tailwind + Custom Amish-Modern theme
/components
  /ui                   # Low-level primitives (Buttons, Inputs, Modals)
  /sections             # Feature-rich blocks (Hero, Process, Configurator)
  /shared               # Persistent UI (Header, Footer, Navigation)
  /visualizer           # Interactive logic for the Garage Configurator
/actions
  /leads.ts             # Server Actions for form handling & Resend logic
/emails
  /quote-template.tsx   # React Email templates for business notifications
/lib
  /validations          # Zod schemas for form data
  /utils.ts             # Tailwind-merge (cn) and formatting helpers
/config
  /site.ts              # SEO constants, social links, and business info
/types
  /index.d.ts           # Shared TypeScript interfaces


Project Roadmap & Sitemap
Section 1: Navbar
Style: Transparent to Solid on scroll.

Elements: Professional Logo (Left), "Call Now" Button + Phone Number (Right).
Section 2: Hero Section (The Hook)
Sub-headline: Premium Amish craftsmanship for your perfect garage.

CTA: "Start Your Custom Build" (Scrolls to Visualizer).


Section 3: Interactive Visualizer (The "Ownership" Feature)
Layout: Two-column on Desktop, Vertical on Mobile (Image sticky at top).

Logic: Users select Garage Style, Wall Color, Roof Color, and Door Type.

Tech: Layered PNG rendering or CSS filters on a base image for maximum mobile performance.

State: Selections must persist and be passed to the final form.

Section 4: Steps of Work (Trust Builder)
Process: 4 distinct steps (Demolition, Site Prep, Build, Electrical).

UI: Vertical timeline with icons that animate/glow as the user scrolls.

Section 5: Quality & Proof
Trust Badges: "10-Year Warranty", "Amish Quality", "Licensed & Insured".

Gallery: A clean grid of "Before & After" project photos.

Section 6: High-Conversion Quote Form (The Closer)
Fields: Full Name, Phone Number, Email, Project Location.

Integration: Automatically attaches the user's "Configurator Design" to the email.

Email Logic: Sends a beautifully formatted React-Email(voron75voron@gmail.com) to the business owner via Resend.

4. Design System (Amish Modern)
Primary Color: #1A2E1A (Deep Forest Green) - Symbolizes reliability.

Accent Color: #B87333 (Burnt Copper) - For CTAs and interactive elements.

Background: #FCFAF7 (Warm Off-White) - Premium, natural feel.

Feel: Solid, fast, trustworthy, and high-end.

5. Performance Strategy
Image Optimization: Use next/image for all assets.

Server-Side: Use Static Site Generation (SSG) for all informational content to ensure perfect SEO for the USA area.

Mobile-First: Touch-friendly buttons (min 44px height) and prioritized loading for the Hero section.

Strict Dependency Enforcement:
Icons: lucide-react

Animation: framer-motion (use whileInView for scroll triggers)

Email: resend + @react-email/components

Carousel: embla-carousel-react (for "Before & After" gallery)

Utilities: clsx, tailwind-merge (for dynamic class handling)

High-End Open Graph & Social SEO Setup
Goal: When the link is shared on Telegram or WhatsApp, it must look like a premium $10,000 agency site.

Implementation Guide for AI Agent:
Metadata Object: In app/layout.tsx, implement a comprehensive Metadata object.

WhatsApp/Telegram Optimization:

Ensure og:image is exactly 1200x630px for high-res previews.

Use og:type: "website".

Include og:site_name: "Amish Built Garages".

When building the Metadata, do not just use static text. Create a dedicated opengraph-image.tsx file in the /app directory to generate a branded preview image. The preview should include the Amish Built Garages logo and a 'Get a Quote' call-to-action. This ensures that every time a link is shared on WhatsApp or Telegram, the user sees a professional, visually appealing card that drives clicks."