
export function handleQRDownload(code: string) {
  const qrCanvas = document.querySelector("#qr-code") as HTMLCanvasElement;
  if (!qrCanvas) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const qrSize = 200;
  const padding = 30;
  const textHeight = 40;

  canvas.width = qrSize + (padding * 2);
  canvas.height = qrSize + (padding * 2) + textHeight;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    qrCanvas,
    padding,
    padding,
    qrSize,
    qrSize
  );

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(
    code,
    canvas.width / 2,
    qrSize + padding + (textHeight / 2)
  );

  const downloadLink = document.createElement("a");
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.download = `${code}-qrcode.png`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export function handleQRPrint(imageUrl: string, itemDetails: { name: string; code: string; dimensions: string }) {
  const printWindow = window.open("", "", "width=800,height=600");
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>QR Code - ${itemDetails.name}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              font-family: system-ui, sans-serif;
              background: white;
            }
            img {
              max-width: 200px;
              margin-bottom: 1rem;
            }
            h2 {
              margin: 0;
              color: #333;
              font-size: 1.2rem;
            }
            .details {
              margin-top: 1rem;
              font-size: 0.9rem;
              color: #666;
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" alt="QR Code" />
          <h2>${itemDetails.code}</h2>
          <div class="details">
            <div>${itemDetails.name}</div>
            <div>${itemDetails.dimensions}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
}
