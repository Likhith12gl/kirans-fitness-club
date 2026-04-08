# Phase 03: Public Pages - Context

**Gathered:** 2026-04-09  
**Status:** Ready for planning  
**Source:** Smart Defaults (Fast-tracked via YOLO mode based on strict REQUIREMENTS.md)

<domain>
## Phase Boundary

Build all public-facing marketing pages — Homepage (with Framer Motion hero), Services, About, and Contact.
*(This boundary does not include dynamic posts, blog elements, or location-specific SEO pages. Those are handled in later phases.)*
</domain>

<decisions>
## Implementation Decisions

### Homepage Layout (PUB-01 to PUB-06)
- **D-01: Hero Animation:** `framer-motion` applies **only** to the Homepage Hero component. It uses a fade-in animation and works across screen sizes. The component must have `"use client"` but everything else on the page shouldn't.
- **D-02: Stats Data:** Hardcoded stats component (500+ Members, 10+ Years, Expert Trainers).
- **D-03: Services Preview:** Use exactly 6 cards with `lucide-react` icons. (Ensure we stick to standard `lucide-react` icons like Dumbbell, HeartPulse, given the `Instagram` removal issue from Phase 1).
- **D-04: Testimonials:** 4 hardcoded testimonials rendered in a grid or flex wrap, each showing 5 stars.
- **D-05: Map & CTA:** Embed Google Maps iframe pointing to Anjananagar, Bangalore. The final CTA banner contains a "WhatsApp Us" button styling.

### Internal Pages (PUB-07 to PUB-09)
- **D-06: Services Page:** Display a full service breakdown, plus 3 pricing plan cards (Monthly, Quarterly, Annual).
- **D-07: About Page:** Emphasize the "Gym Story" visually, accompanied by 3 trainer profile cards (`next/image` required).
- **D-08: Contact Form:** The form should simulate submission via a client-side API action (or basic state) to show a success toast. It fields `name, email, phone, message`. 
- **D-09: Contact Details:** The page contains a Google Map embed identical to the homepage and a clear WhatsApp link.

### Styling & Theming
- **D-10:** Utilize the custom classes from Phase 1 (`.btn-primary`, `.btn-secondary`, `.card`, `.section-padding`, `.container-custom`).
- **D-11:** All marketing pages should use `next/image` with unoptimized flags if they are external from Unsplash, or proper static `width` / `height` attributes to prevent layout shift.

### the agent's Discretion
- Image selection (Unsplash placeholder URLs using the configured `images.remotePatterns`).
- Specific wording for testimonials and the "Gym Story" (keep it professional and motivating).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Foundational Docs
- `.planning/REQUIREMENTS.md` — Requirement keys: `PUB-01` to `PUB-09`.
- `.planning/phases/01-foundation-layout/01-UI-SPEC.md` — The global design specifications.
- `app/globals.css` — To see existing component class names (`.card`, `.btn-primary`).
</canonical_refs>

<specifics>
## Specific Ideas
- React Toastify or `sonner` aren't explicitly installed for the Contact page success toast. We can write a simple custom lightweight toast component for `PUB-09` to avoid adding heavy new dependencies.
</specifics>

<deferred>
## Deferred Ideas
- Dynamic content injection from the CMS (delayed to Phase 5).
</deferred>

---

*Phase: 03-public-pages*  
*Context gathered: 2026-04-09 via Smart Defaults / Express Path*
