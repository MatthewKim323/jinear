// Ship: feature block "Build, review, and ship". Header (title + copy + Learn more), an issue
// list with a split code diff panel laid over it, and the "Features" ingredient list.
// Values are the computed styles of the reference layout at 1440 / 1024 / 810 / 390.
// Motion: no scroll reveal (component-specs section 6). Hover = filter brightness(1.4),
// 160ms ease-out-quad. "Working..." badges run a single 2s linear label sweep on mount.

import { Fragment, type ReactNode } from "react";
import { Inter } from "next/font/google";

// Display sizes need the optical size axis, like the other large headings on the page.
const interOpsz = Inter({ subsets: ["latin"], axes: ["opsz"], variable: "--sh-font" });

/* ---------------------------------------------------------------- code data */

type Tok = { c: string; t: string; ch?: "r" | "a" };

// Mini syntax: tokens separated by "|", each "cls:text" (k keyword, t text, v variable,
// s string, e entity, c constant). A leading "-" / "+" marks a removed / added character run.
function toks(src: string): Tok[] {
  return src.split("|").map((part) => {
    let ch: Tok["ch"];
    let p = part;
    if (p.startsWith("-") && p[1] !== ":" && p.includes(":")) {
      ch = "r";
      p = p.slice(1);
    } else if (p.startsWith("+") && p.includes(":")) {
      ch = "a";
      p = p.slice(1);
    }
    const i = p.indexOf(":");
    return { c: p.slice(0, i), t: p.slice(i + 1), ch };
  });
}

type Line = { toks: Tok[]; diff?: "old" | "new" };

const OLD: Line[] = [
  { toks: toks("k:import|t: |v:React|t: |k:from|t: |t:'|s:react|t:'") },
  { toks: toks("k:import|t: { |v:View|t:, |v:ActivityIndicator|t: } |k:from|t: |t:'|s:react-native|t:'") },
  { diff: "old", toks: toks("k:import|t: { |v:useVehicleState|t: } |k:from|t: |t:'|s:@hooks/useVehicleState|t:'") },
  { toks: toks("k:import|t: { |v:Dashboard|t: } |k:from|t: |t:'|s:@components/Dashboard|t:'") },
  { toks: [] },
  { toks: toks("k:export|t: |k:const|t: |e:HomeScreen|t: |k:=|t: () |k:=>|t: {") },
  { diff: "old", toks: toks("t:  |k:const|t: { |v:vehicleState|t:, |-v:isFullySynced|t: } |k:=|t: |e:useVehicleState|t:()") },
  { toks: [] },
  { diff: "old", toks: toks("t:  |k:if|t: (|-k:!|-v:isFullySynced|t:) {") },
  { toks: toks('t:    |k:return|t: <|c:ActivityIndicator|t: |e:size|k:=|t:"|s:large|t:"|t: />') },
  { toks: toks("t:  }") },
  { toks: [] },
  { toks: toks("t:  |k:return|t: (") },
  { toks: toks("t:    <|c:View|t:>") },
  { diff: "old", toks: toks("t:      <|c:Dashboard|t: |e:state|k:=|t:{|v:vehicleState|t:} />") },
  { toks: toks("t:    </|c:View|t:>") },
  { toks: toks("t:  )") },
  { toks: toks("t:}") },
];

const NEW: Line[] = [
  OLD[0],
  OLD[1],
  { diff: "new", toks: toks("k:import|t: { |v:useVehicleState|+t:, |+v:SyncStatus|+t: |t:} |k:from|t: |t:'|s:@hooks/useVehicleState|t:'") },
  OLD[3],
  OLD[4],
  OLD[5],
  { diff: "new", toks: toks("t:  |k:const|t: { |v:vehicleState|t:, |+v:syncStatus|t: } |k:=|t: |e:useVehicleState|t:()") },
  OLD[7],
  { diff: "new", toks: toks("t:  |k:if|t: (|+v:syncStatus|+t: |+k:===|+t: |+v:SyncStatus|+t:.|+v:PENDING|t:) {") },
  OLD[9],
  OLD[10],
  OLD[11],
  OLD[12],
  OLD[13],
  { diff: "new", toks: toks("t:      <|c:Dashboard|t: |e:state|k:=|t:{|v:vehicleState|t:} |+e:syncStatus|+k:=|+t:{|+v:syncStatus|+t:}|t: />") },
  OLD[15],
  OLD[16],
  OLD[17],
];

