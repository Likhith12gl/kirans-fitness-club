# Stack Research: Gym Website (Next.js 14)

## Recommended Stack (2025)

### Core Framework
- **Next.js 14.2+** (App Router) — Server components by default, streaming SSR, ISR with revalidate, native Metadata API
  - Rationale: App Router is production-stable since 14.1, server components reduce client JS bundle
  - Confidence: ★★★★★

### Styling
- **Tailwind CSS 3.4+** — Utility-first CSS, excellent DX, tree-shaken in production
  - Rationale: Zero runtime CSS, purged unused classes, fast iteration
  - Confidence: ★★★★★

### Animation
- **Framer Motion 11+** — Used ONLY on hero section and page transitions
  - Rationale: Best React animation library, but heavy (~30KB). Restricting to hero prevents CLS/LCP impact
  - Confidence: ★★★★☆ (watch bundle size)

### Database
- **MongoDB Atlas (Free M0 tier)** — Cloud-hosted, 512MB storage, sufficient for 200 members
  - **Mongoose 8+** ODM — Schema validation, middleware hooks, population
  - Rationale: Flexible schema for membership data, free tier handles this scale easily
  - Confidence: ★★★★★

### Authentication
- **NextAuth.js v4 (next-auth@4)** — Credentials provider, JWT strategy
  - Rationale: Built for Next.js, handles sessions/JWT/CSRF, well-documented
  - Do NOT use v5 (Auth.js) yet — still has breaking changes in App Router integration
  - **bcryptjs** (not bcrypt) — Pure JS implementation, works on Vercel serverless without native bindings
  - Confidence: ★★★★☆

### Rich Text Editor
- **React Quill 2.0+** — Client-only component (must use "use client" + dynamic import with ssr: false)
  - Rationale: Lightweight, outputs clean HTML, sufficient for blog/event content
  - Alternative considered: TipTap (more modern but heavier setup)
  - Confidence: ★★★★☆

### SEO
- **next-sitemap 4+** — Auto-generates sitemap.xml and robots.txt on build
  - **Next.js 14 native Metadata API** — export metadata objects or generateMetadata functions
  - Confidence: ★★★★★

### Image Optimization
- **next/image** — Built-in, auto-optimizes, lazy loads, serves WebP
  - Confidence: ★★★★★

### Fonts
- **next/font/google** — Self-hosted Google Fonts, zero layout shift
  - Montserrat (headings) + Inter (body)
  - Confidence: ★★★★★

### Icons
- **lucide-react** — Tree-shakeable icon library, lightweight
  - Confidence: ★★★★★

### Sanitization
- **dompurify + jsdom** — Sanitize React Quill HTML output before rendering
  - Confidence: ★★★★☆

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

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-auth": "^4.24.0",
    "mongoose": "^8.5.0",
    "bcryptjs": "^2.4.3",
    "framer-motion": "^11.0.0",
    "react-quill": "^2.0.0",
    "lucide-react": "^0.400.0",
    "dompurify": "^3.1.0",
    "next-sitemap": "^4.2.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/dompurify": "^3.0.5",
    "typescript": "^5.5.0",
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "ts-node": "^10.9.0"
  }
}
```
