---
phase: 3
plan: 1
title: "Homepage Components & Layout"
wave: 1
depends_on: []
files_modified:
  - components/home/HeroSection.tsx
  - components/home/StatCards.tsx
  - components/home/ServicePreviews.tsx
  - components/home/Testimonials.tsx
  - components/home/LocationCTA.tsx
  - app/page.tsx
requirements: [PUB-01, PUB-02, PUB-03, PUB-04, PUB-05, PUB-06]
autonomous: true
---

# Plan 01: Homepage Components & Layout

## Objective

Build the homepage using modular server components, except for the `HeroSection` which will utilize `framer-motion` for a fade-in effect (`use client`). Replace the placeholder homepage with a stunning marketing landing page consisting of stats, services, testimonials, and a map/CTA section.

## Must-Haves

- `framer-motion` is strictly only imported inside `HeroSection.tsx`.
- Dark Mode aesthetic (#0f0f0f) with Gold (#f5c518) accents utilized throughout `btn-primary`, `btn-secondary`, and `text-accent`.
- `lucide-react` used for strictly available SVG icons (Dumbbell, HeartPulse, Activity, Trophy, Clock, Phone).
- Google Map iframe points generally to "Anjananagar, Bangalore" or a dummy map embed.
- Testimonials are hardcoded with 5 stars.
- `next/image` is used optimally for external dummy gym photos (via Unsplash).

## Tasks

<task id="01-01" title="Build HeroSection (Client Component)">
<read_first>
- tailwind.config.ts
</read_first>
<action>
Create `components/home/HeroSection.tsx`.

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Kiran's Fitness Club interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/80 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16"
      >
        <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 uppercase tracking-tight">
          Transform Your <span className="text-accent">Physique</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto font-light">
          Anjananagar's premier fitness destination. Experience elite equipment, expert guidance, and a community that pushes you further.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/services" className="btn-primary w-full sm:w-auto px-8 py-4 text-lg">
            View Memberships
          </Link>
          <Link href="/contact" className="btn-secondary w-full sm:w-auto px-8 py-4 text-lg bg-white/5 border-white/10 hover:bg-white/10 text-white">
            Free Trial Class
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
```
</action>
<acceptance_criteria>
- Component uses `"use client"` and imports `framer-motion`
- Contains hero image utilizing `next/image` with `fill` and `priority`
- Buttons link to `/services` and `/contact`
</acceptance_criteria>
</task>

<task id="01-02" title="Build StatCards & ServicePreviews Components">
<read_first>
- app/globals.css
</read_first>
<action>
Create `components/home/StatCards.tsx`.
```tsx
export default function StatCards() {
  const stats = [
    { label: "Active Members", value: "500+" },
    { label: "Years Experience", value: "10+" },
    { label: "Expert Trainers", value: "8" },
    { label: "Sqft Facility", value: "4000+" },
  ];

  return (
    <section className="py-12 bg-surface border-y border-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-4xl md:text-5xl font-heading font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-text-secondary text-sm md:text-base uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `components/home/ServicePreviews.tsx`.
```tsx
import Link from "next/link";
import { Dumbbell, HeartPulse, Activity, Trophy, Users, Clock } from "lucide-react";

export default function ServicePreviews() {
  const services = [
    { icon: Dumbbell, title: "Weight Training", desc: "Premium free weights and resistance machines." },
    { icon: HeartPulse, title: "Cardio Zone", desc: "Treadmills, ellipticals, and rowers." },
    { icon: Users, title: "Group Classes", desc: "High-energy sessions led by experts." },
    { icon: Trophy, title: "Personal Training", desc: "1-on-1 coaching to hit your goals." },
    { icon: Activity, title: "CrossFit", desc: "Functional fitness for all levels." },
    { icon: Clock, title: "Flexible Hours", desc: "Open early and late to fit your schedule." },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-white font-heading font-bold mb-4 uppercase">Our <span className="text-accent">Facilities</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Everything you need to build the body you want.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={i} className="card p-8 group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl text-white font-bold mb-3">{service.title}</h3>
                <p className="text-text-secondary">{service.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-secondary inline-block">Explore All Services</Link>
        </div>
      </div>
    </section>
  );
}
```
</action>
<acceptance_criteria>
- Reusable React components created utilizing semantic HTML tags (`section`).
- Valid `lucide-react` icons are used.
- Classes utilize the `card`, `section-padding` and `text-accent` defaults.
</acceptance_criteria>
</task>

<task id="01-03" title="Build Testimonials & LocationCTA Components">
<read_first>
- components/home/ServicePreviews.tsx
</read_first>
<action>
Create `components/home/Testimonials.tsx`.
```tsx
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    { name: "Rahul S.", text: "Best gym in Anjananagar! The equipment is top-notch and trainers are always helpful.", role: "Member for 2 years" },
    { name: "Priya M.", text: "Lost 10kg in 4 months with their personal training program. Life changing experience.", role: "Member for 6 months" },
    { name: "Karthik R.", text: "Great atmosphere, never too crowded, and the staff actually cares about your form.", role: "Member for 1 year" },
    { name: "Deepa K.", text: "The group classes are amazing. Best decision I made for my fitness journey.", role: "Member for 3 years" },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <h2 className="text-3xl md:text-5xl text-white font-heading font-bold mb-16 text-center uppercase">Success <span className="text-accent">Stories</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background p-8 rounded-button border border-border">
              <div className="flex text-accent mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-text-secondary italic mb-6">"{t.text}"</p>
              <div>
                <h4 className="text-white font-bold">{t.name}</h4>
                <p className="text-sm text-text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `components/home/LocationCTA.tsx`.
```tsx
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function LocationCTA() {
  return (
    <section className="py-20 bg-background relative border-t border-border">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl text-white font-heading font-bold mb-6 uppercase">Ready to <span className="text-accent">Start?</span></h2>
            <p className="text-text-secondary text-lg mb-8">
              Join Kiran's Fitness Club today and take the first step towards a stronger, healthier you. Drop by our facility in Anjananagar.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-surface rounded-full flex shrink-0 items-center justify-center text-accent">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Location</h4>
                  <p className="text-text-secondary">#123, Magadi Main Road, Anjananagar<br/>Bangalore, 560091</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-surface rounded-full flex shrink-0 items-center justify-center text-accent">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Contact</h4>
                  <p className="text-text-secondary">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <Link href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.8 9.8 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/></svg>
              Chat on WhatsApp
            </Link>
          </div>
          <div className="h-[400px] w-full rounded-button overflow-hidden border border-border">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x3bae3db65e2333b1%3A0xe54e60156d95394!2sAnjana%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
```
</action>
<acceptance_criteria>
- Custom WhatsApp SVG button exists
- Google maps component is rendered using `iframe`
- Uses exact spacing tokens and components from Phase 1 global styles.
</acceptance_criteria>
</task>

<task id="01-04" title="Assemble Homepage Layout">
<read_first>
- app/page.tsx
</read_first>
<action>
Rewrite `app/page.tsx` to render all created components in order.

```tsx
import HeroSection from "@/components/home/HeroSection";
import StatCards from "@/components/home/StatCards";
import ServicePreviews from "@/components/home/ServicePreviews";
import Testimonials from "@/components/home/Testimonials";
import LocationCTA from "@/components/home/LocationCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatCards />
      <ServicePreviews />
      <Testimonials />
      <LocationCTA />
    </main>
  );
}
```
</action>
<acceptance_criteria>
- `app/page.tsx` assembles the components without `"use client"` directive.
</acceptance_criteria>
</task>
