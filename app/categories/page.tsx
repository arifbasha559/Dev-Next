import Link from "next/link"
import { Code, Brain, Server, Palette, Settings, Database } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "AI & ML",
    description: "Artificial Intelligence and Machine Learning insights",
    icon: Brain,
    count: 12,
    color: "from-blue-400 to-blue-600",
    slug: "ai-ml",
  },
  {
    name: "React",
    description: "React development tips, tricks, and best practices",
    icon: Code,
    count: 18,
    color: "from-purple-400 to-purple-600",
    slug: "react",
  },
  {
    name: "Backend",
    description: "Server-side development and architecture",
    icon: Server,
    count: 15,
    color: "from-teal-400 to-teal-600",
    slug: "backend",
  },
  {
    name: "Frontend",
    description: "Modern frontend development techniques",
    icon: Palette,
    count: 20,
    color: "from-green-400 to-green-600",
    slug: "frontend",
  },
  {
    name: "DevOps",
    description: "Development operations and deployment strategies",
    icon: Settings,
    count: 8,
    color: "from-orange-400 to-orange-600",
    slug: "devops",
  },
  {
    name: "Database",
    description: "Database design, optimization, and management",
    icon: Database,
    count: 10,
    color: "from-red-400 to-red-600",
    slug: "database",
  },
]

export default function CategoriesPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 gradient-text">Categories</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our content organized by technology and topic areas
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
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

                    <p className="text-gray-300 mb-4 leading-relaxed">{category.description}</p>

                    <div className="text-sm text-gray-400">
                      <span className="bg-gray-800/50 px-3 py-1 rounded-full">{category.count} articles</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Featured Categories Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-orbitron font-bold text-center mb-12 gradient-text">Most Popular</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.slice(0, 2).map((category) => {
              const Icon = category.icon
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
                          <p className="text-gray-300 mb-2">{category.description}</p>
                          <span className="text-sm text-gray-400">{category.count} articles available</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
