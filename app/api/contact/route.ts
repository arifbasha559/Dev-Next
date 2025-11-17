import type { NextRequest } from "next/server"
import connectDB from "@/lib/mongodb"
import Contact from "@/models/Contact"
import { authenticateRequest, isAdmin } from "@/lib/auth"
import { successResponse, errorResponse, handleApiError, validateRequiredFields } from "@/lib/utils/api"

// GET /api/contact - Fetch all contact messages (admin only)
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Authenticate user
    const user = await authenticateRequest(request)
    if (!user || !isAdmin(user)) {
      return errorResponse("Unauthorized", 401)
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    // Build query
    const query: any = {}
    if (status) {
      query.status = status
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Fetch contacts
    const contacts = await Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

    // Get total count
    const total = await Contact.countDocuments(query)

    return successResponse({
      contacts,
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

// POST /api/contact - Submit contact form (public)
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    const validationError = validateRequiredFields(body, ["name", "email", "subject", "message"])
    if (validationError) {
      return errorResponse(validationError, 400)
    }

    // Create contact message
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    })

    return successResponse(contact, "Message sent successfully")
  } catch (error) {
    return handleApiError(error)
  }
}
