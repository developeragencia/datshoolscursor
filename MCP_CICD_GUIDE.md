# 🤖 Guia MCP e CI/CD - Dashtools

## Model Context Protocol + Continuous Integration/Deployment

Este guia explica como usar o MCP (Model Context Protocol) integrado com CI/CD para automatizar completamente o desenvolvimento, correções e melhorias no Dashtools.

---

## 📋 ÍNDICE

1. [O Que é MCP](#o-que-é-mcp)
2. [MCPs Configurados](#mcps-configurados)
3. [Automação Completa](#automação-completa)
4. [Workflows Automatizados](#workflows-automatizados)
5. [Comandos via Cursor](#comandos-via-cursor)
6. [Casos de Uso](#casos-de-uso)

---

## 🎯 O QUE É MCP?

### Model Context Protocol

MCP é um protocolo que permite que IAs (como Cursor) se conectem diretamente a serviços externos e executem ações automaticamente.

### Benefícios

✅ **Deploy Automático** - Push → Build → Deploy sem intervenção  
✅ **Gestão de Banco** - Migrations, queries, backups via comandos  
✅ **Monitoramento** - Logs, métricas, status em tempo real  
✅ **Debugging** - Análise de erros e correção automática  
✅ **Otimização** - Performance tuning automático  

---

## 🔧 MCPs CONFIGURADOS

### 1. Render MCP

**Capacidades**:
- ✅ Listar serviços e deploys
- ✅ Ver logs em tempo real
- ✅ Gerenciar variáveis de ambiente
- ✅ Monitorar métricas
- ✅ Criar e atualizar serviços

**Service Configurado**:
```yaml
Service ID: srv-d3vsptq4d50c73e5h7b0
Nome: dashtools
URL: https://dashtools-5px2.onrender.com
Auto Deploy: Habilitado
```

**Comandos Disponíveis**:

```javascript
// Listar todos os serviços
mcp_render_list_services()

// Detalhes do serviço
mcp_render_get_service({ serviceId: "srv-d3vsptq4d50c73e5h7b0" })

// Últimos 10 deploys
mcp_render_list_deploys({ 
  serviceId: "srv-d3vsptq4d50c73e5h7b0",
  limit: 10 
})

// Logs em tempo real
mcp_render_list_logs({
  resource: ["srv-d3vsptq4d50c73e5h7b0"],
  limit: 100,
  text: ["error", "warning"]
})

// Métricas de CPU
mcp_render_get_metrics({
  resourceId: "srv-d3vsptq4d50c73e5h7b0",
  metricTypes: ["cpu_usage", "memory_usage"],
  startTime: "2025-10-28T00:00:00Z"
})

// Atualizar variáveis
mcp_render_update_environment_variables({
  serviceId: "srv-d3vsptq4d50c73e5h7b0",
  envVars: [
    { key: "DATABASE_URL", value: "postgresql://..." }
  ]
})
```

### 2. Neon MCP

**Capacidades**:
- ✅ Gerenciar projetos e branches
- ✅ Executar SQL queries
- ✅ Criar e aplicar migrations
- ✅ Otimizar performance de queries
- ✅ Backups e restore

**Projeto Configurado**:
```yaml
Project ID: aged-flower-32015502
Database: neondb
Branch: main
Região: US East (Ohio)
PostgreSQL: 17.5
```

**Comandos Disponíveis**:

```javascript
// Listar projetos
mcp_Neon_list_projects()

// Executar SQL
mcp_Neon_run_sql({
  projectId: "aged-flower-32015502",
  sql: "SELECT COUNT(*) FROM users"
})

// Transação SQL
mcp_Neon_run_sql_transaction({
  projectId: "aged-flower-32015502",
  sqlStatements: [
    "INSERT INTO users (...) VALUES (...)",
    "UPDATE campaigns SET ..."
  ]
})

// Listar tabelas
mcp_Neon_get_database_tables({
  projectId: "aged-flower-32015502"
})

// Ver estrutura de tabela
mcp_Neon_describe_table_schema({
  projectId: "aged-flower-32015502",
  tableName: "users"
})

// Preparar migration
mcp_Neon_prepare_database_migration({
  projectId: "aged-flower-32015502",
  migrationSql: "ALTER TABLE users ADD COLUMN phone VARCHAR(20)"
})

// Completar migration
mcp_Neon_complete_database_migration({
  migrationId: "migration_id_here",
  applyChanges: true
})

// Otimizar query
mcp_Neon_prepare_query_tuning({
  projectId: "aged-flower-32015502",
  sql: "SELECT * FROM campaigns WHERE ...",
  databaseName: "neondb"
})

// Criar branch (desenvolvimento)
mcp_Neon_create_branch({
  projectId: "aged-flower-32015502",
  branchName: "development"
})

// Connection string
mcp_Neon_get_connection_string({
  projectId: "aged-flower-32015502"
})
```

---

## 🚀 AUTOMAÇÃO COMPLETA

### Fluxo Automatizado Completo

```
┌─────────────────────────────────────────────────────┐
│  DESENVOLVIMENTO VIA CURSOR + MCP                   │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  1. Você pede: "Adicione campo phone na tabela"     │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  2. Cursor via MCP:                                 │
│     ✅ Cria migration no Neon                       │
│     ✅ Testa em branch temporária                   │
│     ✅ Aplica em produção                           │
│     ✅ Atualiza schema TypeScript                   │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  3. Commit automático:                              │
│     git commit -m "feat: adiciona campo phone"      │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  4. Push para main:                                 │
│     git push origin main                            │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  5. GitHub Webhook → Render                         │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  6. Deploy Automático:                              │
│     npm install && npm run build                    │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  7. Cursor verifica via MCP:                        │
│     ✅ Deploy concluído                             │
│     ✅ Health check OK                              │
│     ✅ Banco conectado                              │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  8. Você recebe: "✅ Feature deployada!"            │
└─────────────────────────────────────────────────────┘
```

**Tempo Total**: ~3-5 minutos  
**Intervenção Manual**: ZERO

---

## 🔄 WORKFLOWS AUTOMATIZADOS

### Workflow 1: Nova Feature Completa

**Comando no Cursor**:
```
"Crie uma feature de notificações por email para vendas"
```

**O Que Acontece**:

1. **Análise do Cursor**:
   - Verifica schema atual
   - Identifica tabelas necessárias
   - Planeja implementação

2. **Criação de Tabela** (via Neon MCP):
   ```sql
   CREATE TABLE email_notifications (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id INTEGER REFERENCES users(id),
     sale_id UUID REFERENCES sales(id),
     sent_at TIMESTAMP,
     status VARCHAR
   );
   ```

3. **Código Backend**:
   - Cria route `/api/notifications`
   - Adiciona service `EmailNotificationService`
   - Integra com tabela de vendas

4. **Código Frontend**:
   - Cria componente `NotificationSettings`
   - Adiciona página de configurações
   - Conecta com API

5. **Testes**:
   - Testa envio de email
   - Verifica inserção no banco
   - Valida UI

6. **Deploy**:
   - Commit com mensagem descritiva
   - Push para main
   - Deploy automático
   - Verificação pós-deploy

7. **Documentação**:
   - Atualiza README
   - Adiciona comentários no código
   - Cria changelog entry

**Você só fez**: Pedir a feature  
**Cursor fez**: Todo o resto

---

### Workflow 2: Correção de Bug

**Comando no Cursor**:
```
"O cálculo de ROAS está errado, corrija"
```

**O Que Acontece**:

1. **Investigação** (via Neon MCP):
   ```sql
   SELECT campaign_id, revenue, spent, roas 
   FROM campaigns 
   WHERE roas > 100 OR roas < 0;
   ```

2. **Análise do Código**:
   - Encontra função `calculateROAS()`
   - Identifica erro na fórmula

3. **Correção**:
   ```typescript
   // Antes
   const roas = revenue / spent;
   
   // Depois
   const roas = spent > 0 ? revenue / spent : 0;
   ```

4. **Validação**:
   ```sql
   UPDATE campaigns 
   SET roas = revenue / NULLIF(spent, 0)
   WHERE spent > 0;
   ```

5. **Teste**:
   - Verifica novos cálculos
   - Compara com valores anteriores

6. **Deploy**:
   - Commit: `fix: corrige cálculo de ROAS`
   - Push e deploy automático

7. **Notificação**:
   ```
   ✅ Bug corrigido e deployado
   📊 123 campanhas atualizadas
   🚀 Online em produção
   ```

---

### Workflow 3: Otimização de Performance

**Comando no Cursor**:
```
"A lista de campanhas está lenta, otimize"
```

**O Que Acontece**:

1. **Análise de Query** (via Neon MCP):
   ```javascript
   mcp_Neon_explain_sql_statement({
     sql: "SELECT * FROM campaigns WHERE user_id = 1"
   })
   ```

2. **Identificação**:
   - Query sem índice em `user_id`
   - Scan completo da tabela

3. **Otimização** (via Neon MCP):
   ```javascript
   mcp_Neon_prepare_query_tuning({
     sql: "SELECT * FROM campaigns WHERE user_id = 1",
     projectId: "aged-flower-32015502"
   })
   ```

4. **Aplicação**:
   ```sql
   CREATE INDEX campaigns_user_id_idx 
   ON campaigns(user_id);
   ```

5. **Validação**:
   - Testa query novamente
   - Compara tempos (antes: 500ms → depois: 5ms)

6. **Código**:
   - Adiciona paginação
   - Implementa cache

7. **Deploy**:
   - Commit: `perf: otimiza lista de campanhas`
   - Deploy automático

---

### Workflow 4: Migração de Schema

**Comando no Cursor**:
```
"Adicione suporte para múltiplos dashboards por usuário"
```

**O Que Acontece**:

1. **Análise do Schema** (via Neon MCP):
   ```javascript
   mcp_Neon_describe_table_schema({
     tableName: "dashboards"
   })
   ```

2. **Planejamento**:
   - Verificar tabela atual
   - Planejar alterações necessárias

3. **Migration em Branch** (via Neon MCP):
   ```javascript
   // Cria branch temporária
   mcp_Neon_create_branch({
     branchName: "migration-dashboards"
   })
   
   // Testa migration
   mcp_Neon_run_sql({
     branchId: "br-temp-123",
     sql: "ALTER TABLE dashboards ADD COLUMN is_default BOOLEAN DEFAULT false"
   })
   ```

4. **Validação**:
   - Testa em branch temporária
   - Verifica constraints
   - Valida dados existentes

5. **Aplicação em Produção**:
   ```javascript
   mcp_Neon_complete_database_migration({
     migrationId: "mig_123",
     applyChanges: true
   })
   ```

6. **Atualização de Código**:
   - Atualiza schema TypeScript
   - Modifica queries
   - Ajusta UI

7. **Deploy Completo**:
   - Commit e push
   - Deploy automático
   - Verificação

---

## 💬 COMANDOS VIA CURSOR

### Comandos Simples

```
# Deploy
"Faça deploy da versão atual"

# Verificação
"Verifique se está tudo funcionando"

# Logs
"Mostre os últimos erros"

# Banco de Dados
"Quantos usuários temos?"

# Performance
"Como está a performance do servidor?"

# Status
"Qual o status do último deploy?"
```

### Comandos Complexos

```
# Feature Completa
"Crie uma feature de relatórios de vendas mensais com gráficos e exportação para PDF"

# Refatoração
"Refatore o código de autenticação para usar JWT ao invés de sessions"

# Integração
"Adicione integração com o Stripe para pagamentos recorrentes"

# Análise
"Analise a performance de todas as queries e sugira otimizações"

# Debugging
"Investigue porque as vendas não estão sendo registradas corretamente"
```

### Comandos de Manutenção

```
# Backup
"Faça backup do banco de dados"

# Limpeza
"Remova dados de teste antigos"

# Otimização
"Otimize todas as queries lentas"

# Atualização
"Atualize todas as dependências para as versões mais recentes"

# Segurança
"Verifique vulnerabilidades de segurança"
```

---

## 📚 CASOS DE USO REAIS

### Caso 1: Cliente Reporta Bug

**Situação**: "As vendas do Hotmart não estão aparecendo"

**Você no Cursor**:
```
"As vendas do Hotmart não estão aparecendo, investigue e corrija"
```

**Cursor faz**:
1. Verifica logs de webhook do Hotmart
2. Encontra erro de parsing
3. Corrige código
4. Testa com dados reais
5. Deploy automático
6. Notifica: "✅ Corrigido e deployado"

**Tempo**: 3-5 minutos

---

### Caso 2: Nova Plataforma de Venda

**Situação**: Adicionar suporte para Eduzz

**Você no Cursor**:
```
"Adicione integração completa com Eduzz"
```

**Cursor faz**:
1. Cria tabela de integração
2. Implementa webhook handler
3. Adiciona UI de configuração
4. Cria testes
5. Documenta API
6. Deploy completo

**Tempo**: 10-15 minutos

---

### Caso 3: Otimização Proativa

**Você no Cursor** (toda semana):
```
"Analise a aplicação e faça melhorias de performance"
```

**Cursor faz**:
1. Analisa queries lentas
2. Cria índices necessários
3. Otimiza código
4. Adiciona caching
5. Melhora bundle size
6. Deploy automático
7. Relatório de melhorias

---

## 🎯 PRÓXIMOS PASSOS

### Melhorias Futuras

1. **Testes Automatizados**:
   ```
   "Configure testes E2E que rodam antes de cada deploy"
   ```

2. **Monitoramento Avançado**:
   ```
   "Configure alertas para erros e performance"
   ```

3. **Documentação Automática**:
   ```
   "Gere documentação da API automaticamente"
   ```

4. **Analytics**:
   ```
   "Adicione tracking de eventos de usuário"
   ```

---

## 🎉 CONCLUSÃO

Com MCP + CI/CD configurado, você tem:

✅ **Deploy 100% Automático**  
✅ **Correções Instantâneas**  
✅ **Desenvolvimento Acelerado**  
✅ **Zero Downtime**  
✅ **Monitoramento em Tempo Real**

**Basta pedir ao Cursor e tudo acontece automaticamente!**

---

## 📞 REFERÊNCIAS

- **Render Docs**: https://render.com/docs
- **Neon Docs**: https://neon.tech/docs
- **MCP Protocol**: https://modelcontextprotocol.io
- **Cursor AI**: https://cursor.sh

---

**Última atualização**: 28/10/2025  
**Versão**: 1.0  
**Status**: ✅ MCP + CI/CD TOTALMENTE CONFIGURADO

