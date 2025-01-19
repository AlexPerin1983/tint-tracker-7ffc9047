import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sistema de Controle de Estoque
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Gerencie seu estoque de forma simples e eficiente
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Começar Agora
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="text-white">Controle Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Acompanhe entradas, saídas e movimentações do seu estoque em tempo real
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="text-white">QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Gere QR Codes para seus itens e facilite o controle de inventário
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="text-white">Relatórios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Visualize relatórios detalhados sobre seu estoque e tome decisões baseadas em dados
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Pronto para otimizar seu controle de estoque?
          </h2>
          <Link to="/login">
            <Button size="lg" variant="secondary">
              Experimente Grátis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}