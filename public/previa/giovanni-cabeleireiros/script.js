// Prévia Giovanni Cabeleireiros · "Noite de gala". Sem dependências.
const AUTOR_WHATSAPP = '5551991913505'
const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches

// Proposta (só para o dono)
const dialog = document.getElementById('proposta')
const abrir = () => { if (!dialog.open) dialog.showModal() }
document.querySelectorAll('[data-abrir-proposta]').forEach((b) => b.addEventListener('click', abrir))
document.querySelectorAll('[data-fechar-proposta]').forEach((b) => b.addEventListener('click', () => dialog.close()))
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close() })
if (location.hash === '#proposta') abrir()
addEventListener('hashchange', () => { if (location.hash === '#proposta') abrir() })
const autor = document.querySelector('[data-autor-zap]')
if (AUTOR_WHATSAPP) autor.href = `https://wa.me/${AUTOR_WHATSAPP}?text=${encodeURIComponent('Oi! Vi o modelo de site do Giovanni Cabeleireiros e quero conversar.')}`
else { autor.removeAttribute('href'); autor.setAttribute('aria-disabled', 'true') }
document.querySelector('[data-rascunho]').hidden = Boolean(AUTOR_WHATSAPP)
const pend = [...document.querySelectorAll('[data-confirmar]')].map((el) => el.dataset.confirmar)
const lista = document.querySelector('[data-lista-confirmar]')
pend.forEach((t) => { const li = document.createElement('li'); li.textContent = t; lista.append(li) })
document.querySelector('[data-contagem]').textContent = pend.length

// Reveal
const rv = document.querySelectorAll('.rv')
if (calmo || !('IntersectionObserver' in window)) rv.forEach((el) => el.classList.add('in'))
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
  rv.forEach((el) => io.observe(el))
}

// Parallax suave (desktop, sem reduced-motion)
const px = [...document.querySelectorAll('[data-parallax]')]
if (!calmo && matchMedia('(min-width: 901px) and (pointer: fine)').matches && px.length) {
  let pend = false
  const passo = () => {
    pend = false
    const vh = innerHeight
    px.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > vh) return
      const d = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax)
      el.querySelector('img').style.transform = `translate3d(0,${d.toFixed(1)}px,0)`
    })
  }
  addEventListener('scroll', () => { if (!pend) { pend = true; requestAnimationFrame(passo) } }, { passive: true })
  passo()
}
