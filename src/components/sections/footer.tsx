type FtLink = { label: string; href: string; short?: string };
type FtColumn = { title: string; links: FtLink[]; className?: string };

const COLUMNS: FtColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Intake", href: "/intake" },
      { label: "Plan", href: "/plan" },
      { label: "AI", href: "/ai" },
      { label: "Build", href: "/build" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Asks", href: "/asks" },
      { label: "Agents", href: "/agents" },
      { label: "Coding Sessions", href: "/coding-sessions" },
      { label: "Customer Requests", href: "/customer-requests" },
      { label: "Insights", href: "/insights" },
      { label: "Mobile", href: "/mobile" },
      { label: "Integrations", href: "/integrations" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Careers", href: "/careers" },
      { label: "Now", href: "/now" },
      { label: "Method", href: "/method" },
      { label: "Quality", href: "/quality" },
      { label: "Brand", href: "/brand" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Switch", href: "/switch" },
      { label: "Download", href: "/download" },
      { label: "Documentation", short: "Docs", href: "/docs" },
      { label: "Developers", href: "/developers" },
      { label: "Status", href: "#" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Startups", href: "/startups" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Community", href: "#" },
      // Social links: neutral labels, no third-party names.
      { label: "Updates", href: "#" },
      { label: "Source", href: "#" },
      { label: "Videos", href: "#" },
    ],
  },
  {
    title: "Legal",
    className: "ft-col-legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "DPA", href: "/dpa" },
      { label: "AUP", href: "/legal/aup" },
    ],
  },
];

const LEGAL: FtLink[] = COLUMNS[COLUMNS.length - 1].links;

const CSS = `
.ft-root {
  padding-top: 224px;
  background: rgb(8, 9, 10);
}
.ft-footer {
  position: relative;
  background: rgb(8, 9, 10);
  border-top: 1px solid rgb(35, 37, 42);
  color: rgb(247, 248, 248);
  font-family: var(--font-regular);
  font-size: 16px;
  line-height: 24px;
}
.ft-wrapper {
  margin: 0 2px;
}
.ft-inner {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  align-items: start;
  padding: 56px 46px;
}
.ft-logo {
  justify-self: start;
  margin-left: 32px;
  width: 20px;
  height: 20px;
}
.ft-logo-link {
  display: flex;
  width: 20px;
  height: 20px;
  color: rgb(247, 248, 248);
  transition: color 0.1s ease 0s;
}
.ft-logo-link img {
  display: block;
  width: 20px;
  height: 20px;
}
.ft-col {
  padding: 0 32px;
  font-size: 13px;
  line-height: 19.5px;
  letter-spacing: -0.13px;
}
.ft-title {
  margin: 0 0 24px;
  font-size: 13px;
  font-weight: 510;
  line-height: 19.5px;
  letter-spacing: -0.13px;
  color: rgb(247, 248, 248);
}
.ft-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.ft-item {
  display: flex;
  height: 28px;
}
.ft-link {
  display: inline-flex;
  align-items: center;
  height: 28px;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  letter-spacing: -0.13px;
  color: rgb(138, 143, 152);
  text-decoration: none;
  transition: color 0.1s ease 0s;
}
.ft-link:hover {
  color: rgb(247, 248, 248);
}
.ft-short {
  display: none;
}
.ft-col-legal {
  display: none;
}
.ft-legal {
  grid-column: 2 / -1;
  justify-self: start;
  margin-top: 80px;
}
.ft-legal-links {
  display: flex;
  gap: 20px;
  padding: 0 32px;
}
.ft-legal-link {
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  letter-spacing: -0.13px;
  color: rgb(98, 102, 109);
  text-decoration: none;
  transition: color 0.1s ease 0s; /* TODO(spec): legal link hover not captured */
}
.ft-legal-link:hover {
  color: rgb(138, 143, 152); /* TODO(spec) */
}
.ft-status {
  height: 0;
}
@media (max-width: 1024px) {
  .ft-wrapper {
    margin: 0;
  }
  .ft-inner {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 48px 0;
    padding: 56px 28px;
  }
  .ft-logo {
    grid-row: span 2;
    margin-left: 8px;
  }
  .ft-col {
    padding: 0 8px;
  }
  .ft-col-legal {
    display: block;
  }
  .ft-legal {
    display: none;
  }
}
@media (max-width: 640px) {
  .ft-root {
    padding-top: 96px;
  }
  .ft-inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 48px 16px;
    padding: 56px 16px 24px;
  }
  .ft-logo,
  .ft-status {
    display: none;
  }
  .ft-title {
    margin-bottom: 16px;
  }
  .ft-full {
    display: none;
  }
  .ft-short {
    display: inline;
  }
}
`;

export function Footer() {
  return (
    <div className="ft-root" data-section="footer">
      <style>{CSS}</style>
      <footer className="ft-footer">
        <div className="ft-wrapper">
          <div className="ft-inner">
            <div className="ft-logo">
              <a href="/" className="ft-logo-link" aria-label="Jinear home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/mark.svg" alt="Jinear" width={20} height={20} />
              </a>
            </div>
            {COLUMNS.map((col) => (
              <div key={col.title} className={col.className ? `ft-col ${col.className}` : "ft-col"}>
                <h3 className="ft-title">{col.title}</h3>
                <ul className="ft-list">
                  {col.links.map((l) => (
                    <li key={l.label} className="ft-item">
                      <a href={l.href} className="ft-link">
                        {l.short ? (
                          <>
                            <span className="ft-full">{l.label}</span>
                            <span className="ft-short">{l.short}</span>
                          </>
                        ) : (
                          l.label
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="ft-legal">
              <div className="ft-legal-links">
                {LEGAL.map((l) => (
                  <a key={l.label} href={l.href} className="ft-legal-link">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="ft-status" />
          </div>
        </div>
      </footer>
    </div>
  );
}
