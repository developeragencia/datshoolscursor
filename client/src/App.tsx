import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { ThemeProvider } from "@/contexts/ThemeContext";
import MobilePWAWrapper from "@/components/mobile/MobilePWAWrapper";
// AntiDebug import removed for normal operation
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Pricing from "@/pages/pricing";
import Integrations from "@/pages/integrations";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import DashboardUTMify from "@/pages/dashboard-utmify";
import Campaigns from "@/pages/campaigns";
import CampanhasUTMify from "@/pages/campanhas";
import Sales from "@/pages/sales";
import Vendas from "@/pages/vendas";
import Resumo from "@/pages/resumo";
import Analise from "@/pages/analise";
import UtmLinks from "@/pages/utm-links";
import Pixels from "@/pages/pixels";
import ConfiguracoesPage from "@/pages/configuracoes";
import Webhooks from "@/pages/webhooks";
import RegrasAutomatizadas from "@/pages/regras-automatizadas";
import MetaAds from "@/pages/meta-ads";
import GoogleAds from "@/pages/google-ads";
import TiktokAds from "@/pages/tiktok-ads";
import FacebookAccounts from "@/pages/facebook-accounts";

import AdminPanel from "@/pages/admin";
import IndiqueGanhe from "@/pages/indique-ganhe";
import Retrospectivas from "@/pages/retrospectivas";
import Suporte from "@/pages/suporte";
import Despesas from "@/pages/despesas";
import Plano from "@/pages/plano";
import CheckoutPage from "@/pages/checkout";
import PixStatusPage from "@/pages/pix-status";
import Apis from "@/pages/apis";
import Conversoes from "@/pages/conversoes";
import Relatorios from "@/pages/relatorios";
import Funil from "@/pages/funil";
import Scripts from "@/pages/scripts";
import Atribuicao from "@/pages/atribuicao";
import WhatsApp from "@/pages/whatsapp";
import MultiplosDashboards from "@/pages/multiplos-dashboards";
import DashboardPage from "@/pages/dashboard";
import AjudaPage from "@/pages/ajuda";
import ContatoPage from "@/pages/contato";
import NovidadesPage from "@/pages/novidades";
import ClientDashboard from "@/pages/client-dashboard";
import PersonalizarDashboard from "@/pages/personalizar-dashboard";
import RefPage from "@/pages/ref";
import TestFacebook from "@/pages/test-facebook";
import MobileLogin from "@/pages/mobile-login";
import MobileLoginPWA from "@/pages/mobile-login-pwa";
import AguardandoPagamento from "@/pages/aguardando-pagamento";
import AdminTutorial from "@/pages/admin-tutorial";
// DomainRouter removed - using Home page directly for all domains
// Using existing pages for mobile routes



