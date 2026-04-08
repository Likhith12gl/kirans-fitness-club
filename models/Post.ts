/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Auto-generate slug if not provided or regenerating from title
PostSchema.pre("validate", function (this: any, next: any) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
