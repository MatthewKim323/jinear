// Changelog strip: keyline, heading, a timeline row of dated entry cards, "View all" link.
// Four columns at desktop, two at <=1024 (entries 3 and 4 hidden), whole block hidden at <=640.
// Cards and the link brighten on hover (filter), nothing moves.

type Entry = { title: string; body: string; date: string };

const ENTRIES: Entry[] = [
  {
    title: "New controls for Jinear coding agent",
    body: "Coding sessions are the shortest path from issue to diff. Assign a task to Jinear Agent, and it works in a secure cloud environment to write and test the code before opening a pull request for review.",
    date: "Sep 24, 2026",
  },
  {
    title: "Loops for product management",
    body: "Loops are recurring agent workflows for teams. They now respond to more workspace activity, including changes to initiatives, projects, and cycles. They can also edit Jinear documents and post updates to your team chat.",
    date: "Sep 10, 2026",
  },
  {
    title: "Priority inbox",
    body: "An active workspace can create a significant amount of notifications each day, and until now your inbox treated them all the same. The new Priority tab separates what needs your attention from what can wait, so something like a review blocking a release never gets buried.",
    date: "Sep 3, 2026",
  },
  {
    title: "Coding sessions",
    body: "Jinear Agent can now set up, run, and test your code before returning its work. That means fewer handoffs and changes that are further along when they come back to you.",
    date: "Aug 19, 2026",
  },
];

const CSS = `
.cl-root { display: block; width: 100%; }
.cl-keyline { position: relative; width: 100%; height: 2px; }
.cl-keyline::before, .cl-keyline::after {
  content: ""; position: absolute; left: 0; right: 0; height: 1px;
}
.cl-keyline::before { top: 0; background: rgb(0, 0, 0); }
.cl-keyline::after { top: 1px; background: rgba(255, 255, 255, 0.08); }
.cl-body {
  width: min(var(--homepage-max-width, 1344px), calc(100% - 2 * var(--cl-outer)));
  margin: 160px auto 0;
  --cl-outer: 48px;
  --cl-inset: 32px;
}
.cl-head {
  display: flex; align-items: baseline; justify-content: space-between;
  margin-left: -2px; padding: 0 var(--cl-inset);
}
.cl-h2 {
  margin: 0; font-family: var(--font-regular);
  font-size: 48px; line-height: 48px; font-weight: 510; letter-spacing: -1.056px;
  color: var(--color-text-primary, #f7f8f8);
}
.cl-grid {
  position: relative; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 64px; margin-top: 72px; padding: 0 var(--cl-inset);
}
.cl-line {
  position: absolute; top: 16px; left: 50%;
  width: calc(100% - 2 * var(--cl-inset)); height: 1px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.08);
}
.cl-item { min-width: 0; }
.cl-ind {
  position: relative; width: 32px; height: 32px; margin-bottom: 48px;
  transform: translateX(-12px);
  background: var(--color-bg-primary, #08090a);
}
.cl-ind::before {
  content: ""; position: absolute; left: 6px; top: 6px; width: 20px; height: 20px;
  border-radius: 50%; background: #1a1b1e;
}
.cl-ind::after {
  content: ""; position: absolute; left: 13px; top: 13px; width: 6px; height: 6px;
  border-radius: 50%; background: var(--color-text-quaternary, #62666d);
}
.cl-ind[data-first="true"]::before { background: rgba(235, 87, 87, 0.1); }
.cl-ind[data-first="true"]::after { background: #eb5757; }
.cl-link {
  display: block; border-radius: 4px; text-decoration: none; color: inherit;
  transition: filter 0.1s ease;
}
.cl-link:hover { filter: brightness(1.4); }
.cl-col { display: flex; flex-direction: column; }
.cl-title {
  display: block; font-size: 15px; line-height: 24px; letter-spacing: -0.165px; font-weight: 510;
  color: var(--color-text-secondary, #d0d6e0);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.cl-text {
  margin-top: 8px; font-size: 15px; line-height: 24px; letter-spacing: -0.165px; font-weight: 400;
  color: var(--color-text-tertiary, #8a8f98);
  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2;
  overflow: hidden; overflow-wrap: anywhere; height: 48px;
}
.cl-date {
  display: block; margin-top: 20px; height: 16.8px;
  font-family: var(--font-monospace); font-size: 12px; line-height: 16.8px; letter-spacing: normal;
  text-transform: uppercase; color: var(--color-text-quaternary, #62666d);
}
.cl-foot { display: flex; align-items: flex-start; margin-top: 80px; margin-left: -2px; padding: 1px var(--cl-inset) 0; height: 25px; }
.cl-all {
  display: inline-flex; align-items: center; height: 24px; border-radius: 4px;
  text-decoration: none; font-size: 15px; line-height: 24px; letter-spacing: -0.165px;
  transition: filter 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.cl-all:hover { filter: brightness(1.4); }
.cl-all-label { color: var(--color-text-tertiary, #8a8f98); }
.cl-all-arrow { margin-left: 6px; color: var(--color-text-quaternary, #62666d); }

@media (max-width: 1024px) {
  .cl-body { --cl-outer: 28px; --cl-inset: 8px; }
  .cl-h2 { font-size: 40px; line-height: 44px; letter-spacing: -0.88px; }
  .cl-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cl-item:nth-child(n + 4) { display: none; } /* child 1 is the line */
}
@media (max-width: 640px) {
  .cl-root { display: none; }
}
`;

export function Changelog() {
  return (
    <section data-section="changelog" className="cl-root">
      <style>{CSS}</style>
      <div className="cl-keyline" aria-hidden="true" />
      <div className="cl-body">
        <div className="cl-head">
          <h2 className="cl-h2">Changelog</h2>
        </div>
        <div className="cl-grid">
          <div className="cl-line" aria-hidden="true" />
          {ENTRIES.map((e, i) => (
            <div className="cl-item" key={e.title}>
              <div className="cl-ind" data-first={i === 0 ? "true" : "false"} aria-hidden="true" />
              <a href="/changelog" className="cl-link">
                <div className="cl-col">
                  <span className="cl-title">{e.title}</span>
                  <span className="cl-text">{e.body}</span>
                  <span className="cl-date">{e.date}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="cl-foot">
          <a href="/changelog" className="cl-all">
            <span className="cl-all-label">View all</span>
            <span className="cl-all-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
