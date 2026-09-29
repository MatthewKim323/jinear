// Customers: quote cards plus a one-line proof footer.
// Desktop (>1024): two wide cards in a faded frame, footer line with "Customer stories" link.
// <=1024: a horizontal scroll row of three 320x360 cards (no footer).
// Cards and the link brighten on hover (filter, 0.16s ease-out-quad); no scroll reveal.

type Mark = "vessel" | "arcway" | "keystone";

type Story = {
  slug: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  mark: Mark;
  background: string;
  quoteOpacity: number;
};

const STORIES: Story[] = [
  {
    slug: "vessel",
    quote:
      "You’ll probably build a better product, just because of the craft that using Jinear infuses on your brain.",
    name: "Maya Okafor",
    role: "Staff Software Engineer",
    company: "Vessel",
    mark: "vessel",
    background:
      "linear-gradient(0deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%), linear-gradient(180deg, #b2d5ff 0%, #dfd1ff 100%)",
    quoteOpacity: 1,
  },
  {
    slug: "arcway",
    quote: "Our speed is intense and Jinear helps us be action biased.",
    name: "Theo Lindqvist",
    role: "Head of Engineering",
    company: "Arcway",
    mark: "arcway",
    background: "#e4f222",
    quoteOpacity: 0.9,
  },
  {
    slug: "keystone",
    quote: "Jinear is excellent, just excellent. It has the right opinions for fast moving teams.",
    name: "Priya Raman",
    role: "President",
    company: "Keystone",
    mark: "keystone",
    background: "#1c85e8",
    quoteOpacity: 1,
  },
];

// Invented neutral company glyphs, drawn in a 56x56 box like the other marks on the page.
const MARK_PATHS: Record<Mark, string> = {
  vessel:
    "M28 11 42.72 19.5v17L28 45 13.28 36.5v-17L28 11Zm0 6.5-9.1 5.25v10.5L28 38.5l9.1-5.25v-10.5L28 17.5ZM28 24a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
  arcway: "M13 44a31 31 0 0 0 31-31h-6.5A24.5 24.5 0 0 1 13 37.5V44Zm17 0h14V30a14 14 0 0 1-14 14Z",
  keystone: "M16 13h24l-5 22H21l-5-22Zm-2 26h28v5H14v-5Z",
};

function Glyph({ mark, className }: { mark: Mark; className?: string }) {
  return (
    <svg
      className={className}
      width="64"
      height="64"
      viewBox="0 0 56 56"
      role="img"
      focusable="false"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={MARK_PATHS[mark]} />
    </svg>
  );
}

const EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

