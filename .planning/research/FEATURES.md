# Features Research: Gym Website

## Table Stakes (Must-Have — Users Expect These)

### Public Website
- **Homepage with hero section** — First impression, brand identity, CTA
- **Services/pricing page** — What you offer and how much it costs
- **Contact page with form** — Basic lead capture
- **About page** — Trust building, team showcase
- **Mobile responsive design** — 60%+ traffic is mobile in India
- **Google Maps embed** — "How do I get there?"
- **WhatsApp contact button** — Standard for Indian local businesses
- **Social proof (testimonials)** — Trust signals

### SEO
- **Location-specific landing pages** — "gym near [area]" searches drive local footfall
- **Google Business profile alignment** — NAP consistency (Name, Address, Phone)
- **LocalBusiness JSON-LD schema** — Rich snippets in search results
- **Sitemap.xml + robots.txt** — Search engine crawlability
- **Meta tags on every page** — Title, description, Open Graph

### Member Features
- **Login/authentication** — Members need private access
- **Subscription status dashboard** — "When does my plan expire?"
- **Plan details visibility** — What plan am I on?

### Admin Features
- **User management (CRUD)** — Add/remove members, update plans
- **Content management** — Blog posts, events, announcements
- **Basic analytics overview** — Active members, expiring subscriptions

## Differentiators (Competitive Advantage)

| Feature | Complexity | Impact |
|---------|-----------|--------|
| Blog/Events CMS with rich text | Medium | SEO value + member engagement |
| Subscription expiry warnings | Low | Reduces churn, prompts renewal |
| ISR for blog pages | Low | Fresh content without rebuild |
| SEO-optimized location pages | Medium | Drives organic local traffic |
| Dark premium aesthetic | Medium | Brand differentiation |

## Anti-Features (Do NOT Build)

| Feature | Why Not |
|---------|---------|
| Online payment gateway | 200 members, manual management is fine. Payment integration adds security liability. |
| Real-time chat | Overkill for local gym. WhatsApp handles all communication. |
| Workout tracking / fitness app features | Out of scope. This is a business website, not a fitness app. |
| Class booking system | Not needed at 200-member scale. Can be added later. |
| Email marketing integration | Deferred. WhatsApp is primary communication channel. |
| Member-to-member social features | Not a social platform. |
| Video streaming / workout videos | Storage costs, bandwidth, not core value. |

## Feature Dependencies

```
Authentication ──→ Dashboard ──→ Subscription Display
      │
      └──→ Admin Panel ──→ User Management
                     └──→ Post Management ──→ Blog/Events Pages
                     
Public Pages (independent)
SEO/Location Pages (independent)
```
