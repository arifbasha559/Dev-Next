"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Code,
  Coffee,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useEffect } from "react";

export default function AboutPage() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags");
        const data = await response.json();
        console.log("Fetched tags data:", data);
        setTags(data.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);
  const passions = [
    {
      icon: Code,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable, and efficient code that stands the test of time.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Exploring cutting-edge technologies and finding creative solutions to complex problems.",
    },
    {
      icon: Coffee,
      title: "Learning",
      description:
        "Continuously expanding knowledge and sharing insights with the developer community.",
    },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 gradient-text">
            About DevNext
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where technology meets tranquility, and complex concepts become
            clear
          </p>
        </div>

        {/* Author Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-white">
              Meet the Author
            </h2>
            <div className="space-y-4 text-justify text-gray-300 leading-relaxed">
              <p>
                Hi, I'm{" "}
                <span className="text-blue-400 font-semibold">Arif Basha</span>,
                a passionate software developer and technology enthusiast. I
                created DevNext as a space to share insights, tutorials, and
                thoughts about the ever-evolving world of technology.
              </p>
              <p>
                With years of experience in full-stack development, I've worked
                with startups and enterprises, building scalable applications
                and leading development teams. My journey spans across various
                technologies, from frontend frameworks to cloud architecture.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or writing about the
                latest trends in software development.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              >
                <Link href="https://github.com/ArifBasha559" target="_blank">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              >
                <Link
                  href="https://www.linkedin.com/in/arifbasha559"
                  target="_blank"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              >
                <Link href="https://X.com/arifbasha559" target="_blank">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Link>
              </Button>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative group">
              <div className="w-64 h-64 rounded-full overflow-hidden glass border-4 border-blue-500/30 group-hover:border-blue-500/60 transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/professional-developer-portrait.jpg"
                  alt="Arif Basha"
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <Card className="glass border-gray-800 mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-orbitron font-bold mb-4 gradient-text text-center">
              Mission Statement
            </h2>
            <p className="text-gray-300 text-center leading-relaxed text-lg">
              DevNext exists to bridge the gap between complex technology
              concepts and practical understanding. Our mission is to provide
              clear, actionable insights that help developers at all levels grow
              their skills and stay current with the rapidly evolving tech
              landscape.
            </p>
          </CardContent>
        </Card>

        {/* Skills */}
        {tags && (
          <div className="mb-16">
            <h2 className="text-3xl font-orbitron font-bold mb-8 text-center gradient-text"></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tags.map((tag, i) => (
                <Link key={i} href={`/categories/${tag.name}`}>
                  <Card key={i} className="glass border-gray-800 hover-glow">
                    <CardContent className="p-4 text-center">
                      <span className="text-white font-medium">{tag.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Passions */}
        <div className="mb-16">
          <h2 className="text-3xl font-orbitron font-bold mb-8 text-center gradient-text">
            What Drives Me
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {passions.map((passion) => {
              const Icon = passion.icon;
              return (
                <Card
                  key={passion.title}
                  className="glass border-gray-800 hover-glow text-center"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {passion.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {passion.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="glass border-gray-800 text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">
              Let's Connect
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Have questions, suggestions, or just want to chat about
              technology? I'd love to hear from you!
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Link href="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

