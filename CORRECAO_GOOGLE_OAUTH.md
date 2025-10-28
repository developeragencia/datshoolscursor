# 🔧 Correção do Google OAuth - redirect_uri_mismatch

## 📋 Problema Identificado

**Erro**: `Erro 400: redirect_uri_mismatch`

**Causa**: Os redirect URIs configurados no Google Cloud Console estão incompletos.

### ❌ Configuração Atual (Incorreta)
```
redirect_uris: [
  "https://datshoolscursor.onrender.com",
  "https://dashtoolsapp.com"
]
```

### ✅ Configuração Necessária (Correta)
```
redirect_uris: [
  "https://datshoolscursor.onrender.com/api/auth/google/callback",
  "https://dashtoolsapp.com/api/auth/google/callback",
  "http://localhost:5000/api/auth/google/callback"
]
```

## 🛠️ Passo a Passo para Corrigir

### 1️⃣ Acessar o Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Selecione o projeto: **datshools**

### 2️⃣ Navegar até as Credenciais

1. No menu lateral, vá em **APIs e Serviços** → **Credenciais**
2. Localize o cliente OAuth 2.0: `408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com`
3. Clique no ícone de **editar** (lápis)

### 3️⃣ Atualizar os URIs de Redirecionamento Autorizados

Na seção **URIs de redirecionamento autorizados**, adicione os seguintes URIs:

```
https://datshoolscursor.onrender.com/api/auth/google/callback
https://dashtoolsapp.com/api/auth/google/callback
http://localhost:5000/api/auth/google/callback
```

### 4️⃣ Atualizar as Origens JavaScript Autorizadas

Na seção **Origens JavaScript autorizadas**, mantenha:

```
https://datshoolscursor.onrender.com
https://dashtoolsapp.com
http://localhost:5000
```

### 5️⃣ Salvar as Alterações

1. Clique em **Salvar**
2. Aguarde alguns segundos para as alterações propagarem

## 🧪 Testar a Correção

### Ambiente de Produção
1. Acesse: https://datshoolscursor.onrender.com/login
2. Clique em "Fazer login com Google"
3. Selecione sua conta Google
4. Verifique se o login é realizado com sucesso

### Ambiente Local (Desenvolvimento)
```bash
# Certifique-se de que as variáveis de ambiente estão configuradas
$env:GOOGLE_CLIENT_ID="408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com"
$env:GOOGLE_CLIENT_SECRET="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"
$env:DATABASE_URL="postgresql://neondb_owner:npg_Gnqe4wZvmc1B@ep-autumn-bonus-aeacerp5-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require"
$env:SESSION_SECRET="your-secret-key-here"

# Inicie o servidor
npm run dev

# Acesse http://localhost:5000/login e teste o Google OAuth
```

## 📝 Informações de Configuração

### Credenciais do Google OAuth
```json
{
  "client_id": "408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com",
  "client_secret": "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",
  "project_id": "datshools"
}
```

### URIs Corretos
- **Produção (Render)**: `https://datshoolscursor.onrender.com/api/auth/google/callback`
- **Domínio Customizado**: `https://dashtoolsapp.com/api/auth/google/callback`
- **Desenvolvimento Local**: `http://localhost:5000/api/auth/google/callback`

## ⚠️ Notas Importantes

1. **Propagação**: As alterações podem levar alguns minutos para propagar
2. **HTTPS Obrigatório**: Em produção, o Google OAuth só funciona com HTTPS
3. **Cookies**: Certifique-se de que os cookies estão habilitados no navegador
4. **Sessões**: O servidor usa `express-session` para gerenciar as sessões de login

## 🔍 Verificação de Logs

Se o erro persistir, verifique os logs do servidor:

```bash
# No Render Dashboard
1. Acesse: https://dashboard.render.com/
2. Selecione o serviço "dashtools"
3. Vá em "Logs"
4. Procure por mensagens com "Google OAuth"
```

## 📞 Suporte

Se ainda tiver problemas após seguir este guia:

1. Verifique se todas as variáveis de ambiente estão configuradas no Render
2. Confirme que o `SESSION_SECRET` está configurado
3. Revise os logs para erros específicos
4. Verifique se o banco de dados Neon está acessível

---

**Última atualização**: 28/10/2025
**Status**: Correção Pendente de Aplicação no Google Cloud Console

