
import { useState } from "react";
import { ConsumptionDialog } from "../consumption/ConsumptionDialog";
import { QRCodeDialog } from "../qrcode/QRCodeDialog";
import { Button } from "@/components/ui/button";
import { Item } from "@/types/inventory";
import { QrCode, Ruler } from "lucide-react";

interface ActionButtonsProps {
  item: Item;
}

export function ActionButtons({ item }: ActionButtonsProps) {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showConsumption, setShowConsumption] = useState(false);

  return (
    <div className="space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowQRCode(true)}
        className="hover:bg-slate-800 hover:text-blue-400"
      >
        <QrCode className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowConsumption(true)}
        className="hover:bg-slate-800 hover:text-blue-400"
      >
        <Ruler className="w-5 h-5" />
      </Button>

      <QRCodeDialog 
        open={showQRCode} 
        onOpenChange={setShowQRCode} 
        item={item} 
      />

      <ConsumptionDialog 
        open={showConsumption} 
        onClose={() => setShowConsumption(false)} 
        item={item} 
      />
    </div>
  );
}
