// Gera a prévia do Felipe Albuquerque a partir de imoveis.json: home + uma página por imóvel.
// uso (na raiz do repositório): node brief/felipe-albuquerque/gerar.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
const RAIZ = join(AQUI, '..', '..')
const SAIDA = join(RAIZ, 'public', 'previa', 'felipe-albuquerque')
const BASE = '/previa/felipe-albuquerque/'
const URL_BASE = 'https://josetorquato.dev' + BASE
const { corretor: C, imoveis: IM } = JSON.parse(readFileSync(join(AQUI, 'imoveis.json'), 'utf8'))
const COLETA = '05/11/2026'

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const brl = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v)
const curto = (v) => v >= 1e6 ? `R$ ${(v / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} mi` : `R$ ${Math.round(v / 1e3)} mil`
const preco = (i) => i.preco ? brl(i.preco) : 'Valor sob consulta'
const onde = (i) => i.bairro ? `${i.bairro} · Canoas` : 'Canoas'
const foto = (i, n, w) => `${BASE}fotos/${i.cod.toLowerCase()}-${String(n).padStart(2, '0')}-${w}.webp`
const dataPost = { DV1Xa7Fjx6j: '03/2026', DVO5QHXoMu9: '02/2026', DVO6f2bDNwr: '02/2026', DbWYah2mjMx: '07/2026', Dbvz1aZGvHc: '08/2026', Dbv3luAGi0M: '08/2026', Db3qOmmmmyr: '08/2026' }
const wa = (texto) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(texto)}`
const ICO = {
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>',
  area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 4h16v16H4zM4 9h5V4M20 15h-5v5"/></svg>',
  cama: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 15h18M7 10V7h4v3"/></svg>',
  banho: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 4 0"/></svg>',
  carro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM7 13h.01M17 13h.01"/></svg>',
}
const specs = (i) => [
  i.area && `<li>${ICO.area}${i.area} m²</li>`,
  i.dormitorios && `<li>${ICO.cama}${i.dormitorios} dorm.</li>`,
  i.suites && `<li>${ICO.banho}${i.suites} ${i.suites === 1 ? 'suíte' : 'suítes'}</li>`,
  i.vagas && `<li>${ICO.carro}${i.vagas} ${i.vagas === 1 ? 'vaga' : 'vagas'}</li>`,
].filter(Boolean).join('')

const head = ({ titulo, desc, preload, ld, canonical }) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}" />
<meta name="robots" content="noindex, nofollow" />
${canonical ? `<link rel="canonical" href="${canonical}" />` : ''}
<meta property="og:title" content="${esc(titulo)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:image" content="${esc(preload ? 'https://josetorquato.dev' + preload : '')}" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
${preload ? `<link rel="preload" as="image" href="${preload}" fetchpriority="high" />` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${BASE}styles.css" />
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x).replace(/</g, '\\u003c')}</script>`).join('\n')}
</head>
<body>
<p class="faixa">Prévia para aprovação — não é o site publicado.</p>
<header class="top"><div class="wrap">
  <a class="marca" href="${BASE}"><img class="avatar" src="${BASE}fotos/felipe-avatar.webp" width="40" height="40" alt="" /><span><b>${esc(C.nome)}</b><small>${esc(C.titulo)} · CRECI ${esc(C.creci)}</small></span></a>
  <nav aria-label="Principal"><a class="link" href="${BASE}#imoveis">Imóveis</a><a class="link" href="${BASE}#sobre">Sobre</a><a class="btn btn-wa" href="${wa('Olá, Felipe! Vi o seu site e quero falar sobre imóveis.')}" target="_blank" rel="noopener" aria-label="Falar com o Felipe no WhatsApp">${ICO.wa}<span class="txt">WhatsApp</span></a></nav>
</div></header>`

const rodape = `<footer><div class="wrap">
  <p><strong>${esc(C.nome)}</strong> · ${esc(C.titulo)} · <strong>CRECI ${esc(C.creci)}</strong></p>
  <p>${esc(C.escritorio)} · <a href="${C.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${C.maps}" target="_blank" rel="noopener">Google</a></p>
  <p>Prévia feita por José Torquato para apresentação. Fotos e descrições: Instagram ${esc(C.instagram.replace('https://www.instagram.com/', '@').replace(/\/$/, ''))}, coletados em ${COLETA}. Valores e disponibilidade sujeitos a confirmação.</p>
