# Kiran's Fitness Club

## What This Is

A production-ready, full-stack gym website for Kiran's Fitness Club — a fitness center in Anjananagar, Bangalore. The website serves as the gym's digital presence with public marketing pages, SEO-optimized location pages, a blog/events CMS, member subscription dashboard, and admin panel for managing users and content. Built to handle ~200 members with minimal latency and clean aesthetics.

## Core Value

Members can view their subscription status and the admin can manage memberships and content — the website must reliably serve as the gym's operational hub and primary online presence for local SEO.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Public marketing pages (Home, About, Services, Contact)
- [ ] SEO-optimized location pages (Anjananagar, Magadi Road, Bath Road) with unique content and JSON-LD
- [ ] Blog and Events CMS with React Quill rich text editor
- [ ] User authentication with NextAuth.js credentials provider
- [ ] Member dashboard showing subscription status and renewal
- [ ] Admin panel for user management (CRUD, subscription dates, plans)
- [ ] Admin panel for post management (CRUD, publish/draft, blog/event types)
- [ ] Protected API routes with role-based access control
- [ ] Dark premium gym aesthetic with gold accents
- [ ] Mobile responsive design with hamburger menu
- [ ] next-sitemap integration for automatic sitemap/robots.txt generation
- [ ] LocalBusiness JSON-LD schema on location pages and homepage
- [ ] Google Maps embed on location and contact pages
- [ ] WhatsApp integration for contact and subscription renewal
- [ ] Seed script for initial admin user

### Out of Scope

- Email sending from contact form — toast confirmation only, email integration deferred
- Payment gateway integration — subscriptions managed manually by admin
- Real-time chat or messaging — not needed for 200-member gym
- Mobile native app — web-first approach
- Video content hosting — no video posts
- OAuth social login — email/password sufficient for v1
- Complex analytics dashboard — basic stat cards only
- Multi-location management — single gym location
- Scalability infrastructure — designed for ~200 members, not enterprise scale

## Context

- **Location:** Anjananagar, Bangalore — near Magadi Main Road and Bath Road
- **Target audience:** Local Anjananagar residents, commuters from Magadi Road and Bath Road areas
- **Scale:** ~200 members maximum, lightweight performance is priority
- **Prior work:** User has experience with WordPress gym themes from previous conversations; this is a fresh Next.js build
- **Deployment:** Vercel hosting with Cloudflare DNS (no code changes needed for CDN)
- **SEO strategy:** Location-based pages targeting "gym in anjananagar", "gym near magadi road", "gym near bath road" search queries

## Constraints

- **Tech stack:** Next.js 14 App Router, Tailwind CSS, MongoDB Atlas, NextAuth.js, Framer Motion (hero only)
- **Performance:** Framer Motion restricted to hero section only; server components by default on public pages; no heavy animation libraries
- **Database:** MongoDB Atlas with Mongoose ODM; singleton connection pattern for Vercel serverless
- **Auth:** NextAuth.js credentials provider with JWT in httpOnly cookies; bcrypt password hashing
- **Rich text:** React Quill for admin post editor (client component with "use client" directive)
- **Images:** next/image for all images with proper width, height, alt text
- **Fonts:** next/font (Geist Sans or Montserrat + Inter) — no external link tags
- **SEO tools:** next-sitemap package, Next.js 14 native Metadata API
- **Hosting:** Vercel-ready, no build errors

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 14 App Router over Pages Router | Modern architecture, server components by default, better SEO | — Pending |
| MongoDB Atlas over PostgreSQL | Flexible schema for membership data, easy Atlas free tier | — Pending |
| Framer Motion hero-only restriction | SEO performance — heavy animations hurt Core Web Vitals | — Pending |
| Manual subscription management over payment gateway | 200-member gym doesn't justify payment integration complexity | — Pending |
| Dark aesthetic with gold accents | Premium gym brand feel, differentiates from generic templates | — Pending |
| React Quill for rich text | Lightweight, well-supported, sufficient for blog/event content | — Pending |
| WhatsApp for contact/renewals | Direct communication preferred by local Indian gym market | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-09 after initialization*
