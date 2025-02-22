
export function handleQRDownload(code: string, name: string) {
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
    name,
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

export function handleQRPrint(imageUrl: string, itemDetails: { name: string; code: string; dimensions: string; brand?: string; category?: string; price?: number; observation?: string }) {
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
              justify-content: flex-start;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
              font-family: system-ui, sans-serif;
              background: white;
              box-sizing: border-box;
            }
            .container {
              width: 100%;
              max-width: 600px;
              display: flex;
              gap: 2rem;
              align-items: flex-start;
            }
            .qr-section {
              flex: 0 0 auto;
              text-align: center;
            }
            .details-section {
              flex: 1;
              min-width: 0;
            }
            img {
              width: 200px;
              height: 200px;
              margin-bottom: 1rem;
              object-fit: contain;
            }
            .code {
              font-size: 1rem;
              color: #666;
              margin-bottom: 0.5rem;
            }
            .material-name {
              font-weight: bold;
              color: #000;
              font-size: 1.4rem;
              margin: 0 0 1.5rem;
            }
            .details-grid {
              display: grid;
              gap: 0.75rem;
              font-size: 0.9rem;
            }
            .detail-row {
              display: grid;
              grid-template-columns: 120px 1fr;
              gap: 1rem;
              align-items: baseline;
              padding: 0.5rem;
              background: #f8f9fa;
              border-radius: 4px;
            }
            .detail-label {
              color: #666;
              font-weight: 500;
            }
            .detail-value {
              color: #000;
              font-weight: 600;
            }
            @media print {
              .container {
                padding: 0;
              }
              .detail-row {
                background: #fff;
                border: 1px solid #eee;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="qr-section">
              <img src="${imageUrl}" alt="QR Code" />
              <div class="code">${itemDetails.code}</div>
            </div>
            <div class="details-section">
              <h1 class="material-name">${itemDetails.name}</h1>
              <div class="details-grid">
                ${itemDetails.brand ? `
                  <div class="detail-row">
                    <span class="detail-label">Marca:</span>
                    <span class="detail-value">${itemDetails.brand}</span>
                  </div>
                ` : ''}
                ${itemDetails.category ? `
                  <div class="detail-row">
                    <span class="detail-label">Categoria:</span>
                    <span class="detail-value">${itemDetails.category}</span>
                  </div>
                ` : ''}
                <div class="detail-row">
                  <span class="detail-label">Dimensões:</span>
                  <span class="detail-value">${itemDetails.dimensions}</span>
                </div>
                ${itemDetails.price ? `
                  <div class="detail-row">
                    <span class="detail-label">Preço por m²:</span>
                    <span class="detail-value">USD ${itemDetails.price.toFixed(2)}</span>
                  </div>
                ` : ''}
                ${itemDetails.observation ? `
                  <div class="detail-row">
                    <span class="detail-label">Localização:</span>
                    <span class="detail-value">${itemDetails.observation}</span>
                  </div>
                ` : ''}
              </div>
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
