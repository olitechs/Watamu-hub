<h1 align="center">Watamu Hub</h1>
<p align="center"><b>Watamu, sorted.</b><br/>One free, WhatsApp-first app that takes the daily stress out of life in Watamu.</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App_Router-0B2A3C?logo=nextdotjs">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-0E7C86?logo=typescript&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Postgres-2E9E6B?logo=supabase&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/Deploy-Vercel-0B2A3C?logo=vercel">
  <img alt="Cost" src="https://img.shields.io/badge/running_cost-$0-FF6B4A">
</p>

---

## Overview

Watamu Hub is a mobile-first web platform for residents, villa owners, workers and visitors in Watamu, Kenya. It replaces scattered WhatsApp groups and word of mouth with five simple tools, each built to **run itself** with minimal admin:

| Module | Route | Problem solved |
|--------|-------|----------------|
| **Fundi Finder** | `/fundis` | Finding a plumber, electrician or cleaner who shows up |
| **Status Board** | `/status` | Knowing about water, power and gas outages, and who delivers |
| **Transport Guide** | `/transport` | Fair, fixed prices for tuk-tuks, bodas, taxis and boat trips |
| **Catch Board** | `/catch` | Today's fresh fish and market prices, auto-deleted after 24h |
| **Villa Sync** | `/villas` | One live calendar merging Airbnb, Booking.com and manual bookings |

## Design principles

- **$0 to run.** Free tiers only (Vercel, Supabase, WhatsApp click-to-chat).
- **WhatsApp is the interface.** Every listing links to a prefilled chat. No paid API.
- **Self-running.** Users add their own listings, entries expire automatically, admins only approve.
- **Light and fast.** Built for mid-range phones and weak mobile data.
- **Bilingual-ready.** English first, Swahili planned.

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router), React, TypeScript (strict) |
| Styling | Tailwind CSS with brand tokens (see [docs/BRAND.md](docs/BRAND.md)) |
| Database and auth | Supabase (Postgres + Row Level Security) |
| Storage | Supabase Storage |
| Hosting and cron | Vercel |
| Validation | Zod |
| Quality | ESLint, Prettier, GitHub Actions CI |

## Getting started

**Prerequisites:** Node.js 20+, a free [Supabase](https://supabase.com) project, a free [Vercel](https://vercel.com) account.

```bash
git clone https://github.com/<your-username>/watamu-hub.git
cd watamu-hub
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Open http://localhost:3000.

### Database

1. Create a Supabase project.
2. Run the SQL files in `supabase/migrations/` in order (SQL editor or Supabase CLI).
3. Optional: run `supabase/seed.sql` for sample data.

### Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key. Never expose to the client |
| `CRON_SECRET` | Shared secret protecting cron endpoints |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the code |
| `npm run typecheck` | TypeScript check |

## Project structure

```
watamu-hub/
├── .github/                 # CI, issue and PR templates
├── docs/                    # Brand guide and project docs
├── public/brand/            # Logo, favicon, share images
├── supabase/
│   ├── migrations/          # Versioned SQL schema
│   └── seed.sql
└── src/
    ├── app/
    │   ├── fundis/          # Directory, profile, join form
    │   ├── status/          # Outage reports and vendors
    │   ├── transport/       # Price table and drivers
    │   ├── catch/           # Daily catch board
    │   ├── villas/          # Public pages and owner dashboard
    │   ├── admin/           # Approvals and moderation
    │   └── api/             # votes, reports, ical, cron
    ├── components/          # ui/, WhatsAppButton, ListingCard, Calendar
    ├── lib/                 # supabase/, whatsapp, ical, phone, ratelimit
    ├── types/
    └── middleware.ts        # Route protection
```

## Data and security

- Row Level Security on every table. The public reads approved rows only.
- New listings start as `pending` until approved.
- Votes and reports are rate-limited and tied to a hashed identifier.
- Time-limited data (`expires_at`) is purged by Vercel Cron.
- Phone numbers are normalised to `+254` format and used only for click-to-chat links.

## Roadmap

- [ ] **Phase 1:** Foundation, auth, Fundi Finder
- [ ] **Phase 2:** Status Board and Transport Guide
- [ ] **Phase 3:** Catch Board
- [ ] **Phase 4:** Villa Sync (iCal merge, owner dashboard)
- [ ] **Later:** Swahili toggle, PWA install, featured/verified listings, M-Pesa payments

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming, commit style and the PR checklist.

## Licence

Copyright (c) Watamu Hub. All rights reserved. See [LICENSE](LICENSE).

## Contact

Built by **Shadrack**. WhatsApp: [+254 745 043 121](https://wa.me/254745043121)# Watamu-hub
Watamu Hub is a mobile-first web platform for residents, villa owners, workers and visitors in Watamu, Kenya. It replaces scattered WhatsApp groups and word of mouth with five simple tools, each built to run itself with minimal admin:
