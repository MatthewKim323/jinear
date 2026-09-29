// Manifesto: one large two-tone statement. First sentence bright, the rest dimmed.
// Static in the reference scroll capture (no reveal; the text is fully painted as it enters).

import { Inter } from "next/font/google";

// Large display text needs the optical size axis (display cut above ~32px). The shared
// font in layout.tsx only ships wght, which sets this headline noticeably wider.
const interOpsz = Inter({ subsets: ["latin"], axes: ["opsz"], variable: "--mf-font" });

const css = `
.mf-root {
  display: block;
  width: 100%;
  max-width: calc(1344px + 96px);
  margin: 0 auto;
  padding: 0 48px;
  box-sizing: border-box;
}
.mf-title {
  display: block;
  max-width: 1250px;
  margin: 0 0 0 -2px;
  padding: 0 32px;
  font-family: var(--mf-font), var(--font-regular);
  font-optical-sizing: auto;
  font-size: var(--title-6-size);
  line-height: var(--title-6-line-height);
  letter-spacing: var(--title-6-letter-spacing);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-tertiary);
  text-align: start;
}
.mf-lead {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}
@media (max-width: 1280px) {
  .mf-title {
    font-size: var(--title-5-size);
    line-height: var(--title-5-line-height);
    letter-spacing: var(--title-5-letter-spacing);
  }
}
@media (max-width: 1024px) {
  .mf-root { padding: 0 28px; }
  .mf-title { padding: 0 8px; }
}
@media (max-width: 768px) {
  .mf-title {
    font-size: var(--title-4-size);
    line-height: var(--title-4-line-height);
    letter-spacing: var(--title-4-letter-spacing);
  }
}
@media (max-width: 640px) {
  .mf-root { padding: 0 16px; }
  .mf-title {
    margin-left: -1px;
    font-size: var(--title-3-size);
    line-height: var(--title-3-line-height);
    letter-spacing: var(--title-3-letter-spacing);
  }
}
`;

export function Manifesto() {
  return (
    <section data-section="manifesto" className={`mf-root ${interOpsz.variable}`}>
      <style>{css}</style>
      <h2 className="mf-title">
        <strong className="mf-lead">A new species of product tool.</strong>{" "}
        Purpose-built for modern teams with AI workflows at its core, Jinear sets a new standard for
        planning and building products.
      </h2>
    </section>
  );
}
