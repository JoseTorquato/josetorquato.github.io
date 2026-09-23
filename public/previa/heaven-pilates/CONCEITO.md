# V3 · premium — **a aula, e depois a visita**

> Uma página. Nível Premium. Heaven Pilates, Canoas — RS.
> Reescrita da prévia anterior, que abria com o salão vazio e gastava três
> blocos falando do que não estava publicado. Aqui a página abre com a aula
> acontecendo e o que falta fica em silêncio.

---

## tese

Quem procura um estúdio de Pilates em Canoas chega com uma pergunta só, e ela
é sobre o próprio corpo: **essa aula cabe em mim?** Não é dúvida de método, é
medo de ser a pior da sala, de não aguentar, de piorar a dor que já existe.

A página responde na primeira tela, e responde com uma fotografia: os cinco
Cadillacs ocupados ao mesmo tempo, cinco pessoas em posições diferentes de
esforço, e a instrutora de pé ao fundo acompanhando a série. Salão vazio não
responde nada — mostra imóvel, não aula.

Uma frase: **a aula aparece antes de ser explicada, e o corpo de quem olha já
sabe se cabe ali.**

## a história, em três tempos

A pessoa chega com a pergunta; a página mostra **a sala de verdade**, **o
aparelho** e **quem conduz**; a saída é a primeira aula, pelo WhatsApp.

| # | tela | fundo | mídia |
|---|---|---|---|
| 01 | **o pico** — a aula acontecendo | noite | a fotografia dos cinco Cadillacs ocupados, de borda a borda |
| 02 | a pergunta que chega antes | creme | corpo suspenso no Cadillac |
| 03 | **tempo 1 · a sala** — 202, 2º andar | placa | o salão entre as aulas, e o céu da janela |
| 04 | **tempo 2 · o aparelho** — Mat → Reformer → Cadillac | creme | chapa tipográfica, Reformer, alças do Cadillac |
| 05 | o que muda no corpo | céu | sem foto, quatro blocos |
| 06 | a turma | escuro alto | cinco alunas de costas |
| 07 | **tempo 3 · quem conduz** — Morgana Stein | creme | retrato da profissional |
| 08 | perguntas | placa | sem foto, `<details open>` |
| 09 | **a saída** — a primeira aula | verde da marca | sem foto |

**9 seções**, mais o rodapé. A elaboração é **clara**: cinco blocos de
conteúdo entre a abertura e a saída, e a foto do lugar em tamanho de verdade.

**Navegação:** barra fixa com a marca à esquerda e **uma** ação à direita —
"Falar no WhatsApp" — mais o fio de progresso colado no topo. Sem menu: a
sequência é a navegação, e um índice competiria com ela.

## o pico, e por que é só um

A foto é `raw/assets/1488cce8f6bcff0a.jpg`, recortada entre as duas legendas
chapadas sobre a arte (y 540–1366 do original), servida como `img/pico.jpg`
em 1080×826 progressivo. Ela entra de **borda a borda, na proporção em que foi
tirada, sem véu por cima e sem texto dentro** — o único tratamento é um teto
de altura (`100svh − barra − 13rem`) que, na tela larga e baixa, a recorta em
faixa e deixa a etiqueta e as duas primeiras linhas do título entrarem na
mesma tela.

Nenhuma outra imagem chega perto: a segunda maior (`sala.jpg`) aparece em meia
coluna, com menos de um quinto da área. Volume e emoção não são a mesma coisa,
e o resto da página é deliberadamente mais calmo — **uma** zona escura no meio
(a turma), luz do começo ao fim, e o verde da marca guardado para a saída.

## DNA

- **cor** — amostrada em pixels da arte de agradecimento que a própria cliente
  publicou (`raw/assets/d8059530bd8beafa.jpg`, onde o creme é 67% da peça) e do
  avatar do perfil: creme `#f2e7dd`, marrom de tipografia `#3a2113`, verde do
  símbolo `#57a25e`. A paleta escura com verde-limão que abre o `dna.json`
  **não foi usada** — o próprio arquivo avisa, em `paleta.justificativa`, que é
  "leitura visual aproximada". Tudo declarado em `oklch()`. O verde de tinta
  (`#2e6b34`) é o verde da marca com a luminosidade baixada para passar em
  texto; croma e matiz preservados.
