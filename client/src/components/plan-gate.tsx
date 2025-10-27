import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Rocket, Star, Lock } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface PlanGateProps {
  feature: string;
  requiredPlan: string;
  description?: string;
  children: React.ReactNode;
}

const planInfo = {
  gratuito: { icon: Star, color: "from-gray-500 to-gray-600", name: "Gratuito" },
  premium: { icon: Zap, color: "from-blue-500 to-blue-600", name: "Premium" },
  avancado: { icon: Crown, color: "from-purple-500 to-purple-600", name: "Avançado" },
  monster: { icon: Rocket, color: "from-red-500 to-red-600", name: "Monster" }
};

export function PlanGate({ feature, requiredPlan, description, children }: PlanGateProps) {
  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  const userPlan = (user as any)?.planType || "gratuito";
  const planLevels = ["gratuito", "premium", "avancado", "monster"];
  const hasAccess = planLevels.indexOf(userPlan) >= planLevels.indexOf(requiredPlan);

  if (hasAccess) {
    return <>{children}</>;
  }

  const RequiredIcon = planInfo[requiredPlan as keyof typeof planInfo]?.icon || Lock;
  const color = planInfo[requiredPlan as keyof typeof planInfo]?.color || "from-gray-500 to-gray-600";
  const planName = planInfo[requiredPlan as keyof typeof planInfo]?.name || requiredPlan;

  return (
    <Card className="border-dashed border-2 border-orange-200 bg-orange-50">
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Lock className="w-6 h-6 text-white" />
          <RequiredIcon className="w-8 h-8 text-white -ml-2" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Recurso Bloqueado
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          {description || `O recurso "${feature}" requer o plano ${planName} ou superior.`}
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            Seu Plano: {planInfo[userPlan as keyof typeof planInfo]?.name || userPlan}
          </Badge>
          <Badge className="bg-orange-100 text-orange-800 text-xs">
            Requer: {planName}
          </Badge>
        </div>
        
        <Link href="/plano">
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
            Fazer Upgrade do Plano
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}