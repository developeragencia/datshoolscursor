import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-primary-900 relative overflow-hidden particles">
      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white animate-slide-in">
          Chega de ter medo de escalar 🚀
        </h1>
        <p className="text-xl lg:text-2xl text-white mb-8 leading-relaxed animate-slide-in" style={{animationDelay: '0.2s'}}>
          Rastreie suas vendas de forma precisa e aumente seu lucro em até 40%
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in" style={{animationDelay: '0.4s'}}>
          <Link href="/register">
            <Button
              size="lg"
              className="btn-gradient text-white px-8 py-4 text-lg font-semibold hover-glow"
            >
              Testar gratuitamente
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary-900 px-8 py-4 text-lg font-bold hover-lift shadow-lg"
          >
            Falar com um especialista
          </Button>
        </div>

        {/* Hero Dashboard Image */}
        <div className="relative max-w-4xl mx-auto animate-float">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
            alt="Bueiro Digital Dashboard Interface"
            className="rounded-xl shadow-2xl w-full hover-lift"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent rounded-xl"></div>
        </div>
      </div>
      </div>
    </section>
  );
}
