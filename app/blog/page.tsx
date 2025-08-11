"use client"

import Navigation from "@/components/navigation" // Keeping Navigation as per previous clarification
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/footer"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "Starting a Business in the Philippines: A Complete Guide",
      excerpt: "Everything you need to know about establishing your business in the Philippines, from registration to compliance requirements.",
      author: "ABIC Team",
      date: "January 15, 2024",
      readTime: "8 min read",
      category: "Business Setup",
      image: "/images/tax.png"
    },
    {
      title: "Understanding Philippine Tax Requirements for Foreign Investors",
      excerpt: "Navigate the complex tax landscape in the Philippines with our comprehensive guide for foreign investors and businesses.",
      author: "Tax Specialist",
      date: "January 10, 2024",
      readTime: "6 min read",
      category: "Tax & Compliance",
      image: "/images/tax.png"
    },
    {
      title: "Visa Options for Business Owners in the Philippines",
      excerpt: "Explore different visa categories available for entrepreneurs and investors looking to establish businesses in the Philippines.",
      author: "Immigration Expert",
      date: "January 5, 2024",
      readTime: "5 min read",
      category: "Visa Services",
      image: "/images/tax.png"
    },
    {
      title: "HR Outsourcing: Benefits for Growing Businesses",
      excerpt: "Discover how HR outsourcing can help your business scale efficiently while maintaining compliance and reducing costs.",
      author: "HR Consultant",
      date: "December 28, 2023",
      readTime: "7 min read",
      category: "HR Solutions",
      image: "/images/tax.png"
    },
    {
      title: "Special Economic Zones in the Philippines: Investment Opportunities",
      excerpt: "Learn about the advantages of setting up your business in Philippine Economic Zones and the incentives available.",
      author: "Investment Advisor",
      date: "December 20, 2023",
      readTime: "9 min read",
      category: "Investment",
      image: "/images/tax.png"
    },
    {
      title: "Digital Transformation for Philippine Businesses",
      excerpt: "How local businesses can leverage technology to improve operations and compete in the digital marketplace.",
      author: "Tech Consultant",
      date: "December 15, 2023",
      readTime: "6 min read",
      category: "Technology",
      image: "/images/tax.png"
    }
  ]

  // The 'categories' array is no longer needed if the filter section is removed
  // const categories = ["All", "Business Setup", "Tax & Compliance", "Visa Services", "HR Solutions", "Investment", "Technology"]

  return (
    <main className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-green-100 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-orange-400/20 rounded-full blur-3xl animate-blob-fast" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              ABIC <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Insights, tips, and updates from our business consulting experts
            </p>
          </div>
        </div>
      </section>
      {/* Categories Filter - REMOVED THIS SECTION */}
      {/* <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={`cursor-pointer hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white transition-all duration-300 ${
                  index === 0 ? 'bg-gradient-to-r from-green-500 to-blue-500' : ''
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section> */}
      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-300">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Load More */}
            
          </div>
        </div>
      </section>
      <Footer />
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        @keyframes blob-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(20px, -30px) scale(1.1); }
          60% { transform: translate(-10px, 40px) scale(0.9); }
        }
        .animate-blob-slow {
          animation: blob-slow 15s infinite ease-in-out alternate;
        }
        @keyframes blob-fast {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-25px, 35px) scale(1.05); }
          70% { transform: translate(15px, -20px) scale(0.95); }
        }
        .animate-blob-fast {
          animation: blob-fast 12s infinite ease-in-out alternate;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.08; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 10s infinite ease-in-out alternate;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </main>
  )
}
