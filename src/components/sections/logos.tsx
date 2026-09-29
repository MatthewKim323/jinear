"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/*
 * Customer strip: seven invented wordmarks (neutral, no real brands) in the
 * measured logo boxes, then a mono caption. Desktop and down to 769px is a
 * space-between row; at 768px and below it becomes a 30s linear marquee with
 * every mark scaled to 0.75.
 */

type Mark = { w: number; h: number; art: ReactNode };

const T = { fill: "currentColor", fontFamily: "var(--font-regular)" } as const;

const MARKS: Mark[] = [
  {
    w: 82,
    h: 17,
    art: (
      <text x="0" y="14" fontSize="18" fontWeight={600} textLength="82" lengthAdjust="spacingAndGlyphs" {...T}>
        Halcyon
      </text>
    ),
  },
  {
    w: 90,
    h: 19,
    art: (
      <>
        <path d="M0 9.5 L8 1.5 L16 9.5 L8 17.5 Z" fill="currentColor" />
        <text x="20" y="16" fontSize="20" fontWeight={600} textLength="70" lengthAdjust="spacingAndGlyphs" {...T}>
          Tessel
        </text>
      </>
    ),
  },
  {
    w: 57,
    h: 40,
    art: (
      <>
        <circle cx="16" cy="16" r="13" fill="currentColor" />
        <circle cx="34" cy="13" r="13" fill="currentColor" />
        <circle cx="44" cy="24" r="12.5" fill="currentColor" />
        <circle cx="24" cy="27" r="13" fill="currentColor" />
        <circle cx="11" cy="25" r="10" fill="currentColor" />
        <text x="8.5" y="23.5" fontSize="10" fontWeight={510} textLength="40" lengthAdjust="spacingAndGlyphs" fill="#08090a" fontFamily="var(--font-regular)">
          aster
        </text>
      </>
    ),
  },
  {
    w: 70,
    h: 26,
    art: (
      <text x="1" y="19" fontSize="25" fontWeight={400} textLength="68" lengthAdjust="spacingAndGlyphs" {...T}>
        Quilly
      </text>
    ),
  },
  {
    w: 101,
    h: 24,
    art: (
      <>
        <path d="M10 1 L19 6 L19 18 L10 23 L1 18 L1 6 Z" fill="currentColor" />
        <path d="M10 12 L19 6 M10 12 L10 23 M10 12 L1 6" stroke="#08090a" strokeWidth="1.4" />
        <text x="25" y="19" fontSize="17" fontWeight={680} textLength="76" lengthAdjust="spacingAndGlyphs" letterSpacing="0.5" {...T}>
          PARALLAX
        </text>
      </>
    ),
  },
  {
    w: 101,
    h: 18,
    art: (
      <text x="0" y="15" fontSize="21" fontWeight={590} textLength="101" lengthAdjust="spacingAndGlyphs" {...T}>
        brightloom
      </text>
    ),
  },
  {
    w: 86,
    h: 23,
    art: (
      <>
        <text x="0" y="16" fontSize="22" fontWeight={510} textLength="58" lengthAdjust="spacingAndGlyphs" {...T}>
          sloop
        </text>
        <path d="M66 20 C74 19 80 13 84 3 C82 10 77 15 70 17 L86 17 C82 21 74 23 66 20 Z" fill="currentColor" />
      </>
    ),
  },
];

function Logo({ m, scale = 1 }: { m: Mark; scale?: number }) {
  return (
    <svg
      width={m.w * scale}
      height={m.h * scale}
      viewBox={`0 0 ${m.w} ${m.h}`}
      overflow="visible"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {m.art}
    </svg>
  );
}

const CSS = `
.lg-root { width: 100%; overflow-x: clip; padding: 112px var(--homepage-outer-padding) 96px; }
.lg-inner { max-width: var(--homepage-max-width); margin: 0 auto; }
.lg-link { position: relative; display: grid; align-items: center; height: 40px; color: #fff; text-decoration: none; }
.lg-list {
  display: flex; flex-direction: row; align-items: center; justify-content: space-between;
  width: 100%; height: 40px; margin: 0 0 0 -1px; padding: 0 var(--inset-padding); list-style: none;
  transition: filter 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.lg-link:hover .lg-list { filter: brightness(0.75); } /* TODO(spec): hover target value not captured, only the filter transition */
.lg-item { display: flex; align-items: center; justify-content: center; }
.lg-marquee { display: none; width: max-content; margin: 0 -24px; height: 30px; }
.lg-track { position: relative; display: flex; height: 30px; overflow: hidden; }
.lg-content { display: flex; flex-direction: row; align-items: center; gap: 40px; height: 30px; flex-shrink: 0; animation: lg-scroll 30s linear infinite; }
.lg-content.lg-abs { width: max-content; position: absolute; top: 0; left: 0; animation-name: lg-scroll-abs; }
.lg-mitem { display: flex; align-items: center; height: 28px; }
.lg-mitem.lg-tall { height: 30px; }
.lg-caption {
  margin: 36px 0 0 -1px; padding: 0 var(--inset-padding);
  font-family: var(--font-monospace); font-size: var(--text-micro-size); line-height: var(--text-micro-line-height);
  font-weight: 400; letter-spacing: normal; text-transform: uppercase; color: var(--color-text-quaternary);
}
@keyframes lg-scroll { from { transform: translateX(0); } to { transform: translateX(calc(-100% - 40px)); } }
@keyframes lg-scroll-abs { from { transform: translateX(calc(100% + 40px)); } to { transform: translateX(0); } }
@media (max-width: 1280px) {
  .lg-root { padding-top: 52px; padding-bottom: 64px; }
}
@media (max-width: 768px) {
  .lg-link { height: 30px; }
  .lg-list { display: none; }
  .lg-marquee { display: block; }
}
@media (max-width: 640px) {
  .lg-root { padding-top: 34px; padding-bottom: 48px; }
  .lg-caption { margin-left: -0.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .lg-content { animation: none; }
}
`;

// TODO(spec): no reveal spec for this block; guessed fade + 8px rise.
const reveal = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }, // TODO(spec)
};

export function Logos() {
  return (
    <section data-section="logos" className="lg-root">
      <style>{CSS}</style>
      <motion.div className="lg-inner" {...reveal}>
        <a href="/customers" className="lg-link" aria-label="Customers">
          <div className="lg-marquee">
            <div className="lg-track">
              {[false, true].map((abs) => (
                <div key={String(abs)} className={abs ? "lg-content lg-abs" : "lg-content"} aria-hidden={abs || undefined}>
                  {MARKS.map((m, i) => (
                    <div key={i} className={m.h > 28 ? "lg-mitem lg-tall" : "lg-mitem"}>
                      <Logo m={m} scale={0.75} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <ul className="lg-list">
            {MARKS.map((m, i) => (
              <li key={i} className="lg-item">
                <Logo m={m} />
              </li>
            ))}
          </ul>
        </a>
        <p className="lg-caption">Powering the companies building the future</p>
      </motion.div>
    </section>
  );
}