</div></footer>
<a class="flutuante" href="${wa('Olá, Felipe! Vi o seu site e quero falar sobre imóveis.')}" target="_blank" rel="noopener" aria-label="Falar com o Felipe no WhatsApp">${ICO.wa}</a>
<script src="${BASE}main.js" defer></script>
</body>
</html>
`

const card = (i, h = 'h3') => `<a class="card reveal" href="${BASE}imoveis/${i.slug}/" data-bairro="${esc(i.bairro || 'Canoas')}" data-preco="${i.preco || 0}">
  <figure><img src="${foto(i, i.capa, 720)}" srcset="${foto(i, i.capa, 400)} 400w, ${foto(i, i.capa, 720)} 720w" sizes="(min-width: 900px) 33vw, 100vw" width="720" height="540" loading="lazy" alt="${esc(`${i.titulo}, ${onde(i)}`)}" /><span class="selo">${esc(i.tipo)}</span></figure>
  <div class="corpo"><p class="onde">${esc(onde(i))}</p><${h}>${esc(i.titulo)}</${h}><p class="preco">${esc(preco(i))}</p><ul class="specs">${specs(i)}</ul></div>
</a>`

const agente = {
  '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: `${C.nome} — ${C.titulo}`, url: URL_BASE,
  description: `${C.titulo} em Canoas/RS. CRECI ${C.creci}.`, telephone: '+55-51-98299-3404',
  address: { '@type': 'PostalAddress', streetAddress: 'Rua Sete Povos, 330, sala 803', addressLocality: 'Canoas', addressRegion: 'RS', addressCountry: 'BR' },
  image: 'https://josetorquato.dev' + BASE + 'fotos/felipe-retrato.webp',
  areaServed: { '@type': 'City', name: 'Canoas' }, identifier: { '@type': 'PropertyValue', name: 'CRECI', value: C.creci },
  sameAs: [C.instagram, C.instagram2, C.maps],
}

// ---------- home ----------
const comPreco = IM.filter((i) => i.preco).map((i) => i.preco)
const bairros = [...new Set(IM.map((i) => i.bairro).filter(Boolean))]
const heroImg = IM.find((i) => i.cod === 'MON-01')
const home = head({
  titulo: 'Felipe Albuquerque | Corretor de Imóveis em Canoas',
  desc: `Casas e sobrados à venda em Canoas com o corretor Felipe Albuquerque (CRECI ${C.creci}): Igara, São José, Mont Serrat, Bela Vista e Moinhos de Vento.`,
  preload: foto(heroImg, heroImg.capa, 1080), ld: [agente], canonical: URL_BASE,
}) + `
<main>
<section class="hero" aria-label="Apresentação" style="padding:0">
  <div class="hero-foto"><img src="${foto(heroImg, heroImg.capa, 1080)}" srcset="${foto(heroImg, heroImg.capa, 720)} 720w, ${foto(heroImg, heroImg.capa, 1080)} 1080w" sizes="100vw" width="1080" height="810" alt="Sobrado com piscina aquecida no Mont Serrat, Canoas" fetchpriority="high" /></div>
  <div class="hero-veu" aria-hidden="true"></div>
  <div class="wrap">
    <p class="rotulo">Corretor de imóveis em Canoas</p>
    <h1>O imóvel certo, no <em>bairro certo</em>, com quem conhece Canoas.</h1>
    <p class="sub">${esc(C.bio)} Casas e sobrados selecionados no Igara, São José, Mont Serrat, Bela Vista e Moinhos de Vento.</p>
    <div class="acoes"><a class="btn btn-wa" href="${wa('Olá, Felipe! Estou procurando um imóvel em Canoas.')}" target="_blank" rel="noopener">${ICO.wa}Falar com o Felipe</a><a class="btn btn-fio" href="#imoveis">Ver imóveis</a></div>
    <p class="corretor-chip"><img class="avatar" src="${BASE}fotos/felipe-avatar.webp" width="52" height="52" alt="" /><span><b>${esc(C.nome)}</b> · CRECI ${esc(C.creci)}<br />Escritório no Marechal Rondon, Canoas</span></p>
  </div>
</section>

<div class="fatos"><ul class="wrap">
  <li class="reveal"><b>${IM.length}</b><span>imóveis em destaque</span></li>
  <li class="reveal"><b>${bairros.length}</b><span>bairros de Canoas</span></li>
  <li class="reveal"><b>${curto(Math.min(...comPreco))}</b><span>a partir de</span></li>
  <li class="reveal"><b>${curto(Math.max(...comPreco))}</b><span>até</span></li>
