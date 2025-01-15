import { Item } from "@/types/inventory";
import { QRCodeCanvas } from "qrcode.react";
import ReactDOMServer from "react-dom/server";

export const generateQRCodeDataURL = (item: Item): Promise<string> => {
  return new Promise((resolve) => {
    const qrCodeValue = `${window.location.origin}/${item.type === 'bobina' ? 'item' : 'scrap'}/${item.id}`;
    
    const qrCodeElement = ReactDOMServer.renderToStaticMarkup(
      <QRCodeCanvas
        value={qrCodeValue}
        size={100}
        level="H"
      />
    );
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 100;
      canvas.height = 100;
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    
    const svg = new Blob([qrCodeElement], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svg);
    img.src = url;
  });
};