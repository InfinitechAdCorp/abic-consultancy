import type { Metadata } from "next"
import { generateMetadata as getMetadata } from "@/lib/metadata"
import AboutPageClient from "./about-client"

// Server component that exports metadata
export const metadata: Metadata = getMetadata("/about")

export default function AboutPage() {
  return <AboutPageClient />
}