</ul></div>

<section id="imoveis" aria-labelledby="t-imoveis"><div class="wrap">
  <div class="cab reveal"><p class="rotulo">À venda</p><h2 id="t-imoveis">Imóveis selecionados</h2><p>Cada imóvel tem a sua página, com fotos, ficha completa e o botão para falar direto comigo sobre ele.</p></div>
  <div class="filtros" role="group" aria-label="Filtrar imóveis">
    <button class="chip" type="button" data-filtro="todos:" aria-pressed="true">Todos</button>
    ${bairros.map((b) => `<button class="chip" type="button" data-filtro="bairro:${esc(b)}" aria-pressed="false">${esc(b)}</button>`).join('\n    ')}
    <button class="chip" type="button" data-filtro="ate:1000000" aria-pressed="false">Até R$ 1 mi</button>
    <button class="chip" type="button" data-filtro="acima:1000000" aria-pressed="false">Acima de R$ 1 mi</button>
  </div>
  <p class="contagem" data-contagem aria-live="polite">${IM.length} imóveis</p>
  <div class="grade">
${IM.map((i) => card(i)).join('\n')}
  </div>
</div></section>

<section aria-labelledby="t-como" style="background:var(--branco);border-block:1px solid var(--linha)"><div class="wrap">
  <div class="cab reveal"><p class="rotulo">Como eu trabalho</p><h2 id="t-como">Da primeira conversa à entrega das chaves</h2><p style="font-size:13px">Texto de exemplo — ajustamos com você.</p></div>
  <ol class="passos">
    <li class="reveal"><h3>Você conta o que procura</h3><p>Bairro, tamanho, quantos quartos e quanto quer investir.</p></li>
    <li class="reveal"><h3>Eu seleciono</h3><p>Só as oportunidades que fazem sentido para você, sem perder seu tempo.</p></li>
    <li class="reveal"><h3>Visitas no seu horário</h3><p>Agendadas pelo WhatsApp, com tudo o que precisa saber antes.</p></li>
    <li class="reveal"><h3>Proposta e documentação</h3><p>Acompanho a negociação, o financiamento quando o imóvel aceita e a papelada.</p></li>
  </ol>
</div></section>

<section id="sobre" class="sobre" aria-labelledby="t-sobre"><div class="wrap">
  <figure class="retrato reveal"><img src="${BASE}fotos/felipe-retrato.webp" width="360" height="450" loading="lazy" alt="Felipe Albuquerque em frente a um sobrado à venda em Canoas" /><figcaption>Felipe em um dos imóveis que apresenta no Instagram</figcaption></figure>
  <div class="reveal">
    <p class="rotulo">Sobre</p>
    <h2 id="t-sobre" style="margin:14px 0 18px">Felipe Albuquerque</h2>
    <p>Corretor de imóveis em Canoas, com escritório no Marechal Rondon. Visita cada imóvel, mostra os detalhes em vídeo no Instagram e acompanha o cliente até a entrega das chaves.</p>
    <p style="margin-top:22px"><a class="btn btn-fio" href="${C.instagram}" target="_blank" rel="noopener">Ver no Instagram</a></p>
  </div>
  <div class="ficha reveal" style="grid-column:1 / -1">
    <p><b>CRECI</b> ${esc(C.creci)}</p>
    <p><b>Escritório</b> ${esc(C.escritorio)}</p>
    <p><b>Atendimento</b> pelo WhatsApp, com visitas agendadas</p>
    <p><b>Quer vender o seu imóvel?</b> <a href="${wa('Olá, Felipe! Quero vender um imóvel.')}" target="_blank" rel="noopener">Fale comigo</a></p>
  </div>
</div></section>

<section class="faq" aria-labelledby="t-faq"><div class="wrap">
  <div class="cab reveal"><p class="rotulo">Perguntas</p><h2 id="t-faq">Antes da visita</h2></div>
  <details><summary>Os imóveis aceitam financiamento?</summary><p>Depende do imóvel. Alguns aceitam financiamento bancário e outros avaliam o seu imóvel como parte do pagamento — isso aparece na página de cada um. Na dúvida, pergunte pelo WhatsApp.</p></details>
  <details><summary>Como agendo uma visita?</summary><p>Pelo WhatsApp, com o código do imóvel (ele está na página de cada um). Eu combino o melhor horário com você.</p></details>
  <details><summary>Os valores estão atualizados?</summary><p>São os valores divulgados no Instagram. Preço e disponibilidade podem mudar: confirmo na hora em que você chamar.</p></details>
  <details><summary>Onde fica o escritório?</summary><p>${esc(C.escritorio)}.</p></details>
