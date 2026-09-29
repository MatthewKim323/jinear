"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/* ------------------------------------------------------------------ */
/* Data (invented, neutral content)                                    */
/* ------------------------------------------------------------------ */

type Priority = "none" | "high" | "medium" | "low";
type Label = { dot?: string; text: string; pr?: boolean };
type Issue = {
  id: string;
  title: string;
  avatar?: string; // gradient for a person avatar; omitted = unassigned glyph
  priority: Priority;
  labels?: Label[];
};
type Column = { key: "backlog" | "todo" | "progress" | "done"; name: string; count: string; issues: Issue[] };

const RED = "#eb5757";
const BLUE = "#4ea7fc";
const GREEN = "#27a644";
const PALE = "#dcffff";

const COLUMNS: Column[] = [
  {
    key: "backlog",
    name: "Backlog",
    count: "8",
    issues: [
      { id: "ENG-2085", title: "Reduce layout shift on first paint...", priority: "none" },
      { id: "ENG-2094", title: "Add retry buffering for webhook events", priority: "none" },
      { id: "ENG-2092", title: "Reduce cold start caused by cache warmup", priority: "none" },
      { id: "ENG-2200", title: "Fix stale filters after workspace switch", priority: "none" },
    ],
  },
  {
    key: "todo",
    name: "Todo",
    count: "71",
    issues: [
      {
        id: "ENG-926",
        title: "Remove UI inconsistencies",
        avatar: "linear-gradient(135deg,#f5a97f,#c26bd6)",
        priority: "high",
        labels: [
          { dot: RED, text: "Bug" },
          { dot: BLUE, text: "Design" },
        ],
      },
      {
        id: "ENG-2088",
        title: "TypeError: Cannot read properties",
        avatar: "linear-gradient(135deg,#7fd1c6,#4a6fd8)",
        priority: "medium",
        labels: [{ dot: RED, text: "Bug" }],
      },
      {
        id: "ENG-924",
        title: "Upgrade summary model to v5",
        avatar: "linear-gradient(135deg,#e7d37a,#d9745b)",
        priority: "low",
        labels: [{ dot: PALE, text: "AI" }],
      },
      {
        id: "ENG-1882",
        title: "Optimize load times",
        priority: "none",
        labels: [{ dot: GREEN, text: "Performance" }],
      },
    ],
  },
  {
    key: "progress",
    name: "In Progress",
    count: "3",
    issues: [
      {
        id: "ENG-1487",
        title: "Remove contentData from GraphQL API",
        avatar: "linear-gradient(135deg,#9aa4ff,#5e6ad2)",
        priority: "medium",
        labels: [{ pr: true, text: "61039" }],
      },
      {
        id: "MKT-1028",
        title: "Launch page assets",
        avatar: "linear-gradient(135deg,#b3e39a,#3f9a74)",
        priority: "medium",
        labels: [{ dot: BLUE, text: "Design" }],
      },
      {
        id: "ENG-2187",
        title: "Prevent duplicate form submits on poor...",
        avatar: "linear-gradient(135deg,#f3b0c3,#b0508a)",
        priority: "high",
        labels: [
          { dot: RED, text: "Bug" },
          { pr: true, text: "62048" },
        ],
      },
    ],
  },
  {
    key: "done",
    name: "Done",
    count: "53",
    issues: [
      {
        id: "ENG-2074",
        title: "Clean up deprecated APIs...",
        priority: "medium",
        labels: [
          { dot: BLUE, text: "API" },
          { pr: true, text: "61002" },
        ],
      },
      { id: "ENG-1912", title: "Reduce latency in search st...", priority: "low", labels: [{ pr: true, text: "61005" }] },
      { id: "ENG-1951", title: "Reduce jitter in timeline durin...", priority: "medium", labels: [{ pr: true, text: "61202" }] },
      {
        id: "ENG-1960",
        title: "Improve fallback messaging",
        priority: "medium",
        labels: [
          { dot: BLUE, text: "UI" },
          { pr: true, text: "61149" },
        ],
      },
      { id: "ENG-1991", title: "Improve visibility into sync st...", priority: "medium" },
    ],
  },
];

type Message = { name: string; initial: string; bg: string; text: string; hidden?: boolean };

const MESSAGES: Message[] = [
  {
    name: "tomas",
    initial: "T",
    bg: "linear-gradient(135deg,#7c8cff,#3a3f8f)",
    text: "Has anyone been looking into the iOS startup performance issues?",
    hidden: true,
  },
  {
    name: "mira",
    initial: "M",
    bg: "linear-gradient(135deg,#f0a58a,#9b4f7a)",
    text: "Anyone else noticing the iOS app feels slow to open if you haven’t used it in a bit?",
  },
  {
    name: "tomas",
    initial: "T",
    bg: "linear-gradient(135deg,#7c8cff,#3a3f8f)",
    text: "Yea, we’re still blocking initial render on a full workspace sync every time…",
  },
  {
    name: "jonah",
    initial: "J",
    bg: "linear-gradient(135deg,#8fd6b0,#2f6f63)",
    text: "Feels like we could render sooner and load the rest in the background. Probably also worth tracking startup timing so we know how often this happens!",
  },
];

