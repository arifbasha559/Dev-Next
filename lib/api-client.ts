const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "https://your-domain.vercel.app/api" : "http://localhost:3000/api"

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL

    // Get token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth-token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth-token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "An error occurred")
    }

    return data
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(email: string, password: string, name: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    })
  }

  // Posts endpoints
  async getPosts(params?: {
    page?: number
    limit?: number
    category?: string
    tag?: string
    search?: string
    published?: boolean
  }) {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request(`/posts${query ? `?${query}` : ""}`)
  }

  async getPost(id: string) {
    return this.request(`/posts/${id}`)
  }

  async createPost(postData: {
    title: string
    content: string
    excerpt: string
    category: string
    tags?: string[]
    image?: string
    published?: boolean
  }) {
    return this.request("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    })
  }

  async updatePost(
    id: string,
    postData: Partial<{
      title: string
      content: string
      excerpt: string
      category: string
      tags: string[]
      image: string
      published: boolean
    }>,
  ) {
    return this.request(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    })
  }

  async deletePost(id: string) {
    return this.request(`/posts/${id}`, {
      method: "DELETE",
    })
  }

  // Categories endpoints
  async getCategories() {
    return this.request("/categories")
  }

  async getCategory(id: string) {
    return this.request(`/categories/${id}`)
  }

  async createCategory(categoryData: {
    name: string
    description?: string
    color?: string
  }) {
    return this.request("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    })
  }

  async updateCategory(
    id: string,
    categoryData: Partial<{
      name: string
      description: string
      color: string
    }>,
  ) {
    return this.request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    })
  }

  async deleteCategory(id: string) {
    return this.request(`/categories/${id}`, {
      method: "DELETE",
    })
  }

  // Tags endpoints
  async getTags() {
    return this.request("/tags")
  }

  // Contact endpoints
  async submitContact(contactData: {
    name: string
    email: string
    subject: string
    message: string
  }) {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
    })
  }

  async getContacts(params?: {
    page?: number
    limit?: number
    status?: string
  }) {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request(`/contact${query ? `?${query}` : ""}`)
  }
}

export const apiClient = new ApiClient()
export default ApiClient
