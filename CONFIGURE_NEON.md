# ⚡ Configuração Rápida do Neon Database

## 🎯 Opção 1: Criar Novo Banco no Neon (Recomendado)

### Passo 1: Criar Conta
1. Acesse: https://console.neon.tech/signup
2. Faça login com GitHub

### Passo 2: Criar Projeto
1. Clique em **"Create a project"**
2. Configure:
   - Project name: `dashtools`
   - Database name: `dashtools_db`
   - Region: **US West (Oregon)** ⚠️ (mesma do Render)
3. Clique em **"Create Project"**

### Passo 3: Copiar Connection String

Você verá algo assim:

```
postgresql://dashtools_owner:AbC123XyZ@ep-cool-name-123456.us-west-2.aws.neon.tech/dashtools_db?sslmode=require
```

**COPIE ESSA STRING INTEIRA!** 📋

### Passo 4: Configurar no Render

**Via Interface (Mais Fácil):**
1. Acesse: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
2. Clique em **"Environment"**
3. Procure `DATABASE_URL`:
   - Se existe: Clique **"Edit"**
   - Se não existe: Clique **"Add Environment Variable"**
4. Cole a connection string do Neon
5. Clique em **"Save Changes"**
6. ☕ Aguarde redeploy (2-3 min)

**Via Terminal (Avançado):**
```bash
# Será configurado automaticamente
```

### Passo 5: Executar Migrations

As migrations rodarão automaticamente no próximo deploy, mas você pode executar manualmente:

**No Render:**
1. No dashboard do serviço, clique em **"Shell"**
2. Execute:
   ```bash
   npm run db:push
   ```

**Local (para testar):**
```bash
# 1. Instale dependências
npm install

# 2. Configure .env local
cp .env.example .env
# Edite .env e cole a DATABASE_URL

# 3. Execute migrations
npm run db:push

# 4. Teste conexão
npm run db:test
```

---

## 🎯 Opção 2: Usar PostgreSQL do Render (Já Existe)

O projeto já tem um banco PostgreSQL no Render:

**Detalhes:**
- Nome: `dashtools-db`
- Status: ✅ Disponível
- Plano: Free
- Link: https://dashboard.render.com/d/dpg-d3vsq3be5dus73abfu9g-a

**Como Usar:**

1. Acesse o link acima
2. Copie a **Internal Database URL**
3. No serviço dashtools:
   - Vá em Environment
   - Adicione/edite `DATABASE_URL`
   - Cole a URL copiada
4. Save e aguarde redeploy

⚠️ **Nota:** O PostgreSQL do Render free tem limitações:
- Expira em: 26 de Novembro de 2025
- Menos otimizado para serverless
- Sem auto-scaling

---

## ✅ Verificação

### 1. Verifique os Logs

Acesse: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0

Procure por:
```
✅ Environment variables validated successfully
   DATABASE_URL: postgresql://...
```

### 2. Teste a Aplicação

1. Acesse: https://dashtools-5px2.onrender.com/register
2. Tente criar uma conta
3. Se funcionar = banco conectado! ✅

### 3. Verifique as Tabelas

No Render Shell:
```bash
npm run db:test
```

Deve mostrar:
```
✅ Successfully connected to database!
📋 Existing Tables:
   - users
   - sessions
   - campaigns
   - pixels
   ...
```

---

## 🔧 Troubleshooting

### ❌ Erro: "Missing required environment variables: DATABASE_URL"

**Solução:**
A DATABASE_URL não está configurada no Render.
Siga o Passo 4 acima.

### ❌ Erro: "connection timeout"

**Soluções:**
1. Verifique se escolheu a região **US West (Oregon)** no Neon
2. Confirme que a URL tem `?sslmode=require` no final
3. Tente novamente em 1 minuto (às vezes é temporário)

### ❌ Erro: "SSL connection required"

**Solução:**
Adicione `?sslmode=require` ao final da connection string:
```
postgresql://user:pass@host/db?sslmode=require
         └─ Adicione isso ─────────┘
```

### ❌ Erro: "Database does not exist"

**Solução:**
Execute as migrations:
```bash
npm run db:push
```

---

## 📊 Comandos Úteis

```bash
# Testar conexão com banco
npm run db:test

# Aplicar migrations
npm run db:push

# Abrir Drizzle Studio (interface visual)
npm run db:studio
```

---

## 🎁 Plano Gratuito do Neon

- ✅ 0.5 GB storage
- ✅ Queries ilimitadas
- ✅ 1 projeto
- ✅ 10 branches (staging/dev)
- ✅ Auto-suspend (economiza recursos)
- ✅ Backups diários
- ✅ **MUITO MELHOR** para apps serverless!

---

## 📚 Documentação

- **Neon Docs:** https://neon.tech/docs/get-started-with-neon/signing-up
- **Guia Completo:** Ver `NEON_DATABASE_SETUP.md`
- **Render Docs:** https://render.com/docs/databases

---

## 🚀 Resumo Rápido (1 minuto)

```bash
# 1. Criar conta Neon: https://console.neon.tech/signup
# 2. Criar projeto "dashtools" em Oregon
# 3. Copiar connection string
# 4. Ir em: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
# 5. Environment > Add Variable:
#    DATABASE_URL = [colar string aqui]
# 6. Save Changes
# 7. Aguardar deploy (2 min)
# 8. Testar: https://dashtools-5px2.onrender.com
```

✅ **PRONTO!**

