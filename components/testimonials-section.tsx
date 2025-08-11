"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"

interface Testimonial {
  id: number;
  message: string; // Changed from 'quote' to 'message'
  name: string; // Changed from 'author' to 'name' to match Laravel backend
  // Removed 'title' and 'avatar' as they are not provided by the current Laravel backend
  rating: number;
  is_approved: boolean;
}

interface StarRatingProps {
  rating: number;
  onRatingChange?: (newRating: number) => void;
  isInteractive?: boolean;
}

function StarRating({ rating, onRatingChange, isInteractive = false }: StarRatingProps) {
  return (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} ${isInteractive ? "cursor-pointer" : ""}`}
          onClick={() => isInteractive && onRatingChange?.(i + 1)}
        />
      ))}
    </div>
  );
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <Card className="p-6 md:p-8 text-center shadow-lg bg-white rounded-lg border-0">
        <CardContent className="flex flex-col items-center justify-center space-y-6">
          <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed">
            No testimonials yet. Be the first to share your experience!
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative w-full max-w-2xl mx-auto py-8">
      <Card className="p-6 md:p-8 text-center shadow-lg bg-white rounded-lg border-0 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <CardContent className="flex flex-col items-center justify-center space-y-6">
          <Avatar className="w-20 h-20 border border-gray-900">
            {/* Use currentTestimonial.name for alt text */}
            <AvatarImage src={`/abstract-geometric-shapes.png?height=80&width=80&query=${encodeURIComponent(currentTestimonial.name || 'person')}`} alt={currentTestimonial.name} />
            {/* Use currentTestimonial.name for AvatarFallback */}
            <AvatarFallback>{(currentTestimonial.name || 'Anonymous').charAt(0)}</AvatarFallback>
          </Avatar>
          <StarRating rating={currentTestimonial.rating} />
          <blockquote className="text-lg md:text-xl italic text-gray-700 leading-relaxed">
            &ldquo;{currentTestimonial.message}&rdquo; {/* Changed from .quote to .message */}
          </blockquote>
          <div className="font-semibold text-gray-900 dark:text-gray-100 mt-4">
            {currentTestimonial.name}
          </div>
          {/* Removed author and title display as they are not provided by backend */}
        </CardContent>
      </Card>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-700"
        onClick={goToPrevious}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-700"
        onClick={goToNext}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

interface TestimonialFormProps {
  onTestimonialSubmitted: () => void;
}

function TestimonialForm({ onTestimonialSubmitted }: TestimonialFormProps) {
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Validation Error",
        description: "Please select a star rating.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, rating, message }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Submission Failed",
          description: errorData.message || 'Failed to submit testimonial. Please try again.',
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Thank you for your testimonial!.",
        variant: "default",
      });
      setName("")
      setRating(0)
      setMessage("")
      onTestimonialSubmitted();
    } catch (err) {
      console.error("Submission error:", err)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-white rounded-lg border-0 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle>Share Your Experience</CardTitle>
        <CardDescription>We'd love to hear your thoughts about our service.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Your Rating</Label>
            <StarRating rating={rating} onRatingChange={setRating} isInteractive={true} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Your Testimonial</Label>
            <Textarea
              id="message"
              placeholder="Write your testimonial here..."
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 bg-white"
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-base font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-lg" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
            {isSubmitting ? null : <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function TestimonialsSection() {
  const [isVisibleSection, setIsVisibleSection] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [fetchedTestimonials, setFetchedTestimonials] = useState<Testimonial[]>([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const fetchTestimonials = useCallback(async () => {
    setLoadingTestimonials(true)
    setFetchError(null)
    try {
      const response = await fetch('/api/testimonials')
      if (!response.ok) {
        const errorData = await response.json();
        setFetchError(errorData.message || 'Failed to load testimonials.');
        setFetchedTestimonials([]);
        return;
      }
      const data: Testimonial[] = await response.json()
      const processedData = data.map(t => ({
        ...t,
        name: t.name || 'Anonymous',
        avatar: `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(t.name || 'person')}`,
        // 'message' is now directly used from 't' due to interface change
      }));
      setFetchedTestimonials(processedData)
    } catch (err) {
      console.error("Failed to fetch testimonials:", err)
      setFetchError("Could not load testimonials. Please try again later.")
      setFetchedTestimonials([]);
    } finally {
      setLoadingTestimonials(false)
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleSection(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [fetchTestimonials])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-gradient-to-br from-[#E0F7FA] to-[#E8F5E9] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 bg-[url('/images/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-zinc-900 animate-fade-in-up">
          What Our Customers Say
        </h2>
        <div className={`w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-1000 ${isVisibleSection ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col items-center justify-center">
            {loadingTestimonials ? (
              <p className="text-gray-600">Loading testimonials...</p>
            ) : fetchError ? (
              <p className="text-red-500">{fetchError}</p>
            ) : (
              <TestimonialSlider testimonials={fetchedTestimonials} />
            )}
          </div>
          <div className="flex flex-col items-center justify-center">
            <TestimonialForm onTestimonialSubmitted={fetchTestimonials} />
          </div>
        </div>
      </div>
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
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.08; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 10s infinite ease-in-out alternate;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .animate-pulse {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  )
}
