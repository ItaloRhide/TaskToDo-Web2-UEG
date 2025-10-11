-- Script de inicialização do banco de dados TASKDODB
-- Este script será executado automaticamente quando o container PostgreSQL for criado

-- Criar o banco de dados se não existir
SELECT 'CREATE DATABASE TASKDODB'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'TASKDODB')\gexec

-- Conectar ao banco TASKDODB
\c TASKDODB;

-- Criar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Comentários sobre a estrutura da tabela tasks
-- A tabela será criada automaticamente pelo Hibernate/JPA
-- Estrutura esperada:
-- - id: BIGSERIAL PRIMARY KEY
-- - titulo: VARCHAR(100) NOT NULL
-- - descricao: VARCHAR(500)
-- - data_vencimento: DATE NOT NULL
-- - concluida: BOOLEAN NOT NULL DEFAULT FALSE
-- - prioridade: INTEGER NOT NULL (1-5)
-- - data_criacao: TIMESTAMP NOT NULL
-- - data_atualizacao: TIMESTAMP

-- Inserir dados de exemplo (opcional)
-- Estes dados serão inseridos apenas se a tabela tasks existir
-- O Spring Boot criará a tabela automaticamente na primeira execução

