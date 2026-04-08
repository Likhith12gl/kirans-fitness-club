---
phase: 5
plan: 1
title: "Mongoose Post Model & API Endpoints"
wave: 1
depends_on: []
files_modified:
  - models/Post.ts
  - app/api/posts/route.ts
  - app/api/posts/[id]/route.ts
requirements: [CMS-01, CMS-03]
autonomous: true
---

# Plan 01: Mongoose Post Model & API Endpoints

## Objective
Establish the foundational data structure for the Content Management System and expose standard CRUD actions via Next.js App Router API endpoints for the Admin interface to consume safely.

## Tasks

<task id="01-01" title="Create Post Mongoose Model">
<read_first>
- lib/db.ts
</read_first>
<action>
Create `models/Post.ts` containing the MongoDB Schema mapping.

```typescript
import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  type: "blog" | "event";
  status: "draft" | "published";
  excerpt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["blog", "event"], default: "blog" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    excerpt: { type: String },
  },
  { timestamps: true }
);

// Auto-generate slug if not provided or generating from title
PostSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
```
</action>
<acceptance_criteria>
- Schema supports exact CMS requirement definitions.
- `pre('validate')` string manipulation hook strictly generates unique URL-safe slugs.
</acceptance_criteria>
</task>

<task id="01-02" title="Create foundational /api/posts Endpoints">
<read_first>
- models/Post.ts
- lib/db.ts
- lib/auth.ts
</read_first>
<action>
Create `app/api/posts/route.ts` returning `GET` (fetch all Posts based on `{ searchParams: { type, status } }`) and `POST` (requires NextAuth server session parsing).
Create `app/api/posts/[id]/route.ts` returning `GET` (fetch single post by slug/id), `PATCH` (update status/content), and `DELETE` (explicit removals).

Both endpoints MUST import `getServerSession` and reject mutations if unauthorized, mimicking hard API security constraints.
</action>
<acceptance_criteria>
- Endpoints successfully return `200` JSON blocks mimicking document data models.
- Any `POST`, `PATCH`, or `DELETE` attempt returns `401 Unauthorized` automatically if the server session evaluates to null or unauthenticated.
</acceptance_criteria>
</task>
