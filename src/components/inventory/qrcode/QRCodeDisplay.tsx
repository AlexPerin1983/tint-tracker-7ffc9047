
import { QRCodeCanvas } from "qrcode.react";
import { Item } from "@/types/inventory";

interface QRCodeDisplayProps {
  item: Item;
  qrValue: string;
}

export function QRCodeDisplay({ item, qrValue }: QRCodeDisplayProps) {
  return (
    <div className="w-full p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      <QRCodeCanvas
        id="qr-code"
        value={qrValue}
        size={200}
        level="L"
        includeMargin={true}
        className="w-full h-auto max-w-[200px] mx-auto"
        style={{ 
          width: '100%',
          height: 'auto',
          maxWidth: '200px'
        }}
        bgColor="#FFFFFF"
        fgColor="#000000"
      />
    </div>
  );
}
