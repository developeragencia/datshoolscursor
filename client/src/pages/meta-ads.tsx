import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ClientSidebar } from "@/components/layout/client-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, TrendingUp, Eye, MousePointerClick, DollarSign } from "lucide-react";

export default function MetaAdsPage() {
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
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Facebook className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Meta Ads</h1>
                <p className="text-gray-600 mt-1">Facebook & Instagram Ads</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Conectar Conta</Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Impressões
                </CardTitle>
                <Eye className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Cliques
                </CardTitle>
                <MousePointerClick className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Investimento
                </CardTitle>
                <DollarSign className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 0</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  ROAS
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0x</div>
              </CardContent>
            </Card>
          </div>

          {/* Connection Card */}
          <Card>
            <CardContent className="p-12 text-center">
              <Facebook className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Conecte sua conta Meta Ads
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Conecte sua conta do Facebook Business Manager para visualizar e gerenciar suas campanhas
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                <Facebook className="h-5 w-5 mr-3" />
                Conectar com Facebook
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

