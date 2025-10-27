import axios from 'axios';

export interface FacebookAccount {
  id: string;
  name: string;
  account_id: string;
  account_status: number;
  age_restriction_type?: string;
  amount_spent: string;
  balance: string;
  business_country_code: string;
  currency: string;
  disable_reason?: number;
  end_advertiser_name?: string;
  funding_source_details?: {
    display_string: string;
    id: string;
    type: number;
  };
  has_migrated_permissions?: boolean;
  io_number?: string;
  is_attribution_spec_system_default?: boolean;
  is_direct_deals_enabled?: boolean;
  is_in_3ds_authorization_enabled_market?: boolean;
  is_notifications_enabled?: boolean;
  is_personal?: number;
  is_prepay_account?: boolean;
  is_tax_id_required?: boolean;
  min_campaign_group_spend_cap?: string;
  min_daily_budget?: number;
  owner?: string;
  partner?: string;
  rf_spec?: {
    countries: string[];
  };
  show_checkout_experience?: boolean;
  spend_cap?: string;
  tax_id?: string;
  tax_id_status?: number;
  tax_id_type?: string;
  timezone_id?: number;
  timezone_name?: string;
  timezone_offset_hours_utc?: number;
  tos_accepted?: {
    web_custom_audience_tos?: number;
  };
  user_tasks?: string[];
  user_tos_accepted?: {
    custom_audience_tos?: number;
    custom_audience_tos_accepted_time?: string;
  };
}

export interface FacebookCampaign {
  id: string;
  account_id: string;
  adlabels?: any[];
  bid_strategy?: string;
  boosted_object_id?: string;
  brand_lift_studies?: any[];
  budget_rebalance_flag?: boolean;
  budget_remaining?: string;
  buying_type?: string;
  campaign_group_id?: string;
  can_create_brand_lift_study?: boolean;
  can_use_spend_cap?: boolean;
  configured_status?: string;
  created_time?: string;
  daily_budget?: string;
  effective_status?: string;
  issues_info?: any[];
  last_budget_toggling_time?: string;
  lifetime_budget?: string;
  name: string;
  objective?: string;
  pacing_type?: string[];
  promoted_object?: {
    custom_event_type?: string;
    object_store_url?: string;
    offer_id?: string;
    page_id?: string;
    product_catalog_id?: string;
    product_set_id?: string;
    application_id?: string;
    pixel_id?: string;
    pixel_rule?: string;
    retention_days?: string;
    custom_event_str?: string;
  };
  recommendations?: any[];
  source_campaign?: {
    id: string;
    name: string;
  };
  source_campaign_id?: string;
  special_ad_categories?: string[];
  special_ad_category?: string;
  special_ad_category_country?: string[];
  spend_cap?: string;
  start_time?: string;
  status: string;
  stop_time?: string;
  topline_id?: string;
  updated_time?: string;
}

export interface FacebookAdSet {
  id: string;
  account_id: string;
  adlabels?: any[];
  adset_schedule?: any[];
  asset_feed_id?: string;
  attribution_spec?: any[];
  bid_adjustments?: any;
  bid_amount?: number;
  bid_constraints?: any;
  bid_info?: any;
  bid_strategy?: string;
  billing_event?: string;
  budget_remaining?: string;
  campaign?: {
    id: string;
    name: string;
  };
  campaign_id: string;
  configured_status?: string;
  contextual_bundling_spec?: any;
  created_time?: string;
  creative_sequence?: string[];
  daily_budget?: string;
  daily_min_spend_target?: string;
  daily_spend_cap?: string;
  destination_type?: string;
  effective_status?: string;
  end_time?: string;
  frequency_control_specs?: any[];
  full_funnel_exploration_mode?: string;
  instagram_actor_id?: string;
  is_dynamic_creative?: boolean;
  issues_info?: any[];
  learning_stage_info?: {
    attribution_windows?: string[];
    conversions?: number;
    last_sig_edit_ts?: number;
    status?: string;
  };
  lifetime_budget?: string;
  lifetime_imps?: number;
  lifetime_min_spend_target?: string;
  lifetime_spend_cap?: string;
  multi_optimization_goal_weight?: string;
  name: string;
  optimization_goal?: string;
  optimization_sub_event?: string;
  pacing_type?: string[];
  promoted_object?: any;
  recommendations?: any[];
  recurring_budget_semantics?: boolean;
  review_feedback?: string;
  rf_prediction_id?: string;
  source_adset?: {
    id: string;
    name: string;
  };
  source_adset_id?: string;
  start_time?: string;
  status: string;
  targeting?: any;
  time_based_ad_rotation_id_blocks?: any[];
  time_based_ad_rotation_intervals?: any[];
  updated_time?: string;
  use_new_app_click?: boolean;
}

