# Prévia — Felipe Albuquerque Corretor de Imóveis

- URL: https://josetorquato.dev/previa/felipe-albuquerque/ (noindex, faixa de prévia)
- Gerada por `node brief/felipe-albuquerque/gerar.mjs` a partir de `imoveis.json` (home + uma página por imóvel em `imoveis/<slug>/`).
- Imóvel novo: acrescentar no JSON, otimizar as fotos para `fotos/<cod>-NN-{400,720,1080}.webp` e rodar o gerador.
- Skills usadas: client-asset-harvest (coleta), design-system-tokens (tokens em styles.css), lp-section-builder (estrutura), lp-motion-layer (nível leve: reveal, ken burns no topo, hover), lp-perf-pass (medição), seo-local-e-busca-ia (auditoria e schema).
- Decisão de SEO: sem páginas de bairro enquanto cada bairro tiver menos de 3 imóveis (seriam páginas ralas); bairros viram filtros na home.
- Pesquisa de referência (sites imobiliários premium): confiança na primeira dobra (nome + CRECI), busca simples, uma página por imóvel com galeria, ficha e CTA do imóvel, guias de bairro quando houver conteúdo, mobile primeiro.
- Medido (celular simulado, 4G lento, CPU 4x, mediana de 3): home LCP 0,83 s · CLS 0,016 · 561 KB; imóvel LCP 2,06 s · CLS 0 · 467 KB.
