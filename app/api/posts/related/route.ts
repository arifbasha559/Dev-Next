import type { NextRequest } from "next/server"
import connectDB from "@/lib/mongodb"
import Post from "@/models/Post"
import { authenticateRequest, isAdmin } from "@/lib/auth"
import { successResponse, errorResponse, handleApiError, validateRequiredFields } from "@/lib/utils/api"



export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const limit = 5
    // Build query


    // Fetch posts
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(limit).lean()

    // Get total count
    const total = await posts.length

    return successResponse({
        total,
      posts
    })
  } catch (error) {
    return handleApiError(error)
  }
}
