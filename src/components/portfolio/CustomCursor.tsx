import { useEffect, useRef } from "react";
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  radius: number;
};
/** Gold reticle for a mouse. The system pointer is hidden only while this reticle is on screen. */
export default function CustomCursor({ enabled }: { enabled: boolean }) {
  const reticle = useRef<HTMLDivElement>(null),
    canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      const node = reticle.current,
        surface = canvas.current;
      if (!enabled || !media.matches || !node || !surface) return;
      const ctx = surface.getContext("2d");
      if (!ctx) return;
      let frame = 0,
        last = 0,
        x = 0,
        y = 0,
        tx = 0,
        ty = 0,
        visible = false,
        hot = false,
        lastEmber = 0;
      const showReticle = (on: boolean) => {
        visible = on;
        node.style.opacity = on ? "1" : "0";
        if (on) document.documentElement.dataset.reticle = "on";
        else delete document.documentElement.dataset.reticle;
      };
      let particles: Particle[] = [];
      const resize = () => {
        const dpr = Math.min(devicePixelRatio, 2);
        surface.width = innerWidth * dpr;
        surface.height = innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      const emit = (count: number, spark = false) => {
        for (let i = 0; i < count; i++) {
          const a = Math.random() * Math.PI * 2,
            s = spark ? 1.5 + Math.random() * 4 : 0.4;
          particles.push({
            x: tx,
            y: ty,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s - (spark ? 0 : 0.8),
            life: spark ? 32 : 22,
            max: spark ? 32 : 22,
            radius: spark ? 1.8 : 1,
          });
        }
        particles = particles.slice(-90);
      };
      const draw = (time: number) => {
        frame = 0;
        const dt = Math.min(2, (time - last) / 16.67 || 1);
        last = time;
        x += (tx - x) * Math.min(1, 0.24 * dt);
        y += (ty - y) * Math.min(1, 0.24 * dt);
        node.style.transform = `translate3d(${x - 18}px,${y - 18}px,0)`;
        node.dataset.hot = String(hot);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (const p of particles) {
          p.life -= dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          ctx.globalAlpha = Math.max(0, p.life / p.max);
          ctx.fillStyle = "#f3d484";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        particles = particles.filter((p) => p.life > 0);
        if (visible || particles.length) frame = requestAnimationFrame(draw);
      };
      const start = () => {
        if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") {
          showReticle(false);
          return;
        }
        tx = event.clientX;
        ty = event.clientY;
        if (!visible) {
          x = tx;
          y = ty;
        }
        showReticle(!document.querySelector("dialog[open]"));
        hot =
          event.target instanceof Element &&
          !!event.target.closest("a,button,summary,input");
        if (hot && visible && event.timeStamp - lastEmber > 45) {
          emit(1);
          lastEmber = event.timeStamp;
        }
        start();
      };
      const click = (event: MouseEvent) => {
        if (event instanceof PointerEvent && event.pointerType !== "mouse") {
          showReticle(false);
          return;
        }
        if (
          !media.matches ||
          !visible ||
          event.detail === 0 ||
          document.querySelector("dialog[open]")
        )
          return;
        tx = event.clientX;
        ty = event.clientY;
        emit(22, true);
        node.animate(
          [
            { scale: 1, opacity: 1 },
            { scale: 2.2, opacity: 0 },
            { scale: 1, opacity: 1 },
          ],
          { duration: 420, easing: "ease-out" },
        );
        start();
      };
      const leave = () => showReticle(false);
      const dialogToggle = (event: Event) => {
        if (event.target instanceof HTMLDialogElement) showReticle(false);
      };
      const visibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
          leave();
          particles = [];
          ctx.clearRect(0, 0, innerWidth, innerHeight);
        }
      };
      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", move);
      window.addEventListener("click", click);
      document.documentElement.addEventListener("pointerleave", leave);
      document.addEventListener("visibilitychange", visibility);
      document.addEventListener("toggle", dialogToggle, true);
      dispose = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("click", click);
        document.documentElement.removeEventListener("pointerleave", leave);
        document.removeEventListener("visibilitychange", visibility);
        document.removeEventListener("toggle", dialogToggle, true);
        delete document.documentElement.dataset.reticle;
        node.style.opacity = "0";
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        node.getAnimations().forEach((a) => a.cancel());
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      dispose();
      media.removeEventListener("change", setup);
    };
  }, [enabled]);
  return (
    <>
      <canvas ref={canvas} className="cursor-embers" aria-hidden="true" />
      <div ref={reticle} className="grace-cursor" aria-hidden="true">
        <svg viewBox="0 0 36 36" fill="none">
          <circle
            cx="18"
            cy="18"
            r="15"
            stroke="currentColor"
            strokeDasharray="9 5"
            opacity=".55"
          />
          <path
            d="M18 5v24m-5-18h10M18 5l-2 5h4zM12 27c-8-7 12-8 12-15M12 29h12"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
      </div>
    </>
  );
}
