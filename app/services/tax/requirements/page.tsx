"use client" // Make this a client component

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { motion } from "framer-motion" // Import motion from framer-motion
import { useEffect, useRef, useState } from "react" // Import hooks for IntersectionObserver

export default function TaxRequirementsPage() {
  // Custom hook to observe element visibility for animation
  const useInView = (options: IntersectionObserverInit) => {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target) // Stop observing once in view
        }
      }, options)

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    }, [options])

    return [ref, inView] as const
  }

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  // Observe each card
  const [card1Ref, card1InView] = useInView({ threshold: 0.1 })
  const [card2Ref, card2InView] = useInView({ threshold: 0.1 })

  return (
    <div>
      <Navigation />
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <section className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Tax Requirements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Businesses in the Philippines must comply with tax and accounting regulations set by the Bureau of Internal Revenue (BIR), Securities and Exchange Commission (SEC), and local government units (LGUs) to avoid penalties and legal issues.
          </motion.p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mandatory Tax Requirements Overview Card */}
          <motion.div
            ref={card1Ref}
            initial="hidden"
            animate={card1InView ? "visible" : "hidden"}
            variants={cardVariants}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">Mandatory Tax Requirements Overview</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Companies are required to register with the BIR, maintain Books of Accounts, and submit regular tax filings, including income tax, VAT or percentage tax, and withholding tax on compensation.
                </p>
                <p className="mb-4">
                  Corporations must also file Audited Financial Statements (AFS) and General Information Sheets (GIS) with the SEC.
                </p>
                <p>
                  Employers are responsible for payroll compliance, including SSS, PhilHealth, and Pag-IBIG contributions, as well as issuing BIR Form 2316 for employee tax declarations. Failure to comply can result in fines, tax audits, or business closure.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* BIR Registration Process Card */}
          <motion.div
            ref={card2Ref}
            initial="hidden"
            animate={card2InView ? "visible" : "hidden"}
            variants={cardVariants}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">BIR Registration Essentials</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  All businesses must register with the BIR, which involves:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>BIR Form 1901 (Sole Proprietor/Freelancer) or 1903 (Corporation/Partnership)</li>
                  <li>Registration Fee (BIR Form 0605)</li>
                  <li>Business Taxpayer Identification Number (TIN)</li>
                  <li>Books of Accounts – BIR-stamped records for financial tracking</li>
                  <li>Official Receipts & Invoices – Printed from BIR-accredited printers</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={card1InView || card2InView ? { opacity: 1, y: 0 } : {}} // Animate when either card is in view
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-8"
        >
          <Button asChild className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
            <Link href="/contact">SCHEDULE A CONSULTATION</Link>
          </Button>
        </motion.div>
      </main>
    </div>
  )
}