- **acento com convicção** — o verde aparece **sempre nos mesmos cinco
  lugares**: o botão de ação, o número de cada tela, a última linha do título,
  o anel de foco e a seleção de texto. Em nenhum outro.
- **tipografia** — display **Archivo** variável (`wght` 400–700, `wdth`
  100–125), corpo **Karla**, a face humanista que o `BRAND_GUIDELINES.md`
  atribui ao perfil. Nenhuma das faces que denunciam IA. As duas são servidas
  de `fonte/`, 114 kB somados, **zero requisição a terceiro**.
- **imagem** — fotografia dominante, oito recortes de fotos reais do acervo,
  nenhuma geração. O logo é o do avatar do perfil, com o reflexo espelhado
  cortado e o fundo branco removido.
- **ritmo** — noite → creme → placa → creme → céu → escuro alto → creme →
  placa → verde.

## o painel do Mat

O acervo não tem foto de trabalho de solo sem legenda chapada sobre a arte. Em
vez de um buraco marcado com explicação, o primeiro degrau da progressão recebe
uma **chapa tipográfica**: a palavra "Mat" em Archivo, na altura de uma imagem,
sobre o marrom escuro. Lê como começo da série, não como falta.

## movimento · três técnicas, uma curva

Curva única na página inteira: `cubic-bezier(.16, 1, .3, 1)`. Só `transform` e
`opacity`. Nunca `transition: all`.

1. **Abertura de tela.** Um `IntersectionObserver` só, revelando cada linha e a
   mídia junto, escalonadas de 70 a 90 ms pela variável `--atraso` escrita no
   próprio elemento.
2. **Fio de progresso.** CSS puro, `animation-timeline: scroll(root)`. Sem
   ouvinte de rolagem em JS. Onde não existe, o fio não aparece e a página não
   perde nada.
3. **O pico assenta.** A foto entra em `scale(1.045)` e desce para `1` em
   1,4 s — mas **só depois do `load` da própria imagem**, e só `transform`. O
   texto do herói não anima.

Tudo desligado em `prefers-reduced-motion: reduce`, inclusive o fio.

## estados desenhados

- **carregando** — toda `<img>` tem fundo de placa quente e `width`/`height`
  explícitos: o lugar da foto é um retângulo da cor da marca, nunca um buraco
  branco, e o CLS é zero por construção.
- **primeira pintura do pico** — um LQIP de 20 px de largura (524 bytes,
  embutido no CSS) pinta cor e forma antes do JPEG chegar. Fica na
  `.pico-chapa`, que não é ancestral de texto nenhum, para não apagar a
  medição de contraste de nada.
- **erro** — a `img` herda tipografia e cor da marca: imagem quebrada mostra o
  texto alternativo legível, não o ícone padrão do navegador.
- **foco** — anel de 3 px do verde da marca, deslocado 3 px; verde claro nas
  zonas escuras.
- **toque / ativo** — `touch-action: manipulation` nos 16 alvos, realce de
  toque definido de propósito e `:active` com recuo de 1 px. O link dentro da
  resposta do FAQ leva `padding-block` de .8rem: é o que dá 44 px de alvo sem
  mexer na entrelinha do parágrafo.

## o que saiu nesta reescrita

- **O herói de salão vazio.** A foto de 1800×2400 era a única em resolução de
  verdade e por isso carregava a abertura — mas mostrava o imóvel, não a aula.
  O salão continua na página, no tempo 1, em meia coluna.
- **A seção "o que a gente não promete".** Quatro cartões explicando a norma do
  conselho. A recusa de promessa se cumpre não escrevendo a promessa; uma seção
  sobre o próprio cuidado é o agente falando de si.
- **O campo vazio de CREFITO** e o comentário de bloqueio de publicação no
  HTML.
- **A resposta "ainda não publicado"** sobre a grade de horários, e a pergunta
  de preço que existia só para citar a resolução.
