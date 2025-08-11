"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function InstallPrompt() {
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)

  useEffect(() => {
    // Check if the app is already running in standalone mode (PWA installed)
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches)

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      ;(deferredPrompt as any).prompt()
      // Wait for the user to respond to the prompt
      ;(deferredPrompt as any).userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt")
        } else {
          console.log("User dismissed the A2HS prompt")
        }
        // Clear the prompt once it's been used
        setDeferredPrompt(null)
      })
    }
  }

  // If the app is already installed as a PWA, don't show the button
  if (isStandalone) {
    return null
  }

  return (
    <Button
      onClick={handleInstallClick}
      disabled={!deferredPrompt} // Button is disabled if no prompt is available
      className="flex items-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download className="h-4 w-4" />
      {deferredPrompt ? "Install App" : "Install App (Not Available)"}
    </Button>
  )
}
