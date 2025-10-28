# 🗄️ Configuração do Neon Database - Dashtools

## 📊 Status Atual

O projeto já está configurado para usar **Neon Database** (PostgreSQL Serverless):

- ✅ Pacote `@neondatabase/serverless` instalado
- ✅ Drizzle ORM configurado
- ✅ WebSocket configurado para conexões
- ✅ Schema do banco definido

## 🎯 Duas Opções de Banco de Dados

### Opção 1: Usar o PostgreSQL do Render (Já Existe) ✓

**Banco Existente:**
- Nome: `dashtools-db`
- ID: `dpg-d3vsq3be5dus73abfu9g-a`
- Status: ✅ Available
- Plano: Free
- Região: Oregon

**Como Obter a Connection String:**

1. Acesse: https://dashboard.render.com/d/dpg-d3vsq3be5dus73abfu9g-a
2. Copie a **Internal Database URL** (mais rápida, mesma região)
3. Formato: `postgresql://usuario:senha@host:5432/banco`

### Opção 2: Criar um Banco no Neon (Recomendado para Serverless) ⭐

O Neon é otimizado para aplicações serverless e oferece:
- ✨ Auto-scaling instantâneo
- 💰 Plano gratuito generoso (0.5GB)
- ⚡ Conexões WebSocket (ideal para Render)
- 🔄 Branching de banco de dados
- 🌍 Menor latência em edge functions

---

## 🚀 Como Configurar o Neon Database

### Passo 1: Criar Conta no Neon

1. Acesse: https://console.neon.tech/signup
2. Faça login com GitHub ou Google
3. Crie um novo projeto

### Passo 2: Criar Projeto

1. Clique em **"Create a project"**
2. Configure:
   - **Project name**: `dashtools`
   - **Database name**: `dashtools_db`
   - **Region**: `US East (Ohio)` ou `US West (Oregon)` (mesma do Render)
   - **PostgreSQL version**: 16
3. Clique em **"Create Project"**

### Passo 3: Obter Connection String

Após criar o projeto, você verá:

```
📋 Connection String:
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Exemplo:**
```
postgresql://dashtools_user:AbC123XyZ789@ep-cool-pond-123456.us-east-2.aws.neon.tech/dashtools_db?sslmode=require
```

⚠️ **IMPORTANTE:** Salve esta string em local seguro!

### Passo 4: Configurar no Render

**Opção A: Via Dashboard (Mais Fácil)**

1. Acesse: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
2. Clique em **"Environment"** no menu lateral
3. Procure por `DATABASE_URL`
4. Se existir, clique em **"Edit"**
5. Se não existir, clique em **"Add Environment Variable"**
6. Configure:
   ```
   Key:   DATABASE_URL
   Value: [Cole a connection string do Neon aqui]
   ```
7. Clique em **"Save Changes"**
8. Aguarde o redeploy automático (2-3 minutos)

**Opção B: Via API (Automático)**

Execute no terminal (se preferir):
```bash
# Será configurado automaticamente via código
```

### Passo 5: Executar Migrations

Após configurar a DATABASE_URL, execute as migrations:

**No Render (Automático):**
As migrations serão executadas automaticamente no próximo deploy.

**Local (se quiser testar):**
```bash
npm run db:push
```

---

## 🔍 Verificação

### Como Verificar se Está Funcionando

1. **Verifique os logs no Render:**
   - Acesse: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
   - Clique em "Logs"
   - Procure por:
     ```
     ✅ Environment variables validated successfully
     DATABASE_URL: postgresql://...
     ```

2. **Teste a aplicação:**
   - Acesse: https://dashtools-5px2.onrender.com/login
   - Tente fazer login ou cadastro
   - Se funcionar = banco conectado! ✅

### Comandos de Verificação

```bash
# Verificar conexão local
npm run db:push

# Ver estrutura do banco
npx drizzle-kit studio
```

---

## 📊 Schema do Banco de Dados

O projeto usa o seguinte schema:

### Tabelas Principais:

1. **users** - Usuários do sistema
2. **ad_accounts** - Contas de anúncios
3. **campaigns** - Campanhas de marketing
4. **pixels** - Pixels de rastreamento
5. **sessions** - Sessões de usuário

### Migrations

As migrations estão em: `./migrations/`

---

## 🔧 Troubleshooting

### Erro: "Missing required environment variables: DATABASE_URL"

**Solução:**
1. Verifique se DATABASE_URL está configurada no Render
2. Formato correto: `postgresql://user:pass@host:5432/db?sslmode=require`

### Erro: "connection timeout"

**Solução:**
1. Verifique se a região do Neon é compatível (US East/West)
2. Confirme que `?sslmode=require` está na URL
3. Verifique se o IP do Render está permitido no Neon (normalmente é automático)

### Erro: "SSL connection required"

**Solução:**
Adicione `?sslmode=require` ao final da connection string:
```
postgresql://user:pass@host/db?sslmode=require
```

### Erro: "Database does not exist"

**Solução:**
Execute as migrations:
```bash
npm run db:push
```

---

## 📈 Monitoramento

### Neon Console

1. Acesse: https://console.neon.tech
2. Selecione seu projeto
3. Veja:
   - 📊 Uso de storage
   - 🔌 Conexões ativas
   - ⏱️ Query performance
   - 📉 Histórico de uso

### Render Logs

1. Acesse: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
2. Clique em "Logs"
3. Filtre por "database" ou "postgres"

---

## 🎁 Recursos do Neon (Plano Gratuito)

- ✅ 0.5 GB storage
- ✅ Unlimited queries
- ✅ 1 project
- ✅ 10 branches
- ✅ Auto-suspend após inatividade
- ✅ Backups diários

---

## 🔄 Migração de Dados

### Do Render PostgreSQL para Neon

Se você quiser migrar do banco do Render para o Neon:

```bash
# 1. Dump do banco atual
pg_dump [RENDER_DATABASE_URL] > backup.sql

# 2. Restore no Neon
psql [NEON_DATABASE_URL] < backup.sql

# 3. Atualize DATABASE_URL no Render
# 4. Redeploy
```

---

## 📝 Próximos Passos

1. ✅ Criar conta no Neon (ou usar Render PostgreSQL)
2. ✅ Obter connection string
3. ✅ Configurar DATABASE_URL no Render
4. ✅ Aguardar redeploy
5. ✅ Testar aplicação
6. ✅ Verificar logs

---

## 🆘 Suporte

- **Neon Docs:** https://neon.tech/docs
- **Render Docs:** https://render.com/docs/databases
- **Drizzle ORM:** https://orm.drizzle.team

---

## ✨ Configuração Atual do Projeto

```typescript
// server/db.ts
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export const pool = new Pool({ 
  connectionString: env.DATABASE_URL 
});

export const db = drizzle({ client: pool, schema });
```

**Pronto para usar!** ✅

