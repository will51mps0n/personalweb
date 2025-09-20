import { useEffect, useRef } from "react";

const glyphs = "abcdefghijklmnopqrstuvwxyz0123456789+=/*<>[]{}()$#&?!@%:;.,".split("");

const CodeNoisePanel = ({ project }) => {
  const noiseRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const ioRef = useRef(null);
  const stateRef = useRef({ columns: [], running: true, opts: null, ctx: null });

  useEffect(() => {
    const container = noiseRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.className = "code-noise__canvas";
    const ctx = canvas.getContext("2d");
    canvasRef.current = canvas;
    const state = stateRef.current;
    state.ctx = ctx;
    container.appendChild(canvas);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const opts = {
      fontSizeMin: 14,
      fontSizeMax: 22,
      columnGap: 2,
      speedMin: 40,
      speedMax: 120,
      fade: 0.08,
      density: 0.9,
      glyphs,
      color: "rgba(210, 238, 255, 0.9)",
      glow: true,
      prefersReduced,
    };
    state.opts = opts;
    state.running = !prefersReduced;

    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas.parentElement) return;
      const { clientWidth, clientHeight } = container;
      width = Math.floor(clientWidth * dpr);
      height = Math.floor(clientHeight * dpr);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      initColumns();
    };

    const rand = (a, b) => a + Math.random() * (b - a);

    const initColumns = () => {
      const columns = [];
      const stepBase = Math.round(rand(opts.fontSizeMin, opts.fontSizeMax) + opts.columnGap) * dpr;
      const count = Math.max(1, Math.ceil(width / stepBase));
      for (let i = 0; i < count; i += 1) {
        const fontPx = Math.round(rand(opts.fontSizeMin, opts.fontSizeMax)) * dpr;
        const speed = rand(opts.speedMin, opts.speedMax) * dpr / 60;
        columns.push({
          x: Math.round(i * stepBase),
          y: Math.round(rand(-height, 0)),
          fontPx,
          speed,
          active: Math.random() < opts.density,
        });
      }
      state.columns = columns;
    };

    const draw = () => {
      if (!state.running || !ctx) return;
      ctx.fillStyle = `rgba(0,0,0,${opts.fade})`;
      ctx.fillRect(0, 0, width, height);

      ctx.shadowColor = opts.color;
      ctx.shadowBlur = opts.glow ? 8 * dpr : 0;

      state.columns.forEach((col) => {
        if (!col.active) return;
        ctx.font = `${col.fontPx}px ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace`;
        ctx.textBaseline = "top";
        const glyph = opts.glyphs[(Math.random() * opts.glyphs.length) | 0];
        ctx.fillStyle = opts.color;
        ctx.fillText(glyph, col.x, col.y);
        col.y += col.speed;
        if (Math.random() < 0.03) col.y += col.speed * 2;
        if (col.y > height) {
          col.y = Math.round(rand(-height * 0.2, 0));
          col.active = Math.random() < opts.density;
        }
      });
    };

    const loop = () => {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !opts.prefersReduced) {
          state.running = true;
          if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(loop);
          }
        } else {
          state.running = false;
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        }
      });
    };

    const io = new IntersectionObserver(handleIntersection, { threshold: 0.05 });
    io.observe(container);
    ioRef.current = io;

    window.addEventListener("resize", resize, { passive: true });
    resize();
    if (state.running) {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener("resize", resize);
      if (ioRef.current) {
        ioRef.current.disconnect();
        ioRef.current = null;
      }
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
      state.columns = [];
      state.ctx = null;
    };
  }, []);

  const hasProjectDetails = Boolean(project && (project.summary?.length || project.stack?.length));

  return (
    <div className={`code-noise-panel ${hasProjectDetails ? "is-active" : ""}`}>
      <div className="code-noise-panel__noise" ref={noiseRef} aria-hidden="true" />
      <div className="code-noise-panel__overlay" />
      <article className="code-noise-panel__content">
        {project ? (
          <div className="code-noise-panel__inner">
            <p className="code-noise-panel__label">Focused Project</p>
            <h3 className="code-noise-panel__title">{project.title}</h3>
            {project.summary?.length ? (
              <ul className="code-noise-panel__bullets">
                {project.summary.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="code-noise-panel__placeholder">Hover projects to see highlights.</p>
            )}
            {project.stack?.length ? (
              <div className="code-noise-panel__stack">
                <p>Tech Stack</p>
                <ul>
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="code-noise-panel__inner">
            <p className="code-noise-panel__placeholder">Hover projects to see highlights.</p>
          </div>
        )}
      </article>
    </div>
  );
};

export default CodeNoisePanel;
