"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/* Values measured from the reference layout (1440 / 1024 / 810 / 390). */

const EASE = [0.25, 0.46, 0.45, 0.94] as const; // TODO(spec) reveal curve
const reveal = {
  initial: { opacity: 0, y: 16 }, // TODO(spec)
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: EASE }, // TODO(spec)
};

/* ---------- icons (generic UI glyphs) ---------- */

function Minimize() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H12C12.4142 11.25 12.75 11.5858 12.75 12C12.75 12.4142 12.4142 12.75 12 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12Z"
      />
    </svg>
  );
}

function Expand() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M6.2168 8.72266C6.50798 8.42824 6.98279 8.4257 7.27734 8.7168C7.57154 9.00799 7.57423 9.48287 7.2832 9.77734L4.59863 12.5H6.2998C6.71402 12.5 7.0498 12.8358 7.0498 13.25C7.04964 13.6641 6.71392 14 6.2998 14H2.75C2.55116 14 2.36036 13.9208 2.21973 13.7803C2.07915 13.6397 2.00008 13.4488 2 13.25V9.75C2 9.33579 2.33579 9 2.75 9C3.16421 9 3.5 9.33579 3.5 9.75V11.4775L6.2168 8.72266Z" />
      <path d="M13.25 2C13.4488 2.00006 13.6397 2.07917 13.7803 2.21973C13.9208 2.36033 14 2.55119 14 2.75V6.25C14 6.66414 13.6641 6.99988 13.25 7C12.8358 7 12.5 6.66421 12.5 6.25V4.52246L9.7832 7.27734C9.49206 7.57173 9.01721 7.57419 8.72266 7.2832C8.42838 6.99201 8.42575 6.51716 8.7168 6.22266L11.4014 3.5H9.7002C9.28598 3.5 8.9502 3.16421 8.9502 2.75C8.95028 2.33586 9.28603 2 9.7002 2H13.25Z" />
    </svg>
  );
}

function Close() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z" />
    </svg>
  );
}

function Caret() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M7.00194 10.6239C6.66861 10.8183 6.25 10.5779 6.25 10.192V5.80802C6.25 5.42212 6.66861 5.18169 7.00194 5.37613L10.7596 7.56811C11.0904 7.76105 11.0904 8.23895 10.7596 8.43189L7.00194 10.6239Z" />
    </svg>
  );
}

function StatusCircle({ color, fill }: { color: string; fill: "half" | "none" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <rect x="1" y="1" width="12" height="12" rx="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path
        fill={color}
        stroke="none"
        d={fill === "half" ? "M 3.5,3.5 L3.5,0 A3.5,3.5 0 0,1 3.5, 7 z" : "M 3.5,3.5 L3.5,0 A3.5,3.5 0 0,1 3.5, 0 z"}
        transform="translate(3.5,3.5)"
      />
    </svg>
  );
}

function DoneCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="var(--color-green)"
        d="M7 0a7 7 0 1 1 0 14A7 7 0 0 1 7 0m0 1.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11M7 3a4 4 0 1 1-3.993 4.213H7z"
      />
    </svg>
  );
}

function PriorityUrgent() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--color-orange)" aria-label="Urgent priority">
      <path d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4L9 4L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z" />
    </svg>
  );
}

function PriorityBars({ level }: { level: "high" | "medium" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--color-text-tertiary)" aria-label={`${level} priority`}>
      <rect x="1.5" y="8" width="3" height="6" rx="1" />
      <rect x="6.5" y="5" width="3" height="9" rx="1" />
      <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity={level === "medium" ? 0.4 : 1} />
    </svg>
  );
}

function TriageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.85714 7.375V6.03197C6.85714 5.55898 6.30618 5.32211 5.98395 5.65656L4.14982 7.56027C3.95006 7.76761 3.95006 8.10376 4.14982 8.31109L6.13377 10.3703C6.40071 10.6474 6.85714 10.4511 6.85714 10.0593V8.625H9.14286V9.96803C9.14286 10.441 9.69382 10.6779 10.016 10.3434L11.8502 8.43972C12.0499 8.23239 12.0499 7.89624 11.8502 7.68891L9.86623 5.6297C9.59929 5.35263 9.14286 5.54886 9.14286 5.9407V7.375H6.85714Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C11.0376 2.5 13.5 4.96243 13.5 8Z"
      />
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg className="au-chipIcon" width="11.4" height="12.25" viewBox="0 0 11.375 12.2503" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="var(--color-yellow)"
        d="M5.102.061a2.8 2.8 0 0 1 1.17 0c.437.093.847.33 1.667.803l1.184.683c.82.473 1.23.71 1.53 1.04.263.293.463.638.584 1.012.138.423.138.897.138 1.843v1.366l-.003.628c-.006.551-.031.897-.135 1.215l-.05.138a2.8 2.8 0 0 1-.535.874l-.118.12c-.29.273-.693.506-1.41.92l-1.185.683-.545.312c-.482.27-.794.42-1.121.49l-.145.028a2.8 2.8 0 0 1-.88 0l-.146-.028c-.327-.07-.64-.22-1.12-.49l-.546-.312-1.184-.683c-.718-.414-1.122-.647-1.411-.92l-.118-.12a2.8 2.8 0 0 1-.536-.874l-.05-.138C.035 8.333.01 7.987.004 7.436L0 6.808V5.442c0-.828 0-1.293.092-1.68l.046-.163c.106-.328.273-.633.49-.9l.095-.112c.224-.248.51-.443.986-.725l.543-.315L3.436.864C4.153.45 4.557.217 4.939.104zm-3.79 5.381v1.366c0 1.034.016 1.258.074 1.437l.056.146a1.5 1.5 0 0 0 .256.393l.051.053c.133.125.374.277 1.158.73l1.184.682.553.315c.165.092.29.156.387.205V6.547l-3.716-1.69zm5.032 1.105v4.222c.186-.092.466-.247.94-.52l1.184-.682.55-.321c.436-.26.565-.357.66-.462l.098-.122q.139-.192.213-.417l.02-.071c.03-.126.044-.307.05-.73l.004-.636V5.442l-.004-.584zM5.53 1.321l-.155.024c-.139.03-.287.093-.73.34L4.09 2l-1.184.683c-.784.452-1.025.605-1.158.73l-.051.053q-.04.045-.076.09l4.065 1.848L9.75 3.556l-.074-.09c-.094-.105-.223-.202-.66-.462l-.549-.321L7.284 2c-.785-.452-1.038-.584-1.213-.636l-.07-.02a1.5 1.5 0 0 0-.47-.023"
      />
    </svg>
  );
}

/* Invented agent marks (neutral glyphs, not third-party logos). */
function RelayMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2.2 13.2 5.1v5.8L8 13.8 2.8 10.9V5.1L8 2.2Z" stroke="var(--color-text-primary)" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 8v5.6M8 8l5-2.8M8 8 3 5.2" stroke="var(--color-text-primary)" strokeWidth="1.2" />
    </svg>
  );
}

function JinearAvatar() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/img/mark.svg" alt="Jinear" width={16} height={16} className="au-avatarImg" style={{ padding: 2, background: "#1b1c1f" }} />
  );
}

function SpecAvatar() {
  return <span className="au-avatarImg" style={{ background: "radial-gradient(circle at 35% 30%, #c98bd6, #7a5ad0 55%, #3e3a8f)" }} />;
}

/* ---------- panel pieces ---------- */

