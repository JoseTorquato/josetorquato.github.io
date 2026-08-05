import { useLang } from '../i18n.jsx'

export default function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={'lang-btn' + (lang === 'pt' ? ' is-active' : '')}
        aria-pressed={lang === 'pt'}
        onClick={() => setLang('pt')}
      >
        PT
      </button>
      <button
        type="button"
        className={'lang-btn' + (lang === 'en' ? ' is-active' : '')}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  )
}
