// Plan configuration and limits
export interface PlanLimits {
  campaigns: number;
  visitors: number;
  advancedReports: boolean;
  utmTracking: boolean;
  automation: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
  multipleDashboards: boolean;
  allIntegrations: boolean;
}

export const PLAN_LIMITS: Record<string, PlanLimits> = {
  gratuito: {
    campaigns: 3,
    visitors: 1000,
    advancedReports: false,
    utmTracking: false,
    automation: false,
    apiAccess: false,
    prioritySupport: false,
    multipleDashboards: false,
    allIntegrations: false,
  },
  premium: {
    campaigns: 25,
    visitors: 25000,
    advancedReports: true,
    utmTracking: true,
    automation: true,
    apiAccess: true,
    prioritySupport: false,
    multipleDashboards: false,
    allIntegrations: true,
  },
  avancado: {
    campaigns: 100,
    visitors: 100000,
    advancedReports: true,
    utmTracking: true,
    automation: true,
    apiAccess: true,
    prioritySupport: true,
    multipleDashboards: true,
    allIntegrations: true,
  },
  monster: {
    campaigns: -1, // Unlimited
    visitors: -1, // Unlimited
    advancedReports: true,
    utmTracking: true,
    automation: true,
    apiAccess: true,
    prioritySupport: true,
    multipleDashboards: true,
    allIntegrations: true,
  },
};

export function getPlanLimits(planType: string): PlanLimits {
  return PLAN_LIMITS[planType] || PLAN_LIMITS.gratuito;
}

export function canAccessFeature(userPlan: string, feature: keyof PlanLimits): boolean {
  const limits = getPlanLimits(userPlan);
  return Boolean(limits[feature]);
}

export function canCreateCampaign(userPlan: string, currentCampaigns: number): boolean {
  const limits = getPlanLimits(userPlan);
  return limits.campaigns === -1 || currentCampaigns < limits.campaigns;
}

export function canTrackMoreVisitors(userPlan: string, currentVisitors: number): boolean {
  const limits = getPlanLimits(userPlan);
  return limits.visitors === -1 || currentVisitors < limits.visitors;
}