function Panel({
  name,
  avatar,
  tag,
  shine,
  children,
}: {
  name: string;
  avatar: ReactNode;
  tag?: string;
  shine?: "left" | "right";
  children: ReactNode;
}) {
  return (
    <div className="au-frame">
      <div className="au-panel">
        <header className="au-phead">
          <div className="au-identity">
            <span className="au-avatar">{avatar}</span>
            <span className="au-name">{name}</span>
            {tag ? <span className="au-tag">{tag}</span> : null}
          </div>
          <div className="au-controls" aria-hidden>
            <span className="au-ic">
              <Minimize />
            </span>
            <span className="au-ic">
              <Expand />
            </span>
            <span className="au-ic">
              <Close />
            </span>
          </div>
        </header>
        <div className="au-chatFrame">
          <div className="au-chat">
            <div className="au-content">
              <div className="au-conversation">{children}</div>
            </div>
          </div>
        </div>
      </div>
      {shine ? (
        <div
          className="au-shine"
          style={{ "--mx": shine === "right" ? "100%" : "0%" } as CSSProperties}
        />
      ) : null}
    </div>
  );
}

function Prompt({ text, context }: { text: string; context?: { icon: ReactNode; id: string } }) {
  return (
    <div className="au-message">
      <div className="au-promptBlock">
        <p className="au-bubble">{text}</p>
      </div>
      {context ? (
        <div className="au-contextRow">
          <span className="au-ctxIcon">{context.icon}</span>
          <span className="au-ctxId">{context.id}</span>
          <span className="au-ctxAdded">added to context</span>
        </div>
      ) : null}
    </div>
  );
}

function Thinking() {
  return (
    <div className="au-turn">
      <p className="au-thinking">
        <span className="au-shimmer">Thinking…</span>
      </p>
    </div>
  );
}

function WorkedFor({ label }: { label: string }) {
  return (
    <div className="au-worked">
      <span>{label}</span>
      <span className="au-ic">
        <Caret />
      </span>
    </div>
  );
}

type Row = { priority: ReactNode; id: string; status: ReactNode; title: string };

