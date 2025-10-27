import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle,
  Clock,
  Smartphone,
  RefreshCw,
  ArrowLeft,
  Copy,
  AlertCircle
} from "lucide-react";
import { useLocation } from "wouter";

export default function PixStatusPage() {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, processing, confirmed, failed
  const [checkCount, setCheckCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutos em segundos
  
  // Dados do pagamento (normalmente viriam da URL ou localStorage)
  const paymentData = {
    plan: "Premium",
    amount: "R$ 97,00",
    pixCode: "00020126580014br.gov.bcb.pix013636b2e1b3-f4c5-4d6e-8f7a-123456780204PIX520400005303986540970055802BR5925BUEIRO DIGITAL LTDA ME6009SAO PAULO610580000620705031236304ABCD1234",
    pixId: "PIX12345678",
    createdAt: new Date().toISOString()
  };

  // Timer para diminuir tempo restante
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setPaymentStatus("expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Verificação automática de pagamento a cada 30 segundos
  useEffect(() => {
    if (paymentStatus === "pending") {
      const checkTimer = setInterval(() => {
        checkPaymentStatus();
      }, 30000);

      return () => clearInterval(checkTimer);
    }
  }, [paymentStatus]);

  const checkPaymentStatus = async () => {
    if (paymentStatus !== "pending") return;
    
    setPaymentStatus("processing");
    setCheckCount(prev => prev + 1);
    
    // Simular verificação de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulação: 15% chance de pagamento confirmado após 3 tentativas
    const shouldConfirm = checkCount >= 2 && Math.random() > 0.85;
    
    if (shouldConfirm) {
      setPaymentStatus("confirmed");
      toast({
        title: "Pagamento confirmado!",
        description: "Seu plano foi ativado com sucesso. Redirecionando...",
      });
      
      setTimeout(() => {
        setLocation("/dashboard");
      }, 3000);
    } else {
      setPaymentStatus("pending");
    }
  };

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(paymentData.pixCode);
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const generateNewPix = () => {
    setTimeRemaining(15 * 60);
    setPaymentStatus("pending");
    setCheckCount(0);
    toast({
      title: "Novo PIX gerado",
      description: "Código PIX renovado com sucesso. Válido por 15 minutos.",
    });
  };

  const getStatusBadge = () => {
    switch (paymentStatus) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Aguardando Pagamento
        </Badge>;
      case "processing":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          Verificando...
        </Badge>;
      case "confirmed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Confirmado
        </Badge>;
      case "expired":
        return <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Expirado
        </Badge>;
      default:
        return null;
    }
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
              onClick={() => setLocation("/checkout")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Checkout
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Status do Pagamento PIX</h1>
            <p className="text-gray-600">Acompanhe sua transação em tempo real</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Status Principal */}
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {paymentStatus === "confirmed" ? (
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                  ) : paymentStatus === "expired" ? (
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-10 w-10 text-red-600" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      <Smartphone className="h-10 w-10 text-blue-600" />
                    </div>
                  )}
                </div>
                
                <CardTitle className="text-2xl mb-2">
                  {paymentStatus === "confirmed" && "Pagamento Confirmado!"}
                  {paymentStatus === "expired" && "PIX Expirado"}
                  {(paymentStatus === "pending" || paymentStatus === "processing") && "Aguardando Pagamento"}
                </CardTitle>
                
                <div className="flex justify-center">
                  {getStatusBadge()}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Detalhes do Pagamento */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Detalhes do Pedido</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Plano:</p>
                      <p className="font-medium">{paymentData.plan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Valor:</p>
                      <p className="font-medium">{paymentData.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ID da Transação:</p>
                      <p className="font-medium font-mono text-xs">{paymentData.pixId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tempo Restante:</p>
                      <p className="font-medium text-orange-600">
                        {paymentStatus === "expired" ? "Expirado" : formatTime(timeRemaining)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instruções baseadas no status */}
                {paymentStatus === "confirmed" ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">✅ Pagamento Aprovado!</h3>
                    <p className="text-green-700 text-sm">
                      Seu plano {paymentData.plan} foi ativado com sucesso. Você será redirecionado para o dashboard em alguns segundos.
                    </p>
                  </div>
                ) : paymentStatus === "expired" ? (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">⏰ PIX Expirado</h3>
                    <p className="text-red-700 text-sm mb-3">
                      O tempo limite para pagamento foi excedido. Gere um novo código PIX para continuar.
                    </p>
                    <Button onClick={generateNewPix} className="w-full">
                      Gerar Novo PIX
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">📱 Como Pagar</h3>
                      <ol className="text-blue-700 text-sm space-y-1">
                        <li>1. Abra o app do seu banco</li>
                        <li>2. Selecione a opção PIX</li>
                        <li>3. Escaneie o QR Code ou use o código copia e cola</li>
                        <li>4. Confirme o pagamento de {paymentData.amount}</li>
                      </ol>
                    </div>

                    {/* Código PIX */}
                    <div className="p-4 bg-gray-50 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Código PIX</h4>
                        <Button size="sm" variant="outline" onClick={copyPixCode}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copiar
                        </Button>
                      </div>
                      <p className="font-mono text-xs bg-white p-2 rounded border break-all">
                        {paymentData.pixCode}
                      </p>
                    </div>

                    {/* Botões de Ação */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        onClick={checkPaymentStatus}
                        disabled={paymentStatus === "processing"}
                      >
                        {paymentStatus === "processing" ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Verificando...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Verificar Pagamento
                          </>
                        )}
                      </Button>
                      
                      <Button variant="outline" onClick={generateNewPix}>
                        Gerar Novo PIX
                      </Button>
                    </div>
                  </div>
                )}

                {/* Informações de Segurança */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">🔒 Segurança</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Nunca compartilhe este código com terceiros</li>
                    <li>• Confirme sempre o valor antes de pagar</li>
                    <li>• O PIX expira em 15 minutos por segurança</li>
                    <li>• Seu pagamento é processado automaticamente</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}