function Router() {
  const device = useDeviceDetection();
  
  // CONFIGURAÇÃO DOMÍNIO ESPECÍFICO REMOVIDA - site original restaurado
  // Para reativar página "Aguardando Pagamento" no alexdesenvolvedor.com.br:
  // Descomente as linhas abaixo:
  /*
  if (window.location.hostname === 'alexdesenvolvedor.com.br' || 
      window.location.hostname.includes('alexdesenvolvedor')) {
    return (
      <Switch>
        <Route path="*" component={AguardandoPagamento} />
      </Switch>
    );
  }
  */
  
  // If mobile device, render PWA mobile version using same pages as desktop
  if (device.isMobile) {
    return (
      <Switch>
        <Route path="/" component={() => <MobilePWAWrapper title="Bueiro Digital"><Home /></MobilePWAWrapper>} />
        <Route path="/precos" component={Pricing} />
        <Route path="/integracoes" component={() => <MobilePWAWrapper title="Integrações"><Integrations /></MobilePWAWrapper>} />
        <Route path="/login" component={MobileLoginPWA} />
        <Route path="/register" component={() => <MobilePWAWrapper title="Cadastro"><Register /></MobilePWAWrapper>} />
        <Route path="/dashboard" component={() => <MobilePWAWrapper title="Dashboard"><DashboardUTMify /></MobilePWAWrapper>} />
        <Route path="/dashboard-old" component={() => <MobilePWAWrapper title="Dashboard Old"><Dashboard /></MobilePWAWrapper>} />
        <Route path="/campanhas" component={() => <MobilePWAWrapper title="Campanhas"><CampanhasUTMify /></MobilePWAWrapper>} />
        <Route path="/vendas" component={() => <MobilePWAWrapper title="Vendas"><Vendas /></MobilePWAWrapper>} />
        <Route path="/resumo" component={() => <MobilePWAWrapper title="Resumo"><Resumo /></MobilePWAWrapper>} />
        <Route path="/analise" component={() => <MobilePWAWrapper title="Análise"><Analise /></MobilePWAWrapper>} />
        <Route path="/utm-links" component={() => <MobilePWAWrapper title="Links UTM"><UtmLinks /></MobilePWAWrapper>} />
        <Route path="/pixels" component={() => <MobilePWAWrapper title="Pixel Tracking"><Pixels /></MobilePWAWrapper>} />
        <Route path="/configuracoes" component={() => <MobilePWAWrapper title="Configurações"><ConfiguracoesPage /></MobilePWAWrapper>} />
        <Route path="/webhooks" component={() => <MobilePWAWrapper title="Webhooks"><Webhooks /></MobilePWAWrapper>} />
        <Route path="/regras-automatizadas" component={() => <MobilePWAWrapper title="Regras Automatizadas"><RegrasAutomatizadas /></MobilePWAWrapper>} />
        <Route path="/meta-ads" component={() => <MobilePWAWrapper title="Meta Ads"><MetaAds /></MobilePWAWrapper>} />
        <Route path="/google-ads" component={() => <MobilePWAWrapper title="Google Ads"><GoogleAds /></MobilePWAWrapper>} />
        <Route path="/tiktok-ads" component={() => <MobilePWAWrapper title="TikTok Ads"><TiktokAds /></MobilePWAWrapper>} />
        <Route path="/facebook-accounts" component={() => <MobilePWAWrapper title="Contas Facebook"><FacebookAccounts /></MobilePWAWrapper>} />
        <Route path="/indique-ganhe" component={() => <MobilePWAWrapper title="Indique & Ganhe"><IndiqueGanhe /></MobilePWAWrapper>} />
        <Route path="/retrospectivas" component={() => <MobilePWAWrapper title="Retrospectivas"><Retrospectivas /></MobilePWAWrapper>} />
        <Route path="/suporte" component={() => <MobilePWAWrapper title="Suporte"><Suporte /></MobilePWAWrapper>} />
        <Route path="/despesas" component={() => <MobilePWAWrapper title="Despesas"><Despesas /></MobilePWAWrapper>} />
        <Route path="/plano" component={() => <MobilePWAWrapper title="Plano"><Plano /></MobilePWAWrapper>} />
        <Route path="/planos" component={() => <MobilePWAWrapper title="Planos"><Plano /></MobilePWAWrapper>} />
        <Route path="/checkout" component={() => <MobilePWAWrapper title="Checkout"><CheckoutPage /></MobilePWAWrapper>} />
        <Route path="/pix-status" component={() => <MobilePWAWrapper title="Status PIX"><PixStatusPage /></MobilePWAWrapper>} />
        <Route path="/apis" component={() => <MobilePWAWrapper title="APIs"><Apis /></MobilePWAWrapper>} />
        <Route path="/conversoes" component={() => <MobilePWAWrapper title="Conversões"><Conversoes /></MobilePWAWrapper>} />
        <Route path="/relatorios" component={() => <MobilePWAWrapper title="Relatórios"><Relatorios /></MobilePWAWrapper>} />
        <Route path="/funil" component={() => <MobilePWAWrapper title="Funil de Vendas"><Funil /></MobilePWAWrapper>} />
        <Route path="/scripts" component={() => <MobilePWAWrapper title="Scripts"><Scripts /></MobilePWAWrapper>} />
        <Route path="/atribuicao" component={() => <MobilePWAWrapper title="Atribuição"><Atribuicao /></MobilePWAWrapper>} />
        <Route path="/whatsapp" component={() => <MobilePWAWrapper title="WhatsApp"><WhatsApp /></MobilePWAWrapper>} />
        <Route path="/multiplos-dashboards" component={() => <MobilePWAWrapper title="Múltiplos Dashboards"><MultiplosDashboards /></MobilePWAWrapper>} />
        <Route path="/personalizar-dashboard" component={() => <MobilePWAWrapper title="Personalizar Dashboard"><PersonalizarDashboard /></MobilePWAWrapper>} />
        <Route path="/ajuda" component={() => <MobilePWAWrapper title="Ajuda"><AjudaPage /></MobilePWAWrapper>} />
        <Route path="/contato" component={() => <MobilePWAWrapper title="Contato"><ContatoPage /></MobilePWAWrapper>} />
        <Route path="/novidades" component={() => <MobilePWAWrapper title="Novidades"><NovidadesPage /></MobilePWAWrapper>} />
        <Route path="/compartilhar" component={() => <MobilePWAWrapper title="Compartilhar Dashboard"><PersonalizarDashboard /></MobilePWAWrapper>} />
        <Route path="/usuarios" component={() => <MobilePWAWrapper title="Usuários"><AdminPanel /></MobilePWAWrapper>} />
        <Route path="/seguranca" component={() => <MobilePWAWrapper title="Segurança"><ConfiguracoesPage /></MobilePWAWrapper>} />
        <Route path="/notificacoes" component={() => <MobilePWAWrapper title="Notificações"><ConfiguracoesPage /></MobilePWAWrapper>} />

        <Route path="/admin" component={() => <MobilePWAWrapper title="Admin Panel"><AdminPanel /></MobilePWAWrapper>} />
        <Route path="/admin-tutorial" component={() => <MobilePWAWrapper title="Tutorial Admin"><AdminTutorial /></MobilePWAWrapper>} />
        <Route path="/client-dashboard/:userId" component={() => <MobilePWAWrapper title="Dashboard Cliente"><ClientDashboard /></MobilePWAWrapper>} />
        <Route path="/ref" component={() => <MobilePWAWrapper title="Referência"><RefPage /></MobilePWAWrapper>} />
        <Route component={() => <MobilePWAWrapper title="Página não encontrada"><NotFound /></MobilePWAWrapper>} />
      </Switch>
    );
  }
  
  // Desktop/tablet version
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/precos" component={Pricing} />
      <Route path="/integracoes" component={Integrations} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={DashboardUTMify} />
      <Route path="/dashboard-old" component={Dashboard} />
      <Route path="/campanhas" component={CampanhasUTMify} />
      <Route path="/campaigns-old" component={Campaigns} />
      <Route path="/vendas" component={Vendas} />
      <Route path="/sales-old" component={Sales} />
      <Route path="/resumo" component={Resumo} />
      <Route path="/analise" component={Analise} />
      <Route path="/utm-links" component={UtmLinks} />
      <Route path="/pixels" component={Pixels} />
      <Route path="/configuracoes" component={ConfiguracoesPage} />
      <Route path="/webhooks" component={Webhooks} />
      <Route path="/regras-automatizadas" component={RegrasAutomatizadas} />
      <Route path="/meta-ads" component={MetaAds} />
      <Route path="/google-ads" component={GoogleAds} />
      <Route path="/tiktok-ads" component={TiktokAds} />
      <Route path="/facebook-accounts" component={FacebookAccounts} />

      <Route path="/integracoes" component={Integrations} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/indique-ganhe" component={IndiqueGanhe} />
      <Route path="/retrospectivas" component={Retrospectivas} />
      <Route path="/suporte" component={Suporte} />
      <Route path="/despesas" component={Despesas} />
      <Route path="/plano" component={Plano} />
      <Route path="/planos" component={Plano} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/pix-status" component={PixStatusPage} />
      <Route path="/apis" component={Apis} />
      <Route path="/conversoes" component={Conversoes} />
      <Route path="/relatorios" component={Relatorios} />
      <Route path="/funil" component={Funil} />
      <Route path="/scripts" component={Scripts} />
      <Route path="/atribuicao" component={Atribuicao} />
      <Route path="/whatsapp" component={WhatsApp} />
      <Route path="/multiplos-dashboards" component={MultiplosDashboards} />
      <Route path="/dashboard/:id" component={DashboardPage} />
      <Route path="/ajuda" component={AjudaPage} />
      <Route path="/contato" component={ContatoPage} />
      <Route path="/novidades" component={NovidadesPage} />
      <Route path="/personalizar-dashboard" component={PersonalizarDashboard} />
      <Route path="/test-facebook" component={TestFacebook} />

      <Route path="/admin-tutorial" component={AdminTutorial} />
      <Route path="/ref/:code" component={RefPage} />
      <Route path="/cliente/:rest*" component={ClientDashboard} />
      <Route path="/cliente" component={ClientDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="bueiro-digital-theme">
        <TooltipProvider>
          {/* AntiDebug component removed for normal operation */}
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
