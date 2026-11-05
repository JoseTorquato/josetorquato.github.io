/* Só Kombi · prévia — reveal, contadores, "aberto agora" pelo horário do Google e mapa sob clique. Zero dependências. */
(() => {
  const D = document, rm = matchMedia('(prefers-reduced-motion: reduce)').matches
  D.documentElement.classList.add('js')
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
  D.querySelectorAll('.reveal').forEach((el, i) => { if (rm) return el.classList.add('in'); el.style.transitionDelay = (i % 4) * 90 + 'ms'; io.observe(el) })

  const fmt = (v, dec) => v.toFixed(dec).replace('.', ',')
  const co = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return
    co.unobserve(e.target)
    const el = e.target, to = +el.dataset.to, dec = +(el.dataset.dec || 0), t0 = performance.now()
    const f = (t) => { const p = Math.min(1, (t - t0) / 1300); el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)), dec); if (p < 1) requestAnimationFrame(f) }
    requestAnimationFrame(f)
  }), { threshold: 0.6 })
  if (!rm) D.querySelectorAll('.count').forEach((el) => { el.textContent = fmt(0, +(el.dataset.dec || 0)); co.observe(el) })

  // horário do Google (minutos desde 0h; Dom=0 … Sáb=6), fuso de Canoas
  const hhmm = (m) => { const h = Math.floor(m / 60), mm = m % 60; return mm ? `${h}h${String(mm).padStart(2, '0')}` : `${h}h` }
  const dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
  try {
    const turnos = JSON.parse(D.body.dataset.horario || '{}')
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]))
    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), agora = (+p.hour) * 60 + (+p.minute)
    D.querySelector(`.horas li[data-dia="${dia}"]`)?.classList.add('hoje')
    const hoje = turnos[dia] || [], aberto = hoje.find(([a, b]) => agora >= a && agora < b)
    let texto
    if (aberto) texto = `Aberto agora · até ${hhmm(aberto[1])}`
    else {
      const prox = hoje.find(([a]) => a > agora)
      if (prox) texto = `Fechado agora · abre hoje às ${hhmm(prox[0])}`
      else { let d2 = dia, n = 0; do { d2 = (d2 + 1) % 7; n++ } while (!(turnos[d2] || []).length && n < 7); texto = `Fechado agora · abre ${n === 1 ? 'amanhã' : dias[d2]} às ${hhmm(turnos[d2][0][0])}` }
    }
    D.querySelectorAll('[data-status]').forEach((b) => { b.classList.add(aberto ? 'aberto' : 'fechado'); const t = b.querySelector('[data-status-text]'); if (t) t.textContent = texto })
  } catch { /* sem Intl: fica o texto do HTML */ }

  const btn = D.querySelector('[data-mapa]')
  if (btn) btn.addEventListener('click', () => {
    const f = D.createElement('iframe')
    f.title = 'Mapa da Só Kombi'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'
    f.src = 'https://www.google.com/maps?q=' + encodeURIComponent('Oficina Mecânica Especializada Só Kombi, R. Barão de Mauá, 2020, Canoas RS') + '&output=embed'
    btn.replaceWith(f)
  })
})()
