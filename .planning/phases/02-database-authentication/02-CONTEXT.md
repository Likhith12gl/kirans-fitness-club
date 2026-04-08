# Phase 02: Database & Authentication - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning
**Source:** Smart Defaults (Fast-tracked via YOLO mode based on strict REQUIREMENTS.md)

<domain>
## Phase Boundary

Connect MongoDB Atlas, create User model, configure NextAuth.js credentials provider, build login page, set up middleware route protection.
(New capabilities like user profile pages or social logins belong in other phases. This is auth infrastructure and admin foundational access.)
</domain>

<decisions>
## Implementation Decisions

### Authentication Flow & Strategy
- **D-01:** **NextAuth.js v4:** Use `credentials` provider exclusively (as per constraints).
- **D-02:** **Session Strategy:** JWT strategy (no database sessions) stored in `httpOnly` secure cookies.
- **D-03:** **Password Hashing:** Use `bcryptjs` (not native `bcrypt` to prevent Vercel deployment issues).
- **D-04:** **Role-based Access:** Users have a `role` field (`admin` | `user`). NextAuth callbacks must inject this `role` and `id` into both the token and session object.

### Database Connection & Models
- **D-05:** **Connection Pattern:** Mongoose singleton pattern (to prevent connection exhaustion in serverless environments). Wait until `mongoose.connection.readyState` is 1 before querying.
- **D-06:** **User Schema:** Needs `name`, `email` (unique), `password` (hashed), `role` (enum, default 'user'), `subscription` details (plan type, end date).
- **D-07:** **Seeding:** A standalone, executable seed script (`scripts/seed-admin.ts`) to create the initial admin user with bcrypt.

### UI & UX (Login and Access)
- **D-08:** **Login Page:** Standard form at `/login`. Matches gym aesthetic (dark auth card, gold accent buttons). Shows error toast/message on invalid credentials.
- **D-09:** **Route Protection (Middleware):** Use Next.js `middleware.ts` with `next-auth/middleware`. Protect `/dashboard/*`, `/admin/*`, and API routes (`/api/admin/*`).
- **D-10:** **Redirection:** Unauthenticated users trying to access protected paths redirect to `/login`. Non-admins trying to access `/admin` redirect to `/dashboard` or `/login`.

### the agent's Discretion
- Validation logic for the login form (Zod could be utilized or just basic HTML5 + server checks).
- Exact database folder architecture inside `src/lib/` or `src/database/` (though Next.js App Router conventions suggest `lib/db.ts`).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Foundational Docs
- `.planning/REQUIREMENTS.md` — Requirement keys: `AUTH-01` to `AUTH-07` and `PITFALLS.md` (for Vercel connection/bcrypt issues).
- `.planning/phases/01-foundation-layout/01-UI-SPEC.md` — To ensure the Login page adheres perfectly to the gym design system created in Phase 1.
- `app/layout.tsx` + `components/Providers.tsx` — See the context of the already setup SessionProvider.
</canonical_refs>

<specifics>
## Specific Ideas
- Auth requires `NEXTAUTH_SECRET` and `NEXTAUTH_URL` environment variables which we added in Phase 1. 
- The middleware shouldn't protect public pages (`/`, `/services`, `/about`, `/contact`, `/blog`, `/login`).
</specifics>

<deferred>
## Deferred Ideas
- Social Logins (Google, Facebook) are explicitly out of scope for v1.
- User registration/signup pages (all members will be added explicitly by Admin in Phase 6 as per requirements).
</deferred>

---

*Phase: 02-database-authentication*
*Context gathered: 2026-04-09 via Smart Defaults / Express Path*
