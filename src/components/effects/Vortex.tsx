import React, { useEffect, useRef } from 'react';

export interface CometOptions {
  comets?: boolean;
  count?: number;
  color?: string;
  speed?: number;
}

export interface DotOptions {
  dots?: boolean;
  count?: number;
  color?: string;
  glow?: number;
}

export interface LineOptions {
  count?: number;
  color?: string;
  speed?: number;
}

export interface VortexProps {
  background?: string;
  bottomRadius?: number;
  topRadius?: number;
  waistRadius?: number;
  zoom?: number;
  speed?: number;
  direction?: 'right' | 'left';
  cometOptions?: CometOptions;
  dotOptions?: DotOptions;
  lineOptions?: LineOptions;
  className?: string;
}

export const Vortex: React.FC<VortexProps> = ({
  background = 'transparent',
  bottomRadius = 900,
  topRadius = 350,
  waistRadius = 60,
  zoom = 70,
  speed = 12,
  direction = 'right',
  cometOptions = { comets: true, count: 7, color: '#EBA301', speed: 8 },
  dotOptions = { dots: true, count: 200, color: '#FFFFFF', glow: 8 },
  lineOptions = { count: 6000, color: '#7D927D', speed: 9 },
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    // Particles for Tornado Spiral
    const particleCount = dotOptions.count || 200;
    const particles = Array.from({ length: particleCount }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: waistRadius + Math.random() * (topRadius - waistRadius),
      y: (Math.random() - 0.5) * height,
      speed: (0.01 + Math.random() * 0.02) * (speed / 10) * (direction === 'right' ? 1 : -1),
      size: 1 + Math.random() * 2.5,
    }));

    // Comets for Vortex Trails
    const cometCount = cometOptions.comets ? cometOptions.count || 7 : 0;
    const comets = Array.from({ length: cometCount }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: topRadius * 0.8,
      speed: (0.02 + Math.random() * 0.03) * ((cometOptions.speed || 8) / 10),
      length: 15 + Math.random() * 20,
    }));

    let time = 0;

    const render = () => {
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      if (background !== 'transparent') {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(zoom / 100, zoom / 100);

      // Render Vortex Funnel Spirals (Line Threads)
      const threadCount = Math.min(lineOptions.count || 600, 300);
      ctx.strokeStyle = lineOptions.color || '#7D927D';
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.35;

      for (let i = 0; i < threadCount; i++) {
        const t = (i / threadCount) * Math.PI * 2 + time * ((lineOptions.speed || 9) / 20);
        const r = waistRadius + Math.sin(t * 3) * (bottomRadius * 0.1);
        const x1 = Math.cos(t) * r;
        const y1 = Math.sin(t) * (r * 0.4);
        const x2 = Math.cos(t + 0.5) * (r * 1.4);
        const y2 = Math.sin(t + 0.5) * (r * 0.6);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Render Floating Vortex Particles (Dots)
      if (dotOptions.dots !== false) {
        ctx.fillStyle = dotOptions.color || '#FFFFFF';
        ctx.shadowColor = dotOptions.color || '#FFFFFF';
        ctx.shadowBlur = dotOptions.glow || 8;

        particles.forEach((p) => {
          p.angle += p.speed;
          const currentRadius = p.radius + Math.sin(time + p.angle) * 10;
          const px = Math.cos(p.angle) * currentRadius;
          const py = Math.sin(p.angle) * (currentRadius * 0.35) + p.y * 0.2;

          ctx.globalAlpha = Math.max(0.2, 0.8 - Math.abs(py) / height);
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Render Energy Comets
      if (cometOptions.comets) {
        ctx.fillStyle = cometOptions.color || '#EBA301';
        ctx.shadowColor = cometOptions.color || '#EBA301';
        ctx.shadowBlur = 12;

        comets.forEach((c) => {
          c.angle += c.speed;
          const cx = Math.cos(c.angle) * c.radius;
          const cy = Math.sin(c.angle) * (c.radius * 0.4);

          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    background,
    bottomRadius,
    topRadius,
    waistRadius,
    zoom,
    speed,
    direction,
    cometOptions,
    dotOptions,
    lineOptions,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default Vortex;
