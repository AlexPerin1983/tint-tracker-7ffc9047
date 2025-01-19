import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, BarChart2, QrCode, Shield } from "lucide-react";

export default function Landing() {
  const handleBuyNow = () => {
    window.location.href = "https://buy.stripe.com/28oaGF8YAebQg4UaEG";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Stop Wasting Film!<br />Smart Inventory Control with Tint QR Tracker
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your inventory management and prevent waste with the best system for window film and automotive wraps
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-xl px-8 py-6 h-auto"
            onClick={handleBuyNow}
          >
            Buy Now - Only $49
          </Button>
        </div>

        {/* Video Demo Section */}
        <div className="mb-16">
          <div className="aspect-w-16 aspect-h-9 bg-card/50 backdrop-blur rounded-lg mb-8">
            <div className="flex items-center justify-center text-white">
              Video Demonstration Coming Soon
            </div>
          </div>
          <p className="text-center text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            With Tint QR Tracker, you&apos;ll have complete control over your rolls and remnants inventory. Save time and money by maximizing every material with QR Code tracking.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart2 className="w-6 h-6 text-primary" />
                Save Money
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Avoid material waste and maximize every piece
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle className="w-6 h-6 text-primary" />
                Stay Organized
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Manage your rolls and remnants professionally with categorization and usage history
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <QrCode className="w-6 h-6 text-primary" />
                Work Smarter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Scan QR Codes to quickly locate any material
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-6 h-6 text-primary" />
                Total Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Set minimum stock alerts and optimize your processes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Guarantee Section */}
        <div className="text-center mb-16 bg-white/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            100% Satisfaction Guaranteed
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            7-day money-back guarantee! Buy now and experience the transformation in your business.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border-muted">
              <CardHeader>
                <CardTitle className="text-white text-xl">Is Tint QR Tracker easy to use?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Yes! Our intuitive interface makes it easy to start tracking your inventory right away.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-muted">
              <CardHeader>
                <CardTitle className="text-white text-xl">Do I need special equipment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Just your smartphone! If you can scan a QR code, you&apos;re ready to go.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Stop losing money on wasted materials!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start saving and organizing your inventory with Tint QR Tracker today.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-xl px-8 py-6 h-auto"
            onClick={handleBuyNow}
          >
            Buy Now - Only $49
          </Button>
        </div>
      </div>
    </div>
  );
}