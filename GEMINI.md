<!-- GSD:project-start source:PROJECT.md -->
## Project

**Kiran's Fitness Club**

A production-ready, full-stack gym website for Kiran's Fitness Club — a fitness center in Anjananagar, Bangalore. The website serves as the gym's digital presence with public marketing pages, SEO-optimized location pages, a blog/events CMS, member subscription dashboard, and admin panel for managing users and content. Built to handle ~200 members with minimal latency and clean aesthetics.

**Core Value:** Members can view their subscription status and the admin can manage memberships and content — the website must reliably serve as the gym's operational hub and primary online presence for local SEO.

### Constraints

- **Tech stack:** Next.js 14 App Router, Tailwind CSS, MongoDB Atlas, NextAuth.js, Framer Motion (hero only)
- **Performance:** Framer Motion restricted to hero section only; server components by default on public pages; no heavy animation libraries
- **Database:** MongoDB Atlas with Mongoose ODM; singleton connection pattern for Vercel serverless
- **Auth:** NextAuth.js credentials provider with JWT in httpOnly cookies; bcrypt password hashing
- **Rich text:** React Quill for admin post editor (client component with "use client" directive)
- **Images:** next/image for all images with proper width, height, alt text
- **Fonts:** next/font (Geist Sans or Montserrat + Inter) — no external link tags
- **SEO tools:** next-sitemap package, Next.js 14 native Metadata API
- **Hosting:** Vercel-ready, no build errors
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack (2025)
### Core Framework
- **Next.js 14.2+** (App Router) — Server components by default, streaming SSR, ISR with revalidate, native Metadata API
### Styling
- **Tailwind CSS 3.4+** — Utility-first CSS, excellent DX, tree-shaken in production
### Animation
- **Framer Motion 11+** — Used ONLY on hero section and page transitions
### Database
- **MongoDB Atlas (Free M0 tier)** — Cloud-hosted, 512MB storage, sufficient for 200 members
### Authentication
- **NextAuth.js v4 (next-auth@4)** — Credentials provider, JWT strategy
### Rich Text Editor
- **React Quill 2.0+** — Client-only component (must use "use client" + dynamic import with ssr: false)
### SEO
- **next-sitemap 4+** — Auto-generates sitemap.xml and robots.txt on build
### Image Optimization
- **next/image** — Built-in, auto-optimizes, lazy loads, serves WebP
### Fonts
- **next/font/google** — Self-hosted Google Fonts, zero layout shift
### Icons
- **lucide-react** — Tree-shakeable icon library, lightweight
### Sanitization
- **dompurify + jsdom** — Sanitize React Quill HTML output before rendering
## What NOT to Use
| Library | Why Not |
|---------|---------|
| bcrypt (native) | Requires native bindings, fails on Vercel serverless. Use bcryptjs instead |
| NextAuth v5 (Auth.js) | Still unstable with App Router, breaking API changes |
| next/router | Removed in App Router. Use next/navigation |
| getServerSideProps / getStaticProps | Not available in App Router. Use async server components |
| Prisma (for MongoDB) | Adds complexity; Mongoose is more natural for MongoDB |
| Heavy animation libs (GSAP, Three.js) | Overkill for this project, hurts performance |
| External CSS link tags for fonts | Causes FOUT/layout shift; use next/font instead |
## Package List
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
