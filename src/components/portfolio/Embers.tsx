import { useEffect, useRef } from "react";

export default function Embers({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !enabled) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let width = 0,
      height = 0,
      frame = 0,
      last = 0;
    let visible = true;
    const pointer = { x: -1000, y: -1000 };
    const particles = Array.from({ length: 34 }, (_, i) => ({
      x: ((i * 79 + 13) % 100) / 100,
      y: ((i * 43 + 7) % 100) / 100,
      speed: 0.012 + (i % 5) * 0.003,
      size: i % 3 === 0 ? 1.5 : 0.8,
    }));
    const resize = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    resize.observe(canvas);
    const draw = (time: number) => {
      const delta = last ? Math.min((time - last) / 1000, 0.04) : 0;
      last = time;
      context.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.y -= delta * p.speed;
        if (p.y < 0) p.y = 1;
        const x = p.x * width + Math.sin(time / 3200 + i) * 16,
          y = p.y * height;
        const dx = x - pointer.x,
          dy = y - pointer.y;
        const near = Math.max(0, 1 - Math.hypot(dx, dy) / 140);
        context.fillStyle = `rgba(243, 187, 104, ${0.18 + near * 0.5 + (i % 3) * 0.1})`;
        context.fillRect(
          x + dx * near * 0.25,
          y + dy * near * 0.25,
          p.size,
          p.size * 1.8,
        );
      });
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(canvas);
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", sync);
      context.clearRect(0, 0, width, height);
    };
  }, [enabled]);
  return <canvas ref={ref} className="embers" aria-hidden="true" />;
}
