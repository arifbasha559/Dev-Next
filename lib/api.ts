import { NextResponse } from "next/server"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
  })
}

export function errorResponse(error: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status },
  )
}

export function handleApiError(error: any): NextResponse<ApiResponse> {
  console.error("API Error:", error)

  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err: any) => err.message)
    return errorResponse(`Validation Error: ${messages.join(", ")}`, 400)
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]
    return errorResponse(`${field} already exists`, 409)
  }

  return errorResponse("Internal Server Error", 500)
}

export function validateRequiredFields(data: any, requiredFields: string[]): string | null {
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === "string" && !data[field].trim())) {
      return `${field} is required`
    }
  }
  return null
}