</div></section>

<section class="fim" aria-labelledby="t-fim"><div class="wrap">
  <h2 id="t-fim">Me conta o que você procura.</h2>
  <p>Eu separo os imóveis que combinam com você e te mando pelo WhatsApp.</p>
  <a class="btn btn-wa" href="${wa('Olá, Felipe! Estou procurando um imóvel em Canoas.')}" target="_blank" rel="noopener">${ICO.wa}Falar com o Felipe</a>
</div></section>
</main>
` + rodape

mkdirSync(SAIDA, { recursive: true })
writeFileSync(join(SAIDA, 'index.html'), home)

// ---------- uma página por imóvel ----------
for (const i of IM) {
  const base = `${i.titulo} ${i.bairro ? `no ${i.bairro}` : 'em Canoas'}`
  const titulo = (base + ' | Felipe Albuquerque').length <= 65 ? base + ' | Felipe Albuquerque' : base
  const desc = `${i.tipo} à venda${i.bairro ? ` no ${i.bairro}` : ''}, Canoas: ${[i.area && `${i.area} m²`, i.dormitorios && `${i.dormitorios} dormitórios`, i.suites && `${i.suites} ${i.suites === 1 ? 'suíte' : 'suítes'}`, i.vagas && `${i.vagas} vagas`].filter(Boolean).join(', ')}. ${preco(i)}. CRECI ${C.creci}.`
  const n = i.fotos, ordem = [i.capa, ...Array.from({ length: n }, (_, k) => k + 1).filter((k) => k !== i.capa)]
  const visiveis = ordem.slice(0, 5)
  const outros = IM.filter((x) => x.cod !== i.cod).sort((a, b) => (b.bairro === i.bairro) - (a.bairro === i.bairro) || Math.abs((a.preco || 1e6) - (i.preco || 1e6)) - Math.abs((b.preco || 1e6) - (i.preco || 1e6))).slice(0, 3)
  const msg = `Olá, Felipe! Vi no site o imóvel ${i.cod} (${i.titulo}${i.bairro ? ` no ${i.bairro}` : ''}) e quero mais informações.`
  const anuncio = {
    '@context': 'https://schema.org', '@type': 'RealEstateListing', name: `${i.titulo}${i.bairro ? ` no ${i.bairro}` : ''}, Canoas`,
    url: `${URL_BASE}imoveis/${i.slug}/`, description: i.resumo, image: visiveis.map((k) => 'https://josetorquato.dev' + foto(i, k, 1080)),
    ...(i.preco ? { offers: { '@type': 'Offer', price: i.preco, priceCurrency: 'BRL', availability: 'https://schema.org/InStock' } } : {}),
    mainEntity: { '@type': 'SingleFamilyResidence', ...(i.area ? { floorSize: { '@type': 'QuantitativeValue', value: i.area, unitCode: 'MTK' } } : {}), ...(i.dormitorios ? { numberOfBedrooms: i.dormitorios } : {}), address: { '@type': 'PostalAddress', addressLocality: 'Canoas', addressRegion: 'RS', addressCountry: 'BR', ...(i.bairro ? { streetAddress: `Bairro ${i.bairro}` } : {}) } },
    provider: { '@type': 'RealEstateAgent', name: `${C.nome} — ${C.titulo}`, identifier: { '@type': 'PropertyValue', name: 'CRECI', value: C.creci } },
  }
  const trilha = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Imóveis', item: URL_BASE }, { '@type': 'ListItem', position: 2, name: i.titulo, item: `${URL_BASE}imoveis/${i.slug}/` }] }
  const pagina = head({ titulo, desc, preload: foto(i, i.capa, 1080), ld: [anuncio, trilha, agente], canonical: `${URL_BASE}imoveis/${i.slug}/` }) + `
