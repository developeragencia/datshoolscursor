# ═══════════════════════════════════════════════════════════════
#  🔧 SCRIPT DE CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE
#  Dashtools - Deploy Automático (PowerShell)
# ═══════════════════════════════════════════════════════════════

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("dev", "prod")]
    [string]$Environment
)

$ErrorActionPreference = "Stop"

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🚀 CONFIGURAÇÃO DE DEPLOY AUTOMÁTICO - DASHTOOLS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# ═══════════════════════════════════════════════════════════════
#  CONFIGURAÇÃO PARA DESENVOLVIMENTO LOCAL
# ═══════════════════════════════════════════════════════════════

if ($Environment -eq "dev") {
    Write-Host "📝 Configurando ambiente de DESENVOLVIMENTO..." -ForegroundColor Blue
    Write-Host ""
    
    # Criar arquivo .env
    $envContent = @"
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

# Google OAuth - Login com Google
GOOGLE_CLIENT_ID=408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# ═══════════════════════════════════════════════════════════════
"@

    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    
    Write-Host "✅ Arquivo .env criado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Próximos passos:" -ForegroundColor Blue
    Write-Host "  1. Execute: " -NoNewline; Write-Host "npm install" -ForegroundColor Yellow
    Write-Host "  2. Execute: " -NoNewline; Write-Host "npm run db:test" -ForegroundColor Yellow -NoNewline; Write-Host " (testar conexão)"
    Write-Host "  3. Execute: " -NoNewline; Write-Host "npm run dev" -ForegroundColor Yellow -NoNewline; Write-Host " (iniciar desenvolvimento)"
    Write-Host ""
    Write-Host "🎉 Pronto para desenvolver!" -ForegroundColor Green
    Write-Host ""

# ═══════════════════════════════════════════════════════════════
#  INSTRUÇÕES PARA PRODUÇÃO
# ═══════════════════════════════════════════════════════════════

} elseif ($Environment -eq "prod") {
    Write-Host "🚀 CONFIGURAÇÃO PARA PRODUÇÃO (RENDER)" -ForegroundColor Blue
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════"
    Write-Host ""
    Write-Host "📌 DEPLOY AUTOMÁTICO JÁ ESTÁ ATIVO!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Qualquer commit na branch " -NoNewline
    Write-Host "main" -ForegroundColor Green -NoNewline
    Write-Host " dispara deploy automático."
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════"
    Write-Host ""
    Write-Host "1️⃣  CONFIGURAR VARIÁVEIS DE AMBIENTE NO RENDER:" -ForegroundColor Blue
    Write-Host ""
    Write-Host "   Acesse: " -NoNewline
    Write-Host "https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Clique em: " -NoNewline
    Write-Host "Environment → Add Environment Variable" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Configure:"
    Write-Host ""
    Write-Host "   Key:   " -NoNewline -ForegroundColor Green
    Write-Host "DATABASE_URL"
    Write-Host "   Value: " -NoNewline -ForegroundColor Green
    Write-Host "postgresql://neondb_owner:npg_Gnqe4wZvmc1B@..."
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════"
    Write-Host ""
    Write-Host "2️⃣  COMO FUNCIONA O DEPLOY AUTOMÁTICO:" -ForegroundColor Blue
    Write-Host ""
    Write-Host "   ✅ Push para main" -ForegroundColor Green -NoNewline
    Write-Host "     → Deploy automático inicia"
    Write-Host "   ✅ Build automático" -ForegroundColor Green -NoNewline
    Write-Host "   → npm install && npm run build"
    Write-Host "   ✅ Testes (se houver)" -ForegroundColor Green -NoNewline
    Write-Host " → Executados automaticamente"
    Write-Host "   ✅ Deploy" -ForegroundColor Green -NoNewline
    Write-Host "             → Aplicação atualizada em ~3 minutos"
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════"
    Write-Host ""
    Write-Host "3️⃣  FLUXO DE TRABALHO RECOMENDADO:" -ForegroundColor Blue
    Write-Host ""
    Write-Host "   Desenvolvimento:" -ForegroundColor Yellow
    Write-Host "   1. Crie uma branch: " -NoNewline
    Write-Host "git checkout -b feature/nova-funcionalidade" -ForegroundColor Green
    Write-Host "   2. Faça suas alterações"
    Write-Host "   3. Commit: " -NoNewline
    Write-Host "git commit -m 'feat: adiciona nova funcionalidade'" -ForegroundColor Green
    Write-Host "   4. Push: " -NoNewline
    Write-Host "git push origin feature/nova-funcionalidade" -ForegroundColor Green
    Write-Host ""
    Write-Host "   Deploy para Produção:" -ForegroundColor Yellow
    Write-Host "   1. Merge para main: " -NoNewline
    Write-Host "git checkout main && git merge feature/nova-funcionalidade" -ForegroundColor Green
    Write-Host "   2. Push: " -NoNewline
    Write-Host "git push origin main" -ForegroundColor Green
    Write-Host "   3. " -NoNewline
    Write-Host "✨ Deploy automático inicia!" -ForegroundColor Green
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════"
    Write-Host ""
    Write-Host "4️⃣  MONITORAR DEPLOY:" -ForegroundColor Blue
    Write-Host ""
    Write-Host "   Logs em tempo real:"
    Write-Host "   https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0/logs" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Status do serviço:"
    Write-Host "   https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Aplicação:"
    Write-Host "   https://dashtools-5px2.onrender.com" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════"
    Write-Host ""
    Write-Host "🎉 Tudo configurado para deploy automático!" -ForegroundColor Green
    Write-Host ""
}

Write-Host "═══════════════════════════════════════════════════════════════"
Write-Host ""

