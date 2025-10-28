# ⚠️ AVISO DE SEGURANÇA - Credenciais Google OAuth

## 🔴 ATENÇÃO: Credenciais Expostas

O arquivo `client_secret_2_408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com.json` contém credenciais sensíveis e **está commitado publicamente** no repositório GitHub.

### 📋 Informações Expostas

```json
{
  "client_id": "408590510167-op0h1519p5c0hvrjd675afnq7usk79m9.apps.googleusercontent.com",
  "client_secret": "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"
}
```

## 🛡️ Medidas de Segurança Recomendadas

### Opção 1: Regenerar Credenciais (RECOMENDADO)

1. **Acesse o Google Cloud Console**:
   - https://console.cloud.google.com/apis/credentials?project=datshools

2. **Regenerar o Client Secret**:
   - Clique no cliente OAuth 2.0
   - Clique em "RESET SECRET"
   - Copie o novo secret

3. **Atualizar as variáveis de ambiente**:
   
   **No Render**:
   ```
   GOOGLE_CLIENT_SECRET=novo-secret-aqui
   ```
   
   **Localmente** (PowerShell):
   ```powershell
   $env:GOOGLE_CLIENT_SECRET="novo-secret-aqui"
   ```

4. **Remover o arquivo do repositório**:
   ```bash
   git rm client_secret_*.json
   git commit -m "Remove exposed OAuth credentials"
   git push
   ```

5. **Adicionar ao .gitignore**:
   ```
   # Credenciais OAuth
   client_secret_*.json
   *.json.google
   ```

### Opção 2: Manter e Proteger (NÃO RECOMENDADO)

Se decidir manter as credenciais atuais:

1. **Adicionar restrições no Google Cloud Console**:
   - Limite os domínios autorizados
   - Configure HTTP referrer restrictions
   - Monitore o uso da API

2. **Adicionar ao .gitignore para futuras mudanças**:
   ```
   # Credenciais OAuth
   client_secret_*.json
   ```

## 🔒 Boas Práticas de Segurança

### ✅ FAÇA:

1. **Use variáveis de ambiente** para credenciais
2. **Adicione ao .gitignore** todos os arquivos sensíveis
3. **Regenere credenciais** se expostas publicamente
4. **Configure restrições** no Google Cloud Console
5. **Monitore o uso** das APIs regularmente

### ❌ NÃO FAÇA:

1. **Nunca commite** arquivos com credenciais
2. **Nunca compartilhe** client secrets publicamente
3. **Nunca use** as mesmas credenciais em múltiplos projetos
4. **Nunca ignore** alertas de segurança

## 📝 Configuração Segura

### Estrutura Recomendada:

```
projeto/
├── .env (não commitado)
│   ├── GOOGLE_CLIENT_ID=...
│   └── GOOGLE_CLIENT_SECRET=...
├── .gitignore
│   ├── .env
│   ├── client_secret_*.json
│   └── *.credentials.json
└── env.example.txt (template, sem valores reais)
    ├── GOOGLE_CLIENT_ID=seu-client-id-aqui
    └── GOOGLE_CLIENT_SECRET=seu-client-secret-aqui
```

## 🚨 Checklist de Ação Imediata

- [ ] Verificar se há uso não autorizado das credenciais
- [ ] Decidir: Regenerar ou Manter credenciais
- [ ] Atualizar Google Cloud Console com redirect URIs corretos
- [ ] Configurar variáveis de ambiente no Render
- [ ] Adicionar `client_secret_*.json` ao `.gitignore`
- [ ] Remover arquivo de credenciais do repositório (opcional)
- [ ] Testar Google OAuth após as mudanças
- [ ] Documentar as novas credenciais de forma segura

## 📞 Recursos Adicionais

- **Google Cloud Console**: https://console.cloud.google.com/
- **Render Dashboard**: https://dashboard.render.com/
- **Documentação OAuth 2.0**: https://developers.google.com/identity/protocols/oauth2

---

**Data**: 28/10/2025  
**Prioridade**: 🔴 ALTA  
**Status**: ⚠️ AÇÃO NECESSÁRIA  
**Tipo**: Segurança / Credenciais Expostas

