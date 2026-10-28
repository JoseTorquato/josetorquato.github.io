# SPEC.md — Barbearia Los Hermanos (site mockup estático one-page)

Entrega: HTML + CSS (+ JS mínimo). **Sem** framework pesado. Deploy estático na Vercel em `josetorquato.dev/los-hermanos`.

Leia `DESIGN.md` + prints em `./refs/`. Dados: `/workspace/los-hermanos-pesquisa.md`, CSV rank 3, e achados confirmados Instagram/Linktree. **Nunca inventar** preço, avaliação, telefone, endereço, horário. Incerteza → `[CONFIRMAR]`.

---

## 1. Dados do negócio

| Campo | Valor | Status |
| --- | --- | --- |
| Nome | Barbearia Los Hermanos | OK |
| Instagram | https://www.instagram.com/barbearialoshermanosoficial/ · `@barbearialoshermanosoficial` | **Confirmado** (prints + meta) |
| Linktree | https://linktr.ee/LosHermanosOficial · `@LosHermanosOficial` | **Confirmado** (`refs/linktree.png`) |
| Bio Instagram (essência) | Aqui nós elevamos tua autoestima | OK (marca) |
| Slogan Linktree | Atendimento sem fila, simples e organizado. | OK |
| Plano | **Clube Hermanos** — mensalidade, cortes ilimitados, desconto em produtos | Nome OK; **valor `[CONFIRMAR]`** |
| Agenda | **BestBarbers** https://agendamentos.bestbarbers.app/barbershop/loshermanosltda | OK (Linktree “Agende agora, sem fila”) |
| Agenda antiga (pesquisa) | Cashbarber `cashbarber.com.br/loshermanosbarbearia` | **Substituído** — não usar no mockup; anotar só como histórico |
| App iOS | Link no Linktree “Baixe nosso App (ios)” | URL **`[CONFIRMAR]`** |
| App Android | Link no Linktree “Baixe nosso App (Android)” | URL **`[CONFIRMAR]`** |
| WhatsApp | `https://wa.me/5551989343126` (Linktree) = (51) 98934-3126 (pesquisa/CSV) | **Batem** — usar este nos CTAs |
| Facebook | https://www.facebook.com/BarbaeCabeloeBigode/ | OK (pesquisa); ícone no Linktree |
| TikTok | Existe (ícone Linktree) | URL **`[CONFIRMAR]`** |
| YouTube | Existe (ícone Linktree) | URL **`[CONFIRMAR]`** |
| Bairro / cidade | Harmonia, Canoas/RS · CEP 92325-422 | OK |
| Endereço Maps/Exa | R. Dona Maria Isabel, **109** | Preferir UI + `[CONFIRMAR]` |
| Endereço CNPJ | Rua Dona Maria Isabel, **128** | Divergência + `[CONFIRMAR]` |
| Coords ≈ | -29.906685, -51.223219 | OK |
| E-mail | barbeariarochacanoas@outlook.com | OK (pesquisa) |
| CNPJ | LOS HERMANOS BARBEARIA LTDA — 58.640.091/0001-00 | OK |
| Nota | **5,0** · **372** avaliações | OK (Exa; disclaimer) |
| Maps | link CSV / pesquisa | OK |
| Horário | tabela abaixo (Exa) | OK; não revalidado UI Maps — opcional `[CONFIRMAR]` |
| Preços serviços | — | **`[CONFIRMAR]`** / sem tabela pública |
| Desde | 2017 | OK (marca) |

### Horário (Exa Place Library)

| Dia | Horário |
| --- | --- |
| Segunda | 14h–19h30 |
| Terça–sexta | 9h30–12h e 13h–19h30 |
| Sábado | 9h–12h e 13h–19h |
| Domingo | Fechado |

### WhatsApp `wa.me` (confirmado Linktree = pesquisa)

Base: `https://wa.me/5551989343126?text=` + encodeURIComponent:

1. **Geral / FAB:** `Olá! Quero agendar um horário na Barbearia Los Hermanos.`
2. **Serviços:** `Olá! Quero consultar serviços e horários na Los Hermanos.`
3. **Clube Hermanos:** `Olá! Quero saber sobre o Clube Hermanos (assinatura).`
4. **Preço:** `Olá! Quero saber os valores dos serviços da Los Hermanos.`

Não contatar ninguém nesta tarefa — só hrefs no HTML.

---

## 2. Stack e deploy

- `index.html`, `styles.css` (+ `script.js` mínimo se precisar)
- Caminhos relativos ou `basePath` `/los-hermanos` → `https://josetorquato.dev/los-hermanos`
- Assets em `./assets/`; refs de design em `./refs/` (não precisa servir os prints no site final)
- `lang="pt-BR"`; favicon = emblema tesoura+bigode
- Agenda = **BestBarbers** (não Cashbarber)

---

## 3. SEO local

**Title:** `Barbearia Los Hermanos | Harmonia, Canoas/RS`

