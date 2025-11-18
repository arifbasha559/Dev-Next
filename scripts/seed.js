import mongoose from "mongoose"
import User from "../models/User.ts"
import Category from "../models/Category.ts"
import Post from "../models/Post.ts"

async function seedDatabase() {
  try {
    await mongoose.connect("mongodb+srv://Arif9087:Arif%409087@cluster0.bfhwfuz.mongodb.net/devnext?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Category.deleteMany({})
    // await Post.deleteMany({})
    console.log("Cleared existing data")

    // Create admin user
    const adminUser = await User.create({
      email: "admin@techzen.com",
      password: "admin123",
      name: "Arif Basha",
      username: "arif@123",
      role: "admin",
    })
    console.log("Created admin user")

    // Create categories
    const categories = [
      {
        name: "AI & ML",
        slug: "AI & ML",
        description: "Artificial Intelligence and Machine Learning insights",
        color: "from-blue-400 to-blue-600",
      },
      {
        name: "React",
        slug: "React",
        description: "React development tips, tricks, and best practices",
        color: "from-purple-400 to-purple-600",
      },
      {
        name: "Backend",
        slug: "Backend",
        description: "Server-side development and architecture",
        color: "from-teal-400 to-teal-600",
      },
      {
        name: "Frontend",
        slug: "Frontend",
        description: "Modern frontend development techniques",
        color: "from-green-400 to-green-600",
      },
      {
        name: "DevOps",
        slug: "DevOps",
        description: "Development operations and deployment strategies",
        color: "from-orange-400 to-orange-600",
      },
    ]

    const createdCategories = await Category.insertMany(categories)
    console.log("Created categories")

    // Create sample posts
  const posts = [
      {
        title: "The Future of AI in Web Development",
        content: `# The Future of AI in Web Development

Artificial Intelligence is rapidly transforming the landscape of web development, bringing unprecedented capabilities and efficiencies to developers worldwide. As we stand on the brink of a new era, it's crucial to understand how AI is reshaping the way we build, design, and maintain web applications.

## The Current State of AI in Web Development

Today's AI tools are already making significant impacts across various aspects of web development. From automated code generation to intelligent debugging, developers are experiencing a paradigm shift in their daily workflows.

### Code Generation and Assistance

AI-powered code assistants like GitHub Copilot and ChatGPT have revolutionized how developers write code. These tools can generate entire functions, suggest optimizations, and even help with complex algorithmic problems.

> "AI is not replacing developers; it's amplifying their capabilities and allowing them to focus on higher-level problem-solving and creative solutions."

### Design and User Experience

AI is also transforming web design through automated layout generation, color scheme suggestions, and user experience optimization based on behavioral data analysis.

## Looking Ahead: The Future Possibilities

As AI technology continues to evolve, we can expect even more revolutionary changes in web development. Machine learning algorithms will become more sophisticated, enabling more intuitive and personalized web experiences.

### Automation & Dev Tools

More tasks like optimization, deployment, and debugging will be fully automated by AI-driven platforms.

### Personalized User Experiences

AI will create real-time dynamic interfaces that automatically adapt to user behavior patterns.

---

## Conclusion

AI is not just a trend—it's the next evolution of web development.`,
        excerpt:
          "Exploring how artificial intelligence is revolutionizing the way we build and design websites, from automated code generation to intelligent user experiences.",
        category: "AI & ML",
        tags: ["AI", "Web Development", "Machine Learning", "Future Tech"],
        image: "/ai-futuristic-city.png",
        published: true,
        author: "Arif Basha",
      },

      {
        title: "Mastering React Server Components",
        content: `# Mastering React Server Components

React Server Components represent a paradigm shift in how we think about React applications. They allow us to render components on the server, reducing the JavaScript bundle size and improving performance.

## What are Server Components?

Server Components are React components that render on the server. Unlike traditional React components that run in the browser, Server Components execute on the server and send the rendered output to the client.

## Benefits of Server Components

- **Reduced Bundle Size**: Server Components don't add to your JavaScript bundle  
- **Better Performance**: Faster initial page loads  
- **Direct Database Access**: Use database/API directly without exposing credentials  
- **SEO Friendly**: Better indexing and improved Lighthouse scores  

## Example

\`\`\`jsx
async function BlogPost({ id }) {
  const post = await fetchPost(id)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
\`\`\`

## Best Practices

1. Keep Server Components stateless  
2. Use Client Components only for interactivity  
3. Avoid unnecessary re-renders  
4. Use Suspense boundaries for streaming UI  

---

## Conclusion

React Server Components are the future of performance-focused React apps.`,
        excerpt:
          "A comprehensive guide to React Server Components and how they're changing the frontend landscape with better performance and user experience.",
        category: "React",
        tags: ["React", "Server Components", "Performance", "Next.js"],
        image: "/react-code-snippet.png",
        published: true,
        author: "Arif Basha",
      },

      {
        title: "Building Scalable APIs with Node.js",
        content: `# Building Scalable APIs with Node.js

Creating scalable APIs is crucial for modern web applications. Node.js provides excellent tools and patterns for building APIs that can handle high traffic and complex business logic.

## Architecture Patterns

### 1. MVC Pattern
Separates business logic, UI, and data handling.

### 2. Microservices
Each service focuses on a single responsibility, improving scalability.

## Performance Optimization

- **Caching** (Redis, in-memory, CDNs)  
- **Database Indexing** (MongoDB indexes, query optimization)  
- **Load Balancing**  
- **Node Clustering**  
- **Connection Pooling**  

## Security Best Practices

1. Input validation  
2. Sanitization  
3. JWT authentication  
4. HTTPS  
5. Rate limiting (e.g., express-rate-limit)  

## Monitoring & Logging

Use:

- PM2  
- Winston logger  
- ELK stack  
- OpenTelemetry  

---

## Conclusion

Node.js continues to be one of the most scalable backend solutions available.`,
        excerpt:
          "Best practices for creating robust and scalable backend services using Node.js, including architecture patterns and performance optimization.",
        category: "Backend",
        tags: ["Node.js", "API", "Scalability", "Performance"],
        image: "/nodejs-api-development.png",
        published: true,
        author: "Arif Basha",
      },

      {
        title: "Modern CSS Techniques for 2024",
        content: `# Modern CSS Techniques for 2024

CSS continues to evolve rapidly, and developers now have more powerful tools than ever to build complex, responsive, and beautiful interfaces.

## 1. Container Queries

One of the most awaited features in CSS, enabling styles based on a parent container's size rather than screen size.

\`\`\`css
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { padding: 2rem; }
}
\`\`\`

## 2. CSS Nesting

Similar to SCSS but now native:

\`\`\`css
.card {
  padding: 1rem;

  & h2 {
    font-size: 1.5rem;
  }
}
\`\`\`

## 3. Subgrid

Allows child grids to inherit parent grid layouts.

## 4. New Color Spaces

CSS now supports:

- lab()
- lch()
- oklch()

Perfect for consistent color rendering.

## 5. View Transitions API

Create seamless animations between pages.

---

## Conclusion

2024 brings powerful new CSS features that reduce the need for frameworks and simplify UI development.`,
        excerpt:
          "Discover the latest CSS features and techniques that will make your web designs more efficient and visually stunning.",
        category: "Frontend",
        tags: ["CSS", "Frontend", "UI Design", "2024"],
        image: "/css-modern-design.png",
        published: true,
        author: "Arif Basha",
      },

      {
        title: "DevOps Best Practices for Small Teams",
        content: `# DevOps Best Practices for Small Teams

DevOps is not just for big companies. Small teams can achieve massive productivity gains by adopting the right practices.

## 1. Automation First

Automate:

- Testing  
- Deployment  
- Builds  
- CI/CD pipelines  

Tools: GitHub Actions, GitLab CI, Jenkins.

## 2. Monitoring & Observability

Use:

- Grafana  
- Prometheus  
- New Relic  

Track metrics like CPU, memory, request latency, and error rates.

## 3. Infrastructure as Code (IaC)

Tools like Terraform and Pulumi help manage servers consistently.

## 4. Version Everything

- Code  
- Infrastructure  
- Config  
- Pipelines  

## 5. Communication & Culture

A DevOps culture values:

- Collaboration  
- Transparency  
- Rapid feedback  

---

## Conclusion

Small teams can achieve enterprise-level DevOps efficiency with the right mindset and tooling.`,
        excerpt:
          "How small development teams can implement effective DevOps practices without overwhelming complexity or resources.",
        category: "DevOps",
        tags: ["DevOps", "Automation", "CI/CD", "Monitoring"],
        image: "/devops-automation-tools.png",
        published: true,
        author: "Arif Basha",
      },

      {
        title: "TypeScript Advanced Patterns",
        content: `# TypeScript Advanced Patterns

TypeScript has become the backbone of modern JavaScript development. Beyond basics, there are advanced patterns that help write highly scalable and maintainable apps.

## 1. Utility Types

\`\`\`ts
type PartialUser = Partial<User>
\`\`\`

## 2. Discriminated Unions

\`\`\`ts
type Shape =
  | { type: "circle"; radius: number }
  | { type: "square"; size: number }
\`\`\`

## 3. Mapped Types

\`\`\`ts
type OptionsFlags<T> = {
  [P in keyof T]: boolean
}
\`\`\`

## 4. Template Literal Types

\`\`\`ts
type EventName = \`on\${string}\`
\`\`\`

## 5. Decorators (2024 Standard)

Add metadata-driven behavior to classes and methods.

---

## Conclusion

Advanced TypeScript patterns enable cleaner, safer, and more scalable applications.`,
        excerpt:
          "Deep dive into advanced TypeScript patterns and techniques that will make your code more type-safe and maintainable.",
        category: "TypeScript",
        tags: ["TypeScript", "Patterns", "Advanced TypeScript"],
        image: "/typescript-code-patterns.png",
        published: true,
        author: "Arif Basha",
      },
    ]


    const createdPosts = await Post.insertMany(posts);
    console.log(createdPosts)
    console.log("✔ Inserted sample posts");

    // Update post counts
    await Promise.all(
      createdCategories.map(async (category) => {
        const postCount = await Post.countDocuments({
          category: category._id,
          published: true,
        });
        await Category.findByIdAndUpdate(category._id, { postCount });
      })
    );

    console.log("✔ Updated category post counts");

    console.log("\n🎉 Database seeded successfully!");
    console.log("Admin Login:");
    console.log("Email: admin@techzen.com");
    console.log("Password: admin123");

    console.groupEnd();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB\n");
    process.exit(0);
  }
}

seedDatabase()
