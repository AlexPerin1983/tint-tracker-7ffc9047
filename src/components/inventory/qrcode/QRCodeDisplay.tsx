
import { QRCodeCanvas } from "qrcode.react";
import { Item } from "@/types/inventory";

interface QRCodeDisplayProps {
  item: Item;
  qrValue: string;
}

export function QRCodeDisplay({ item, qrValue }: QRCodeDisplayProps) {
  return (
    <div className="p-6 bg-white rounded-xl">
      <QRCodeCanvas
        id="qr-code"
        value={qrValue}
        size={200}
        level="L"
        includeMargin={true}
        style={{ 
          width: '200px', 
          height: '200px',
        }}
        bgColor="#FFFFFF"
        fgColor="#000000"
      />
    </div>
  );
}
