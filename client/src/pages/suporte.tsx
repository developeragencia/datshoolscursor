import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  ExternalLink,
  Book,
  Video,
  FileText,
  Search
} from "lucide-react";

export default function SuportePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Central de Suporte</h1>
              <p className="text-gray-600 mt-1">
                Encontre ajuda, documentação e entre em contato conosco
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Quick Help */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Como podemos ajudar?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Busque por ajuda, tutoriais, documentação..."
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <Button variant="outline" className="h-16 flex-col">
                  <Book className="h-5 w-5 mb-2" />
                  Documentação
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Video className="h-5 w-5 mb-2" />
                  Tutoriais
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <MessageSquare className="h-5 w-5 mb-2" />
                  FAQ
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <ExternalLink className="h-5 w-5 mb-2" />
                  Comunidade
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Options */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-blue-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Chat ao Vivo</h3>
                <p className="text-blue-700 mb-4">
                  Fale conosco agora através do chat
                </p>
                <Badge className="mb-4 bg-green-500">Online</Badge>
                <br />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Iniciar Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-green-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Telefone</h3>
                <p className="text-green-700 mb-4">
                  Ligue para nosso suporte
                </p>
                <p className="font-bold text-green-900 mb-4">
                  (11) 9999-9999
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-purple-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">E-mail</h3>
                <p className="text-purple-700 mb-4">
                  Envie sua dúvida por e-mail
                </p>
                <p className="font-bold text-purple-900 mb-4">
                  suporte@bueirodigital.com.br
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Enviar E-mail
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Enviar Mensagem</CardTitle>
              <CardDescription>
                Descreva sua dúvida ou problema que responderemos em breve
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nome</label>
                  <Input placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">E-mail</label>
                  <Input placeholder="seu@email.com" type="email" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Assunto</label>
                <Input placeholder="Resumo do problema ou dúvida" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Mensagem</label>
                <Textarea 
                  placeholder="Descreva detalhadamente sua dúvida ou problema..."
                  rows={6}
                />
              </div>
              <Button className="w-full">
                Enviar Mensagem
              </Button>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  question: "Como conectar minha conta do Facebook?",
                  answer: "Vá em Campanhas > Contas Facebook e clique em 'Conectar Conta'. Você precisará do App ID e Access Token do Facebook."
                },
                {
                  question: "Por que meus dados não estão aparecendo?",
                  answer: "Verifique se suas integrações estão ativas e se os webhooks estão configurados corretamente. Dados podem levar até 24h para sincronizar."
                },
                {
                  question: "Como configurar UTM tracking?",
                  answer: "Acesse UTM & Tracking > Links UTM para criar e gerenciar seus links de rastreamento personalizados."
                },
                {
                  question: "Posso exportar relatórios?",
                  answer: "Sim! Todos os relatórios podem ser exportados em Excel, CSV ou PDF através do botão 'Exportar' nas páginas de análise."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horário de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Suporte Técnico</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Segunda a Sexta</span>
                      <span>8h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <span>9h às 15h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <span>Fechado</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Chat e E-mail</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Disponível 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Resposta em até 2h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Suporte em português</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}