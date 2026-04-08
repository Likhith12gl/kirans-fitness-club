---
phase: 2
plan: 2
title: "NextAuth Configuration & Middleware"
wave: 2
depends_on: [1]
files_modified:
  - lib/auth.ts
  - app/api/auth/[...nextauth]/route.ts
  - app/login/page.tsx
  - middleware.ts
requirements: [AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05]
autonomous: true
---

# Plan 02: NextAuth Configuration & Middleware

## Objective

Set up NextAuth.js configured with a `credentials` provider, verifying against our MongoDB `User` model using `bcryptjs`. We will protect `/admin` and `/dashboard` using Next.js `middleware.ts`. Finally, build the `/login` page applying our custom dark gym aesthetic.

## Must-Haves

- NextAuth JWT strategy is used.
- Callbacks pass `role` into JWT and User session.
- Middleware properly restricts paths to authenticated users and role-checks for admin paths.
- Login screen utilizes React Hook Form or standard state with a polished, error-handled UI.

## Tasks

<task id="02-01" title="Configure NextAuth Options">
<read_first>
- models/User.ts
- lib/db.ts
</read_first>
<action>
Create `lib/auth.ts` to export NextAuth `authOptions`.
This needs exactly `credentials` provider, reading email/password, finding user in DB, and returning them.

```typescript
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./db";
import User from "../models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
         session.user.id = token.id as string;
         session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

Update `types/next-auth.d.ts` (create the file) to extend NextAuth types:
```typescript
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }
  interface Session {
    user: User & DefaultSession["user"];
  }
}
```
</action>
<acceptance_criteria>
- `lib/auth.ts` uses `CredentialsProvider`
- `lib/auth.ts` implements `jwt` and `session` callbacks passing the `role` field
- `types/next-auth.d.ts` extends User type to include `role`
</acceptance_criteria>
</task>

<task id="02-02" title="Create NextAuth Route Handler">
<read_first>
- lib/auth.ts
</read_first>
<action>
Create `app/api/auth/[...nextauth]/route.ts`.

```typescript
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```
</action>
<acceptance_criteria>
- `app/api/auth/[...nextauth]/route.ts` exports `GET` and `POST` utilizing `NextAuth(authOptions)`
</acceptance_criteria>
</task>

<task id="02-03" title="Create Login Page">
<read_first>
- app/globals.css
</read_first>
<action>
Create `app/login/page.tsx` styled to match the dark gym aesthetic.

```tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-md mx-auto p-8 border-border hover:border-border transition-all">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">Member Login</h2>
        <p className="text-text-secondary text-sm">Sign in to manage your fitness journey</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive text-sm rounded p-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface-alt border border-border rounded-button px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-alt border border-border rounded-button px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-6"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-text-secondary">
        <p>Return to <Link href="/" className="text-accent hover:text-white transition-colors">Homepage</Link></p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center section-padding pt-24 bg-background">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
         <LoginForm />
      </Suspense>
    </main>
  );
}
```
</action>
<acceptance_criteria>
- `app/login/page.tsx` utilizes NextAuth `signIn` with credentials
- Contains inputs for email and password properly styled with `.btn-primary` and `.bg-surface-alt`
- Displays dynamic error styling (`text-destructive`) if the signin fails
- Contains a Suspense boundary wrapping `LoginForm` since it uses `useSearchParams()`
</acceptance_criteria>
</task>

<task id="02-04" title="Create Middleware for Route Protection">
<read_first>
- next.config.mjs
</read_first>
<action>
Create `middleware.ts` in the root of the project to protect routes.

```typescript
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/response";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Admin role check
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Define paths that require authentication
        const isAuthRequired = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
        
        if (isAuthRequired) {
          return !!token;
        }

        // For paths that don't match the matcher explicitly, they are public
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Protect specific routes at Edge layer
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```
</action>
<acceptance_criteria>
- `middleware.ts` imports `withAuth` from `next-auth/middleware`
- Admin routes (`/admin`) explicitly check `token?.role !== "admin"` and redirect to `/dashboard`
- Matcher array protects `/dashboard/:path*` and `/admin/:path*`
</acceptance_criteria>
</task>

## Verification

Running `npm run dev` and trying to access `/dashboard` should redirect instantly to `/login`.
