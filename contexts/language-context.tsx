"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LanguageContextType {
  currentLanguage: string
  setCurrentLanguage: (language: string) => void
  isTranslating: boolean
  setIsTranslating: (translating: boolean) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('English')
  const [isTranslating, setIsTranslating] = useState(false)

  // Check URL hash on mount to detect current language
  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('googtrans')) {
      const match = hash.match(/googtrans$$en\|([^)]+)$$/)
      if (match) {
        const langCode = match[1]
        // Map language codes to names
        const languageMap: { [key: string]: string } = {
          'tl': 'Filipino',
          'zh': '中文 (简体)',
          'zh-tw': '中文 (繁體)',
          'es': 'Español',
          'ja': '日本語',
          'ko': '한국어',
          'th': 'ไทย',
          'vi': 'Tiếng Việt',
          'id': 'Bahasa Indonesia',
          'ms': 'Bahasa Malaysia',
          'fr': 'Français',
          'de': 'Deutsch',
          'it': 'Italiano',
          'pt': 'Português',
          'ru': 'Русский',
          'ar': 'العربية'
        }
        
        const languageName = languageMap[langCode] || 'English'
        setCurrentLanguage(languageName)
      }
    }
  }, [])

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setCurrentLanguage,
      isTranslating,
      setIsTranslating
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
