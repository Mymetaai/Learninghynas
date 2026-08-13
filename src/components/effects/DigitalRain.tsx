import React, { useEffect, useRef } from 'react';

export interface DigitalRainProps {
  shuffleGlyphs?: string;
  headColor?: string;
  trailColor?: string;
  glyphSize?: number;
  trail?: number;
  speed?: number;
  className?: string;
}

export const DigitalRain: React.FC<DigitalRainProps> = ({
  shuffleGlyphs = 'Aprendecampesino',
  headColor = '#EBA301',
  trailColor = '#00FF19',
  glyphSize = 10,
  trail = 18,
  speed = 1.0,
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

    const glyphs = shuffleGlyphs.split('');
    const columns = Math.floor(width / glyphSize);
    const drops: number[] = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));

    const render = (_time: number) => {

      // Semi-transparent fade effect for digital trails
      ctx.fillStyle = 'rgba(15, 20, 28, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${glyphSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * glyphSize;
        const y = drops[i] * glyphSize;

        // Render Head Glyph
        ctx.fillStyle = headColor;
        ctx.shadowColor = headColor;
        ctx.shadowBlur = 8;
        ctx.fillText(char, x, y);

        // Render Trail Segment
        ctx.fillStyle = trailColor;
        ctx.shadowColor = trailColor;
        ctx.shadowBlur = 2;
        for (let t = 1; t <= trail; t++) {
          const trailY = y - t * glyphSize;
          if (trailY > 0) {
            const trailChar = glyphs[(i + t) % glyphs.length];
            ctx.globalAlpha = Math.max(0, 1 - t / trail);
            ctx.fillText(trailChar, x, trailY);
          }
        }
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // Reset drop position if off-screen
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += speed;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [shuffleGlyphs, headColor, trailColor, glyphSize, trail, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default DigitalRain;
