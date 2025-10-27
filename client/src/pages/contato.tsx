import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle,
  ExternalLink,
  Users,
  Headphones,
  Globe,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactMethods = [
  {
    icon: MessageSquare,
    title: "Chat ao Vivo",
    description: "Fale conosco em tempo real",
    value: "Disponível 24/7",
    action: "Iniciar Chat",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Mail,
    title: "Email",
    description: "Envie sua dúvida por email",
    value: "suporte@bueirodigital.com",
    action: "Enviar Email",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Phone,
    title: "WhatsApp",
    description: "Suporte via WhatsApp",
    value: "+55 (11) 99999-9999",
    action: "Abrir WhatsApp",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Headphones,
    title: "Suporte Técnico",
    description: "Para questões técnicas",
    value: "Segunda a Sexta, 9h às 18h",
    action: "Contatar",
    color: "bg-purple-100 text-purple-600"
  }
];

const supportTopics = [
  "Suporte Técnico",
  "Problemas de Faturamento", 
  "Solicitação de Recurso",
  "Integração de API",
  "Configuração de Campanhas",
  "Relatórios e Analytics",
  "Cancelamento/Reembolso",
  "Sugestão de Melhoria",
  "Outros"
];

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    categoria: "",
    mensagem: "",
    prioridade: "normal"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.mensagem) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, email e mensagem",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em até 24 horas"
      });
      
      // Reset form
      setFormData({
        nome: "",
        email: "",
        assunto: "",
        categoria: "",
        mensagem: "",
        prioridade: "normal"
      });
    }, 2000);
  };

  const handleContactMethod = (method: string) => {
    switch (method) {
      case "Chat ao Vivo":
        toast({
          title: "Redirecionando...",
          description: "Abrindo chat ao vivo"
        });
        break;
      case "Email":
        window.location.href = "mailto:suporte@bueirodigital.com";
        break;
      case "WhatsApp":
        window.open("https://wa.me/5511999999999", "_blank");
        break;
      default:
        toast({
          title: "Contato iniciado",
          description: `Abrindo ${method}`
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fale Conosco</h1>
              <p className="text-gray-600 mt-1">
                Estamos aqui para ajudar! Entre em contato através dos canais abaixo
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Contact Methods */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Canais de Atendimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleContactMethod(method.title)}>
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-3 rounded-xl ${method.color} mb-4`}>
                      <method.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                    <p className="text-sm font-medium text-gray-900 mb-4">{method.value}</p>
                    <Button size="sm" className="w-full">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Enviar Mensagem
                </CardTitle>
                <CardDescription>
                  Descreva sua dúvida ou solicitação e retornaremos em breve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        value={formData.nome}
                        onChange={(e) => handleInputChange("nome", e.target.value)}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto
                    </label>
                    <Input
                      value={formData.assunto}
                      onChange={(e) => handleInputChange("assunto", e.target.value)}
                      placeholder="Breve descrição do assunto"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria
                      </label>
                      <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {supportTopics.map((topic) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prioridade
                      </label>
                      <Select value={formData.prioridade} onValueChange={(value) => handleInputChange("prioridade", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixa">Baixa</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="alta">Alta</SelectItem>
                          <SelectItem value="urgente">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      value={formData.mensagem}
                      onChange={(e) => handleInputChange("mensagem", e.target.value)}
                      placeholder="Descreva sua dúvida ou solicitação em detalhes..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Company Info */}
            <div className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Informações da Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Endereço</p>
                      <p className="text-gray-600">
                        Av. Paulista, 1000 - Bela Vista<br />
                        São Paulo, SP - 01310-100
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Horário de Funcionamento</p>
                      <p className="text-gray-600">
                        Segunda a Sexta: 9h às 18h<br />
                        Sábado: 9h às 12h<br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Website</p>
                      <p className="text-blue-600 hover:text-blue-700 cursor-pointer">
                        www.bueirodigital.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Tempo de Resposta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Chat ao Vivo</span>
                    <Badge className="bg-green-100 text-green-800">Imediato</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">WhatsApp</span>
                    <Badge className="bg-blue-100 text-blue-800">5-10 min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email</span>
                    <Badge className="bg-orange-100 text-orange-800">Até 24h</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Formulário</span>
                    <Badge className="bg-orange-100 text-orange-800">Até 24h</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-3 text-white" />
                  <h3 className="font-bold mb-2">Suporte Prioritário</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Clientes dos planos Avançado e Monster têm prioridade no atendimento
                  </p>
                  <Button variant="secondary" size="sm">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Upgrade seu Plano
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}