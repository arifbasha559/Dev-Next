import type { NextRequest } from "next/server"
import connectDB from "@/lib/mongodb"
import Post from "@/models/Post"
import { authenticateRequest, isAdmin } from "@/lib/auth"
import { successResponse, errorResponse, handleApiError } from "@/lib/utils/api"

// GET /api/posts/[id] - Fetch single post (public)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { id } = params

    // Find post by ID or slug
    const post = await Post.findOne({
      $or: [{ _id: id }, { slug: id }],
    }).lean()

    if (!post) {
      return errorResponse("Post not found", 404)
    }

    // If post is not published, only admin can view
    if (!post.published) {
      const user = await authenticateRequest(request)
      if (!user || !isAdmin(user)) {
        return errorResponse("Post not found", 404)
      }
    }

    return successResponse(post)
  } catch (error) {
    return handleApiError(error)
  }
}

// PUT /api/posts/[id] - Update post (admin only)
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

    // Find and update post
    const post = await Post.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true },
    )

    if (!post) {
      return errorResponse("Post not found", 404)
    }

    return successResponse(post, "Post updated successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/posts/[id] - Delete post (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    // Authenticate user
    const user = await authenticateRequest(request)
    if (!user || !isAdmin(user)) {
      return errorResponse("Unauthorized", 401)
    }

    const { id } = params

    // Find and delete post
    const post = await Post.findByIdAndDelete(id)

    if (!post) {
      return errorResponse("Post not found", 404)
    }

    return successResponse(null, "Post deleted successfully")
  } catch (error) {
    return handleApiError(error)
  }
}
