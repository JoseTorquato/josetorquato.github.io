-- CRM de prospecção em SQLite. Uso: sqlite3 crm.db < schema.sql
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,  -- no CSV, deixe a coluna id de fora (veja GUIA.md)
  empresa TEXT NOT NULL, nicho TEXT, cidade TEXT,
  instagram TEXT, site TEXT, whatsapp TEXT,
  decisor TEXT, cargo TEXT, origem_lead TEXT, sinal_quente TEXT,
  anuncia_meta TEXT CHECK (anuncia_meta IN ('sim','nao','?')),
  etapa TEXT NOT NULL DEFAULT 'lead'
    CHECK (etapa IN ('lead','pesquisado','previa_pronta','contatado','respondeu','reuniao','proposta','fechado','perdido')),
  data_primeiro_contato TEXT, canal TEXT, previa_url TEXT,
  proximo_passo TEXT, data_proximo_passo TEXT,
  valor_proposta REAL, status TEXT DEFAULT 'aberto', observacoes TEXT
);
CREATE VIEW IF NOT EXISTS funil AS
  SELECT etapa, COUNT(*) AS qtd, SUM(valor_proposta) AS valor FROM leads
  WHERE COALESCE(status,'') <> 'exemplo'  -- ignora a linha de exemplo
  GROUP BY etapa;
CREATE VIEW IF NOT EXISTS follow_ups_hoje AS
  SELECT id, empresa, proximo_passo, data_proximo_passo FROM leads
  WHERE status='aberto'
    AND NULLIF(data_proximo_passo,'') IS NOT NULL
    AND NULLIF(data_proximo_passo,'') <= date('now')
  ORDER BY data_proximo_passo;
