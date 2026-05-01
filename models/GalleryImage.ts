import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage extends Document {
  position: number;
  image: string;
  alt: string;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema: Schema = new Schema(
  {
    position: { type: Number, required: true, unique: true, min: 1, max: 10 },
    image: { type: String, required: true },
    alt: { type: String, default: "Gym photo at Kiran's Fitness Club" },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
