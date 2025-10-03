// src/components/QRCodeGenerator.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  title?: string;
  className?: string;
}

export default function QRCodeGenerator({ 
  value, 
  size = 200, 
  title = "QR Code",
  className = "" 
}: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 2,
          color: {
            dark: "#1a5fb4", // brand blue color
            light: "#ffffff",
          },
          errorCorrectionLevel: 'H', // High error correction to allow logo overlay
        },
        (error) => {
          if (error) {
            console.error("QR Code generation error:", error);
            return;
          }
          
          // Add logo in the center after QR code is generated
          addLogoToQR();
        }
      );
    }
  }, [value, size]);

  const addLogoToQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const logoSize = size * 0.25; // 25% of QR code size
    const centerX = size / 2;
    const centerY = size / 2;

    // Draw white background with rounded corners (square)
    const squareSize = logoSize + 10;
    const cornerRadius = 8;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(
      centerX - squareSize / 2,
      centerY - squareSize / 2,
      squareSize,
      squareSize,
      cornerRadius
    );
    ctx.fill();

    // Draw blue rounded square for the logo
    const innerSquareSize = logoSize;
    ctx.fillStyle = '#1a5fb4';
    ctx.beginPath();
    ctx.roundRect(
      centerX - innerSquareSize / 2,
      centerY - innerSquareSize / 2,
      innerSquareSize,
      innerSquareSize,
      6
    );
    ctx.fill();

    // Draw lightning bolt icon (same as navbar)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const boltScale = logoSize / 24; // Scale to fit in logo area
    const boltOffsetX = centerX;
    const boltOffsetY = centerY;
    
    // Lightning bolt path: M13 10V3L4 14h7v7l9-11h-7z
    ctx.beginPath();
    // Top part
    ctx.moveTo(boltOffsetX + 1 * boltScale, boltOffsetY - 4 * boltScale);
    ctx.lineTo(boltOffsetX + 1 * boltScale, boltOffsetY - 11 * boltScale);
    ctx.lineTo(boltOffsetX - 8 * boltScale, boltOffsetY + 2 * boltScale);
    ctx.lineTo(boltOffsetX - 1 * boltScale, boltOffsetY + 2 * boltScale);
    ctx.lineTo(boltOffsetX - 1 * boltScale, boltOffsetY + 9 * boltScale);
    ctx.lineTo(boltOffsetX + 8 * boltScale, boltOffsetY - 2 * boltScale);
    ctx.lineTo(boltOffsetX + 1 * boltScale, boltOffsetY - 2 * boltScale);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
  };

  const downloadQR = () => {
    if (!canvasRef.current) return;
    
    setIsDownloading(true);
    try {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${title.replace(/\s+/g, '_')}_QR.png`;
      link.href = url;
      link.click();
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
        <canvas ref={canvasRef} />
      </div>
      
      <button
        onClick={downloadQR}
        disabled={isDownloading}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {isDownloading ? "Downloading..." : "Download QR"}
      </button>
    </div>
  );
}
