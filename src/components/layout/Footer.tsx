import { useState } from "react";
import { Home, Camera, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { QRScanner } from "@/components/scanner/QRScanner";

export const Footer = () => {
  const isMobile = useIsMobile();
  const [showScanner, setShowScanner] = useState(false);

  if (!isMobile) {
    return null;
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted z-50 h-16">
        <div className="grid grid-cols-3 h-full">
          <Link 
            to="/" 
            className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <button 
            onClick={() => setShowScanner(true)}
            className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Camera className="h-5 w-5" />
            <span className="text-xs mt-1">Scanner</span>
          </button>

          <Link 
            to="/" 
            className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Package className="h-5 w-5" />
            <span className="text-xs mt-1">Inventory</span>
          </Link>
        </div>
      </nav>

      <QRScanner 
        open={showScanner} 
        onOpenChange={setShowScanner}
      />
    </>
  );
};