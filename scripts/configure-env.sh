#!/bin/bash

# ═══════════════════════════════════════════════════════════════
#  🔧 SCRIPT DE CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE
#  Dashtools - Deploy Automático
# ═══════════════════════════════════════════════════════════════

set -e  # Exit on error

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  🚀 CONFIGURAÇÃO DE DEPLOY AUTOMÁTICO - DASHTOOLS"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Verificar se está em ambiente de desenvolvimento ou produção
if [ -z "$1" ]; then
  echo "${YELLOW}Uso: $0 [dev|prod]${NC}"
  echo ""
  echo "  dev  - Configurar ambiente de desenvolvimento local"
  echo "  prod - Mostrar instruções para configurar produção"
  echo ""
  exit 1
fi

ENVIRONMENT=$1

# ═══════════════════════════════════════════════════════════════
#  CONFIGURAÇÃO PARA DESENVOLVIMENTO LOCAL
# ═══════════════════════════════════════════════════════════════

if [ "$ENVIRONMENT" == "dev" ]; then
  echo "${BLUE}📝 Configurando ambiente de DESENVOLVIMENTO...${NC}"
  echo ""
  
  # Criar arquivo .env
  cat > .env << 'EOF'
# ═══════════════════════════════════════════════════════════════
#  VARIÁVEIS DE AMBIENTE - DESENVOLVIMENTO LOCAL
# ═══════════════════════════════════════════════════════════════

# Database - Neon PostgreSQL
DATABASE_URL="postgresql://neondb_owner:npg_Gnqe4wZvmc1B@ep-autumn-bonus-aeacerp5-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require"

# Node Environment
NODE_ENV=development

# Server Port
PORT=5000

# Session Secret (desenvolvimento)
SESSION_SECRET=dashtools_dev_secret_change_in_production

# Google OAuth (opcional - configure se necessário)
# GOOGLE_CLIENT_ID=seu_client_id_aqui
# GOOGLE_CLIENT_SECRET=seu_client_secret_aqui

# ═══════════════════════════════════════════════════════════════
EOF

  echo "${GREEN}✅ Arquivo .env criado com sucesso!${NC}"
  echo ""
  echo "${BLUE}📋 Próximos passos:${NC}"
  echo "  1. Execute: ${YELLOW}npm install${NC}"
  echo "  2. Execute: ${YELLOW}npm run db:test${NC} (testar conexão)"
  echo "  3. Execute: ${YELLOW}npm run dev${NC} (iniciar desenvolvimento)"
  echo ""
  echo "${GREEN}🎉 Pronto para desenvolver!${NC}"
  echo ""

# ═══════════════════════════════════════════════════════════════
#  INSTRUÇÕES PARA PRODUÇÃO
# ═══════════════════════════════════════════════════════════════

elif [ "$ENVIRONMENT" == "prod" ]; then
  echo "${BLUE}🚀 CONFIGURAÇÃO PARA PRODUÇÃO (RENDER)${NC}"
  echo ""
  echo "═══════════════════════════════════════════════════════════════"
  echo ""
  echo "${YELLOW}📌 DEPLOY AUTOMÁTICO JÁ ESTÁ ATIVO!${NC}"
  echo ""
  echo "Qualquer commit na branch ${GREEN}main${NC} dispara deploy automático."
  echo ""
  echo "═══════════════════════════════════════════════════════════════"
  echo ""
  echo "${BLUE}1️⃣  CONFIGURAR VARIÁVEIS DE AMBIENTE NO RENDER:${NC}"
  echo ""
  echo "   Acesse: ${YELLOW}https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0${NC}"
  echo ""
  echo "   Clique em: ${YELLOW}Environment → Add Environment Variable${NC}"
  echo ""
  echo "   Configure:"
  echo ""
  echo "   ${GREEN}Key:${NC}   DATABASE_URL"
  echo "   ${GREEN}Value:${NC} postgresql://neondb_owner:npg_Gnqe4wZvmc1B@ep-autumn-bonus-aeacerp5-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require"
  echo ""
  echo "═══════════════════════════════════════════════════════════════"
  echo ""
  echo "${BLUE}2️⃣  COMO FUNCIONA O DEPLOY AUTOMÁTICO:${NC}"
  echo ""
  echo "   ${GREEN}✅ Push para main${NC}     → Deploy automático inicia"
  echo "   ${GREEN}✅ Build automático${NC}   → npm install && npm run build"
  echo "   ${GREEN}✅ Testes (se houver)${NC} → Executados automaticamente"
  echo "   ${GREEN}✅ Deploy${NC}             → Aplicação atualizada em ~3 minutos"
  echo ""
  echo "═══════════════════════════════════════════════════════════════"
  echo ""
  echo "${BLUE}3️⃣  FLUXO DE TRABALHO RECOMENDADO:${NC}"
  echo ""
  echo "   ${YELLOW}Desenvolvimento:${NC}"
  echo "   1. Crie uma branch: ${GREEN}git checkout -b feature/nova-funcionalidade${NC}"
  echo "   2. Faça suas alterações"
  echo "   3. Commit: ${GREEN}git commit -m \"feat: adiciona nova funcionalidade\"${NC}"
  echo "   4. Push: ${GREEN}git push origin feature/nova-funcionalidade${NC}"
  echo ""
  echo "   ${YELLOW}Deploy para Produção:${NC}"
  echo "   1. Merge para main: ${GREEN}git checkout main && git merge feature/nova-funcionalidade${NC}"
  echo "   2. Push: ${GREEN}git push origin main${NC}"
  echo "   3. ${GREEN}✨ Deploy automático inicia!${NC}"
  echo ""
  echo "═══════════════════════════════════════════════════════════════"
  echo ""
  echo "${BLUE}4️⃣  MONITORAR DEPLOY:${NC}"
  echo ""
  echo "   Logs em tempo real:"
  echo "   ${YELLOW}https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0/logs${NC}"
  echo ""
  echo "   Status do serviço:"
  echo "   ${YELLOW}https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0${NC}"
  echo ""
  echo "   Aplicação:"
  echo "   ${YELLOW}https://dashtools-5px2.onrender.com${NC}"
  echo ""
  echo "═══════════════════════════════════════════════════════════════"
  echo ""
  echo "${GREEN}🎉 Tudo configurado para deploy automático!${NC}"
  echo ""

else
  echo "${RED}❌ Ambiente inválido: $ENVIRONMENT${NC}"
  echo "   Use: dev ou prod"
  exit 1
fi

echo "═══════════════════════════════════════════════════════════════"
echo ""

