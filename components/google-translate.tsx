"use client"

import { useState, useEffect } from 'react'
import { Globe, ChevronDown, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('English')
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
    { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
    { code: 'ko', name: '한국어 (Korean)', flag: '🇰🇷' },
    { code: 'th', name: 'ไทย (Thai)', flag: '🇹🇭' },
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

  useEffect(() => {
    // Check if Google Translate is loaded
    const checkGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        setIsTranslateLoaded(true)
      } else {
        setTimeout(checkGoogleTranslate, 100)
      }
    }
    checkGoogleTranslate()

    // Hide Google Translate toolbar
    const style = document.createElement('style')
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate,
      .goog-te-gadget-icon,
      .goog-te-balloon-frame {
        display: none !important;
      }
      body {
        top: 0 !important;
      }
      .goog-te-combo {
        display: none !important;
      }
      #google_translate_element {
        display: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const translatePage = (languageCode: string, languageName: string) => {
    if (!isTranslateLoaded) return

    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement
    if (selectElement) {
      selectElement.value = languageCode
      selectElement.dispatchEvent(new Event('change'))
      setCurrentLanguage(languageName)
      setIsVisible(false)
    }
  }

  const resetToOriginal = () => {
    if (!isTranslateLoaded) return

    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement
    if (selectElement) {
      selectElement.value = 'en'
      selectElement.dispatchEvent(new Event('change'))
      setCurrentLanguage('English')
      setIsVisible(false)
    }
  }

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      {/* Floating Language Selector */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
          <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 p-4 mb-4 max-w-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-sm">Select Language</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2 max-h-80 overflow-y-auto">
              <button
                onClick={resetToOriginal}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-green-50 hover:text-green-600 ${
                  currentLanguage === 'English' ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700'
                }`}
              >
                <span className="mr-2">🇺🇸</span>
                English (Original)
              </button>
              
              {languages.slice(1).map((language) => (
                <button
                  key={language.code}
                  onClick={() => translatePage(language.code, language.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-green-50 hover:text-green-600 ${
                    currentLanguage === language.name ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700'
                  }`}
                >
                  <span className="mr-2">{language.flag}</span>
                  {language.name}
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Powered by Google Translate
              </p>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          title="Language Selector"
        >
          <div className={`transform transition-transform duration-300 ${isVisible ? 'rotate-180' : 'rotate-0'}`}>
            <Globe className="h-6 w-6" />
          </div>
          
          {/* Language indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
            <span className="text-xs">
              {currentLanguage === 'English' ? '🇺🇸' : 
               currentLanguage === 'Filipino' ? '🇵🇭' :
               currentLanguage.includes('Chinese') ? '🇨🇳' :
               currentLanguage === 'Español' ? '🇪🇸' :
               currentLanguage.includes('Japanese') ? '🇯🇵' :
               currentLanguage.includes('Korean') ? '🇰🇷' :
               currentLanguage.includes('Thai') ? '🇹🇭' :
               currentLanguage === 'Tiếng Việt' ? '🇻🇳' :
               currentLanguage === 'Bahasa Indonesia' ? '🇮🇩' :
               currentLanguage === 'Bahasa Malaysia' ? '🇲🇾' :
               currentLanguage === 'Français' ? '🇫🇷' :
               currentLanguage === 'Deutsch' ? '🇩🇪' :
               currentLanguage === 'Italiano' ? '🇮🇹' :
               currentLanguage === 'Português' ? '🇵🇹' :
               currentLanguage === 'Русский' ? '🇷🇺' :
               currentLanguage === 'العربية' ? '🇸🇦' : '🌐'}
            </span>
          </div>
        </button>
      </div>
    </>
  )
}
