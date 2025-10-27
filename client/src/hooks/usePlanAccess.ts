import { useQuery } from "@tanstack/react-query";
import { getPlanLimits, canAccessFeature, canCreateCampaign } from "@shared/planLimits";

export function usePlanAccess() {
  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  const planType = (user as any)?.planType || "gratuito";
  const limits = getPlanLimits(planType);

  return {
    user,
    planType,
    limits,
    canAccess: (feature: keyof typeof limits) => {
      return canAccessFeature(planType, feature);
    },
    canCreateCampaign: (currentCount: number) => {
      return canCreateCampaign(planType, currentCount);
    },
    isUnlimited: (feature: 'campaigns' | 'visitors') => {
      return limits[feature] === -1;
    },
    getRemainingLimit: (feature: 'campaigns' | 'visitors', current: number) => {
      const limit = limits[feature];
      if (limit === -1) return "Ilimitado";
      return Math.max(0, limit - current);
    }
  };
}