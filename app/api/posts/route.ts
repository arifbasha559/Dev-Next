import type { NextRequest } from "next/server"
import connectDB from "@/lib/mongodb"
import Post from "@/models/Post"
import { authenticateRequest, isAdmin } from "@/lib/auth"
import { successResponse, errorResponse, handleApiError, validateRequiredFields } from "@/lib/utils/api"

// GET /api/posts - Fetch all posts (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")
    const published = searchParams.get("published") !== "false"

    // Build query
    const query: any = {}

    if (published) {
      query.published = true
    }

    if (category) {
      query.category = category
    }

    if (tag) {
      query.tags = { $in: [tag] }
    }

    if (search) {
      query.$text = { $search: search }
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Fetch posts
    const posts = await Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

    // Get total count
    const total = await Post.countDocuments(query)

    return successResponse({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/posts - Create new post (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Authenticate user
    const user = await authenticateRequest(request)
    if (!user || !isAdmin(user)) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await request.json()
    const { title, content, excerpt, category, tags, image, published } = body

    // Validate required fields
    const validationError = validateRequiredFields(body, ["title", "content", "excerpt", "category"])
    if (validationError) {
      return errorResponse(validationError, 400)
    }

    // Create post
    const post = await Post.create({
      title,
      content,
      excerpt,
      category,
      tags: tags || [],
      image,
      published: published || false,
      author: "Arif Basha", // You can get this from user data
    })

    return successResponse(post, "Post created successfully")
  } catch (error) {
    return handleApiError(error)
  }
}
