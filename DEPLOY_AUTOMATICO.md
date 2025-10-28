# 🚀 Guia Completo de Deploy Automático - Dashtools

## ⚡ Deploy Automático via MCP e GitHub

Este guia explica como o deploy automático funciona e como usar o MCP (Model Context Protocol) para gerenciar deployments.

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Como Funciona](#como-funciona)
3. [Configuração Inicial](#configuração-inicial)
4. [Fluxo de Trabalho](#fluxo-de-trabalho)
5. [Usando MCP](#usando-mcp)
6. [Monitoramento](#monitoramento)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 VISÃO GERAL

### Status Atual

✅ **Deploy Automático ATIVO**  
✅ **Branch Monitorada**: `main`  
✅ **Plataforma**: Render  
✅ **Banco de Dados**: Neon PostgreSQL

### Serviço

| Propriedade | Valor |
|------------|-------|
| **Nome** | dashtools |
| **Service ID** | srv-d3vsptq4d50c73e5h7b0 |
| **URL** | https://dashtools-5px2.onrender.com |
| **Região** | Oregon (US West) |
| **Plano** | Starter |
| **Auto Deploy** | ✅ Habilitado |

---

## 🔄 COMO FUNCIONA

### Fluxo Automático

```mermaid
graph LR
    A[Código Local] -->|git push| B[GitHub]
    B -->|Webhook| C[Render]
    C -->|Build| D[npm install]
    D -->|Compile| E[npm run build]
    E -->|Deploy| F[Produção]
    F -->|Health Check| G[✅ Online]
```

### Gatilhos de Deploy

O deploy automático é disparado quando:

1. ✅ **Push para branch `main`**
   ```bash
   git push origin main
   ```

2. ✅ **Merge de Pull Request**
   ```bash
   # Depois de aprovar o PR no GitHub
   # Deploy inicia automaticamente
   ```

3. ✅ **Manual via Render Dashboard**
   - Acesse: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
   - Clique em "Manual Deploy" → "Deploy latest commit"

### O Que Acontece no Deploy

```bash
# 1. Clone do Repositório
git clone https://github.com/developeragencia/datshoolscursor

# 2. Instalação de Dependências
npm install

# 3. Build da Aplicação
npm run build
# → Compila TypeScript
# → Cria bundle do Vite
# → Gera arquivos estáticos

# 4. Iniciar Servidor
npm start
# → Inicia o servidor Express
# → Conecta ao banco Neon
# → Serve a aplicação

# 5. Health Check
# → Testa endpoint /
# → Verifica se está respondendo
# → Marca como "Live" se OK
```

⏱️ **Tempo Médio**: 2-4 minutos

---

## ⚙️ CONFIGURAÇÃO INICIAL

### 1. Configurar Variáveis de Ambiente

#### Opção A: Via Dashboard (Recomendado)

1. Acesse: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0

2. Vá em: **Environment** (menu lateral)

3. Clique em: **Add Environment Variable**

4. Configure:

```bash
# Obrigatório
DATABASE_URL=postgresql://neondb_owner:npg_Gnqe4wZvmc1B@ep-autumn-bonus-aeacerp5-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require

# Opcional (já configurado no render.yaml)
NODE_ENV=production
PORT=10000
```

5. Clique em **Save Changes**

#### Opção B: Via Script (Desenvolvimento Local)

**Windows (PowerShell)**:
```powershell
.\scripts\configure-env.ps1 dev
```

**Linux/Mac (Bash)**:
```bash
chmod +x scripts/configure-env.sh
./scripts/configure-env.sh dev
```

### 2. Verificar Configuração

Após configurar, verifique nos logs:

```
✅ Environment variables validated successfully
   DATABASE_URL: postgresql://neondb_owner...
   NODE_ENV: production
   PORT: 10000
```

---

## 💼 FLUXO DE TRABALHO

### Desenvolvimento com Branches

```bash
# 1. Criar branch para feature
git checkout -b feature/nova-funcionalidade

# 2. Desenvolver localmente
npm run dev

# 3. Fazer commits
git add .
git commit -m "feat: adiciona nova funcionalidade"

# 4. Push para branch
git push origin feature/nova-funcionalidade

# 5. Criar Pull Request no GitHub
# (Não dispara deploy ainda)

# 6. Após aprovação, merge para main
git checkout main
git pull origin main
git merge feature/nova-funcionalidade

# 7. Push para main
git push origin main

# ✨ Deploy automático inicia!
```

### Conventional Commits (Recomendado)

Use mensagens de commit padronizadas:

```bash
# Features
git commit -m "feat: adiciona integração com Shopify"

# Correções
git commit -m "fix: corrige cálculo de ROAS"

# Melhorias
git commit -m "perf: otimiza query de campanhas"

# Documentação
git commit -m "docs: atualiza README"

# Refatoração
git commit -m "refactor: reorganiza componentes"

# Testes
git commit -m "test: adiciona testes para sales"
```

### Deploy Direto (Emergência)

Para deploy urgente, sem branch:

```bash
# 1. Fazer alteração
git add .
git commit -m "hotfix: corrige erro crítico"

# 2. Push direto para main
git push origin main

# ⚡ Deploy inicia imediatamente
```

⚠️ **Cuidado**: Use apenas para emergências!

---

## 🤖 USANDO MCP (Model Context Protocol)

### O Que é MCP?

MCP permite interagir com serviços (Render, Neon) via Cursor AI, automatizando:
- ✅ Deploys
- ✅ Configuração de variáveis
- ✅ Monitoramento de logs
- ✅ Gestão de banco de dados

### Comandos MCP Disponíveis

#### Render MCP

```javascript
// Listar serviços
mcp_render_list_services()

// Obter detalhes do serviço
mcp_render_get_service({
  serviceId: "srv-d3vsptq4d50c73e5h7b0"
})

// Listar deploys
mcp_render_list_deploys({
  serviceId: "srv-d3vsptq4d50c73e5h7b0",
  limit: 10
})

// Ver logs
mcp_render_list_logs({
  resource: ["srv-d3vsptq4d50c73e5h7b0"],
  limit: 100
})

// Atualizar variáveis de ambiente
mcp_render_update_environment_variables({
  serviceId: "srv-d3vsptq4d50c73e5h7b0",
  envVars: [
    { key: "DATABASE_URL", value: "postgresql://..." }
  ]
})
```

#### Neon MCP

```javascript
// Listar projetos
mcp_Neon_list_projects()

// Executar SQL
mcp_Neon_run_sql({
  projectId: "aged-flower-32015502",
  sql: "SELECT * FROM users LIMIT 10"
})

// Verificar tabelas
mcp_Neon_get_database_tables({
  projectId: "aged-flower-32015502"
})

// Criar migration
mcp_Neon_prepare_database_migration({
  projectId: "aged-flower-32015502",
  migrationSql: "ALTER TABLE users ADD COLUMN ..."
})
```

### Exemplos Práticos no Cursor

**Exemplo 1: Verificar último deploy**

No Cursor, basta perguntar:
```
"Qual foi o último deploy do dashtools?"
```

O Cursor irá:
1. Usar MCP para acessar Render
2. Listar deploys recentes
3. Mostrar status e logs

**Exemplo 2: Fazer deploy manual**

```
"Faça deploy da versão atual para produção"
```

**Exemplo 3: Verificar banco de dados**

```
"Quantos usuários existem no banco?"
```

O Cursor irá:
1. Conectar no Neon via MCP
2. Executar: `SELECT COUNT(*) FROM users`
3. Retornar o resultado

### Automatizando Tarefas Comuns

#### Script: Deploy com Verificação

Peça ao Cursor:
```
"Faça deploy e verifique se está funcionando"
```

O Cursor irá:
1. Verificar se há commits pendentes
2. Fazer push para main
3. Aguardar deploy concluir
4. Verificar health check
5. Testar endpoint principal
6. Reportar status

#### Script: Atualizar Schema

```
"Adicione coluna 'phone' na tabela users e faça deploy"
```

O Cursor irá:
1. Criar migration no Neon
2. Testar em branch temporária
3. Aplicar em produção
4. Atualizar código se necessário
5. Fazer deploy automático

---

## 📊 MONITORAMENTO

### 1. Logs em Tempo Real

**Via Dashboard**:
```
https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0/logs
```

**Via MCP no Cursor**:
```
"Mostre os últimos logs do servidor"
```

### 2. Status do Deploy

**Via Dashboard**:
```
https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0/events
```

**Via MCP**:
```
"Qual o status do deploy atual?"
```

### 3. Métricas da Aplicação

**Via Dashboard**:
```
https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0/metrics
```

Monitore:
- 📊 CPU Usage
- 💾 Memory Usage
- 🌐 Request Count
- ⏱️ Response Time
- 🔌 Active Connections

### 4. Banco de Dados

**Neon Console**:
```
https://console.neon.tech/
```

**Via MCP**:
```
"Mostre métricas do banco de dados"
```

Monitore:
- 📦 Storage Used
- 🔌 Active Connections
- ⚡ Query Performance
- 💰 Quota Usage

---

## 🐛 TROUBLESHOOTING

### Problema 1: Deploy Falhou

**Sintomas**:
```
Build failed
Error: ...
```

**Solução**:

1. Verifique os logs:
   ```
   "Mostre logs do último deploy"
   ```

2. Erros comuns:
   ```bash
   # Falta de dependência
   npm install --save pacote-faltando
   
   # Erro de TypeScript
   npm run check
   
   # Erro de build
   npm run build
   ```

3. Teste localmente antes:
   ```bash
   npm run build
   npm start
   ```

### Problema 2: Aplicação Offline

**Sintomas**:
```
Application Error
Service Unavailable
```

**Solução**:

1. Verifique health check:
   ```
   "Verifique se a aplicação está online"
   ```

2. Reinicie o serviço:
   - Dashboard → Manual Deploy → Deploy latest

3. Verifique variáveis:
   ```
   "Liste as variáveis de ambiente"
   ```

### Problema 3: Banco de Dados Desconectado

**Sintomas**:
```
Error: Connection timeout
ECONNREFUSED
```

**Solução**:

1. Teste conexão:
   ```bash
   npm run db:test
   ```

2. Verifique DATABASE_URL:
   ```
   "Mostre a configuração do banco"
   ```

3. Reaplique migrations:
   ```bash
   npm run db:push
   ```

### Problema 4: Deploy Lento

**Sintomas**:
- Deploy demora > 5 minutos

**Solução**:

1. Verifique cache:
   - render.yaml → cache: "no-cache"

2. Otimize build:
   ```json
   // package.json
   "build": "vite build --mode production"
   ```

3. Reduza dependências:
   ```bash
   npm prune
   ```

---

## 📚 RECURSOS ADICIONAIS

### Documentação

- **Render**: https://render.com/docs
- **Neon**: https://neon.tech/docs
- **Vite**: https://vitejs.dev/guide/
- **Drizzle**: https://orm.drizzle.team/docs

### Arquivos de Configuração

```
├── render.yaml              # Configuração do Render
├── drizzle.config.ts        # Configuração do banco
├── vite.config.ts           # Build config
├── package.json             # Scripts e deps
└── scripts/
    ├── configure-env.sh     # Setup Linux/Mac
    └── configure-env.ps1    # Setup Windows
```

### Scripts Disponíveis

```json
{
  "dev": "Desenvolvimento local",
  "build": "Build para produção",
  "start": "Iniciar em produção",
  "db:test": "Testar conexão DB",
  "db:push": "Aplicar migrations",
  "db:studio": "Interface visual DB",
  "check": "Verificar TypeScript"
}
```

---

## ✅ CHECKLIST PRÉ-DEPLOY

Antes de fazer push para main:

- [ ] Código testado localmente (`npm run dev`)
- [ ] Build funciona (`npm run build`)
- [ ] TypeScript sem erros (`npm run check`)
- [ ] Banco conecta (`npm run db:test`)
- [ ] Variáveis configuradas no Render
- [ ] Commit message descritiva
- [ ] Branch atualizada com main

---

## 🎯 PRÓXIMOS PASSOS

1. **Configurar CI/CD Avançado**:
   - Adicionar testes automatizados
   - Lint check no PR
   - Deploy preview para branches

2. **Monitoramento Avançado**:
   - Configurar alertas
   - Integrar Sentry para errors
   - Analytics de performance

3. **Otimizações**:
   - CDN para assets estáticos
   - Cache de API responses
   - Database connection pooling

---

## 📞 SUPORTE

### Precisa de Ajuda?

1. **Via Cursor AI**:
   ```
   "Preciso de ajuda com deploy"
   ```

2. **Render Support**:
   - Discord: https://discord.gg/render
   - Docs: https://render.com/docs

3. **Neon Support**:
   - Discord: https://discord.gg/neon
   - Docs: https://neon.tech/docs

---

**Última atualização**: 28/10/2025  
**Versão**: 1.0  
**Deploy Automático**: ✅ ATIVO

