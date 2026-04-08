# Roadmap: Kiran's Fitness Club

**Created:** 2026-04-09
**Granularity:** Standard (5-8 phases)
**Total Requirements:** 48

## Phases Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Foundation & Layout | Project setup, design system, shared components | FOUN-01 to FOUN-06 | 6 |
| 2 | Database & Authentication | MongoDB connection, user model, NextAuth, login, middleware | AUTH-01 to AUTH-07 | 5 |
| 3 | Public Pages | Homepage, Services, About, Contact pages | PUB-01 to PUB-09 | 5 |
| 4 | SEO & Location Pages | Location-specific pages, JSON-LD, sitemap | SEO-01 to SEO-07 | 4 |
| 5 | Content Management System | Post model, API routes, admin post editor, blog/events pages | CMS-01 to CMS-09 | 5 |
| 6 | Admin Panel & Dashboard | Admin user management, admin dashboard, member dashboard | ADM-01 to ADM-07, DASH-01 to DASH-06 | 5 |
| 7 | API Routes & Security | All API endpoints, role-based access, performance optimizations | API-01 to API-06, PERF-01 to PERF-05 | 5 |

## Phase Details

### Phase 1: Foundation & Layout
**Goal:** Initialize Next.js 14 project with Tailwind CSS, dark gym aesthetic, fonts, Navbar, and Footer — the skeleton everything builds on.
**Requirements:** FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05, FOUN-06
**UI hint:** yes
**Success criteria:**
1. `npm run dev` starts without errors on localhost:3000
2. Dark background (#0f0f0f) with gold accents visible on home page
3. Navbar renders with all links, collapses to hamburger on mobile (<768px)
4. Footer renders with placeholder gym info and page links
5. Montserrat headings and Inter body text load without layout shift
6. .env.local created with dummy values and replacement comments

---

### Phase 2: Database & Authentication
**Goal:** Connect MongoDB Atlas, create User model, configure NextAuth.js credentials provider, build login page, set up middleware route protection.
**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07
**UI hint:** yes
**Success criteria:**
1. MongoDB connects successfully via singleton pattern (no connection exhaustion)
2. Seed script creates admin user with bcrypt-hashed password
3. User can log in at /login with email/password and receive JWT cookie
4. Accessing /admin without admin role redirects to /login
5. Accessing /dashboard without auth redirects to /login

---

### Phase 3: Public Pages
**Goal:** Build all public-facing marketing pages — Homepage (with Framer Motion hero), Services, About, and Contact.
**Requirements:** PUB-01, PUB-02, PUB-03, PUB-04, PUB-05, PUB-06, PUB-07, PUB-08, PUB-09
**UI hint:** yes
**Success criteria:**
1. Homepage hero loads with Framer Motion fade-in animation, responsive to all screen sizes
2. Stats cards, service cards, testimonials, map section all render correctly
3. Services page shows 3 pricing plan cards with feature lists
4. About page shows gym story and trainer cards
5. Contact form shows success toast on submission

---

### Phase 4: SEO & Location Pages
**Goal:** Create 3 SEO-optimized location pages with unique content, JSON-LD schema, and configure next-sitemap.
**Requirements:** SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07
**UI hint:** yes
**Success criteria:**
1. Each location page has 400+ words of unique, non-duplicated content
2. Each page has unique meta title and description
3. LocalBusiness JSON-LD schema renders in page source on all 3 location pages + homepage
4. `npm run build` generates sitemap.xml with all public routes and robots.txt

---

### Phase 5: Content Management System
**Goal:** Build Post model, post API routes, React Quill editor in admin, and blog/events pages with ISR.
**Requirements:** CMS-01, CMS-02, CMS-03, CMS-04, CMS-05, CMS-06, CMS-07, CMS-08, CMS-09
**UI hint:** yes
**Success criteria:**
1. Admin can create a blog post with React Quill, slug auto-generates from title
2. Published blog posts appear on /blog listing within 60 seconds (ISR)
3. Blog single page renders sanitized HTML content with dynamic metadata
4. Events listing and single pages work identically for type=event
5. Draft posts do not appear on public pages

---

### Phase 6: Admin Panel & Member Dashboard
**Goal:** Build admin dashboard with stats, user management table (CRUD), and member subscription dashboard.
**Requirements:** ADM-01, ADM-02, ADM-03, ADM-04, ADM-05, ADM-06, ADM-07, DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06
**UI hint:** yes
**Success criteria:**
1. Admin dashboard shows correct counts for active users, expiring this week, published posts
2. Admin can add a user with plan and number of days (dates auto-calculated)
3. Admin can edit user plan/dates and delete users with confirmation
4. Member dashboard shows subscription details with correct days remaining
5. Warning/expired badges display based on subscription end date

---

### Phase 7: API Hardening & Polish
**Goal:** Ensure all API routes have proper auth checks, optimize performance, finalize .env documentation.
**Requirements:** API-01, API-02, API-03, API-04, API-05, API-06, PERF-01, PERF-02, PERF-03, PERF-04, PERF-05
**UI hint:** no
**Success criteria:**
1. All admin API routes return 401 for unauthenticated and 403 for non-admin users
2. GET /api/users excludes password field from response
3. All public pages are server components (verify no unnecessary "use client")
4. Framer Motion only in HeroSection.tsx (verify no other imports)
5. next/image used for all images with proper alt text

---

## Requirement Coverage

All 48 v1 requirements mapped. 0 unmapped. ✓

---
*Roadmap created: 2026-04-09*
