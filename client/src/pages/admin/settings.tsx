import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Globe, Mail, Shield, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  const [, setLocation] = useLocation();
  const { data: user } = useQuery({ queryKey: ["/api/auth/me"] });

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setLocation("/login");
  };

  if (!user || user.userType !== "admin") {
    setLocation("/dashboard");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
            <p className="text-gray-600 mt-1">Gerencie configurações globais</p>
          </div>

          <div className="space-y-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle>Configurações Gerais</CardTitle>
                    <CardDescription>Configurações básicas do sistema</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nome do Sistema</label>
                  <Input defaultValue="Dashtools" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">URL Base</label>
                  <Input defaultValue="https://dashtools.com" className="mt-1" />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">Salvar Alterações</Button>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <CardTitle>Configurações de Email</CardTitle>
                    <CardDescription>SMTP e templates de email</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Servidor SMTP</label>
                  <Input placeholder="smtp.gmail.com" className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Porta</label>
                    <Input placeholder="587" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Remetente</label>
                    <Input placeholder="noreply@dashtools.com" className="mt-1" />
                  </div>
                </div>
                <Button variant="outline">Testar Conexão</Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-red-600" />
                  <div>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>Configurações de segurança do sistema</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticação de 2 fatores</p>
                    <p className="text-sm text-gray-600">Requer 2FA para admins</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Logs de auditoria</p>
                    <p className="text-sm text-gray-600">Registrar todas as ações</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
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
                    <CardDescription>Alertas e notificações do sistema</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas de erro</p>
                    <p className="text-sm text-gray-600">Notificar admins sobre erros críticos</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Relatórios diários</p>
                    <p className="text-sm text-gray-600">Resumo diário do sistema</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

