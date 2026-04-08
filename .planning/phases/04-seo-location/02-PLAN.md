---
phase: 4
plan: 2
title: "Location Landing Pages"
wave: 2
depends_on: [1]
files_modified:
  - components/seo/LocationPageTemplate.tsx
  - app/gym-in-anjananagar/page.tsx
  - app/gym-near-magadi-road/page.tsx
  - app/gym-near-bath-road/page.tsx
requirements: [SEO-01, SEO-02, SEO-03, SEO-04]
autonomous: true
---

# Plan 02: Location Landing Pages

## Objective
Build location-specific landing pages that rank strongly on local searches (e.g. "Gym in Anjananagar", "Gym near Magadi Road"). Utilize a reusable template that satisfies unique 400+ word thresholds per requirement and strict metadata rules.

## Tasks

<task id="02-01" title="Create LocationPageTemplate">
<read_first>
- components/seo/SchemaOrg.tsx
</read_first>
<action>
Create `components/seo/LocationPageTemplate.tsx`.

```tsx
import SchemaOrg from "@/components/seo/SchemaOrg";
import Link from "next/link";
import { CheckCircle2, MapPin } from "lucide-react";

interface LocationPageProps {
  title: string;
  subtitle: string;
  paragraphs: string[];
  features: string[];
  showMap?: boolean;
}

export default function LocationPageTemplate({ title, subtitle, paragraphs, features, showMap }: LocationPageProps) {
  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <SchemaOrg />
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">
            {title}
          </h1>
          <p className="text-text-secondary text-lg">{subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6 text-text-secondary text-lg leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            
            <div className="mt-10 pt-10 border-t border-border">
              <h2 className="text-2xl font-bold text-white mb-6">Why Train With Us?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <Link href="/services" className="btn-primary inline-block">
                View Membership Plans
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="card p-6 border border-border">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="text-accent w-5 h-5" /> Visit Our Gym
              </h3>
              <p className="text-text-secondary mb-4">#123, Magadi Main Road, Anjananagar<br/>Bangalore, 560091</p>
              <div className="text-accent font-bold mb-6">+91 98765 43210</div>
              
              {showMap && (
                <div className="w-full h-48 rounded-button overflow-hidden mb-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x3bae3db65e2333b1%3A0xe54e60156d95394!2sAnjana%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```
</action>
<acceptance_criteria>
- The LocationPageTemplate component abstracts standard layout structures, minimizing copy density boilerplate.
- Includes `<SchemaOrg />` inside `<main>`
</acceptance_criteria>
</task>

<task id="02-02" title="Generate Pages (Anjananagar, Magadi Road, Bath Road)">
<read_first>
- components/seo/LocationPageTemplate.tsx
</read_first>
<action>
Create `app/gym-in-anjananagar/page.tsx`. Provide distinct next metadata and distinct 400+ words across the props.
Create `app/gym-near-magadi-road/page.tsx`. Provide distinct next metadata and distinct 400+ words across the props. Only `gym-in-anjananagar` needs the map.
Create `app/gym-near-bath-road/page.tsx`. Provide distinct next metadata and distinct 400+ words across the props.

*(You will extrapolate the filler paragraphs simulating high-value keyword density relating to these distinct bangalorean wards locally based on the prompts)*.
</action>
<acceptance_criteria>
- Each discrete page correctly implements Next.js App router `export const metadata`.
- Each page utilizes `<LocationPageTemplate>` efficiently.
</acceptance_criteria>
</task>
