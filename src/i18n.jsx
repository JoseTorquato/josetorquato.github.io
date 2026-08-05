import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext({ lang: 'pt', setLang: () => {} })

export function LangProvider({ children }) {
  // Always start in 'pt' so client hydration matches the prerendered HTML;
  // the saved preference is applied right after mount.
  const [lang, setLang] = useState('pt')

  useEffect(() => {
    if (localStorage.getItem('jt-lang') === 'en') setLang('en')
  }, [])

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
