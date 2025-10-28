# 🔐 Credenciais Google OAuth - Dashtools

## ✅ Credenciais Configuradas

---

## 📋 INFORMAÇÕES DAS CREDENCIAIS

### Google Cloud Project
- **Project ID**: datshools
- **Client ID**: `408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com`
- **Client Secret**: `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`

### URLs Autorizadas

**Redirect URIs**:
- ✅ `https://datshoolscursor.onrender.com/api/auth/google/callback`
- ✅ `https://dashtoolsapp.com/api/auth/google/callback`

**JavaScript Origins**:
- ✅ `https://datshoolscursor.onrender.com`
- ✅ `https://dashtoolsapp.com`

---

## 🚀 CONFIGURAR NO RENDER

### Opção 1: Via Dashboard (Recomendado)

1. **Acesse o serviço**:
   ```
   https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
   ```

2. **Vá em**: Environment (menu lateral esquerdo)

3. **Adicione ou Atualize**:

   **GOOGLE_CLIENT_ID**:
   ```
   Key:   GOOGLE_CLIENT_ID
   Value: 408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com
   ```

   **GOOGLE_CLIENT_SECRET**:
   ```
   Key:   GOOGLE_CLIENT_SECRET
   Value: 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
   ```

4. **Clique**: "Save Changes"

5. **Aguarde**: Redeploy automático (2-3 min)

---

### Opção 2: Via Render CLI

```bash
# Instalar Render CLI (se não tiver)
npm install -g @render/cli

# Login
render login

# Configurar variáveis
render env set GOOGLE_CLIENT_ID="408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com" \
  --service srv-d3vsptq4d50c73e5h7b0

render env set GOOGLE_CLIENT_SECRET="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" \
  --service srv-d3vsptq4d50c73e5h7b0
```

---

## 🔧 CONFIGURAR LOCALMENTE (Desenvolvimento)

### Arquivo `.env` (Local)

Crie ou atualize o arquivo `.env` na raiz do projeto:

```env
# Google OAuth
GOOGLE_CLIENT_ID=408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Database
DATABASE_URL=postgresql://neondb_owner:npg_Gnqe4wZvmc1B@ep-autumn-bonus-aeacerp5-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require

# Session
SESSION_SECRET=dashtools_dev_secret_change_in_production

# Server
NODE_ENV=development
PORT=5000
```

### Ou use o script:

**Windows (PowerShell)**:
```powershell
.\scripts\configure-env.ps1 dev
```

**Linux/Mac (Bash)**:
```bash
./scripts/configure-env.sh dev
```

---

## 🌐 CONFIGURAR NO GOOGLE CLOUD CONSOLE

### 1. Verificar URLs Autorizadas

1. Acesse: https://console.cloud.google.com/apis/credentials

2. Selecione o projeto: **datshools**

3. Clique nas credenciais OAuth 2.0

4. **Verifique se estão configuradas**:

   **URIs de redirecionamento autorizados**:
   ```
   https://datshoolscursor.onrender.com/api/auth/google/callback
   https://dashtoolsapp.com/api/auth/google/callback
   http://localhost:5000/api/auth/google/callback (para dev)
   ```

   **Origens JavaScript autorizadas**:
   ```
   https://datshoolscursor.onrender.com
   https://dashtoolsapp.com
   http://localhost:5000 (para dev)
   ```

### 2. Adicionar URL Local (Desenvolvimento)

Se quiser testar localmente, adicione:

**Redirect URI**:
```
http://localhost:5000/api/auth/google/callback
```

**JavaScript Origin**:
```
http://localhost:5000
```

---

## ✅ VERIFICAR CONFIGURAÇÃO

### No Render (Produção)

1. Acesse os logs:
   ```
   https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0/logs
   ```

2. Procure por:
   ```
   ✅ Environment variables validated successfully
   GOOGLE_CLIENT_ID: Set ✓
   GOOGLE_CLIENT_SECRET: Set ✓
   ```

### Localmente (Desenvolvimento)

```bash
npm run dev
```

Procure nos logs:
```
✅ Environment variables validated successfully
   GOOGLE_CLIENT_ID: Set ✓
   GOOGLE_CLIENT_SECRET: Set ✓
```

---

## 🧪 TESTAR GOOGLE OAUTH

### 1. Acesse a aplicação:

**Produção**:
```
https://dashtools-5px2.onrender.com/login
```

**Local**:
```
http://localhost:5000/login
```

### 2. Clique em "Entrar com Google"

### 3. Fluxo Esperado:

