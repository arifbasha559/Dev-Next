<h1 align="center">
 Dev-Next – Modern Full-Stack Blog Platform
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-EC4B37?&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18A6F9?&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-880000?&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-blue?" />
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?" />
  <img src="https://img.shields.io/badge/Version-1.0.0-brightgreen?" />
</p>




  <!-- GitHub Stats -->
  

<p align="center">
Dev-Next is a modern, full-stack blogging platform built using Next.js 14, TypeScript, TailwindCSS, and MongoDB.  
It includes a secure admin panel, dynamic post management, categories, tags, a fully responsive UI, and SEO-friendly blog pages.
<p>

---

## 🚀 **Features**

### 🖥 Frontend (Next.js 14)

- App Router architecture
- Fully responsive UI
- Beautiful, modern design with TailwindCSS
- SEO-optimized pages
- Dark mode support
- Rich blog UI with categories, tags & filters

### 🔐 Admin Panel

- JWT-based authentication
- Create, Update, Delete blog posts
- Manage categories & tags
- Image upload support
- Secure protected routes

### 🗄 Backend (API + Database)

- Next.js API routes
- MongoDB + Mongoose models
- Fully typed with TypeScript
- Input validation
- Error handling middleware

### ⚙️ Other Major Features

- Dynamic routing for posts
- Slug auto-generation
- Contact form endpoint
- Clean folder structure
- Production-ready environment handling

---

## 📦 **Tech Stack**

| Category   | Technology           |
| ---------- | -------------------- |
| Framework  | Next.js 14           |
| Language   | TypeScript           |
| Styling    | TailwindCSS          |
| Database   | MongoDB (Mongoose)   |
| Auth       | JSON Web Token (JWT) |
| Deployment | Vercel               |
| Icons      | Lucide Icons         |

---

## 🔧 **Installation & Setup**

### 1️⃣ Clone the repository

```sh
git clone https://github.com/arifbasha559/Dev-Next.git
cd Dev-Next
```

2️⃣ Install dependencies

(Recommended: pnpm)

```
pnpm install
```

---

### 3️⃣ Create .env file

Create a file named .env in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4️⃣ Run development server

```
pnpm dev
```

Your site will be available at:

```
http://localhost:3000
```

---

### 🔐 Admin Login

Create an admin using the API:

```
POST /api/auth/register
```

Request body:

```
{
  "name": "admin",
  "username": "admin124",
  "email": "admin@example.com",
  "role": "admin",
  "password": "yourpassword"
}
```

Login at:

```
/admin/login
```

---

### 🗃 Available API Routes

| Route                | Method   | Description             |
| -------------------- | -------- | ----------------------- |
| `/api/auth/login`    | POST     | Login user              |
| `/api/auth/register` | POST     | Create new admin        |
| `/api/posts`         | GET      | Fetch all posts         |
| `/api/posts`         | POST     | Create new post         |
| `/api/posts/[id]`    | PUT      | Update post             |
| `/api/posts/[id]`    | DELETE   | Delete post             |
| `/api/categories`    | GET/POST | Manage categories       |
| `/api/contact`       | POST     | Contact form submission |

---

### c🖊 Creating Posts

Posts support:

- Markdown

- Rich text

- Code blocks

- Tags

- Categories

- Hero image

A slug is automatically generated from the title.

---

### 🚀 Deployment (Vercel)

1. Push the repository to GitHub

2. Import it into Vercel

3. Add environment variables

4. Deploy

Next.js automatically optimizes the app for production.

---

### 📌 Future Enhancements

- Comment system

- Image hosting (Cloudinary / UploadThing)

- Notion-style editor (Editor.js / TipTap)

- Multi-admin roles

- Analytics dashboard

---

### ❤️ Contributing

Contributions are welcome!

## Fork the repo → create a branch → commit changes → submit a PR.

📄 License

This project is licensed under the MIT License.

---

<p align="center">Built with ❤️ by Arif</p>

