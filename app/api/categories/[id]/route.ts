import type { NextRequest } from "next/server"
import connectDB from "@/lib/mongodb"
import Category from "@/models/Category"
import Post from "@/models/Post"
import { authenticateRequest, isAdmin } from "@/lib/auth"
import { successResponse, errorResponse, handleApiError } from "@/lib/utils/api"

// GET /api/categories/[id] - Fetch single category (public)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { id } = params

    // Find category by ID or slug
    const category = await Category.findOne({
      $or: [{ _id: id }, { slug: id }],
    }).lean()

    if (!category) {
      return errorResponse("Category not found", 404)
    }

    // Get posts in this category
    const posts = await Post.find({
      category: category.name,
      published: true,
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    return successResponse({
      category,
      posts,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// PUT /api/categories/[id] - Update category (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    // Authenticate user
    const user = await authenticateRequest(request)
    if (!user || !isAdmin(user)) {
      return errorResponse("Unauthorized", 401)
    }

    const { id } = params
    const body = await request.json()

    // Find and update category
    const category = await Category.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true },
    )

    if (!category) {
      return errorResponse("Category not found", 404)
    }

    return successResponse(category, "Category updated successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/categories/[id] - Delete category (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    // Authenticate user
    const user = await authenticateRequest(request)
    if (!user || !isAdmin(user)) {
      return errorResponse("Unauthorized", 401)
    }

    const { id } = params

    // Check if category has posts
    const category = await Category.findById(id)
    if (!category) {
      return errorResponse("Category not found", 404)
    }

    const postCount = await Post.countDocuments({ category: category.name })
    if (postCount > 0) {
      return errorResponse("Cannot delete category with existing posts", 400)
    }

    // Delete category
    await Category.findByIdAndDelete(id)

    return successResponse(null, "Category deleted successfully")
  } catch (error) {
    return handleApiError(error)
  }
}
