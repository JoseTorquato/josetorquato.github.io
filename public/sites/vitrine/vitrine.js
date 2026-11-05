/* Vitrines de demonstração (negócios fictícios) — movimento leve, zero dependências.
   Conteúdo visível sem JS; tudo respeita prefers-reduced-motion. */
(() => {
  const D = document
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches
  D.documentElement.classList.add('js')

  // 1. Reveal coordenado (um eixo, escalonado em grupos de 4)
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
    { rootMargin: '0px 0px -8% 0px' },
  )
  D.querySelectorAll('.reveal').forEach((el, i) => {
    if (rm) return el.classList.add('in')
    el.style.transitionDelay = (i % 4) * 90 + 'ms'
    io.observe(el)
  })

  // 2. Contadores (o HTML já traz o valor final)
  const fmt = (v, dec) => v.toFixed(dec).replace('.', ',')
  const co = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return
    co.unobserve(e.target)
    const el = e.target, to = +el.dataset.to, dec = +(el.dataset.dec || 0), t0 = performance.now()
    const f = (t) => { const p = Math.min(1, (t - t0) / 1300); el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)), dec); if (p < 1) requestAnimationFrame(f) }
    requestAnimationFrame(f)
  }), { threshold: 0.6 })
  if (!rm) D.querySelectorAll('.count').forEach((el) => { el.textContent = fmt(0, +(el.dataset.dec || 0)); co.observe(el) })

  // 3. "Aberto agora" pelo horário do <body data-horario> (fuso de Canoas). Minutos desde 00:00; Dom=0 … Sáb=6.
  const hhmm = (m) => { if (m >= 1440) return '0h'; const h = Math.floor(m / 60), mm = m % 60; return mm ? `${h}h${String(mm).padStart(2, '0')}` : `${h}h` }
  const dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
  try {
    const turnos = JSON.parse(D.body.dataset.horario || '{}')
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).map((x) => [x.type, x.value]))
    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday)
    const agora = (+p.hour) * 60 + (+p.minute)
    const hoje = D.querySelector(`.hours li[data-dia="${dia}"]`)
    if (hoje) hoje.classList.add('hoje')
    const deHoje = turnos[dia] || []
    const aberto = deHoje.find(([a, b]) => agora >= a && agora < b)
    let texto
    if (aberto) texto = `Aberto agora · até ${hhmm(aberto[1])}`
    else {
      const prox = deHoje.find(([a]) => a > agora)
      if (prox) texto = `Fechado agora · abre hoje às ${hhmm(prox[0])}`
      else {
        let d2 = dia, n = 0
        do { d2 = (d2 + 1) % 7; n++ } while (!(turnos[d2] || []).length && n < 7)
        texto = (turnos[d2] || []).length ? `Fechado agora · abre ${n === 1 ? 'amanhã' : dias[d2]} às ${hhmm(turnos[d2][0][0])}` : 'Fechado agora'
      }
    }
    D.querySelectorAll('[data-status]').forEach((box) => {
      box.classList.add(aberto ? 'aberto' : 'fechado')
      const t = box.querySelector('[data-status-text]')
      if (t) t.textContent = texto
    })
  } catch { /* sem Intl: fica o texto estático do HTML */ }

  // 4. Dentro do celular da página /sites/ (iframe, ?embed=1): sem faixa de demonstração e rolagem automática lenta,
  //    que para de vez no primeiro toque ou rolagem de quem está vendo.
  if (new URLSearchParams(location.search).has('embed')) {
    D.documentElement.classList.add('embed')
    if (!rm) {
      let parado = false, y = 0, ultimo = 0
      const parar = () => { parado = true }
      ;['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((ev) => addEventListener(ev, parar, { passive: true }))
      const passo = (t) => {
        if (parado) return
        if (!ultimo) ultimo = t
        const dt = Math.min(64, t - ultimo); ultimo = t
        const max = D.documentElement.scrollHeight - innerHeight
        y += dt * 0.045
        if (y > max + 900) y = -600                         // pausa no fim e volta ao topo
        scrollTo(0, Math.max(0, Math.min(max, y)))
        requestAnimationFrame(passo)
      }
      let rodando = false
      addEventListener('message', (e) => {
        if (e.origin !== location.origin || e.data !== 'vitrine:play' || parado || rodando) return
        rodando = true
        requestAnimationFrame(passo)
      })
    }
  }
})()