const FEATURES = ["Jinear Agent", "Customer Requests", "Triage", "Jinear Asks"];

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

function PriorityIcon({ p }: { p: Priority }) {
  if (p === "none") {
    return (
      <svg aria-label="No priority" width="12" height="12" viewBox="0 0 16 16" fill="#9c9da1">
        <rect x="1.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9" />
        <rect x="6.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9" />
        <rect x="11.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9" />
      </svg>
    );
  }
  const o2 = p === "low" ? 0.4 : 1;
  const o3 = p === "high" ? 1 : 0.4;
  return (
    <svg aria-label={`${p} priority`} width="12" height="12" viewBox="0 0 16 16" fill="#9c9da1">
      <rect x="1.5" y="8" width="3" height="6" rx="1" />
      <rect x="6.5" y="5" width="3" height="9" rx="1" fillOpacity={o2} />
      <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity={o3} />
    </svg>
  );
}

function ColIcon({ k }: { k: Column["key"] }) {
  if (k === "backlog") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="#9c9da1" aria-hidden>
        <path d="M13.9408 7.91426L11.9576 7.65557C11.9855 7.4419 12 7.22314 12 7C12 6.77686 11.9855 6.5581 11.9576 6.34443L13.9408 6.08573C13.9799 6.38496 14 6.69013 14 7C14 7.30987 13.9799 7.61504 13.9408 7.91426ZM13.4688 4.32049C13.2328 3.7514 12.9239 3.22019 12.5538 2.73851L10.968 3.95716C11.2328 4.30185 11.4533 4.68119 11.6214 5.08659L13.4688 4.32049ZM11.2615 1.4462L10.0428 3.03204C9.69815 2.76716 9.31881 2.54673 8.91341 2.37862L9.67951 0.531163C10.2486 0.767153 10.7798 1.07605 11.2615 1.4462ZM7.91426 0.0591659L7.65557 2.04237C7.4419 2.01449 7.22314 2 7 2C6.77686 2 6.5581 2.01449 6.34443 2.04237L6.08574 0.059166C6.38496 0.0201343 6.69013 0 7 0C7.30987 0 7.61504 0.0201343 7.91426 0.0591659ZM4.32049 0.531164L5.08659 2.37862C4.68119 2.54673 4.30185 2.76716 3.95716 3.03204L2.73851 1.4462C3.22019 1.07605 3.7514 0.767153 4.32049 0.531164ZM1.4462 2.73851L3.03204 3.95716C2.76716 4.30185 2.54673 4.68119 2.37862 5.08659L0.531164 4.32049C0.767153 3.7514 1.07605 3.22019 1.4462 2.73851ZM0.0591659 6.08574C0.0201343 6.38496 0 6.69013 0 7C0 7.30987 0.0201343 7.61504 0.059166 7.91426L2.04237 7.65557C2.01449 7.4419 2 7.22314 2 7C2 6.77686 2.01449 6.5581 2.04237 6.34443L0.0591659 6.08574ZM0.531164 9.67951L2.37862 8.91341C2.54673 9.31881 2.76716 9.69815 3.03204 10.0428L1.4462 11.2615C1.07605 10.7798 0.767153 10.2486 0.531164 9.67951ZM2.73851 12.5538L3.95716 10.968C4.30185 11.2328 4.68119 11.4533 5.08659 11.6214L4.32049 13.4688C3.7514 13.2328 3.22019 12.9239 2.73851 12.5538ZM6.08574 13.9408L6.34443 11.9576C6.5581 11.9855 6.77686 12 7 12C7.22314 12 7.4419 11.9855 7.65557 11.9576L7.91427 13.9408C7.61504 13.9799 7.30987 14 7 14C6.69013 14 6.38496 13.9799 6.08574 13.9408ZM9.67951 13.4688L8.91341 11.6214C9.31881 11.4533 9.69815 11.2328 10.0428 10.968L11.2615 12.5538C10.7798 12.9239 10.2486 13.2328 9.67951 13.4688ZM12.5538 11.2615L10.968 10.0428C11.2328 9.69815 11.4533 9.31881 11.6214 8.91341L13.4688 9.67951C13.2328 10.2486 12.924 10.7798 12.5538 11.2615Z" />
      </svg>
    );
  }
  if (k === "todo") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <rect x="1" y="1" width="12" height="12" rx="6" stroke="var(--color-text-quaternary)" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }
  if (k === "progress") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
        <g fill="#F2C94C" opacity=".9">
          <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm0-2A5 5 0 1 1 8 3a5 5 0 0 1 0 10Z" />
          <path d="M11.571 8A3.571 3.571 0 0 1 8 11.571V4.43A3.572 3.572 0 0 1 11.57 8Z" />
        </g>
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--color-indigo, #5e6ad2)" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0ZM11.101 5.10104C11.433 4.76909 11.433 4.23091 11.101 3.89896C10.7691 3.56701 10.2309 3.56701 9.89896 3.89896L5.5 8.29792L4.10104 6.89896C3.7691 6.56701 3.2309 6.56701 2.89896 6.89896C2.56701 7.2309 2.56701 7.7691 2.89896 8.10104L4.89896 10.101C5.2309 10.433 5.7691 10.433 6.10104 10.101L11.101 5.10104Z"
      />
    </svg>
  );
}

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <path d="M8.75 4C8.75 3.58579 8.41421 3.25 8 3.25C7.58579 3.25 7.25 3.58579 7.25 4V7.25H4C3.58579 7.25 3.25 7.58579 3.25 8C3.25 8.41421 3.58579 8.75 4 8.75H7.25V12C7.25 12.4142 7.58579 12.75 8 12.75C8.41421 12.75 8.75 12.4142 8.75 12V8.75H12C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25H8.75V4Z" />
  </svg>
);

