import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function previaDirectoryIndex() {
  return {
    name: 'previa-directory-index',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const raw = req.url ?? ''
        const q = raw.indexOf('?')
        const pathname = q === -1 ? raw : raw.slice(0, q)
        const search = q === -1 ? '' : raw.slice(q)
        // prévias e as páginas estáticas /sites/ e /skillpacks/ abrem o index.html de public/
        // (em produção o GitHub Pages faz isso sozinho)
        const estatica =
          pathname.startsWith('/previa/') ||
          pathname === '/sites' ||
          pathname === '/sites/' ||
          pathname === '/skillpacks' ||
          pathname === '/skillpacks/'
        if (!estatica || path.extname(pathname)) return next()
        const dir = pathname.endsWith('/') ? pathname : `${pathname}/`
        const file = path.join(server.config.publicDir, dir.slice(1), 'index.html')
        if (fs.existsSync(file)) req.url = `${dir}index.html${search}`
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [previaDirectoryIndex(), react()],
})
