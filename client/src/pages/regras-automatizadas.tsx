import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ClientSidebar } from "@/components/layout/client-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

export default function RegrasAutomatizadasPage() {
  const [, setLocation] = useLocation();
  const { data: user } = useQuery({ queryKey: ["/api/auth/me"] });
  const { data: rules = [] } = useQuery({
    queryKey: ["/api/automated-rules"],
    enabled: !!user,
  });

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setLocation("/login");
  };

  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Regras Automatizadas</h1>
              <p className="text-gray-600 mt-1">Automatize suas campanhas com regras inteligentes</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Regra
            </Button>
          </div>

          {/* Rule Templates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Pausar Campanha</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pausar automaticamente quando atingir orçamento
                </p>
                <Button variant="outline" size="sm" className="w-full">Usar Template</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Aumentar Orçamento</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Aumentar quando ROI for positivo
                </p>
                <Button variant="outline" size="sm" className="w-full">Usar Template</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Notificar Performance</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Enviar alerta quando performance cair
                </p>
                <Button variant="outline" size="sm" className="w-full">Usar Template</Button>
              </CardContent>
            </Card>
          </div>

          {/* Rules List */}
          {rules.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma regra configurada
                </h3>
                <p className="text-gray-600 mb-6">
                  Crie regras automatizadas para otimizar suas campanhas
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeira Regra
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {rules.map((rule: any) => (
                <Card key={rule.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                          <Badge variant={rule.active ? "default" : "secondary"}>
                            {rule.active ? "Ativa" : "Inativa"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rule.description}</p>
                        <p className="text-xs text-gray-500">
                          Executada {rule.executions || 0} vezes • Última execução: {rule.lastRun || "Nunca"}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="sm" title={rule.active ? "Desativar" : "Ativar"}>
                          {rule.active ? (
                            <ToggleRight className="h-5 w-5 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-5 w-5 text-gray-400" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" title="Excluir">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