export interface FacebookAd {
  id: string;
  account_id: string;
  ad_review_feedback?: any;
  adlabels?: any[];
  adset?: {
    id: string;
    name: string;
  };
  adset_id: string;
  bid_amount?: number;
  bid_info?: any;
  bid_type?: string;
  campaign?: {
    id: string;
    name: string;
  };
  campaign_id: string;
  configured_status?: string;
  conversion_specs?: any[];
  created_time?: string;
  creative?: {
    id: string;
    name?: string;
  };
  demolink_hash?: string;
  display_sequence?: number;
  effective_status?: string;
  engagement_audience?: boolean;
  failed_delivery_checks?: any[];
  issues_info?: any[];
  last_updated_by_app_id?: string;
  name: string;
  preview_shareable_link?: string;
  priority?: number;
  recommendations?: any[];
  source_ad?: {
    id: string;
    name: string;
  };
  source_ad_id?: string;
  status: string;
  tracking_specs?: any[];
  updated_time?: string;
}

export interface FacebookInsights {
  account_currency?: string;
  account_id?: string;
  account_name?: string;
  action_values?: any[];
  actions?: any[];
  ad_click_actions?: any[];
  ad_id?: string;
  ad_impression_actions?: any[];
  ad_name?: string;
  adset_end?: string;
  adset_id?: string;
  adset_name?: string;
  adset_start?: string;
  age_targeting?: string;
  attribution_setting?: string;
  auction_bid?: string;
  auction_competitiveness?: string;
  auction_max_competitor_bid?: string;
  buying_type?: string;
  campaign_id?: string;
  campaign_name?: string;
  canvas_avg_view_percent?: string;
  canvas_avg_view_time?: string;
  catalog_segment_actions?: any[];
  catalog_segment_value?: any[];
  catalog_segment_value_mobile_purchase_roas?: any[];
  catalog_segment_value_omni_purchase_roas?: any[];
  catalog_segment_value_website_purchase_roas?: any[];
  clicks?: string;
  conversion_rate_ranking?: string;
  conversion_values?: any[];
  conversions?: any[];
  converted_product_quantity?: any[];
  converted_product_value?: any[];
  cost_per_15_sec_video_view?: any[];
  cost_per_2_sec_continuous_video_view?: any[];
  cost_per_action_type?: any[];
  cost_per_ad_click?: any[];
  cost_per_conversion?: any[];
  cost_per_dda_countby_convs?: string;
  cost_per_inline_link_click?: string;
  cost_per_inline_post_engagement?: string;
  cost_per_one_thousand_ad_impression?: any[];
  cost_per_outbound_click?: any[];
  cost_per_thruplay?: any[];
  cost_per_unique_action_type?: any[];
  cost_per_unique_click?: string;
  cost_per_unique_inline_link_click?: string;
  cost_per_unique_outbound_click?: any[];
  cpc?: string;
  cpm?: string;
  cpp?: string;
  created_time?: string;
  ctr?: string;
  date_start: string;
  date_stop: string;
  dda_countby_convs?: string;
  engagement_rate_ranking?: string;
  estimated_ad_recall_rate?: string;
  estimated_ad_recall_rate_lower_bound?: string;
  estimated_ad_recall_rate_upper_bound?: string;
  estimated_ad_recallers?: string;
  estimated_ad_recallers_lower_bound?: string;
  estimated_ad_recallers_upper_bound?: string;
  frequency?: string;
  full_view_impressions?: string;
  full_view_reach?: string;
  gender_targeting?: string;
  impressions: string;
  inline_link_click_ctr?: string;
  inline_link_clicks?: string;
  inline_post_engagement?: string;
  instant_experience_clicks_to_open?: string;
  instant_experience_clicks_to_start?: string;
  instant_experience_outbound_clicks?: any[];
  interactive_component_tap?: any[];
  labels?: string;
  location?: string;
  mobile_app_purchase_roas?: any[];
  objective?: string;
  optimization_goal?: string;
  outbound_clicks?: any[];
  outbound_clicks_ctr?: any[];
  place_page_name?: string;
  placement?: string;
  platform_position?: string;
  product_id?: string;
  publisher_platform?: string;
  purchase_roas?: any[];
  quality_ranking?: string;
  reach?: string;
  social_spend?: string;
  spend: string;
  total_postbacks?: string;
  total_postbacks_detailed?: any[];
  unique_actions?: any[];
  unique_clicks?: string;
  unique_conversions?: any[];
  unique_ctr?: string;
  unique_inline_link_click_ctr?: string;
  unique_inline_link_clicks?: string;
  unique_link_clicks_ctr?: string;
  unique_outbound_clicks?: any[];
  unique_outbound_clicks_ctr?: any[];
  unique_video_continuous_2_sec_watched_actions?: any[];
  unique_video_view_15_sec?: any[];
  video_15_sec_watched_actions?: any[];
  video_30_sec_watched_actions?: any[];
  video_avg_time_watched_actions?: any[];
  video_continuous_2_sec_watched_actions?: any[];
  video_p100_watched_actions?: any[];
  video_p25_watched_actions?: any[];
  video_p50_watched_actions?: any[];
  video_p75_watched_actions?: any[];
  video_p95_watched_actions?: any[];
  video_play_actions?: any[];
  video_play_curve_actions?: any[];
  video_play_retention_0_to_15s_actions?: any[];
  video_play_retention_20_to_60s_actions?: any[];
  video_play_retention_graph_actions?: any[];
  video_thruplay_watched_actions?: any[];
  video_time_watched_actions?: any[];
  website_ctr?: any[];
  website_purchase_roas?: any[];
}

