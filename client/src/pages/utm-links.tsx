import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ClientSidebar } from "@/components/layout/client-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link as LinkIcon, Plus, Copy, ExternalLink, Trash2 } from "lucide-react";

export default function UTMLinksPage() {
  const [, setLocation] = useLocation();
  const { data: user } = useQuery({ queryKey: ["/api/auth/me"] });
  const { data: links = [] } = useQuery({
    queryKey: ["/api/utm-links"],
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
              <h1 className="text-3xl font-bold text-gray-900">UTM Links</h1>
              <p className="text-gray-600 mt-1">Crie e gerencie seus links de rastreamento</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Criar UTM Link
            </Button>
          </div>

          {/* UTM Builder */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Construtor de UTM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">URL Base</label>
                <Input placeholder="https://seusite.com" className="mt-1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Source</label>
                  <Input placeholder="facebook" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Medium</label>
                  <Input placeholder="cpc" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Campaign</label>
                  <Input placeholder="black-friday" className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Content</label>
                  <Input placeholder="banner-principal" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Term</label>
                  <Input placeholder="palavra-chave" className="mt-1" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700">Gerar Link</Button>
                <Button variant="outline">Limpar</Button>
              </div>
            </CardContent>
          </Card>

          {/* Links List */}
          {links.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <LinkIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum link criado
                </h3>
                <p className="text-gray-600">
                  Crie seu primeiro UTM link usando o construtor acima
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {links.map((link: any) => (
                <Card key={link.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{link.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 break-all">{link.url}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline">
                            Cliques: {link.clicks || 0}
                          </Badge>
                          <Badge variant="outline">
                            Conversões: {link.conversions || 0}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
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
        </div>
      </div>
    </div>
  );
}

