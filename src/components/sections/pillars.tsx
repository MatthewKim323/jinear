// Pillars: three benefit columns, each with a mono figure label, an isometric line
// illustration, a title and body copy. Desktop is a 3 column grid with hairline dividers;
// at <=1024 it becomes a full-bleed horizontal card rail. The keyline below the block
// hangs under the section (absolutely positioned) so the section height stays exact.

import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Isometric geometry helpers                                          */
/* ------------------------------------------------------------------ */

type V3 = [number, number, number];
type V2 = [number, number];

const COS30 = Math.cos(Math.PI / 6);

// World (x right-down, y left-down, z up) to screen, before fitting.
function proj([x, y, z]: V3): V2 {
  return [(x - y) * COS30, (x + y) * 0.5 - z];
}

type Box = { x0: number; x1: number; y0: number; y1: number; z0: number; z1: number };

// The three faces seen from this camera: top, the +x side and the +y side.
function boxFaces(b: Box): V3[][] {
  const { x0, x1, y0, y1, z0, z1 } = b;
  return [
    [
      [x0, y0, z1],
      [x1, y0, z1],
      [x1, y1, z1],
      [x0, y1, z1],
    ],
    [
      [x1, y0, z1],
      [x1, y1, z1],
      [x1, y1, z0],
      [x1, y0, z0],
    ],
    [
      [x0, y1, z1],
      [x1, y1, z1],
      [x1, y1, z0],
      [x0, y1, z0],
    ],
  ];
}

type Fit = { s: number; ox: number; oy: number };

