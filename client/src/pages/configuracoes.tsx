import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ClientSidebar } from "@/components/layout/client-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Settings, User, Bell, Shield, CreditCard, Key } from "lucide-react";

export default function ConfiguracoesPage() {
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
            <p className="text-gray-600 mt-1">Gerencie sua conta e preferências</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle>Perfil</CardTitle>
                    <CardDescription>Informações pessoais da sua conta</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nome</label>
                    <Input defaultValue={user.firstName || ""} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Sobrenome</label>
                    <Input defaultValue={user.lastName || ""} className="mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input defaultValue={user.email || ""} className="mt-1" disabled />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <Input defaultValue={user.username || ""} className="mt-1" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Salvar Alterações</Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>Gerencie sua senha e segurança</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Senha Atual</label>
                  <Input type="password" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Nova Senha</label>
                  <Input type="password" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                  <Input type="password" className="mt-1" />
                </div>
                <Button variant="outline">Alterar Senha</Button>
              </CardContent>
            </Card>

            {/* Plan */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <div>
                      <CardTitle>Plano Atual</CardTitle>
                      <CardDescription>Gerencie sua assinatura</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-1">
                    {user.planType || "Gratuito"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Você está no plano <strong>{user.planType || "Gratuito"}</strong>
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">Fazer Upgrade</Button>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-orange-600" />
                  <div>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>Gerencie suas chaves de API</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Sua API Key:</p>
                    <code className="text-xs bg-white px-3 py-2 rounded border block">
                      ••••••••••••••••••••••••
                    </code>
                  </div>
                  <Button variant="outline">Gerar Nova API Key</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-yellow-600" />
                  <div>
                    <CardTitle>Notificações</CardTitle>
                    <CardDescription>Configure suas preferências de notificação</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email de vendas</p>
                    <p className="text-sm text-gray-600">Receba email quando houver uma nova venda</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Relatórios semanais</p>
                    <p className="text-sm text-gray-600">Resumo semanal das suas campanhas</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas de performance</p>
                    <p className="text-sm text-gray-600">Notificações sobre quedas de performance</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

