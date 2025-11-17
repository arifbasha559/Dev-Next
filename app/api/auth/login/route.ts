import type { NextRequest } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { generateToken } from "@/lib/auth"
import { successResponse, errorResponse, handleApiError, validateRequiredFields } from "@/lib/utils/api"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    const validationError = validateRequiredFields(body, ["email", "password"])
    if (validationError) {
      return errorResponse(validationError, 400)
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return errorResponse("Invalid credentials", 401)
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return errorResponse("Invalid credentials", 401)
    }

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
      "Login successful",
    )
  } catch (error) {
    return handleApiError(error)
  }
}
