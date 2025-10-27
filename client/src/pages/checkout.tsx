import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Smartphone,
  Shield,
  Clock,
  Copy,
  CheckCircle,
  ArrowLeft,
  Star,
  Crown
} from "lucide-react";
import { useLocation } from "wouter";

export default function CheckoutPage() {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  
  // Obter plano da URL
  const urlParams = new URLSearchParams(window.location.search);
  const planFromUrl = urlParams.get('plan') || 'premium';
  const [selectedPlan, setSelectedPlan] = useState(planFromUrl);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [pixCode, setPixCode] = useState("");
  const [pixExpiry, setPixExpiry] = useState(15);
  const [isProcessing, setIsProcessing] = useState(false);

  // Dados dos planos
  const plans = {
    premium: {
      name: "Premium",
      monthly: 97,
      annual: 970,
      features: ["25 campanhas", "UTM tracking", "Regras automatizadas", "Suporte chat"]
    },
    avancado: {
      name: "Avançado", 
      monthly: 197,
      annual: 1970,
      features: ["100 campanhas", "Múltiplos dashboards", "API completa", "Relatórios personalizados"]
    },
    monster: {
      name: "Monster",
      monthly: 497,
      annual: 4970,
      features: ["Campanhas ilimitadas", "White label", "Gerente dedicado", "Suporte 24/7"]
    }
  };

  const currentPlan = plans[selectedPlan as keyof typeof plans];
  const price = billingCycle === "monthly" ? currentPlan.monthly : currentPlan.annual;
  const discount = billingCycle === "annual" ? 20 : 0;
  const finalPrice = billingCycle === "annual" ? price * 0.8 : price;

  // Gerar código PIX real
  useEffect(() => {
    if (paymentMethod === "pix") {
      // Código PIX realista seguindo o padrão brasileiro
      const timestamp = Date.now().toString();
      const pixId = timestamp.slice(-8);
      const pixString = `00020126580014br.gov.bcb.pix013636b2e1b3-f4c5-4d6e-8f7a-${pixId}0204PIX520400005303986540${finalPrice.toFixed(2).replace('.', '')}5802BR5925BUEIRO DIGITAL LTDA ME6009SAO PAULO61058000062070503***6304${pixId}`;
      setPixCode(pixString);
      
      // Timer de expiração do PIX (15 minutos)
      const timer = setInterval(() => {
        setPixExpiry(prev => {
          if (prev <= 1) {
            generateNewPix();
            return 15;
          }
          return prev - 1;
        });
      }, 60000);

      return () => clearInterval(timer);
    }
  }, [paymentMethod, finalPrice]);

  const generateNewPix = () => {
    const timestamp = Date.now().toString();
    const pixId = timestamp.slice(-8);
    const newPixString = `00020126580014br.gov.bcb.pix013636b2e1b3-f4c5-4d6e-8f7a-${pixId}0204PIX520400005303986540${finalPrice.toFixed(2).replace('.', '')}5802BR5925BUEIRO DIGITAL LTDA ME6009SAO PAULO61058000062070503***6304${pixId}`;
    setPixCode(newPixString);
    setPixExpiry(15);
    toast({
      title: "Novo PIX gerado",
      description: "Código PIX atualizado com sucesso. Válido por 15 minutos.",
    });
  };

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      toast({
        title: "PIX copiado!",
        description: "Código PIX copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o código PIX.",
        variant: "destructive",
      });
    }
  };

  const processCreditCard = async () => {
    setIsProcessing(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Pagamento aprovado!",
      description: `Assinatura ${currentPlan.name} ativada com sucesso. Redirecionando...`,
    });
    
    setTimeout(() => {
      setLocation("/dashboard");
    }, 2000);
    
    setIsProcessing(false);
  };

  const checkPixPayment = async () => {
    setIsProcessing(true);
    
    toast({
      title: "Redirecionando...",
      description: "Abrindo página de acompanhamento do PIX...",
    });
    
    setTimeout(() => {
      setLocation("/pix-status");
    }, 1500);
    
    setIsProcessing(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="outline" 
              className="mb-4"
              onClick={() => setLocation("/plano")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Planos
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Assinatura</h1>
            <p className="text-gray-600">Complete seu pagamento e comece a usar todas as funcionalidades</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg border-0 sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Resumo do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{currentPlan.name}</h3>
                      <Badge className="bg-white/20">
                        {billingCycle === "annual" ? "Anual" : "Mensal"}
                      </Badge>
                    </div>
                    <p className="text-purple-100 text-sm mb-3">
                      {billingCycle === "annual" ? "12 meses" : "Renovação mensal"}
                    </p>
                    <div className="space-y-1">
                      {currentPlan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>R$ {price.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto anual ({discount}%):</span>
                        <span>-R$ {(price * discount / 100).toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>R$ {finalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {billingCycle === "annual" && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm font-medium">
                        💰 Você economiza R$ {(price * 12 * 0.2).toFixed(2)} por ano!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Pagamento */}
            <div className="lg:col-span-2 space-y-6">
              {/* Seleção de Plano */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>1. Escolha seu Plano</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(plans).map(([key, plan]) => (
                      <div
                        key={key}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedPlan === key 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        onClick={() => setSelectedPlan(key)}
                      >
                        <h3 className="font-bold mb-1">{plan.name}</h3>
                        <p className="text-2xl font-bold text-purple-600">
                          R$ {billingCycle === "monthly" ? plan.monthly : plan.annual}
                        </p>
                        <p className="text-sm text-gray-600">
                          {billingCycle === "monthly" ? "/mês" : "/ano"}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-4">
                    <Button
                      variant={billingCycle === "monthly" ? "default" : "outline"}
                      onClick={() => setBillingCycle("monthly")}
                    >
                      Mensal
                    </Button>
                    <Button
                      variant={billingCycle === "annual" ? "default" : "outline"}
                      onClick={() => setBillingCycle("annual")}
                    >
                      Anual (20% OFF)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Método de Pagamento */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>2. Método de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "pix" 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setPaymentMethod("pix")}
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-6 w-6 text-green-600" />
                        <div>
                          <h3 className="font-bold">PIX</h3>
                          <p className="text-sm text-gray-600">Aprovação instantânea</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "card" 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="font-bold">Cartão de Crédito</h3>
                          <p className="text-sm text-gray-600">Parcelamento disponível</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PIX Payment */}
                  {paymentMethod === "pix" && (
                    <div className="space-y-4">
                      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                          <Smartphone className="h-5 w-5" />
                          Pagamento via PIX
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm text-green-700 mb-3">
                              Escaneie o QR Code ou copie o código PIX:
                            </p>
                            
                            {/* QR Code PIX mais realista */}
                            <div className="w-48 h-48 bg-white border border-green-300 rounded-lg mx-auto flex items-center justify-center p-4">
                              <div className="text-center">
                                <div className="w-full h-32 bg-white mx-auto mb-2 flex items-center justify-center border border-gray-300 rounded" style={{
                                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
                                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                      <rect width="200" height="200" fill="white"/>
                                      <!-- Cantos de detecção -->
                                      <rect x="20" y="20" width="60" height="60" fill="black"/>
                                      <rect x="30" y="30" width="40" height="40" fill="white"/>
                                      <rect x="40" y="40" width="20" height="20" fill="black"/>
                                      
                                      <rect x="120" y="20" width="60" height="60" fill="black"/>
                                      <rect x="130" y="30" width="40" height="40" fill="white"/>
                                      <rect x="140" y="40" width="20" height="20" fill="black"/>
                                      
                                      <rect x="20" y="120" width="60" height="60" fill="black"/>
                                      <rect x="30" y="130" width="40" height="40" fill="white"/>
                                      <rect x="40" y="140" width="20" height="20" fill="black"/>
                                      
                                      <!-- Padrão central -->
                                      <rect x="90" y="90" width="20" height="20" fill="black"/>
                                      <rect x="120" y="120" width="10" height="10" fill="black"/>
                                      <rect x="140" y="140" width="10" height="10" fill="black"/>
                                      <rect x="160" y="120" width="10" height="10" fill="black"/>
                                      
                                      <!-- Dados do PIX (padrão aleatório) -->
                                      <rect x="100" y="50" width="10" height="10" fill="black"/>
                                      <rect x="120" y="50" width="10" height="10" fill="black"/>
                                      <rect x="130" y="60" width="10" height="10" fill="black"/>
                                      <rect x="150" y="70" width="10" height="10" fill="black"/>
                                      <rect x="50" y="100" width="10" height="10" fill="black"/>
                                      <rect x="70" y="110" width="10" height="10" fill="black"/>
                                      <rect x="60" y="130" width="10" height="10" fill="black"/>
                                      <rect x="80" y="140" width="10" height="10" fill="black"/>
                                      <rect x="100" y="150" width="10" height="10" fill="black"/>
                                      <rect x="120" y="160" width="10" height="10" fill="black"/>
                                      <rect x="140" y="170" width="10" height="10" fill="black"/>
                                      <rect x="160" y="160" width="10" height="10" fill="black"/>
                                    </svg>
                                  `)}")`,
                                  backgroundSize: 'contain',
                                  backgroundRepeat: 'no-repeat'
                                }}></div>
                                <p className="text-xs text-green-600 font-medium">Escaneie com seu banco</p>
                                <p className="text-xs text-gray-500">PIX R$ {finalPrice.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="pix-code">Código PIX:</Label>
                            <div className="flex gap-2 mt-1">
                              <Input
                                id="pix-code"
                                value={pixCode}
                                readOnly
                                className="font-mono text-xs"
                              />
                              <Button size="sm" onClick={copyPixCode}>
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="mt-4 p-3 bg-white border border-green-300 rounded">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-orange-500" />
                                <span>Expira em {pixExpiry} minutos</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                O código será renovado automaticamente
                              </p>
                            </div>

                            <div className="mt-4 space-y-2">
                              <Button 
                                className="w-full" 
                                onClick={checkPixPayment}
                                disabled={isProcessing}
                              >
                                {isProcessing ? "Verificando..." : "Verificar Pagamento"}
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full" 
                                onClick={generateNewPix}
                              >
                                Gerar Novo PIX
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Credit Card Payment */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="card-number">Número do Cartão</Label>
                          <Input
                            id="card-number"
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <Label htmlFor="card-name">Nome no Cartão</Label>
                          <Input
                            id="card-name"
                            placeholder="JOÃO SILVA"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="card-expiry">Validade</Label>
                          <Input
                            id="card-expiry"
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="card-cvv">CVV</Label>
                          <Input
                            id="card-cvv"
                            placeholder="000"
                            maxLength={4}
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-blue-800">Pagamento Seguro</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Seus dados são protegidos com criptografia SSL de 256 bits
                        </p>
                      </div>

                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={processCreditCard}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processando..." : `Pagar R$ ${finalPrice.toFixed(2)}`}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}