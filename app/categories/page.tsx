"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);
  if (categories?.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-screen py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 gradient-text">
            Categories
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our content organized by technology and topic areas
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((category) => {
            const Icon = Icons[category.icon];
            return (
              <Link key={category.name} href={`/categories/${category.slug}`}>
                <Card className="glass border-gray-800 hover-glow cursor-pointer group h-full transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-2xl font-orbitron font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                      {category.name}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="text-sm text-gray-400">
                      <span className="bg-gray-800/50 px-3 py-1 rounded-full">
                        {category.count} articles
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Featured Categories Section */}
        <div className="mt-20">
          {categories && (
            <h2 className="text-3xl font-orbitron font-bold text-center mb-12 gradient-text">
              Most Popular
            </h2>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories?.slice(0, 2).map((category) => {
              const Icon = Icons[category.icon];
              return (
                <Link key={category.name} href={`/categories/${category.slug}`}>
                  <Card className="glass border-gray-800 hover-glow cursor-pointer group">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-6">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-orbitron font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                            {category.name}
                          </h3>
                          <p className="text-gray-300 mb-2">
                            {category.description}
                          </p>
                          <span className="text-sm text-gray-400">
                            {category.count} articles available
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

