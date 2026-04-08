---
phase: 6
plan: 1
title: "User Model Expansion & API Routes"
wave: 1
files_modified:
  - models/User.ts
  - app/api/users/route.ts
  - app/api/users/[id]/route.ts
  - app/api/dashboard/route.ts
requirements: [ADM-03, ADM-04, ADM-05, API-03, API-04, API-05]
autonomous: true
---

# Plan 01: User Model Expansion & API Routes

## Objective
The `User` Mongoose schema only accommodates raw authentication constraints currently. We must expand the model to support intrinsic gym subscription metadata (Plans and specific Chronometrics). Next, we construct the authenticated backend pipelines explicitly denying non-admin mutational capabilities natively.

## Tasks

<task id="01-01" title="Expand User Mongoose Model">
<read_first>
- models/User.ts
</read_first>
<action>
Modify `models/User.ts` appending the following attributes to the Schema constraint map:
- `plan`: Enum string targeting `["Monthly", "Quarterly", "Annual", "None"]`, default `"None"`.
- `startDate`: Contextual `Date` instance defaulting natively.
- `endDate`: Contextual `Date` instance defining exact expiration.

Ensure the `IPost` interface updates similarly extending the `Document`.
</action>
<acceptance_criteria>
- Schema correctly types TS inferences against the new subscription values without breaking existing DB parameters.
</acceptance_criteria>
</task>

<task id="01-02" title="Define User API Read/Write Index">
<read_first>
- app/api/users/route.ts
- lib/auth.ts
</read_first>
<action>
Create `app/api/users/route.ts`. Establish explicit `getServerSession` boundaries. 

Identify a `GET` protocol returning all `User` instances purely mapped where `.select('-password')` is executed explicitly minimizing data spillage natively. (Requirement API-03)

Identify a `POST` protocol resolving raw inputs parsing `name`, `email`, `password`, `plan`, and `days`. Synthesize the `days` computation server-side:
`startDate = new Date()`
`endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000)`
Hash the password identically using `bcryptjs` before native storage insertion.
</action>
<acceptance_criteria>
- `GET` requests never leak raw bcrypt string structures manually verifying `select` stripping.
- `POST` algorithms convert strict day numbers into accurate end timelines.
</acceptance_criteria>
</task>

<task id="01-03" title="Define Granular User ID Modification Endpoints">
<read_first>
- app/api/users/[id]/route.ts
</read_first>
<action>
Create `app/api/users/[id]/route.ts`. Verify Admin credentials natively.
Implement `PATCH`. Accepts explicit raw `endDate` and `plan` updates natively mapping via `.findByIdAndUpdate(params.id, body, {new: true})`.
Implement `DELETE`. Eliminates native Users checking confirmation vectors intrinsically executed via `findByIdAndDelete`.
</action>
<acceptance_criteria>
- CRUD capabilities secured flawlessly through middleware parameter validations.
</acceptance_criteria>
</task>

<task id="01-04" title="Define Member Dashboard Profile Accessor">
<read_first>
- app/api/dashboard/route.ts
</read_first>
<action>
Create `app/api/dashboard/route.ts`. 
Extracts explicit session credentials, resolving `User.findOne({ email: session.user.email }).select('-password')`. Resolves JSON exclusively targeted at the user currently accessing. (Requirement API-05).
</action>
<acceptance_criteria>
- Personal portal endpoints verify the raw individual token isolating data explicitly to the requesting entity without broad indexing access.
</acceptance_criteria>
</task>
