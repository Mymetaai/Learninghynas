import React, { useEffect, useRef } from 'react';

export interface LightningProps {
  lightningColor?: string;
  backgroundColor?: string;
  intensity?: number; // 0 - 100
  speed?: number; // 1 - 100
  className?: string;
}

export const Lightning: React.FC<LightningProps> = ({
  lightningColor = '#593C0C',
  backgroundColor = '#0F141C',
  intensity = 69,
  speed = 55,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    interface Segment {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      alpha: number;
      width: number;
    }

    interface Bolt {
      segments: Segment[];
      life: number;
      maxLife: number;
    }

    let bolts: Bolt[] = [];
    let lastTime = performance.now();
    let spawnTimer = 0;

    const hexToRgb = (hex: string) => {
      const sanitized = hex.replace('#', '');
      const num = parseInt(sanitized, 16);
      if (isNaN(num)) return { r: 235, g: 163, b: 1 };
      if (sanitized.length === 3) {
        const r = parseInt(sanitized[0] + sanitized[0], 16);
        const g = parseInt(sanitized[1] + sanitized[1], 16);
        const b = parseInt(sanitized[2] + sanitized[2], 16);
        return { r, g, b };
      }
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    };

    const rgb = hexToRgb(lightningColor);

    const createLightningBolt = (): Bolt => {
      const startX = Math.random() * width;
      const startY = 0;
      const endY = height;

      const segments: Segment[] = [];
      let currX = startX;
      let currY = startY;

      const steps = Math.floor(10 + Math.random() * 15);
      const dy = (endY - startY) / steps;

      for (let i = 0; i < steps; i++) {
        const nextY = currY + dy;
        const nextX = currX + (Math.random() - 0.5) * 40 * (intensity / 50);

        segments.push({
          x1: currX,
          y1: currY,
          x2: nextX,
          y2: nextY,
          alpha: 1,
          width: Math.max(1, 4 * (1 - i / steps)),
        });

        // Branching chance
        if (Math.random() < 0.25) {
          const branchLength = 3 + Math.floor(Math.random() * 5);
          let branchX = nextX;
          let branchY = nextY;
          for (let b = 0; b < branchLength; b++) {
            const bNextX = branchX + (Math.random() - 0.3) * 30;
            const bNextY = branchY + dy * 0.6;
            segments.push({
              x1: branchX,
              y1: branchY,
              x2: bNextX,
              y2: bNextY,
              alpha: 0.7,
              width: Math.max(1, 2 * (1 - b / branchLength)),
            });
            branchX = bNextX;
            branchY = bNextY;
          }
        }

        currX = nextX;
        currY = nextY;
      }

      return {
        segments,
        life: 1.0,
        maxLife: 0.2 + Math.random() * 0.3,
      };
    };

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      spawnTimer += delta * (speed / 10);
      if (spawnTimer > 1.0) {
        spawnTimer = 0;
        if (Math.random() < intensity / 100) {
          bolts.push(createLightningBolt());
        }
      }

      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i];
        bolt.life -= delta / bolt.maxLife;

        if (bolt.life <= 0) {
          bolts.splice(i, 1);
          continue;
        }

        const alpha = Math.max(0, bolt.life);

        if (alpha > 0.7) {
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.08 * alpha})`;
          ctx.fillRect(0, 0, width, height);
        }

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        bolt.segments.forEach((seg) => {
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * seg.alpha * 0.6})`;
          ctx.lineWidth = seg.width * 3.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * seg.alpha * 0.9})`;
          ctx.lineWidth = seg.width;
          ctx.stroke();
        });

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [lightningColor, backgroundColor, intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default Lightning;
