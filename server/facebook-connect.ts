import axios from 'axios';

// CREDENCIAIS CORRETAS DO FACEBOOK FORNECIDAS PELO USUÁRIO
export const FACEBOOK_CONFIG = {
  appId: '799858769030868',
  appSecret: 'd96ec7d568af1f19502244852cf7fb33',
  accessToken: 'EAALXd6HMbtQBPMaekrOIYe5osW1fyl3w19HgEULvrZAorvITJ6tmVd5xCCpLHFKRqTt2bEfVs1Rg6FdSKST4qXWFPQejiiMG67laz1HmI0vaob8VXe5E3FWGZABNnpwrZAYku0FA0bOb5GOK7lcEZAcCvx7jBBZBaxnx9fDD7S2Hk4ch1or8XLO1FNh4Cvmk5RDapZA2yonGhL',
  userId: '',
  applicationName: 'Bueiro Digital',
  webhookSecret: ''
};

export class FacebookConnector {
  private accessToken: string;
  private appId: string;

  constructor() {
    this.accessToken = FACEBOOK_CONFIG.accessToken;
    this.appId = FACEBOOK_CONFIG.appId;
  }

  /**
   * Valida o token do Facebook e retorna informações da conta
   */
  async validateAndGetUserInfo() {
    try {
      console.log('🔍 Validando token do Facebook...');
      
      // Validar token
      const debugResponse = await axios.get(`https://graph.facebook.com/debug_token`, {
        params: {
          input_token: this.accessToken,
          access_token: this.accessToken
        }
      });

      if (!debugResponse.data.data.is_valid) {
        throw new Error('Token inválido');
      }

      // Obter informações do usuário
      const userResponse = await axios.get(`https://graph.facebook.com/me`, {
        params: {
          access_token: this.accessToken,
          fields: 'id,name,email,picture.width(200).height(200)'
        }
      });

      console.log('✅ Token válido, usuário:', userResponse.data.name);
      
      return {
        valid: true,
        user: userResponse.data,
        tokenInfo: debugResponse.data.data,
        appId: this.appId,
        accessToken: this.accessToken
      };
      
    } catch (error: any) {
      console.error('❌ Erro na validação:', error.response?.data || error.message);
      return {
        valid: false,
        error: error.response?.data || error.message
      };
    }
  }

  /**
   * Obter contas de anúncios do Facebook
   */
  async getAdAccounts() {
    try {
      console.log('📊 Buscando contas de anúncios...');
      
      const response = await axios.get(`https://graph.facebook.com/v23.0/me/adaccounts`, {
        params: {
          access_token: this.accessToken,
          fields: 'id,name,account_status,currency,balance,business_country_code,timezone_name,spend_cap,amount_spent,account_id'
        }
      });

      const accounts = response.data.data || [];
      console.log(`✅ Encontradas ${accounts.length} contas de anúncios`);
      
      return accounts;
      
    } catch (error: any) {
      console.error('❌ Erro ao buscar contas:', error.response?.data || error.message);
      
      // Se erro de permissão, mostrar instruções específicas
      if (error.response?.data?.error?.code === 200 || error.response?.data?.error?.message?.includes('Missing Permissions')) {
        console.error('🔑 ERRO DE PERMISSÃO: O token não tem permissões para acessar contas de anúncios.');
        console.error('📋 SOLUÇÃO: Gere um novo token com as permissões: ads_management, ads_read, business_management');
        console.error('🔗 Link: https://developers.facebook.com/tools/explorer/');
      }
      
      return [];
    }
  }

  /**
   * Obter campanhas de uma conta específica
   */
  async getCampaigns(accountId: string) {
    try {
      console.log(`📈 Buscando campanhas da conta ${accountId}...`);
      
      const response = await axios.get(`https://graph.facebook.com/v23.0/act_${accountId}/campaigns`, {
        params: {
          access_token: this.accessToken,
          fields: 'id,name,status,objective,created_time,updated_time,start_time,stop_time,daily_budget,lifetime_budget,bid_strategy,budget_remaining'
        }
      });

      const campaigns = response.data.data || [];
      console.log(`✅ Encontradas ${campaigns.length} campanhas`);
      
      return campaigns;
      
    } catch (error: any) {
      console.error('❌ Erro ao buscar campanhas:', error.response?.data || error.message);
      return [];
    }
  }

  /**
   * Obter insights de campanhas
   */
  async getCampaignInsights(campaignId: string) {
    try {
      console.log(`📊 Buscando insights da campanha ${campaignId}...`);
      
      const response = await axios.get(`https://graph.facebook.com/v23.0/${campaignId}/insights`, {
        params: {
          access_token: this.accessToken,
          fields: 'spend,impressions,clicks,reach,actions,cpc,cpm,ctr,frequency,cost_per_action_type'
        }
      });

      const insights = response.data.data?.[0] || {};
      console.log('✅ Insights obtidos com sucesso');
      
      return insights;
      
    } catch (error: any) {
      console.error('❌ Erro ao buscar insights:', error.response?.data || error.message);
      return {};
    }
  }

  /**
   * Conectar conta Facebook completa
   */
  async connectFacebookAccount() {
    try {
      console.log('🚀 Iniciando conexão completa com Facebook...');
      
      // 1. Validar usuário
      const userValidation = await this.validateAndGetUserInfo();
      if (!userValidation.valid) {
        throw new Error('Falha na validação do usuário');
      }

      // 2. Obter contas de anúncios
      const adAccounts = await this.getAdAccounts();

      // 3. Obter campanhas para cada conta
      const accountsWithCampaigns = [];
      for (const account of adAccounts) {
        const campaigns = await this.getCampaigns(account.account_id);
        
        // Obter insights para cada campanha
        const campaignsWithInsights = [];
        for (const campaign of campaigns.slice(0, 5)) { // Limitar a 5 para não sobrecarregar
          const insights = await this.getCampaignInsights(campaign.id);
          campaignsWithInsights.push({
            ...campaign,
            insights
          });
        }
        
        accountsWithCampaigns.push({
          ...account,
          campaigns: campaignsWithInsights
        });
      }

      console.log('✅ Conexão Facebook completa realizada com sucesso!');
      
      return {
        success: true,
        user: userValidation.user,
        tokenInfo: userValidation.tokenInfo,
        adAccounts: accountsWithCampaigns,
        totalAccounts: adAccounts.length,
        totalCampaigns: accountsWithCampaigns.reduce((total, acc) => total + acc.campaigns.length, 0)
      };
      
    } catch (error: any) {
      console.error('❌ Erro na conexão Facebook:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}