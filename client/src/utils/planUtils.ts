// Utilitários para controle de acesso por plano
export const PLAN_LEVELS = {
  gratuito: 0,
  premium: 1,
  avancado: 2,
  monster: 3
};

export const PLAN_NAMES = {
  gratuito: "Gratuito",
  premium: "Premium", 
  avancado: "Avançado",
  monster: "Monster"
};

export const PLAN_COLORS = {
  gratuito: "bg-gray-100 text-gray-800",
  premium: "bg-blue-100 text-blue-800",
  avancado: "bg-purple-100 text-purple-800",
  monster: "bg-yellow-100 text-yellow-800"
};

export function hasAccess(userPlan: string, requiredPlan: string): boolean {
  const userLevel = PLAN_LEVELS[userPlan as keyof typeof PLAN_LEVELS] || 0;
  const requiredLevel = PLAN_LEVELS[requiredPlan as keyof typeof PLAN_LEVELS] || 0;
  return userLevel >= requiredLevel;
}

export function getPlanDisplayName(plan: string): string {
  return PLAN_NAMES[plan as keyof typeof PLAN_NAMES] || "Gratuito";
}

export function getPlanColor(plan: string): string {
  return PLAN_COLORS[plan as keyof typeof PLAN_COLORS] || PLAN_COLORS.gratuito;
}

// Funcionalidades por plano
export const PLAN_FEATURES = {
  gratuito: {
    maxCampaigns: 3,
    maxVisitors: 1000,
    features: ["Relatórios básicos", "Suporte por email", "3 campanhas"]
  },
  premium: {
    maxCampaigns: 25,
    maxVisitors: 25000,
    features: ["Regras automatizadas", "UTM tracking", "25 campanhas", "Suporte chat"]
  },
  avancado: {
    maxCampaigns: 100,
    maxVisitors: 100000,
    features: ["Múltiplos dashboards", "API completa", "100 campanhas", "Relatórios personalizados"]
  },
  monster: {
    maxCampaigns: -1, // Ilimitado
    maxVisitors: -1,
    features: ["Tudo ilimitado", "White label", "Suporte 24/7", "Gerente dedicado"]
  }
};