// Compact unified diff shown on narrow tablets (no split columns).
const COMPACT: { mark: string; line: Line }[] = [
  { mark: "01", line: { toks: toks("k:export|t: |k:const|t: |e:CodeReview|t: |k:=|t: () |k:=>|t: {") } },
  { mark: "02", line: { toks: toks("t:  <|c:Diff.Provider|t:>") } },
  { mark: "-", line: { diff: "old", toks: toks("t:    <|-c:Slow|t: />") } },
  { mark: "-", line: { diff: "old", toks: toks("t:    <|-c:Fragmented|t: />") } },
  { mark: "-", line: { diff: "old", toks: toks("t:    <|-c:HumanOnly|t: />") } },
  { mark: "+", line: { diff: "new", toks: toks("t:    <|+c:Frictionless|t: />") } },
  { mark: "+", line: { diff: "new", toks: toks("t:    <|+c:Integrated|t: />") } },
  { mark: "+", line: { diff: "new", toks: toks("t:    <|+c:AgentReady|t: />") } },
  { mark: "06", line: { toks: toks("t:  </|c:Diff.Provider|t:>") } },
  { mark: "07", line: { toks: toks("t:};") } },
];

function renderToks(list: Tok[]): ReactNode {
  return list.map((tk, i) => {
    let cls = `sh-tk sh-tk-${tk.c}`;
    if (tk.ch) {
      const prev = list[i - 1]?.ch === tk.ch;
      const next = list[i + 1]?.ch === tk.ch;
      cls += ` sh-ch-${tk.ch}`;
      if (!prev) cls += " sh-ce-l";
      if (!next) cls += " sh-ce-r";
    }
    return (
      <span key={i} className={cls}>
        {tk.t}
      </span>
    );
  });
}

function CodeLines({ lines }: { lines: Line[] }) {
  return (
    <pre className="sh-pre">
      <code className="sh-code">
        {lines.map((ln, i) => (
          <span key={i} className={`sh-line${ln.diff ? ` sh-diff-${ln.diff}` : ""}`}>
            <span className="sh-ln">{String(i + 1).padStart(2, "0")}</span>
            {renderToks(ln.toks)}
            {ln.toks.length === 0 ? " " : null}
          </span>
        ))}
      </code>
    </pre>
  );
}

/* ---------------------------------------------------------------- list data */

type Status = "review" | "progress" | "todo";
type Priority = "high" | "medium" | "low" | "none";
type Label = { pr?: string; prMerged?: boolean; accent?: string; name?: string };
type Row = {
  pri: Priority;
  id: string;
  title: string;
  labels: Label[];
  avatar?: string;
  working?: [string, string];
  date: string;
};
type Group = { status: Status; name: string; rows: Row[] };

const GROUPS: Group[] = [
  {
    status: "review",
    name: "In Review",
    rows: [
      { pri: "medium", id: "ENG-2498", title: "Replace isFullySynced with a sync status", labels: [{ pr: "#54910", prMerged: true }, { accent: "var(--color-yellow)", name: "iOS" }], avatar: "img-e84e8431a7", date: "Oct 9" },
      { pri: "low", id: "ENG-2380", title: "Show a stale data banner while syncing", labels: [{ pr: "#55167", prMerged: true }, { accent: "var(--color-indigo)", name: "Reliability" }], avatar: "img-51709256ae", date: "Oct 9" },
      { pri: "none", id: "ENG-2039", title: "Pass sync status to the dashboard", labels: [{ pr: "#55209", prMerged: true }, { accent: "var(--color-red)", name: "Bug" }, { accent: "var(--color-indigo)", name: "Reliability" }], avatar: "img-a6d8f3a13f", date: "Oct 8" },
    ],
  },
  {
    status: "progress",
    name: "In Progress",
    rows: [
      { pri: "medium", id: "ENG-2076", title: "Reduce ETA jitter", labels: [{ pr: "#55423" }, { accent: "var(--color-green)", name: "Performance" }], working: ["img-9002f2abcb", "img-3227a15acb"], date: "Oct 6" },
      { pri: "medium", id: "ENG-2108", title: "Handle GPS dropouts gracefully", labels: [{ pr: "#55409" }, { accent: "#ffebc6", name: "Maps" }], working: ["img-9002f2abcb", "img-3227a15acb"], date: "Oct 2" },
      { pri: "high", id: "ENG-2143", title: "Optimize map tile loading on initial app open", labels: [{ accent: "#ffebc6", name: "Maps" }], avatar: "img-e84e8431a7", date: "Oct 7" },
      { pri: "none", id: "ENG-2187", title: "Prevent duplicate ride requests on poor networks", labels: [{ accent: "var(--color-red)", name: "Bug" }], working: ["img-01bd5fbbdb", "img-6f8ed4ab2d"], date: "Oct 5" },
    ],
  },
  {
    status: "todo",
    name: "Todo",
    rows: [
      { pri: "low", id: "ENG-2254", title: "Reduce unnecessary map re-rendering on home screen", labels: [{ accent: "#ffebc6", name: "Maps" }], avatar: "img-04c384af3f", date: "Oct 10" },
      { pri: "low", id: "ENG-2291", title: "Clean up deprecated APIs used by the rider app", labels: [{ accent: "var(--color-blue)", name: "API" }], avatar: "img-de0aa3ecf6", date: "Oct 9" },
      { pri: "medium", id: "ENG-2327", title: "Speed up CI pipelines for mobile builds", labels: [{ accent: "var(--color-green)", name: "Performance" }], avatar: "img-6f8ed4ab2d", date: "Oct 9" },
      { pri: "high", id: "ENG-2358", title: "Reduce flakiness in mobile UI tests", labels: [{ accent: "var(--color-indigo)", name: "Reliability" }], avatar: "img-b70e61a5ce", date: "Oct 4" },
    ],
  },
];

