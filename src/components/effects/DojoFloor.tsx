import { useEffect, useRef, type FC } from 'react';

export const DojoFloor: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Tatami / Dojo Grid line parameters
    const gridSize = 64;

    // Dust & Ember Particles
    const PARTICLE_COUNT = isReducedMotion ? 15 : 35;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.5 + 0.2), // Slow drift upward
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(125, 146, 125,' : 'rgba(212, 175, 55,', // #7D927D or #D4AF37
    }));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
      renderFrame();
    };

    window.addEventListener('resize', handleResize);

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle Dojo tatami grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(125, 146, 125, 0.08)';

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw drifting ember/dust particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * 0.4})`;
        ctx.fill();

        if (!isReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
        }
      });

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
};

export default DojoFloor;
