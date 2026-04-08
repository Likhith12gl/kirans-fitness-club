---
phase: 4
plan: 1
title: "Next Sitemap & Global Schema"
wave: 1
depends_on: []
files_modified:
  - next-sitemap.config.js
  - package.json
  - components/seo/SchemaOrg.tsx
  - app/page.tsx
requirements: [SEO-05, SEO-06, SEO-07]
autonomous: true
---

# Plan 01: Next Sitemap & Global Schema

## Objective
Establish the foundational SEO mechanisms for the application. This includes creating dynamic XML sitemaps and injected Schema.org LocalBusiness JSON-LD structs safely into the DOM.

## Must-Haves
- Installation of `next-sitemap`.
- Config file `next-sitemap.config.js` properly blocking admin routes.
- Modular JSON-LD injection component.
- Updates to `package.json` to trigger `postbuild: next-sitemap`.

## Tasks

<task id="01-01" title="Configure Next-Sitemap">
<read_first>
- package.json
</read_first>
<action>
Modify `package.json` to add `next-sitemap` as a dependency and append the `postbuild` script.
Create `next-sitemap.config.js` in the root folder.

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://kiransfitness.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin', '/admin/*', '/dashboard', '/dashboard/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api'],
      },
    ],
  },
}
```
</action>
<acceptance_criteria>
- `package.json` possesses `"postbuild": "next-sitemap"`
- Next Sitemap rules successfully blacklist private domains.
</acceptance_criteria>
</task>

<task id="01-02" title="Create SchemaOrg Component & Inject in Homepage">
<read_first>
- app/page.tsx
</read_first>
<action>
Create `components/seo/SchemaOrg.tsx` to handle LocalBusiness JSON-LD representation.

```tsx
export default function SchemaOrg() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Kiran's Fitness Club",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    "@id": "https://kiransfitness.com",
    "url": "https://kiransfitness.com",
    "telephone": "+919876543210",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "#123, Magadi Main Road, Anjananagar",
      "addressLocality": "Bangalore",
      "postalCode": "560091",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9784,
      "longitude": 77.4891
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "05:30",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "06:00",
        "closes": "12:00"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
    />
  );
}
```

Modify `app/page.tsx` to include `<SchemaOrg />` at the bottom of the `<main>` tag.
</action>
<acceptance_criteria>
- File `components/seo/SchemaOrg.tsx` is valid TypeScript React and generates `<script>` tags appropriately.
- `app/page.tsx` renders this JSON-LD schema without breaking static generation.
</acceptance_criteria>
</task>
