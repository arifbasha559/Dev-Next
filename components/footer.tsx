import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/ArifBasha559",
      label: "GitHub",
      color: "hover:text-blue-400",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/arifbasha559",
      label: "LinkedIn",
      color: "hover:text-blue-500",
    },
    {
      icon: Twitter,
      href: "https://X.com/arifbasha559",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      href: "mailto:arifbasha559@gmail.com",
      label: "Email",
      color: "hover:text-purple-400",
    },
  ]

  return (
    <footer className="glass backdrop-blur-xl border-t border-gray-800/50 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-purple-900/5 to-teal-900/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">TZ</span>
              </div>
              <span className="font-orbitron text-xl font-bold gradient-text">DevNext</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              Exploring the intersection of technology, innovation, and digital transformation in the modern world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Home
              </Link>
              <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Blog
              </Link>
              <Link
                href="/categories"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                Categories
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                About
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 glass rounded-xl ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-current/20 group relative overflow-hidden stagger-fade`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-current/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Icon className="w-5 h-5 group-hover:animate-pulse relative z-10" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800/50 mt-8 py-4 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
          <p className="text-gray-400 text-sm relative z-10">© Arif - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
