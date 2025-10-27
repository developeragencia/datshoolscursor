import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Crown, Lock, Zap } from "lucide-react";
import { hasAccess, getPlanDisplayName, getPlanColor } from "@/utils/planUtils";

interface PlanAccessProps {
  feature: string;
  requiredPlan: "premium" | "avancado" | "monster";
  description: string;
  children: React.ReactNode;
}



export function PlanAccess({ feature, requiredPlan, description, children }: PlanAccessProps) {
  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  const userPlan = (user as any)?.planType || "gratuito";
  const userHasAccess = hasAccess(userPlan, requiredPlan);

  if (userHasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-[500px] p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Recurso Premium</CardTitle>
          <CardDescription className="text-lg">
            {feature} está disponível apenas para planos superiores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">{description}</p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Seu plano atual:</p>
                <Badge className={getPlanColor(userPlan)}>
                  {getPlanDisplayName(userPlan)}
                </Badge>
              </div>
              <div className="text-gray-400">→</div>
              <div>
                <p className="text-sm text-gray-500">Plano necessário:</p>
                <Badge className={getPlanColor(requiredPlan)}>
                  <Crown className="h-3 w-3 mr-1" />
                  {getPlanDisplayName(requiredPlan)} ou superior
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Desbloqueie este recurso
            </h3>
            <p className="text-gray-600 mb-4">
              Faça upgrade do seu plano e tenha acesso a {feature} e muito mais!
            </p>
            
            <div className="flex gap-3">
              <Link href="/planos">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Ver Planos
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>💡 Dica: Com o plano {getPlanDisplayName(requiredPlan)}, você também ganha acesso a relatórios avançados, automações e suporte prioritário!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}