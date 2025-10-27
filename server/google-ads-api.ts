import { GoogleAdsApi } from 'google-ads-api';

interface GoogleAdsCredentials {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  developerToken: string;
}

export class GoogleAdsAPI {
  private client: GoogleAdsApi | null = null;
  private credentials: GoogleAdsCredentials;

  constructor(credentials: GoogleAdsCredentials) {
    this.credentials = credentials;
    this.initializeClient();
  }

  private initializeClient() {
    try {
      this.client = new GoogleAdsApi({
        client_id: this.credentials.clientId,
        client_secret: this.credentials.clientSecret,
        developer_token: this.credentials.developerToken,
      });
    } catch (error) {
      console.error('Erro ao inicializar Google Ads API:', error);
      this.client = null;
    }
  }

  async validateCredentials(): Promise<{ valid: boolean; error?: string }> {
    if (!this.client) {
      return { valid: false, error: 'Cliente não inicializado' };
    }

    try {
      // Tenta fazer uma requisição simples para validar as credenciais
      const customer = this.client.Customer({
        customer_id: '123-456-7890', // ID de teste
        refresh_token: this.credentials.refreshToken,
      });

      await customer.query(`
        SELECT customer.id 
        FROM customer 
        LIMIT 1
      `);

      return { valid: true };
    } catch (error: any) {
      console.error('Erro na validação das credenciais:', error.message);
      return { 
        valid: false, 
        error: error.message || 'Credenciais inválidas' 
      };
    }
  }

  async getAccessibleCustomers(): Promise<any[]> {
    if (!this.client) {
      throw new Error('Cliente Google Ads não inicializado');
    }

    try {
      const customer = this.client.Customer({
        customer_id: '123-456-7890', // Manager account ID
        refresh_token: this.credentials.refreshToken,
      });

      const response = await customer.query(`
        SELECT 
          customer_client.id,
          customer_client.descriptive_name,
          customer_client.status,
          customer_client.currency_code,
          customer_client.time_zone,
          customer_client.test_account,
          customer_client.manager
        FROM customer_client
        WHERE customer_client.status = 'ENABLED'
      `);
      
      return response.map((result: any) => ({
        id: result.customer_client.id,
        name: result.customer_client.descriptive_name,
        customerId: result.customer_client.id,
        status: result.customer_client.status,
        currency: result.customer_client.currency_code,
        timeZone: result.customer_client.time_zone,
        testAccount: result.customer_client.test_account,
        manager: result.customer_client.manager,
        lastSync: new Date().toISOString(),
      }));
    } catch (error: any) {
      console.error('Erro ao buscar clientes:', error.message);
      throw new Error(`Falha ao buscar contas: ${error.message}`);
    }
  }

  async getAccountInfo(customerId: string): Promise<any> {
    if (!this.client) {
      throw new Error('Cliente Google Ads não inicializado');
    }

    try {
      const customer = this.client.Customer({
        customer_id: customerId,
        refresh_token: this.credentials.refreshToken,
      });

      const customerInfoResults = await customer.query(`
        SELECT 
          customer.id,
          customer.descriptive_name,
          customer.currency_code,
          customer.time_zone,
          customer.status
        FROM customer
        WHERE customer.id = ${customerId}
      `);

      const customerInfo = customerInfoResults[0];
      if (!customerInfo || !customerInfo.customer) {
        throw new Error(`Conta ${customerId} não encontrada`);
      }

      // Buscar estatísticas de performance
      const campaigns = await customer.query(`
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros
        FROM campaign
        WHERE segments.date DURING LAST_30_DAYS
      `);

      const totalSpend = campaigns.reduce((sum: number, campaign: any) => {
        return sum + (campaign.metrics?.cost_micros || 0) / 1000000;
      }, 0);

      const totalImpressions = campaigns.reduce((sum: number, campaign: any) => {
        return sum + (campaign.metrics?.impressions || 0);
      }, 0);

      const totalClicks = campaigns.reduce((sum: number, campaign: any) => {
        return sum + (campaign.metrics?.clicks || 0);
      }, 0);

      return {
        id: customerInfo.customer.id,
        name: customerInfo.customer.descriptive_name,
        customerId: customerInfo.customer.id,
        status: customerInfo.customer.status,
        currency: customerInfo.customer.currency_code,
        timeZone: customerInfo.customer.time_zone,
        campaigns: campaigns.length,
        totalSpend,
        totalImpressions,
        totalClicks,
        lastSync: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error('Erro ao buscar informações da conta:', error.message);
      throw new Error(`Falha ao buscar conta: ${error.message}`);
    }
  }

  async getCampaigns(customerId: string): Promise<any[]> {
    if (!this.client) {
      throw new Error('Cliente Google Ads não inicializado');
    }

    try {
      const customer = this.client.Customer({
        customer_id: customerId,
        refresh_token: this.credentials.refreshToken,
      });

      const campaigns = await customer.query(`
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          campaign_budget.amount_micros,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          metrics.conversions_value
        FROM campaign
        WHERE segments.date DURING LAST_30_DAYS
        ORDER BY metrics.cost_micros DESC
      `);

      return campaigns.map((campaign: any) => ({
        id: campaign.campaign.id,
        name: campaign.campaign.name,
        status: campaign.campaign.status,
        type: campaign.campaign.advertising_channel_type,
        budget: (campaign.campaign_budget?.amount_micros || 0) / 1000000,
        spent: (campaign.metrics?.cost_micros || 0) / 1000000,
        impressions: campaign.metrics?.impressions || 0,
        clicks: campaign.metrics?.clicks || 0,
        ctr: campaign.metrics?.impressions > 0 
          ? (campaign.metrics.clicks / campaign.metrics.impressions) * 100 
          : 0,
        cpc: campaign.metrics?.clicks > 0 
          ? (campaign.metrics.cost_micros / 1000000) / campaign.metrics.clicks 
          : 0,
        conversions: campaign.metrics?.conversions || 0,
        conversionValue: (campaign.metrics?.conversions_value || 0) / 1000000,
        costPerConversion: campaign.metrics?.conversions > 0 
          ? (campaign.metrics.cost_micros / 1000000) / campaign.metrics.conversions 
          : 0,
      }));
    } catch (error: any) {
      console.error('Erro ao buscar campanhas:', error.message);
      throw new Error(`Falha ao buscar campanhas: ${error.message}`);
    }
  }
}