import type { NextRequest } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { generateToken } from "@/lib/auth"
import { successResponse, errorResponse, handleApiError, validateRequiredFields } from "@/lib/utils/api"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { email, password, name } = body

    // Validate required fields
    const validationError = validateRequiredFields(body, ["email", "password", "name"])
    if (validationError) {
      return errorResponse(validationError, 400)
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return errorResponse("User already exists", 409)
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name,
      role: "user", // First user is admin, you can modify this logic
    })

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    return successResponse(
      {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      "Registration successful",
    )
  } catch (error) {
    return handleApiError(error)
  }
}
