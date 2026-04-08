# Research Summary: Kiran's Fitness Club

## Stack Recommendation

**Next.js 14 App Router** + **Tailwind CSS** + **MongoDB Atlas** (Mongoose) + **NextAuth.js v4** (credentials/JWT) + **Framer Motion** (hero only) + **React Quill** (admin CMS)

Key insight: Use `bcryptjs` not `bcrypt` (Vercel compatibility). Use `next-auth@4` not v5. MongoDB singleton pattern is mandatory for serverless.

## Table Stakes Features

- Public marketing pages (Home, About, Services, Contact)
- Mobile responsive with sticky navbar
- Contact form with WhatsApp integration
- Google Maps embed
- Member login + subscription dashboard
- Admin user/post management (CRUD)
- SEO meta tags + sitemap + robots.txt

## Differentiators

- **Location-specific SEO pages** — 3 pages targeting "gym in anjananagar", "gym near magadi road", "gym near bath road"
- **LocalBusiness JSON-LD schema** — Rich search result snippets
- **Blog/Events CMS with ISR** — Fresh content without full rebuild
- **Dark premium gym aesthetic** — Brand differentiation from generic templates
- **Subscription expiry warnings** — Prompts renewal, reduces churn

## Architecture

- **9 logical components** ordered by dependency: Foundation → Database → Auth → Public Pages → Location Pages → Content System → Admin Panel → Member Dashboard → SEO & Polish
- **Server components** for all public pages (zero client JS)
- **Client islands** for: hero animation, login form, admin panel, dashboard
- **ISR (60s revalidation)** for blog/event pages
- **API routes** with role-based access control (getServerSession verification)

## Top Pitfalls to Prevent

| # | Pitfall | Prevention | Phase |
|---|---------|------------|-------|
| 1 | MongoDB connection exhaustion | Singleton pattern in lib/mongodb.ts | Foundation |
| 2 | Missing "use client" | Add to ALL files using hooks/browser APIs | All |
| 3 | bcrypt native binary failure | Use bcryptjs (pure JS) | Auth |
| 4 | React Quill SSR crash | Dynamic import with ssr: false | Admin CMS |
| 5 | NextAuth v4/v5 confusion | Pin to next-auth@4 | Auth |
| 6 | Middleware too broad | Explicit matcher array | Auth |
| 7 | External images blocked | Add domains to next.config.js remotePatterns | Foundation |
