---
phase: 6
plan: 2
title: "Admin Dashboard & User Management Interface"
wave: 2
depends_on: [1]
files_modified:
  - app/admin/page.tsx
  - app/admin/users/page.tsx
  - app/admin/users/new/page.tsx
  - app/admin/users/[id]/edit/page.tsx
requirements: [ADM-01, ADM-02, ADM-03, ADM-04, ADM-05]
autonomous: true
---

# Plan 02: Admin Dashboard & User Interface

## Objective
Surface the structural user elements through visually distinct UI tables mapping React hook interactions across `lucide-react` aesthetics. Admin stat blocks dynamically populate based primarily on subscription evaluation queries directly executed via Next.js components.

## Tasks

<task id="02-01" title="Construct Unified Admin Stats Dashboard">
<read_first>
- app/admin/page.tsx
- models/User.ts
- models/Post.ts
</read_first>
<action>
Create `app/admin/page.tsx`. Build a secure Server Component rendering native stat blocks:
1. `User.countDocuments({ role: 'user' })`
2. `Post.countDocuments({ status: 'published' })`
3. `User.countDocuments({ endDate: { $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), $gt: new Date() } })` -> Captures users expiring within 7 days natively.

Map visual cards utilizing Tailwind layout grids featuring dynamic icon bindings natively rendering against standard UI configurations.
</action>
<acceptance_criteria>
- Admin index loads aggressively executing fast read streams without raw loop iterations natively capturing server-side calculations safely.
</acceptance_criteria>
</task>

<task id="02-02" title="Build Admin Users Table Listing">
<read_first>
- app/admin/users/page.tsx
</read_first>
<action>
Create `app/admin/users/page.tsx` as a Client Component utilizing state mapping `/api/users`.
Construct native table representations evaluating:
`const daysRemaining = Math.max(0, Math.ceil((new Date(user.endDate) - new Date()) / (1000 * 60 * 60 * 24)))`
Render contextual badge colors corresponding natively (Green > 7, Yellow <= 7, Red === 0).
Bind `lucide-react` Edit/Trash buttons executing native HTTP DELETE streams on confirmation prompts.
</action>
<acceptance_criteria>
- Table visualizes users fluidly displaying logic mapped conditional colors securely reflecting specific business logic expiration constraints.
</acceptance_criteria>
</task>

<task id="02-03" title="Implement User Generation Flow">
<read_first>
- app/admin/users/new/page.tsx
</read_first>
<action>
Create `app/admin/users/new/page.tsx`. Establish simple Tailwind forms natively capturing `Name`, `Email`, `Password`, `Plan` (dropdown), and `Days` (number). 
POST against `/api/users` redirecting aggressively back to root index strictly tracking creation sequences natively.
</action>
<acceptance_criteria>
- Creation structures seamlessly execute mathematical Date algorithms on the backend purely supplying simplistic numerical parameters frontend side globally avoiding locale complexities.
</acceptance_criteria>
</task>

<task id="02-04" title="Implement Raw User Modification Vectors">
<read_first>
- app/admin/users/[id]/edit/page.tsx
</read_first>
<action>
Create `app/admin/users/[id]/edit/page.tsx`. Pull relative user attributes selectively bypassing password strings. Provide raw html `<input type="date">` hooks specifically altering Start/End parameters intuitively binding patches safely against the distinct ID endpoints dynamically generating Next.js routing transitions.
</action>
<acceptance_criteria>
- Safe patches update subscription limits avoiding nested data manipulation corruptions dynamically.
</acceptance_criteria>
</task>
