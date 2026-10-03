'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface DetectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  color: string;
}

const labels = ['Person', 'Risk Zone', 'Swimmer', 'Alert'];
const colors = ['#22c55e', '#ef4444', '#3b82f6', '#f59e0b'];

export function CVDetectionDemo({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [detections, setDetections] = useState<DetectionBox[]>([]);
  const [frame, setFrame] = useState(0);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShouldReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const containerWidth = canvas.parentElement?.clientWidth || 400;
    const containerHeight = containerWidth * 0.5625;

    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    ctx.scale(dpr, dpr);

    const generateDetections = () => {
      const newDetections: DetectionBox[] = [];
      const count = Math.floor(Math.random() * 3) + 2;
      
      for (let i = 0; i < count; i++) {
        const w = Math.random() * 80 + 60;
        const h = Math.random() * 100 + 80;
        const x = Math.random() * (containerWidth - w - 20) + 10;
        const y = Math.random() * (containerHeight - h - 20) + 10;
        
        newDetections.push({
          x,
          y,
          width: w,
          height: h,
          label: labels[Math.floor(Math.random() * labels.length)],
          confidence: 0.75 + Math.random() * 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      
      return newDetections;
    };

    setDetections(generateDetections());

    if (shouldReduceMotion) return;

    let lastTime = 0;
    const animate = (time: number) => {
      if (!canvasRef.current) return;
      
      if (time - lastTime > 2000) {
        setDetections(generateDetections());
        lastTime = time;
        setFrame(f => f + 1);
      }

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, containerWidth, containerHeight);

      const gradient = ctx.createLinearGradient(0, 0, containerWidth, containerHeight);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1e1b4b');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, containerWidth, containerHeight);

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < containerWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, containerHeight);
        ctx.stroke();
      }
      for (let y = 0; y < containerHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(containerWidth, y);
        ctx.stroke();
      }

      detections.forEach(detection => {
        const pulse = Math.sin(time / 200) * 0.1 + 0.9;
        
        ctx.strokeStyle = detection.color;
        ctx.lineWidth = 2 * pulse;
        ctx.setLineDash([8, 4]);
        ctx.lineDashOffset = -time / 50;
        ctx.strokeRect(detection.x, detection.y, detection.width, detection.height);
        ctx.setLineDash([]);

        const cornerSize = 12;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(detection.x, detection.y + cornerSize);
        ctx.lineTo(detection.x, detection.y);
        ctx.lineTo(detection.x + cornerSize, detection.y);
        ctx.moveTo(detection.x + detection.width - cornerSize, detection.y);
        ctx.lineTo(detection.x + detection.width, detection.y);
        ctx.lineTo(detection.x + detection.width, detection.y + cornerSize);
        ctx.moveTo(detection.x, detection.y + detection.height - cornerSize);
        ctx.lineTo(detection.x, detection.y + detection.height);
        ctx.lineTo(detection.x + cornerSize, detection.y + detection.height);
        ctx.moveTo(detection.x + detection.width - cornerSize, detection.y + detection.height);
        ctx.lineTo(detection.x + detection.width, detection.y + detection.height);
        ctx.lineTo(detection.x + detection.width, detection.y + detection.height - cornerSize);
        ctx.strokeStyle = detection.color;
        ctx.stroke();

        const labelText = `${detection.label} ${(detection.confidence * 100).toFixed(0)}%`;
        ctx.font = '11px "JetBrains Mono", monospace';
        const textWidth = ctx.measureText(labelText).width;
        const padding = 6;
        
        ctx.fillStyle = detection.color;
        ctx.fillRect(detection.x, detection.y - 22, textWidth + padding * 2, 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(labelText, detection.x + padding, detection.y - 6);

        const barWidth = detection.width;
        const barHeight = 3;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(detection.x, detection.y + detection.height + 4, barWidth, barHeight);
        ctx.fillStyle = detection.color;
        ctx.fillRect(detection.x, detection.y + detection.height + 4, barWidth * detection.confidence, barHeight);
      });

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '600 12px Inter, system-ui';
      ctx.fillText('YOLO11 Detection \u2022 94% mAP', 16, 24);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '400 11px Inter, system-ui';
      ctx.fillText(`Frame: ${frame} \u2022 ${detections.length} detections`, 16, 42);

      ctx.fillStyle = '#22c55e';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText('\u25CF LIVE', containerWidth - 70, 24);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [shouldReduceMotion, detections, frame]);

  return (
    <div className={cn('relative rounded-xl overflow-hidden border border-border/50 bg-muted/30', className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        aria-label="Computer Vision detection visualization - illustrative only"
        data-prefers-reduced-motion={shouldReduceMotion ? 'true' : 'false'}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 mx-4">
          <p className="text-xs text-muted-foreground font-medium">
            Visualisation illustrative \u2014 Syst\u00e8me de d\u00e9tection YOLO11
          </p>
        </div>
      </div>
    </div>
  );
}

interface DetectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  color: string;
}

const labels = ['Person', 'Risk Zone', 'Swimmer', 'Alert'];
const colors = ['#22c55e', '#ef4444', '#3b82f6', '#f59e0b'];