const FEATURES = ["Issues", "Git automations", "Guided reviews", "Cycles", "Diffs", "Releases"];

/* ---------------------------------------------------------------- icons */

function StatusIcon({ s }: { s: Status }) {
  const color = s === "review" ? "var(--color-green)" : s === "progress" ? "var(--color-yellow)" : "var(--color-text-tertiary)";
  const d =
    s === "review"
      ? "M 3.5,3.5 L3.5,0 A3.5,3.5 0 1,1 0, 3.5 z"
      : s === "progress"
        ? "M 3.5,3.5 L3.5,0 A3.5,3.5 0 0,1 3.5, 7 z"
        : "M 3.5,3.5 L3.5,0 A3.5,3.5 0 0,1 3.5, 0 z";
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <rect x="1" y="1" width="12" height="12" rx="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path fill={color} stroke="none" d={d} transform="translate(3.5,3.5)" />
    </svg>
  );
}

function PriorityIcon({ p }: { p: Priority }) {
  if (p === "none") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="#9c9da1" aria-label="No priority">
        <rect x="1.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9" />
        <rect x="6.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9" />
        <rect x="11.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9" />
      </svg>
    );
  }
  const o2 = p === "low" ? 0.4 : 1;
  const o3 = p === "high" ? 1 : 0.4;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#9c9da1" aria-label={`${p} priority`}>
      <rect x="1.5" y="8" width="3" height="6" rx="1" />
      <rect x="6.5" y="5" width="3" height="9" rx="1" fillOpacity={o2} />
      <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity={o3} />
    </svg>
  );
}

