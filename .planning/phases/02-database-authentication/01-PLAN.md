---
phase: 2
plan: 1
title: "Database Connection & User Model"
wave: 1
depends_on: []
files_modified:
  - lib/db.ts
  - models/User.ts
  - scripts/seed-admin.ts
  - package.json
requirements: [AUTH-06, AUTH-07]
autonomous: true
---

# Plan 01: Database Connection & User Model

## Objective

Set up the MongoDB connection using the Mongoose singleton pattern to prevent connection exhaustion on Vercel. Define the User schema with subscription details and role-based access. Create a seed script that uses bcryptjs to hash passwords and safely insert the first admin user.

## Must-Haves

- `lib/db.ts` uses Mongoose singleton cached connection.
- `models/User.ts` has necessary schema fields and uses `bcryptjs` (not the native bcrypt module) for password validation logic or pre-save hooks (if any, though direct bcrypt usage in NextAuth also works).
- `scripts/seed-admin.ts` can be run with ts-node to create the admin user.

## Tasks

<task id="01-01" title="Set up MongoDB singleton connection">
<read_first>
- .env.local
</read_first>
<action>
Create `lib/db.ts` to manage the MongoDB connection.

```typescript
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
```
</action>
<acceptance_criteria>
- `lib/db.ts` exports `dbConnect` function
- `lib/db.ts` checks for `global.mongoose` to cache connection
</acceptance_criteria>
</task>

<task id="01-02" title="Create User Mongoose Model">
<read_first>
- lib/db.ts
</read_first>
<action>
Create `models/User.ts` outlining the User schema.

```typescript
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  plan?: string;
  startDate?: Date;
  endDate?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false }, // Don't return password by default
    role: { type: String, enum: ["admin", "user"], default: "user" },
    plan: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
```
</action>
<acceptance_criteria>
- `models/User.ts` exports a Mongoose model
- Schema includes `name`, `email`, `password`, `role`, `plan`, `startDate`, `endDate`
- `role` has an enum array `["admin", "user"]`
</acceptance_criteria>
</task>

<task id="01-03" title="Create and configure admin seed script">
<read_first>
- models/User.ts
- package.json
</read_first>
<action>
Create `scripts/seed-admin.ts` to create the initial admin user using `bcryptjs` for hashing (12 rounds). Note that `ts-node` was installed in Phase 1 devDependencies.

Update `package.json` to add a new script: `"seed": "ts-node --project tsconfig.json scripts/seed-admin.ts"`

```typescript
// scripts/seed-admin.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import User from "../models/User";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI");
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const existingAdmin = await User.findOne({ email: "admin@kiransfitness.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 12);

    await User.create({
      name: "Super Admin",
      email: "admin@kiransfitness.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Active admin created successfully: admin@kiransfitness.com / Admin@123");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
```

Make sure that `dotenv` is installed as a devDependency to read the `.env.local` file when running via ts-node, but `dotenv/config` might fail if not installed. Let's add action to run `npm install -D dotenv`.
</action>
<acceptance_criteria>
- `package.json` scripts section contains `"seed"`
- `scripts/seed-admin.ts` uses `bcrypt.hash()` with 12 rounds
- `scripts/seed-admin.ts` creates user with `email: "admin@kiransfitness.com"` and `role: "admin"`
- `scripts/seed-admin.ts` imports `dotenv` and `bcryptjs`
</acceptance_criteria>
</task>

<task id="01-04" title="Install missing types and utilities for seed script">
<read_first>
- package.json
</read_first>
<action>
Run: `npm install -D dotenv`

This is needed because `ts-node` executed from package.json needs to read `.env.local`. Since `.env.local` isn't picked up automatically by `dotenv/config` (it looks for `.env`), update `scripts/seed-admin.ts` to explicitly load `.env.local` if needed, or we can just require `dotenv` and pass the path `dotenv.config({ path: '.env.local' });`

Edit `scripts/seed-admin.ts` explicitly:
Replace `import "dotenv/config";` with:
```typescript
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
```
</action>
<acceptance_criteria>
- `package.json` contains `dotenv` in devDependencies.
- `scripts/seed-admin.ts` contains `config({ path: ".env.local" })`
</acceptance_criteria>
</task>

## Verification

If we run `npm run seed` pointing to the dummy MongoDB cluster, it should output an auth attempt failure with mongoose. (Do not verify seed execution against dummy URI, just verify script compiles and runs).
