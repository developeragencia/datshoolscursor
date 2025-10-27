# Guia de Deploy no Render

Este guia mostra como fazer o deploy do Dashtools no Render.com.

## Pré-requisitos

1. Conta no [Render](https://render.com)
2. Código-fonte em um repositório Git (GitHub, GitLab ou Bitbucket)
3. Conta no [Neon Database](https://neon.tech) (opcional, mas recomendado)

## Passo 1: Criar o Banco de Dados PostgreSQL

### Opção A: Usar Neon Database (Recomendado)

1. Acesse [Neon.tech](https://neon.tech) e crie uma conta
2. Crie um novo projeto
3. Copie a connection string (formato: `postgresql://...`)
4. Guarde essa string para usar no próximo passo

### Opção B: Usar PostgreSQL do Render

1. No dashboard do Render, clique em **New +** > **PostgreSQL**
2. Configure:
   - **Name**: `dashtools-db`
   - **Database**: `dashtools`
   - **User**: (gerado automaticamente)
   - **Region**: escolha a mais próxima dos seus usuários
   - **Plan**: Free ou Starter
3. Clique em **Create Database**
4. Aguarde a criação e copie a **Internal Database URL**

## Passo 2: Fazer Deploy do Web Service

### Método 1: Deploy Automático via render.yaml

1. Conecte seu repositório ao Render:
   - No dashboard, clique em **New +** > **Blueprint**
   - Selecione seu repositório
   - O Render detectará automaticamente o `render.yaml`

2. Configure as variáveis de ambiente:
   - `DATABASE_URL`: cole a connection string do banco de dados
   - Outras variáveis já estarão configuradas automaticamente

3. Clique em **Apply** para iniciar o deploy

### Método 2: Deploy Manual

1. No dashboard do Render, clique em **New +** > **Web Service**

2. Conecte seu repositório Git

3. Configure o serviço:
   ```
   Name: dashtools
   Region: Oregon (ou mais próxima)
   Branch: main
   Root Directory: (deixe em branco)
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   Plan: Free ou Starter
   ```

4. Adicione as variáveis de ambiente:
   ```
   DATABASE_URL = sua-connection-string-aqui
   NODE_ENV = production
   SESSION_SECRET = (clique em "Generate" para criar uma chave aleatória)
   PORT = 10000
   ```

5. Clique em **Create Web Service**

## Passo 3: Configurar o Banco de Dados

Após o primeiro deploy, você precisa executar as migrações:

1. No dashboard do Render, acesse seu Web Service
2. Vá em **Shell** (menu lateral)
3. Execute:
   ```bash
   npm run db:push
   ```

Isso criará todas as tabelas necessárias no banco de dados.

## Passo 4: Configurar Domínio Personalizado (Opcional)

1. No dashboard do Web Service, vá em **Settings**
2. Role até **Custom Domain**
3. Clique em **Add Custom Domain**
4. Digite seu domínio (ex: `dashtools.com.br`)
5. Siga as instruções para configurar os registros DNS

## Passo 5: Configurar Integrações (Opcional)

### Facebook Ads

Se você usa integração com Facebook:

1. Acesse [Facebook for Developers](https://developers.facebook.com)
2. Configure o callback URL:
   ```
   https://seu-app.onrender.com/api/facebook/callback
   ```
3. Adicione as variáveis de ambiente no Render:
   ```
   FACEBOOK_APP_ID = seu-app-id
   FACEBOOK_APP_SECRET = seu-app-secret
   ```

### Google Ads

Se você usa integração com Google Ads:

1. Configure no [Google Cloud Console](https://console.cloud.google.com)
2. Adicione as variáveis de ambiente:
   ```
   GOOGLE_ADS_CLIENT_ID = seu-client-id
   GOOGLE_ADS_CLIENT_SECRET = seu-client-secret
   GOOGLE_ADS_DEVELOPER_TOKEN = seu-developer-token
   ```

## Verificação de Deploy

Após o deploy:

1. Acesse a URL fornecida pelo Render (ex: `https://dashtools.onrender.com`)
2. Teste o registro de novo usuário
3. Teste o login
4. Verifique se o dashboard carrega corretamente

## Troubleshooting

### Erro: "Could not find the build directory"

Execute manualmente no Shell:
```bash
npm run build
```

### Erro de Conexão com Banco de Dados

Verifique:
- A variável `DATABASE_URL` está correta
- O banco de dados está ativo
- As migrações foram executadas (`npm run db:push`)

### Erro 500 no Servidor

Verifique os logs:
1. No dashboard do Render, acesse **Logs**
2. Procure por erros em vermelho
3. Corrija as variáveis de ambiente se necessário

### Site Carregando Lento (Plano Free)

O plano Free do Render desliga o serviço após 15 minutos de inatividade. Considere:
- Upgrade para o plano Starter ($7/mês)
- Usar um serviço de "keep-alive" (ping periódico)

## Manutenção

### Atualizar o Código

1. Faça push das mudanças para o repositório Git
2. O Render fará deploy automaticamente
3. Monitore os logs para garantir sucesso

### Backup do Banco de Dados

Se usar PostgreSQL do Render:
1. Acesse o banco de dados no dashboard
2. Vá em **Backups** > **Create Backup**

Se usar Neon:
- Backups automáticos já estão habilitados

### Monitoramento

O Render oferece:
- Logs em tempo real
- Métricas de uso (CPU, memória)
- Alertas por email

Configure notificações em **Settings** > **Notifications**

## Custos Estimados

### Plano Free
- Web Service: Grátis (com limitações)
- PostgreSQL: Grátis (expira em 90 dias)
- Total: **R$ 0/mês**

### Plano Recomendado para Produção
- Web Service Starter: $7/mês (~R$ 35/mês)
- Neon Database: Grátis ou $19/mês (~R$ 95/mês)
- Total: **R$ 35-130/mês**

## Suporte

Para mais informações:
- [Documentação do Render](https://render.com/docs)
- [Comunidade do Render](https://community.render.com)
- [Status do Render](https://status.render.com)

---

**Pronto!** Seu Dashtools está no ar! 🚀

