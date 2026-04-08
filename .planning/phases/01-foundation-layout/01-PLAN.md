---
phase: 1
plan: 1
title: "Project Setup & Design System"
wave: 1
depends_on: []
files_modified:
  - package.json
  - tsconfig.json
  - tailwind.config.ts
  - postcss.config.js
  - next.config.js
  - app/globals.css
  - app/layout.tsx
  - app/page.tsx
  - .env.local
  - .gitignore
  - components/Providers.tsx
requirements: [FOUN-01, FOUN-02, FOUN-03, FOUN-04]
autonomous: true
---

# Plan 01: Project Setup & Design System

## Objective

Initialize Next.js 14 App Router project with TypeScript and Tailwind CSS. Apply the dark gym design system globally with #0f0f0f background and #f5c518 gold accents. Load Montserrat (headings) + Inter (body) via next/font/google. Create root layout with SessionProvider wrapper, analytics placeholder, and a minimal homepage placeholder.

## Must-Haves

- Next.js 14 app runs on localhost:3000 without errors
- Dark background (#0f0f0f) visible on page load
- Montserrat and Inter fonts load without layout shift
- .env.local created with dummy values and REPLACE comments
- .gitignore excludes node_modules, .next, .env*

## Tasks

<task id="01-01" title="Initialize Next.js 14 project">
<read_first>
- package.json (after creation)
</read_first>
<action>
Run: npx -y create-next-app@14 ./ --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm

This creates Next.js 14 with App Router, TypeScript, Tailwind CSS, and ESLint in the current directory.

After creation, install additional dependencies:
npm install next-auth@4 mongoose bcryptjs framer-motion react-quill lucide-react dompurify next-sitemap
npm install -D @types/bcryptjs @types/dompurify ts-node

Verify package.json has all dependencies listed.
</action>
<acceptance_criteria>
- package.json contains "next": with version starting with "14"
- package.json contains "next-auth", "mongoose", "bcryptjs", "framer-motion", "lucide-react"
- node_modules directory exists
- Running `npx next --version` outputs a 14.x version
</acceptance_criteria>
</task>

<task id="01-02" title="Configure Tailwind with dark gym design tokens">
<read_first>
- tailwind.config.ts
- .planning/phases/01-foundation-layout/01-UI-SPEC.md (Design System and Color sections)
</read_first>
<action>
Update tailwind.config.ts to extend the theme with the gym design tokens:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',
        surface: '#1a1a1a',
        'surface-alt': '#111111',
        accent: '#f5c518',
        'accent-hover': '#d4a812',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
        'text-muted': '#666666',
        border: 'rgba(255,255,255,0.08)',
        'border-hover': 'rgba(255,255,255,0.20)',
        destructive: '#ef4444',
        warning: '#eab308',
        success: '#22c55e',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
      },
    },
  },
  plugins: [],
}
export default config
```
</action>
<acceptance_criteria>
- tailwind.config.ts contains color "background" with value "#0f0f0f"
- tailwind.config.ts contains color "accent" with value "#f5c518"
- tailwind.config.ts contains fontFamily "heading" with "--font-montserrat"
- tailwind.config.ts contains fontFamily "body" with "--font-inter"
</acceptance_criteria>
</task>

<task id="01-03" title="Create globals.css with base styles">
<read_first>
- app/globals.css
- .planning/phases/01-foundation-layout/01-UI-SPEC.md (Color and Typography sections)
</read_first>
<action>
Replace app/globals.css with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-text-primary font-body;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }

  a {
    @apply text-text-secondary hover:text-white transition-colors duration-200;
  }
}

@layer components {
  .btn-primary {
    @apply bg-accent text-black font-semibold py-3 px-6 rounded-button hover:bg-accent-hover transition-all duration-200;
  }

  .btn-secondary {
    @apply border border-accent text-accent font-semibold py-3 px-6 rounded-button hover:bg-accent/10 transition-all duration-200;
  }

  .card {
    @apply bg-surface border border-border rounded-card p-4 hover:border-border-hover hover:scale-[1.02] transition-all duration-200;
  }

  .section-padding {
    @apply py-16 md:py-24 px-4 md:px-8;
  }

  .container-custom {
    @apply max-w-7xl mx-auto px-4 md:px-8;
  }
}
```
</action>
<acceptance_criteria>
- app/globals.css contains "@tailwind base"
- app/globals.css contains "bg-background"
- app/globals.css contains ".btn-primary"
- app/globals.css contains ".card"
</acceptance_criteria>
</task>