1. ✅ Redireciona para tela de login do Google
2. ✅ Você autoriza a aplicação
3. ✅ Redireciona de volta para a aplicação
4. ✅ URL de redirect: `https://dashtools-5px2.onrender.com/api/auth/google/callback`
5. ✅ Cria conta (se novo usuário) ou faz login
6. ✅ Redireciona para `/dashboard`
7. ✅ Você está logado!

### 4. Em Caso de Erro:

**Erro: "google_oauth_not_configured"**
- Variáveis de ambiente não configuradas no Render
- Solução: Configure GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET

**Erro: "redirect_uri_mismatch"**
- URL de redirect não está autorizada no Google Console
- Solução: Adicione a URL no Google Cloud Console

**Erro: "google_auth_error"**
- Erro genérico no processo
- Solução: Verifique os logs para mais detalhes

---

## 📊 FLUXO COMPLETO DO GOOGLE OAUTH

```
┌────────────────────────────────────────┐
│  1. Usuário clica "Entrar com Google"  │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│  2. GET /api/auth/google               │
│     Redireciona para Google            │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│  3. Tela de Login do Google            │
│     Usuário autoriza a aplicação       │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│  4. Google redireciona com code        │
│     URL: /api/auth/google/callback     │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│  5. Backend troca code por tokens      │
│     Obtém access_token                 │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│  6. Backend busca dados do usuário     │
│     Email, nome, foto                  │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│  7. Verifica se usuário existe         │
│     Se não: cria novo usuário          │
│     Se sim: usa existente              │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│  8. Cria sessão                        │
│     req.session.userId = user.id       │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│  9. Redireciona para /dashboard        │
│     Usuário está logado!               │
└────────────────────────────────────────┘
```

---

## 🔐 SEGURANÇA

### Boas Práticas

✅ **NUNCA** commite as credenciais no Git  
✅ **SEMPRE** use variáveis de ambiente  
✅ **MANTENHA** o client_secret privado  
✅ **LIMITE** as URLs autorizadas apenas às necessárias  
✅ **REVOGUE** credenciais antigas se houver vazamento  

### Revogar Credenciais (Se Necessário)

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Selecione as credenciais OAuth 2.0
3. Clique em "Delete" ou "Reset Secret"
4. Gere novas credenciais
5. Atualize no Render e localmente

---

## 📝 CREDENCIAIS COMPLETAS (JSON)

```json
{
  "web": {
    "client_id": "408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com",
    "project_id": "datshools",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "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",
    "redirect_uris": [
      "https://datshoolscursor.onrender.com/api/auth/google/callback",
      "https://dashtoolsapp.com/api/auth/google/callback"
    ],
    "javascript_origins": [
      "https://datshoolscursor.onrender.com",
      "https://dashtoolsapp.com"
    ]
  }
}
```

---

## 🎯 CHECKLIST FINAL

### Configuração no Render

- [ ] GOOGLE_CLIENT_ID configurado
- [ ] GOOGLE_CLIENT_SECRET configurado
- [ ] Redeploy concluído
- [ ] Logs mostram variáveis configuradas

### Configuração no Google Console

- [ ] URLs de redirect autorizadas
- [ ] JavaScript origins autorizadas
- [ ] Credenciais ativas

### Testes

- [ ] Login com Google funciona em produção
- [ ] Novos usuários são criados corretamente
- [ ] Usuários existentes fazem login
- [ ] Redirecionamento funciona
- [ ] Sessão persiste após login

---

## 📞 LINKS ÚTEIS

- **Render Dashboard**: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
- **Google Console**: https://console.cloud.google.com/apis/credentials
- **Aplicação**: https://dashtools-5px2.onrender.com
- **Documentação**: [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md)

---

## 🆘 TROUBLESHOOTING

### Erro: "Access blocked: This app's request is invalid"

**Causa**: URL de redirect não autorizada  
**Solução**: Adicione a URL no Google Cloud Console

### Erro: "The redirect URI in the request does not match"

**Causa**: URL de redirect não coincide  
**Solução**: Verifique se a URL no código é exatamente igual à configurada no Google

### Erro: "invalid_client"

**Causa**: Client ID ou Secret incorretos  
**Solução**: Verifique se copiou corretamente as credenciais

### Botão Google não aparece

**Causa**: Variáveis não configuradas  
**Solução**: Configure GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET

---

**Data**: 28/10/2025  
**Status**: ✅ CREDENCIAIS PRONTAS PARA CONFIGURAR  
**Próximo Passo**: Configurar no Render Dashboard

