"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
          ? " backdrop-blur-xl  shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 ">
              <Bug className="text-glow  size-10 shadow-blue-500 text-white" />
            </div>
            <span className="font-orbitron text-xl font-bold gradient-text group-hover:text-glow transition-all duration-300">
              DevNext
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-all duration-300 relative group py-2 px-3 rounded-lg hover:bg-white/5"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></span>
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2 fade-in">
                  <Input
                    type="text"
                    placeholder="Search posts..."
                    className="w-64 absolute -bottom-16 right-0 bg-gray-900/70 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
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
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass backdrop-blur-xl rounded-xl mt-4 p-6 fade-in border border-white/10 shadow-2xl shadow-black/30">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 border border-transparent hover:border-white/10 stagger-fade`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

