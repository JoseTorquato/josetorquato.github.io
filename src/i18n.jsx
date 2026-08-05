import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext({ lang: 'pt', setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage === 'undefined') return 'pt'
    return localStorage.getItem('jt-lang') || 'pt'
  })

  useEffect(() => {
    localStorage.setItem('jt-lang', lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

/** Resolve a { pt, en } value (or a plain string) for the current language. */
export function useT() {
  const { lang } = useLang()
  return (value) => (value && typeof value === 'object' && !Array.isArray(value) ? value[lang] : value)
}
