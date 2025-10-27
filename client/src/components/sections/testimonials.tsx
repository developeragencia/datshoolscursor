import { Quote, Instagram } from "lucide-react";

interface Testimonial {
  name: string;
  title: string;
  instagram: string;
  content: string;
  image: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Thales Lopes",
      title: "Mais de 10 milhões faturados",
      instagram: "@3thaless",
      content:
        "Curti muito a plataforma, consigo escalar com muito mais constância e ter <strong>100% de assertividade</strong> nas otimizações do dia a dia. Simples de configurar e extremamente útil, recomendo demais!",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    },
    {
      name: "Bruno Teixeira",
      title: "+ de 20M faturados",
      instagram: "@1brunoteixeira",
      content:
        "Muito satisfeito com a Utmify! Traqueando tudo perfeitamente e <strong>aumentou nosso lucro em 30%</strong>, agora sei quais campanhas dão mais lucro. Além disso, a configuração é fácil e rápida. Recomendo",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    },
    {
      name: "Kalebe",
      title: "7 dígitos em vendas online",
      instagram: "@kalebeart",
      content:
        "A Utmify foi fundamental para aumentar o meu lucro na escala, ela ajudou muito nas tomadas de decisão e principalmente na <strong>velocidade da minha otimização de campanhas</strong>. 100% aprovada!",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600">
            Depoimentos reais de quem já transformou seus resultados
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <div className="flex items-center mt-1">
                    <Instagram className="h-4 w-4 text-pink-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {testimonial.instagram}
                    </span>
                  </div>
                </div>
              </div>
              <Quote className="h-6 w-6 text-primary-600 mb-4" />
              <p
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: testimonial.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
