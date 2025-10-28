# 🔧 Troubleshooting - Erro Deploy Render

## 📊 Como Verificar o Erro

1. **Acesse o Render Dashboard**:
   - https://dashboard.render.com/
   - Selecione o serviço "dashtools"
   - Clique em "Logs"

2. **Procure por mensagens de erro**:
   - Erros de build (npm install, npm run build)
   - Erros de start (node dist/index.js)
   - Erros de variáveis de ambiente
   - Erros de conexão com banco de dados

## 🔍 Erros Comuns e Soluções

### Erro 1: Falha no Build
```
Error: Cannot find module 'X'
npm ERR! Build failed
```

**Solução**:
```bash
# Verificar se todas as dependências estão no package.json
# Commit e push novamente
git add package.json
git commit -m "fix: Atualiza dependências"
git push origin main
```

### Erro 2: Variáveis de Ambiente Faltando
```
Error: DATABASE_URL is required
Error: SESSION_SECRET is required
```

**Solução**:
1. No Render Dashboard → dashtools → Environment
2. Adicionar variáveis:
   - `DATABASE_URL`: `postgresql://neondb_owner:npg_Gnqe4wZvmc1B@ep-autumn-bonus-aeacerp5-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require`
   - `GOOGLE_CLIENT_ID`: `408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com`
   - `GOOGLE_CLIENT_SECRET`: `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`
   - `SESSION_SECRET`: (gerado automaticamente)
3. Clicar em "Save Changes"

### Erro 3: Timeout no Build
```
Build exceeded time limit
```

**Solução**:
- Aguardar e tentar novamente
- Ou simplificar o build no render.yaml

### Erro 4: Erro ao Iniciar Servidor
```
Error: Cannot start server
Port already in use
```

**Solução**:
- Verificar se PORT está configurado (10000)
- Reiniciar o serviço manualmente

### Erro 5: Erro de Conexão com Neon
```
Connection refused
Database connection failed
```

**Solução**:
1. Verificar se DATABASE_URL está correto
2. Testar conexão: `npm run db:test`
3. Verificar se Neon database está ativo

## 🛠️ Comandos para Testar Localmente

### Teste 1: Build Local
```bash
npm install
npm run build
```

### Teste 2: Iniciar Local
```bash
# Configurar variáveis
$env:DATABASE_URL="postgresql://neondb_owner:npg_Gnqe4wZvmc1B@ep-autumn-bonus-aeacerp5-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require"
$env:SESSION_SECRET="test-secret"
$env:GOOGLE_CLIENT_ID="408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com"
$env:GOOGLE_CLIENT_SECRET="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"

# Iniciar
npm start
```

### Teste 3: Testar Conexão BD
```bash
$env:DATABASE_URL="postgresql://neondb_owner:npg_Gnqe4wZvmc1B@ep-autumn-bonus-aeacerp5-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require"
npm run db:test
```

## 📋 Checklist de Variáveis de Ambiente

No Render Dashboard → dashtools → Environment, verificar se estão configuradas:

- [ ] `NODE_ENV` = production
- [ ] `DATABASE_URL` = (string de conexão Neon)
- [ ] `SESSION_SECRET` = (gerado automaticamente)
- [ ] `PORT` = 10000
- [ ] `NODE_OPTIONS` = --max-old-space-size=2048
- [ ] `NPM_CONFIG_PRODUCTION` = false
- [ ] `GOOGLE_CLIENT_ID` = 408590510167-...
- [ ] `GOOGLE_CLIENT_SECRET` = GOCSPX-...

## 🔄 Forçar Novo Deploy

Se o deploy estiver travado:

1. No Render Dashboard → dashtools
2. Clicar em "Manual Deploy" → "Deploy latest commit"
3. Ou fazer um commit vazio:
```bash
git commit --allow-empty -m "chore: Força novo deploy"
git push origin main
```

## 📞 Verificar Status do Serviço

1. Render Dashboard → dashtools
2. Verificar "Status":
   - 🟢 Live = Funcionando
   - 🟡 Building = Construindo
   - 🔴 Failed = Erro
3. Clicar em "Events" para ver histórico

## 🆘 Se Nada Funcionar

### Opção 1: Recriar Serviço
1. Deletar serviço atual no Render
2. Criar novo serviço via render.yaml:
   - https://dashboard.render.com/select-repo?type=blueprint

### Opção 2: Deploy Manual
1. Criar serviço manualmente no Render
2. Configurar:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node
   - Branch: main
3. Adicionar todas as variáveis de ambiente manualmente

## 📝 Logs Úteis

Procurar por estas mensagens nos logs do Render:

### ✅ Sucesso:
```
✅ Build successful
✅ Starting server...
✅ Database connected
serving on port 10000
==> Your service is live 🎉
```

### ❌ Erro:
```
❌ Build failed
❌ Error: MODULE_NOT_FOUND
❌ Database connection failed
❌ Error: Cannot find module
```

## 🔗 Links Úteis

- Render Dashboard: https://dashboard.render.com/
- Neon Console: https://console.neon.tech/
- GitHub Repo: https://github.com/developeragencia/datshoolscursor
- Google Cloud Console: https://console.cloud.google.com/

---

**ME ENVIE O ERRO ESPECÍFICO DOS LOGS DO RENDER PARA QUE EU POSSA AJUDAR MELHOR!**

Copie e cole a mensagem de erro completa que aparece nos logs.

