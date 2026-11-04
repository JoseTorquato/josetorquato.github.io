/* Helena burger — movimento nível LEVE (ver brief/helena-burger/PROMPT.md).
   Zero dependências. Conteúdo visível sem JS; tudo respeita prefers-reduced-motion. */
(() => {
  const D = document
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches

  // 1. Reveal coordenado (um eixo, 800ms, escalonado em grupos de 4)
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
    { rootMargin: '0px 0px -8% 0px' },
  )
  D.querySelectorAll('.reveal').forEach((el, i) => {
    if (rm) return el.classList.add('in')
    el.style.transitionDelay = (i % 4) * 90 + 'ms'
    io.observe(el)
  })

  // 2. Contadores da prova social (o HTML já traz o valor final — sem JS, ele aparece)
  const fmt = (v, dec) => v.toFixed(dec).replace('.', ',')
  const co = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return
    co.unobserve(e.target)
    const el = e.target, to = +el.dataset.to, dec = +(el.dataset.dec || 0), t0 = performance.now()
    const f = (t) => { const p = Math.min(1, (t - t0) / 1300); el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)), dec); if (p < 1) requestAnimationFrame(f) }
    requestAnimationFrame(f)
  }), { threshold: 0.6 })
  if (!rm) D.querySelectorAll('.count').forEach((el) => { el.textContent = fmt(0, +(el.dataset.dec || 0)); co.observe(el) })

  // 3. Tilt nos cards (só mouse fino; nunca no toque)
  if (!rm && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    D.querySelectorAll('.tilt').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const b = c.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5
        c.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`
      })
      c.addEventListener('pointerleave', () => { c.style.transform = '' })
    })
  }

  // 4. "Aberto agora" pelo horário real do Google (fuso de Canoas)
  //    Minutos desde 00:00; 24*60 = meia-noite. Dom=0 … Sáb=6.
  const H = (a, b) => [a, b]
  const turnos = {
    0: [H(1140, 1410)],
    1: [H(660, 870), H(1140, 1410)], 2: [H(660, 870), H(1140, 1410)], 3: [H(660, 870), H(1140, 1410)],
    4: [H(660, 870), H(1140, 1380)],
    5: [H(660, 870), H(1140, 1440)], 6: [H(660, 870), H(1140, 1440)],
  }
  const hhmm = (m) => { if (m === 1440) return '0h'; const h = Math.floor(m / 60), mm = m % 60; return mm ? `${h}h${String(mm).padStart(2, '0')}` : `${h}h` }
  const dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
  try {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).map((x) => [x.type, x.value]))
    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday)
    const agora = (+p.hour) * 60 + (+p.minute)
    const box = D.querySelector('[data-status]'), txt = D.querySelector('[data-status-text]')
    const hoje = D.querySelector(`.hours li[data-dia="${dia}"]`)
    if (hoje) { hoje.classList.add('hoje'); hoje.firstElementChild.textContent += ' (hoje)' }
    if (box && txt && dia >= 0) {
      const aberto = turnos[dia].find(([a, b]) => agora >= a && agora < b)
      if (aberto) {
        box.classList.add('aberto'); txt.textContent = `Aberto agora · até ${hhmm(aberto[1])}`
      } else {
        const prox = turnos[dia].find(([a]) => a > agora)
        let quando
        if (prox) quando = `abre hoje às ${hhmm(prox[0])}`
        else { const d2 = (dia + 1) % 7; quando = `abre ${d2 === (dia + 1) % 7 ? 'amanhã' : dias[d2]} às ${hhmm(turnos[d2][0][0])}` }
        box.classList.add('fechado'); txt.textContent = `Fechado agora · ${quando}`
      }
    }
  } catch { /* sem Intl: fica o horário estático do HTML */ }

  // 5. Mapa só sob clique (não pesa o carregamento)
  const btn = D.querySelector('[data-map-load]')
  if (btn) btn.addEventListener('click', () => {
    const f = D.createElement('iframe')
    f.title = 'Mapa da Helena burger'
    f.loading = 'lazy'
    f.referrerPolicy = 'no-referrer-when-downgrade'
    f.src = 'https://www.google.com/maps?q=Helena+burger,+R.+Dr.+Barcelos,+860,+Canoas+RS&output=embed'
    btn.replaceWith(f)
  })
})()
