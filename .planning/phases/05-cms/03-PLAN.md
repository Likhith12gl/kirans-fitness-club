---
phase: 5
plan: 3
title: "Public Blog & Events Pages (ISR)"
wave: 3
depends_on: [1]
files_modified:
  - components/cms/PostCard.tsx
  - app/blog/page.tsx
  - app/blog/[slug]/page.tsx
  - app/events/page.tsx
  - app/events/[slug]/page.tsx
requirements: [CMS-05, CMS-06, CMS-07, CMS-08, CMS-09]
autonomous: true
---

# Plan 03: Public Blog & Events Pages (ISR)

## Objective
Build the public-facing endpoints aggregating the validated Post documents spanning Blog articles and Gym events. Utilize ISR `revalidate: 60` for caching scale while maintaining content parity with DB mutations alongside sanitizing raw HTML representations for XSS mitigation natively.

## Tasks

<task id="03-01" title="Create Shared PostCard Component">
<read_first>
- models/Post.ts
</read_first>
<action>
Create `components/cms/PostCard.tsx`. This component accepts `title`, `slug`, `excerpt`, `createdAt`, and `baseRoute` (either `/blog` or `/events`). Standard CSS cards leveraging `bg-black`, `border-border`, and formatting dates natively.
</action>
<acceptance_criteria>
- Component cleanly structures UI blocks for usage in mapping iteration.
</acceptance_criteria>
</task>

<task id="03-02" title="Implement /blog & /events Collection Screens">
<read_first>
- components/cms/PostCard.tsx
- lib/db.ts
- models/Post.ts
</read_first>
<action>
Create `app/blog/page.tsx`. Provide `export const revalidate = 60`. Execute standard `Post.find({ type: 'blog', status: 'published' }).sort({ createdAt: -1 })` mapped into arrays iterating `<PostCard>` configurations. Implement generic header text for "Fitness Insights".
Create `app/events/page.tsx`. Exact same construct isolating `type: 'event'`, changing aesthetics conceptually for "Gym Events & Competitions". 
</action>
<acceptance_criteria>
- Server actions bypass internal HTTP routing and request directly against Mongoose (avoiding cyclic fetching traps).
- ISR functions validate static page caching at 60s intervals appropriately.
</acceptance_criteria>
</task>

<task id="03-03" title="Implement /[slug] Detail Rendering & Sanitization">
<read_first>
- app/blog/page.tsx
- package.json
</read_first>
<action>
Create `app/blog/[slug]/page.tsx`. 
Create `app/events/[slug]/page.tsx`.

Fetch distinct document directly via `Post.findOne({ slug, status: 'published' })`. Redirect to `notFound()` securely upon null match. 

Use `isomorphic-dompurify` directly within the Server Component:
```tsx
import DOMPurify from 'isomorphic-dompurify';
// ...
const cleanHtml = DOMPurify.sanitize(post.content);
// ...
<div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: cleanHtml }} />
```

Generate `generateMetadata` utilizing Next.js specific bindings exposing proper page `<title>` mapped explicitly against `post.title`. For `events`, implement nested generic BlogPosting/Event JSON-LD block conditionally.
</action>
<acceptance_criteria>
- `dangerouslySetInnerHTML` binds ONLY against `isomorphic-dompurify` filtered strings explicitly isolating external vector XSS injections natively generated within quill outputs.
- Next Metadata updates contextually matching the dynamically retrieved documents.
</acceptance_criteria>
</task>