const MoreIcon = ({ size = 14, rotate = false }: { size?: number; rotate?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden
    style={rotate ? { transform: "rotate(90deg)" } : undefined}
  >
    <path d="M3 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
  </svg>
);

const UnassignedIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 16 16" aria-hidden>
    <path fill="currentColor" d="M8 4a2 2 0 0 0-2 2v.5a2 2 0 0 0 4 0V6a2 2 0 0 0-2-2" />
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m-2.879-4.121-1.01 1.01a5.5 5.5 0 1 1 7.778 0l-1.01-1.01A3 3 0 0 0 8.757 10H7.243a3 3 0 0 0-2.122.879"
    />
  </svg>
);

const BranchIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill={GREEN} aria-hidden>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 1C4.88 1 6 2.12 6 3.5c0 1.12-.74 2.07-1.75 2.38v8.37a.75.75 0 0 1-1.5 0V5.88A2.5 2.5 0 0 1 3.5 1Zm0 1.49a1.01 1.01 0 1 0 0 2.02 1.01 1.01 0 0 0 0-2.02Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 5a3.25 3.25 0 0 1 3.25 3.25v1.86A2.5 2.5 0 1 1 11.75 10.11V8.25c0-.97-.78-1.75-1.75-1.75H8.25a.75.75 0 0 1 0-1.5H10Zm2.5 6.49a1.01 1.01 0 1 0 0 2.02 1.01 1.01 0 0 0 0-2.02Z"
    />
  </svg>
);

/* Generic chat glyph (neutral speech bubble), same 18px box as the header mark. */
const ChatGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="var(--color-text-quaternary)" aria-hidden>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v5.5A2.25 2.25 0 0 1 11.75 12H7.6l-2.9 2.18A.75.75 0 0 1 3.5 13.6V12A1.5 1.5 0 0 1 2 10.5V4.25Zm2.25-.75a.75.75 0 0 0-.75.75v6.25c0 .28.22.5.5.5h.25c.41 0 .75.34.75.75v.6l1.9-1.43a.75.75 0 0 1 .45-.15h4.4a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75h-7.5ZM5.5 6.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm2.25 0a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10 6.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z"
    />
  </svg>
);

