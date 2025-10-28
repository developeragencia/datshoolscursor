# 🔐 Configuração do Google OAuth - Dashtools

## ✅ Status Atual

- ✓ Credenciais configuradas no Render
- ✓ Código de autenticação implementado
- ✓ Deploy em produção concluído

## 🚀 Próximo Passo: Configurar URLs no Google Cloud Console

Para que o login com Google funcione, você precisa adicionar as URLs autorizadas no Google Cloud Console.

### 📋 Passo a Passo:

#### 1. Acesse o Google Cloud Console
Vá para: https://console.cloud.google.com/apis/credentials

#### 2. Selecione o Projeto
- Procure pelo projeto relacionado ao Client ID: `408590510167`

#### 3. Clique no OAuth 2.0 Client ID
- Procure na lista por: `408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com`
- Clique para editar

#### 4. Adicione as URLs Autorizadas

**Origens JavaScript autorizadas:**
```
https://dashtools-5px2.onrender.com
http://localhost:5000
```

**URIs de redirecionamento autorizados:**
```
https://dashtools-5px2.onrender.com/api/auth/google/callback
http://localhost:5000/api/auth/google/callback
```

#### 5. Clique em "Salvar"

#### 6. Aguarde alguns minutos
- As alterações podem levar até 5 minutos para propagarem

---

## 🧪 Como Testar

### Teste em Produção:

1. Acesse: https://dashtools-5px2.onrender.com/login
2. Clique em "Entrar com Google"
3. Faça login com sua conta Google
4. Você será redirecionado para o dashboard

### Teste Local (opcional):

1. Clone o repositório
2. Configure o `.env` com as credenciais
3. Execute `npm install && npm run dev`
4. Acesse: http://localhost:5000/login
5. Teste o login com Google

---

## 🔍 Verificação de Problemas

Se ainda houver erros, verifique os logs no Render:

1. Acesse: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
2. Clique em "Logs"
3. Procure por mensagens de erro relacionadas a "Google OAuth"

**Erros comuns:**

| Erro | Causa | Solução |
|------|-------|---------|
| `redirect_uri_mismatch` | URL de callback não configurada | Adicione a URL no Google Console |
| `invalid_client` | Credenciais incorretas | Verifique GOOGLE_CLIENT_ID e SECRET |
| `access_denied` | Usuário cancelou | Normal - usuário não autorizou |

---

## 📝 Informações Técnicas

**Fluxo de Autenticação:**

1. Usuário clica em "Entrar com Google"
2. Redireciona para: `/api/auth/google`
3. Redireciona para: `https://accounts.google.com/o/oauth2/v2/auth`
4. Google redireciona de volta para: `/api/auth/google/callback`
5. Backend troca o código por tokens
6. Backend busca informações do usuário
7. Cria ou atualiza o usuário no banco
8. Cria sessão e redireciona para `/dashboard`

**Escopos solicitados:**
- `openid` - Identificador único
- `email` - Email do usuário
- `profile` - Nome e foto do perfil

---

## ✨ Funcionalidades Implementadas

- ✅ Login com Google
- ✅ Cadastro automático de novos usuários
- ✅ Integração com sistema de sessões
- ✅ Redirecionamento automático para dashboard
- ✅ Tratamento de erros completo
- ✅ Logs detalhados para debug

---

## 📞 Suporte

Se precisar de ajuda adicional, verifique:
- Documentação do Google OAuth: https://developers.google.com/identity/protocols/oauth2
- Logs do Render: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0