**Meta description:**  
`Barbearia em Harmonia, Canoas — nota 5,0. Aqui nós elevamos tua autoestima. Corte, barba e Clube Hermanos. Agende sem fila ou chama no WhatsApp (51) 98934-3126.`

- `canonical`: `https://josetorquato.dev/los-hermanos/`
- OG: title/description, `og:locale=pt_BR`, imagem logo emblema
- `theme-color`: `#0A0A0A`

### JSON-LD BarberShop

```json
{
  "@context": "https://schema.org",
  "@type": "BarberShop",
  "name": "Barbearia Los Hermanos",
  "description": "Aqui nós elevamos tua autoestima. Atendimento sem fila, simples e organizado. Harmonia, Canoas/RS.",
  "url": "https://josetorquato.dev/los-hermanos/",
  "telephone": "+55-51-98934-3126",
  "email": "barbeariarochacanoas@outlook.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Dona Maria Isabel, 109",
    "addressLocality": "Canoas",
    "addressRegion": "RS",
    "postalCode": "92325-422",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -29.906685,
    "longitude": -51.223219
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "14:00", "closes": "19:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday","Wednesday","Thursday","Friday"], "opens": "09:30", "closes": "12:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday","Wednesday","Thursday","Friday"], "opens": "13:00", "closes": "19:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "12:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "13:00", "closes": "19:00" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "372",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.instagram.com/barbearialoshermanosoficial/",
    "https://linktr.ee/LosHermanosOficial",
    "https://www.facebook.com/BarbaeCabeloeBigode/",
    "https://agendamentos.bestbarbers.app/barbershop/loshermanosltda"
  ]
}
```

- `streetAddress` **109** + nota HTML da divergência **128** `[CONFIRMAR]`
- TikTok/YouTube no `sameAs` só depois de `[CONFIRMAR]` as URLs
- Disclaimer visual da nota agregada (Exa / Maps-derived)

---

## 4. Tom de copy (marca)

Gaúcho direto, dor → economia → autoestima. Frases-base reais:

- Bio: **Aqui nós elevamos tua autoestima**
- Linktree: **Atendimento sem fila, simples e organizado.**
- Clube (feed): **Tu paga uma vez no mês. Usa quantas vezes precisar. Fica sempre no padrão. Sem peso no bolso e sem surpresa no final do mês.**
- Dor (arte): *Tu tá gastando mais do que imagina com barbearia…*
- CTA informal ok: “chama no Zap”, “chama no direct”, “agende sem fila”
- Evitar corporativês de franquia; evitar review da enchente

---

## 5. Estrutura da página + textos pt-BR

### 0) Header

- Emblema + **LOS HERMANOS** (serifa)
- Âncoras: Serviços · Clube · Avaliações · Onde estamos
- Botão verde: **Agendar no WhatsApp**
- Link: **Agendar online** → BestBarbers (`rel="noopener noreferrer"`)

### 1) Hero

- Eyebrow: `DESDE 2017 · HARMONIA, CANOAS/RS`
- H1 (sugestão, editável — eco marca): `Aqui nós elevamos tua autoestima.`  
  (alternativa com dor/laranja: `Tu tá gastando mais do que imagina com barbearia.` — escolher uma; a bio é mais institucional pro hero)
- Sub: `Barbearia em Harmonia, Canoas — nota 5,0. Atendimento sem fila, simples e organizado. Corte, barba e Clube Hermanos.`
- CTA primário: `Agendar no WhatsApp`
- CTA secundário: `Agendar online` → BestBarbers
- Terciário âncora: `Ver localização` → `#onde`

### 2) Prova social

- `5,0` · `372 avaliações` + disclaimer Exa/Maps-derived
- Toque laranja no número/estrela ok

### 3) Serviços (SEM preço)

| Card | Título | Blurb |
| --- | --- | --- |
| 1 | Corte | Corte masculino no teu padrão. |
| 2 | Barba | Acabamento e cuidado com a barba. |
| 3 | Combo | Corte + barba no mesmo atendimento. |
| 4 | Outros | Chama no Zap e confere o que tá rolando no salão. |

Preço: `Valor: [CONFIRMAR]` ou só `Consulta no WhatsApp` → wa.me msg 2/4.

### 4) Clube Hermanos

- H2: `Clube Hermanos` (laranja / badge)
- Lead: `Tu paga uma vez no mês. Usa quantas vezes precisar. Fica sempre no padrão. Sem peso no bolso e sem surpresa no final do mês.`
- Bullets confirmados pela marca/feed:
  - Mensalidade (valor `[CONFIRMAR]`)
  - Cortes ilimitados
  - Desconto em produtos
- Micro: `Mais estilo, menos dor de cabeça.` / `Em vez de rasgar dinheiro pagando corte toda vez…` (eco legenda — usar com parcimônia)
- CTAs: `Quero o Clube Hermanos` → Zap msg 3 · opcional BestBarbers/Linktree
- **Não** inventar preço mensal

### 5) Por que a Los Hermanos (opcional)

- Sem fila, simples e organizado
- Rápido / sem enrolação (reviews)
- Ambiente top (reviews + fotos tijolo)
- Clube Hermanos pra ficar sempre no padrão

