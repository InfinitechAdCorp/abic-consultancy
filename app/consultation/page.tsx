"use client"

import Navigation from "@/components/navigation"
import ConsultationForm from "@/components/consultation-form"
import Footer from "@/components/footer"
export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center py-8">
        <ConsultationForm />
      </main>
            <Footer />
    </div>
    
  )
  
}
