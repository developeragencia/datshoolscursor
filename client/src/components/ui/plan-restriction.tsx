import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Rocket, Star } from "lucide-react";
import { Link } from "wouter";

interface PlanRestrictionProps {
  feature: string;
  currentPlan: string;
  requiredPlan: string;
  description?: string;
}

const planIcons = {
  gratuito: Star,
  premium: Zap,
  avancado: Crown,
  monster: Rocket,
};

const planColors = {
  gratuito: "from-gray-500 to-gray-600",
  premium: "from-blue-500 to-blue-600", 
  avancado: "from-purple-500 to-purple-600",
  monster: "from-red-500 to-red-600",
};

export function PlanRestriction({ feature, currentPlan, requiredPlan, description }: PlanRestrictionProps) {
  const RequiredIcon = planIcons[requiredPlan as keyof typeof planIcons];
  const color = planColors[requiredPlan as keyof typeof planColors];

  return (
    <Card className="border-dashed border-2 border-orange-200 bg-orange-50">
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <RequiredIcon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Recurso Bloqueado
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          {description || `O recurso "${feature}" requer o plano ${requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} ou superior.`}
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            Plano Atual: {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
          </Badge>
          <Badge className="bg-orange-100 text-orange-800 text-xs">
            Requer: {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)}
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