function PrIcon({ merged }: { merged?: boolean }) {
  if (merged) {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--color-green)" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.5 10C13.8807 10 15 11.1193 15 12.5C15 13.8807 13.8807 15 12.5 15C11.1193 15 10 13.8807 10 12.5C10 11.1193 11.1193 10 12.5 10ZM12.5 11.5C11.9477 11.5 11.5 11.9477 11.5 12.5C11.5 13.0523 11.9477 13.5 12.5 13.5C13.0523 13.5 13.5 13.0523 13.5 12.5C13.5 11.9477 13.0523 11.5 12.5 11.5Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M3.5 4.5C3.91414 4.50009 4.25 4.83584 4.25 5.25V14.249C4.24982 14.663 3.91403 14.9989 3.5 14.999C3.0859 14.999 2.75018 14.6631 2.75 14.249V5.25C2.75 4.83579 3.08579 4.5 3.5 4.5Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M10 2.75C11.7949 2.75 13.25 4.20507 13.25 6V10.75C13.25 11.1642 12.9142 11.5 12.5 11.5C12.0858 11.5 11.75 11.1642 11.75 10.75V6C11.75 5.0335 10.9665 4.25 10 4.25H8C7.58579 4.25 7.25 3.91421 7.25 3.5C7.25 3.08579 7.58579 2.75 8 2.75H10Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M3.5 1C4.88071 1 6 2.11929 6 3.5C6 4.88071 4.88071 6 3.5 6C2.11929 6 1 4.88071 1 3.5C1 2.11929 2.11929 1 3.5 1ZM3.5 2.5C2.94772 2.5 2.5 2.94772 2.5 3.5C2.5 4.05228 2.94772 4.5 3.5 4.5C4.05228 4.5 4.5 4.05228 4.5 3.5C4.5 2.94772 4.05228 2.5 3.5 2.5Z" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--color-text-quaternary)" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 4.5C3.08579 4.5 2.75 4.83579 2.75 5.25V14.249C2.75018 14.6631 3.0859 14.999 3.5 14.999C3.91403 14.9989 4.24982 14.663 4.25 14.249V5.25C4.25 4.83584 3.91414 4.50009 3.5 4.5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M8.68066 10.2617C8.95025 9.94737 9.42384 9.91115 9.73828 10.1807C10.0526 10.4503 10.0889 10.9238 9.81934 11.2383L8.73828 12.5L9.81934 13.7617C10.0889 14.0762 10.0526 14.5497 9.73828 14.8193C9.42384 15.0888 8.95024 15.0526 8.68066 14.7383L7.18066 12.9883C6.93993 12.7074 6.93995 12.2926 7.18066 12.0117L8.68066 10.2617Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.2617 10.1807C12.5762 9.91115 13.0497 9.94737 13.3193 10.2617L14.8193 12.0117C15.06 12.2926 15.0601 12.7074 14.8193 12.9883L13.3193 14.7383C13.0498 15.0526 12.5762 15.0888 12.2617 14.8193C11.9474 14.5497 11.9111 14.0762 12.1807 13.7617L13.2617 12.5L12.1807 11.2383C11.9111 10.9238 11.9474 10.4503 12.2617 10.1807Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M10 2.75C11.7949 2.75 13.25 4.20507 13.25 6V7.75C13.25 8.16421 12.9142 8.5 12.5 8.5C12.0858 8.5 11.75 8.16421 11.75 7.75V6C11.75 5.0335 10.9665 4.25 10 4.25H8C7.58579 4.25 7.25 3.91421 7.25 3.5C7.25 3.08579 7.58579 2.75 8 2.75H10Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 1C4.88071 1 6 2.11929 6 3.5C6 4.88071 4.88071 6 3.5 6C2.11929 6 1 4.88071 1 3.5C1 2.11929 2.11929 1 3.5 1ZM3.5 2.5C2.94772 2.5 2.5 2.94772 2.5 3.5C2.5 4.05228 2.94772 4.5 3.5 4.5C4.05228 4.5 4.5 4.05228 4.5 3.5C4.5 2.94772 4.05228 2.5 3.5 2.5Z" />
    </svg>
  );
}

const CHEVRON = "M7.00194 10.6239C6.66861 10.8183 6.25 10.5779 6.25 10.192V5.80802C6.25 5.42212 6.66861 5.18169 7.00194 5.37613L10.7596 7.56811C11.0904 7.76105 11.0904 8.23895 10.7596 8.43189L7.00194 10.6239Z";

/* ---------------------------------------------------------------- styles */

const MASK_X =
  "linear-gradient(to left, transparent 16px, rgba(0,0,0,.17) 130px, rgba(0,0,0,.33) 230px, rgba(0,0,0,.5) 330px, rgba(0,0,0,.78) 450px, #000 570px)";
const MASK_Y = "linear-gradient(to top, transparent -20px, #000 290px)";

