"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  Clock,
  Share2,
  ArrowLeft,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MdxRenderer from "@/components/MdxRenderer";

// Mock blog post data



export default function BlogPostPage({ params }: any) {
  const [blogPost, setBlogPost] = useState<any>([]);
  const [relatedPost, setRelatedPost] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchBlogPost = async () => {
      const id = await params.id;
      try {
        const response = await fetch("/api/posts/" + id);
        const data = await response.json();
        console.log("Fetched blog post data:", data);
        setBlogPost(data.data);
        setLoading(false);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        redirect("/blog");
      }
    };
    const fetchRelatedPosts = async () => { 
      try {
        const response = await fetch("/api/posts/related");
        const data = await response.json();
        console.log("Fetched related posts data:", data);
        setRelatedPost(data.data.posts);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };
    fetchRelatedPosts();

    fetchBlogPost();
  }, []);

  const param = useSearchParams();
  const from = param.get("from") || "/categories";
  return (
    <div className="py-24  max-w-4xl  mx-auto min-h-screen">
      {/* Back Button */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Button
          variant="ghost"
          asChild
          className="text-gray-400 hover:text-white"
        >
          <Link href={from}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="relative h-96 mb-8 group  overflow-hidden ">
            <Image
              src={blogPost.image || "/placeholder.svg"}
              alt={blogPost.title}
              fill
              loading="lazy"
              className="object-cover  bg-white z-10"
            />
          </div>

          <div className=" mx-auto ">
            {/* Article Header */}
            <div className="mb-8 fade-in">
              <Link href={`/categories/${blogPost.category}`}>
                <Badge className="bg-blue-900 text-white mb-4">
                  {blogPost.category}
                </Badge>
              </Link>

              <h1 className="text-3xl md:text-5xl font-orbitron font-bold mb-6 text-white leading-tight">
                {blogPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>
                    {new Date(blogPost.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>
                    {new Date(blogPost.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {blogPost.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-gray-600 hover:bg-purple-300/50 text-gray-300"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 group text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                >
                  <Heart className="w-4 h-4 mr-2 group-hover:fill-red-500 group-hover:text-red-500 " />
                  Like
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 group text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                >
                  <MessageCircle className="w-4 h-4 mr-2 group-hover:fill-blue-500 group-hover:text-blue-500" />
                  Comment
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 group text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2 group-hover:fill-green-500 group-hover:text-green-500" />
                  Share
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <MdxRenderer markdownContent={blogPost.content} />
            </div>

            {/* Related Posts */}
            <div className="border-t border-gray-800 pt-12">
              <h2 className="text-2xl font-orbitron font-bold mb-8 gradient-text">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPost.slice(0, 4).map((post:object) => (
                  post._id !== params.id && (
                    <Link key={post.id} href={{pathname:`/blog/${post._id}`, query: {from: `/blog/${params.id}` } }}>
                      <Card className="glass border-gray-800 hover-glow cursor-pointer group">
                        <div className="relative h-48">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                            {post.title}
                          </h3>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

