import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Shield, Timer, Zap } from "lucide-react";

const Landing = () => {
  const handleStartNow = () => {
    // Usa a URL atual como base para o redirecionamento
    const successUrl = `${window.location.origin}/app`;
    window.location.href = `https://buy.stripe.com/28oaGF8YAebQg4UaEG?success_url=${encodeURIComponent(successUrl)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          Track Your Film Inventory Like a Pro
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Stop wasting materials. Start maximizing profits with the smartest inventory system for Window Film, PPF, and Wrap installers.
        </p>
        <Button size="lg" className="text-lg px-8" onClick={handleStartNow}>
          Start Now - Only $49
          <ArrowRight className="ml-2" />
        </Button>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Top Installers Choose Our System
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-card/50 backdrop-blur border-primary/10">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Zap className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">QR Tracking</h3>
              <p className="text-muted-foreground">
                Instantly locate any material with a quick scan
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-primary/10">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Timer className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-muted-foreground">
                No more searching through piles of leftover materials
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-primary/10">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reduce Waste</h3>
              <p className="text-muted-foreground">
                Track and use every piece of material effectively
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-primary/10">
            <CardContent className="pt-6">
              <div className="mb-4">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
              <p className="text-muted-foreground">
                Professional inventory management made simple
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            See It In Action
          </h2>
          <div className="aspect-video rounded-lg overflow-hidden bg-card">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Product Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Installers Are Saying
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <p className="italic mb-4">
                "This system has completely transformed how we manage our film inventory. We're saving thousands in materials every month."
              </p>
              <p className="font-semibold">John D.</p>
              <p className="text-sm text-muted-foreground">Premium Tint Solutions</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <p className="italic mb-4">
                "The QR tracking feature is a game-changer. No more wasted time searching for the right piece of film."
              </p>
              <p className="font-semibold">Sarah M.</p>
              <p className="text-sm text-muted-foreground">Elite PPF Services</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <p className="italic mb-4">
                "Finally, a system that understands what installers need. Simple, fast, and incredibly effective."
              </p>
              <p className="font-semibold">Mike R.</p>
              <p className="text-sm text-muted-foreground">Wrap Masters</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join successful installers who are saving time and money with our inventory system.
            </p>
            <Button size="lg" className="text-lg px-8" onClick={handleStartNow}>
              Get Started Now - Only $49
              <ArrowRight className="ml-2" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              7-day money-back guarantee. No questions asked.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">How does it work?</h3>
              <p className="text-muted-foreground">
                Simply scan QR codes to track your materials. The system automatically manages your inventory, showing you what's available and where to find it.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Do I need special equipment?</h3>
              <p className="text-muted-foreground">
                No special equipment needed! Just your smartphone to scan QR codes and access the system.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Is there a monthly fee?</h3>
              <p className="text-muted-foreground">
                No monthly fees! Pay once and use forever. Only $49 for lifetime access.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;