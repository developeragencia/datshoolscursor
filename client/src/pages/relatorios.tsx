import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ClientSidebar } from "@/components/layout/client-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Download, Calendar, TrendingUp, Eye, MousePointerClick } from "lucide-react";

export default function RelatoriosPage() {
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
              <p className="text-gray-600 mt-1">Análise completa dos seus dados</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>

          {/* Period Selector */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Hoje</Button>
                  <Button variant="outline" size="sm">7 dias</Button>
                  <Button variant="default" size="sm">30 dias</Button>
                  <Button variant="outline" size="sm">90 dias</Button>
                  <Button variant="outline" size="sm">Personalizado</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total de Visitantes
                </CardTitle>
                <Eye className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-xs text-green-600 mt-1">+0% vs. período anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total de Cliques
                </CardTitle>
                <MousePointerClick className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-xs text-green-600 mt-1">+0% vs. período anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Taxa de Conversão
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0%</div>
                <p className="text-xs text-gray-500 mt-1">Sem dados</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Visitantes ao Longo do Tempo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <BarChart3 className="h-12 w-12 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversões por Fonte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <BarChart3 className="h-12 w-12 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

