# Putting Xeron Energy online and onto Google

Two separate jobs, in this order:

1. **Deploy** — get the site running on a URL. (~15 minutes)
2. **Get it on Google** — get that URL indexed and showing up in search. (~30 minutes of setup, then days to weeks for Google to rank it)

---

## Part 1 — Deploy

This is a **Next.js app**. `package.json` sits inside the `xeron-energy/` folder,
so whatever you deploy to needs to be pointed at that folder.

### On Vercel (recommended, free tier is enough)

1. Push this repository to GitHub.
2. **vercel.com → Add New → Project → Import** the repo.
3. **Set Root Directory to `xeron-energy`.** This is the one setting people miss —
   if you skip it you get the "couldn't find app or pages directory" error, because
   Vercel is looking at the repo root where there is no `package.json`.
4. Leave everything else default (Framework: Next.js, Build Command: `next build`).
5. Click **Deploy**.

You now have a live `*.vercel.app` URL. The site is fully functional on it — no
environment variables are required to deploy.

### Connect your domain

1. Buy the domain (`xeronenergy.in` — a `.in` runs roughly ₹700–1,200/year).
2. Vercel → your project → **Settings → Domains → Add**, enter the domain, and
   follow the DNS records it gives you. Add both `xeronenergy.in` and `www.xeronenergy.in`.
3. Vercel → **Settings → Environment Variables**, add:

   ```
   NEXT_PUBLIC_SITE_URL = https://xeronenergy.in
   ```

   **Redeploy after adding it.** Until you do, canonical URLs, `sitemap.xml`,
   `robots.txt` and the Google schema all point at the Vercel preview URL rather
   than your domain, which splits your search ranking across two addresses.

### Run it locally first

```bash
cd xeron-energy
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before Vercel will succeed
```

Requires Node 20.9 or newer.

---

## Part 2 — Get it on Google

Deploying does **not** put you on Google. These steps do.

### 1. Google Search Console — tells Google the site exists

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
   and add your domain as a property.
2. Choose the **HTML tag** verification method. It shows a tag like
   `<meta name="google-site-verification" content="AbCd123..." />`.
3. Copy **only** the `content` value.
4. Vercel → Settings → Environment Variables:

   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION = AbCd123...
   ```

5. Redeploy, then press **Verify** in Search Console.
6. Once verified: **Sitemaps** → submit `sitemap.xml` → Submit.
7. **URL Inspection** → paste `https://xeronenergy.in` → **Request Indexing**.

Indexing takes anywhere from a few days to a few weeks for a new domain. That is
normal; do not resubmit repeatedly.

### 2. Google Business Profile — this is what actually wins you local customers

For a solar EPC in Rajkot, your Business Profile matters more than the website
ranking does. Someone searching "solar panel installation near me" sees the map
results first.

1. [business.google.com](https://business.google.com) → create a profile.
2. Category: **Solar Energy Contractor**. Add "Solar Energy Equipment Supplier"
   and "Electrician" as secondary categories.
3. Set your service area to Rajkot and the districts you cover.
4. Google posts a **verification postcard** to your registered address — this
   takes 1–2 weeks and you cannot skip it.
5. Add your real phone number, your working hours, and your website URL.
6. **Photos matter enormously here.** As soon as you finish an installation,
   photograph it and upload it. Profiles with real photos get materially more calls.
7. **Ask every completed customer for a Google review.** Reviews on your Business
   Profile are the single biggest local ranking factor — and unlike review text on
   your own website, they are verifiable and Google trusts them.

### 3. Google Analytics (optional)

Create a GA4 property, then add `NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX` in Vercel and
redeploy. Leave it blank and no tracking script loads at all.

---

## Adding your real projects

`src/lib/site.ts` → the `projects` array is **intentionally empty**, with a
filled-in example in the comment directly above it. While it is empty, the
homepage showcase hides itself and `/projects` shows an honest "portfolio is
being published" panel.

Add a project only once it is commissioned, and quote only the savings the
client's own electricity bill shows. As soon as you add one entry it appears on
the homepage, on `/projects`, in the filters, and in the search-engine schema
automatically.

---

## How enquiries reach you

The contact form does **not** email you and does not store anything on a server.
Pressing "Send on WhatsApp" opens WhatsApp on the visitor's phone with the whole
enquiry pre-written — name, phone, city, property type, bill, notes — and it
lands in your WhatsApp chat when they press send.

This is deliberate: it needs no mailbox, no API key and no database, it works on
day one, and no lead can be silently lost in a server log. If you later want
leads in email or a CRM as well, that is a change to
`src/components/sections/ContactForm.tsx`.

## Gotchas

- **Don't commit** `node_modules/` or `.next/` — `.gitignore` already excludes them.
- **`/gallery` is gone.** It contained placeholder graphics presented as real
  installations. The URL now permanently redirects to `/projects`. Rebuild it as a
  real photo gallery once you have your own installation photos.
- **Social links are blank on purpose.** Fill in `site.social` in `src/lib/site.ts`
  once each account exists and has real posts. Blank entries are hidden from the
  footer and left out of the Google schema; a link to a bare `instagram.com`
  homepage is worse than no link.

## The solar calculator

`/solar-calculator` holds three calculators in one tabbed panel: bill → savings,
system size → PM Surya Ghar subsidy, and roof area → system size. The homepage
keeps a short teaser that links through to it.

All the maths lives in **`src/lib/solar.ts`** — one file, shared by both, so the
homepage and the calculator page can never quote different numbers. Update rates
there and every calculator on the site moves together:

- `pmSuryaGharSubsidy()` — subsidy slabs. **These change; this is the only place
  to edit them.** Currently ₹30,000/kW for the first 2 kW, ₹18,000 for the third,
  capped at ₹78,000, residential only.
- `costPerKw()` — installed cost bands, ₹38,000–₹58,000/kW before subsidy.
- `ASSUMPTIONS` — generation per kW, bill offset, sq ft per kW, degradation.

The assumptions are rendered on the page for customers to see. If you change a
rate in the code, that display updates automatically — but re-read the wording
around it to make sure it still reads true.

**The old subsidy formula was wrong.** It paid ₹18,000/kW and capped at ₹63,000,
so it never reached the ₹78,000 the rest of the site advertises — it was quoting
customers ₹15,000 less subsidy than they are entitled to. Fixed.

## Claims that were softened — restore them if you can back them

Several pages promised things a new EPC generally cannot yet evidence. They were
reworded rather than deleted, so if any of them is genuinely true for you, put the
stronger wording back:

| Was | Now | Restore when |
|---|---|---|
| "1200+ plants delivered", "45 MW installed", "99% uptime achieved" | Experience, warranty and subsidy figures | You have commissioning certificates to produce on request |
| "Guaranteed PLF / contractual generation guarantees" | "Written generation estimate, verified monthly" | Your contract genuinely carries a PLF penalty clause |
| "Powered by Tier-1 global partners" | "Tier-1 components we procure & install" | You hold an actual dealership or channel-partner agreement |
| "Xeron vs. the typical installer" | "Xeron vs. a cut-price quote" | — keep as is; the original was not defensible |

Statistics on a website are advertising claims under the Consumer Protection Act
2019. A competitor complaint or a customer dispute puts the burden of proof on
you, so only claim what you can produce a document for.
