# Phase 04: SEO & Location Pages - Context

**Gathered:** 2026-04-09  
**Status:** Ready for planning  
**Source:** Smart Defaults (Fast-tracked via YOLO mode based on strict REQUIREMENTS.md)

<domain>
## Phase Boundary

The generation of dynamic sitemaps, application of static LocalBusiness Schema JSON-LD, and construction of three programmatic landing pages focused strictly on localized search rankings.
*(This boundary does not overlap with dynamic CMS posts [Phase 5] or actual authentication dashboard logic).*
</domain>

<decisions>
## Implementation Decisions

### Page Generation (SEO-01 to SEO-03)
- **D-01: Modular approach:** Rather than copying large components, create a shared `<LocationPageTemplate>` component that receives specific props (`cityName`, `metaDescription`, `mapUrl`, `customParagraphs`). The routes `/gym-in-anjananagar`, `/gym-near-magadi-road`, and `/gym-near-bath-road` will simply consume this template and supply the 400+ words of copy.
- **D-02: Content Structure:** Content will be hard-coded into the arrays inside the route for v1, fulfilling the 400+ words uniqueness requirement without utilizing an actual DB request (static generation runs faster and guarantees exit-code zero easily).
- **D-03: Maps Embed:** Only `/gym-in-anjananagar` requires the Google Maps Embed (SEO-01).

### Schema Optimization (SEO-04, SEO-05)
- **D-04: Dynamic Head Metadata:** Implement standard Next.js 14 Metadata API constructs (`export const metadata`) on each location page root to satisfy SEO-04.
- **D-05: LocalBusiness Schema:** Generate a `SchemaOrgComponent` utilizing `dangerouslySetInnerHTML` injecting a standard `application/ld+json` string containing standard LocalBiz traits (Opening hours, rating, exact address, telephone). Render this on the location pages and explicitly inject it onto `app/page.tsx` (Homepage).

### Robots and Sitemap (SEO-06, SEO-07)
- **D-06: `next-sitemap` implementation:** Configure `next-sitemap.config.js` to automatically crawl build routes.
- **D-07: Robots block rules:** Explicitly declare `disallow: ['/admin', '/dashboard', '/login', '/api']` within the `next-sitemap.config.js` variables. Add `postbuild` script or attach to the build pipeline to run `next-sitemap`.

### The Agent's Discretion
- The specific generation of the 400+ distinct words for each location tag simulating high-quality SEO keyword padding.
- Selection of the dummy Google Maps URLs.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Foundational Docs
- `.planning/REQUIREMENTS.md` — Requirement keys: `SEO-01` to `SEO-07`.
</canonical_refs>

<specifics>
## Specific Ideas
- To keep the root directories clean, the routes can simply be structured as `app/gym-in-anjananagar/page.tsx`, `app/gym-near-magadi-road/page.tsx`, and `app/gym-near-bath-road/page.tsx` since Next.js app router supports flat path resolution natively.
</specifics>

<deferred>
## Deferred Ideas
- Expanding automated schema generation for dynamically loaded CMS blog articles (handled directly in Phase 5).
</deferred>

---

*Phase: 04-seo-location*  
*Context gathered: 2026-04-09 via Smart Defaults / Express Path*
