import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Landing() {
  const handleBuyNow = () => {
    window.location.href = "https://buy.stripe.com/28oaGF8YAebQg4UaEG";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Stop Wasting Film! Smart Inventory Control with Tint QR Tracker
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Organization, savings, and convenience in one powerful app
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Transform your inventory management and prevent waste with the best system for window film and automotive wraps
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <div className="aspect-w-16 aspect-h-9 bg-black/20 rounded-lg mb-8">
            {/* Replace with actual video embed */}
            <div className="flex items-center justify-center text-white">
              Video Demonstration
            </div>
          </div>
          <p className="text-center text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            With Tint QR Tracker, you'll have complete control over your rolls and remnants inventory. Save time and money by maximizing every material with QR Code tracking.
          </p>
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-xl px-8 py-6 h-auto"
              onClick={handleBuyNow}
            >
              Buy Now - Only $49
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="text-white">Save Money</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Avoid material waste and maximize every piece
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="text-white">Stay Organized</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Manage your rolls and remnants professionally with categorization and usage history
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="text-white">Work Smarter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Scan QR Codes to quickly locate any material
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted">
            <CardHeader>
              <CardTitle className="text-white">Total Control</CardTitle>
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
                  Just your smartphone! If you can scan a QR code, you're ready to go.
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
            className="bg-green-500 hover:bg-green-600 text-xl px-8 py-6 h-auto"
            onClick={handleBuyNow}
          >
            Buy Now - Only $49
          </Button>
        </div>
      </div>
    </div>
  );
}