# Phase 05: Content Management System - Context

**Gathered:** 2026-04-09  
**Status:** Ready for planning  
**Source:** Smart Defaults (Fast-tracked via YOLO mode based on strict REQUIREMENTS.md)

<domain>
## Phase Boundary

The implementation of a custom native Content Management System utilizing MongoDB (via Mongoose), building the admin interfaces necessary for CRUD operations (React Quill), and exposing the resulting dynamic data to the public `/blog` and `/events` listing routes with ISR functionality.
</domain>

<decisions>
## Implementation Decisions

### MongoDB & Models (CMS-01, CMS-03)
- **D-01: The Post Model:** We will create `models/Post.ts` tracking `title`, `slug`, `content` (HTML block), `type` (Enum: "blog" | "event"), `status` (Enum: "published" | "draft"), and traditional `timestamps`.
- **D-02: Slug Generation:** Generating the slug will be handled strictly server-side within the API routes or Mongoose pre-save hooks to enforce `slug` uniqueness.

### Administration UI (CMS-02, CMS-04)
- **D-03: Rich Text:** Integrations with `react-quill` require explicit dynamic importation disabling SSR (`ssr: false`) to avoid hydration breaking in the Next.js `app` router.
- **D-04: Admin Endpoints:** To facilitate the admin actions, we will implement the foundational backend routes `/api/posts` and `/api/posts/[slug]`. Even though deep security hardening is planned for Phase 7, we must wrap these routes in `getServerSession` checks right now to ensure the React Quill editor operates properly within the guarded `/admin` directories.

### Public Rendering (CMS-05 to CMS-09)
- **D-05: Component Separation:** The `/blog` and `/events` endpoints share identical aesthetic grids. We will leverage a shared `PostListTemplate` and `PostSingleTemplate` to avoid duplication.
- **D-06: Sanitization:** Because React Quill exports raw HTML strings, we will use `isomorphic-dompurify` (or standard `dompurify` + `jsdom`) strictly in the rendering phase of the public blog endpoints, effectively removing XSS threats before dumping `.__html`.
- **D-07: Static Generation (ISR):** We will use the Next.js App Router method: `export const revalidate = 60` physically deployed onto the `page.tsx` of the public listings. 

### The Agent's Discretion
- Standardizing the look and feel of the Quill Editor inside the gym's dark mode aesthetic.
- Paginating the blog list at `12` or `9` items if deemed necessary (or simply pulling all for v1).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Foundational Docs
- `.planning/REQUIREMENTS.md` — Requirement keys: `CMS-01` to `CMS-09`.
- `.planning/phases/02-database-authentication/02-CONTEXT.md` — Explains the Mongoose singleton cache in `lib/db.ts` we must use.
</canonical_refs>

<specifics>
## Specific Ideas
- To render standard blog formatting correctly, we should add `prose prose-invert` explicitly from `@tailwindcss/typography` to the rich-text display blocks. This requires installing the Tailwind plugin.
</specifics>

<deferred>
## Deferred Ideas
- Tracking analytics payload for individual post views (deferred to V2).
</deferred>

---

*Phase: 05-cms*  
*Context gathered: 2026-04-09 via Smart Defaults / Express Path*