const css = `
.sh-root {
  display: block;
  width: 100%;
  max-width: calc(1344px + 96px);
  margin: 0 auto;
  padding: 0 48px;
  box-sizing: border-box;
}
.sh-rule {
  position: relative;
  height: 2px;
  margin: 0 calc(50% - 50vw);
}
.sh-rule::before, .sh-rule::after { content: ""; display: block; height: 1px; }
.sh-rule::before { background: #000; }
.sh-rule::after { background: rgba(255, 255, 255, 0.08); }
.sh-sec {
  display: block;
  margin-top: 8px;
  padding: 128px 0;
  color: var(--color-text-primary);
}

/* header */
.sh-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  padding-bottom: 96px;
}
.sh-title-wrap { padding: 0 32px; margin-left: -2px; }
.sh-title {
  margin: 0;
  max-width: 18ch;
  font-family: var(--sh-font), var(--font-regular);
  font-optical-sizing: auto;
  font-size: var(--title-6-size);
  line-height: var(--title-6-line-height);
  letter-spacing: var(--title-6-letter-spacing);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  text-box: trim-both cap alphabetic;
}
.sh-desc-wrap { padding: 1.64px 32px 0; }
.sh-desc {
  margin: 0;
  max-width: 24em;
  font-size: var(--title-3-size);
  line-height: var(--title-3-line-height);
  letter-spacing: var(--title-3-letter-spacing);
  font-weight: var(--font-weight-normal);
  color: var(--color-text-secondary);
  text-box: trim-both cap alphabetic;
}
.sh-action-wrap { margin-top: 48px; height: 25px; }
.sh-action {
  display: inline-flex;
  align-items: flex-start;
  padding-top: 1px;
  height: 25px;
  box-sizing: border-box;
  text-decoration: none;
  font-size: var(--text-regular-size);
  line-height: 24px;
  letter-spacing: var(--text-regular-letter-spacing);
  transition: filter 0.16s var(--ease-out-quad), transform 0.16s var(--ease-out-quad);
}
.sh-action:hover { filter: brightness(1.4); }
.sh-action-label { color: var(--color-text-tertiary); }
.sh-action-arrow { margin-left: 6px; color: var(--color-text-quaternary); }

/* illustration */
.sh-ill { position: relative; container-type: inline-size; }
.sh-stage {
  position: relative;
  height: 592px;
  margin-right: calc(50% - 50vw);
  overflow: hidden;
  -webkit-mask-image: ${MASK_X}, ${MASK_Y};
  -webkit-mask-composite: source-in;
  mask-image: ${MASK_X}, ${MASK_Y};
  mask-composite: intersect;
}
.sh-list-box {
  position: relative;
  width: 100cqw;
  margin-top: 24px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
}
.sh-panel {
  position: relative;
  height: 560px;
  background: var(--color-bg-level-1);
  border-radius: 12px 12px 0 0;
  box-shadow: var(--shadow-panel-ring);
  overflow: hidden;
}
.sh-list { display: flex; flex-direction: column; padding-top: 8px; }
.sh-group {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  box-sizing: border-box;
  padding: 8px;
  margin: 0 8px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  overflow: hidden;
  font-size: 13px;
  line-height: 19.5px;
  letter-spacing: -0.13px;
  font-weight: var(--font-weight-medium);
}
.sh-chev { display: grid; place-items: center; width: 24px; height: 24px; margin-right: -4px; }
.sh-chev svg { transform: rotate(90deg); }
.sh-gname { color: var(--color-text-secondary); }
.sh-gcount { color: var(--color-text-tertiary); }
.sh-row {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  box-sizing: border-box;
  padding: 0 28px 0 36px;
  margin: 0 8px;
  font-size: 13px;
  line-height: 19.5px;
  letter-spacing: -0.13px;
  text-align: left;
}
.sh-row-l, .sh-row-r { display: flex; align-items: center; gap: 8px; }
.sh-row-r { flex-shrink: 0; }
.sh-pri { display: flex; opacity: 0.9; }
.sh-pri-none { opacity: 0.45; }
.sh-id { display: block; width: 72px; flex-shrink: 0; color: var(--color-text-tertiary); }
.sh-st { display: grid; place-items: center; width: 16px; height: 16px; flex-shrink: 0; }
.sh-ititle { color: var(--color-text-secondary); font-weight: var(--font-weight-medium); }
.sh-lbl {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  box-sizing: border-box;
  padding: 4px 8px 4px 6px;
  border-radius: 9999px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: normal;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-tertiary);
  white-space: nowrap;
}
.sh-accent { position: relative; width: 16px; height: 16px; }
.sh-accent::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: var(--sh-accent);
}
.sh-av { display: grid; place-items: center; width: 24px; height: 24px; }
.sh-av img, .sh-avs img { display: block; width: 16px; height: 16px; border-radius: 50%; }
.sh-date {
  display: block;
  width: 40px;
  font-size: 12px;
  line-height: 16.8px;
  letter-spacing: normal;
  text-align: right;
  color: var(--color-text-tertiary);
}
.sh-badge {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  box-sizing: border-box;
  padding: 0 4px 0 8px;
  border-radius: 9999px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: normal;
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}
.sh-working {
  color: #626366;
  background: linear-gradient(100deg, #626366 0%, #626366 40%, #e4e5e9 48%, #5e6ad2 52%, #626366 60%, #626366 100%) 100% 0 / 300% 100% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: sh-sweep 2s linear 0s 1 both;
}
@keyframes sh-sweep {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}
.sh-avs { display: flex; width: 28px; height: 16px; }
.sh-avs img + img { margin-left: -4px; }

/* diff panel */
.sh-diff {
  position: absolute;
  top: 0;
  left: calc(100cqw / 3);
  width: 100cqw;
  height: 560px;
}
.sh-diff-panel {
  position: relative;
  height: 560px;
  background: var(--color-bg-level-1);
  border-radius: 12px 12px 0 0;
  box-shadow: var(--shadow-panel-ring-glow);
  overflow: hidden;
}
.sh-diff-head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 32px;
  height: 60px;
  padding: 0 32px;
  box-sizing: border-box;
}
.sh-diff-head svg { flex-shrink: 0; }
.sh-file {
  font-family: var(--font-monospace);
  font-size: 14px;
  line-height: 21px;
  color: var(--color-text-quaternary);
  white-space: nowrap;
}
.sh-split {
  display: grid;
  grid-template-columns: 5fr 7fr;
  border-top: 1px solid var(--color-border-primary);
}
.sh-col { padding: 32px 0; min-width: 0; }
.sh-col + .sh-col { box-shadow: var(--shadow-panel-edge-left); }
.sh-pre {
  position: relative;
  margin: 0;
  overflow: hidden;
  font-family: var(--font-monospace);
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  color: var(--color-text-secondary);
}
.sh-code { display: flex; flex-direction: column; font: inherit; }
.sh-line {
  display: block;
  height: 24px;
  padding: 0 32px;
  white-space: pre;
  transition: background-color 0.1s var(--ease-out-quad), box-shadow 0.1s var(--ease-out-quad);
}
.sh-ln { display: inline-block; width: 31.8px; color: var(--color-text-quaternary); }
.sh-diff-old { background: rgba(243, 78, 82, 0.1); box-shadow: inset 1px 0 0 #f34e52; }
.sh-diff-old .sh-ln { color: #f34e52; }
.sh-diff-new { background: rgba(39, 166, 68, 0.07); box-shadow: inset 1px 0 0 #27a644; }
.sh-diff-new .sh-ln { color: #27a644; }
.sh-tk { transition: color 0.1s var(--ease-out-quad); color: #e2e4e7; }
.sh-tk-k { color: #f79ce0; }
.sh-tk-v { color: #f7bf8b; }
.sh-tk-s { color: #ffdf9f; }
.sh-tk-e { color: #83dcdc; }
.sh-tk-c { color: #8fa6ff; }
.sh-ch-r, .sh-ch-a { transition: background 0.4s ease-out; }
.sh-ch-r { background: rgba(255, 0, 0, 0.12); }
.sh-ch-a { background: rgba(0, 255, 5, 0.1); }
.sh-ce-l { border-top-left-radius: 2px; border-bottom-left-radius: 2px; }
.sh-ce-r { border-top-right-radius: 2px; border-bottom-right-radius: 2px; }
.sh-compact { display: none; padding: 16px 0; }
.sh-compact .sh-line { padding: 0 16px 0 24px; }
.sh-compact .sh-ln { width: 32.8px; }
.sh-compact .sh-mk-old { padding-left: 11px; box-sizing: border-box; color: #f34e52; }
.sh-compact .sh-mk-new { width: 24.4px; padding-left: 5px; box-sizing: border-box; color: #27a644; }
.sh-shine {
  position: absolute;
  inset: 0;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px 12px 0 0;
  pointer-events: none;
}
.sh-picker {
  position: absolute;
  top: 30px;
  right: 32px;
  transform: translateY(-50%);
}
.sh-picker-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  border: 0;
  border-radius: 9999px;
  background: transparent;
  font: inherit;
  font-size: 13px;
  line-height: 32px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-quaternary);
  cursor: pointer;
  transition: border 0.16s var(--ease-out-quad), background-color 0.16s var(--ease-out-quad), color 0.16s var(--ease-out-quad),
    box-shadow 0.16s var(--ease-out-quad), opacity 0.16s var(--ease-out-quad), filter 0.16s var(--ease-out-quad),
    transform 0.16s var(--ease-out-quad);
}
.sh-picker-btn:hover { background-color: rgba(255, 255, 255, 0.05); } /* TODO(spec): hover value not captured */
.sh-picker-btn svg { display: block; }
.sh-mobile-ill { display: none; }

/* footer */
.sh-foot { display: grid; grid-template-columns: 1fr 1fr; }
.sh-foot-label { padding: 36px 32px 0; }
.sh-foot-label span {
  display: flex;
  align-items: center;
  height: 28px;
  font-size: var(--text-regular-size);
  line-height: 24px;
  letter-spacing: var(--text-regular-letter-spacing);
  color: var(--color-text-quaternary);
}
.sh-foot-content { padding: 36px 32px 0; }
.sh-ingredients { display: grid; grid-template-columns: 1fr 1fr; }
.sh-ing { position: relative; display: flex; align-items: center; height: 28px; }
.sh-ing-uneven { padding-left: 32px; }
.sh-ing-uneven::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.08);
}
.sh-ing-btn {
  display: block;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  cursor: pointer;
  font: inherit;
  font-size: var(--text-regular-size);
  line-height: 24px;
  letter-spacing: var(--text-regular-letter-spacing);
  color: var(--color-text-tertiary);
  text-align: left;
  white-space: nowrap;
  transition: filter 0.16s var(--ease-out-quad), transform 0.16s var(--ease-out-quad);
}
.sh-ing-btn:hover { filter: brightness(1.4); }
.sh-plus {
  margin-left: 4px;
  font-size: var(--text-large-size);
  line-height: 28.8px;
  color: var(--color-text-quaternary);
  transition: color 0.16s var(--ease-out-quad);
}
.sh-ing-btn:hover .sh-plus { color: var(--color-text-tertiary); } /* TODO(spec): "+" hover color not captured */

@media (max-width: 1280px) {
  .sh-title {
    font-size: var(--title-5-size);
    line-height: var(--title-5-line-height);
    letter-spacing: var(--title-5-letter-spacing);
  }
  .sh-desc {
    font-size: var(--title-2-size);
    line-height: var(--title-2-line-height);
    letter-spacing: var(--title-2-letter-spacing);
  }
}
@media (max-width: 1024px) {
  .sh-root { padding: 0 28px; }
  .sh-head { grid-template-columns: 1fr; padding-bottom: 64px; }
  .sh-title-wrap { padding: 0 8px; }
  .sh-desc-wrap { padding: 0 8px; margin-top: 32px; }
  .sh-action-wrap { margin-top: 40px; }
  .sh-foot { grid-template-columns: 1fr; }
  .sh-foot-label { padding: 36px 8px 0; }
  .sh-foot-content { padding: 36px 8px 0; }
}
/* TODO(spec): the split diff gives way to the compact diff somewhere between 810 and 1024. */
@media (max-width: 900px) {
  .sh-split { display: none; }
  .sh-compact { display: block; }
  .sh-picker { display: none; }
}
@media (max-width: 640px) {
  .sh-root { padding: 0 16px; }
  .sh-sec { display: flex; flex-direction: column-reverse; padding: 0; }
  .sh-head { padding: 40px 0 48px; }
  .sh-title-wrap { margin-left: -1px; }
  .sh-title {
    font-size: var(--title-3-size);
    line-height: var(--title-3-line-height);
    letter-spacing: var(--title-3-letter-spacing);
  }
  .sh-desc-wrap { margin-top: 24px; }
  .sh-desc {
    font-size: var(--text-regular-size);
    line-height: var(--text-regular-line-height);
    letter-spacing: var(--text-regular-letter-spacing);
    color: var(--color-text-tertiary);
  }
  .sh-action-wrap { margin-top: 24px; }
  .sh-stage, .sh-picker, .sh-foot { display: none; }
  .sh-mobile-ill { display: block; position: relative; height: 306px; }
  .sh-mobile-ill img {
    position: absolute;
    top: 12px;
    left: calc(50% - 50vw);
    width: 100vw;
    height: auto;
    aspect-ratio: 390 / 312;
    display: block;
  }
}
@media (prefers-reduced-motion: reduce) {
  .sh-working { animation: none; background-position: 0 0; }
}
`;

