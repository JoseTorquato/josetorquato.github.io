# DESIGN.md — Barbearia Los Hermanos (mockup one-page)

Voz: gaúcho direto (“tu”, “chama no direct”), dor/economia, autoestima. Público: homens em Harmonia / Canoas. Visual: **preto + laranja de marca**, tipografia condensada caixa alta — a cara do feed Instagram/Linktree, não franquia dourada.

**Refs locais (prints):** pasta `./refs/` — cite e espelhe estes arquivos na implementação.

---

## Conceito em uma frase

Fundo `#0A0A0A`, acento laranja `#F26A0F` nos títulos/destaques, fotos do salão em P&B (tijolo branco, cadeiras pretas, luz quente), CTA verde **só** no WhatsApp — feed Instagram virado one-page.

---

## Referências visuais obrigatórias (prints locais)

| Arquivo | O que extrair |
| --- | --- |
| `refs/instagram-profile-top.png` | Grid do feed, mistura foto interior + artes preto/laranja, logo circular |
| `refs/instagram-grid-2.png` / `instagram-grid-3.png` | Ritmo preto/laranja, headlines caixa alta, interior tijolo |
| `refs/instagram-post-1-clube-carrossel.png` | Arte “Clube” / vantagens; logo tesoura+bigode |
| `refs/instagram-post-2-tu-ta-gastando.png` | Headline laranja + branco; copy Clube Hermanos; watermark do emblema |
| `refs/instagram-post-3-reel-assinatura-pb.png` | Reel assinatura; cortes em close |
| `refs/instagram-post-4-evoluir-parceria.png` | Tom de parceria / evolução (mood) |
| `refs/linktree.png` | Logo emblema P&B; slogan Linktree; ícones redes; botões Agende / Zap / Clube / Apps |

### Refs web (pesquisa + marca confirmada)

- Instagram: https://www.instagram.com/barbearialoshermanosoficial/ **(confirmado)**
- Linktree: https://linktr.ee/LosHermanosOficial **(confirmado)**
- Facebook: https://www.facebook.com/BarbaeCabeloeBigode/
- Agenda BestBarbers: https://agendamentos.bestbarbers.app/barbershop/loshermanosltda
- Blueprint one-page (estrutura, não paleta): https://barbeariastudior.com.br/
- Assinatura em cards (estrutura): https://afonsosbarbearia.com.br/
- Locais RS (estrutura/WhatsApp): https://bartigbarbearia.com.br/ · https://thekingsbarbershop.com.br/

**Nota:** a pesquisa antiga citava logo/CDN **Cashbarber** — agenda real confirmada no Linktree é **BestBarbers**. Não usar Cashbarber no mockup.

---

## Paleta (hex)

| Papel | Hex | Uso |
| --- | --- | --- |
| Fundo | `#0A0A0A` | body, header |
| Superfície | `#2B2B2B` | cards, FAQ, faixas |
| Superfície hover | `#333333` | hover de card |
| Texto | `#FFFFFF` / `#F5F5F5` | corpo e UI |
| Cinza médio | `#8A8A8A` | meta, legendas, horários |
| Cinza borda | `#3A3A3A` | divisores |
| **Acento marca** | `#F26A0F` | títulos-chave, bullets, underlines, labels “Clube”, hover de âncoras |
| Acento hover | `#FF7A24` | hover do laranja |
| CTA WhatsApp | `#25D366` | **somente** botões/FAB Zap |
| CTA Zap hover | `#1EBE57` | |
| Foco a11y | `#FFFFFF` | outline 2–3px no escuro; no laranja usar outline branco |
| Logo fundo | `#FFFFFF` | círculo/emblema preto sobre branco |

**Verde = só WhatsApp.** Não lavar o site de verde.  
**Fotos do salão / cortes:** tratar em **P&B** (ou dessaturar forte) no mockup — alinhado ao feed.  
**Evitar** dourado / vermelho franquia.

---

## Tipografia (Google Fonts)

```
https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Libre+Baskerville:wght@700&display=swap
```