const I20 = ({ d }: { d: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden>
    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d={d} />
  </svg>
);

const D_PLUS =
  "M10.75 3.25a.75.75 0 1 0-1.5 0v6H3.251A.75.75 0 0 0 2.5 10a.75.75 0 0 0 .75.75h6v6a.75.75 0 1 0 1.5 0v-6h6a.75.75 0 1 0 0-1.5h-6z";
const D_TEXT =
  "M6.94 3.951c-.458-1.378-2.413-1.363-2.852.022l-4.053 12.8a.75.75 0 0 0 1.43.452l1.1-3.476h6.06l1.164 3.487a.75.75 0 1 0 1.423-.474zm1.186 8.298L5.518 4.426 3.04 12.249zm6.198-5.537a4.74 4.74 0 0 1 3.037-.081A3.74 3.74 0 0 1 20 10.207v6.792a.75.75 0 0 1-1.5 0v-.745a8 8 0 0 1-2.847 1.355 3 3 0 0 1-3.15-1.143c-1.655-2.275-.03-5.467 2.784-5.467H18.5v-.792c0-.984-.641-1.853-1.581-2.143a3.240 3.240 0 0 0-2.077.056l-.242.089a2.22 2.22 0 0 0-1.34 1.382l-.048.145a.75.75 0 0 1-1.423-.474l.048-.145a3.72 3.72 0 0 1 2.244-2.315zm4.176 5.787h-3.213c-1.587 0-2.504 1.801-1.57 3.085.357.491.98.717 1.572.57a6.5 6.5 0 0 0 2.47-1.223l.74-.593z";
const D_EMOJI =
  "M2.5 10a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18M7.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M14 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-.523 4.597c-.616 1.576-2.046 2.364-3.477 2.364-1.43 0-2.86-.788-3.477-2.364-.22-.56.258-1.097.86-1.097h5.234c.602 0 1.08.537.86 1.097";
const D_AT =
  "M2.5 10a7.5 7.5 0 1 1 15 0v.644c0 1.024-.83 1.855-1.855 1.855a1.145 1.145 0 0 1-1.145-1.145V6.75a.75.75 0 0 0-1.494-.098 4.5 4.5 0 1 0 .465 6.212A2.640 2.640 0 0 0 15.646 14 3.355 3.355 0 0 0 19 10.644V10a9 9 0 1 0-3.815 7.357.749.749 0 1 0-.865-1.225A7.499 7.499 0 0 1 2.5 10m7.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6";
const D_VIDEO =
  "M3.75 4.5a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-2.59a.75.75 0 0 1 1.124-.65l3.376 1.943V6.547l-3.376 1.944A.75.75 0 0 1 13 7.84V5.25a.75.75 0 0 0-.75-.75zm-2.25.75A2.25 2.25 0 0 1 3.75 3h8.5a2.25 2.25 0 0 1 2.25 2.25v1.294l2.626-1.512A1.250 1.250 0 0 1 19 6.115v7.77a1.249 1.249 0 0 1-1.874 1.083L14.5 13.456v1.294A2.25 2.25 0 0 1 12.25 17h-8.5a2.25 2.25 0 0 1-2.25-2.25z";
const D_MIC =
  "M10 2a3.5 3.5 0 0 0-3.5 3.5v3a3.5 3.5 0 1 0 7 0v-3A3.5 3.5 0 0 0 10 2M8 5.5a2 2 0 1 1 4 0v3a2 2 0 1 1-4 0zM5 8.25a.75.75 0 0 0-1.5 0v.25a6.5 6.5 0 0 0 5.75 6.457V16.5h-1.5a.75.75 0 1 0 0 1.5h4.5a.75.75 0 1 0 0-1.5h-1.5v-1.543A6.5 6.5 0 0 0 16.5 8.5v-.25a.75.75 0 1 0-1.5 0v.25a5 5 0 1 1-10 0z";
const D_SLASH =
  "M4.5 3h11A1.5 1.5 0 0 1 17 4.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 15.5v-11A1.5 1.5 0 0 1 4.5 3m-3 1.5a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3zm11.64 1.391a.75.75 0 0 0-1.28-.782l-5.5 9a.75.75 0 0 0 1.28.782z";
const D_CHEVRON =
  "M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06";

const SendIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden>
    <path
      fill="currentColor"
      d="M1.2 1.685c0-.37.399-.603.721-.423l12.56 6.172a.584.584 0 0 1 .005 1.045L2 14.768l-.056.014a.603.603 0 0 1-.745-.587v-3.657a1.81 1.81 0 0 1 1.77-1.815l5.238-.136c.216-.008.6-.194.6-.637s-.4-.636-.6-.636L2.97 7.177A1.81 1.81 0 0 1 1.2 5.363z"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function IssueCard({ issue }: { issue: Issue }) {
  return (
    <div className="in-card">
      <div className="in-card-head">
        <span className="in-card-id">{issue.id}</span>
        <span className="in-card-av">
          {issue.avatar ? <span className="in-av14" style={{ background: issue.avatar }} /> : <UnassignedIcon />}
        </span>
      </div>
      <div className="in-card-title">
        <div className="in-card-title-text">
          <span>{issue.title}</span>
        </div>
      </div>
      <div className="in-card-tags">
        <span className="in-prio">
          <PriorityIcon p={issue.priority} />
        </span>
        {issue.labels?.map((l) => (
          <span className="in-label" key={l.text}>
            {l.pr ? <BranchIcon /> : <span className="in-label-dot" style={{ background: l.dot }} />}
            <span className="in-label-text">{l.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Board() {
  return (
    <div className="in-board">
      <div className="in-panel">
        <div className="in-row">
          {COLUMNS.map((c) => (
            <div className="in-col" key={c.key}>
              <div className="in-col-head">
                <div className="in-col-name">
                  <span className="in-col-icon">
                    <ColIcon k={c.key} />
                  </span>
                  <span className="in-col-title">{c.name}</span>
                  <span className="in-col-count">{c.count}</span>
                </div>
                <div className="in-col-actions">
                  <button className="in-hbtn" aria-label="Add issue" tabIndex={-1}>
                    <PlusIcon />
                  </button>
                  <button className="in-hbtn" aria-label="Open menu" tabIndex={-1}>
                    <MoreIcon />
                  </button>
                </div>
              </div>
              <div className="in-col-list">
                {c.issues.map((i) => (
                  <IssueCard issue={i} key={i.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolBtn({ label, d, className = "" }: { label: string; d: string; className?: string }) {
  return (
    <button className={`in-ibtn ${className}`} aria-label={label} tabIndex={-1}>
      <I20 d={d} />
    </button>
  );
}

function Thread() {
  return (
    <div className="in-chat-wrap">
      <div className="in-chat">
        <header className="in-chat-head">
          <div className="in-chat-head-l">
            <ChatGlyph />
            <div className="in-chat-head-t">
              <span className="in-chat-title">Thread</span>
              <span className="in-chat-chan">#product</span>
            </div>
          </div>
          <span className="in-chat-more">
            <MoreIcon size={16} rotate />
          </span>
        </header>
        <div className="in-msgs">
          {MESSAGES.map((m, i) => (
            <div className="in-msg" key={i} style={m.hidden ? { opacity: 0 } : undefined} aria-hidden={m.hidden || undefined}>
              <span className="in-msg-av" style={{ background: m.bg }}>
                {m.initial}
              </span>
              <div className="in-msg-body">
                <div className="in-msg-head">
                  <span className="in-msg-name">{m.name}</span>
                  <span className="in-msg-time">4:19 PM</span>
                </div>
                <span className="in-msg-text">
                  <span>{m.text}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="in-input">
          <div className="in-textarea">
            <div className="in-textline">
              <span className="in-mention">@Jinear</span>
              <span className="in-typed">create issues and assign to me</span>
              <div className="in-cursor" />
            </div>
          </div>
          <div className="in-toolbar">
            <button className="in-attach" aria-label="Attach file" tabIndex={-1}>
              <I20 d={D_PLUS} />
            </button>
            <ToolBtn label="Hide formatting" d={D_TEXT} />
            <ToolBtn label="Emoji" d={D_EMOJI} />
            <ToolBtn label="Mention someone" d={D_AT} />
            <div className="in-tdiv" />
            <ToolBtn label="Record video clip" d={D_VIDEO} />
            <ToolBtn label="Record audio clip" d={D_MIC} />
            <div className="in-tdiv in-hide-m" />
            <ToolBtn label="Run shortcut" d={D_SLASH} className="in-hide-m" />
            <div className="in-send">
              <button className="in-send-btn" aria-label="Send message" tabIndex={-1}>
                <SendIcon />
              </button>
              <span className="in-send-div" />
              <button className="in-send-btn" aria-label="Schedule for later" tabIndex={-1}>
                <I20 d={D_CHEVRON} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="in-shine" aria-hidden />
    </div>
  );
}

// TODO(spec): no component spec for this section; reveal values are guessed.
const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

function Reveal({ className, children, delay = 0 }: { className: string; children: ReactNode; delay?: number }) {
  return (
    <motion.div className={className} {...reveal} transition={{ ...reveal.transition, delay }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Intake() {
  return (
    <section data-section="intake" className="in-root">
      <style>{CSS}</style>
      <div className="in-gap-top" />
      <div className="in-keyline" aria-hidden>
        <div className="in-keyline-shadow" />
        <div className="in-keyline-line" />
      </div>
      <div className="in-gap-40" />
      <div className="in-wrap">
        <div className="in-inner">
          <Reveal className="in-header">
            <div className="in-title-wrap">
              <h2 className="in-title">
                Intake
                <br />
                and integrations
              </h2>
            </div>
            <div className="in-desc-wrap">
              <p className="in-desc">
                Automatically turn conversations and customer feedback into actionable issues that are instantly
                routed, labeled, and prioritized for the right team.
              </p>
              <div className="in-action-wrap">
                <a href="/intake" className="in-action">
                  <span className="in-action-label">Learn more</span>
                  <span className="in-action-arrow">{"→"}</span>
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal className="in-ill" delay={0.1 /* TODO(spec) */}>
            <div className="in-board-wrap">
              <Board />
            </div>
            <Thread />
            <div className="in-ill-sp" />
          </Reveal>
          <div className="in-foot">
            <div className="in-foot-label">
              <span className="in-foot-label-text">Features</span>
            </div>
            <div className="in-foot-content">
              <div className="in-ingredients">
                {FEATURES.map((f, i) => (
                  <div className={`in-ing${i % 2 ? " in-ing-uneven" : ""}`} key={f}>
                    <button className="in-ing-btn" tabIndex={-1}>
                      <span className="in-ing-link">
                        {f}
                        <span className="in-ing-plus">+</span>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Styles (all values from the captured computed styles)               */
/* ------------------------------------------------------------------ */

const CSS = `
.in-root{position:relative;width:100%;overflow-x:clip;font-family:var(--font-regular);color:#f7f8f8}
.in-gap-top{height:160px}
.in-gap-40{height:40px}
.in-keyline{height:2px;width:100%}
.in-keyline-shadow{height:1px;background:#000}
.in-keyline-line{height:1px;background:rgba(255,255,255,.08)}
.in-wrap{padding:0 max(48px, calc((100% - 1344px) / 2))}
.in-inner{max-width:1344px;margin:0 auto;padding:128px 0}

/* header */
.in-header{display:grid;grid-template-columns:1fr 1fr;align-items:start;padding-bottom:96px}
.in-title-wrap{padding:0 32px;margin-left:-2px}
.in-title{margin:0;max-width:18ch;font-size:48px;line-height:48px;font-weight:510;letter-spacing:-1.056px;color:#f7f8f8;text-box:trim-both cap alphabetic}
.in-desc-wrap{padding:0 32px}
.in-desc{margin:1.6px 0 0;max-width:566.4px;font-size:24px;line-height:31.92px;letter-spacing:-.288px;font-weight:400;color:#d0d6e0;text-box:trim-both cap alphabetic}
.in-action-wrap{margin-top:48px;font-size:16px;line-height:24px}
.in-action{display:inline-block;text-decoration:none;color:inherit;transition:filter .16s cubic-bezier(.25,.46,.45,.94),transform .16s cubic-bezier(.25,.46,.45,.94)}
.in-action span{display:inline-block;font-size:15px;line-height:24px;letter-spacing:-.165px}
.in-action-label{color:#8a8f98;transition:color .16s cubic-bezier(.25,.46,.45,.94)}
.in-action-arrow{margin-left:6px;color:#62666d;transition:color .16s cubic-bezier(.25,.46,.45,.94),transform .16s cubic-bezier(.25,.46,.45,.94)}
/* TODO(spec): hover state guessed */
.in-action:hover .in-action-label{color:#f7f8f8}
.in-action:hover .in-action-arrow{color:#d0d6e0;transform:translateX(2px)}

/* illustration */
.in-ill{position:relative}
.in-ill-sp{display:none}
.in-board-wrap{position:relative}
.in-board{position:relative;width:110%;height:626px;padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:22px;transform:translateX(-120px);
  -webkit-mask-image:linear-gradient(to right,transparent 8%,#000 45%,#000 66%,transparent 95.5%),linear-gradient(to bottom,#000 44%,transparent 90%);
  mask-image:linear-gradient(to right,transparent 8%,#000 45%,#000 66%,transparent 95.5%),linear-gradient(to bottom,#000 44%,transparent 90%);
  -webkit-mask-composite:source-in;mask-composite:intersect}
.in-panel{position:relative;height:608px;padding:24px 0 24px 385px;background:#0f1011;border-radius:12px 12px 0 0;box-shadow:inset 0 0 0 1px #23252a;opacity:.8;overflow:hidden}
.in-row{display:flex;gap:12px;height:554px}
.in-col{flex:0 0 300px;width:300px}
.in-col-head{display:flex;align-items:center;justify-content:space-between;gap:8px;height:42px;padding:0 12px 28px}
.in-col-name{display:flex;align-items:center;gap:11px;height:14px}
.in-col-icon{display:grid;grid-template-columns:14px;opacity:.9}
.in-col-icon svg{display:block}
.in-col-title{font-size:12px;line-height:14px;font-weight:510;color:#d0d6e0}
.in-col-count{font-size:12px;line-height:14px;font-weight:400;color:#8a8f98}
.in-col-actions{display:flex;align-items:center;gap:8px}
.in-hbtn{display:grid;grid-template-columns:14px;width:14px;height:14px;padding:0;border:0;background:none;color:#62666d}
.in-hbtn svg{display:block}
.in-col-list{display:flex;flex-direction:column;gap:8px}
.in-card{position:relative;display:flex;flex-direction:column;height:96px;padding:8px 10px 12px 12px;background:#0f1011 linear-gradient(rgba(255,255,255,.02),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.08);border-radius:9px}
.in-card-head{display:flex;align-items:center;justify-content:space-between;gap:8px;height:22px}
.in-card-id{font-size:10px;line-height:14px;letter-spacing:-.15px;color:#62666d}
.in-card-av{display:grid;grid-template-columns:14px;color:#62666d}
.in-card-av svg{display:block}
.in-av14{display:block;width:14px;height:14px;border-radius:50%}
.in-card-title{display:flex;align-items:center;gap:6px;height:18px}
.in-card-title-text{flex:1;min-width:0;height:24px;line-height:24px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.in-card-title-text span{font-size:12px;line-height:16.8px;font-weight:510;color:#d0d6e0}
.in-card-tags{display:flex;align-items:center;gap:4px;margin-top:10px;height:24px}
.in-prio{display:grid;grid-template-columns:22px;justify-items:center;align-items:center;width:24px;height:24px;border:1px solid rgba(255,255,255,.08);border-radius:9999px}
.in-prio svg{display:block}
.in-label{display:flex;align-items:center;gap:4px;height:24px;padding:0 8px 0 6px;border:1px solid rgba(255,255,255,.08);border-radius:9999px}
.in-label svg{display:block;flex:none}
.in-label-dot{width:7px;height:7px;margin:0 3px;border-radius:50%;flex:none}
.in-label-text{font-size:12px;line-height:14px;font-weight:510;color:#8a8f98}

/* thread panel */
.in-chat-wrap{position:absolute;top:-28px;left:32px;width:480px;height:559px;border-radius:16px;overflow:hidden;transform:translateX(-24px);isolation:isolate;z-index:1}
.in-chat{position:relative;height:559px;padding-bottom:12px;background:#101112;border-radius:16px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025)}
.in-chat-head{position:relative;display:flex;align-items:center;justify-content:space-between;height:61px;margin:0 1px;padding:20px 23px 19px;border-bottom:1px solid rgba(255,255,255,.075);box-shadow:rgba(0,0,0,.4) 0 1px 0 0}
.in-chat-head-l{display:flex;align-items:center;gap:12px;height:21px}
.in-chat-head-l svg{display:block;flex:none}
.in-chat-head-t{display:flex;align-items:baseline;gap:8px}
.in-chat-title{font-size:16px;line-height:20px;font-weight:590;color:#d0d6e0}
.in-chat-chan{font-size:13px;line-height:20px;font-weight:510;letter-spacing:-.13px;color:#8a8f98}
.in-chat-more{display:grid;color:var(--color-text-quaternary,#62666d)}
.in-chat-more svg{display:block}
.in-msgs{position:relative;display:flex;flex-direction:column;justify-content:flex-end;gap:24px;height:326px;padding:26px 24px 32px;overflow:hidden}
.in-msg{display:flex;gap:16px;flex:none}
.in-msg-av{flex:none;display:grid;place-items:center;width:36px;height:36px;margin-top:2px;border-radius:6px;font-size:15px;line-height:1;font-weight:590;color:rgba(255,255,255,.9)}
.in-msg-body{display:flex;flex-direction:column;min-width:0;flex:1}
.in-msg-head{display:flex;align-items:baseline;gap:6px;height:20px}
.in-msg-name{font-size:15px;line-height:20px;font-weight:590;letter-spacing:-.165px;color:#d0d6e0}
.in-msg-time{font-size:12px;line-height:16px;font-weight:510;color:#62666d}
.in-msg-text{font-size:15px;line-height:20px;font-weight:300;letter-spacing:-.06px;color:#d0d6e0;opacity:.8}
.in-input{position:relative;display:flex;flex-direction:column;gap:12px;height:160px;margin:0 12px;padding:16px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-radius:8px}
.in-textarea{height:81px;font-size:15px;line-height:22.5px;color:#d0d6e0}
.in-textline{display:flex;align-items:center;font-size:15px;line-height:24px;letter-spacing:-.165px;color:#d0d6e0}
.in-mention{display:flex;align-items:center;height:24px;padding:0 3px;margin-right:4px;color:#6d78d5;background:rgba(109,120,213,.15);border-radius:4px}
.in-cursor{width:1.5px;height:21px;margin-left:3px;background:#62666d;border-radius:1.5px;animation:cursor-blink 1.25s ease 0s infinite}
.in-toolbar{display:flex;align-items:center;gap:4px;height:32px;margin:0 3px 1px}
.in-attach{display:grid;place-items:center;width:32px;height:32px;margin-right:4px;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.05);color:#62666d}
.in-ibtn{display:grid;place-items:center;width:28px;height:28px;padding:0;border:0;border-radius:4px;background:none;color:#62666d}
.in-attach svg,.in-ibtn svg{display:block}
.in-tdiv{width:1px;height:20px;margin:0 4px;background:rgba(255,255,255,.08)}
.in-send{position:relative;display:flex;align-items:center;margin-left:auto;height:28px;background:#5e6ad2;border-radius:6px;box-shadow:rgba(94,106,210,.4) 0 0 0 3px;transform-origin:right bottom;transition:filter .16s cubic-bezier(.25,.46,.45,.94)}
.in-send-btn{display:grid;place-items:center;width:32px;height:28px;padding:1px 6px;border:0;background:none;color:#fff;transition:filter .16s cubic-bezier(.25,.46,.45,.94)}
.in-send-btn svg{display:block}
.in-send-div{width:1px;height:16px;background:rgba(255,255,255,.2)}
.in-shine{position:absolute;inset:0;z-index:2;pointer-events:none;border:1px solid rgba(255,255,255,.22);border-radius:16px;
  -webkit-mask-image:radial-gradient(ellipse 500px 500px at 100% 45%,#000 0%,#0009 30%,#0003 50%,#0000 70%);
  mask-image:radial-gradient(ellipse 500px 500px at 100% 45%,#000 0%,#0009 30%,#0003 50%,#0000 70%)}

/* features footer */
.in-foot{display:grid;grid-template-columns:1fr 1fr}
.in-foot-label{padding:36px 32px 0}
.in-foot-label-text{display:flex;align-items:center;height:28px;font-size:15px;line-height:24px;letter-spacing:-.165px;color:#62666d}
.in-foot-content{padding:36px 32px 0}
.in-ingredients{display:grid;grid-template-columns:1fr 1fr}
.in-ing{display:flex;align-items:center;height:28px}
.in-ing-uneven{position:relative;padding-left:32px}
.in-ing-uneven::before{content:"";position:absolute;left:0;top:0;bottom:0;width:1px;background:rgba(255,255,255,.08)}
.in-ing-btn{padding:0;border:0;background:none;font-size:13.3333px;color:#fff;cursor:pointer}
.in-ing-link{display:inline-block;font-size:15px;line-height:24px;letter-spacing:-.165px;color:#8a8f98;transition:filter .16s cubic-bezier(.25,.46,.45,.94),transform .16s cubic-bezier(.25,.46,.45,.94),color .16s cubic-bezier(.25,.46,.45,.94)}
.in-ing-plus{margin-left:4px;font-size:18px;line-height:28.8px;color:#62666d}
/* TODO(spec): hover state guessed */
.in-ing-btn:hover .in-ing-link{color:#f7f8f8}

@media (max-width:1280px){
  .in-gap-top{height:128px}
}
@media (max-width:1024px){
  .in-wrap{padding:0 28px}
  .in-header{grid-template-columns:1fr;padding-bottom:64px}
  .in-title-wrap{padding:0 8px}
  .in-title{font-size:40px;line-height:44px;letter-spacing:-.88px}
  .in-desc-wrap{padding:0 8px;margin-top:32px}
  .in-desc{margin-top:0;max-width:475px;font-size:20px;line-height:26.6px;letter-spacing:-.24px}
  .in-action-wrap{margin-top:40px}
  .in-chat-wrap{top:-16px;left:24px}
  .in-foot{grid-template-columns:1fr}
  .in-foot-label{padding:36px 8px 0}
  .in-foot-content{padding:36px 8px 0}
}
@media (max-width:640px){
  .in-gap-top{height:80px}
  .in-wrap{padding:0 16px}
  .in-inner{display:flex;flex-direction:column-reverse;padding:0}
  .in-header{padding:40px 0 48px}
  .in-title-wrap{margin-left:-1px}
  .in-title{font-size:24px;line-height:31.92px;letter-spacing:-.288px}
  .in-desc-wrap{margin-top:24px}
  .in-desc{max-width:none;font-size:15px;line-height:24px;letter-spacing:-.165px;color:#8a8f98}
  .in-action-wrap{margin-top:24px}
  .in-board-wrap,.in-foot,.in-hide-m{display:none}
  .in-ill-sp{display:block;height:12px}
  .in-chat-wrap{position:relative;top:0;left:0;width:100%;height:300px;transform:none;display:flex;align-items:flex-end;
    -webkit-mask-image:linear-gradient(to bottom,transparent 0%,#000 30%);mask-image:linear-gradient(to bottom,transparent 0%,#000 30%)}
  .in-chat{flex:none;width:100%;height:513px;padding-bottom:10px}
  .in-msgs{gap:24px;padding:26px 16px 28px}
  .in-msg{gap:12px}
  .in-msg-name{font-size:12px;line-height:19.2px;letter-spacing:-.132px}
  .in-msg-time{font-size:11px;line-height:17.6px}
  .in-msg-text{font-size:12px;line-height:19.2px;letter-spacing:-.048px}
  .in-input{height:116px;margin:0 8px;padding:12px}
  .in-textarea{height:49px;font-size:13px;line-height:19.5px}
  .in-mention,.in-typed{font-size:12px;line-height:19.2px}
  .in-attach{width:28px;height:28px}
  .in-ibtn{width:24px;height:24px}
  .in-toolbar{height:28px}
  .in-send{transform:scale(.9)}
}
@media (prefers-reduced-motion:reduce){
  .in-cursor{animation:none}
}
`;