/* ---------------------------------------------------------------- parts */

function IssueRow({ r, status }: { r: Row; status: Status }) {
  return (
    <div className="sh-row">
      <div className="sh-row-l">
        <div className={`sh-pri${r.pri === "none" ? " sh-pri-none" : ""}`}>
          <PriorityIcon p={r.pri} />
        </div>
        <span className="sh-id">{r.id}</span>
        <span className="sh-st">
          <StatusIcon s={status} />
        </span>
        <span className="sh-ititle">{r.title}</span>
      </div>
      <div className="sh-row-r">
        {r.labels.map((l, i) => (
          <span key={i} className="sh-lbl">
            {l.pr ? (
              <>
                <PrIcon merged={l.prMerged} />
                {l.pr}
              </>
            ) : (
              <>
                <span className="sh-accent" style={{ ["--sh-accent" as string]: l.accent }} />
                {l.name}
              </>
            )}
          </span>
        ))}
        {r.working ? (
          <span className="sh-badge">
            <span className="sh-working">Working…</span>
            <span className="sh-avs">
              <img src={`/img/${r.working[0]}.svg`} alt="" width={16} height={16} />
              <img src={`/img/${r.working[1]}.svg`} alt="" width={16} height={16} />
            </span>
          </span>
        ) : (
          <span className="sh-av">
            <img src={`/img/${r.avatar}.svg`} alt="" width={16} height={16} />
          </span>
        )}
        <span className="sh-date">{r.date}</span>
      </div>
    </div>
  );
}

