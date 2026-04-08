# Requirements: Kiran's Fitness Club

**Defined:** 2026-04-09
**Core Value:** Members can view their subscription status and the admin can manage memberships and content — the website must reliably serve as the gym's operational hub and primary online presence for local SEO.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FOUN-01**: Project initialized with Next.js 14 App Router, Tailwind CSS, TypeScript
- [ ] **FOUN-02**: Dark gym aesthetic applied globally (#0f0f0f background, gold #f5c518 accents, white text)
- [ ] **FOUN-03**: Montserrat font for headings, Inter for body text via next/font/google
- [ ] **FOUN-04**: Root layout includes global styles, font loading, analytics placeholder
- [ ] **FOUN-05**: Responsive Navbar with logo, page links, login/dashboard conditional, mobile hamburger
- [ ] **FOUN-06**: Footer with gym name, address placeholder, phone placeholder, page links, copyright

### Authentication

- [ ] **AUTH-01**: User can log in with email and password via NextAuth.js credentials provider
- [ ] **AUTH-02**: JWT stored in httpOnly cookie with user id, name, email, role
- [ ] **AUTH-03**: Middleware protects /admin (requires role=admin) and /dashboard (requires auth)
- [ ] **AUTH-04**: Unauthorized access redirects to /login page
- [ ] **AUTH-05**: User can log out from navbar
- [ ] **AUTH-06**: Seed script creates admin user (admin@kiransfitness.com / Admin@123 hashed)
- [ ] **AUTH-07**: Passwords stored as bcrypt hashes (bcryptjs, 12 rounds)

### Public Pages

- [ ] **PUB-01**: Homepage hero with full viewport, dark overlay gym image, heading, subheading, CTA buttons, Framer Motion fade-in
- [ ] **PUB-02**: Homepage stat cards (500+ Members, 10+ Years, Expert Trainers)
- [ ] **PUB-03**: Homepage services preview (6 cards with lucide-react icons)
- [ ] **PUB-04**: Homepage testimonials section (4 hardcoded testimonials with 5-star ratings)
- [ ] **PUB-05**: Homepage location section with Google Maps embed
- [ ] **PUB-06**: Homepage final CTA banner with WhatsApp button
- [ ] **PUB-07**: Services page with full service breakdown and 3 pricing plan cards (Monthly, Quarterly, Annual)
- [ ] **PUB-08**: About page with gym story and 3 trainer cards
- [ ] **PUB-09**: Contact page with form (name, email, phone, message), success toast, map, WhatsApp link

### SEO & Location Pages

- [ ] **SEO-01**: /gym-in-anjananagar page with 400+ words unique content, LocalBusiness JSON-LD, Google Maps embed
- [ ] **SEO-02**: /gym-near-magadi-road page with 400+ words unique content, LocalBusiness JSON-LD
- [ ] **SEO-03**: /gym-near-bath-road page with 400+ words unique content, LocalBusiness JSON-LD
- [ ] **SEO-04**: Each location page has unique meta title and description (not duplicated)
- [ ] **SEO-05**: Homepage includes LocalBusiness JSON-LD schema
- [ ] **SEO-06**: next-sitemap generates sitemap.xml and robots.txt on build
- [ ] **SEO-07**: robots.txt disallows /admin, /dashboard, /login, /api

### Content Management

- [ ] **CMS-01**: Post model stores blog and event content with title, slug, content, type, SEO fields, status
- [ ] **CMS-02**: Admin can create posts with React Quill rich text editor
- [ ] **CMS-03**: Slug auto-generated from title (lowercase, hyphens, URL-safe)
- [ ] **CMS-04**: Admin can edit, delete, and toggle publish/draft status on posts
- [ ] **CMS-05**: Blog listing page shows published blog posts with title, date, excerpt, Read More link
- [ ] **CMS-06**: Blog single page renders HTML content (sanitized with DOMPurify), generates dynamic metadata
- [ ] **CMS-07**: Events listing page shows published event posts
- [ ] **CMS-08**: Events single page with dynamic metadata and BlogPosting JSON-LD
- [ ] **CMS-09**: Blog and event pages use ISR with revalidate: 60

### Member Dashboard

- [ ] **DASH-01**: Dashboard shows welcome message with user name
- [ ] **DASH-02**: Dashboard shows current plan, start date, end date (formatted DD MMM YYYY)
- [ ] **DASH-03**: Dashboard shows days remaining with calculation
- [ ] **DASH-04**: Yellow warning when subscription expires within 7 days
- [ ] **DASH-05**: Red badge when subscription is expired (0 or negative days)
- [ ] **DASH-06**: WhatsApp renewal button with pre-filled message

### Admin Panel

- [ ] **ADM-01**: Admin dashboard shows 3 stat cards (active users, expiring this week, total published posts)
- [ ] **ADM-02**: Admin users page shows table with Name, Email, Plan, Start Date, End Date, Days Remaining, Actions
- [ ] **ADM-03**: Admin can add users with Name, Email, Password, Plan, Number of Days (calculates dates automatically)
- [ ] **ADM-04**: Admin can edit user plan and subscription dates
- [ ] **ADM-05**: Admin can delete users with confirmation
- [ ] **ADM-06**: Admin posts page shows table with Title, Type, Status, Created Date, Actions
- [ ] **ADM-07**: Admin can create new posts via /admin/posts/new

### API Routes

- [ ] **API-01**: GET/POST /api/posts with type and status query params, admin-only POST
- [ ] **API-02**: GET/PATCH/DELETE /api/posts/[slug] with admin-only PATCH and DELETE
- [ ] **API-03**: GET/POST /api/users with admin-only access, password excluded from GET
- [ ] **API-04**: PATCH/DELETE /api/users/[id] with admin-only access
- [ ] **API-05**: GET /api/dashboard returns logged-in user profile without password
- [ ] **API-06**: All admin API routes verify JWT role=admin, return 401/403 appropriately

### Performance

- [ ] **PERF-01**: All public pages are server components (no unnecessary "use client")
- [ ] **PERF-02**: Framer Motion used only in HeroSection.tsx
- [ ] **PERF-03**: next/image used for all images with proper width, height, alt
- [ ] **PERF-04**: MongoDB singleton connection pattern prevents connection exhaustion
- [ ] **PERF-05**: .env.local with placeholder values and replacement comments

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Notifications
- **NOTF-01**: Email notifications for subscription expiry
- **NOTF-02**: SMS/WhatsApp automated renewal reminders

### Payments
- **PAY-01**: Online payment gateway for subscription renewal
- **PAY-02**: Payment history visible in member dashboard

### Analytics
- **ANLYT-01**: Google Analytics integration with event tracking
- **ANLYT-02**: Admin analytics dashboard with user growth charts

## Out of Scope

| Feature | Reason |
|---------|--------|
| Online payment gateway | 200-member gym, manual management sufficient. Security liability not justified. |
| Real-time chat | WhatsApp handles all communication for local Indian gym market. |
| Workout tracking / fitness app | This is a business website, not a fitness app. |
| Class booking system | Not needed at 200-member scale. |
| Email marketing (Mailchimp etc.) | WhatsApp is primary channel. Deferred. |
| OAuth social login | Email/password sufficient for v1. |
| Video hosting | Storage/bandwidth costs not justified. |
| Mobile native app | Web-first approach, responsive design covers mobile. |
| Multi-location support | Single gym location only. |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 | Pending |
| FOUN-02 | Phase 1 | Pending |
| FOUN-03 | Phase 1 | Pending |
| FOUN-04 | Phase 1 | Pending |
| FOUN-05 | Phase 1 | Pending |
| FOUN-06 | Phase 1 | Pending |
| AUTH-01 | Phase 2 | Pending |
| AUTH-02 | Phase 2 | Pending |
| AUTH-03 | Phase 2 | Pending |
| AUTH-04 | Phase 2 | Pending |
| AUTH-05 | Phase 2 | Pending |
| AUTH-06 | Phase 2 | Pending |
| AUTH-07 | Phase 2 | Pending |
| PUB-01 | Phase 3 | Pending |
| PUB-02 | Phase 3 | Pending |
| PUB-03 | Phase 3 | Pending |
| PUB-04 | Phase 3 | Pending |
| PUB-05 | Phase 3 | Pending |
| PUB-06 | Phase 3 | Pending |
| PUB-07 | Phase 3 | Pending |
| PUB-08 | Phase 3 | Pending |
| PUB-09 | Phase 3 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 4 | Pending |
| SEO-05 | Phase 4 | Pending |
| SEO-06 | Phase 4 | Pending |
| SEO-07 | Phase 4 | Pending |
| CMS-01 | Phase 5 | Pending |
| CMS-02 | Phase 5 | Pending |
| CMS-03 | Phase 5 | Pending |
| CMS-04 | Phase 5 | Pending |
| CMS-05 | Phase 5 | Pending |
| CMS-06 | Phase 5 | Pending |
| CMS-07 | Phase 5 | Pending |
| CMS-08 | Phase 5 | Pending |
| CMS-09 | Phase 5 | Pending |
| ADM-01 | Phase 6 | Pending |
| ADM-02 | Phase 6 | Pending |
| ADM-03 | Phase 6 | Pending |
| ADM-04 | Phase 6 | Pending |
| ADM-05 | Phase 6 | Pending |
| ADM-06 | Phase 6 | Pending |
| ADM-07 | Phase 6 | Pending |
| DASH-01 | Phase 6 | Pending |
| DASH-02 | Phase 6 | Pending |
| DASH-03 | Phase 6 | Pending |
| DASH-04 | Phase 6 | Pending |
| DASH-05 | Phase 6 | Pending |
| DASH-06 | Phase 6 | Pending |
| API-01 | Phase 7 | Pending |
| API-02 | Phase 7 | Pending |
| API-03 | Phase 7 | Pending |
| API-04 | Phase 7 | Pending |
| API-05 | Phase 7 | Pending |
| API-06 | Phase 7 | Pending |
| PERF-01 | Phase 7 | Pending |
| PERF-02 | Phase 7 | Pending |
| PERF-03 | Phase 7 | Pending |
| PERF-04 | Phase 7 | Pending |
| PERF-05 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 48 total
- Mapped to phases: 48
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-09*
*Last updated: 2026-04-09 after initial definition*
