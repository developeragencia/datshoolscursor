import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { PlanAccess } from "@/components/plan-access";
import { useToast } from "@/hooks/use-toast";
import { 
  Monitor, 
  Plus, 
  Settings, 
  Share, 
  Eye, 
  Edit, 
  Trash2,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";

function MultipleDashboardsPage() {
  const { toast } = useToast();
  
  const mockDashboards = [
    {
      id: 1,
      name: "Performance Geral",
      description: "Visão completa de todas as campanhas",
      isDefault: true,
      widgets: 8,
      lastUpdated: "2025-01-29",
      isShared: false
    },
    {
      id: 2,
      name: "Campanhas Facebook",
      description: "Métricas específicas do Meta Ads",
      isDefault: false,
      widgets: 6,
      lastUpdated: "2025-01-28",
      isShared: true
    },
    {
      id: 3,
      name: "Análise de ROI",
      description: "Focado em retorno sobre investimento",
      isDefault: false,
      widgets: 4,
      lastUpdated: "2025-01-27",
      isShared: false
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Múltiplos Dashboards
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Crie e gerencie diferentes visualizações dos seus dados
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDashboards.map((dashboard) => (
          <Card key={dashboard.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{dashboard.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {dashboard.isDefault && (
                    <Badge variant="secondary" className="text-xs">
                      Padrão
                    </Badge>
                  )}
                  {dashboard.isShared && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Compartilhado
                    </Badge>
                  )}
                </div>
              </div>
              <CardDescription>{dashboard.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Widgets:</span>
                  <span className="font-medium">{dashboard.widgets}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Atualizado:</span>
                  <span className="font-medium">{dashboard.lastUpdated}</span>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => toast({ title: "Abrindo dashboard", description: `Carregando ${dashboard.name}...` })}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({ title: "Editando dashboard", description: "Abrindo editor..." })}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({ title: "Compartilhando", description: "Configurando permissões..." })}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Widgets Disponíveis
            </CardTitle>
            <CardDescription>
              Componentes que você pode adicionar aos seus dashboards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Receita Total", icon: DollarSign, color: "green" },
                { name: "Conversões", icon: TrendingUp, color: "blue" },
                { name: "Tráfego", icon: Users, color: "purple" },
                { name: "Performance", icon: BarChart3, color: "orange" }
              ].map((widget, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <widget.icon className={`h-5 w-5 text-${widget.color}-600`} />
                    <span className="text-sm font-medium">{widget.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Wrapper com controle de acesso por plano
function MultipleDashboardsWithPlanControl() {
  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  const userPlan = (user as any)?.planType || "gratuito";
  
  // Múltiplos dashboards requerem plano Avançado ou superior
  if (userPlan === "gratuito" || userPlan === "premium") {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <PlanAccess 
              feature="Múltiplos Dashboards"
              requiredPlan="avancado"
              description="Crie dashboards personalizados para diferentes aspectos do seu negócio. Disponível no plano Avançado ou superior."
            >
              <MultipleDashboardsPage />
            </PlanAccess>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <MultipleDashboardsPage />
      </div>
    </div>
  );
}

export default MultipleDashboardsWithPlanControl;