<main>
<div class="wrap">
  <p class="trilha"><a href="${BASE}#imoveis">Imóveis</a> › ${esc(onde(i))} › ${esc(i.cod)}</p>
  <div class="im-cab"><p class="rotulo">${esc(i.tipo)} · ${esc(onde(i))}</p><h1>${esc(i.titulo)}${i.bairro ? ` no ${esc(i.bairro)}` : ''}</h1></div>
  <div class="galeria">
    ${visiveis.map((k, j) => `<button type="button" data-foto="${foto(i, k, 1080)}" aria-label="Abrir foto ${j + 1} de ${n} em tela cheia"><img src="${foto(i, k, j === 0 ? 1080 : 720)}"${j === 0 ? ` srcset="${foto(i, k, 720)} 720w, ${foto(i, k, 1080)} 1080w" sizes="(min-width: 900px) 60vw, 100vw" fetchpriority="high"` : ' loading="lazy"'} width="${j === 0 ? 1080 : 720}" height="${j === 0 ? 810 : 540}" alt="${esc(`${i.titulo}${i.bairro ? ` no ${i.bairro}` : ''}, foto ${j + 1}`)}" />${j === visiveis.length - 1 && n > visiveis.length ? `<span class="mais">+${n - visiveis.length} fotos</span>` : ''}</button>`).join('\n    ')}
    ${ordem.slice(5).map((k, j) => `<button type="button" data-foto="${foto(i, k, 1080)}" hidden aria-label="Foto ${j + 6} de ${n}"><img alt="${esc(`${i.titulo}, foto ${j + 6}`)}" /></button>`).join('')}
  </div>
  ${i.ilustrativas ? '<p class="aviso-foto">Imagens ilustrativas do projeto, conforme divulgado pelo corretor.</p>' : ''}
  <div class="im-grade">
    <div class="im-texto">
      <dl class="ficha-tec">
        ${[i.area && ['Área construída', `${i.area} m²`], i.terreno && ['Terreno', i.terreno], i.dormitorios && ['Dormitórios', i.dormitorios], i.suites && ['Suítes', i.suites], i.vagas && ['Vagas', i.vagas], ['Bairro', i.bairro || 'Canoas']].filter(Boolean).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}
      </dl>
      <p class="lead">${esc(i.resumo)}</p>
      <div><h2>Destaques</h2><ul class="lista-check" style="margin-top:14px">${i.destaques.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></div>
      ${i.entrega ? `<p><strong>${esc(i.entrega)}.</strong></p>` : ''}
      <div><h2>Localização</h2><p style="margin:10px 0 0;color:var(--cinza)">${esc(onde(i))}. O endereço exato é passado na visita.</p>
        <div class="mapa"><button type="button" data-mapa="${esc(`${i.bairro ? i.bairro + ', ' : ''}Canoas - RS`)}">Ver o bairro no mapa<br /><small>carrega só quando você toca</small></button></div></div>
    </div>
    <aside class="caixa" aria-label="Valor e contato">
      <p class="cod">Código ${esc(i.cod)}</p>
      <p class="valor">${esc(preco(i))}</p>
      ${i.condicoes.length ? `<ul class="lista-check">${i.condicoes.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
      <a class="btn btn-wa" href="${wa(msg)}" target="_blank" rel="noopener">${ICO.wa}Quero saber mais</a>
      <a class="btn btn-fio" href="${wa(`Olá, Felipe! Quero agendar uma visita ao imóvel ${i.cod}.`)}" target="_blank" rel="noopener">Agendar visita</a>
      <small>Anunciado no Instagram em ${dataPost[i.post] || '2026'} · valores e disponibilidade a confirmar. <a href="https://www.instagram.com/p/${i.post}/" target="_blank" rel="noopener">Ver o anúncio original</a>.</small>
      <div class="seu-corretor"><img class="avatar" src="${BASE}fotos/felipe-avatar.webp" width="48" height="48" alt="" /><span><b>${esc(C.nome)}</b><br />Corretor de Imóveis · CRECI ${esc(C.creci)}</span></div>
    </aside>
  </div>
</div>
<section aria-labelledby="t-outros" style="background:var(--branco);border-top:1px solid var(--linha)"><div class="wrap">
  <div class="cab"><p class="rotulo">Veja também</p><h2 id="t-outros">Outros imóveis</h2></div>
  <div class="grade">${outros.map((x) => card(x)).join('\n')}</div>
</div></section>
<dialog class="lb" aria-label="Fotos em tela cheia"><div class="lb-palco"><img alt="" /></div><button class="fechar" type="button" aria-label="Fechar">×</button><button class="ant" type="button" aria-label="Foto anterior">‹</button><button class="prox" type="button" aria-label="Próxima foto">›</button><p class="lb-conta"></p></dialog>
</main>
` + rodape
  const dir = join(SAIDA, 'imoveis', i.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), pagina)
}
console.log(`ok: home + ${IM.length} imóveis em ${SAIDA}`)