<task id="01-04" title="Create root layout with fonts and providers">
<read_first>
- app/layout.tsx
- .planning/phases/01-foundation-layout/01-UI-SPEC.md (Design System section)
</read_first>
<action>
Create components/Providers.tsx (client component for SessionProvider):

```tsx
"use client";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

Update app/layout.tsx:

```tsx
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Kiran's Fitness Club | Best Gym in Anjananagar, Bangalore",
    template: "%s | Kiran's Fitness Club",
  },
  description:
    "Kiran's Fitness Club — Anjananagar's most trusted fitness center. Expert trainers, modern equipment, and flexible plans near Magadi Main Road and Bath Road.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        {/* Google Analytics placeholder — replace GA_MEASUREMENT_ID with real ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```
</action>
<acceptance_criteria>
- app/layout.tsx contains "Montserrat" import from "next/font/google"
- app/layout.tsx contains "Inter" import from "next/font/google"
- app/layout.tsx contains "--font-montserrat"
- app/layout.tsx contains "SessionProvider" or "Providers"
- components/Providers.tsx contains "use client"
- components/Providers.tsx contains "SessionProvider"
</acceptance_criteria>
</task>

<task id="01-05" title="Create .env.local and next.config.js">
<read_first>
- next.config.js (or next.config.mjs after create-next-app)
</read_first>
<action>
Create .env.local:

```
# REPLACE WITH REAL VALUE - MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://dummyuser:dummypassword@cluster0.dummy.mongodb.net/kiransfitness?retryWrites=true&w=majority

# REPLACE WITH REAL VALUE - Run: openssl rand -base64 32
NEXTAUTH_SECRET=dummy_secret_replace_this_with_random_32char_string

# REPLACE WITH REAL VALUE - Your production domain
NEXTAUTH_URL=http://localhost:3000

# REPLACE WITH REAL VALUE - Your production domain
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Update next.config (use .mjs or .js based on what create-next-app generated):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
```

Ensure .gitignore includes: node_modules, .next, .env, .env.local, .env*.local
</action>
<acceptance_criteria>
- .env.local contains "MONGODB_URI="
- .env.local contains "NEXTAUTH_SECRET="
- .env.local contains "REPLACE WITH REAL VALUE" comments
- next.config file contains "images.unsplash.com" in remotePatterns
- .gitignore contains ".env.local"
</acceptance_criteria>
</task>

<task id="01-06" title="Create minimal homepage placeholder">
<read_first>
- app/page.tsx
</read_first>
<action>
Replace app/page.tsx with a minimal placeholder (hero will be added in Phase 3):

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
          Kiran&apos;s Fitness Club
        </h1>
        <p className="text-text-secondary text-lg">
          Anjananagar&apos;s Most Trusted Fitness Center
        </p>
      </div>
    </main>
  );
}
```
</action>
<acceptance_criteria>
- app/page.tsx contains "Kiran" 
- app/page.tsx contains "font-heading"
- app/page.tsx does NOT contain "use client" (server component)
</acceptance_criteria>
</task>

## Verification

```bash
npm run dev
# Verify: localhost:3000 shows dark background with gym name
# Verify: No console errors
# Verify: Montserrat and Inter fonts load (check DevTools > Network > Font)
```
