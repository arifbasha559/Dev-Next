"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const categories = [
  { name: "AI & ML", count: 12, color: "from-blue-400 to-blue-600" },
  { name: "React", count: 18, color: "from-purple-400 to-purple-600" },
  { name: "Backend", count: 15, color: "from-teal-400 to-teal-600" },
  { name: "DevOps", count: 8, color: "from-green-400 to-green-600" },
];

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const res = await fetch("/api/posts/related");
        const data = await res.json();
        setFeaturedPosts(data.data.posts);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeaturedPosts();
  }, []);
  return (
    <div className="pt-16">
      {/* --------------------------------------------------
        HERO SECTION
      -------------------------------------------------- */}
      <section className="text-center h-screen flex justify-center flex-col px-6 py-32 bg-gradient-to-b from-black to-gray-900">
        <h1 className="text-5xl md:text-7xl font-bold text-white">DevNext</h1>

        <p className="text-gray-300 text-lg md:text-2xl mt-4 max-w-2xl mx-auto">
          Where Technology Meets Tranquility. Explore the latest in tech,
          programming, and digital innovation.
        </p>

        <div className="flex justify-center gap-6 mt-8">
          <Button
            asChild
            className="px-6 glass hover-glow   py-3 rounded-xl text-lg"
          >
            <Link href="/blog">Explore Articles</Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="px-6 py-3 rounded-xl text-lg border-gray-600 text-gray-300"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* --------------------------------------------------
        CATEGORIES SECTION
      -------------------------------------------------- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Explore Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={"/categories/" + category.name.toLowerCase()}
            >
              <Card className="bg-white/5 border border-gray-800 hover:border-white/20 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl font-bold text-white`}
                  >
                    {category.name.charAt(0)}
                  </div>

                  <h3 className="text-xl text-white font-semibold mt-4">
                    {category.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {category.count} Articles
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------
        FEATURED ARTICLES
      -------------------------------------------------- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Featured Articles
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {featuredPosts.slice(0, 2).map((post) => (
            <Card
              key={post.id}
              className="bg-white/5 border border-gray-800 hover:border-white/20 transition-all"
            >
              <CardContent className="p-0">
                <div className="h-64 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" /> {post.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" /> {post.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 mb-4">{post.excerpt}</p>

                  <Button asChild className="rounded-xl">
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------
        LATEST POSTS GRID
      -------------------------------------------------- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Latest Posts
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.slice(2, 5).map((post) => (
            <Card
              key={post.id}
              className="bg-white/5 h-full border border-gray-800 hover:border-white/20 transition-all"
            >
              <CardContent className="p-0 h-full">
                <div className="h-48 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    className="object-cover rounded-t-xl"
                  />
                </div>

                <div className="p-5 flex flex-col h-[calc(100%-12rem)] ">
                  <p className="text-gray-400 text-sm mb-2">{post.date}</p>

                  <h3 className="text-xl text-white font-semibold mb-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 text-sm">{post.excerpt}</p>

                  <Link
                    href={{
                      pathname: `/blog/${post._id}`,
                      query: { from: `/` },
                    }}
                    className="inline-block mt-auto  text-blue-400 hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