// Scale and offset so every point sits centered inside w x h with a margin.
function fitTo(points: V3[], w: number, h: number, margin: number): Fit {
  const p = points.map(proj);
  const xs = p.map((q) => q[0]);
  const ys = p.map((q) => q[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const s = Math.min((w - margin * 2) / (maxX - minX), (h - margin * 2) / (maxY - minY));
  return {
    s,
    ox: (w - (maxX - minX) * s) / 2 - minX * s,
    oy: (h - (maxY - minY) * s) / 2 - minY * s,
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

function pt(v: V3, f: Fit): V2 {
  const [x, y] = proj(v);
  return [r2(x * f.s + f.ox), r2(y * f.s + f.oy)];
}

function poly(vs: V3[], f: Fit): string {
  return "M" + vs.map((v) => pt(v, f).join(" ")).join("L") + "Z";
}

function seg(a: V3, b: V3, f: Fit): string {
  return `M${pt(a, f).join(" ")}L${pt(b, f).join(" ")}`;
}

function corners(b: Box): V3[] {
  const out: V3[] = [];
  for (const x of [b.x0, b.x1]) for (const y of [b.y0, b.y1]) for (const z of [b.z0, b.z1]) out.push([x, y, z]);
  return out;
}

/* ------------------------------------------------------------------ */
/* Fig 0.1: stacked plates                                             */
/* ------------------------------------------------------------------ */

const PLATE = 60;
const LOWER = [0, 1, 2, 3, 4].map((i) => ({
  x0: -PLATE,
  x1: PLATE,
  y0: -PLATE,
  y1: PLATE,
  z0: i * 15,
  z1: i * 15 + 6,
}));
const TOP_PLATE: Box = { x0: -PLATE, x1: PLATE, y0: -PLATE, y1: PLATE, z0: 100, z1: 108 };

const plateFit = fitTo([...LOWER, TOP_PLATE].flatMap(corners), 265, 262, 7);

// Inset 3x3 tile grid on the lifted plate, plus corner guides down to the stack.
const TILE_PATHS: string[] = (() => {
  const out: string[] = [];
  const step = 30;
  const size = 22;
  for (let i = -1; i <= 1; i++)
    for (let j = -1; j <= 1; j++) {
      const cx = i * step;
      const cy = j * step;
      const z = TOP_PLATE.z1;
      out.push(
        poly(
          [
            [cx - size / 2, cy - size / 2, z],
            [cx + size / 2, cy - size / 2, z],
            [cx + size / 2, cy + size / 2, z],
            [cx - size / 2, cy + size / 2, z],
          ],
          plateFit,
        ),
      );
    }
  return out;
})();

const TOP_Z = LOWER[LOWER.length - 1].z1;
const GUIDE_PATHS = [
  seg([-PLATE, PLATE, TOP_PLATE.z0], [-PLATE, PLATE, TOP_Z], plateFit),
  seg([PLATE, PLATE, TOP_PLATE.z0], [PLATE, PLATE, TOP_Z], plateFit),
  seg([PLATE, -PLATE, TOP_PLATE.z0], [PLATE, -PLATE, TOP_Z], plateFit),
];

function Plates() {
  return (
    <svg className="pl-svg pl-svg-a" viewBox="0 0 265 262" fill="none" aria-hidden="true">
      {LOWER.map((b, i) => (
        <g key={i} className="pl-mv" style={{ "--pl-dy": `${(i - 4) * 3}px` } as CSSProperties}>
          {boxFaces(b).map((face, k) => (
            <path key={k} d={poly(face, plateFit)} className="pl-face" />
          ))}
        </g>
      ))}
      <g className="pl-mv" style={{ "--pl-dy": "-10px" } as CSSProperties}>
        {GUIDE_PATHS.map((d, i) => (
          <path key={i} d={d} className="pl-guide" />
        ))}
      </g>
      <g className="pl-mv" style={{ "--pl-dy": "-14px" } as CSSProperties}>
        {boxFaces(TOP_PLATE).map((face, k) => (
          <path key={k} d={poly(face, plateFit)} className="pl-face pl-face-hi" />
        ))}
        {TILE_PATHS.map((d, i) => (
          <path key={i} d={d} className={i === 4 ? "pl-tile pl-tile-on" : "pl-tile"} />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 0.2: clustered cubes with blinking dot grids                    */
/* ------------------------------------------------------------------ */

type Cube = Box & { dots?: boolean; dy: number };

const CUBES: Cube[] = [
  { x0: -84, x1: -8, y0: -84, y1: -8, z0: 0, z1: 96, dots: true, dy: -10 },
  { x0: 4, x1: 80, y0: -84, y1: -8, z0: 0, z1: 58, dy: -4 },
  { x0: 14, x1: 70, y0: -74, y1: -18, z0: 72, z1: 104, dy: -16 },
  { x0: -84, x1: -8, y0: 4, y1: 80, z0: 0, z1: 44, dy: -4 },
  { x0: 4, x1: 80, y0: 4, y1: 80, z0: 0, z1: 76, dots: true, dy: -8 },
].sort((a, b) => a.x0 + a.y0 - (b.x0 + b.y0) || a.z0 - b.z0);

const cubeFit = fitTo(CUBES.flatMap(corners), 304, 281, 8);

// 4x4 dots on a cube's top face; each dot gets its own phase in a 2.8s step loop.
function dotGrid(c: Cube): { cx: number; cy: number; delay: string }[] {
  const out: { cx: number; cy: number; delay: string }[] = [];
  const mx = (c.x0 + c.x1) / 2;
  const my = (c.y0 + c.y1) / 2;
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const [cx, cy] = pt([mx + (i - 1.5) * 4.5, my + (j - 1.5) * 4.5, c.z1], cubeFit);
      out.push({ cx, cy, delay: `${-((i * 7 + j * 3) % 8) * 0.35}s` });
    }
  return out;
}

function Cubes() {
  return (
    <svg className="pl-svg pl-svg-b" viewBox="0 0 304 281" fill="none" aria-hidden="true">
      {CUBES.map((c, i) => (
        <g key={i} className="pl-mv" style={{ "--pl-dy": `${c.dy}px` } as CSSProperties}>
          {boxFaces(c).map((face, k) => (
            <path key={k} d={poly(face, cubeFit)} className={k === 0 ? "pl-face pl-face-hi" : "pl-face"} />
          ))}
          {c.dots &&
            dotGrid(c).map((d, k) => (
              <circle
                key={k}
                cx={d.cx}
                cy={d.cy}
                r={0.9}
                className="pl-dot"
                style={{ animationDelay: d.delay }}
              />
            ))}
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 0.3: fanned panels                                              */
/* ------------------------------------------------------------------ */

const PANEL_N = 12;
const PANELS: (Box & { dx: number })[] = Array.from({ length: PANEL_N }, (_, i) => {
  const t = i / (PANEL_N - 1);
  const h = 14 + 150 * Math.pow(1 - t, 2.1);
  const x0 = -72 + i * 13;
  return { x0, x1: x0 + 4, y0: -46, y1: 46, z0: 0, z1: r2(h), dx: -(PANEL_N - 1 - i) * 1.2 };
});

const panelFit = fitTo(PANELS.flatMap(corners), 272, 267, 8);

function Panels() {
  return (
    <svg className="pl-svg pl-svg-c" viewBox="0 0 272 267" fill="none" aria-hidden="true">
      {PANELS.map((p, i) => (
        <g key={i} className="pl-mv pl-mv-x" style={{ "--pl-dx": `${r2(p.dx)}px` } as CSSProperties}>
          {boxFaces(p).map((face, k) => (
            <path key={k} d={poly(face, panelFit)} className={k === 2 ? "pl-face pl-face-hi" : "pl-face"} />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const ITEMS: { fig: string; art: ReactNode; title: string; body: string }[] = [
  {
    fig: "Fig 0.1",
    art: <Plates />,
    title: "Purpose-built",
    body: "Jinear is shaped by the practices and principles of world-class product teams.",
  },
  {
    fig: "Fig 0.2",
    art: <Cubes />,
    title: "Powered by agents",
    body: "Designed for workflows shared by humans and agents. From drafting PRDs to pushing PRs.",
  },
  {
    fig: "Fig 0.3",
    art: <Panels />,
    title: "Designed for speed",
    body: "Reduces noise and restores momentum to help teams ship with high velocity and focus.",
  },
];

// Hover easing and duration from the observed transitions (transform / stroke 0.7s).
const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

const css = `
.pl-root {
  position: relative;
  display: block;
  width: 100%;
  max-width: calc(1344px + 96px);
  margin: 0 auto;
  padding: 136px 48px 0;
  box-sizing: border-box;
  --pl-fill: #08090a;
  --pl-stroke: rgba(208, 214, 224, 0.34);
  --pl-stroke-hi: rgba(208, 214, 224, 0.62);
}
.pl-scroller { display: block; }
.pl-track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 0 32px;
}
.pl-track::before, .pl-track::after { content: none; }
.pl-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 468px;
  min-width: 0;
  box-sizing: border-box;
}
.pl-item:nth-child(1) { padding-right: 32px; border-right: 1px solid rgba(255, 255, 255, 0.08); }
.pl-item:nth-child(2) { padding: 0 32px; border-right: 1px solid rgba(255, 255, 255, 0.08); }
.pl-item:nth-child(3) { padding-left: 32px; }
.pl-fig {
  position: absolute;
  top: 0;
  left: 0;
  font-family: var(--font-monospace);
  font-size: 12px;
  line-height: 16.8px;
  font-weight: 400;
  letter-spacing: normal;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  opacity: 0.4;
}
.pl-item:nth-child(2) .pl-fig, .pl-item:nth-child(3) .pl-fig { left: 32px; }
.pl-ill {
  display: grid;
  align-items: center;
  justify-items: center;
  height: 388px;
  overflow: hidden;
}
.pl-svg { display: block; overflow: visible; }
.pl-svg-a { width: 265px; height: 262px; }
.pl-svg-b { width: 304px; height: 281px; }
.pl-svg-c { width: 272px; height: 267px; }
.pl-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pl-title {
  display: block;
  font-size: 15px;
  line-height: 24px;
  font-weight: var(--font-weight-medium);
  letter-spacing: -0.165px;
  color: var(--color-text-secondary);
}
.pl-body {
  margin: 0;
  max-width: 368px;
  text-wrap: balance;
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: -0.165px;
  color: var(--color-text-tertiary);
}
.pl-face {
  fill: var(--pl-fill);
  stroke: var(--pl-stroke);
  stroke-width: 1;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
  transition: stroke 0.7s ${EASE};
}
.pl-face-hi { stroke: var(--pl-stroke-hi); }
.pl-tile {
  fill: none;
  stroke: var(--pl-stroke);
  stroke-width: 1;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
  transition: stroke 0.7s ${EASE};
}
.pl-tile-on { fill: rgba(208, 214, 224, 0.08); }
.pl-guide {
  stroke: var(--pl-stroke);
  stroke-width: 1;
  stroke-dasharray: 2 3;
  vector-effect: non-scaling-stroke;
}
.pl-dot {
  fill: #d0d6e0;
  opacity: 0.2;
  animation: pl-blink 2.8s steps(1) infinite;
}
@keyframes pl-blink {
  0% { opacity: 0.2; }
  25% { opacity: 0.9; }
  50% { opacity: 0.45; }
  75% { opacity: 0.2; }
}
.pl-mv {
  transform: translate3d(0, 0, 0);
  transition: transform 0.7s ${EASE};
}
/* TODO(spec): hover offsets are guessed; duration and easing are observed. */
.pl-item:hover .pl-mv { transform: translate3d(0, var(--pl-dy, 0px), 0); }
.pl-item:hover .pl-mv-x { transform: translate3d(var(--pl-dx, 0px), calc(var(--pl-dx, 0px) * -0.577), 0); }
.pl-item:hover .pl-face, .pl-item:hover .pl-tile { stroke: var(--pl-stroke-hi); }
.pl-item:hover .pl-face-hi { stroke: rgba(208, 214, 224, 0.9); }
.pl-rule {
  position: absolute;
  left: calc(50% - 50vw);
  width: 100vw;
  top: calc(100% + 160px);
  height: 2px;
  pointer-events: none;
}
.pl-rule::before, .pl-rule::after {
  content: "";
  display: block;
  height: 1px;
}
.pl-rule::before { background: #000; }
.pl-rule::after { background: rgba(255, 255, 255, 0.08); }
@media (prefers-reduced-motion: reduce) {
  .pl-dot { animation: none; }
  .pl-mv { transition: none; }
}
@media (max-width: 1024px) {
  .pl-root { padding: 96px 28px 0; --pl-fill: #0f1011; }
  .pl-scroller {
    margin: 0 -28px;
    padding: 3px 0;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
  }
  .pl-scroller::-webkit-scrollbar { display: none; }
  .pl-track {
    grid-template-columns: auto auto auto auto auto;
    gap: 8px;
    padding: 0;
    width: max-content;
    min-width: 100%;
    box-sizing: border-box;
  }
  .pl-track::before, .pl-track::after { content: ""; display: block; width: 0; }
  .pl-item,
  .pl-item:nth-child(1),
  .pl-item:nth-child(2),
  .pl-item:nth-child(3) {
    width: 328px;
    height: 440px;
    padding: 0 24px 28px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    background: var(--color-bg-level-1);
    justify-self: start;
  }
  .pl-fig { display: none; }
  .pl-ill { width: 278px; height: 306px; overflow: visible; }
  .pl-svg-a { width: 230px; height: 227.4px; }
  .pl-svg-b { width: 260px; height: 240.3px; margin-top: 20px; }
  .pl-svg-c { width: 230px; height: 225.8px; margin-top: 20px; }
  .pl-body { max-width: 250px; text-wrap: wrap; }
  .pl-rule { top: calc(100% + 128px); }
}
@media (max-width: 640px) {
  .pl-root { padding: 64px 16px 0; }
  .pl-scroller { margin: 0 -16px; }
  .pl-rule { top: calc(100% + 80px); }
}
`;

export function Pillars() {
  return (
    <section data-section="pillars" className="pl-root">
      <style>{css}</style>
      <div className="pl-scroller">
        <div className="pl-track">
          {ITEMS.map((it) => (
            <div key={it.fig} className="pl-item">
              <span className="pl-fig">{it.fig}</span>
              <div className="pl-ill">{it.art}</div>
              <div className="pl-text">
                <span className="pl-title">{it.title}</span>
                <p className="pl-body">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pl-rule" aria-hidden="true" />
    </section>
  );
}