- **As linhas de rodapé** sobre recorte de foto e sobre a norma.
- **A faixa de lâmpadas** e a seção separada "a prova · cinco ao mesmo tempo":
  a prova virou a abertura, e uma faixa de mídia extra competiria com o pico.

## o que continua fora, de propósito

- **A nota 5 e as 44 avaliações do Google.** São `facts` da colheita e ficam
  fora do texto, do JSON-LD (nem `aggregateRating` nem `review`) e de qualquer
  menção de que existem.
- **O número de seguidores.** Métrica de vitrine, não informação de quem
  procura tratamento.
- **Dois superlativos da própria cliente** — "aqui vc viverá o melhor momento
  do seu dia" e "a verdadeira ostentação". Estão sinalizados em `restricoes` no
  DNA; citei as mesmas passagens pelo lado informativo. A cliente pode reverter.

## medido

Números transcritos de `propostas/MEDICOES.md` (Chromium headless, servido por
HTTP; celular a 390 px em 4G emulado a 1,6 Mbps / 150 ms RTT; desktop a 1440 px
e monitor amplo a 2560 px).

| | v3-premium | teto do nível |
|---|---|---|
| LCP · 390 px (4G) | **1.856 ms** | 2.200 ms |
| LCP · 1440 px | 76 ms | — |
| LCP · 2560 px | 80 ms | — |
| CLS · 390 px | **0,000** | 0 |
| Peso · 390 px | **880 kB** | 1.600 kB |
| Requisições | **12** | 24 |
| Requisição a terceiro | **nenhuma** | zero |
| Contraste AA | **0 reprovados em 110 pares** (pior par 4,69:1) | AA em tudo |
| Alvo de toque < 44 px | **0** | zero |
| Link de pular conteúdo | sim | sim |
| Âncora sem `scroll-margin` | 0 de 4 | zero |
| Sem `touch-action` | 0 de 16 | zero |
| Rolagem horizontal a 390 px | não | não |
| Texto espremido · 390 e 2560 px | 0 | zero |
| Flex travado no teto · 2560 px | 0 | zero |
| Imagem sem `alt` | 0 | zero |
| Erro de console | nenhum | nenhum |
| Seções | 9 | 9 a 14 |
| Veredito do medidor | **dentro do teto do nível** | — |

**O LCP agora é a foto do pico, e não mais o subtítulo.** Na versão anterior a
`<img>` do herói cobria exatamente a viewport (`inset:0` num herói de
`100svh`) e o Chrome a descartava como candidata a LCP, medindo um parágrafo
de 23 mil px² no lugar dela — 348 ms que não eram da imagem. Com a foto em
fluxo normal, o número passou a 1.856 ms e é honesto: é o tempo real da
fotografia em 4G.

## risco

**A foto do pico é um quadro de vídeo de celular, com 1080 px de largura.** A
1440 px ela sobe 1,33× e a 2560 px, 2,37× — a maciez aparece na tela do dono do
negócio. Não dá para resolver com código: subir o arquivo em Lanczos só
entrega um borrão maior e mais pesado. Meia hora de fotografia com uma câmera
decente, na mesma aula e do mesmo ângulo, muda o patamar desta página mais do
que qualquer efeito.

## erra se

- **A cliente quiser vender aula, não mostrar a aula.** Não há oferta, plano
  nem gatilho de urgência; quem espera landing de campanha vai achar contida.
- **O rosto exposto na foto de abertura incomodar alguém da turma.** A foto é
  pública no perfil do estúdio, mas quem aparece ali não foi consultado sobre
  esta página.
- **O tráfego vier de anúncio pago para conversão imediata.** A ação está no
  topo e no fim, mas a página foi feita para ser lida, não escaneada.

## o que falta

Pendências que ficam fora da página e vivem só aqui e num comentário do HTML:
**CREFITO de Morgana Stein · autorização de imagem das alunas · grade de
horários · fotos novas em alta resolução (a correção em plano fechado e uma
execução de solo para o painel do Mat) · domínio, para `canonical`, `og:url` e
`og:image` virarem absolutos · confirmação da paleta, amostrada das peças dela
e não entregue por ela.**
