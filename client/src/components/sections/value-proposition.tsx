import { TrendingUp, Clock, Target } from "lucide-react";

export default function ValueProposition() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 mb-4">
            Não perca mais dinheiro com as campanhas erradas.
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Escale com precisão e veja seu lucro disparar!
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-emerald-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Não tenha medo de escalar
            </h3>
            <p className="text-gray-600">
              Saiba exatamente quantas vendas cada campanha teve e escale as
              campanhas certas sem medo de errar.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-primary-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Economize seu tempo
            </h3>
            <p className="text-gray-600">
              Escale ou desative suas campanhas direto pelo relatório, sem
              precisar perder tempo abrindo o Gerenciador do Facebook.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-yellow-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Para Tráfego Direto
            </h3>
            <p className="text-gray-600">
              Criada por infoprodutores, o Bueiro Digital é a solução perfeita para
              quem trabalha com tráfego direto e precisa escalar com precisão.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
