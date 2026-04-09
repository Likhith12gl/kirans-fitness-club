/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  type: "blog" | "event";
  status: "draft" | "published";
  excerpt?: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, default: "" },
    type: { type: String, enum: ["blog", "event"], default: "blog" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    excerpt: { type: String },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