### 6) Avaliações (só trechos da pesquisa)

3–4 destes; atribuição “Google / via agregador Exa”; **sem** review da enchente:

1. Ótimo atendimento e corte top… sem enrolação… — 5/5 · 2025-06-27  
2. …clube de assinatura… Nota 10! — 5/5 · 2025-05-10 (encurtar fiel)  
3. Super indico atendimento top… — 5/5 · 2025-03-22  
4. …profissionalismo excelente Virei cliente… — 5/5 · 2025-03-20  
5. …planos de assinatura valem super a Pena! — 5/5 · 2025-03-07  
6. Atendimento impecável, ambiente top… — 5/5 · 2024-11-02  

### 7) Galeria — direção de foto

Placeholders / alts descrevendo:

- Interior: **tijolo branco**, **cadeiras pretas**, espelhos, **luz quente**
- Cortes e detalhes em **P&B**
- Caption: `Espaço Los Hermanos — substituir por fotos reais do salão`
- Mood: `refs/instagram-grid-*.png`, `instagram-profile-top.png`

### 8) Onde estamos

- `R. Dona Maria Isabel, 109 — Harmonia, Canoas/RS · CEP 92325-422`
- Nota: `Endereço: [CONFIRMAR] — divergência Maps/agregadores 109 · CNPJ 128 (mesma rua/CEP).`
- Embed Maps + tabela horário
- Botões: WhatsApp + BestBarbers

### 9) FAQ

| Pergunta | Resposta |
| --- | --- |
| Precisa agendar? | Sim — BestBarbers (“Agende agora, sem fila”) ou WhatsApp. |
| O que é o Clube Hermanos? | Assinatura mensal: cortes ilimitados e desconto em produtos. Valor: `[CONFIRMAR]` no Zap. |
| Quais os preços? | Sem tabela inventada aqui. Pede os valores atuais no WhatsApp: `[CONFIRMAR]`. |
| Tem app? | Sim (iOS e Android no Linktree). Links das stores: `[CONFIRMAR]`. |
| Onde fica? | Harmonia, Canoas — R. Dona Maria Isabel. Número: `[CONFIRMAR]` (109 vs 128). |
| Redes? | Instagram e Linktree confirmados. TikTok, Facebook, YouTube: ícones no Linktree — URLs TikTok/YouTube `[CONFIRMAR]`. |

### 10) Rodapé

- Barbearia Los Hermanos · Harmonia, Canoas · Desde 2017
- WhatsApp (51) 98934-3126 · wa.me/5551989343126
- Instagram `@barbearialoshermanosoficial` · Linktree
- Facebook (URL pesquisa)
- TikTok / YouTube: ícones com href `#` ou omitidos até `[CONFIRMAR]` URL
- BestBarbers · Apps `[CONFIRMAR]`
- `Mockup · josetorquato.dev/los-hermanos`

### 11) FAB WhatsApp

- Verde; mensagem 1; `aria-label="Agendar no WhatsApp"`

---

## 6. Acessibilidade

- Semântica `header` / `main` / `section` / `footer` / `nav`
- Contraste DESIGN.md; foco visível; skip link
- Alt no emblema: `Barbearia Los Hermanos`
- Mapa: título no iframe + link “Abrir no Google Maps”
- `prefers-reduced-motion`

---

## 7. Checklist de aceite

- [ ] One-page em `/los-hermanos` sem 404 de assets
- [ ] Paleta preto `#0A0A0A` + laranja `#F26A0F` + cinzas; verde só no Zap
- [ ] Tipografia condensada caixa alta (Bebas/Oswald); **sem** “Los” script; logo emblema + serifa
- [ ] Visual alinhado a `./refs/` (Instagram/Linktree)
- [ ] Hero com tom da marca (autoestima / sem fila)
- [ ] Prova social 5,0 / 372 + disclaimer
- [ ] Serviços sem preço inventado
- [ ] Bloco **Clube Hermanos** com benefícios reais; valor `[CONFIRMAR]`
- [ ] Reviews só da pesquisa (sem enchente)
- [ ] Endereço 109 + nota 128 `[CONFIRMAR]`
- [ ] Horário Exa
- [ ] Mapa + FAB Zap `wa.me/5551989343126`
- [ ] Agenda = **BestBarbers** (não Cashbarber)
- [ ] Instagram + Linktree no rodapé (confirmados)
- [ ] TikTok / YouTube / Apps stores: `[CONFIRMAR]` URLs
- [ ] Title, meta, JSON-LD BarberShop
- [ ] Mobile-first + a11y foco
- [ ] Nada inventado; ninguém contatado

---

## 8. Fora de escopo

- Contatar a loja / clientes
- Publicar domínio da barbearia
- Inventar preços ou URLs de app/TikTok/YouTube
- Usar Cashbarber como agenda atual
- Confundir com Hermanos (Igara) ou Cruzeiro do Sul

---

*Spec · pesquisa + Instagram/Linktree (`./refs/`) · 27/10/2026 (America/Sao_Paulo).*
