# Xeron Energy — Premium Solar EPC Website

A world-class, futuristic 3D website for **Xeron Energy**, Gujarat's premium Solar EPC & renewable
energy company. Built to feel like Apple × Tesla × SpaceX × Rivian — cinematic, glassmorphic,
aurora-lit, and enterprise-grade.

**Brand:** Xeron Energy · Rajkot, Gujarat 360490 · +91 8320545680

---

## ✦ Tech Stack

| Layer | Tech |
|-------|------|
| Framework | **Next.js 16** (App Router, Turbopack, RSC) |
| UI | **React 19** + **TypeScript** |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) |
| Type | **Montserrat** (display, matches logo) + **Inter** (body) |
| Animation | **Framer Motion** + **GSAP** easing curves |
| 3D | **Three.js** + **React Three Fiber v9** + **Drei** |
| Smooth scroll | **Lenis** |
| Icons | **react-icons** |

## ✦ Brand

Colours are taken directly from the Xeron Energy logo: electric **blue `#0090F0`** (primary),
warm **orange `#F09018`** (accent, the logo's sun), and deep **charcoal `#303048`** — on a
near-black space background. The real logo is used in the nav, footer and loader (a light-recoloured
variant so the charcoal wordmark reads on black).

## ✦ Highlights

- **Interactive 3D galaxy hero** — an 18k-particle spiral galaxy with a glowing orange core and blue
  arms (soft sprite-based star-dust), a deep starfield, mouse-parallax tilt and slow rotation on a
  black space backdrop. GPU-friendly (adaptive DPR, additive blending), fully self-contained
  (no external HDR/CDN assets), lazy-loaded client-side only.
- **Cinematic motion system** — custom loading screen with counter, magnetic buttons, custom cursor,
  scroll progress bar, blur-in scroll reveals, staggered grids, infinite marquee, aurora drift.
- **Premium design system** — dark + white luxury theme, glassmorphism, aurora gradient text,
  Space Grotesk display + Inter body, generous spacing, hairline sheen borders.
- **Working ROI calculator** — live savings/subsidy/payback estimate driven by a bill slider.
- **13 pages** — Home, About, Solar EPC, Commercial, Industrial, Projects (filterable), Services,
  Why Choose Us, Process, Gallery, Testimonials, FAQ, Contact.
- **All requested sections** — Hero, Statistics, Services, Benefits, Project Showcase, ROI Calculator,
  Government Subsidy, Installation Process, Partners, Customer Reviews, CTA, Footer.
- **Production-ready** — SEO metadata + Open Graph, JSON-LD schema (Organization, LocalBusiness,
  FAQPage), dynamic `sitemap.xml`, `robots.txt`, PWA manifest, working contact form + API route,
  security headers, `prefers-reduced-motion` support, keyboard focus states, semantic HTML.

## ✦ Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm run start
```

## ✦ Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout: fonts, metadata, providers, chrome
│   ├── page.tsx              # Home (composes all sections)
│   ├── globals.css           # Design system (Tailwind v4 @theme + utilities)
│   ├── sitemap.ts robots.ts manifest.ts not-found.tsx
│   ├── api/contact/route.ts  # Lead capture endpoint
│   └── <13 routes>/page.tsx  # about, solar-epc, commercial-solar, …
├── components/
│   ├── three/                # SolarScene (R3F) + HeroCanvas (dynamic wrapper)
│   ├── sections/             # Hero, Stats, Services, RoiCalculator, Reviews, …
│   ├── layout/               # Navbar (mega-menu), Footer, PageHero
│   ├── ui/                   # Button, MagneticButton, GlassCard, Counter, Reveal, Cursor, …
│   ├── providers/            # SmoothScroll (Lenis)
│   └── seo/                  # JsonLd
└── lib/
    ├── site.ts               # Single source of truth: company, services, projects, FAQs…
    └── utils.ts              # cn() helper
```

## ✦ Customization

- **Content** → edit `src/lib/site.ts` (company details, services, stats, projects, testimonials, FAQs).
- **Colors / theme** → edit the `@theme` block in `src/app/globals.css`.
- **Contact delivery** → wire your CRM / email / WhatsApp Business API inside
  `src/app/api/contact/route.ts` (currently logs leads server-side and returns success).
- **Domain** → update `site.url` in `src/lib/site.ts` (drives canonical URLs, sitemap, schema).

## ✦ Performance & Accessibility

- Static prerendering for every page; 3D bundle code-split and lazy-loaded.
- AVIF/WebP image formats enabled; `next/font` self-hosts fonts.
- Adaptive pixel ratio + capped DPR on the 3D canvas; particle count tuned for mobile GPUs.
- `prefers-reduced-motion` disables non-essential animation globally.
- Visible focus rings, aria-labels, semantic landmarks, 4.5:1 text contrast on the accent.

---

Built for Xeron Energy — powering India's solar future, one rooftop at a time. ☀️
