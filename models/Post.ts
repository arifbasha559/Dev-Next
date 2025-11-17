import mongoose, { type Document, Schema } from "mongoose";

export interface IPost extends Document {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  category: string;
  image?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [300, "Excerpt cannot be more than 300 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      default: "Arif Basha",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create slug from title before saving
PostSchema.pre("insertMany", function (next, docs) {
  docs.forEach((doc) => {
    doc.slug =
      doc.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .trim() +
      "-" +
      Math.random().toString(36).substring(2, 6);
  });
  next();
});

// Add text index for search functionality
PostSchema.index({ title: "text", content: "text", tags: "text" });

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema);

