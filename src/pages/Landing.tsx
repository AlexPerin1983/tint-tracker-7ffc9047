import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, BarChart2, QrCode, Shield, DollarSign, Star } from "lucide-react";
import { useEffect } from "react";
import { sendConversionEvent } from "@/services/meta";

export default function Landing() {
  const handleBuyNow = () => {
    // Enviar evento InitiateCheckout quando usuário clica em comprar
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        value: 49,
        currency: 'USD'
      });
      sendConversionEvent('InitiateCheckout', 49);
    }
    
    const successUrl = encodeURIComponent("https://preview--tint-qr-tracker.lovable.app/?success=true");
    window.location.href = `https://buy.stripe.com/28o6qp6QsaZEaKA8wz?success_url=${successUrl}`;
  };

  // Rastrear interações com seções importantes
  useEffect(() => {
    const handleViewContent = (section: string) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && window.fbq) {
            window.fbq('track', 'ViewContent', {
              content_name: section,
              content_type: 'product_section'
            });
            sendConversionEvent('ViewContent');
            observer.disconnect(); // Rastrear apenas primeira visualização
          }
        });
      }, { threshold: 0.5 });

      const element = document.getElementById(section);
      if (element) observer.observe(element);

      return () => observer.disconnect();
    };

    // Observar seções importantes
    handleViewContent('benefits');
    handleViewContent('testimonials');
    handleViewContent('faq');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Waste into Profits!<br />Smart Inventory Control That Saves Up To 30% of Your Material
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Window Film, Paint Protection Film, and Wrap professionals: Transform your inventory management and prevent waste with Tint QR Tracker
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-xl px-8 py-6 h-auto"
              onClick={handleBuyNow}
            >
              <DollarSign className="w-6 h-6" />
              One-Time Payment - Only $49
            </Button>
            <span className="text-primary text-lg">No Monthly Fees Ever!</span>
          </div>
        </div>

        {/* Video Demo Section */}
        <div className="mb-16">
          <div className="aspect-w-16 aspect-h-9 bg-card/50 backdrop-blur rounded-lg mb-8">
            <div className="flex items-center justify-center text-white">
              Video Demonstration Coming Soon
            </div>
          </div>
          <p className="text-center text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Save thousands of dollars annually by efficiently managing your Window Film, PPF, and Wrap inventory with QR Code tracking.
          </p>
        </div>

        {/* Benefits Section */}
        <div id="benefits" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart2 className="w-6 h-6 text-primary" />
                Save 30% Monthly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Stop throwing away valuable material. Track and use every piece effectively
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle className="w-6 h-6 text-primary" />
                Professional Organization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Manage your Window Film, PPF, and Wrap inventory like a pro
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <QrCode className="w-6 h-6 text-primary" />
                Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Instantly locate any material with QR Code scanning
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-6 h-6 text-primary" />
                Complete Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Set minimum stock alerts and optimize your processes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Trusted by Professional Shops
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-muted">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                </div>
                <p className="text-gray-300 mb-4">
                  "We reduced our waste by 25% in the first month. This tool pays for itself!"
                </p>
                <p className="text-white font-semibold">John D.</p>
                <p className="text-sm text-gray-400">Premium Tint Solutions, CA</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-muted">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                </div>
                <p className="text-gray-300 mb-4">
                  "Finally, a simple way to track our PPF inventory. Great investment!"
                </p>
                <p className="text-white font-semibold">Mike R.</p>
                <p className="text-sm text-gray-400">Clear Shield Wraps, TX</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-muted">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                </div>
                <p className="text-gray-300 mb-4">
                  "Best tool for managing wrap inventory. No more wasted materials!"
                </p>
                <p className="text-white font-semibold">Sarah L.</p>
                <p className="text-sm text-gray-400">Elite Wraps, FL</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card/50 backdrop-blur rounded-lg border-muted px-4">
              <AccordionTrigger className="text-white">Is Tint QR Tracker easy to use?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Yes! Our intuitive interface makes it easy to start tracking your inventory right away. If you can scan a QR code with your phone, you're ready to go.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card/50 backdrop-blur rounded-lg border-muted px-4">
              <AccordionTrigger className="text-white">Do I need special equipment?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Just your smartphone! If you can scan a QR code, you're ready to start organizing your inventory professionally.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card/50 backdrop-blur rounded-lg border-muted px-4">
              <AccordionTrigger className="text-white">Is this a subscription service?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                No! Tint QR Tracker is a one-time purchase of $49. No monthly fees, no hidden costs. Buy once, use forever.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card/50 backdrop-blur rounded-lg border-muted px-4">
              <AccordionTrigger className="text-white">What happens after I purchase?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                You'll get immediate access to the web app. Start organizing your inventory right away and see the difference in your business.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Guarantee Section */}
        <div className="text-center mb-16 bg-white/5 rounded-lg p-4 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            30-Day Money-Back Guarantee
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Try Tint QR Tracker risk-free. If you're not completely satisfied, we'll refund your purchase - no questions asked!
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-base md:text-xl px-4 md:px-8 py-4 md:py-6 h-auto w-full md:w-auto mx-auto"
            onClick={handleBuyNow}
          >
            <DollarSign className="w-5 h-5 md:w-6 md:h-6" />
            One-Time Payment - Only $49
          </Button>
        </div>

        {/* Legal Disclaimer Section */}
        <div className="mt-16 p-6 bg-card/30 backdrop-blur rounded-lg border border-muted/20">
          <div className="max-w-4xl mx-auto space-y-4 text-sm text-gray-400">
            <h3 className="text-lg font-semibold text-white mb-4">Important Legal Notices</h3>
            
            <div className="space-y-4">
              <p>
                This website is not part of Meta (Facebook) Inc. Furthermore, this site is NOT endorsed by Meta in any way. 
                FACEBOOK is an independent trademark of Meta.
              </p>
              
              <p>
                <span className="text-white font-medium">Disclaimer:</span> The results mentioned are examples, and we do not guarantee that you will obtain the same results. 
                Success in any business depends on individual factors such as dedication, implementation, and experience.
              </p>
              
              <p>
                © 2024 Tint QR Tracker - All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
