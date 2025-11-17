import type { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Post from "@/models/Post";
import { authenticateRequest, isAdmin } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  handleApiError,
  validateRequiredFields,
} from "@/lib/utils/api";

// GET /api/categories - Fetch all categories (public)
export async function GET() {
  try {
    await connectDB();

    // Fetch categories and update post counts
    const categories = await Category.find().sort({ name: 1 }).lean();

    // Update post counts for each category
    for (const category of categories) {
      const postCount = await Post.countDocuments({
        category: category.name,
        published: true,
      });

      if (category.postCount !== postCount) {
        await Category.findByIdAndUpdate(category._id, { postCount });
        category.postCount = postCount;
      }
    }

    return successResponse(categories);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/categories - Create new category (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate user
    const user = await authenticateRequest(request);
    if (!user || !isAdmin(user)) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await request.json();
    const { name, description, color,slug } = body;

    // Validate required fields
    const validationError = validateRequiredFields(body, ["name"]);
    if (validationError) {

      return errorResponse(validationError, 400);
    }

    // Create category
    const category = await Category.create({
      name,
      description,
      color: color || "from-blue-400 to-blue-600",
      slug,
    });

    return successResponse(category, "Category created successfully");
  } catch (error) {
      console.log("asdad");

    return handleApiError(error);
  }
}

