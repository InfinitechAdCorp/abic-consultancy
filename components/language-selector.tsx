"use client"

import { Globe, ChevronDown, Loader2, RotateCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect, useCallback } from 'react'

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState('English')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
    { code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳' }, // Use zh-CN for simplified Chinese
    { code: 'zh-TW', name: '中文 (繁體)', flag: '🇹🇼' }, // Use zh-TW for traditional Chinese
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ms', name: 'Bahasa Malaysia', flag: '🇲🇾' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ]

  const currentLang = languages.find(lang => lang.name === currentLanguage) || languages[0]

  // Detect current language from various sources
  const detectCurrentLanguage = useCallback(() => {
    // Method 1: Check URL hash
    const hash = window.location.hash
    console.log('🔍 Current hash for detection:', hash)
    
    if (hash.includes('googtrans')) {
      const match = hash.match(/googtrans$$([^|]+)\|([^)]+)$$/) // More robust regex
      if (match && match[2]) {
        let code = match[2]
        // Normalize Chinese codes for display
        if (code === 'zh' || code === 'zh-cn') {
          code = 'zh-CN' // Map to our consistent simplified Chinese code
        } else if (code === 'zh-tw') {
          code = 'zh-TW' // Map to our consistent traditional Chinese code
        }

        const lang = languages.find(l => l.code === code)
        if (lang) {
          console.log('✅ Detected from hash:', lang.name, 'Code:', code)
          return lang.name
        }
      }
    }

    // Method 2: Check Google Translate select element (if visible/accessible)
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement
    if (selectElement && selectElement.value && selectElement.value !== 'en') {
      let code = selectElement.value
      if (code === 'zh' || code === 'zh-cn') {
        code = 'zh-CN'
      } else if (code === 'zh-tw') {
        code = 'zh-TW'
      }
      const lang = languages.find(l => l.code === code)
      if (lang) {
        console.log('✅ Detected from select:', lang.name, 'Code:', code)
        return lang.name
      }
    }

    // Method 3: Check if content looks translated (simple heuristic)
    // Only use this if no hash or select element indicates translation
    if (!hash.includes('googtrans') && (!selectElement || selectElement.value === 'en')) {
      const bodyText = document.body.textContent || ''
      if (bodyText.includes('Bahay') || bodyText.includes('Tungkol')) {
        console.log('✅ Detected Filipino from content')
        return 'Filipino'
      }
      if (/[\u4e00-\u9fff]/.test(bodyText)) {
        console.log('✅ Detected Chinese characters from content')
        // This is a heuristic, assume simplified if characters are present and not explicitly traditional
        return '中文 (简体)' 
      }
    }

    console.log('❌ No translation detected, defaulting to English')
    return 'English'
  }, [languages])

  // Initialize Google Translate
  const initializeGoogleTranslate = useCallback(() => {
    console.log('🚀 Initializing Google Translate...')
    
    window.googleTranslateElementInit = () => {
      try {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            // Use zh-CN and zh-TW explicitly
            includedLanguages: 'en,tl,zh-CN,zh-TW,es,ja,ko,th,vi,id,ms,fr,de,it,pt,ru,ar',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, 'google_translate_element')
          
          console.log('✅ Google Translate initialized successfully')
          setIsReady(true)
          
          // Detect current language after initialization
          setTimeout(() => {
            const detected = detectCurrentLanguage()
            setCurrentLanguage(detected)
          }, 1000)
        }
      } catch (error) {
        console.error('❌ Google Translate initialization failed:', error)
      }
    }

    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script')
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.head.appendChild(script)
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit()
    }
  }, [detectCurrentLanguage])

  useEffect(() => {
    const timer = setTimeout(initializeGoogleTranslate, 100)
    return () => clearTimeout(timer)
  }, [initializeGoogleTranslate])

  // Monitor language changes
  useEffect(() => {
    const interval = setInterval(() => {
      const detected = detectCurrentLanguage()
      if (detected !== currentLanguage) {
        setCurrentLanguage(detected)
      }
      // Also check if translation is active (spinner or translated classes)
      const isCurrentlyTranslating = document.querySelector('.goog-te-spinner-pos') !== null ||
                                     document.documentElement.classList.contains('translated-ltr') ||
                                     document.documentElement.classList.contains('translated-rtl')
      if (isCurrentlyTranslating && !isTranslating) {
        setIsTranslating(true)
      } else if (!isCurrentlyTranslating && isTranslating) {
        setIsTranslating(false)
      }
    }, 500) // Check more frequently

    return () => clearInterval(interval)
  }, [currentLanguage, detectCurrentLanguage, isTranslating])

  // Force reset to English (nuclear option)
  const forceResetToEnglish = useCallback(() => {
    console.log('🔄 Force resetting to English...')
    setIsTranslating(true)
    
    // Clear all possible translation states
    window.location.hash = ''
    
    // Clear any Google Translate cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Remove translated classes
    document.documentElement.classList.remove('translated-ltr', 'translated-rtl')
    document.body.classList.remove('translated-ltr', 'translated-rtl')
    
    // Reset select element if it exists
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement
    if (selectElement) {
      selectElement.value = 'en'
      const changeEvent = new Event('change', { bubbles: true })
      selectElement.dispatchEvent(changeEvent)
    }
    
    // Set current language to English immediately in UI
    setCurrentLanguage('English')

    // Force page reload after a short delay to ensure state is cleared
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }, [])

  // Translate to language
  const translateToLanguage = useCallback((languageCode: string, languageName: string) => {
    if (!isReady) {
      console.warn('⚠️ Google Translate not ready yet')
      return
    }
    
    console.log(`🌐 Attempting translation to: ${languageName} (${languageCode})`)
    setIsTranslating(true)
    setCurrentLanguage(languageName) // Optimistically update UI

    if (languageCode === 'en') {
      forceResetToEnglish()
      return
    }

    // Use the hash method as it's the most reliable for Google Translate
    window.location.hash = `#googtrans(en|${languageCode})`
    console.log(`Set hash to: ${window.location.hash}`)
    
    // Force a reload to ensure Google Translate picks up the hash
    setTimeout(() => {
      console.log('Reloading page to apply translation...')
      window.location.reload()
    }, 300);

  }, [isReady, forceResetToEnglish])

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div 
        id="google_translate_element"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none'
        }}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-10 px-3 hover:bg-gray-50 hover:text-green-600 relative">
            {isTranslating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Globe className="h-4 w-4 mr-2" />
            )}
            <span className="hidden sm:inline mr-1">{currentLang.flag}</span>
            <span className="hidden md:inline">{currentLang.name}</span>
            <span className="md:hidden">{currentLang.code.toUpperCase()}</span>
            <ChevronDown className="h-3 w-3 ml-1" />
            
            {/* Status indicator */}
            {!isReady && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
            )}
            {isReady && !isTranslating && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
            )}
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto">
          {/* Status header */}
          <div className="px-3 py-2 text-xs border-b text-center">
            {!isReady && (
              <div className="text-orange-600">🔄 Loading...</div>
            )}
            {isReady && isTranslating && (
              <div className="text-green-600">🌐 Translating...</div>
            )}
            {isReady && !isTranslating && (
              <div className="text-green-600">✅ Ready</div>
            )}
          </div>
          
          {/* Current language indicator */}
          <div className="px-3 py-1 text-xs text-gray-500 border-b">
            Current: {currentLanguage}
          </div>
          
          {/* Force Reset Button */}
          <DropdownMenuItem
            onClick={forceResetToEnglish}
            className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Force Reset to English
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Languages */}
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => translateToLanguage(lang.code, lang.name)}
              disabled={!isReady || isTranslating}
              className={`cursor-pointer ${
                currentLanguage === lang.name 
                  ? 'bg-green-50 text-green-600 font-semibold' 
                  : ''
              } ${(!isReady || isTranslating) ? 'opacity-50' : ''}`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
              {currentLanguage === lang.name && (
                <span className="ml-auto text-green-600">✓</span>
              )}
            </DropdownMenuItem>
          ))}
          
          <div className="px-2 py-1 border-t border-gray-200 mt-1">
            <p className="text-xs text-gray-500 text-center">
              Powered by Google Translate
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
