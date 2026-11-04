# Helena burger — DESIGN

## Clima (um só, derivado da marca real)

**"Fast and Tasty" — lanchonete retrô azul.** A loja já tem identidade forte: placa azul royal com "helena + Burger", mascote cartum retrô (pão sorridente de tênis), embalagem branca com estampa azul, vitrine "Don't hurry, be happy" sobre quadriculado de bandeira de corrida. A prévia amplia isso; não cria outra marca.

- **Paleta:** azul royal `#0a2fc8`, marinho `#0b1a5c`, cheddar `#f8b808`, branco/papel. Cheddar nunca como texto sobre branco (contraste baixo) — só fundo de botão, destaque e brilho.
- **Tipografia:** Fredoka (títulos, arredondada como "helena"), Pacifico (acento script como "Burger", poucas palavras), Nunito (texto). Todas OFL, hospedadas na pasta.
- **Textura:** quadriculado azul/branco (faixas, divisórias), sombra "carimbo" (`--shadow-hard`) nos cards, como estampa.
- **Fotografia:** fotos reais do Google Maps (ver SOURCES.md). Hero = lanche com cheddar escorrendo sobre a embalagem "FAST AND TASTY" (maps-24). Fachada noturna (maps-15) para o "novo endereço".
- **Movimento:** premium leve — reveal no scroll, contadores da prova social, cheddar "escorrendo" no hero (SVG), quadriculado em marquee, tilt nos cards no desktop. Tudo desligado em `prefers-reduced-motion`.

## Não fazer
- Não redesenhar o mascote nem "vetorizar" a logo a partir de foto. Usar a foto da placa/embalagem.
- Não usar os tokens do site pessoal (ciano, Space Grotesk).
- Não inventar preço, nome de lanche, data de inauguração ou plataforma de pedido.