const CSS = `
.cu-root { display: block; width: 100%; padding-top: 160px; }

/* ---------- desktop ---------- */
.cu-desk {
  width: min(var(--homepage-max-width, 1344px), calc(100% - 96px));
  margin: 0 auto;
}
.cu-cards {
  position: relative; display: grid; grid-template-columns: 880fr 432fr; gap: 8px; padding: 12px 12px 0;
}
.cu-frame {
  position: absolute; inset: -1px; pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.11); border-radius: 20px;
  -webkit-mask-image: linear-gradient(143.6deg, #000 0, transparent 451px);
  mask-image: linear-gradient(143.6deg, #000 0, transparent 451px);
}
.cu-card {
  position: relative; display: flex; flex-direction: column; box-sizing: border-box;
  height: 480px; padding: 24px 32px; border-radius: 8px; overflow: hidden;
  text-decoration: none; color: inherit;
  transition: filter 0.16s ${EASE};
}
.cu-card:hover { filter: brightness(1.04); } /* TODO(spec): hover brightness value not captured */
.cu-card { min-width: 0; }
.cu-q {
  position: relative; z-index: 1; margin: 0; width: fit-content; max-width: 549.5px;
  font-size: 32px; line-height: 36px; font-weight: 400; letter-spacing: -0.704px;
  color: #08090a; text-wrap: balance;
}
.cu-q::before, .cu-mq::before { content: "\\201C"; position: absolute; transform: translateX(-100%); }
.cu-q::after, .cu-mq::after { content: "\\201D"; }
.cu-deco {
  position: absolute; right: 0; bottom: 0; width: 480px; height: 480px;
  opacity: 0.2; transform: translate(192px, -240px); pointer-events: none;
}
.cu-deco svg { display: block; width: 100%; height: 100%; transform: scale(2.5); fill: #fff; }
.cu-author { position: relative; z-index: 1; display: flex; align-items: center; margin-top: auto; }
.cu-logo { display: flex; margin: -16px; }
.cu-logo svg { display: block; fill: var(--color-bg-primary, #08090a); }
.cu-info {
  display: flex; flex-direction: column; margin-left: 18px; padding-left: 18px;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}
.cu-name, .cu-role {
  font-size: 14px; line-height: 21px; letter-spacing: -0.182px; color: #08090a; white-space: nowrap;
}
.cu-name { font-weight: 510; }
.cu-role { font-weight: 400; opacity: 0.6; }
.cu-foot {
  display: flex; align-items: baseline; justify-content: space-between;
  margin-top: 48px; padding: 0 32px;
}
.cu-foot-p {
  margin: 0; font-size: 15px; line-height: 24px; letter-spacing: -0.165px;
  color: var(--color-text-tertiary, #8a8f98);
}
.cu-foot-p strong { font-weight: 510; color: var(--color-text-secondary, #d0d6e0); }
.cu-link {
  display: block; border-radius: 4px; text-decoration: none;
  transition: filter 0.16s ${EASE};
}
.cu-link:hover { filter: brightness(1.4); } /* TODO(spec): hover brightness value not captured */
.cu-link-row { display: flex; align-items: center; }
.cu-link-label {
  display: inline-block; font-size: 15px; line-height: 24px; letter-spacing: -0.165px;
  color: var(--color-text-tertiary, #8a8f98);
}
.cu-link-arrow {
  display: inline-block; width: 14.13px; margin-left: 6px; font-size: 15px; line-height: 24px; letter-spacing: -0.165px;
  color: var(--color-text-quaternary, #62666d);
}

/* ---------- carousel (<=1024) ---------- */
.cu-rail { display: none; position: relative; overflow: hidden; }
.cu-scroll {
  padding: 3px 0; overflow-x: scroll; overflow-y: hidden;
  scrollbar-width: none; -ms-overflow-style: none;
}
.cu-scroll::-webkit-scrollbar { display: none; }
.cu-row {
  display: grid; grid-template-columns: auto auto auto auto auto; gap: 8px;
  width: max-content; min-width: 100%;
}
.cu-row > a:first-child { grid-column: 2; }
.cu-mlink { display: block; text-decoration: none; color: inherit; transition: filter 0.16s ${EASE}; }
.cu-mlink:hover { filter: brightness(1.04); } /* TODO(spec): hover brightness value not captured */
.cu-mcard {
  box-sizing: border-box; width: 320px; height: 360px;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 20px 60px 28px 28px; border-radius: 6px;
}
.cu-mq {
  position: relative; margin: 0;
  font-size: 24px; line-height: 31.92px; font-weight: 400; letter-spacing: -0.288px;
  color: #08090a; text-wrap: pretty;
}
.cu-mauthor { display: flex; align-items: center; }
.cu-mauthor .cu-info { margin-left: 16px; padding-left: 16px; }

@media (max-width: 1024px) {
  .cu-desk { display: none; }
  .cu-rail { display: block; }
}
@media (max-width: 640px) {
  .cu-root { padding-top: 40px; }
}
`;

export function Customers() {
  const [primary, secondary] = STORIES;
  return (
    <section data-section="customers" id="customers" className="cu-root">
      <style>{CSS}</style>

      <div className="cu-desk">
        <div className="cu-cards">
          <span className="cu-frame" aria-hidden="true" />
          {[primary, secondary].map((s, i) => (
            <a
              key={s.slug}
              href={`/customers/${s.slug}`}
              className="cu-card"
              style={{ background: s.background }}
            >
              <p className="cu-q" style={{ opacity: s.quoteOpacity }}>
                {s.quote}
              </p>
              {i === 0 && (
                <div className="cu-deco" aria-hidden="true">
                  <Glyph mark={s.mark} />
                </div>
              )}
              <div className="cu-author">
                <span className="cu-logo">
                  <Glyph mark={s.mark} />
                </span>
                <div className="cu-info">
                  <span className="cu-name">{s.name}</span>
                  <span className="cu-role">
                    {s.role}, {s.company}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="cu-foot">
          <p className="cu-foot-p">
            Jinear powers over <strong>40,000</strong> product teams. From ambitious startups to
            major enterprises.
          </p>
          <a href="/customers" className="cu-link">
            <div className="cu-link-row">
              <span className="cu-link-label">Customer stories</span>
              <span className="cu-link-arrow">→</span>
            </div>
          </a>
        </div>
      </div>

      <div className="cu-rail">
        <div className="cu-scroll">
          <div className="cu-row">
            {STORIES.map((s) => (
              <a key={s.slug} href={`/customers/${s.slug}`} className="cu-mlink">
                <div className="cu-mcard" style={{ background: s.background }}>
                  <blockquote className="cu-mq">{s.quote}</blockquote>
                  <div className="cu-mauthor">
                    <span className="cu-logo">
                      <Glyph mark={s.mark} />
                    </span>
                    <div className="cu-info">
                      <span className="cu-name">{s.name}</span>
                      <span className="cu-role">{s.company}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
