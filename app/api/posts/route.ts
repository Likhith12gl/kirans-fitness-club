/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Parse query params
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    
    const query: any = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const posts = await Post.find(query).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    // If no slug is aggressively provided, mongoose validation pre-hook tries to set it natively.
    // However, it's safer to attempt explicit fallback generation here.
    if (!body.slug && body.title) {
        body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/posts error:", error);
    
    if (error.code === 11000) {
      return NextResponse.json({ error: "A post with this title or slug already exists" }, { status: 400 });
    }
    
    return NextResponse.json({ error: "Failed to create post", message: error.message }, { status: 500 });
  }
}
