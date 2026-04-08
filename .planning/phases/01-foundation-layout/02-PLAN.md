---
phase: 1
plan: 2
title: "Navbar & Footer Components"
wave: 1
depends_on: [1]
files_modified:
  - components/Navbar.tsx
  - components/Footer.tsx
  - app/layout.tsx
requirements: [FOUN-05, FOUN-06]
autonomous: true
---

# Plan 02: Navbar & Footer Components

## Objective

Build the shared Navbar (sticky, backdrop-blur on scroll, hamburger mobile menu, conditional auth links) and Footer (4-column layout with gym info, quick links, contact placeholders, social icons) components. Integrate both into the root layout so they wrap all pages.

## Must-Haves

- Navbar renders with logo text, page links, login button, hamburger on mobile
- Navbar sticks to top and shows backdrop-blur on scroll
- Footer renders with 4 columns on desktop, stacks on mobile
- Both components use design tokens from globals.css and tailwind.config.ts

## Tasks

<task id="02-01" title="Create Navbar component">
<read_first>
- .planning/phases/01-foundation-layout/01-UI-SPEC.md (Navbar section)
- components/Providers.tsx (understand providers structure)
</read_first>
<action>
Create components/Navbar.tsx as a client component (needs useState for mobile menu, useEffect for scroll, useSession for auth state):

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-heading font-semibold text-xl text-white hover:text-white">
          Kiran&apos;s Fitness Club
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-accent"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <>
              <Link
                href={session.user?.role === "admin" ? "/admin" : "/dashboard"}
                className="text-sm font-medium text-text-secondary hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="btn-secondary text-sm py-2 px-4"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary text-sm py-2 px-4">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-background ${
          mobileOpen ? "max-h-96 border-b border-border" : "max-h-0"
        }`}
      >
        <div className="container-custom py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium ${
                pathname === link.href
                  ? "text-accent"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <>
              <Link
                href={session.user?.role === "admin" ? "/admin" : "/dashboard"}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-text-secondary hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="btn-secondary text-sm py-2 px-4 w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="btn-primary text-sm py-2 px-4 w-fit"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
```

Note: The session.user?.role type will need NextAuth type augmentation — this will be done in Phase 2 (Auth). For now the component will work with basic session data.
</action>
<acceptance_criteria>
- components/Navbar.tsx contains "use client"
- components/Navbar.tsx contains "useSession"
- components/Navbar.tsx contains "backdrop-blur"
- components/Navbar.tsx contains "md:hidden" (mobile responsive)
- components/Navbar.tsx contains "Kiran"
- components/Navbar.tsx contains navLinks array with at least 6 entries
</acceptance_criteria>
</task>

<task id="02-02" title="Create Footer component">
<read_first>
- .planning/phases/01-foundation-layout/01-UI-SPEC.md (Footer section)
</read_first>
<action>
Create components/Footer.tsx as a server component (no client-side interactivity needed):

```tsx
import Link from "next/link";
import { Instagram, Youtube, Facebook, Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-white mb-2">
              Kiran&apos;s Fitness Club
            </h3>
            <p className="text-text-secondary text-sm">
              Transform your fitness journey. Anjananagar&apos;s most trusted fitness center.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-text-secondary text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>REPLACE WITH REAL ADDRESS, Anjananagar, Bangalore</span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary text-sm">
                <Phone size={16} className="shrink-0" />
                <span>+91 XXXXXXXXXX</span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary text-sm">
                <Mail size={16} className="shrink-0" />
                <span>info@kiransfitness.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-white mb-4 uppercase tracking-wider">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container-custom py-6">
          <p className="text-text-muted text-sm text-center">
            © {new Date().getFullYear()} Kiran&apos;s Fitness Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```
</action>
<acceptance_criteria>
- components/Footer.tsx does NOT contain "use client" (server component)
- components/Footer.tsx contains "Quick Links"
- components/Footer.tsx contains "Contact"
- components/Footer.tsx contains "Follow Us"
- components/Footer.tsx contains "lg:grid-cols-4" (4-column layout)
- components/Footer.tsx contains copyright text with "Kiran"
</acceptance_criteria>
</task>

<task id="02-03" title="Integrate Navbar and Footer into root layout">
<read_first>
- app/layout.tsx (current state from Plan 01)
- components/Navbar.tsx
- components/Footer.tsx
</read_first>
<action>
Update app/layout.tsx to import and render Navbar above {children} and Footer below {children}:

Add imports:
```tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
```

Update the body content to:
```tsx
<body className="antialiased">
  <Providers>
    <Navbar />
    <main className="pt-16">
      {children}
    </main>
    <Footer />
  </Providers>
</body>
```

The pt-16 on main accounts for the fixed navbar height (64px = 4rem = pt-16).
</action>
<acceptance_criteria>
- app/layout.tsx contains import for "Navbar"
- app/layout.tsx contains import for "Footer"
- app/layout.tsx contains "<Navbar />"
- app/layout.tsx contains "<Footer />"
- app/layout.tsx contains "pt-16" (navbar offset)
</acceptance_criteria>
</task>

## Verification

```bash
npm run dev
# Verify: Navbar visible at top with all links
# Verify: Footer visible at bottom with 4 columns on desktop
# Verify: Hamburger menu works on mobile viewport
# Verify: Navbar background changes on scroll
# Verify: Resize browser to < 768px — hamburger appears, nav links hide
```
