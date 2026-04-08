# Pitfalls Research: Next.js 14 Gym Website

## Critical Pitfalls

### 1. MongoDB Connection Exhaustion on Vercel
- **Warning signs:** "MongoServerError: too many open connections" in logs
- **Prevention:** Use a connection singleton in `lib/mongodb.ts` that caches the promise globally. Vercel spins up new serverless instances per request — each must reuse the cached connection.
- **Phase:** Phase 1 (Foundation/Database setup)

```typescript
// Correct pattern
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };
```

### 2. "use client" Directive Missing
- **Warning signs:** "useState is not a function", "window is not defined", hydration errors
- **Prevention:** ANY component using useState, useEffect, onClick, or browser APIs MUST have `"use client"` at the very top of the file. No exceptions.
- **Phase:** Every phase with client components

### 3. NextAuth v4 vs v5 Confusion
- **Warning signs:** Import errors, API route handler signature mismatches
- **Prevention:** Use `next-auth@4` explicitly. Do NOT install `@auth/core` or `next-auth@5`. The import path is `next-auth` not `@auth/nextjs`.
- **Phase:** Phase 2 (Auth setup)

### 4. React Quill SSR Crash
- **Warning signs:** "document is not defined" error on build
- **Prevention:** Import React Quill with `dynamic(() => import('react-quill'), { ssr: false })`. Also add `"use client"` to the component file.
- **Phase:** Phase 5 (Admin panel with post editor)

### 5. bcrypt vs bcryptjs on Vercel
- **Warning signs:** Build fails with native binary errors, "Cannot find module 'bcrypt'"
- **Prevention:** Use `bcryptjs` (pure JavaScript). Never install `bcrypt` (requires native compilation which fails in Vercel's serverless environment).
- **Phase:** Phase 2 (Auth setup)

### 6. next/router in App Router
- **Warning signs:** "next/router is not supported in App Router"
- **Prevention:** Always use `next/navigation`. `useRouter()`, `usePathname()`, `useSearchParams()` from `next/navigation`.
- **Phase:** Every phase

### 7. getServerSideProps / getStaticProps in App Router
- **Warning signs:** Functions run but return empty props, pages don't render data
- **Prevention:** Use async server components with direct fetch/DB calls. No props functions exist in App Router.
- **Phase:** Every phase with data fetching

### 8. Dynamic Route Params Type Errors
- **Warning signs:** TypeScript errors on `params.slug` or `params.id`
- **Prevention:** Type all dynamic route components with proper PageProps interface: `{ params: { slug: string } }` for `[slug]/page.tsx`.
- **Phase:** Every phase with dynamic routes

### 9. SessionProvider Not Wrapped Properly
- **Warning signs:** `useSession()` returns null everywhere, auth doesn't work
- **Prevention:** Create a dedicated `Providers.tsx` client component that wraps `SessionProvider`. Import it in root `layout.tsx`. The layout itself stays as server component.
- **Phase:** Phase 2 (Auth setup)

### 10. ISR Not Working on Vercel
- **Warning signs:** Blog posts don't update after 60 seconds
- **Prevention:** Set `export const revalidate = 60` at the page level. For API routes serving real-time data, use `export const dynamic = "force-dynamic"`.
- **Phase:** Phase 4 (Blog/Events)

## Medium Pitfalls

### 11. Middleware matcher Too Broad
- **Warning signs:** Static assets blocked, API routes fail, infinite redirects
- **Prevention:** Export a `config` with `matcher` array that explicitly lists protected paths. Exclude `/_next/`, `/api/auth/`, static files.

### 12. Google Fonts Layout Shift
- **Warning signs:** Text flashes between fonts on page load
- **Prevention:** Use `next/font/google` with `display: 'swap'` and assign to CSS variable. Never use `<link>` tags for fonts.

### 13. Image Optimization Misconfiguration
- **Warning signs:** Images load slowly, no WebP conversion
- **Prevention:** Use `next/image` with explicit `width`, `height`, and descriptive `alt`. For external images (Unsplash), add domain to `next.config.js` `images.remotePatterns`.

### 14. Tailwind Dark Mode Conflicts
- **Warning signs:** Colors don't match design, light elements appearing
- **Prevention:** Since the entire site is dark, don't use Tailwind's dark mode toggle. Set base colors directly in globals.css on `body`.

### 15. JSON-LD Schema Injection
- **Warning signs:** Schema not detected by Google Rich Results Test
- **Prevention:** Use `<script type="application/ld+json">` inside the component JSX (not in `<Head>`). In App Router, use the metadata API's `other` field or inject directly in the page component.

## Low Pitfalls

### 16. Environment Variables Not Loading
- **Prevention:** Prefix client-accessible vars with `NEXT_PUBLIC_`. Server-only vars (MONGODB_URI, NEXTAUTH_SECRET) need no prefix.

### 17. Git Large Files
- **Prevention:** Add `node_modules/`, `.next/`, `.env*` to `.gitignore` before first npm install.
