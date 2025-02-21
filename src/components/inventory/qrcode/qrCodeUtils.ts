
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
    itemDetails.name,
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
            @media print {
              body {
                margin: 0;
                padding: 20px;
              }
              .container {
                page-break-inside: avoid;
              }
            }
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
              font-family: system-ui, sans-serif;
              background: white;
              box-sizing: border-box;
            }
            .container {
              width: 100%;
              max-width: 400px;
              text-align: center;
            }
            img {
              width: 200px;
              height: 200px;
              margin-bottom: 1rem;
              object-fit: contain;
            }
            .material-name {
              font-weight: bold;
              color: #000;
              font-size: 1.4rem;
              margin: 1rem 0;
            }
            .details {
              margin-top: 1rem;
              font-size: 0.9rem;
              color: #666;
            }
            @media (max-width: 480px) {
              .container {
                padding: 10px;
              }
              img {
                width: 150px;
                height: 150px;
              }
              .material-name {
                font-size: 1.2rem;
              }
              .details {
                font-size: 0.8rem;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${imageUrl}" alt="QR Code" />
            <div class="material-name">${itemDetails.name}</div>
            <div class="details">
              <div>Dimensões: ${itemDetails.dimensions}</div>
            </div>
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
