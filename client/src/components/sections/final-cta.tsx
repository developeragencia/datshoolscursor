import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Pronto para escalar com segurança?
        </h2>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Junte-se a milhares de infoprodutores que já estão escalando suas
          campanhas com precisão e aumentando seus lucros.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all"
            >
              Começar teste gratuito
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary-900 px-8 py-4 text-lg font-bold shadow-lg"
          >
            Falar com especialista
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white text-sm">
          <div className="flex items-center">
            <Check className="h-4 w-4 mr-1" />
            Teste gratuito por 7 dias
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 mr-1" />
            Sem necessidade de cartão
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 mr-1" />
            Suporte em português
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-900"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
