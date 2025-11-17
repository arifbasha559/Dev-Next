"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, Grid, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock blog posts data
const blogPosts = [
    {
        id: 1,
        title: "The Future of AI in Web Development",
        excerpt:
            "Exploring how artificial intelligence is revolutionizing the way we build and design websites, from automated code generation to intelligent user experiences.",
        image: "/ai-futuristic-city.png",
        author: "Arif Basha",
        date: "2024-01-15",
        category: "AI & ML",
        readTime: "5 min read",
    },
    {
        id: 2,
        title: "Mastering React Server Components",
        excerpt:
            "A comprehensive guide to React Server Components and how they're changing the frontend landscape with better performance and user experience.",
        image: "/react-code-snippet.png",
        author: "Arif Basha",
        date: "2024-01-12",
        category: "React",
        readTime: "8 min read",
    },
    {
        id: 3,
        title: "Building Scalable APIs with Node.js",
        excerpt:
            "Best practices for creating robust and scalable backend services using Node.js, including architecture patterns and performance optimization.",
        image: "/nodejs-api-development.png",
        author: "Arif Basha",
        date: "2024-01-10",
        category: "Backend",
        readTime: "12 min read",
    },
    {
        id: 4,
        title: "Modern CSS Techniques for 2024",
        excerpt:
            "Discover the latest CSS features and techniques that will make your web designs more efficient and visually stunning.",
        image: "/css-modern-design.png",
        author: "Arif Basha",
        date: "2024-01-08",
        category: "Frontend",
        readTime: "6 min read",
    },
    {
        id: 5,
        title: "DevOps Best Practices for Small Teams",
        excerpt:
            "How small development teams can implement effective DevOps practices without overwhelming complexity or resources.",
        image: "/devops-automation-tools.png",
        author: "Arif Basha",
        date: "2024-01-05",
        category: "DevOps",
        readTime: "10 min read",
    },
    {
        id: 6,
        title: "TypeScript Advanced Patterns",
        excerpt:
            "Deep dive into advanced TypeScript patterns and techniques that will make your code more type-safe and maintainable.",
        image: "/typescript-code-patterns.png",
        author: "Arif Basha",
        date: "2024-01-03",
        category: "TypeScript",
        readTime: "15 min read",
    },
]

const categories = ["All", "AI & ML", "React", "Backend", "Frontend", "DevOps", "TypeScript"]

export default function BlogPage({ params }) {
    const [viewMode, setViewMode] = useState("grid")
    const { id } = params;
    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 fade-in">
                    <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 gradient-text text-glow">Tech Blog - {id}</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Dive deep into the world of technology, programming, and digital innovation
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Filters and View Toggle */}
                <div className="flex flex-col lg:flex-row justify-end items-center mb-8 space-y-4 lg:space-y-0">
                    {/* Category Filters */}


                    {/* View Toggle */}
                    <div className="flex items-center space-x-2 glass rounded-lg p-1">
                        <Button
                            variant={viewMode === "grid" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("grid")}
                            className={viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
                        >
                            <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("list")}
                            className={viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Blog Posts */}
                <div
                    className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
                >
                    {blogPosts.map((post, index) => (
                        <Link key={post.id} href={{pathname:`/blog/${post.id}`, query: {from: `/categories/${id}` } }}>
                    <Card
                        className={`glass border-gray-800 hover-glow card-enhanced cursor-pointer group h-full transition-all duration-300 stagger-fade ${viewMode === "list" ? "md:flex md:flex-row" : ""
                            }`}
                    >
                        <div className={`relative overflow-hidden ${viewMode === "list" ? "md:w-1/3 h-48 md:h-auto" : "h-48"}`}>
                            <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className={`object-cover group-hover:scale-110 transition-transform duration-500 ${viewMode === "list" ? "md:rounded-l-lg md:rounded-r-none rounded-t-lg" : "rounded-t-lg"
                                    }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-blue-500  text-white shadow-lg">
                                    {id}
                                </Badge>
                            </div>
                        </div>
                        <CardContent
                            className={`p-6 flex flex-col justify-between relative ${viewMode === "list" ? "md:w-2/3" : ""}`}
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                                    <span className="flex items-center bg-gray-800/30 px-2 py-1 rounded-full">
                                        <User className="w-4 h-4 mr-1" />
                                        {post.author}
                                    </span>
                                    <span className="flex items-center bg-gray-800/30 px-2 py-1 rounded-full">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {post.date}
                                    </span>
                                    <span className="bg-gray-800/30 px-2 py-1 rounded-full">{post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">{post.excerpt}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
                    ))}
            </div>

            {/* Pagination */}

        </div>
        </div >
    )
}
