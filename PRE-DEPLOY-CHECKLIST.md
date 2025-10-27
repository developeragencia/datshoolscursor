# ✅ Checklist Pré-Deploy - Dashtools

Use esta lista para verificar se tudo está pronto antes do deploy no Render.

## 📋 Verificação do Código

### Estrutura do Projeto
- [x] Projeto extraído da pasta ZIP
- [x] Arquivos na pasta principal (não em subpasta)
- [x] Pasta `node_modules/` não commitada
- [x] Pasta `dist/` não commitada

### Limpeza do Replit
- [x] Arquivo `replit.md` removido
- [x] Dependências `@replit/*` removidas do `package.json`
- [x] Script do Replit removido do `index.html`
- [x] Referências ao `replit.dev` atualizadas

### Arquivos de Configuração
- [x] `render.yaml` criado e configurado
- [x] `.gitignore` criado
- [x] `.env.example` criado
- [x] `package.json` sem erros de sintaxe
- [x] `tsconfig.json` válido

## 📋 Verificação Git

### Repositório
- [ ] Git inicializado (`git init`)
- [ ] Todos os arquivos adicionados (`git add .`)
- [ ] Primeiro commit feito (`git commit -m "Initial commit"`)
- [ ] Repositório remoto criado (GitHub/GitLab)
- [ ] Código enviado para o remoto (`git push`)

**Comandos para executar:**
```bash
git init
git add .
git commit -m "Preparado para deploy no Render"
git remote add origin https://github.com/SEU-USUARIO/dashtools.git
git push -u origin main
```

## 📋 Verificação do Banco de Dados

### Neon Database (Recomendado)
- [ ] Conta criada em https://neon.tech
- [ ] Projeto PostgreSQL criado
- [ ] Connection string copiada
- [ ] Connection string no formato:
  ```
  postgresql://username:password@host/database?sslmode=require
  ```

**OU**

### Render PostgreSQL
- [ ] Database criado no Render
- [ ] Internal Database URL copiada
- [ ] Database está no status "Available"

## 📋 Verificação do Render

### Conta e Configuração
- [ ] Conta criada em https://render.com
- [ ] Email verificado
- [ ] Método de pagamento adicionado (para planos pagos)

### Deploy
- [ ] Repositório Git conectado ao Render
- [ ] Serviço Web criado ou Blueprint usado
- [ ] Variáveis de ambiente configuradas:
  - [ ] `DATABASE_URL` (obrigatório)
  - [ ] `SESSION_SECRET` (gerado automaticamente)
  - [ ] `NODE_ENV` = production
  - [ ] `PORT` = 10000

## 📋 Pós-Deploy

### Migrações
- [ ] Deploy concluído com sucesso
- [ ] Shell do Render acessado
- [ ] Comando `npm run db:push` executado
- [ ] Tabelas criadas no banco de dados

### Testes Básicos
- [ ] URL do app acessível
- [ ] Página inicial carrega
- [ ] Registro de novo usuário funciona
- [ ] Login funciona
- [ ] Dashboard acessível
- [ ] Sem erros no console do navegador

### Integrações (Opcional)
- [ ] Facebook App configurado (se usar)
  - [ ] Callback URL: `https://seu-app.onrender.com/api/facebook/callback`
  - [ ] Variáveis `FACEBOOK_APP_ID` e `FACEBOOK_APP_SECRET` configuradas
- [ ] Google Ads configurado (se usar)
  - [ ] Variáveis do Google Ads configuradas

### Domínio Personalizado (Opcional)
- [ ] Domínio adicionado no Render
- [ ] DNS configurado (CNAME)
- [ ] SSL/HTTPS funcionando

## 🚨 Troubleshooting

### Deploy Falhou
1. [ ] Verifique os logs do build no Render
2. [ ] Confirme que `package.json` está correto
3. [ ] Verifique se todas as dependências estão listadas
4. [ ] Tente fazer rebuild manual

### App Não Inicia
1. [ ] Verifique variável `PORT` = 10000
2. [ ] Confirme que `DATABASE_URL` está correto
3. [ ] Verifique logs de runtime no Render
4. [ ] Execute `npm run db:push` no Shell

### Erro de Banco de Dados
1. [ ] Connection string está completa
2. [ ] Banco de dados está online/available
3. [ ] Firewall/SSL está configurado (`?sslmode=require`)
4. [ ] Tabelas foram criadas (`npm run db:push`)

### App Lento ou Offline
1. [ ] Plano Free: app dorme após 15min
2. [ ] Considere upgrade para Starter ($7/mês)
3. [ ] Verifique status do Render: https://status.render.com

## 📊 Planos e Custos

### Desenvolvimento/Teste (Free)
- [x] Web Service: Free
- [x] Neon Database: Free (3GB)
- ⚠️ **Limitação**: App dorme após 15min inativo
- **Custo: R$ 0/mês**

### Produção (Recomendado)
- [ ] Web Service: Starter ($7/mês)
- [ ] Neon Database: Free (3GB)
- ✅ **Vantagem**: App sempre ativo 24/7
- **Custo: ~R$ 35/mês**

## 📚 Documentação de Referência

- [ ] Li o `QUICKSTART.md` (deploy rápido)
- [ ] Li o `DEPLOY.md` (guia completo)
- [ ] Li o `README.md` (visão geral)
- [ ] Li o `CHANGELOG-RENDER.md` (mudanças)

## 🎯 Status do Deploy

**Data de início**: _______________

**Status atual**:
- [ ] Preparando código
- [ ] Código no Git
- [ ] Criando banco de dados
- [ ] Configurando Render
- [ ] Deploy em andamento
- [ ] Deploy concluído
- [ ] Testes realizados
- [ ] ✅ PRODUÇÃO ATIVA

**URL do app**: _______________________________________________

**Banco de dados**: [ ] Neon  [ ] Render PostgreSQL

**Plano**: [ ] Free  [ ] Starter  [ ] Pro

## 💡 Dicas Finais

1. **Mantenha backups**: Configure backups automáticos do banco
2. **Monitore**: Configure alertas de erro no Render
3. **Logs**: Verifique logs regularmente para identificar problemas
4. **Atualizações**: Mantenha dependências atualizadas
5. **Segurança**: Nunca commite `.env` ou credenciais no Git

## 🆘 Precisa de Ajuda?

- 📖 Documentação Render: https://render.com/docs
- 💬 Comunidade Render: https://community.render.com
- 🔍 Status do Render: https://status.render.com
- 📧 Suporte: Dashboard do Render > Help

---

## ✅ Tudo Pronto?

Quando todos os itens essenciais estiverem marcados, você está pronto para o deploy!

**Próximo passo**: Siga o `QUICKSTART.md` para deploy em 10 minutos! 🚀

