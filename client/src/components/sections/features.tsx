import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  backgroundColor?: string;
}

function FeatureSection({
  title,
  description,
  image,
  imageAlt,
  reverse = false,
  backgroundColor = "bg-white",
}: FeatureProps) {
  return (
    <section className={`py-20 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={reverse ? "lg:order-last" : ""}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <p
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <Link href="/register">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg font-semibold">
                Testar gratuitamente
              </Button>
            </Link>
          </div>
          <div className={reverse ? "lg:order-first" : ""}>
            <img
              src={image}
              alt={imageAlt}
              className="rounded-xl shadow-2xl w-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Features() {
  const features = [
    {
      title: "Dashboard inteligente",
      description:
        "Obtenha uma visão completa e intuitiva de todas as métricas da sua operação, com um dashboard minimalista e eficiente.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      imageAlt: "Dashboard Inteligente Bueiro Digital",
      backgroundColor: "bg-white",
    },
    {
      title: "Otimização rápida",
      description:
        "Saiba exatamente quantas vendas cada campanha teve e já faça as otimizações pelo próprio relatório, sem precisar abrir o Facebook.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      imageAlt: "Otimização Rápida de Campanhas",
      reverse: true,
      backgroundColor: "bg-gray-50",
    },
    {
      title: "Múltiplos Dashboards",
      description:
        "Utilize múltiplos dashboards para organizar as métricas da operação do <strong>seu jeito</strong>. Crie um dashboard para cada produto, fonte de tráfego ou campanha. A flexibilidade que você precisa para escalar seu negócio.",
      image:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      imageAlt: "Múltiplos Dashboards Bueiro Digital",
      backgroundColor: "bg-white",
    },
    {
      title: "Trackeamento para Google Ads",
      description:
        "Conecte suas campanhas do Google Ads com trackeamento inteligente. Monitore performance, ROAS e conversões em tempo real, com dados precisos que mostram exatamente qual campanha está gerando mais vendas para seu negócio.",
      image:
        "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      imageAlt: "Trackeamento Google Ads",
      reverse: true,
      backgroundColor: "bg-gray-50",
    },
    {
      title: "Integração com o Whatsapp",
      description:
        "Aumente suas conversões com um atendimento mais ágil e personalizado. Leve seus leads diretamente para onde a venda acontece.",
      image:
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      imageAlt: "Integração WhatsApp",
      backgroundColor: "bg-white",
    },
    {
      title: "Duplicação em outra CA",
      description:
        "Duplique campanhas lucrativas para outras contas de anúncio com apenas um clique. O que tomaria minutos (ou até horas) no Gerenciador de anúncios, no Bueiro Digital acontece em segundos.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      imageAlt: "Duplicação de Campanhas",
      reverse: true,
      backgroundColor: "bg-gray-50",
    },
    {
      title: "Regras automatizadas",
      description:
        "Pause campanhas com baixo ROAS, aumente o orçamento das que performam bem e otimize tudo sem precisar estar na frente do computador.",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      imageAlt: "Regras Automatizadas",
      backgroundColor: "bg-white",
    },
    {
      title: "Pixel com Atribuição Avançada",
      description:
        "Melhore a inteligência de suas campanhas através do nosso sistema de atribuição avançada, que alimenta o pixel das plataformas de anúncio com dados enriquecidos sobre o cliente.",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      imageAlt: "Pixel com Atribuição Avançada",
      reverse: true,
      backgroundColor: "bg-gray-50",
    },
    {
      title: "Suporte móvel",
      description:
        "Monitore e otimize suas campanhas aonde quer que você esteja, seja no <strong>computador</strong>, <strong>tablet</strong> ou <strong>celular</strong>.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      imageAlt: "Suporte Móvel Bueiro Digital",
      backgroundColor: "bg-white",
    },
    {
      title: "Segurança de ponta",
      description:
        "Seus dados estão protegidos com criptografia de ponta a ponta. Conecte suas contas publicitárias com total segurança e tranquilidade.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      imageAlt: "Segurança de Ponta",
      reverse: true,
      backgroundColor: "bg-gray-50",
    },
  ];

  return (
    <>
      {features.map((feature, index) => (
        <FeatureSection key={index} {...feature} />
      ))}
    </>
  );
}
