'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  delay: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
  delay: number;
}

export function NeuralNetwork({ className, width, height }: { className?: string; width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  // @ts-expect-error - TypeScript false positive with useState generic
  const [nodes, setNodes] = useState<Node[]>([]);
  // @ts-expect-error - TypeScript false positive with useState generic
  const [connections, setConnections] = useState<Connection[]>([]);
  const [initialized, setInitialized] = useState(false);
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
    const containerWidth = width || canvas.parentElement?.clientWidth || 400;
    const containerHeight = height || containerWidth * 0.6;

    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    ctx.scale(dpr, dpr);

    const nodeCount = Math.min(25, Math.floor((containerWidth * containerHeight) / 8000));
    const newNodes: Node[] = [];
    const newConnections: Connection[] = [];

    for (let i = 0; i < nodeCount; i++) {
      newNodes.push({
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1.5,
        opacity: 0,
        delay: Math.random() * 2000,
      });
    }

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = newNodes[i].x - newNodes[j].x;
        const dy = newNodes[i].y - newNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && Math.random() < 0.3) {
          newConnections.push({
            from: i,
            to: j,
            opacity: 0,
            delay: Math.random() * 1500 + 500,
          });
        }
      }
    }

    setNodes(newNodes);
    setConnections(newConnections);
    setInitialized(true);
  }, [width, height]);

  useEffect(() => {
    if (!initialized || shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerWidth = width || canvas.parentElement?.clientWidth || 400;
    const containerHeight = height || containerWidth * 0.6;
    const startTime = Date.now();

    const animate = () => {
      if (!canvasRef.current) return;
      
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const elapsed = Date.now() - startTime;

      ctx.clearRect(0, 0, containerWidth, containerHeight);

      setNodes(prevNodes => {
        return prevNodes.map(node => {
          let newOpacity = node.opacity;
          if (elapsed > node.delay) {
            newOpacity = Math.min(1, node.opacity + 0.008);
          }

          let vx = node.vx;
          let vy = node.vy;
          let x = node.x + vx;
          let y = node.y + vy;

          if (x <= node.radius || x >= containerWidth - node.radius) {
            vx = -vx;
            x = Math.max(node.radius, Math.min(containerWidth - node.radius, x));
          }
          if (y <= node.radius || y >= containerHeight - node.radius) {
            vy = -vy;
            y = Math.max(node.radius, Math.min(containerHeight - node.radius, y));
          }

          return { ...node, x, y, vx, vy, opacity: newOpacity };
        });
      });

      setConnections(prevConnections => {
        return prevConnections.map(conn => {
          let newOpacity = conn.opacity;
          if (elapsed > conn.delay) {
            newOpacity = Math.min(0.4, conn.opacity + 0.005);
          }
          return { ...conn, opacity: newOpacity };
        });
      });

      setNodes(currentNodes => {
        currentNodes.forEach(node => {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2);
          gradient.addColorStop(0, `rgba(99, 102, 241, ${node.opacity})`);
          gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
          ctx.fill();
        });
        return currentNodes;
      });

      setConnections(currentConnections => {
        currentConnections.forEach(conn => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          if (fromNode && toNode && fromNode.opacity > 0.3 && toNode.opacity > 0.3) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${conn.opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.stroke();
          }
        });
        return currentConnections;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [initialized, shouldReduceMotion, width, height, nodes]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('w-full h-auto max-w-full', className)}
      aria-hidden="true"
      data-prefers-reduced-motion={shouldReduceMotion ? 'true' : 'false'}
    />
  );
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  delay: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
  delay: number;
}