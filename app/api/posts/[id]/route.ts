/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const idOrSlug = params.id;
    
    // Attempt lookup by ID first, then by strictly slug
    let post = null;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
        post = await Post.findById(idOrSlug);
    }
    
    if (!post) {
        post = await Post.findOne({ slug: idOrSlug });
    }

    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    console.error("GET /api/posts/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    
    const post = await Post.findByIdAndUpdate(params.id, body, { 
      new: true,
      runValidators: true 
    });

    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    
    return NextResponse.json(post);
  } catch (error: any) {
    console.error("PATCH /api/posts/[id] error:", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update post", message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const post = await Post.findByIdAndDelete(params.id);

    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/posts/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
