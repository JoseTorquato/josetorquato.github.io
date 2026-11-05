/* Felipe Albuquerque · prévia — movimento leve, filtros, galeria e mapa sob clique. Zero dependências. */
(() => {
  const D = document, rm = matchMedia('(prefers-reduced-motion: reduce)').matches
  D.documentElement.classList.add('js')

  // reveal
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
  D.querySelectorAll('.reveal').forEach((el, i) => { if (rm) return el.classList.add('in'); el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el) })

  // filtros por bairro e faixa de preço (os cards trazem data-bairro e data-preco)
  const chips = [...D.querySelectorAll('[data-filtro]')]
  const cards = [...D.querySelectorAll('.card[data-bairro]')]
  const conta = D.querySelector('[data-contagem]')
  const filtra = () => {
    const ativo = chips.find((c) => c.getAttribute('aria-pressed') === 'true')
    const [tipo, valor] = (ativo?.dataset.filtro || 'todos:').split(':')
    let n = 0
    cards.forEach((c) => {
      const p = +c.dataset.preco || 0
      const ok = tipo === 'todos' || (tipo === 'bairro' && c.dataset.bairro === valor) ||
        (tipo === 'ate' && p > 0 && p <= +valor) || (tipo === 'acima' && p > +valor)
      c.hidden = !ok; if (ok) n++
    })
    if (conta) conta.textContent = n === 1 ? '1 imóvel' : `${n} imóveis`
  }
  chips.forEach((c) => c.addEventListener('click', () => { chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c))); filtra() }))
  if (chips.length) filtra()

  // galeria em tela cheia (dialog nativo, teclado e toque)
  const lb = D.querySelector('dialog.lb')
  if (lb) {
    const fotos = [...D.querySelectorAll('[data-foto]')].map((b) => ({ src: b.dataset.foto, alt: b.querySelector('img')?.alt || '' }))
    const img = lb.querySelector('img'), contador = lb.querySelector('.lb-conta')
    let i = 0
    const mostra = (k) => { i = (k + fotos.length) % fotos.length; img.src = fotos[i].src; img.alt = fotos[i].alt; contador.textContent = `${i + 1} de ${fotos.length}` }
    D.querySelectorAll('[data-foto]').forEach((b, k) => b.addEventListener('click', () => { mostra(k); lb.showModal() }))
    lb.querySelector('.fechar').addEventListener('click', () => lb.close())
    lb.querySelector('.ant').addEventListener('click', () => mostra(i - 1))
    lb.querySelector('.prox').addEventListener('click', () => mostra(i + 1))
    lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') mostra(i - 1); if (e.key === 'ArrowRight') mostra(i + 1) })
    let x0 = null
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX }, { passive: true })
    lb.addEventListener('touchend', (e) => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) mostra(i + (dx < 0 ? 1 : -1)); x0 = null })
  }

  // mapa do bairro só sob clique (não pesa o carregamento)
  const btn = D.querySelector('[data-mapa]')
  if (btn) btn.addEventListener('click', () => {
    const f = D.createElement('iframe')
    f.title = 'Mapa do bairro'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'
    f.src = `https://www.google.com/maps?q=${encodeURIComponent(btn.dataset.mapa)}&output=embed`
    btn.replaceWith(f)
  })
})()
