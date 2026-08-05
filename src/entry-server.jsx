import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
import { LangProvider } from './i18n.jsx'

/** Render a route to static HTML. Used by scripts/prerender.mjs at build time. */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <LangProvider>
        <App />
      </LangProvider>
    </StaticRouter>
  )
}
