import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ClientSidebar } from "@/components/layout/client-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, Users, MousePointerClick, ShoppingCart, DollarSign } from "lucide-react";

export default function FunilPage() {
  const [, setLocation] = useLocation();
  const { data: user } = useQuery({ queryKey: ["/api/auth/me"] });

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setLocation("/login");
  };

  if (!user) {
    setLocation("/login");
    return null;
  }

  const funnelSteps = [
    { name: "Visitantes", value: 0, icon: Users, color: "blue" },
    { name: "Cliques", value: 0, icon: MousePointerClick, color: "purple" },
    { name: "Carrinho", value: 0, icon: ShoppingCart, color: "orange" },
    { name: "Conversões", value: 0, icon: DollarSign, color: "green" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Funil de Conversão</h1>
            <p className="text-gray-600 mt-1">Visualize o caminho do cliente até a conversão</p>
          </div>

          {/* Funnel Visualization */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Funil de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelSteps.map((step, index) => {
                  const Icon = step.icon;
                  const width = 100 - (index * 15);
                  return (
                    <div key={step.name} className="relative">
                      <div 
                        className={`bg-${step.color}-100 border-2 border-${step.color}-300 rounded-lg p-6 transition-all hover:shadow-lg`}
                        style={{ width: `${width}%`, marginLeft: `${(100 - width) / 2}%` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className={`h-6 w-6 text-${step.color}-600`} />
                            <div>
                              <h3 className="font-semibold text-gray-900">{step.name}</h3>
                              <p className="text-sm text-gray-600">
                                {index > 0 && funnelSteps[index - 1].value > 0
                                  ? `${((step.value / funnelSteps[index - 1].value) * 100).toFixed(1)}% do anterior`
                                  : "Entrada do funil"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-gray-900">{step.value}</p>
                            <p className="text-sm text-gray-600">usuários</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Taxa de Conversão Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">0%</div>
                <p className="text-sm text-gray-500 mt-1">Visitantes → Conversões</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Taxa de Abandono
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">0%</div>
                <p className="text-sm text-gray-500 mt-1">Usuários que abandonaram</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Tempo Médio no Funil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">0m</div>
                <p className="text-sm text-gray-500 mt-1">Tempo até conversão</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