export function Ship() {
  return (
    <div data-section="ship" className={`sh-root ${interOpsz.variable}`}>
      <style>{css}</style>
      <div className="sh-rule" aria-hidden="true" />
      <section className="sh-sec">
        <div className="sh-head">
          <div className="sh-title-wrap">
            <h2 className="sh-title">
              Build, review,
              <br />
              and ship
            </h2>
          </div>
          <div className="sh-desc-wrap">
            <p className="sh-desc">
              Streamline code reviews with clear diffs, better context, and fewer back-and-forth comments. Keep PRs
              moving without sacrificing quality.
            </p>
            <div className="sh-action-wrap">
              <a href="/build" className="sh-action">
                <span className="sh-action-label">Learn more</span>
                <span className="sh-action-arrow">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="sh-ill">
          <div className="sh-mobile-ill">
            <img src="/img/img-bf4b187939.svg" alt="" width={390} height={312} loading="lazy" />
          </div>
          <div className="sh-stage" aria-hidden="true">
            <div className="sh-list-box">
              <div className="sh-panel">
                <div className="sh-list">
                  {GROUPS.map((g) => (
                    <Fragment key={g.name}>
                      <div className="sh-group">
                        <span className="sh-chev">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--color-text-quaternary)">
                            <path d={CHEVRON} />
                          </svg>
                        </span>
                        <StatusIcon s={g.status} />
                        <span className="sh-gname">{g.name}</span>
                        <span className="sh-gcount">{g.rows.length}</span>
                      </div>
                      {g.rows.map((r) => (
                        <IssueRow key={r.id} r={r} status={g.status} />
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="sh-diff">
              <div className="sh-diff-panel">
                <div className="sh-diff-head">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path
                      fill="var(--color-text-quaternary)"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.212.413a2.5 2.5 0 0 1 1.52.72l3.536 3.534A2.5 2.5 0 0 1 14 6.435V11.9l-.013.256a2.5 2.5 0 0 1-2.231 2.231l-.256.013h-7l-.256-.013a2.5 2.5 0 0 1-2.231-2.231L2 11.9v-9A2.5 2.5 0 0 1 4.244.413L4.5.4h3.465zM4.5 1.9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6.435q0-.017-.003-.035H8.75A1.75 1.75 0 0 1 7 4.65V1.9zm4 2.75c0 .138.112.25.25.25h2.629L8.672 2.193a1 1 0 0 0-.172-.137z"
                    />
                  </svg>
                  <span className="sh-file">voyager-ios/src/screens/Home/HomeScreen.tsx</span>
                </div>
                <div className="sh-split">
                  <div className="sh-col">
                    <CodeLines lines={OLD} />
                  </div>
                  <div className="sh-col">
                    <CodeLines lines={NEW} />
                  </div>
                </div>
                <div className="sh-compact">
                  <pre className="sh-pre">
                    <code className="sh-code">
                      {COMPACT.map(({ mark, line }, i) => (
                        <span key={i} className={`sh-line${line.diff ? ` sh-diff-${line.diff}` : ""}`}>
                          <span className={`sh-ln${line.diff ? ` sh-mk-${line.diff}` : ""}`}>{mark}</span>
                          {renderToks(line.toks)}
                        </span>
                      ))}
                    </code>
                  </pre>
                </div>
                <div className="sh-shine" />
              </div>
            </div>
          </div>
          <div className="sh-picker">
            <button type="button" className="sh-picker-btn" aria-haspopup="listbox">
              <span>Jinear</span>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="#9c9da1" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.35355 4.56051C8.15829 4.36525 7.84171 4.36525 7.64645 4.56051L5.35355 6.8534C5.15829 7.04866 4.84171 7.04866 4.64645 6.8534C4.45118 6.65814 4.45118 6.34156 4.64645 6.1463L6.93934 3.8534C7.52513 3.26762 8.47487 3.26762 9.06066 3.8534L11.3536 6.1463C11.5488 6.34156 11.5488 6.65814 11.3536 6.8534C11.1583 7.04866 10.8417 7.04866 10.6464 6.8534L8.35355 4.56051Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.64645 11.4392C7.84171 11.6344 8.15829 11.6344 8.35355 11.4392L10.6464 9.14629C10.8417 8.95103 11.1583 8.95103 11.3536 9.14629C11.5488 9.34156 11.5488 9.65814 11.3536 9.8534L9.06066 12.1463C8.47487 12.7321 7.52513 12.7321 6.93934 12.1463L4.64645 9.8534C4.45118 9.65814 4.45118 9.34156 4.64645 9.14629C4.84171 8.95103 5.15829 8.95103 5.35355 9.14629L7.64645 11.4392Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="sh-foot">
          <div className="sh-foot-label">
            <span>Features</span>
          </div>
          <div className="sh-foot-content">
            <div className="sh-ingredients">
              {FEATURES.map((f, i) => (
                <div key={f} className={`sh-ing${i % 2 ? " sh-ing-uneven" : ""}`}>
                  <button type="button" className="sh-ing-btn">
                    {f} <span className="sh-plus">+</span>
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
