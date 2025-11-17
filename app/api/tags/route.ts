import connectDB from "@/lib/mongodb"
import Post from "@/models/Post"
import { successResponse, handleApiError } from "@/lib/utils/api"

// GET /api/tags - Fetch all tags with post counts (public)
export async function GET() {
  try {
    await connectDB()

    // Aggregate tags from all published posts
    const tagStats = await Post.aggregate([
      { $match: { published: true } },
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
        },
      },
    ])

    return successResponse(tagStats)
  } catch (error) {
    return handleApiError(error)
  }
}
