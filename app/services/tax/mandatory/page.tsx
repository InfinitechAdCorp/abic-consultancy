"use client"
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import subtlePattern from "@/public/subtle-pattern.png"

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function MandatoryTaxesPage() {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  const card1InView = useInView(card1Ref, { margin: '-100px' });
  const card2InView = useInView(card2Ref, { margin: '-100px' });
  const card3InView = useInView(card3Ref, { margin: '-100px' });
  const card4InView = useInView(card4Ref, { margin: '-100px' });

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Mandatory <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Taxes</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Understanding the core tax obligations for businesses in the Philippines.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Income Tax Card */}
            <motion.div
              ref={card1Ref}
              initial="hidden"
              animate={card1InView ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full hover:-translate-y-2 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-green-600">1 Income Tax</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    In the Philippines, sole proprietors and professionals are subject to progressive income tax rates ranging from 0% to 35%, but those with gross sales below PHP 3 million can opt for a simplified 8% flat tax on gross income.
                  </p>
                  <p>
                    Meanwhile, corporations and partnerships are required to pay a Regular Corporate Income Tax (RCIT) of 25%, while businesses with low taxable income are subject to a Minimum Corporate Income Tax (MCIT) of 2%.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Value-Added Tax (VAT) Card */}
            <motion.div
              ref={card2Ref}
              initial="hidden"
              animate={card2InView ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full hover:-translate-y-2 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-600">2 Value-Added Tax (VAT) – 12%</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Businesses in the Philippines with annual sales exceeding PHP 3 million are required to register as VAT taxpayers and file monthly and quarterly VAT returns with the Bureau of Internal Revenue (BIR).
                  </p>
                  <p>
                    Meanwhile, non-VAT businesses with annual sales below PHP 3 million are subject to Percentage Tax, ranging from 1% to 3%, which must be filed quarterly using BIR Form 2551Q.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Withholding Taxes Card */}
            <motion.div
              ref={card3Ref}
              initial="hidden"
              animate={card3InView ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full hover:-translate-y-2 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-600">3 Withholding Taxes</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Businesses in the Philippines are required to comply with withholding tax regulations, including Expanded Withholding Tax (EWT), which ranges from 1% to 15% and applies to payments for professional services, rent, and commissions.
                  </p>
                  <p className="mb-4">
                    Employers must also deduct Withholding Tax on Compensation, which varies from 0% to 35% based on employee salaries.
                  </p>
                  <p>
                    Additionally, businesses must adhere to monthly and annual tax filing schedules, ensuring timely submission of required tax returns to the Bureau of Internal Revenue (BIR) to avoid penalties.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Payroll Tax & Employee Contributions Card */}
            <motion.div
              ref={card4Ref}
              initial="hidden"
              animate={card4InView ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full hover:-translate-y-2 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-orange-600">4 Payroll Tax & Employee Contributions</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Employers in the Philippines are required to register and remit monthly contributions for their employees to the following government agencies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><span className="font-semibold">SSS (Social Security System)</span> – Provides retirement, disability, and maternity benefits.</li>
                    <li><span className="font-semibold">PhilHealth</span> – Covers medical and hospitalization benefits.</li>
                    <li><span className="font-semibold">Pag-IBIG Fund</span> – Offers housing loans and savings programs.</li>
                  </ul>
                  <p>
                    Additionally, employers must issue BIR Form 2316 annually, summarizing employee earnings and withheld taxes. This document serves as proof of income tax payment and is required for tax filing and clearance.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={card1InView || card2InView || card3InView || card4InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300">
              <Link href="/consultation">SCHEDULE A CONSULTATION</Link>
            </Button>
          </motion.div>
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

        @keyframes blob-subtle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(10px, -15px) scale(1.05); }
          60% { transform: translate(-5px, 20px) scale(0.98); }
        }
        .animate-blob-subtle {
          animation: blob-subtle 20s infinite ease-in-out alternate;
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
