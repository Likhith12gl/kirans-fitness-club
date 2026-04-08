# Phase 6 Discussion: Admin Panel & Member Dashboard

## Overview
Phase 6 is solely focused on the authenticated internal tools. It encompasses two major areas separated by Role-Based Access Constraints:
1. **The Admin Panel (`/admin/*`)**: High-level statistical views mapping membership health and direct User CRUD mappings allowing manual membership manipulation.
2. **The Member Dashboard (`/dashboard/*`)**: Read-only user portal dictating current subscription health natively referencing the days remaining metric.

## Execution Constraints
- Note: Requirements **ADM-06** and **ADM-07** (Admin Posts list and create operations) were already completed proactively during Phase 5's CMS push. We will focus purely on `User` documents.
- Authentication checks globally utilize our established `getServerSession` mechanism natively bridging JWT boundaries.
- **Subscription Algorithm**: The requirement strictly dictates Admins inputting *Number of Days*, resolving Start/End explicit `Date` boundaries logically computed during POST patches. This avoids locale timezone collisions.

## Key Requirements Tracking
- **ADM-01**: Admin dashboard index layout featuring 3 root metrics (Total Users, Expiring < 7 days, Total Posts).
- **ADM-02** to **ADM-05**: User CRUD table interface within `/admin/users/page.tsx` mapping explicit state patches against `app/api/users` natively bypassing passwords.
- **DASH-01** to **DASH-06**: Mobile-responsive Member pane containing visually distinct "warning" algorithms resolving relative `Date` chronometric ranges directly pushing WhatsApp API redirect links.

## Autonomous Progression (YOLO)
With requirements cleanly documented and the native application structure solidifying, we will proceed autonomously into establishing the plan artifacts.

**Decision:** Generating Next Steps for `/gsd-plan-phase 6`.
