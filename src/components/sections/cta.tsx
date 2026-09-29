const CSS = `
.ct-root {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 224px var(--homepage-outer-padding, 24px) 0;
  box-sizing: border-box;
}
.ct-inner {
  flex: 1 0 0;
  width: 100%;
  max-width: 1344px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
.ct-heading {
  margin: 0;
  font-family: var(--font-regular);
  font-size: 72px;
  line-height: 72px;
  letter-spacing: -1.584px;
  font-weight: 510;
  color: rgb(247, 248, 248);
  text-align: center;
  text-wrap: balance;
  /* measured: the box is 722.078px at 72px and 401.16px at 40px */
  max-width: 10.0289em;
}
.ct-actions {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
.ct-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 44px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 9999px;
  font-family: var(--font-regular);
  font-size: 16px;
  font-weight: 510;
  line-height: 44px;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: border 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.ct-btn-invert {
  color: rgb(8, 9, 10);
  background-color: rgb(229, 229, 230);
  border: 1px solid rgb(229, 229, 230);
  box-shadow: rgba(0, 0, 0, 0) 0px 8px 2px 0px, rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px;
}
.ct-btn-secondary {
  color: rgb(247, 248, 248);
  background-color: rgba(255, 255, 255, 0.05);
  border: 0;
  box-shadow: rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.04) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.6) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 4px 0px;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
/* TODO(spec): hover targets were not captured; these are guesses. */
.ct-btn-invert:hover {
  background-color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
}
.ct-btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.08);
}
.ct-btn:active {
  transform: scale(0.98);
}
@media (max-width: 1280px) {
  .ct-heading {
    font-size: 40px;
    line-height: 44px;
    letter-spacing: -0.88px;
  }
}
@media (max-width: 640px) {
  .ct-root {
    padding-top: 96px;
  }
  .ct-heading {
    font-size: 38px;
    line-height: 41.8px;
    letter-spacing: -0.836px;
  }
}
`;

export function Cta() {
  return (
    <section data-section="cta" className="ct-root">
      <style>{CSS}</style>
      <div className="ct-inner">
        <h2 className="ct-heading">Built for the future. Available today.</h2>
        <div className="ct-actions">
          <a href="/signup" className="ct-btn ct-btn-invert">
            Get started
          </a>
          <a href="/contact/sales" className="ct-btn ct-btn-secondary">
            Contact sales
          </a>
        </div>
      </div>
    </section>
  );
}
