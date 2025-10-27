import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ClientSidebar } from "@/components/layout/client-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Webhook, Plus, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";

export default function WebhooksPage() {
  const [, setLocation] = useLocation();
  const { data: user } = useQuery({ queryKey: ["/api/auth/me"] });
  const { data: webhooks = [] } = useQuery({
    queryKey: ["/api/webhooks"],
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
              <h1 className="text-3xl font-bold text-gray-900">Webhooks</h1>
              <p className="text-gray-600 mt-1">Configure integrações em tempo real</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Webhook
            </Button>
          </div>

          {/* Webhook Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Criar Webhook</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <Input placeholder="Meu Webhook" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">URL de Destino</label>
                <Input placeholder="https://seu-site.com/webhook" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Evento</label>
                <select className="w-full h-10 px-3 rounded-md border border-gray-300 mt-1">
                  <option>Selecione um evento</option>
                  <option value="sale.created">Nova Venda</option>
                  <option value="sale.approved">Venda Aprovada</option>
                  <option value="sale.cancelled">Venda Cancelada</option>
                  <option value="lead.created">Novo Lead</option>
                </select>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Criar Webhook</Button>
            </CardContent>
          </Card>

          {/* Webhooks List */}
          {webhooks.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Webhook className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum webhook configurado
                </h3>
                <p className="text-gray-600">
                  Configure webhooks para receber notificações em tempo real
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {webhooks.map((webhook: any) => (
                <Card key={webhook.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{webhook.name}</h3>
                          <Badge variant={webhook.active ? "default" : "secondary"}>
                            {webhook.active ? "Ativo" : "Inativo"}
                          </Badge>
                          {webhook.lastStatus === "success" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{webhook.url}</p>
                        <p className="text-xs text-gray-500">
                          Evento: {webhook.event} • Último envio: {webhook.lastSent || "Nunca"}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="sm" title="Testar">
                          <RefreshCw className="h-4 w-4" />
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

