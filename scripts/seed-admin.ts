import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User";

// Load .env.local because ts-node doesn't automatically load Next.js envs
dotenv.config({ path: ".env.local" });

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Missing MONGODB_URI in .env.local");
    process.exit(1);
  }

  try {
    const opts = { bufferCommands: false };
    await mongoose.connect(uri, opts);
    console.log("Connected to MongoDB via seed script");

    const existingAdmin = await User.findOne({ email: "admin@kiransfitness.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // AUTH-07: Passwords stored as bcrypt hashes (bcryptjs, 12 rounds)
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
