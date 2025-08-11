import type React from "react"
import type { Metadata } from "next/types"
import { Geist, Geist_Mono } from "next/font/google"
import { LanguageProvider } from "@/contexts/language-context"
import FloatingSocialMedia from "@/components/floating-social-media"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ChatbotWrapper } from "@/components/chatbot-wrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ABIC Consultancy - Your Gateway to Business Success in the Philippines",
  description:
    "Professional business consulting services in the Philippines. We provide comprehensive business solutions, visa services, tax consulting, and HR outsourcing to help foreign entrepreneurs establish and grow their businesses.",
  keywords:
    "business consulting Philippines, visa services, tax consulting, HR outsourcing, business setup Philippines, foreign investment Philippines",
  authors: [{ name: "ABIC Consultancy" }],
  creator: "INFINITECH ADVERTISING CORPORATION",
  openGraph: {
    title: "ABIC Consultancy - Business Success in the Philippines",
    description:
      "Your trusted partner for business success in the Philippines since 2018. Comprehensive consulting services for foreign entrepreneurs and investors.",
    url: "https://abic-consultancy.com",
    siteName: "ABIC Consultancy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABIC Consultancy - Business Success in the Philippines",
    description: "Your trusted partner for business success in the Philippines since 2018.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Apple Touch Icon for iOS Safari */}
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0D9488" />

        {/* CSS to hide Google Translate UI elements */}
        <style>{`
          .goog-te-banner-frame.skiptranslate {
            display: none !important;
          }
          .goog-te-gadget-icon {
            display: none !important;
          }
          .goog-te-balloon-frame {
            display: none !important;
          }
          #goog-gt-tt {
            display: none !important;
          }
          .goog-te-ftab {
            display: none !important;
          }
          body {
            top: 0 !important;
            position: static !important;
          }
          #google_translate_element {
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
          }
          .goog-te-combo {
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
          }
          .goog-te-spinner-pos {
            display: none !important;
          }
          body.translated-ltr {
            direction: ltr !important;
          }
          body.translated-rtl {
            direction: rtl !important;
          }
          .skiptranslate {
            display: none !important;
          }
          html {
            margin-top: 0 !important;
          }
          .goog-te-menu-value {
            display: none !important;
          }
          .goog-te-menu-frame {
            display: none !important;
          }
          body.translated-ltr,
          body.translated-rtl {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
        `}</style>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ABIC Consultancy",
              alternateName: "Advanced Beyond International Consulting Inc.",
              url: "https://abic-consultancy.com",
              logo: "https://abic-consultancy.com/images/abic-logo.png",
              description: "Professional business consulting services in the Philippines since 2018",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Makati City",
                addressCountry: "Philippines",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+63-2-8123-4567",
                contactType: "customer service",
                availableLanguage: ["English", "Filipino", "Chinese"],
              },
              sameAs: [
                "https://facebook.com/abic-consultancy",
                "https://linkedin.com/company/abic-consultancy",
                "https://twitter.com/abic-consultancy",
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          {children}
          {/* Floating Social Media - Only shows on mobile */}
          <FloatingSocialMedia />
          <Toaster /> {/* Place the Toaster component here */}
          <ChatbotWrapper /> {/* Use the ChatbotWrapper component here */}
        </LanguageProvider>
      </body>
    </html>
  )
}
