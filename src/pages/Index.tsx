import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";

const Index = () => {
  const benefits = [
    {
      title: "Economia",
      description: "Evite perdas de materiais e aproveite ao máximo cada pedaço."
    },
    {
      title: "Organização",
      description: "Gerencie suas bobinas e retalhos de forma profissional com categorização e histórico de uso."
    },
    {
      title: "Praticidade",
      description: "Escaneie o QR Code para localizar qualquer material rapidamente."
    },
    {
      title: "Controle Total",
      description: "Defina alertas de estoque mínimo e otimize seus processos."
    }
  ];

  const faqs = [
    {
      question: "O Tint QR Tracker é fácil de usar?",
      answer: "Sim! O aplicativo foi desenvolvido pensando na facilidade de uso. Com uma interface intuitiva, você aprenderá a usar todas as funcionalidades rapidamente."
    },
    {
      question: "Preciso de algum equipamento especial para usar o aplicativo?",
      answer: "Não! Você só precisa de um smartphone com câmera para ler os QR Codes. O aplicativo funciona em qualquer dispositivo moderno."
    },
    {
      question: "Como receberei o aplicativo após a compra?",
      answer: "Após a compra, você receberá um email com as instruções de acesso e poderá começar a usar imediatamente."
    }
  ];

  const testimonials = [
    {
      name: "João Silva",
      role: "Proprietário de Loja de Insulfilm",
      text: "O Tint QR Tracker revolucionou a forma como gerencio meu estoque. Reduzi o desperdício em 40%!"
    },
    {
      name: "Maria Santos",
      role: "Gerente de Estoque",
      text: "Organização e praticidade em um só lugar. Não consigo imaginar trabalhar sem essa ferramenta agora."
    },
    {
      name: "Pedro Oliveira",
      role: "Instalador Profissional",
      text: "Localizar retalhos nunca foi tão fácil. Economizo muito tempo com o sistema de QR Code."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Chega de desperdício! Controle seu estoque de películas de forma inteligente com o <span className="text-blue-300">Tint QR Tracker</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Organização, economia e praticidade em um único aplicativo.
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-300">
            Transforme sua gestão de estoque e evite desperdícios com o melhor sistema para insulfilm e películas automotivas.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <iframe
              className="w-full h-[400px] rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/your-video-id"
              title="Tint QR Tracker Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Com o <span className="text-blue-400">Tint QR Tracker</span>, você terá controle total do estoque de suas bobinas e retalhos. Economize tempo e dinheiro, aproveitando ao máximo cada material com rastreamento via QR Code.
          </p>
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-xl py-6 px-8"
            onClick={() => window.location.href = 'https://buy.stripe.com/28oaGF8YAebQg4UaEG'}
          >
            Comprar Agora - Apenas $40
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Benefícios do Tint QR Tracker
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 bg-gray-700 border-gray-600">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            O que nossos clientes dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-gray-800 border-gray-700">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 px-4 bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Satisfação garantida ou seu dinheiro de volta em 7 dias!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Compre agora e experimente a transformação no seu negócio.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 bg-gray-800 border-gray-700">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Não perca mais tempo!
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Comece a economizar e organizar o seu estoque com o Tint QR Tracker agora mesmo.
          </p>
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-xl py-6 px-8"
            onClick={() => window.location.href = 'https://buy.stripe.com/28oaGF8YAebQg4UaEG'}
          >
            Comprar Agora - Apenas $40
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;