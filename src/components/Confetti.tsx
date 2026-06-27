// Lightweight canvas confetti burst — no external dependency.
// Renders a fixed-position canvas, fires N particles, removes itself on done.
import { useEffect, useRef, type FC } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  rotation: number;
  vr: number;
  color: string;
  size: number;
  shape: number; // 0 = rect, 1 = circle
  life: number;
}

const COLORS = [
  '#C15032', // terracotta
  '#F4A300', // marigold
  '#1C5C5C', // teal-deep
  '#5BA199', // teal-light
  '#E94F37', // red
  '#F2C14E', // yellow
  '#3A6EA5', // blue
  '#8E44AD', // purple
];

interface ConfettiProps {
  /** Fire the burst when this prop changes / becomes true. */
  fire: boolean;
  /** Particle count. */
  count?: number;
  /** Duration in ms before the canvas is removed. */
  duration?: number;
  /** Called once the burst finishes. */
  onDone?: () => void;
}

const Confetti: FC<ConfettiProps> = ({
  fire,
  count = 140,
  duration = 2600,
  onDone,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!fire) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    const W = window.innerWidth;
    const H = window.innerHeight;

    // Spawn particles from two corners + center top for a full burst
    const origins = [
      { x: W * 0.5, y: H * 0.3 },
      { x: W * 0.2, y: H * 0.5 },
      { x: W * 0.8, y: H * 0.5 },
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const origin = origins[i % origins.length];
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 9;
      particles.push({
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        gravity: 0.18 + Math.random() * 0.12,
        rotation: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        shape: Math.random() > 0.5 ? 0 : 1,
        life: 1,
      });
    }

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, W, H);
      let alive = 0;
      for (const p of particles) {
        if (p.life <= 0) continue;
        alive++;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        p.life = Math.max(0, 1 - elapsed / duration);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.min(1, p.life * 1.4);
        ctx.fillStyle = p.color;
        if (p.shape === 0) {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (alive > 0 && elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        ctx.clearRect(0, 0, W, H);
        onDone?.();
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [fire, count, duration, onDone]);

  if (!fire) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100]"
      aria-hidden="true"
    />
  );
};

export default Confetti;
