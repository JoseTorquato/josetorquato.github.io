# Helena burger — passada de performance (04/11/2026)

Medição local (sem Lighthouse/PageSpeed — a prévia ainda não está publicada): Chromium (Playwright) em celular simulado 390×844, DPR 2, rede 1,6 Mbps / 150 ms, CPU 4× mais lenta, cache desligado. Mediana de 3 rodadas.

| Métrica | Antes | Depois | Meta |
|---|---|---|---|
| LCP | 1,54 s (img hero-cheddar-800.webp) | 1,53 s | ≤ 2,5 s |
| CLS | 0 | 0 | ≤ 0,1 |
| INP (toque no FAQ) | 32 ms | 32 ms | ≤ 200 ms |
| Peso da 1ª dobra | 285 KB | 286 KB | — |
| Peso total após rolar | 1.044 KB | 808 KB | — |
| Imagens | 901 KB | 664 KB | — |
| JS | 5 KB | 5 KB | ≤ 60 KB gzip |
| Imagem LCP | 84 KB | 84 KB | ≤ 150 KB |

Mudanças: 3 imagens sem uso removidas; galeria com srcset 480/800 (no celular baixa 480); estrutura-vidro recomprimida.
Já estava certo: hero com preload + fetchpriority e sem lazy; width/height em todas as imagens; mapa só sob clique; ícones SVG inline; fontes woff2 com font-display: swap; reduced-motion desliga escorrer/marquee/reveal.
Refazer no PageSpeed (mobile) depois do merge, com a URL pública.
