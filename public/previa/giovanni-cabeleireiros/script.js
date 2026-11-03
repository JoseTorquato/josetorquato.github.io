// Prévia Giovanni Cabeleireiros · "Revista: edição especial, a equipe"
// JS só para: proposta do dono e botão fixo de WhatsApp.

// WhatsApp de quem fez o site (botão "Falar com quem fez" na proposta).
// Vazio = a proposta mostra "Rascunho" e o botão fica desativado.
const AUTOR_WHATSAPP = '5551991913505' // só dígitos, com DDI e DDD

// ---------- Proposta (só para o dono) ----------
const dialog = document.getElementById('proposta')
const abrirProposta = () => { if (!dialog.open) dialog.showModal() }
document.querySelectorAll('[data-abrir-proposta]').forEach((b) => b.addEventListener('click', abrirProposta))
document.querySelectorAll('[data-fechar-proposta]').forEach((b) => b.addEventListener('click', () => dialog.close()))
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close() })
if (location.hash === '#proposta') abrirProposta()
addEventListener('hashchange', () => { if (location.hash === '#proposta') abrirProposta() })

const pendentes = [...document.querySelectorAll('[data-confirmar]')].map((el) => el.dataset.confirmar)

const autorEl = document.querySelector('[data-autor-zap]')
if (AUTOR_WHATSAPP) {
  const msg = encodeURIComponent('Oi! Vi o modelo de site do Giovanni Cabeleireiros e quero conversar.')
  autorEl.href = `https://wa.me/${AUTOR_WHATSAPP}?text=${msg}`
} else {
  autorEl.removeAttribute('href')
  autorEl.setAttribute('aria-disabled', 'true')
  console.warn('Prévia em rascunho: preencha AUTOR_WHATSAPP em script.js antes de enviar ao cliente.')
}
document.querySelector('[data-rascunho]').hidden = Boolean(AUTOR_WHATSAPP)

const lista = document.querySelector('[data-lista-confirmar]')
pendentes.forEach((txt) => { const li = document.createElement('li'); li.textContent = txt; lista.append(li) })
document.querySelector('[data-contagem]').textContent = pendentes.length

// ---------- WhatsApp fixo depois da capa ----------
const zap = document.querySelector('.zap-fixo')
const capa = document.querySelector('.capa')
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => zap.classList.toggle('visivel', !e.isIntersecting)).observe(capa)
} else zap.classList.add('visivel')
