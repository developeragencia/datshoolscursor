# 🚀 Quickstart - Deploy no Render

Guia rápido para colocar o Dashtools no ar em 10 minutos.

## ⚡ Deploy Rápido

### 1. Prepare o Repositório Git

```bash
# Inicialize o git (se ainda não tiver)
git init
git add .
git commit -m "Initial commit"

# Suba para o GitHub/GitLab
git remote add origin https://github.com/seu-usuario/dashtools.git
git push -u origin main
```

### 2. Crie o Banco de Dados (Neon - Grátis)

1. Acesse: https://neon.tech
2. Crie uma conta
3. Clique em **Create Project**
4. Copie a **Connection String**
   - Formato: `postgresql://username:password@host/database?sslmode=require`

### 3. Deploy no Render

#### Via Blueprint (Automático) ⭐ RECOMENDADO

1. Acesse: https://dashboard.render.com
2. Clique em **New +** → **Blueprint**
3. Conecte seu repositório
4. O Render detectará o `render.yaml`
5. Configure APENAS UMA variável:
   - `DATABASE_URL` = cole a string do Neon
6. Clique em **Apply**
7. ☕ Aguarde 3-5 minutos

#### Via Web Service (Manual)

1. Acesse: https://dashboard.render.com
2. Clique em **New +** → **Web Service**
3. Conecte seu repositório
4. Configure:
   ```
   Name: dashtools
   Region: Oregon
   Branch: main
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
5. Adicione variáveis de ambiente:
   ```
   DATABASE_URL = sua-connection-string-do-neon
   NODE_ENV = production
   SESSION_SECRET = (clique em Generate)
   PORT = 10000
   ```
6. Clique em **Create Web Service**

### 4. Execute as Migrações

Após o deploy concluir:

1. No dashboard do Render, clique no seu serviço
2. Vá em **Shell** (menu lateral)
3. Execute:
   ```bash
   npm run db:push
   ```
4. Aguarde a mensagem de sucesso

### 5. Acesse seu App! 🎉

Sua URL será algo como:
```
https://dashtools.onrender.com
```

Teste:
- ✅ Criar conta
- ✅ Login
- ✅ Acessar dashboard

## 🔧 Configuração de Domínio Próprio (Opcional)

Se você tem um domínio (ex: `dashtools.com.br`):

1. No Render, vá em **Settings** → **Custom Domain**
2. Adicione seu domínio
3. Configure no seu provedor DNS:
   ```
   Type: CNAME
   Name: @ ou www
   Value: seu-app.onrender.com
   ```
4. Aguarde propagação (até 24h, geralmente 5-10min)

## 📱 Integrações (Opcional)

### Facebook Ads

Se precisar integrar Facebook:

1. Vá em https://developers.facebook.com
2. Crie um app
3. Configure OAuth redirect:
   ```
   https://seu-app.onrender.com/api/facebook/callback
   ```
4. No Render, adicione as variáveis:
   ```
   FACEBOOK_APP_ID = seu-app-id
   FACEBOOK_APP_SECRET = seu-app-secret
   ```
5. Reinicie o serviço

### Google Ads

Se precisar integrar Google Ads:

1. Configure no Google Cloud Console
2. Adicione as variáveis no Render:
   ```
   GOOGLE_ADS_CLIENT_ID = seu-client-id
   GOOGLE_ADS_CLIENT_SECRET = seu-secret
   GOOGLE_ADS_DEVELOPER_TOKEN = seu-token
   ```
3. Reinicie o serviço

## ⚠️ Problemas Comuns

### Site não carrega

**Problema**: Erro 500 ou página em branco

**Solução**:
1. Verifique os logs no Render
2. Confirme que `DATABASE_URL` está correto
3. Execute `npm run db:push` no Shell

### "Application failed to respond"

**Problema**: Timeout ao iniciar

**Solução**:
1. Verifique se o build terminou
2. Confirme que `PORT` está como `10000`
3. Aguarde alguns minutos (primeiro deploy pode demorar)

### Banco de dados não conecta

**Problema**: Erro de conexão com PostgreSQL

**Solução**:
1. Verifique se a string do Neon está completa
2. Confirme que tem `?sslmode=require` no final
3. Teste a conexão no Shell do Render:
   ```bash
   npm run check
   ```

## 💰 Custos

### Plano Free (Para Começar)
- ✅ Web Service: Grátis
- ✅ Neon Database: Grátis (até 3GB)
- ⚠️ Limitação: App "dorme" após 15min inativo
- **Total: R$ 0/mês**

### Plano Produção (Recomendado)
- ✅ Web Service Starter: $7/mês
- ✅ Neon Database: Grátis (até 3GB)
- ✅ App sempre ativo 24/7
- **Total: ~R$ 35/mês**

## 📚 Próximos Passos

Depois do deploy:
1. ✅ Configure seu domínio personalizado
2. ✅ Adicione suas integrações de pagamento
3. ✅ Configure Facebook/Google Ads (se usar)
4. ✅ Customize o branding
5. ✅ Configure backups automáticos

## 🆘 Precisa de Ajuda?

- 📖 Guia completo: Veja `DEPLOY.md`
- 📄 Documentação Render: https://render.com/docs
- 💬 Comunidade: https://community.render.com

---

**Pronto em 10 minutos!** ⚡

Qualquer dúvida, consulte o arquivo `DEPLOY.md` para instruções detalhadas.

