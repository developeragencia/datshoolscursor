import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ClientSidebar } from "@/components/layout/client-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus, Facebook, Globe, Video, Copy, Trash2 } from "lucide-react";

export default function PixelsPage() {
  const [, setLocation] = useLocation();
  const { data: user } = useQuery({ queryKey: ["/api/auth/me"] });
  const { data: pixels = [] } = useQuery({
    queryKey: ["/api/pixels"],
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

  const pixelTypes = [
    { id: "facebook", name: "Meta Pixel", icon: Facebook, color: "blue" },
    { id: "google", name: "Google Analytics", icon: Globe, color: "red" },
    { id: "tiktok", name: "TikTok Pixel", icon: Video, color: "black" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pixels de Rastreamento</h1>
              <p className="text-gray-600 mt-1">Gerencie seus pixels de conversão</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Pixel
            </Button>
          </div>

          {/* Pixel Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {pixelTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card key={type.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full bg-${type.color}-100 flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 text-${type.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="h-3 w-3 mr-2" />
                      Adicionar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pixels List */}
          {pixels.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum pixel configurado
                </h3>
                <p className="text-gray-600 mb-6">
                  Adicione pixels para rastrear conversões e otimizar suas campanhas
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Pixel
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pixels.map((pixel: any) => (
                <Card key={pixel.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Eye className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{pixel.name}</h3>
                          <p className="text-sm text-gray-600">ID: {pixel.pixelId}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant={pixel.active ? "default" : "secondary"}>
                              {pixel.active ? "Ativo" : "Inativo"}
                            </Badge>
                            <Badge variant="outline">{pixel.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Instructions */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Como usar pixels?</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-blue-800">
                <li>Adicione o ID do seu pixel acima</li>
                <li>Cole o código do pixel no seu site</li>
                <li>Configure eventos de conversão</li>
                <li>Acompanhe os resultados nos relatórios</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