class FacebookAPI {
  private accessToken: string;
  private baseURL = 'https://graph.facebook.com/v19.0';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async makeRequest(endpoint: string, params: any = {}) {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        params: {
          access_token: this.accessToken,
          ...params
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Facebook API Error:', error.response?.data || error.message);
      throw new Error(`Facebook API Error: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  // Get user's ad accounts
  async getAdAccounts(): Promise<FacebookAccount[]> {
    const response = await this.makeRequest('/me/adaccounts', {
      fields: 'id,name,account_id,account_status,currency,timezone_name,amount_spent,balance,business_country_code'
    });
    return response.data || [];
  }

  // Get campaigns for an ad account
  async getCampaigns(accountId: string): Promise<FacebookCampaign[]> {
    // Ensure proper act_ prefix for ad account ID
    const adAccountId = accountId.startsWith('act_') ? accountId : `act_${accountId}`;
    const response = await this.makeRequest(`/${adAccountId}/campaigns`, {
      fields: 'id,name,status,objective,daily_budget,lifetime_budget,start_time,stop_time,created_time,updated_time,effective_status,configured_status'
    });
    return response.data || [];
  }

  // Get ad sets for a campaign
  async getAdSets(campaignId: string): Promise<FacebookAdSet[]> {
    const response = await this.makeRequest(`/${campaignId}/adsets`, {
      fields: 'id,name,status,daily_budget,lifetime_budget,start_time,end_time,optimization_goal,bid_strategy,effective_status,configured_status,targeting,promoted_object'
    });
    return response.data || [];
  }

  // Get ads for an ad set
  async getAds(adsetId: string): Promise<FacebookAd[]> {
    const response = await this.makeRequest(`/${adsetId}/ads`, {
      fields: 'id,name,status,effective_status,configured_status,creative,adset_id,campaign_id,created_time,updated_time'
    });
    return response.data || [];
  }

  // Get insights for campaigns
  async getCampaignInsights(campaignId: string, dateRange: { since: string; until: string }): Promise<FacebookInsights[]> {
    const response = await this.makeRequest(`/${campaignId}/insights`, {
      fields: 'campaign_name,campaign_id,impressions,clicks,spend,cpm,cpc,ctr,reach,frequency,conversions,cost_per_conversion,conversion_rate_ranking,quality_ranking,engagement_rate_ranking',
      time_range: JSON.stringify(dateRange),
      level: 'campaign'
    });
    return response.data || [];
  }

  // Get insights for ad sets
  async getAdSetInsights(adsetId: string, dateRange: { since: string; until: string }): Promise<FacebookInsights[]> {
    const response = await this.makeRequest(`/${adsetId}/insights`, {
      fields: 'adset_name,adset_id,campaign_name,campaign_id,impressions,clicks,spend,cpm,cpc,ctr,reach,frequency,conversions,cost_per_conversion',
      time_range: JSON.stringify(dateRange),
      level: 'adset'
    });
    return response.data || [];
  }

  // Get insights for ads
  async getAdInsights(adId: string, dateRange: { since: string; until: string }): Promise<FacebookInsights[]> {
    const response = await this.makeRequest(`/${adId}/insights`, {
      fields: 'ad_name,ad_id,adset_name,adset_id,campaign_name,campaign_id,impressions,clicks,spend,cpm,cpc,ctr,reach,frequency,conversions,cost_per_conversion',
      time_range: JSON.stringify(dateRange),
      level: 'ad'
    });
    return response.data || [];
  }

  // Get account insights
  async getAccountInsights(accountId: string, dateRange: { since: string; until: string }): Promise<FacebookInsights[]> {
    const response = await this.makeRequest(`/${accountId}/insights`, {
      fields: 'account_name,account_id,impressions,clicks,spend,cpm,cpc,ctr,reach,frequency,conversions,cost_per_conversion',
      time_range: JSON.stringify(dateRange),
      level: 'account'
    });
    return response.data || [];
  }

  // Validate access token
  async validateToken(): Promise<{ valid: boolean; scopes?: string[]; error?: string }> {
    try {
      const response = await this.makeRequest('/me', {
        fields: 'id,name,email'
      });
      
      // Check token info
      const tokenInfo = await this.makeRequest('/debug_token', {
        input_token: this.accessToken
      });

      return {
        valid: true,
        scopes: tokenInfo.data?.scopes || []
      };
    } catch (error: any) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  // Create webhook subscription
  async createWebhook(appId: string, callbackUrl: string, verifyToken: string, fields: string[] = ['campaigns', 'adsets', 'ads']): Promise<any> {
    try {
      const response = await axios.post(`${this.baseURL}/${appId}/subscriptions`, {
        object: 'adaccount',
        callback_url: callbackUrl,
        fields: fields.join(','),
        verify_token: verifyToken,
        access_token: this.accessToken
      });
      return response.data;
    } catch (error: any) {
      console.error('Webhook creation error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get long-lived token
  async getLongLivedToken(appId: string, appSecret: string): Promise<{ access_token: string; token_type: string; expires_in?: number }> {
    try {
      const response = await axios.get(`${this.baseURL}/oauth/access_token`, {
        params: {
          grant_type: 'fb_exchange_token',
          client_id: appId,
          client_secret: appSecret,
          fb_exchange_token: this.accessToken
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Long-lived token error:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default FacebookAPI;