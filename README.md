# Kiran's Fitness Club - Gym Management Platform

A production-ready, full-stack gym management platform designed to serve as the operational hub and public presence for Kiran's Fitness Club in Bangalore. Featuring a completely custom Content Management System, real-time membership dashboards, and SEO-optimized programmatic location routing.

## 🚀 Live Features
- **Public Marketing Site:** Optimized homepage featuring Framer Motion hero animations and responsive utility-first layout constraints.
- **Member Dashboard:** Read-only portal dynamically computing exact remaining subscription days and warning users to renew natively via integrated WhatsApp URIs.
- **Custom React-Quill CMS:** Administrator backend mapping raw JSON outputs explicitly for Blog and Event articles utilizing `isomorphic-dompurify`.
- **Admin Control Panel:** Secured interface for managing registered gym members with mathematically precise chronological start/end date updates bypassing raw manual datetime inputs.
- **SEO Ready:** Native JSON-LD structured mappings alongside absolute meta generators caching pages across Incremental Static Regeneration (ISR) configurations.

## 🛠️ Technology Stack
- **Framework:** Next.js 14 App Router
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** NextAuth (Credentials Provider & JWT)
- **Styling:** Tailwind CSS + custom local variables
- **Content:** React-Quill (with dynamic SSR suppression)

---

## 💻 Running Locally from Scratch

Follow these steps exactly to run the robust development server natively on your machine:

### 1. Requirements
Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Git](https://git-scm.com/)
- A free [MongoDB Atlas](https://cloud.mongodb.com/) cluster

### 2. Clone repository & Install
```bash
git clone https://github.com/Likhith12gl/kirans-fitness-club.git
cd kirans-fitness-club
npm install
```

### 3. Setup Environment Variables
Create a file named `.env.local` inside the root folder, and paste the following parameters:

```env
# Change this URI to match your specific MongoDB Atlas connection string!
# Note: If your local network drops the connection, use the native legacy MongoDB connection strings bypassing DNS SRV records.
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.yourcluster.mongodb.net/fitness?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_any_secure_32_character_string_here_as_your_jwt_lock
```

### 4. Create the Admin Account (Seeding)
The platform is locked down aggressively behind Role-Based guards. To access `/admin`, you need the first administrator account! Run the seeding script once:
```bash
npx -y tsx scripts/seed-admin.ts
```

> **IMPORTANT:** If you encounter a `querySrv ECONNREFUSED` error during seeding, your local ISP/Network is blocking MongoDB's ports. Simply connect to a Mobile Hotspot temporarily, or manually insert the Admin JSON payload straight into your Atlas browser interface.

### 5. Launch the Server!
Run the development environment:
```bash
npm run dev
```

Open your browser to [http://localhost:3000](http://localhost:3000). To test the backend, navigate to `/login` and sign in utilizing:
- **Email:** `admin@kiransfitness.com`
- **Password:** `Admin@123`

---
*Developed meticulously for production environments.*
