# Referências · Heaven Pilates · nível Premium

Contexto usado para calibrar as três direções: `dna.json` (arquétipo Cuidador
Exigente — acolhimento de Cuidador na relação, rigor de Especialista na
execução; personalidade formalidade 2/5, empatia 5/5, tecnicidade 3/5,
assertividade 4/5; diferencial real: cinco Cadillacs em uso simultâneo,
turmas reduzidas, correção por fisioterapeuta; progressão real
Mat → Reformer → Cadillac do `plano_em_3_passos`); regulação COFFITO Res.
532/2021 (veda promessa de resultado infalível, preço/valor/modalidade de
pagamento/promoção, sensacionalismo, imagem de aluna sem consentimento
documentado — e o acervo colhido não tem esse consentimento, então nenhum
mecanismo abaixo depende de depoimento nominal ou foto de aluna identificada);
acervo real em `raw/assets/` — 15 fotos de estúdio/aula em luz natural, sem
asset 3D nem banco de imagens.

Teto do nível: até 1600 kB, LCP ≤ 2200 ms no 4G, 9–14 seções, **3 técnicas de
movimento** no total. Permitido: tudo do intermediário (CSS/SVG, `clip-path`,
Canvas 2D leve) mais canvas animado e WebGL, sempre abaixo da dobra, carregado
via `IntersectionObserver`, nunca no caminho do LCP, desligado inteiro em
`prefers-reduced-motion`. Proibido: efeito que atrase o primeiro conteúdo;
biblioteca de terceiro via CDN (tudo self-hosted); 3D como demonstração
técnica onde o campo pede contenção; herói de texto sobre cor chapada (a
primeira tela precisa ter mídia real); e deixar sobrar mais de um terço do
teto de peso — o orçamento existe para a imagem grande do herói, não para
economizar.

Os três sites abaixo foram abertos com WebFetch (conversão para markdown, sem
execução de JS nem acesso a CSS computado — é uma limitação real da
ferramenta contra sites de página única fortemente dinâmicos). Onde isso
impediu confirmar um valor exato de animação, digo isso explicitamente e
separo o que é fato observado do que é minha tradução técnica de como
construir um mecanismo equivalente dentro do orçamento do Heaven.

---

## Direção 1 — o setor

