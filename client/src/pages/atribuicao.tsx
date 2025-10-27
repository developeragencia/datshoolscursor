import { useQuery } from "@tantml:react-query";
import { useLocation } from "wouter";
import { ClientSidebar } from "@/components/layout/client-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Calendar } from "lucide-react";

export default function AtribuicaoPage() {
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

  const attributionModels = [
    { name: "Último Clique", description: "100% do crédito para o último toque" },
    { name: "Primeiro Clique", description: "100% do crédito para o primeiro toque" },
    { name: "Linear", description: "Crédito distribuído igualmente" },
    { name: "Time Decay", description: "Mais crédito para toques recentes" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Modelo de Atribuição</h1>
              <p className="text-gray-600 mt-1">Entenda como seus canais contribuem para conversões</p>
            </div>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Últimos 30 dias
            </Button>
          </div>

          {/* Attribution Models */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {attributionModels.map((model) => (
              <Card key={model.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{model.name}</h3>
                      <p className="text-sm text-gray-600">{model.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Channel Attribution */}
          <Card>
            <CardHeader>
              <CardTitle>Atribuição por Canal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Configure suas campanhas para ver dados de atribuição
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

