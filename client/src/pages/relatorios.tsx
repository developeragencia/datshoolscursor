import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  Share2,
  Plus,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Clock,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RelatoriosPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const { toast } = useToast();

  // Mock reports data
  const reportsData = {
    savedReports: [
      {
        id: "RPT-001",
        name: "Relatório Mensal de Vendas",
        type: "Vendas",
        lastGenerated: "2025-01-28",
        status: "ready",
        downloads: 24
      },
      {
        id: "RPT-002", 
        name: "Performance de Campanhas",
        type: "Campanhas",
        lastGenerated: "2025-01-27",
        status: "generating",
        downloads: 15
      },
      {
        id: "RPT-003",
        name: "Análise de Conversões",
        type: "Conversões",
        lastGenerated: "2025-01-26",
        status: "ready",
        downloads: 31
      }
    ],
    reportTypes: [
      { name: "Vendas Detalhadas", icon: DollarSign, color: "green" },
      { name: "Performance de Campanhas", icon: Target, color: "blue" },
      { name: "Análise de Conversões", icon: TrendingUp, color: "purple" },
      { name: "Tráfego e Visitantes", icon: Users, color: "orange" },
      { name: "ROI e ROAS", icon: TrendingUp, color: "red" },
      { name: "Funil de Vendas", icon: Target, color: "indigo" }
    ],
    quickStats: {
      totalReports: 47,
      monthlyDownloads: 156,
      automatedReports: 12,
      sharedReports: 8
    }
  };

  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    name: "",
    type: "vendas",
    period: "30d",
    format: "pdf"
  });

  const generateReport = (type: string) => {
    if (type === "Relatório Personalizado") {
      setIsNewReportModalOpen(true);
      toast({
        title: "Configurar novo relatório",
        description: "Personalize seu relatório antes de gerar"
      });
      return;
    }

    toast({
      title: `Gerando relatório: ${type}`,
      description: "O relatório será enviado por email quando pronto"
    });

    setTimeout(() => {
      toast({
        title: "Relatório gerado!",
        description: `${type} está disponível para download`
      });
    }, 3000);
  };

  const createCustomReport = () => {
    const newReport = {
      id: `RPT-${Date.now()}`,
      name: reportConfig.name || "Relatório Personalizado",
      type: reportConfig.type,
      lastGenerated: new Date().toISOString().split('T')[0],
      status: "generating",
      downloads: 0
    };

    toast({
      title: "Relatório criado!",
      description: `${newReport.name} foi adicionado à lista`
    });
    
    setIsNewReportModalOpen(false);
    setReportConfig({ name: "", type: "vendas", period: "30d", format: "pdf" });
  };

  const downloadReport = (reportId: string, reportName: string) => {
    toast({
      title: "Download iniciado",
      description: `Baixando: ${reportName}`
    });

    setTimeout(() => {
      toast({
        title: "Download concluído!",
        description: "Relatório salvo na pasta de downloads"
      });
    }, 1500);
  };

  const shareReport = (reportId: string, reportName: string) => {
    const shareUrl = `${window.location.origin}/relatorio/${reportId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast({
          title: "Link copiado!",
          description: `Link de compartilhamento: ${reportName}`
        });
      });
    }
  };

  const scheduleReport = () => {
    toast({
      title: "Agendamento de relatório",
      description: "Funcionalidade em desenvolvimento"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
                <p className="text-gray-600 mt-1">Gere, baixe e compartilhe relatórios detalhados</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={scheduleReport}>
                <Calendar className="h-4 w-4 mr-2" />
                Agendar
              </Button>
              <Button onClick={() => generateReport("Relatório Personalizado")}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Relatório
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Relatórios</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {reportsData.quickStats.totalReports}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Downloads este Mês</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {reportsData.quickStats.monthlyDownloads}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Download className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Relatórios Automáticos</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {reportsData.quickStats.automatedReports}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Compartilhados</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {reportsData.quickStats.sharedReports}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Share2 className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Generator */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Gerador de Relatórios</CardTitle>
              <CardDescription>Configure e gere relatórios personalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label htmlFor="period">Período</Label>
                  <select
                    id="period"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="7d">Últimos 7 dias</option>
                    <option value="30d">Últimos 30 dias</option>
                    <option value="90d">Últimos 90 dias</option>
                    <option value="1y">Último ano</option>
                    <option value="custom">Período personalizado</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="format">Formato</Label>
                  <select
                    id="format"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="csv">CSV</option>
                    <option value="powerpoint">PowerPoint (.pptx)</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button className="w-full" onClick={() => generateReport("Relatório Personalizado")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </div>

              {/* Report Types Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportsData.reportTypes.map((reportType, index) => {
                  const IconComponent = reportType.icon;
                  return (
                    <div 
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => generateReport(reportType.name)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${reportType.color}-100`}>
                          <IconComponent className={`h-5 w-5 text-${reportType.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{reportType.name}</h4>
                          <p className="text-sm text-gray-600">Clique para gerar</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Saved Reports */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Relatórios Salvos</CardTitle>
              <CardDescription>Histórico de relatórios gerados anteriormente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Nome</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Última Geração</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Downloads</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportsData.savedReports.map((report) => (
                      <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{report.name}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{report.type}</Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(report.lastGenerated).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={
                            report.status === 'ready' 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }>
                            {report.status === 'ready' ? 'Pronto' : 'Gerando...'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{report.downloads}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => downloadReport(report.id, report.name)}
                              disabled={report.status !== 'ready'}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => shareReport(report.id, report.name)}
                              disabled={report.status !== 'ready'}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}