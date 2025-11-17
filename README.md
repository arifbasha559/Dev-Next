# DevNext Blog - Full Stack Next.js Application

A modern, dark-themed tech blog built with Next.js 14, MongoDB, and JWT authentication.

## Features

- 🎨 Modern dark theme with neon accents and glassmorphism effects
- 📝 Full blog management system with CRUD operations
- 🔐 JWT-based authentication for admin users
- 📱 Fully responsive design
- 🔍 Search and filtering functionality
- 📊 Categories and tags management
- 📧 Contact form with database storage
- 🚀 Optimized for Vercel deployment

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/DevNext-blog.git
cd DevNext-blog
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your values:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/techzen-blog
JWT_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
\`\`\`

4. Seed the database (optional):
\`\`\`bash
npm run seed
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration

### Posts
- `GET /api/posts` - Get all posts (with pagination, filtering)
- `GET /api/posts/[id]` - Get single post
- `POST /api/posts` - Create new post (admin only)
- `PUT /api/posts/[id]` - Update post (admin only)
- `DELETE /api/posts/[id]` - Delete post (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/[id]` - Get single category with posts
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/[id]` - Update category (admin only)
- `DELETE /api/categories/[id]` - Delete category (admin only)

### Tags
- `GET /api/tags` - Get all tags with post counts

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact messages (admin only)

## API Usage Examples

### Authentication
\`\`\`javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@techzen.com',
    password: 'admin123'
  })
})

const { data } = await response.json()
const { token, user } = data
\`\`\`

### Creating a Post
\`\`\`javascript
const response = await fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My New Post',
    content: '# Hello World\n\nThis is my post content.',
    excerpt: 'A brief description of the post',
    category: 'React',
    tags: ['react', 'javascript'],
    published: true
  })
})
\`\`\`

### Fetching Posts
\`\`\`javascript
// Get all published posts
const response = await fetch('/api/posts?published=true&page=1&limit=10')
const { data } = await response.json()
const { posts, pagination } = data

// Search posts
const searchResponse = await fetch('/api/posts?search=react&category=Frontend')
\`\`\`

### Contact Form Submission
\`\`\`javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Question about your blog',
    message: 'I have a question...'
  })
})
\`\`\`

## Database Schema

### Post Model
\`\`\`typescript
{
  title: string (required)
  slug: string (auto-generated, unique)
  content: string (required, Markdown)
  excerpt: string (required)
  author: string (default: 'Arif Basha')
  tags: string[]
  category: string (required)
  image?: string
  published: boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Category Model
\`\`\`typescript
{
  name: string (required, unique)
  slug: string (auto-generated)
  description?: string
  color: string (default: 'from-blue-400 to-blue-600')
  postCount: number (auto-calculated)
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### User Model
\`\`\`typescript
{
  email: string (required, unique)
  password: string (required, hashed)
  name: string (required)
  role: 'admin' | 'user' (default: 'user')
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Contact Model
\`\`\`typescript
{
  name: string (required)
  email: string (required)
  subject: string (required)
  message: string (required)
  status: 'unread' | 'read' | 'replied' (default: 'unread')
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techzen-blog
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-production-nextauth-secret
\`\`\`

## Default Admin Credentials

After running the seed script:
- **Email**: admin@techzen.com
- **Password**: admin123

⚠️ **Important**: Change these credentials in production!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email arifbasha559@gmail.com or create an issue on GitHub.
