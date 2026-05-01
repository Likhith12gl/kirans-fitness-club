/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import GalleryImage from "@/models/GalleryImage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Public — anyone can view gallery
export async function GET() {
  try {
    await dbConnect();
    const images = await GalleryImage.find({}).sort({ position: 1 }).lean();

    const safe = images.map((img: any) => ({
      _id: img._id.toString(),
      position: img.position,
      image: img.image,
      alt: img.alt,
    }));

    return NextResponse.json(safe);
  } catch (err) {
    console.error("GET /api/gallery error:", err);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

// Admin — upload or replace image at a position
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { position, image, alt } = body;

    if (!position || !image) {
      return NextResponse.json({ error: "Position and image are required" }, { status: 400 });
    }

    if (position < 1 || position > 10) {
      return NextResponse.json({ error: "Position must be between 1 and 10" }, { status: 400 });
    }

    // Upsert — replace if exists, create if not
    const result = await GalleryImage.findOneAndUpdate(
      { position },
      { position, image, alt: alt || "Gym photo at Kiran's Fitness Club" },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      _id: result._id.toString(),
      position: result.position,
      alt: result.alt,
    }, { status: 201 });
  } catch (err) {
    console.error("POST /api/gallery error:", err);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}

// Admin — delete image at a position
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const position = parseInt(searchParams.get("position") || "0");

    if (!position || position < 1 || position > 10) {
      return NextResponse.json({ error: "Valid position is required" }, { status: 400 });
    }

    const result = await GalleryImage.findOneAndDelete({ position });
    if (!result) {
      return NextResponse.json({ error: "No image at this position" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image deleted" });
  } catch (err) {
    console.error("DELETE /api/gallery error:", err);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
