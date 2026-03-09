"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
      // Update UI notify the user they can install the PWA
      setIsVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response to the install prompt: ${outcome}`)
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-[100] animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="bg-primary text-primary-foreground p-5 rounded-2xl shadow-2xl border border-primary-foreground/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
          <Download className="h-12 w-12" />
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative z-10">
          <h3 className="telugu-heading text-xl font-bold mb-2">యాప్‌ను ఇన్‌స్టాల్ చేసుకోండి</h3>
          <p className="telugu-text text-sm opacity-90 mb-4 leading-relaxed">
            ఈ గ్రంథాలయాన్ని మీ హోమ్ స్క్రీన్‌కు జోడించుకోండి. దీనివల్ల మీరు ఆఫ్‌లైన్‌లో కూడా చదువుకోవచ్చు.
          </p>
          <div className="flex gap-3">
            <Button 
              onClick={handleInstallClick} 
              variant="secondary" 
              className="telugu-text font-bold flex-1"
            >
              ఇన్‌స్టాల్ చేయండి
            </Button>
            <Button 
              onClick={() => setIsVisible(false)} 
              variant="ghost" 
              className="telugu-text text-xs opacity-70"
            >
              తర్వాత
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
