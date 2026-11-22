# Template de CRM para prospecção

Arquivos: `crm-prospeccao.csv` (planilha), `schema.sql` (SQLite) e `importar.sql` (importação segura).

## Na planilha (Google Sheets / Excel)
1. Importe `crm-prospeccao.csv` (Arquivo → Importar). **Apague a linha de exemplo** (`status = exemplo`, "Exemplo Barbearia") antes de usar.
2. Na coluna `etapa`, crie uma lista suspensa: lead, pesquisado, previa_pronta, contatado, respondeu, reuniao, proposta, fechado, perdido.
3. Ordene por `data_proximo_passo` todo dia: é a sua lista de follow-ups.
4. Funil: tabela dinâmica com linhas = etapa e valores = contagem + soma de valor_proposta.

## No SQLite
**Ordem importa: crie o schema ANTES de importar.** O `.import` precisa que a tabela `leads` já exista.

```
sqlite3 crm.db < schema.sql
sqlite3 crm.db < importar.sql
sqlite3 crm.db "SELECT * FROM follow_ups_hoje;"
sqlite3 crm.db "SELECT * FROM funil;"
```

### Por que não importar direto na tabela `leads`
- O CSV tem a coluna `id`, mas ela costuma ficar **vazia** nas linhas que você adiciona. Importar direto faz o `id` virar texto vazio e a linha pode ser rejeitada (`UNIQUE`/`CHECK`) com erro só no stderr, ou seja, você pode perder linhas sem perceber.
- Por isso o `importar.sql` carrega o CSV numa **tabela temporária** e faz `INSERT` **sem a coluna id** (o SQLite gera `AUTOINCREMENT`). O `id` do CSV é **ignorado** (mesmo que preenchido). Células vazias viram `NULL`/padrão (`etapa = lead`, `status = aberto`).
- Alternativa manual: apague a coluna `id` do CSV e importe direto numa tabela com `id AUTOINCREMENT` listando as colunas.
- **Reimportar o mesmo CSV:** com `importar.sql` os leads são duplicados (ids novos). Importe uma vez só, ou apague `crm.db` e comece de novo. Se você importar direto na `leads` um CSV com os **mesmos `id`**, o SQLite falha por `UNIQUE`.
- Linha de exemplo: ela tem `status = exemplo`, então não aparece em `funil` nem em `follow_ups_hoje`, mas continua na tabela. Para tirá-la: `sqlite3 crm.db "DELETE FROM leads WHERE status='exemplo';"`.

### Follow-ups
`follow_ups_hoje` mostra só leads com `status = aberto` e `data_proximo_passo` preenchida e ≤ hoje. Lead sem data (vazia ou NULL) **não** aparece; preencha a data para entrar na lista.

## Com a IA
- "Use a skill smb-outreach, ache 10 leads de [nicho] em [cidade] e adicione no crm-prospeccao.csv preenchendo origem_lead e sinal_quente."
- "Leia o CRM e me diga quem precisa de follow-up hoje, com uma mensagem sugerida para cada um (rascunho, para eu aprovar)."

## Requisitos
Só `sqlite3` (opcional; a planilha funciona sem ele). Nenhum serviço pago.

Boas práticas: registre só dados públicos de empresas; respeite a LGPD e pedidos de "não quero contato".
