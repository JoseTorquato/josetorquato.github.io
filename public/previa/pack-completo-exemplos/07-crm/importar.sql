-- Importa crm-prospeccao.csv para a tabela leads, ignorando a coluna id (o SQLite gera os ids).
-- Pré-requisito: o schema já foi criado (sqlite3 crm.db < schema.sql).
-- Uso (na pasta do CSV):  sqlite3 crm.db < importar.sql
-- Para outro arquivo, troque o nome no .import abaixo.
-- Reimportar o mesmo CSV duplica os leads (os ids novos não colidem); importe uma vez só.
DROP TABLE IF EXISTS leads_import;
CREATE TABLE leads_import AS SELECT * FROM leads WHERE 0;
.mode csv
.import --skip 1 crm-prospeccao.csv leads_import
INSERT INTO leads (empresa, nicho, cidade, instagram, site, whatsapp, decisor, cargo,
    origem_lead, sinal_quente, anuncia_meta, etapa, data_primeiro_contato, canal,
    previa_url, proximo_passo, data_proximo_passo, valor_proposta, status, observacoes)
  SELECT empresa, nicho, cidade, instagram, site, whatsapp, decisor, cargo,
    origem_lead, sinal_quente, NULLIF(anuncia_meta,''),
    COALESCE(NULLIF(etapa,''),'lead'),
    NULLIF(data_primeiro_contato,''), canal, previa_url, proximo_passo,
    NULLIF(data_proximo_passo,''), CAST(NULLIF(valor_proposta,'') AS REAL),
    COALESCE(NULLIF(status,''),'aberto'), observacoes
  FROM leads_import;
DROP TABLE leads_import;