| Papel | Fonte | Peso / estilo | Notas |
| --- | --- | --- | --- |
| Display / headlines | **Bebas Neue** (ou Oswald/Anton) | bold, **CAIXA ALTA** | Hero, H2, artes estilo Insta; tracking apertado (`0.02–0.06em`) |
| Subtítulos / eyebrow | **Oswald** ou **DM Sans** | 400–500, caixa alta, **letter-spacing amplo** (`0.12–0.2em`) | “DESDE 2017”, labels de seção |
| Corpo / UI | **DM Sans** | 400 / 500 / 700 | Parágrafos, botões, nav, tabela |
| Wordmark “LOS HERMANOS” | **Libre Baskerville** (ou serifa display similar) | 700, caixa alta | Só no logo textual ao lado do emblema |

**Remover** Great Vibes / “Los” em script — **não combina** com o emblema real (tesoura em X + bigode).

Escalas: Hero H1 `clamp(2.5rem, 8vw, 4.75rem)`; H2 `clamp(1.75rem, 4vw, 2.75rem)`; corpo `1rem` / lh `1.6`; meta `0.875rem` `#8A8A8A`.

Destaque de palavra no H1: span em `#F26A0F` (como “TU TÁ GASTANDO…” no feed).

---

## Logo

- Emblema: **tesoura aberta em X + bigode** handlebar, preto sobre círculo branco (ver `refs/linktree.png` e avatar Insta)
- Ao lado ou abaixo: **LOS HERMANOS** em serifa bold caixa alta
- Não recriar “Los” script vintage do CDN antigo se conflitar com este emblema
- Header: emblema ~40–48px + wordmark; mobile só emblema + texto curto ok

---

## Layout e componentes (mobile-first)

Breakpoints: 640 / 768 / 1024. Max-width ~1120px.

### Header fixo
- Fundo `#0A0A0A` / blur; emblema + âncoras; botão Zap verde; link texto “Agendar” → BestBarbers
- Hover âncoras: `#F26A0F`

### Hero
- Overlay escuro; foto P&B do interior (tijolo branco / cadeiras pretas / luz quente) ou placeholder nessa direção
- Eyebrow espaçado: `DESDE 2017 · HARMONIA, CANOAS`
- H1 com acento laranja em trecho-chave
- CTAs: Zap (verde) + BestBarbers (ghost branco ou outline laranja)

### Prova social
- `5,0` · `372` avaliações; disclaimer Exa/Maps-derived
- Número ou estrela podem usar toque `#F26A0F`

### Serviços
- Cards `#2B2B2B`, borda sutil; **sem preço** (`[CONFIRMAR]` / consulte no Zap)
- Ícones stroke branco ou laranja

### Clube Hermanos
- Nome confirmado: **Clube Hermanos**
- Benefícios (copy real da marca): mensalidade · cortes ilimitados · desconto em produtos · “fica sempre no padrão”
- Valor: **`[CONFIRMAR]`**
- Label/badge laranja “CLUBE HERMANOS”
- CTA → Zap (assinatura) e/ou BestBarbers / Linktree “Assinar”

### Depoimentos / FAQ / mapa / rodapé
- Como no SPEC; acentos laranja em aspas ou bullets ◆

### FAB WhatsApp
- Só verde `#25D366`; `aria-label`; safe-area

### Direção de foto (placeholders)

Descrever/usar placeholders com:

- Interior: parede **tijolo branco**, **cadeiras pretas** clássicas, espelhos, **luz quente** pontual
- Cortes: close de fade/tesoura em **P&B**
- Evitar stock “barbearia americana” colorida genérica
- Preferir aspect 1:1 ou 4:5 (feed) na galeria

---

## Mobile-first e a11y

- Ordem DOM = ordem mobile; `scroll-margin-top` pro header
- Touch ≥ 44×44; FAB não cobrir CTA final
- `:focus-visible { outline: 2px solid #FFF; outline-offset: 3px }`
- Contraste: branco em `#0A0A0A` / `#2B2B2B` ok; laranja `#F26A0F` em preto ok pra títulos grandes — em texto miúdo preferir branco
- Botão Zap: texto `#0A0A0A` no verde (melhor contraste)
- `prefers-reduced-motion`

---

## Tom visual — evitar

- Script “Los” ornamental
- Cashbarber / links antigos de agenda
- Dourado, vermelho “mafia”, overload de franquia
- Verde fora do Zap
- História da enchente no layout

---

*Base: pesquisa + prints `./refs/` (Instagram/Linktree) · 27/10/2026. Ninguém contatado.*