**Core Atelier Pilates** — https://coreatelierpilates.com/
(estúdio de Reformer/Cadillac em Singapura, Menção Honrosa Awwwards —
https://www.awwwards.com/sites/core-atelier-pilates)

mecanismo: abri a home e a página `/classes/` diretamente. A oferta é
organizada em quatro modalidades semi-privadas — Reformer, Stability Chair,
Tower & Arc Barrel, e uma quinta chamada "Curated by Core" (inspirada em
omakase: o instrutor escolhe o aparelho do dia) — mais uma trilha de sessão
privada com três tamanhos de turma (individual, dupla, trio). Cada modalidade
recebe seu próprio bloco de foto + 1–2 frases, nunca uma lista corrida. A
página do Awwwards (redigida pelo júri do prêmio, não algo que eu confirmei
no DOM renderizado) descreve duas técnicas específicas: tipografia que muda
de peso/posição conforme a rolagem na seção "Sobre" ("Dynamic Typography with
Scroll Interaction"), e uma seção de aulas onde cada modalidade assume a tela
por vez ("Immersive Scroll Section"). Não consegui confirmar isso no
markup bruto da página `/classes/` — típico de site que renderiza a animação
via JS depois do carregamento, invisível para uma leitura estática — então
trato a existência do efeito como relato do júri, e a tradução de
implementação abaixo como proposta minha, não como cópia de código.
Implementação análoga para o Heaven: um `IntersectionObserver` observando
cada `<section>` de modalidade (Mat, Reformer, Cadillac — a progressão real
do `plano_em_3_passos`); ao entrar na viewport, a seção troca uma classe que
anima `opacity` e `transform: translateY()` da foto e do texto associados
(nunca `top`/`left`/`width`, para não gerar reflow). Zero biblioteca —
~2 kB de JS vanilla.
por que serve: o Heaven tem exatamente essa progressão de aparelho e o mesmo
argumento comercial (turma pequena, correção individual, três Cadillacs em
uso simultâneo) — "uma modalidade assume a tela por vez" é a forma natural de
mostrar isso sem inventar comparação com concorrente nem usar depoimento.
custo: baixo — `IntersectionObserver` + troca de classe CSS não pesa quase
nada em JS. O que pesa é a foto: cada modalidade exibida em boa resolução
consome uma fatia real do teto de 1600 kB — e é exatamente aí que o
orçamento deveria ir (o acervo tem material de sobra para cobrir Mat,
Reformer e Cadillac sem repetir foto).

---

## Direção 2 — fora do setor

**Oura Ring** — https://ouraring.com/

mecanismo: abri a home diretamente. O primeiro headline é sobre o objeto
("Oura Ring 5 — Subtle. Power.", reforçado por "The world's smallest smart
ring is here"), e só na sequência da rolagem aparece a frase de benefício
("Understand your body. Own your health."). As categorias de saúde (sono,
atividade, coração, saúde da mulher, estresse) aparecem como um carrossel de
cartões com imagem de fundo — cada cartão abre com uma frase de benefício
sensível ("Get the best sleep of your life") e só depois, em texto menor, o
dado técnico. A alegação de maior peso do site ("86% of Oura Members see
their health improve") carrega uma nota de rodapé numerada `[1]` que remete a
metodologia — "based on a 2026 survey with 3,501 Oura members after using
Oura Ring for 30 days" — ou seja, toda alegação forte é qualificada por
metodologia visível, não deixada solta.
Implementação análoga: um bloco "o que o corpo sente" com 3–4 cartões (dor
que cede, postura, força, controle — vocabulário do `lexico.palavras_chave`
do próprio DNA), cada cartão abrindo com a frase de sensação e só depois, em
corpo menor, a explicação fisiológica simples. Isso é HTML e grid comum —
nenhum efeito de movimento é necessário para o mecanismo funcionar, o que o
torna barato em qualquer nível, inclusive no premium onde o orçamento de
técnica deveria ir para o herói e não para esta seção.
por que serve: o pilar de conteúdo "corpo que funciona" do DNA pede
exatamente essa ordem — sensação primeiro, fisiologia depois — e nenhuma
referência de Pilates encontrada na Direção 1 faz isso de forma explícita
(a maioria vai direto para o nome do aparelho). O padrão de "nota de rodapé
com metodologia" também é a peça que falta para o Heaven quebrar o mito de
"Pilates é leve demais" com uma alegação forte e ainda assim compatível com
a Res. COFFITO 532/2021 — desde que a nota cite uma fonte real (não um
número inventado; isso é decisão de copy, fora deste dossiê).
custo: desprezível — é estrutura de conteúdo e grid, sem JS nem imagem
adicional. Só exige que o texto de cada cartão e a nota de rodapé sejam
escritos com uma fonte real por trás (trabalho de copy, fora do escopo
deste dossiê).

---

## Direção 3 — o oposto

**Smart Fit** — https://www.smartfit.com.br/

o que estou recusando: abri a home diretamente, hoje (19/09/2026). O hero
abre com "Sua vida mais smart" e CTA de busca por academia, mas a régua de
planos logo abaixo lidera com preço e promoção — três planos lado a lado
(Black R$ 159,90, Fit R$ 99,90, Smart R$ 119,90), todos com selo "100% off no
1º mês" e checklist comparativo de benefícios. Os depoimentos usam avatares
genéricos (círculos cinza, sem foto real) e falam em resultado de
emagrecimento ("já emagreci 9 kg graças aos treinos"). O visual prioriza
mockup do app e ilustração de serviço sobre fotografia de corpo real em
movimento.
Isso é o oposto ponto a ponto do que o `dna.json` pede: `do_and_dont.evitar`
proíbe competir por preço ou volume e proíbe tratar Pilates como método de
emagrecimento; a Res. COFFITO 532/2021 veda exibir preço, valor, modalidade
de pagamento e promoção, e veda a promessa de resultado que o depoimento de
peso perdido carrega. O `onlyness_statement` do Heaven é sobre aparelhagem
completa e correção individual em turma pequena — o argumento do Smart Fit é
o inverso: escala substitui atenção, e avatar genérico substitui rosto real.
Qualquer efeito que preferisse mockup ou ilustração às 15 fotos reais do
acervo estaria copiando o mecanismo errado.

---

## Catálogo de efeitos aplicáveis ao nível Premium

O nível herda as técnicas do Intermediário (revelação por `clip-path`, grão
SVG estático, traço animado, gradiente cônico) e soma canvas animado e WebGL.
O teto permite 3 técnicas de movimento no total — as três marcadas com ✅
formam a combinação recomendada e já ocupam essa cota sozinhas.

| efeito | como se faz | custo aproximado | onde caberia |
|---|---|---|---|
| ✅ Modalidade que assume a tela ao rolar (Direção 1) | `IntersectionObserver` por `<section>` de aparelho + troca de classe animando `opacity`/`transform` via CSS `transition`, sem lib | ~2 kB JS vanilla; CPU desprezível | Seções Mat → Reformer → Cadillac, abaixo da dobra |
| ✅ Transição de cor de zona (bege claro → tom mais quente na seção de desfecho) | `IntersectionObserver` trocando uma custom property (`--zona`) no `:root`, com `transition` em `background-color`; ou `animation-timeline: view()` nativo com fallback estático via `@supports` | ~0,5–1 kB, quase todo CSS | Entre a seção do problema (`problema_raiz`) e a do plano em 3 passos |
| ✅ Canvas 2D animado, leve, atrás de um bloco de texto (luz suave, "pedacinho de céu") | canvas nativo (área pequena, nunca tela cheia), `requestAnimationFrame` throttlado a ~20fps, pausado via `IntersectionObserver` quando fora da viewport, desligado por completo em `prefers-reduced-motion` | ~3–5 kB JS; CPU baixa se a área desenhada for pequena | Atrás do bloco de `sucesso_desfecho`, nunca no herói — não pode competir com o LCP |
| WebGL — crossfade sutil entre fotos de bastidor | shader de crossfade escrito à mão em WebGL2 (sem three.js, sem CDN — teria que ser vendorizado localmente se usar alguma lib), com fallback de crossfade em CSS puro quando WebGL não disponível | ~8–15 kB de shader/JS + custo de upload de textura na GPU do celular | Galeria de bastidores/turma — só se sobrarem as 3 técnicas sem essa e ainda houver orçamento de peso, porque compete direto com o espaço que deveria ir para a foto do herói |
| Barra de progresso ligada à rolagem (Mat → Reformer → Cadillac) | `animation-timeline` nativo ou `IntersectionObserver` mudando `clip-path`/`width` de uma barra | ~0,5 kB | Seção do plano em 3 passos, como reforço visual da Direção 1 — concorre pela mesma cota de técnica, escolher uma ou outra |
| Cursor customizado | JS vanilla + `transform: translate` seguindo o ponteiro, desligado em touch e em `prefers-reduced-motion` | ~1 kB, mas ocupa 1 das 3 técnicas | Página inteira — ver ressalva abaixo |

Ressalva sobre WebGL e cursor: os dois cabem no teto de peso e de técnica,
mas nenhum dos dois tem função retórica — são "prova de capacidade técnica",
o oposto do que a personalidade medida da marca pede (formalidade 2/5, mas
tecnicidade 3/5 e nada de assertividade tecnológica). Um estúdio que se
define por correção manual e acolhimento não ganha nada de um shader ou de
um cursor decorativo; a combinação ✅ acima já usa as 3 técnicas do teto em
função da história real (progressão de aparelho, ritmo problema→plano,
atmosfera do desfecho). Se algo tiver que ceder lugar para caber no peso, que
seja o canvas animado antes da foto do herói — nunca o contrário.

---

## O que NÃO cabe neste nível

- **Depoimento nominal, foto de aluna identificada sem consentimento
  documentado, ou nota agregada de avaliação (o "5,0 em 44 avaliações" da
  ficha do Google)** — vedado pela Res. COFFITO 532/2021; o acervo colhido
  não tem esse consentimento registrado. Nenhuma das três direções
  pesquisadas usa isso, exceto a Direção 3, que é a que está sendo recusada.
- **Qualquer preço, plano comparativo, selo de promoção ou "1º mês grátis"**
  — vedado pela norma (preço, valor, modalidade de pagamento e promoção) e
  pelo `do_and_dont.evitar` do DNA ("competir por preço ou volume").
- **Alegação de resultado estético ou de emagrecimento, mesmo sob forma de
  frase de efeito** — vedado pela norma e pelo `lexico.evitar` do DNA
  ("emagreça rápido", "corpo dos sonhos", "antes e depois").
- **3D como demonstração técnica** (ex.: um Cadillac girando em modelo 3D) —
  o teto do nível veda isso quando o campo pede contenção, e aqui pede: é
  profissão regulada, e o acervo não tem nenhum asset 3D do cliente para
  alimentar isso sem recorrer a modelo de terceiro, também vedado.
- **Herói de texto sobre cor chapada** — o teto premium recusa
  explicitamente essa entrega; a primeira tela precisa carregar uma das 15
  fotos reais do acervo, com peso suficiente para valer a resolução (é onde
  o orçamento de 1600 kB deveria ir primeiro).
- **Deixar mais de um terço do teto de peso sem uso** — a tentativa anterior
  deste mesmo nível usou 820 kB de 1600 e faltou exatamente o herói; qualquer
  efeito do catálogo acima é secundário a garantir que a foto principal tenha
  peso e resolução de verdade.
- **Quarta técnica de movimento além das 3 do teto** (WebGL de bastidor +
  barra de progresso + cursor, todas juntas com a combinação ✅) — estoura a
  contagem; escolher a combinação de maior retorno retórico e descartar o
  resto.
