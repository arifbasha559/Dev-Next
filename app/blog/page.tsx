"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Grid, List, Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { use } from "react";

// Mock blog posts data

const categories = [
  "All",
  "AI & ML",
  "React",
  "Backend",
  "Frontend",
  "DevOps",
  "TypeScript",
];

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const postsPerPage = 9;
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(
          `/api/posts?page=${currentPage}&limit=${postsPerPage}`
        );
        const data = await res.json();
        console.log(data?.data.pagination.pages);
        setBlogPosts(data?.data.posts);
        setTotalPages(data?.data.pagination.pages);
      } catch (error) {
        console.log(error);
      }
    };

    fetching();
  }, [currentPage]);

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts?.filter((post) => post.category === selectedCategory);

  let currentPosts = filteredPosts;
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setSearchResults(
        blogPosts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      // show normal posts fetched from server
      setSearchResults(blogPosts);
    }
    currentPosts = searchQuery.trim() ? searchResults : filteredPosts;
  }, [searchQuery, blogPosts]);
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 gradient-text text-glow">
            Tech Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dive deep into the world of technology, programming, and digital
            innovation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Filter className="w-4 h-4 mr-1" />
                {category}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            {isSearchOpen ? (
              <div className="flex items-center space-x-2 fade-in">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Search posts..."
                  className="w-64 bg-gray-900/70 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300 hover:scale-110"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}
            <div className="flex items-center space-x-2 glass rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {(searchQuery.trim() !== "" ? searchResults : currentPosts)?.map(
            (post, index) => (
              <Link
                key={post._id}
                href={{
                  pathname: `/blog/${post._id}`,
                  query: { from: `/blog` },
                }}
              >
                <Card
                  className={`glass border-gray-800 hover-glow card-enhanced cursor-pointer group h-full transition-all duration-300 stagger-fade ${
                    viewMode === "list" ? "md:flex md:flex-row" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list" ? "md:w-1/3 h-48 md:h-auto" : "h-48"
                    }`}
                  >
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                        viewMode === "list"
                          ? "md:rounded-l-lg md:rounded-r-none rounded-t-lg"
                          : "rounded-t-lg"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent
                    className={`p-6 flex flex-col justify-between relative ${
                      viewMode === "list" ? "md:w-2/3" : ""
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                        <span className="flex items-center bg-gray-800/30 px-2 py-1 rounded-full">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </span>
                        <span className="flex items-center bg-gray-800/30 px-2 py-1 rounded-full">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span className="bg-gray-800/30 px-2 py-1 rounded-full">
                          {new Date(post.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          )}
          {searchQuery.trim() !== "" && searchResults.length === 0 && (
            <div className="text-white text-center py-8">
              No results found for &quot;{searchQuery}&quot;
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center  space-x-2 mt-12">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

