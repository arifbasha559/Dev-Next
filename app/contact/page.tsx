"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)

    // Show success message (in a real app, you'd handle this properly)
    alert("Message sent successfully!")
  }

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/ArifBasha559",
      label: "GitHub",
      color: "hover:text-blue-400 hover:shadow-blue-400/20",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/arifbasha559",
      label: "LinkedIn",
      color: "hover:text-blue-500 hover:shadow-blue-500/20",
    },
    {
      icon: Twitter,
      href: "https://X.com/arifbasha559",
      label: "Twitter",
      color: "hover:text-blue-400 hover:shadow-blue-400/20",
    },
    {
      icon: Mail,
      href: "mailto:arifbasha559@gmail.com",
      label: "Email",
      color: "hover:text-purple-400 hover:shadow-purple-400/20",
    },
  ]

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 gradient-text">Get In Touch</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a question, suggestion, or just want to connect? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="glass border-gray-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">Send a Message</h2>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300 mb-2 block">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400 transition-all duration-300 ${
                        errors.name ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300 mb-2 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400 transition-all duration-300 ${
                        errors.email ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-300 mb-2 block">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400 transition-all duration-300 ${
                      errors.subject ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-300 mb-2 block">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400 transition-all duration-300 resize-none ${
                      errors.message ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="Tell me more about your thoughts, questions, or ideas..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-fit mx-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center ">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2 " />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="glass border-gray-800">
              <CardContent className="p-8">
                <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                      <Link
                        href="mailto:arifbasha559@gmail.com"
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                      >
                        arifbasha559@gmail.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Response Time</h3>
                      <p className="text-gray-300">Usually within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                      <p className="text-gray-300">Available for remote collaboration</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="glass border-gray-800">
              <CardContent className="p-8">
                <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">Connect on Social</h2>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <Link
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-3 p-4 glass rounded-lg ${social.color} transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
                      >
                        <Icon className="w-6 h-6 group-hover:animate-pulse" />
                        <span className="font-medium">{social.label}</span>
                      </Link>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-gray-900/30 rounded-lg border border-gray-700">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Follow me on social media for the latest updates, tech insights, and behind-the-scenes content from
                    DevNext.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="glass border-gray-800">
              <CardContent className="p-8">
                <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">Quick Questions</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Can you write about specific topics?</h3>
                    <p className="text-gray-300 text-sm">
                      I'm always open to suggestions for new articles and tutorials.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Do you offer consulting services?</h3>
                    <p className="text-gray-300 text-sm">
                      Yes, I'm available for technical consulting and code reviews. Let's discuss your needs!
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Can we collaborate on projects?</h3>
                    <p className="text-gray-300 text-sm">
                      I'm always interested in collaborating on interesting projects. Reach out with your ideas!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
