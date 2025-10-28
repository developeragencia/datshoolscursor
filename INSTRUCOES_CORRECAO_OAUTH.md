# 🚨 INSTRUÇÕES URGENTES - Correção Google OAuth

## ⚠️ PROBLEMA ATUAL

**Erro exibido**: 
```
Acesso bloqueado: a solicitação do app Datshools é inválida
Erro 400: redirect_uri_mismatch
```

## 🎯 CAUSA RAIZ

O Google Cloud Console está configurado com redirect URIs **INCOMPLETOS**:
- ❌ `https://datshoolscursor.onrender.com` (sem o path do callback)
- ❌ `https://dashtoolsapp.com` (sem o path do callback)

Mas o código está tentando usar:
- ✅ `https://datshoolscursor.onrender.com/api/auth/google/callback`
- ✅ `https://dashtoolsapp.com/api/auth/google/callback`

## 🔧 SOLUÇÃO RÁPIDA (5 minutos)

### 1. Acesse o Google Cloud Console

🔗 https://console.cloud.google.com/apis/credentials?project=datshools

### 2. Edite o Cliente OAuth 2.0

Clique no cliente com ID:
```
408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com
```

### 3. Na seção "URIs de redirecionamento autorizados", SUBSTITUA os URIs atuais por:

```
https://datshoolscursor.onrender.com/api/auth/google/callback
https://dashtoolsapp.com/api/auth/google/callback
http://localhost:5000/api/auth/google/callback
```

### 4. Na seção "Origens JavaScript autorizadas", mantenha:

```
https://datshoolscursor.onrender.com
https://dashtoolsapp.com
http://localhost:5000
```

### 5. Clique em SALVAR

### 6. Aguarde 30 segundos e teste novamente

## 📸 VISUAL DA CORREÇÃO

### ANTES (Incorreto):
```
┌─────────────────────────────────────────────────────────┐
│ URIs de redirecionamento autorizados                    │
├─────────────────────────────────────────────────────────┤
│ ❌ https://datshoolscursor.onrender.com                 │
│ ❌ https://dashtoolsapp.com                             │
└─────────────────────────────────────────────────────────┘
```

### DEPOIS (Correto):
```
┌────────────────────────────────────────────────────────────────┐
│ URIs de redirecionamento autorizados                           │
├────────────────────────────────────────────────────────────────┤
│ ✅ https://datshoolscursor.onrender.com/api/auth/google/callback │
│ ✅ https://dashtoolsapp.com/api/auth/google/callback           │
│ ✅ http://localhost:5000/api/auth/google/callback             │
└────────────────────────────────────────────────────────────────┘
```

## 🧪 COMO TESTAR

### Teste em Produção:
1. Acesse: https://datshoolscursor.onrender.com/login
2. Clique no botão "Fazer login com Google"
3. Selecione sua conta Google
4. Deve redirecionar para o dashboard ✅

### Teste Local:
1. Configure as variáveis de ambiente (veja `env.example.txt`)
2. Execute: `npm run dev`
3. Acesse: http://localhost:5000/login
4. Teste o Google OAuth

## 📊 VERIFICAÇÃO DE STATUS

### Como saber se a correção funcionou:

✅ **Sucesso**:
- Página do Google OAuth abre normalmente
- Seleção de conta funciona
- Redireciona para /dashboard
- Usuário está logado

❌ **Ainda com erro**:
- Tela de "Acesso bloqueado"
- Erro 400: redirect_uri_mismatch
- Não redireciona após autorização

## 🔍 LOGS PARA MONITORAR

No Render Dashboard (https://dashboard.render.com/):

Procure por:
```
✅ Google OAuth callback iniciado
✅ Tokens recebidos com sucesso
✅ Informações do usuário recebidas
✅ Sessão criada para usuário
✅ Redirecionando para dashboard
```

Ou erros:
```
❌ Token exchange error
❌ Erro ao salvar sessão
```

## 📝 CREDENCIAIS (Para Referência)

**Client ID**: 
```
408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com
```

**Client Secret**: 
```
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
```

**Project ID**: 
```
datshools
```

## ⏱️ TEMPO ESTIMADO

- **Fazer a correção**: 2-3 minutos
- **Propagação das mudanças**: 10-30 segundos
- **Teste completo**: 1-2 minutos

**Total**: ~5 minutos

## 📞 PRÓXIMOS PASSOS

1. ✅ Fazer a correção no Google Cloud Console (VOCÊ PRECISA FAZER ISSO)
2. ⏳ Aguardar propagação
3. ✅ Testar em produção
4. ✅ Confirmar que está funcionando
5. ✅ Documentar (já feito neste arquivo)

---

**Data**: 28/10/2025  
**Status**: ⚠️ AGUARDANDO CORREÇÃO NO GOOGLE CLOUD CONSOLE  
**Responsável**: Precisa ser feito manualmente no console do Google  
**Prioridade**: 🔴 ALTA - Funcionalidade crítica bloqueada

