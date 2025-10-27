import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles, Zap } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200" 
        : "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
    }`}>
      {/* Desktop Menu */}
      <div className="hidden md:flex h-20 px-6 justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
            scrolled 
              ? "bg-gradient-to-br from-purple-500 to-pink-500" 
              : "bg-white/20 backdrop-blur-sm"
          }`}>
            <Zap className={`w-7 h-7 ${scrolled ? "text-white" : "text-white"} group-hover:scale-110 transition-transform`} />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-bold transition-colors ${
              scrolled 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" 
                : "text-white"
            }`}>
              Dashtools
            </span>
            <span className={`text-xs font-medium ${
              scrolled ? "text-purple-600/60" : "text-white/80"
            }`}>
              Plataforma de Rastreamento
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-1">
          <Link
            href="/"
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              scrolled
                ? "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                : "text-white hover:bg-white/20"
            }`}
          >
            Apresentação
          </Link>
          <Link
            href="/pricing"
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              scrolled
                ? "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                : "text-white hover:bg-white/20"
            }`}
          >
            Preços
          </Link>
          <Link
            href="/integracoes"
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              scrolled
                ? "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                : "text-white hover:bg-white/20"
            }`}
          >
            Integrações
          </Link>
          <Link
            href="/admin"
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              scrolled
                ? "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                : "text-white hover:bg-white/20"
            }`}
          >
            Administrador
          </Link>
          <div className="ml-4 flex items-center space-x-3">
            <Link
              href="/login"
              className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all transform hover:scale-105 ${
                scrolled
                  ? "border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                  : "border-2 border-white text-white hover:bg-white/20"
              }`}
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all transform hover:scale-105 shadow-lg ${
                scrolled
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl"
                  : "bg-white text-purple-600 hover:shadow-xl"
              }`}
            >
              Testar grátis
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`flex md:hidden h-16 px-4 justify-between items-center ${
        scrolled ? "" : "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
      }`}>
        <Link href="/" className="flex items-center space-x-2">
          <div className={`relative flex items-center justify-center w-10 h-10 rounded-lg ${
            scrolled 
              ? "bg-gradient-to-br from-purple-500 to-pink-500" 
              : "bg-white/20 backdrop-blur-sm"
          }`}>
            <Zap className="w-6 h-6 text-white" />
            <Sparkles className="absolute -top-0.5 -right-0.5 w-3 h-3 text-yellow-300" />
          </div>
          <span className={`text-xl font-bold ${
            scrolled 
              ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" 
              : "text-white"
          }`}>
            Dashtools
          </span>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-2 rounded-lg transition-colors ${
            scrolled
              ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
          data-testid="button-mobile-menu"
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-500 text-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 flex justify-between items-center border-b border-white/20">
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-white">Dashtools</h2>
                <p className="text-xs text-white/80">Menu</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="p-6 flex flex-col space-y-2">
            <Link
              href="/"
              className="px-5 py-3 text-base font-semibold text-white rounded-xl hover:bg-white/20 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apresentação
            </Link>
            <Link
              href="/pricing"
              className="px-5 py-3 text-base font-semibold text-white rounded-xl hover:bg-white/20 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preços
            </Link>
            <Link
              href="/integracoes"
              className="px-5 py-3 text-base font-semibold text-white rounded-xl hover:bg-white/20 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Integrações
            </Link>
            <Link
              href="/admin"
              className="px-5 py-3 text-base font-semibold text-white rounded-xl hover:bg-white/20 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Administrador
            </Link>
            
            <div className="border-t border-white/20 my-4" />
            
            <Link
              href="/login"
              className="px-5 py-3 text-base font-bold border-2 border-white rounded-full hover:bg-white/20 transition-all text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="px-5 py-3 text-base font-bold bg-white text-purple-600 rounded-full hover:bg-white/90 transition-all text-center shadow-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testar grátis
            </Link>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm text-white/90 font-medium mb-1">🚀 Pronto para começar?</p>
              <p className="text-xs text-white/70">Teste gratuitamente sem cartão de crédito</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
