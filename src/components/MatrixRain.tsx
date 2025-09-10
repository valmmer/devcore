'use client';
import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  calm?: boolean; // reconfigura quando alternar modo calmo
};

export default function MatrixRain({ className, calm }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const readVars = () => {
      const s = getComputedStyle(document.documentElement);
      const color = (s.getPropertyValue('--matrix-color') || '#55a8ff').trim();
      const fontSize =
        parseFloat(s.getPropertyValue('--matrix-font-size')) || 14;
      const speed = parseFloat(s.getPropertyValue('--matrix-speed')) || 1;
      const fade = parseFloat(s.getPropertyValue('--matrix-fade')) || 0.08;
      const opacity = parseFloat(s.getPropertyValue('--matrix-opacity')) || 0.3;
      return { color, fontSize, speed, fade, opacity };
    };

    let { color, fontSize, speed, fade } = readVars();

    let width = 0,
      height = 0,
      cols = 0;
    let drops: number[] = [];

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      const cssW = Math.max(1, rect?.width ?? canvas.clientWidth);
      const cssH = Math.max(1, rect?.height ?? 240);

      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      width = cssW;
      height = cssH;
      cols = Math.max(1, Math.floor(width / fontSize));
      drops = Array(cols).fill(0);
      ctx.font = `${fontSize}px monospace`;
    };

    const tick = () => {
      // “cauda”
      ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      for (let i = 0; i < cols; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const chars =
          'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const ch = chars[(Math.random() * chars.length) | 0];
        ctx.fillText(ch, x, y);

        drops[i] += speed;
        if (y > height && Math.random() > 0.975) drops[i] = 0;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    setup();
    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ({ color, fontSize, speed, fade } = readVars());
      setup();
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('resize', onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [calm]); // reconfigura quando alternar o modo

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`matrix-canvas ${className ?? ''}`}
    />
  );
}
