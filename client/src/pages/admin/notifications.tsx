import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Send } from "lucide-react";

export default function AdminNotificationsPage() {
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
              <p className="text-gray-600 mt-1">Envie notificações para usuários</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Send className="h-4 w-4 mr-2" />
              Nova Notificação
            </Button>
          </div>

          {/* Notification Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Título</label>
                  <input
                    type="text"
                    className="w-full h-10 px-3 rounded-md border border-gray-300 mt-1"
                    placeholder="Título da notificação"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Mensagem</label>
                  <textarea
                    className="w-full px-3 py-2 rounded-md border border-gray-300 mt-1"
                    rows={4}
                    placeholder="Mensagem da notificação"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Destinatários</label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-300 mt-1">
                    <option>Todos os usuários</option>
                    <option>Apenas planos premium</option>
                    <option>Apenas planos gratuitos</option>
                  </select>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Notificação
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma notificação enviada
              </h3>
              <p className="text-gray-600">
                Notificações enviadas aparecerão aqui
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

