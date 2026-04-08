---
phase: 3
plan: 2
title: "Internal Pages (Services, About, Contact)"
wave: 2
depends_on: [1]
files_modified:
  - app/services/page.tsx
  - app/about/page.tsx
  - app/contact/page.tsx
requirements: [PUB-07, PUB-08, PUB-09]
autonomous: true
---

# Plan 02: Internal Pages (Services, About, Contact)

## Objective

Build the remaining static marketing pages for the gym website. Each page will feature unique non-duplicated marketing copy, and fully integrate Phase 1 aesthetics.

## Must-Haves

- `app/services/page.tsx`: Shows 3 detailed pricing plan cards (Monthly, Quarterly, Annual).
- `app/about/page.tsx`: Contains the Gym Story and hardcoded trainer team profiles with `next/image`.
- `app/contact/page.tsx`: Contains a functioning-looking Contact form simulating a success state entirely client side (with simple state), a Google map iframe, and a WhatsApp shortcut.

## Tasks

<task id="02-01" title="Build Services Data & Page">
<read_first>
- app/globals.css
</read_first>
<action>
Create `app/services/page.tsx`.

```tsx
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fitness Services & Pricing | Kiran's Fitness Club",
  description: "View our gym membership plans, personal training services, and group classes in Anjananagar.",
};

export default function ServicesPage() {
  const plans = [
    {
      name: "Monthly",
      price: "₹1,500",
      period: "/ month",
      popular: false,
      features: ["Full gym access", "Locker facility", "1 Group class/week", "General diet plan"],
    },
    {
      name: "Quarterly",
      price: "₹4,000",
      period: "/ 3 months",
      popular: true,
      features: ["Full gym access", "Locker facility", "Unlimited group classes", "Custom diet plan", "1 PT session/month"],
    },
    {
      name: "Annual",
      price: "₹12,000",
      period: "/ year",
      popular: false,
      features: ["Full gym access", "Premium locker", "Unlimited group classes", "Custom diet & workout plan", "4 PT sessions/month", "Free gym merchandise"],
    },
  ];

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Our <span className="text-accent">Memberships</span></h1>
          <p className="text-text-secondary text-lg">Choose a plan that fits your goals. No hidden fees, no complicated contracts. Just pure fitness.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {plans.map((plan, i) => (
            <div key={i} className={`card p-8 relative flex flex-col ${plan.popular ? 'border-accent shadow-[0_0_15px_rgba(245,197,24,0.15)]' : 'border-border'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-background font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl text-white font-heading font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-accent">{plan.price}</span>
                <span className="text-text-secondary">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={plan.popular ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}>
                Join Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
```
</action>
<acceptance_criteria>
- The page renders three distinct membership plans mimicking standard pricing tiers.
- Highlighting for a "popular" option exists.
- Has explicit `<title>` and metadata for SEO.
</acceptance_criteria>
</task>

<task id="02-02" title="Build About Page & Team Profiles">
<read_first>
- app/globals.css
</read_first>
<action>
Create `app/about/page.tsx`.

```tsx
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Kiran's Fitness Club",
  description: "Learn about our mission, our story, and meet the expert trainers at Kiran's Fitness Club.",
};

export default function AboutPage() {
  const trainers = [
    { name: "Kiran Kumar", role: "Head Coach & Founder", exp: "15+ Years", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop" },
    { name: "Anita S.", role: "CrossFit Specialist", exp: "8 Years", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2000&auto=format&fit=crop" },
    { name: "Vikram M.", role: "Strength & Conditioning", exp: "6 Years", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" },
  ];

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[500px] rounded-button overflow-hidden border border-border">
            <Image 
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" 
              alt="Gym floor" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Our <span className="text-accent">Story</span></h1>
            <div className="space-y-4 text-text-secondary text-lg">
              <p>Founded in 2014, Kiran's Fitness Club started with a simple mission: to bring professional, elite-level fitness infrastructure to Anjananagar.</p>
              <p>We realized that local residents were traveling miles just to access quality equipment and knowledgeable trainers. We changed that by building a 4000+ sqft sanctuary for fitness enthusiasts right here in the neighborhood.</p>
              <p>Today, with over 500 active members, we're more than just a gym. We're a community of individuals dedicated to pushing their limits and transforming their lives.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 uppercase">Meet The <span className="text-accent">Experts</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Certified professionals dedicated to your success.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((trainer, i) => (
            <div key={i} className="card overflow-hidden group">
              <div className="relative h-80 w-full overflow-hidden">
                <Image 
                  src={trainer.img} 
                  alt={trainer.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl text-white font-bold mb-1">{trainer.name}</h3>
                <p className="text-accent font-medium mb-3">{trainer.role}</p>
                <p className="text-text-secondary text-sm">Experience: {trainer.exp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
```
</action>
<acceptance_criteria>
- Story mapping with relevant dummy images
- 3 Trainer profiles included in the layout
- Images use Next.js `next/image` component correctly
</acceptance_criteria>
</task>

<task id="02-03" title="Build Contact Page client-form">
<read_first>
- app/globals.css
</read_first>
<action>
Create `app/contact/page.tsx` utilizing `"use client"` just for the form handling state.

```tsx
"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Get In <span className="text-accent">Touch</span></h1>
          <p className="text-text-secondary text-lg">Have questions about our memberships or facility? Drop us a line or visit us directly.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="card p-8">
              <h3 className="text-2xl text-white font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex shrink-0 items-center justify-center text-accent">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Gym Location</h4>
                    <p className="text-text-secondary">#123, Magadi Main Road, Anjananagar<br/>Bangalore, Karnataka 560091</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex shrink-0 items-center justify-center text-accent">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Phone / WhatsApp</h4>
                    <p className="text-text-secondary">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex shrink-0 items-center justify-center text-accent">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Email</h4>
                    <p className="text-text-secondary">contact@kiransfitness.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex shrink-0 items-center justify-center text-accent">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Opening Hours</h4>
                    <p className="text-text-secondary">Mon-Sat: 5:30 AM - 10:00 PM<br/>Sunday: 6:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <h3 className="text-2xl text-white font-bold mb-6">Send a Message</h3>
            
            {status === "success" && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-button mb-6">
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">First Name</label>
                  <input type="text" required className="w-full bg-surface-alt border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Last Name</label>
                  <input type="text" required className="w-full bg-surface-alt border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Phone Number</label>
                <input type="tel" required className="w-full bg-surface-alt border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="+91 90000 00000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Message</label>
                <textarea required rows={4} className="w-full bg-surface-alt border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" disabled={status === "loading"} className="btn-primary w-full mt-4 py-3">
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
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
    </main>
  );
}
```
</action>
<acceptance_criteria>
- Contact form validates fields without a dedicated generic Toast provider.
- Utilizes `<main>` container properly, spacing tokens aligned.
</acceptance_criteria>
</task>
