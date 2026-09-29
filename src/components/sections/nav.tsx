"use client";

import { useEffect, useState } from "react";

type Item = { label: string; kind: "button" | "link"; hide: "tablet" | "laptop" };

const ITEMS: Item[] = [
  { label: "Product", kind: "button", hide: "tablet" },
  { label: "Resources", kind: "button", hide: "tablet" },
  { label: "Customers", kind: "link", hide: "tablet" },
  { label: "Pricing", kind: "link", hide: "tablet" },
  { label: "Now", kind: "link", hide: "laptop" },
  { label: "Contact", kind: "link", hide: "tablet" },
];

const CSS = `
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-image: linear-gradient(rgba(11, 11, 11, 0.8) 0%, rgba(11, 11, 11, 0.762) 100%);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.1s var(--ease-out-quad), background 0.1s var(--ease-out-quad);
  font-family: var(--font-regular);
}
.nav-root { display: flex; align-items: center; height: 72px; }
.nav-inner {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1436px;
  height: 100%;
  margin: 0 auto;
  padding: 0 77px;
}
.nav-list {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav-list ul { margin: 0; padding: 0; list-style: none; }
.nav-logo-item { display: flex; justify-content: flex-start; flex: 1 1 auto; }
.nav-logo {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  margin-left: -8px;
  border-radius: 6px;
  color: var(--color-text-primary);
  text-decoration: none;
}
.nav-logo-box { display: flex; align-items: center; width: 88px; height: 22px; gap: 10px; }
.nav-logo-word {
  font-size: 20px;
  line-height: 22px;
  font-weight: 510;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.nav-right { display: flex; align-items: center; min-width: 620px; flex: 0 0 auto; }
.nav-items { display: flex; align-items: center; }
.nav-items > li, .nav-buttons > li { display: grid; }
.nav-spacer { flex: 1; }
.nav-divider { width: 1px; height: 16px; margin: 0 8px; background: var(--color-border-primary); }
.nav-buttons { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.nav-anchor {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 12px;
  border: 0;
  border-radius: 9999px;
  background: transparent;
  font: inherit;
  font-size: 13px;
  line-height: 19.5px;
  font-weight: 400;
  color: var(--color-text-tertiary);
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.1s var(--ease-out-quad), background 0.1s var(--ease-out-quad);
}
.nav-anchor:hover, .nav-anchor[aria-expanded="true"] { color: var(--color-text-primary); }
.nav-anchor:focus-visible, .nav-cta:focus-visible, .nav-burger:focus-visible, .nav-logo:focus-visible {
  outline: 2px solid var(--color-indigo);
  outline-offset: 2px;
}
.nav-cta {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--color-button-invert-bg);
  border-radius: 9999px;
  background: var(--color-button-invert-bg);
  box-shadow: var(--shadow-button-invert);
  color: var(--color-button-invert-text);
  font-size: 13px;
  line-height: 32px;
  font-weight: 510;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.1s var(--ease-out-quad), border-color 0.1s var(--ease-out-quad);
}
.nav-cta:hover { background: #fff; border-color: #fff; }
.nav-mobile-item { display: none; }
.nav-burger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-right: -28px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
}
.nav-burger svg { display: block; }
.nav-burger rect { transform-origin: center; transition: transform 160ms var(--ease-out-quad); }
.nav-panel {
  position: fixed;
  top: 73px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: none;
  flex-direction: column;
  padding: 8px 23px 24px;
  background: var(--color-bg-primary);
  font-family: var(--font-regular);
}
.nav-panel ul { margin: 0; padding: 0; list-style: none; }
.nav-panel a {
  display: flex;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid var(--color-border-primary);
  color: var(--color-text-primary);
  font-size: 15px;
  line-height: 24px;
  font-weight: 510;
  letter-spacing: -0.165px;
  text-decoration: none;
}

@media (max-width: 1280px) {
  .nav-hide-laptop { display: none !important; }
  .nav-right { min-width: 0; }
}
@media (max-width: 1024px) {
  .nav-inner { max-width: none; padding: 0 35px; }
}
@media (max-width: 768px) {
  .nav-hide-tablet { display: none !important; }
  .nav-mobile-item { display: block; width: 36px; height: 64px; margin-left: -16px; }
  .nav-panel[data-open="true"] { display: flex; }
}
@media (max-width: 640px) {
  .nav-root { height: 64px; }
  .nav-inner { padding: 0 23px; }
  .nav-list { gap: 16px; }
  .nav-panel { top: 65px; }
}
`;

function Logo() {
  return (
    <span className="nav-logo-box">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M15 5V13.5a5 5 0 0 1 -10 0"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="4.5" y="3.5" width="3.5" height="3.5" rx="0.9" fill="currentColor" />
      </svg>
      <span className="nav-logo-word">Jinear</span>
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 769px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <>
      <style>{CSS}</style>
      <header className="nav-header" data-section="nav">
        <nav className="nav-root">
          <div className="nav-inner">
            <ul className="nav-list" aria-label="Site navigation">
              <li className="nav-logo-item">
                <a href="#" aria-label="Navigate to home" className="nav-logo">
                  <Logo />
                </a>
              </li>
              <li className="nav-right">
                <ul className="nav-items">
                  {ITEMS.map((it) => (
                    <li key={it.label} className={it.hide === "tablet" ? "nav-hide-tablet" : "nav-hide-laptop"}>
                      {it.kind === "button" ? (
                        <button type="button" className="nav-anchor" aria-expanded="false">
                          {it.label}
                        </button>
                      ) : (
                        <a href="#" className="nav-anchor">
                          {it.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="nav-spacer" />
                <div className="nav-divider nav-hide-tablet" />
                <div className="nav-spacer" />
                <ul className="nav-buttons">
                  <li>
                    <a href="#" className="nav-anchor">
                      Log in
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-cta">
                      Sign up
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-mobile-item">
                <button
                  type="button"
                  className="nav-burger"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <rect
                      x="1"
                      y="7.5"
                      width="14"
                      height="1"
                      rx="0.5"
                      style={{ transform: open ? "rotate(45deg)" : "translateY(-3.5px)" }}
                    />
                    <rect
                      x="1"
                      y="7.5"
                      width="14"
                      height="1"
                      rx="0.5"
                      style={{ transform: open ? "rotate(-45deg)" : "translateY(3.5px)" }}
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="nav-panel" data-open={open} role="dialog" aria-label="Menu" aria-hidden={!open}>
        <ul>
          {ITEMS.map((it) => (
            <li key={it.label}>
              <a href="#" onClick={() => setOpen(false)}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
