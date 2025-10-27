# Dashtools - Sales Tracking Platform

## Overview

Dashtools é uma plataforma de rastreamento de vendas para profissionais de marketing digital e criadores de infoprodutos no Brasil. Permite rastreamento preciso de campanhas de vendas, otimização de gastos com marketing e operações escaláveis.

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

## Deploy no Render

### Método 1: Via Dashboard

1. Crie uma conta no [Render](https://render.com)
2. Crie um novo PostgreSQL database
3. Crie um novo Web Service conectado ao seu repositório Git
4. Configure as variáveis de ambiente:
   - `DATABASE_URL` - Copie do PostgreSQL criado
   - `SESSION_SECRET` - Gere uma string aleatória segura
   - `NODE_ENV` = production

### Método 2: Via render.yaml (Recomendado)

O projeto já inclui um arquivo `render.yaml` configurado. Basta:

1. Conectar seu repositório ao Render
2. O Render detectará automaticamente o `render.yaml`
3. Configure apenas a variável `DATABASE_URL` no dashboard

### Variáveis de Ambiente Necessárias

```env
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=sua-chave-secreta-aleatoria
NODE_ENV=production
PORT=10000
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm start` - Inicia o servidor em produção
- `npm run check` - Verifica tipos TypeScript
- `npm run db:push` - Aplica migrações do banco de dados

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

