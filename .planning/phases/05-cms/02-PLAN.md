---
phase: 5
plan: 2
title: "Admin CMS Interface"
wave: 2
depends_on: [1]
files_modified:
  - package.json
  - components/admin/QuillEditor.tsx
  - app/admin/posts/page.tsx
  - app/admin/posts/new/page.tsx
  - app/admin/posts/[id]/edit/page.tsx
requirements: [CMS-02, CMS-04]
autonomous: true
---

# Plan 02: Admin CMS Interface

## Objective
Build the private dashboard routes mapped locally under `/admin/posts` empowering fitness managers to create, edit, verify, and publish CMS data employing standard WYSIWYG technologies.

## Tasks

<task id="02-01" title="Install react-quill & isomorphic-dompurify">
<read_first>
- package.json
</read_first>
<action>
Execute `npm install react-quill isomorphic-dompurify`.
Execute `npm install -D @types/react-quill @types/dompurify`.
</action>
<acceptance_criteria>
- Libraries appended without collision factors.
</acceptance_criteria>
</task>

<task id="02-02" title="Construct Dynamic QuillEditor Component">
<read_first>
- components/admin/QuillEditor.tsx
</read_first>
<action>
Create `components/admin/QuillEditor.tsx`.
Since Next.js 14 server components clash heavily with `<Quill>` bindings, wrap `react-quill` cleanly in a Next.js dynamic package importer locking `ssr: false`.

```tsx
"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function QuillEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="bg-white text-black rounded-button overflow-hidden">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
}
```
</action>
<acceptance_criteria>
- The tool acts as a client wrapper exporting the classic rich text DOM module safely into layout topologies.
</acceptance_criteria>
</task>

<task id="02-03" title="Build Admin CRUD Interfacing">
<read_first>
- app/admin/posts/page.tsx
</read_first>
<action>
Implement `app/admin/posts/page.tsx`. This endpoint fetches API listings via `useEffect` mimicking standard react queries, rendering table lists mapping out (Title, Type, Status, Operations).
Implement `app/admin/posts/new/page.tsx`. Provide a form capturing `title`, `type` selection, `status` toggle, and passing `content` via the `<QuillEditor>` state binding. Mutates against `POST /api/posts`.
Implement `app/admin/posts/[id]/edit/page.tsx`. Mirrors the `/new` form but fetches via `[id]` mapping prepopulating properties. Mutates against `PATCH /api/posts/[id]`.
</action>
<acceptance_criteria>
- Functional data flows map React State bindings logically into Mongoose document structs traversing through API fetches seamlessly.
- Table listing correctly loops through generated documents mimicking functional CRUD control dashboards.
</acceptance_criteria>
</task>
