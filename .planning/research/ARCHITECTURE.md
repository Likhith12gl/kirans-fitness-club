# Architecture Research: Gym Website (Next.js 14)

## System Components

```
┌─────────────────────────────────────────────────────┐
│                    VERCEL (Hosting)                   │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │ Public Pages  │  │ Auth Pages   │  │ API Routes │ │
│  │ (SSR/ISR)     │  │ (Client)     │  │ (Serverless│ │
│  │               │  │              │  │  Functions)│ │
│  │ - Homepage    │  │ - Login      │  │            │ │
│  │ - Services    │  │ - Dashboard  │  │ - /api/    │ │
│  │ - Blog        │  │ - Admin      │  │   posts    │ │
│  │ - Location    │  │              │  │   users    │ │
│  │   pages       │  │              │  │   auth     │ │
│  └──────────────┘  └──────┬───────┘  └─────┬──────┘ │
│                           │                 │        │
│                    ┌──────▼─────────────────▼──────┐ │
│                    │     NextAuth.js (JWT)          │ │
│                    │     middleware.ts (route guard) │ │
│                    └──────────────┬─────────────────┘ │
│                                  │                    │
├──────────────────────────────────┼────────────────────┤
│                                  │                    │
│                    ┌─────────────▼────────────────┐   │
│                    │   MongoDB Atlas (Cloud)       │   │
│                    │   ┌─────────┐ ┌────────────┐ │   │
│                    │   │  Users  │ │   Posts     │ │   │
│                    │   │ (200)   │ │ (blog/evt) │ │   │
│                    │   └─────────┘ └────────────┘ │   │
│                    └─────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Component Boundaries

### 1. Public Layer (Server Components)
- **Pages:** Homepage, About, Services, Contact, Location pages
- **Rendering:** Server-side rendered (SSR) or static
- **Data:** Minimal — mostly hardcoded content + Google Maps embeds
- **No client JS** except hero animation (Framer Motion island)

### 2. Content Layer (ISR)
- **Pages:** Blog listing, Blog single, Events listing, Events single
- **Rendering:** ISR with `revalidate: 60`
- **Data:** Fetches from MongoDB via API routes or direct DB access in server components
- **Client JS:** Only for HTML sanitization (DOMPurify) on single post pages

### 3. Auth Layer (Client Components)
- **Pages:** Login, Dashboard, Admin panel
- **Rendering:** Client-side with "use client" directive
- **Data:** Protected API routes, JWT verification
- **NextAuth SessionProvider:** Wrapped in dedicated client component in root layout

### 4. API Layer (Serverless Functions)
- **Routes:** /api/auth, /api/posts, /api/users, /api/dashboard
- **Auth:** getServerSession verification on protected routes
- **Database:** MongoDB singleton connection (lib/mongodb.ts)
- **Pattern:** Each route.ts exports GET/POST/PATCH/DELETE handlers

### 5. Middleware Layer
- **File:** middleware.ts at project root
- **Purpose:** Route protection based on JWT role
- **Logic:** /admin/* requires role=admin, /dashboard requires authenticated user
- **Config:** matcher array excludes static files, _next, api internals

## Data Flow

```
User Request → Middleware (JWT check) → Page/API Route
                                          │
                                    ┌─────▼─────┐
                                    │ Server     │
                                    │ Component  │
                                    │ or API     │
                                    │ Handler    │
                                    └─────┬─────┘
                                          │
                                    ┌─────▼─────┐
                                    │ Mongoose   │
                                    │ Model      │
                                    └─────┬─────┘
                                          │
                                    ┌─────▼─────┐
                                    │ MongoDB    │
                                    │ Atlas      │
                                    └───────────┘
```

## Build Order (Dependencies)

1. **Foundation** — Project setup, Tailwind config, layout, fonts, design tokens
2. **Database** — MongoDB connection, Mongoose models (User, Post)
3. **Auth** — NextAuth config, login page, middleware, session provider
4. **Public Pages** — Homepage, About, Services, Contact (independent of auth/DB)
5. **Location Pages** — SEO-optimized pages with JSON-LD
6. **Content System** — API routes for posts, blog/event pages with ISR
7. **Admin Panel** — User management, post management, admin dashboard
8. **Member Dashboard** — Subscription display, renewal flow
9. **SEO & Polish** — next-sitemap, meta tags, performance audit, seed script

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Server components for public pages | Minimal client JS, better SEO, faster TTFB |
| ISR for blog/events | Fresh content without full rebuild; 60s revalidation |
| MongoDB singleton pattern | Prevents connection exhaustion on Vercel cold starts |
| JWT over database sessions | Stateless auth, no session table needed for 200 users |
| API routes for CRUD | Clean separation, middleware can protect endpoints |
| React Quill as client island | Rich text editing can't SSR; isolated to admin form only |