function IssueCard({ rows }: { rows: Row[] }) {
  return (
    <div className="au-cardWrap">
      <div className="au-card">
        {rows.map((r) => (
          <div className="au-row" key={r.id}>
            <span className="au-ic16">{r.priority}</span>
            <span className="au-rowId">{r.id}</span>
            <span className="au-ic16">{r.status}</span>
            <span className="au-rowTitle">{r.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stage() {
  return (
    <div className="au-stage">
      <div className="au-track">
        <Panel name="Jinear" tag="Quill 5" avatar={<JinearAvatar />}>
          <Prompt text="what are the three most important customer requests around permissions? add them to the Access Controls project" />
          <div className="au-turn">
            <WorkedFor label="Worked for 8 sec" />
            <p className="au-response">Three issues ranked by customer impact:</p>
            <IssueCard
              rows={[
                {
                  priority: <PriorityUrgent />,
                  id: "ENG-2298",
                  status: <StatusCircle color="var(--color-yellow)" fill="half" />,
                  title: "Add granular project permissions",
                },
                {
                  priority: <PriorityBars level="medium" />,
                  id: "ENG-2647",
                  status: <StatusCircle color="var(--color-text-tertiary)" fill="none" />,
                  title: "Let guests access multiple teams",
                },
                {
                  priority: <PriorityBars level="high" />,
                  id: "ENG-2352",
                  status: <StatusCircle color="var(--color-text-tertiary)" fill="none" />,
                  title: "Create custom roles with scoped access",
                },
              ]}
            />
            <p className="au-added">
              I’ve added them to{" "}
              <span className="au-chip">
                <ProjectIcon />
                <span className="au-chipLabel">Access Controls</span>
              </span>
            </p>
          </div>
        </Panel>

        <Panel name="Relay" avatar={<RelayMark />} shine="right">
          <Prompt
            text="add retry handling for failed image uploads described in this issue"
            context={{ icon: <StatusCircle color="currentColor" fill="half" />, id: "ENG-2844" }}
          />
          <Thinking />
        </Panel>

        <Panel name="Jinear" tag="Quill 5" avatar={<JinearAvatar />} shine="left">
          <Prompt
            text="Review today’s mobile triage and group the issues by what should happen next"
            context={{ icon: <TriageIcon />, id: "Mobile Triage" }}
          />
          <Thinking />
        </Panel>

        <Panel name="Specly" avatar={<SpecAvatar />}>
          <Prompt
            text="review this issue, draft complete offline mode requirements, and break the work into sub-issues"
            context={{ icon: <StatusCircle color="currentColor" fill="half" />, id: "ENG-2521" }}
          />
          <div className="au-turn">
            <WorkedFor label="Worked for 1 min" />
            <p className="au-response">Updated the issue with requirements, open product decisions, and acceptance criteria.</p>
            <IssueCard
              rows={[
                {
                  priority: <PriorityBars level="high" />,
                  id: "ENG-2920",
                  status: <DoneCircle />,
                  title: "Define offline mode requirements",
                },
              ]}
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* Phone-only illustration: an assignee picker, built as DOM. */
function Picker() {
  const people: { name: string; agent?: boolean; avatar: ReactNode }[] = [
    { name: "Relay", agent: true, avatar: <span className="au-pAv au-pAvLight"><RelayMarkDark /></span> },
    { name: "Sam", avatar: <span className="au-pAv" style={{ background: "linear-gradient(135deg,#6b7a8f,#39414d)" }} /> },
    { name: "Noa", avatar: <span className="au-pAv" style={{ background: "linear-gradient(135deg,#9aa6b8,#4d5563)" }} /> },
    { name: "Pilot", agent: true, avatar: <span className="au-pAv au-pAvGrey" /> },
    { name: "Forge", agent: true, avatar: <span className="au-pAv au-pAvDark" /> },
  ];
  return (
    <div className="au-mobileArt">
      <div className="au-picker">
        <div className="au-pInput">
          <span className="au-pCaret" />
          <span>Assign to…</span>
        </div>
        <div className="au-pList">
          {people.map((p, i) => (
            <div className={i === 0 ? "au-pRow au-pRowActive" : "au-pRow"} key={p.name}>
              {p.avatar}
              <span className="au-pName">{p.name}</span>
              {p.agent ? <span className="au-pTag">Agent</span> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RelayMarkDark() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2.2 13.2 5.1v5.8L8 13.8 2.8 10.9V5.1L8 2.2Z" stroke="#08090a" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 8v5.6M8 8l5-2.8M8 8 3 5.2" stroke="#08090a" strokeWidth="1.3" />
    </svg>
  );
}

const FEATURES = ["Jinear Agent", "Coding sessions", "Triage", "Jinear MCP"];

export function Automations() {
  return (
    <div className="au-wrap" data-section="automations">
      <style>{CSS}</style>
      <div className="au-keyline" aria-hidden>
        <div className="au-shadow" />
        <div className="au-line" />
      </div>
      <div className="au-spacer" aria-hidden />
      <section className="au-root">
        <motion.div className="au-header" {...reveal}>
          <div className="au-titleWrap">
            <h2 className="au-title">
              AI and
              <br />
              automations
            </h2>
          </div>
          <div className="au-descWrap">
            <p className="au-desc">
              Build and deploy AI agents that work alongside you as teammates. Work on complex tasks together or
              delegate entire issues end-to-end.
            </p>
            <div className="au-action">
              <a href="/ai" className="au-link">
                <span className="au-linkText">Learn more</span>
                <span className="au-linkArrow">→</span>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="au-illustration">
          <Picker />
          <motion.div
            className="au-stageWrap"
            initial={{ opacity: 0, y: 24 }} // TODO(spec)
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }} // TODO(spec)
          >
            <Stage />
          </motion.div>
        </div>

        <div className="au-footer">
          <div className="au-footLabel">
            <span className="au-footLabelText">Features</span>
          </div>
          <div className="au-footContent">
            <div className="au-ingredients">
              {FEATURES.map((f, i) => (
                <div className={i % 2 ? "au-ing au-ingUneven" : "au-ing"} key={f}>
                  <button type="button" className="au-ingBtn">
                    {f} <span className="au-plus">+</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const CSS = `
.au-wrap{max-width:1436px;margin:0 auto;padding:0 46px;}
.au-keyline{position:relative;height:2px;width:100vw;margin-left:calc(50% - 50vw);}
.au-shadow{height:1px;background:#000;}
.au-line{height:1px;background:rgba(255,255,255,0.08);}
.au-spacer{height:8px;}
.au-root{display:flex;flex-direction:column;padding:128px 0;}

.au-header{display:grid;grid-template-columns:1fr 1fr;align-items:start;padding-bottom:96px;}
.au-titleWrap{padding:0 32px;margin-left:-2px;}
.au-title{margin:0;max-width:18ch;font-size:48px;line-height:48px;letter-spacing:-1.056px;font-weight:510;color:var(--color-text-primary);text-wrap:balance;text-box:trim-both cap alphabetic;}
.au-descWrap{padding:0 32px;display:grid;grid-template-columns:minmax(0,1fr);}
.au-desc{margin:1.7px 0 0;max-width:567px;font-size:24px;line-height:31.92px;letter-spacing:-0.288px;font-weight:400;color:var(--color-text-secondary);text-box:trim-both cap alphabetic;}
.au-action{margin-top:48px;height:25px;}
.au-link{display:inline-flex;align-items:flex-end;height:25px;text-decoration:none;}
.au-linkText,.au-linkArrow{display:inline-block;font-size:15px;line-height:24px;letter-spacing:-0.165px;}
.au-linkText{color:var(--color-text-tertiary);transition:color .15s;}
.au-linkArrow{margin-left:6px;color:var(--color-text-quaternary);transition:transform .15s,color .15s;}
.au-link:hover .au-linkText{color:var(--color-text-primary);}
.au-link:hover .au-linkArrow{transform:translateX(2px);color:var(--color-text-tertiary);}

.au-illustration{position:relative;}
.au-mobileArt{display:none;}
.au-stage{position:relative;height:632px;overflow:hidden;
  -webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 30%,#000 70%,transparent 100%);
  mask-image:linear-gradient(90deg,transparent 0%,#000 30%,#000 70%,transparent 100%);}
.au-track{position:absolute;top:72px;left:50%;display:flex;gap:12px;transform:translateX(-818px);
  -webkit-mask-image:linear-gradient(180deg,#000 45%,transparent 100%);
  mask-image:linear-gradient(180deg,#000 45%,transparent 100%);}
.au-frame{position:relative;flex:0 0 400px;width:400px;height:560px;border-radius:12px;}
.au-panel{display:flex;flex-direction:column;height:100%;background:#0f1011;border-radius:12px;border:1px solid rgba(255,255,255,0.12);box-shadow:rgba(0,0,0,0.25) 0 2px 32px 0;overflow:hidden;}
.au-shine{position:absolute;inset:0;border-radius:12px;border:1px solid rgba(255,255,255,0.08);z-index:2;pointer-events:none;
  -webkit-mask-image:radial-gradient(circle at var(--mx) 0%,#000,transparent 70%);
  mask-image:radial-gradient(circle at var(--mx) 0%,#000,transparent 70%);} /* TODO(spec) exact edge glow */
.au-phead{display:flex;align-items:center;justify-content:space-between;gap:10px;height:48px;padding:14px 14px 14px 20px;flex:none;}
.au-identity{display:flex;align-items:center;gap:6px;}
.au-avatar{display:flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:999px;background:#0f1011;box-shadow:rgba(255,255,255,0.08) 0 0 0 .5px inset;overflow:hidden;flex:none;}
.au-avatarImg{display:block;width:16px;height:16px;border-radius:999px;object-fit:cover;}
.au-name{font-size:13px;line-height:20px;font-weight:500;color:var(--color-text-secondary);white-space:nowrap;}
.au-tag{display:flex;align-items:center;height:18px;padding:1px 4px;border-radius:4px;border:1px solid rgba(255,255,255,0.08);font-size:11px;line-height:14px;color:var(--color-text-tertiary);white-space:nowrap;}
.au-controls{display:flex;align-items:center;gap:12px;color:var(--color-text-tertiary);}
.au-ic{display:flex;align-items:center;justify-content:center;width:14px;height:14px;}
.au-ic16{display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex:none;}
.au-chatFrame{display:flex;flex-direction:column;padding:6px;flex:1 1 auto;min-height:0;}
.au-chat{display:flex;flex-direction:column;overflow:hidden;flex:1 1 auto;}
.au-content{display:flex;flex-direction:column;padding:4px 0 80px;}
.au-conversation{display:flex;flex-direction:column;}
.au-message{display:flex;flex-direction:column;}
.au-promptBlock{padding:4px 4px 8px 40px;}
.au-bubble{margin:0;padding:10px;font-size:13px;line-height:20px;letter-spacing:-0.039px;color:var(--color-text-primary);background-color:#0f1011;background-image:linear-gradient(rgba(255,255,255,0.04),rgba(255,255,255,0.04));border-radius:8px;box-shadow:rgba(0,0,0,0.2) 0 0 0 1px;}
.au-contextRow{display:flex;align-items:center;justify-content:flex-end;gap:6px;height:16px;padding-right:10px;color:var(--color-text-tertiary);}
.au-ctxIcon{display:flex;align-items:center;justify-content:center;width:16px;height:16px;}
.au-ctxId,.au-ctxAdded{font-size:12px;line-height:14px;white-space:nowrap;}
.au-ctxId{color:var(--color-text-tertiary);}
.au-ctxAdded{color:var(--color-text-quaternary);}
.au-turn{display:flex;flex-direction:column;padding:8px 0;}
.au-thinking{margin:0;display:flex;align-items:center;height:32px;padding:0 14px;font-size:13px;line-height:20px;}
.au-shimmer{color:#626366;background:linear-gradient(90deg,#626366 0%,#626366 40%,#c9cad0 50%,#626366 60%,#626366 100%);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:au-shimmer 2.4s linear infinite;} /* TODO(spec) */
@keyframes au-shimmer{from{background-position:100% 0}to{background-position:0% 0}}
.au-worked{display:flex;align-items:center;gap:4px;height:32px;padding:0 14px;font-size:12px;line-height:16px;color:var(--color-text-tertiary);align-self:flex-start;}
.au-worked .au-ic{color:var(--color-text-quaternary);}
.au-response{margin:0;padding:0 14px 12px;font-size:13px;line-height:20px;letter-spacing:-0.039px;color:var(--color-text-secondary);opacity:.9;}
.au-cardWrap{padding:0 3px;}
.au-card{display:flex;flex-direction:column;gap:12px;padding:11px;border-radius:6px;border:1px solid rgba(255,255,255,0.12);}
.au-row{display:flex;align-items:center;gap:6px;height:19.5px;}
.au-rowId{flex:none;width:80px;font-size:13px;line-height:19.5px;color:var(--color-text-tertiary);white-space:nowrap;}
.au-rowTitle{flex:1 1 0;min-width:0;font-size:13px;line-height:16px;font-weight:500;color:var(--color-text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.au-added{margin:0;padding:12px 14px 0;font-size:13px;line-height:20px;color:var(--color-text-secondary);opacity:.9;}
.au-chip{display:inline-flex;align-items:baseline;gap:4px;padding:2px 5px 2px 4px;margin-left:2px;background:rgba(255,255,255,0.07);border-radius:3px;border:1px solid rgba(255,255,255,0.08);line-height:16px;}
.au-chipIcon{align-self:center;}
.au-chipLabel{font-size:13px;line-height:16px;}

.au-footer{display:grid;grid-template-columns:1fr 1fr;}
.au-footLabel{padding:36px 32px 0;}
.au-footLabelText{display:flex;align-items:center;height:28px;font-size:15px;line-height:24px;letter-spacing:-0.165px;color:var(--color-text-quaternary);}
.au-footContent{padding:36px 32px 0;}
.au-ingredients{display:grid;grid-template-columns:1fr 1fr;}
.au-ing{display:flex;align-items:center;height:28px;}
.au-ingUneven{position:relative;padding-left:32px;}
.au-ingUneven::before{content:"";position:absolute;left:0;top:0;bottom:0;width:1px;background:rgba(255,255,255,0.08);}
.au-ingBtn{appearance:none;background:none;border:0;padding:0;margin:0;cursor:pointer;font-family:inherit;font-size:15px;line-height:24px;letter-spacing:-0.165px;color:var(--color-text-tertiary);white-space:nowrap;transition:color .15s;}
.au-plus{margin-left:4px;font-size:18px;line-height:0;color:var(--color-text-quaternary);}
.au-ingBtn:hover{color:var(--color-text-primary);}

@media (max-width:1024px){
  .au-wrap{padding:0 28px;}
  .au-header{grid-template-columns:minmax(0,1fr);padding-bottom:64px;}
  .au-titleWrap{padding:0 8px;}
  .au-title{font-size:40px;line-height:44px;letter-spacing:-0.88px;}
  .au-descWrap{padding:0 8px;margin-top:32px;}
  .au-desc{margin-top:0;max-width:477px;font-size:20px;line-height:26.6px;letter-spacing:-0.24px;}
  .au-action{margin-top:40px;}
  .au-footer{grid-template-columns:minmax(0,1fr);}
  .au-footLabel{padding:36px 8px 0;}
  .au-footContent{padding:36px 8px 0;}
}
@media (max-width:640px){
  .au-wrap{padding:0 16px;}
  .au-root{padding:0;}
  .au-header{order:2;padding:40px 0 48px;}
  .au-titleWrap{margin-left:-1px;}
  .au-title{font-size:24px;line-height:31.92px;letter-spacing:-0.288px;}
  .au-descWrap{margin-top:24px;}
  .au-desc{max-width:none;font-size:15px;line-height:24px;letter-spacing:-0.165px;}
  .au-action{margin-top:24px;}
  .au-illustration{order:1;padding-top:12px;}
  .au-stageWrap,.au-footer{display:none;}
  .au-mobileArt{display:block;position:relative;width:100vw;margin-left:calc(50% - 50vw);height:312px;margin-bottom:-22px;overflow:hidden;
    -webkit-mask-image:linear-gradient(180deg,#000 55%,transparent 100%);mask-image:linear-gradient(180deg,#000 55%,transparent 100%);}
}
.au-picker{position:absolute;left:20px;top:20px;width:420px;height:320px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);
  background:linear-gradient(180deg,#121314,#0c0d0e);box-shadow:rgba(0,0,0,0.25) 0 2px 32px 0;}
.au-pInput{display:flex;align-items:center;gap:6px;height:47px;padding:0 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;color:var(--color-text-quaternary);}
.au-pCaret{width:1px;height:14px;background:var(--color-indigo);}
.au-pList{display:flex;flex-direction:column;gap:1px;padding:12px 8px;}
.au-pRow{display:flex;align-items:center;gap:6px;height:40px;padding:0 8px;border-radius:6px;font-size:12px;color:var(--color-text-secondary);}
.au-pRowActive{background:rgba(255,255,255,0.04);color:var(--color-text-primary);}
.au-pAv{display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:999px;flex:none;}
.au-pAvLight{background:#f7f8f8;}
.au-pAvGrey{background:#8a8f98;}
.au-pAvDark{background:#1c1c1f;box-shadow:rgba(255,255,255,0.08) 0 0 0 1px inset;}
.au-pName{font-size:13px;line-height:16px;}
.au-pTag{display:flex;align-items:center;height:16px;padding:0 4px;border-radius:3px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);font-size:10px;color:var(--color-text-tertiary);}
`;
