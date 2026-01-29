'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface CanvasPreviewProps {
  image: HTMLImageElement | null;
  topText: string;
  bottomText: string;
  fontSize: number;
  textColor: string;
}

export interface CanvasPreviewHandle {
  getCanvas: () => HTMLCanvasElement | null;
}

const CanvasPreview = forwardRef<CanvasPreviewHandle, CanvasPreviewProps>(
  ({ image, topText, bottomText, fontSize, textColor }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
    }));

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw image
    ctx.drawImage(image, 0, 0);

    // Draw text overlays
    const centerX = canvas.width / 2;
    const padding = 20;

    // Top text
    if (topText) {
      drawText(ctx, topText, centerX, padding, fontSize, textColor);
    }

    // Bottom text
    if (bottomText) {
      const bottomY = canvas.height - fontSize - padding;
      drawText(ctx, bottomText, centerX, bottomY, fontSize, textColor);
    }
  }, [image, topText, bottomText, fontSize, textColor]);

  function drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    fontSize: number,
    fillColor: string
  ) {
    if (!text) return;

    // Set font properties
    ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Set text styling - customizable fill color with black stroke
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.max(6, fontSize / 6);

    // Draw stroke (black border) first
    ctx.strokeText(text, x, y);

    // Draw fill (colored text) on top
    ctx.fillText(text, x, y);
  }

  if (!image) {
    return (
      <div className="flex items-center justify-center w-full min-h-[500px]">
        <div className="text-center py-12">
          <div className="text-8xl mb-6 opacity-50 animate-float">🖼️</div>
          <h3 className="text-2xl font-semibold text-text-primary mb-2">
            Ready to create?
          </h3>
          <p className="text-base text-text-muted">Upload an image to get started</p>
        </div>
      </div>
    );
  }

    return (
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-[80vh] rounded-xl shadow-xl bg-white block"
      />
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';

export default CanvasPreview;
