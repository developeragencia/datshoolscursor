# ⚡ Deploy Automático - Quick Start

## 🚀 Configuração em 5 Minutos

---

## ✅ STATUS ATUAL

**Deploy Automático**: ✅ ATIVO  
**Branch**: main  
**Serviço**: dashtools (srv-d3vsptq4d50c73e5h7b0)  
**URL**: https://dashtools-5px2.onrender.com  
**Banco**: Neon PostgreSQL (aged-flower-32015502)

---

## 🎯 ÚNICO PASSO NECESSÁRIO

### Configurar DATABASE_URL no Render

1. **Acesse**: https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0

2. **Vá em**: Environment (menu lateral)

3. **Adicione**:
   ```
   Key:   DATABASE_URL
   Value: postgresql://neondb_owner:npg_Gnqe4wZvmc1B@ep-autumn-bonus-aeacerp5-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require
   ```

4. **Salve** e aguarde redeploy (2-3 minutos)

**PRONTO! Deploy automático está funcionando! ✅**

---

## 💻 USO DIÁRIO

### Para Fazer Deploy

```bash
# 1. Faça suas alterações
code .

# 2. Commit
git add .
git commit -m "feat: nova funcionalidade"

# 3. Push para main
git push origin main

# ✨ Deploy automático inicia!
```

⏱️ **Tempo de deploy**: 2-4 minutos

---

## 🤖 USO COM CURSOR (MCP)

Basta pedir ao Cursor:

```
"Faça deploy da versão atual"
"Adicione campo X na tabela Y"
"Corrija o bug Z"
"Otimize a performance"
```

**Cursor faz tudo automaticamente via MCP!**

---

## 📊 MONITORAR

**Logs**:
```
https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0/logs
```

**Status**:
```
https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0
```

**Aplicação**:
```
https://dashtools-5px2.onrender.com
```

---

## 🛠️ COMANDOS ÚTEIS

### Desenvolvimento Local

```bash
# Configurar ambiente
.\scripts\configure-env.ps1 dev    # Windows
./scripts/configure-env.sh dev     # Linux/Mac

# Testar banco
npm run db:test

# Desenvolver
npm run dev
```

### Banco de Dados

```bash
# Visualizar
npm run db:studio

# Migrations
npm run db:push
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

| Arquivo | Descrição |
|---------|-----------|
| `DEPLOY_AUTOMATICO.md` | Guia completo de deploy |
| `MCP_CICD_GUIDE.md` | Como usar MCP + CI/CD |
| `RELATORIO_VERIFICACAO_BD.md` | Status do banco |
| `CONFIGURAR_BD_PRODUCAO.md` | Setup produção |

---

## 🎉 FLUXO COMPLETO AUTOMATIZADO

```
Você pede no Cursor
       ↓
Cursor via MCP:
  ✅ Faz alterações
  ✅ Testa localmente
  ✅ Atualiza banco
  ✅ Commit e push
       ↓
GitHub webhook
       ↓
Render deploy automático
       ↓
✅ Online em 3 minutos!
```

---

## 🆘 PROBLEMAS?

### Deploy falhou?
```bash
# Verifique logs
https://dashboard.render.com/web/srv-d3vsptq4d50c73e5h7b0/logs
```

### Banco desconectado?
```bash
npm run db:test
```

### Aplicação offline?
- Verifique se DATABASE_URL está configurada
- Veja os logs de erro
- Faça redeploy manual

---

## ✨ PRONTO PARA USAR!

**Tudo está configurado e funcionando!**

Qualquer commit em `main` = Deploy automático ✅

---

**Última atualização**: 28/10/2025

