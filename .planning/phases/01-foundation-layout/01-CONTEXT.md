# Phase 1: Foundation & Layout - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Initialize the Next.js 14 App Router project with Tailwind CSS, apply the dark gym design system globally, load fonts via next/font, create the root layout with providers, and build shared Navbar and Footer components.

</domain>

<decisions>
## Implementation Decisions

### Navbar
- **D-01:** Text-only logo ("Kiran's Fitness Club") — no image logo needed
- **D-02:** Mobile hamburger opens a slide-down overlay menu (not a side panel) — simpler implementation
- **D-03:** Active page link highlighted with gold underline or gold text color
- **D-04:** Sticky navbar with `backdrop-blur-sm` on scroll (CSS only via Tailwind)
- **D-05:** Conditional rendering: show Login when unauthenticated, Dashboard + Logout when authenticated

### Footer
- **D-06:** Multi-column layout: Column 1 (gym name + tagline), Column 2 (Quick Links), Column 3 (Contact info placeholders), Column 4 (social icons — placeholder links for Instagram, YouTube, Facebook)
- **D-07:** Copyright bar at the bottom

### Design Tokens
- **D-08:** Background: #0f0f0f (primary), #1a1a1a (card/surface), #111111 (alternate sections)
- **D-09:** Accent gold: #f5c518 — used for buttons, CTAs, active states, and section accents. NOT for all headings (headings remain white for readability)
- **D-10:** Card borders: 1px solid rgba(255,255,255,0.08) — subtle separator
- **D-11:** Card hover: border brightens to rgba(255,255,255,0.2) + slight scale(1.02) transform, CSS transition 200ms
- **D-12:** Primary button: gold background (#f5c518) + black text. Secondary: transparent + gold border + gold text
- **D-13:** Font: Montserrat (headings, weight 700) + Inter (body, weight 400/500) via next/font/google

### Agent's Discretion
- Root layout structure and providers wrapper approach
- Tailwind config details (extend vs override)
- Analytics script placeholder format
- .env.local structure

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Specs
- `.planning/PROJECT.md` — Core value, constraints, tech stack decisions
- `.planning/REQUIREMENTS.md` — FOUN-01 through FOUN-06 requirements for this phase
- `.planning/ROADMAP.md` — Phase 1 success criteria

### Research
- `.planning/research/STACK.md` — Package versions, what NOT to use
- `.planning/research/PITFALLS.md` — Pitfalls #2 (use client), #12 (font layout shift), #14 (Tailwind dark mode), #16 (env vars), #17 (gitignore)
- `.planning/research/ARCHITECTURE.md` — Component boundaries, build order

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None — patterns will be established in this phase

### Integration Points
- Root layout.tsx is the foundation everything builds on
- Navbar and Footer wrap all pages
- Design tokens (Tailwind config) used by every subsequent phase

</code_context>

<specifics>
## Specific Ideas

- Dark gym aesthetic: deep black background, gold accents — "premium, serious fitness" feel
- User explicitly said: "keep it best simple visually appealing and best working, don't make it very complex"
- ~200 members max, no scalability concerns, just clean and fast

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-layout*
*Context gathered: 2026-04-09*
