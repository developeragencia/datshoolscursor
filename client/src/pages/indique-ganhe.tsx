import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { Copy, Gift, Users, DollarSign, Star, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function IndiqueGanhePage() {
  const { toast } = useToast();

  const copyReferralLink = () => {
    const link = "https://app.bueirodigital.com.br/ref/BD123456";
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "Seu link de indicação foi copiado para a área de transferência.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Gift className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Indique e Ganhe</h1>
              <p className="text-gray-600 mt-1">
                Ganhe comissões indicando o Bueiro Digital para amigos
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Indicações</p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">12</p>
                  </div>
                  <div className="p-3 bg-blue-200 rounded-xl">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Comissões</p>
                    <p className="text-3xl font-bold text-green-900 mt-2">R$ 2.450</p>
                  </div>
                  <div className="p-3 bg-green-200 rounded-xl">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Conversões</p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">8</p>
                  </div>
                  <div className="p-3 bg-purple-200 rounded-xl">
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700">Taxa</p>
                    <p className="text-3xl font-bold text-orange-900 mt-2">66%</p>
                  </div>
                  <div className="p-3 bg-orange-200 rounded-xl">
                    <Star className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral Link */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Seu Link de Indicação
              </CardTitle>
              <CardDescription>
                Compartilhe este link e ganhe 30% de comissão vitalícia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input 
                  value="https://app.bueirodigital.com.br/ref/BD123456"
                  readOnly
                  className="font-mono"
                />
                <Button onClick={copyReferralLink} className="shrink-0">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Commission Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Como Funciona</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">1</div>
                  <div>
                    <h4 className="font-semibold">Compartilhe seu link</h4>
                    <p className="text-sm text-gray-600">Envie seu link personalizado para amigos e contatos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">2</div>
                  <div>
                    <h4 className="font-semibold">Eles se cadastram</h4>
                    <p className="text-sm text-gray-600">Quando alguém se inscreve pelo seu link</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">3</div>
                  <div>
                    <h4 className="font-semibold">Você ganha comissão</h4>
                    <p className="text-sm text-gray-600">Receba 30% de tudo que eles pagarem, para sempre</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Planos e Comissões</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">Premium</span>
                    <Badge variant="outline" className="ml-2">R$ 97/mês</Badge>
                  </div>
                  <span className="font-bold text-green-600">R$ 29,10/mês</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">Avançado</span>
                    <Badge variant="outline" className="ml-2">R$ 197/mês</Badge>
                  </div>
                  <span className="font-bold text-green-600">R$ 59,10/mês</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">Monster</span>
                    <Badge variant="outline" className="ml-2">R$ 497/mês</Badge>
                  </div>
                  <span className="font-bold text-green-600">R$ 149,10/mês</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Referrals */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Indicações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Usuário #{i + 10}</p>
                        <p className="text-sm text-gray-600">Cadastrado há {i + 1} dias</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={i <= 2 ? "default" : "secondary"}>
                        {i <= 2 ? "Converteu" : "Pendente"}
                      </Badge>
                      {i <= 2 && (
                        <p className="text-sm text-green-600 font-medium mt-1">
                          +R$ {(Math.random() * 100 + 50).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}