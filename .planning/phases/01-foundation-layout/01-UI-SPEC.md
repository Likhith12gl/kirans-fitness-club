---
phase: 1
slug: foundation-layout
status: approved
shadcn_initialized: false
preset: none
created: 2026-04-09
---

# Phase 1 — UI Design Contract

> Visual and interaction contract for the Foundation & Layout phase. Establishes the global design system, Navbar, and Footer that all subsequent phases build on.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (pure Tailwind CSS) |
| Preset | not applicable |
| Component library | none (custom components) |
| Icon library | lucide-react |
| Heading font | Montserrat (next/font/google) |
| Body font | Inter (next/font/google) |

---

## Spacing Scale

Declared values (multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps, inline padding |
| sm | 8px | Compact element spacing, icon-text gaps |
| md | 16px | Default element spacing, card padding |
| lg | 24px | Section padding, navbar height padding |
| xl | 32px | Layout gaps between sections |
| 2xl | 48px | Major section breaks |
| 3xl | 64px | Page-level top/bottom section padding |
| 4xl | 96px | Hero section vertical padding (mobile) |
| 5xl | 128px | Hero section vertical padding (desktop) |

Exceptions: Hero section uses viewport height (100vh) not spacing tokens.

---

## Typography

| Role | Font | Size | Weight | Line Height | Usage |
|------|------|------|--------|-------------|-------|
| Body | Inter | 16px | 400 | 1.6 | Paragraph text, descriptions |
| Body Strong | Inter | 16px | 500 | 1.6 | Labels, nav links, emphasis |
| Small | Inter | 14px | 400 | 1.5 | Metadata, captions, footer text |
| H1 / Display | Montserrat | 48px (desktop) / 32px (mobile) | 700 | 1.1 | Page hero titles |
| H2 | Montserrat | 36px (desktop) / 28px (mobile) | 700 | 1.2 | Section headings |
| H3 | Montserrat | 24px (desktop) / 20px (mobile) | 600 | 1.3 | Card titles, sub-sections |
| H4 | Montserrat | 18px | 600 | 1.4 | Minor headings |
| Nav Link | Inter | 15px | 500 | 1 | Navbar links |
| Button | Inter | 15px | 600 | 1 | Button text |

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | #0f0f0f | Page backgrounds, root body |
| Surface | #1a1a1a | Cards, dropdowns, footer background |
| Surface Alt | #111111 | Alternating sections backgrounds |
| Accent (10%) | #f5c518 | Primary buttons, CTAs, active nav, hover borders, stat numbers |
| Accent Hover | #d4a812 | Primary button hover state |
| Text Primary | #ffffff | Headings, body text |
| Text Secondary | #a0a0a0 | Descriptions, metadata, placeholder text |
| Text Muted | #666666 | Copyright text, disabled states |
| Border | rgba(255,255,255,0.08) | Card borders, dividers, navbar bottom |
| Border Hover | rgba(255,255,255,0.20) | Card hover borders |
| Destructive | #ef4444 | Delete buttons, error states, expired badges |
| Warning | #eab308 | Expiring subscription warnings |
| Success | #22c55e | Success toasts, active subscription |

Accent reserved for: Primary CTA buttons, navbar active link indicator, stat card numbers, WhatsApp buttons, hover border brightening. **Never** on all headings or body text.

---

## Component Contracts

### Navbar

| Property | Value |
|----------|-------|
| Height | 64px (desktop), 56px (mobile) |
| Position | fixed top, full width, z-50 |
| Background | transparent initially → #0f0f0f/90 with backdrop-blur-sm on scroll |
| Border bottom | 1px solid rgba(255,255,255,0.08) |
| Logo | Text "Kiran's Fitness Club" in Montserrat 600, white, 20px |
| Nav links | Inter 500, 15px, text-secondary → white on hover, gold underline on active |
| Auth state | Logged out: "Login" link. Logged in: "Dashboard" link + "Logout" button |
| Mobile trigger | Hamburger icon (Menu from lucide-react), 768px breakpoint |
| Mobile menu | Slide-down overlay, #0f0f0f background, full-width links stacked vertically |
| Mobile transition | height transition 300ms ease |

### Footer

| Property | Value |
|----------|-------|
| Background | #111111 |
| Border top | 1px solid rgba(255,255,255,0.08) |
| Layout | 4-column grid (desktop) → stacked (mobile) |
| Column 1 | Gym name (Montserrat 600, 18px, white) + 1-line tagline (Inter 400, 14px, text-secondary) |
| Column 2 | "Quick Links" heading + page links (Home, Services, Blog, Events, About, Contact) |
| Column 3 | "Contact" heading + address placeholder + phone placeholder + email placeholder |
| Column 4 | "Follow Us" heading + social icon links (Instagram, YouTube, Facebook) as lucide-react icons |
| Copyright bar | Full-width, border-top same as above, text-muted, centered, "© 2026 Kiran's Fitness Club. All rights reserved." |
| Padding | 3xl (64px) top/bottom, responsive side padding |

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | #f5c518 | #000000 | none | bg #d4a812, slight shadow |
| Secondary | transparent | #f5c518 | 1px solid #f5c518 | bg rgba(245,197,24,0.1) |
| Ghost | transparent | #a0a0a0 | none | text white |
| Destructive | transparent | #ef4444 | 1px solid #ef4444 | bg rgba(239,68,68,0.1) |
| Border radius | 8px for all variants |
| Padding | 12px 24px (md), 10px 20px (sm) |

### Cards

| Property | Value |
|----------|-------|
| Background | #1a1a1a |
| Border | 1px solid rgba(255,255,255,0.08) |
| Border radius | 12px |
| Padding | md (16px) |
| Hover | border rgba(255,255,255,0.20), transform scale(1.02), transition 200ms ease |
| Shadow | none (borders only — dark theme) |

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | "Join Now" |
| Secondary CTA | "View Plans" |
| WhatsApp CTA | "Chat on WhatsApp" |
| Footer tagline | "Transform your fitness journey" |
| Empty state heading | "Nothing here yet" |
| Empty state body | "Check back soon for updates." |
| Error state | "Something went wrong — please try again." |
| Destructive confirmation | "Delete: Are you sure? This action cannot be undone." |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| No external registries | N/A | N/A |

This phase uses only custom Tailwind CSS components — no shadcn, no external UI registries.

---

## Responsive Breakpoints

| Breakpoint | Value | Layout Changes |
|------------|-------|----------------|
| Mobile | < 768px | Single column, hamburger nav, stacked footer |
| Tablet | 768px - 1024px | 2-column grids, compact navbar |
| Desktop | > 1024px | 4-column footer, full navbar, wider content |
| Max width | 1280px | Content container max-width |

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS — CTAs are specific verb+noun, empty/error states defined
- [x] Dimension 2 Visuals: PASS — Component contracts complete for Navbar, Footer, Buttons, Cards
- [x] Dimension 3 Color: PASS — 60/30/10 rule applied, accent reserved for specific elements
- [x] Dimension 4 Typography: PASS — Two-font system with clear hierarchy, responsive sizes
- [x] Dimension 5 Spacing: PASS — 4px-based scale, explicit exceptions documented
- [x] Dimension 6 Registry Safety: PASS — No external registries used

**Approval:** approved 2026-04-09
