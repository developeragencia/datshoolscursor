# 🚀 Dashtools - Sales Tracking Platform

[![Deploy Status](https://img.shields.io/badge/deploy-auto-brightgreen)](https://dashtools-5px2.onrender.com)
[![Database](https://img.shields.io/badge/database-neon-blue)](https://neon.tech)
[![MCP](https://img.shields.io/badge/MCP-enabled-orange)](https://modelcontextprotocol.io)

## 📊 Overview

Dashtools é uma plataforma de rastreamento de vendas para profissionais de marketing digital e criadores de infoprodutos no Brasil. Permite rastreamento preciso de campanhas de vendas, otimização de gastos com marketing e operações escaláveis.

**✨ Deploy Automático Configurado**: Qualquer push para `main` dispara deploy automático!

## Tecnologias

### Frontend
- **Framework**: React 18 com TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS com shadcn/ui components
- **State Management**: TanStack Query
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js com TypeScript
- **Framework**: Express.js
- **Database ORM**: Drizzle ORM (PostgreSQL)
- **Session Management**: PostgreSQL-based sessions

## Configuração para Desenvolvimento

### Pré-requisitos
- Node.js 18+
- PostgreSQL (ou Neon Database)

### Instalação

1. Clone o repositório
```bash
git clone <seu-repositorio>
cd Dashtools
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite `.env` e configure:
- `DATABASE_URL` - URL de conexão com PostgreSQL
- `SESSION_SECRET` - Chave secreta para sessões
- `PORT` - Porta do servidor (padrão: 5000)

4. Execute as migrações do banco de dados
```bash
npm run db:push
```

5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5000`

## 🚀 Deploy Automático (Configurado!)

### ✅ Status Atual

**Deploy Automático**: ATIVO  
**Serviço**: https://dashtools-5px2.onrender.com  
**Banco**: Neon PostgreSQL (17.5)  
**MCP**: Habilitado para automação via Cursor AI

### 📝 Único Passo Necessário

1. **Configurar DATABASE_URL no Render**:
   - Acesse: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
   - Vá em: Environment → Add Environment Variable
   - Adicione:
     ```
     Key: DATABASE_URL
     Value: [Connection string do Neon]
     ```
   - Salve e aguarde redeploy (2-3 minutos)

**PRONTO!** Deploy automático está funcionando ✅

### 🎯 Como Fazer Deploy

#### Método 1: Git Push (Automático)
```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
# ✨ Deploy automático inicia!
```

#### Método 2: Via Cursor AI + MCP (100% Automático)
Basta pedir ao Cursor:
```
"Adicione feature de notificações"
"Corrija o bug no cálculo de ROAS"
"Faça deploy da versão atual"
```
Cursor faz TUDO automaticamente via MCP!

### 📚 Documentação Completa

- **[Quick Start](DEPLOY_QUICK_START.md)** - Setup em 5 minutos
- **[Deploy Automático](DEPLOY_AUTOMATICO.md)** - Guia completo
- **[MCP + CI/CD](MCP_CICD_GUIDE.md)** - Automação via Cursor
- **[Banco de Dados](RELATORIO_VERIFICACAO_BD.md)** - Verificação completa

## 🛠️ Scripts Disponíveis

### Desenvolvimento
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm start` - Inicia o servidor em produção
- `npm run check` - Verifica tipos TypeScript

### Banco de Dados
- `npm run db:push` - Aplica migrações do banco de dados
- `npm run db:test` - Testa conexão com banco
- `npm run db:studio` - Interface visual do banco

### Setup
- `.\scripts\configure-env.ps1 dev` - Configurar ambiente (Windows)
- `./scripts/configure-env.sh dev` - Configurar ambiente (Linux/Mac)

## Integrações de Pagamento

A plataforma suporta mais de 70 integrações, incluindo:

### Processadores Brasileiros
- IronPay, FortPay, PerfectPay, BearPay

### Plataformas de Infoprodutos
- Hotmart, Kiwify, Eduzz, Monetizze, Braip, Ticto, Kirvano, Hubla, Guru

### E-commerce
- Shopify, WooCommerce, Yampi

### Internacional
- ClickBank, Digistore, Stripe

## Funcionalidades Principais

- ✅ Rastreamento de campanhas com UTM
- ✅ Dashboard de vendas em tempo real
- ✅ Integração com Facebook Ads e Google Ads
- ✅ Sistema de regras automatizadas
- ✅ Pagamentos via PIX e Cartão de Crédito
- ✅ Múltiplas contas de anúncios
- ✅ Webhooks para sincronização em tempo real

## Suporte

Para suporte, entre em contato via:
- WhatsApp: [Seu número]
- Instagram: [@dashtools]
- Email: suporte@dashtools.com.br

## Licença

MIT License - veja LICENSE para detalhes

