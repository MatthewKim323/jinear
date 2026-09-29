"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

/*
 * Planning and monitoring: feature block (header, roadmap timeline + cycle time
 * scatter mockup, feature list). All numbers come from the capture layout at
 * 1440 / 1024 / 810 / 390.
 */

// Scatter points per month cluster, in plot coordinates (viewBox 1 0.5 825 400).
const DOTS = [
  "82,290 81,209 77,297 95,285 95,313 96,263 101,281 77,294 86,317 92,329 102,317 76,352 84,300 93,344 77,337 93,252 85,260 83,233 74,245 88,295 64,298 82,278 96,366 80,305 92,266 92,217 83,344 88,302 98,385 77,288 74,307 70,248 95,274 84,236 93,241 82,314 74,323 89,270 101,313 79,251 94,347 80,322 78,260 95,278 76,246 68,287 76,256 69,273 99,200 95,365 83,120 75,293 67,208 86,144 99,133 89,292 86,198 90,184 76,181 66,227 96,261 77,253 94,176 89,170 95,277 84,273 72,253 94,225 92,167 79,232 71,220 90,183 86,167 83,303 85,179 82,231 78,158 59,209 85,172 82,144 69,153 78,217 74,265 71,229 85,171 89,295 87,266 96,228 96,211 97,270 79,228 90,163 79,210 78,244 91,201 73,192 85,246 100,180 98,220 83,228",
  "252,372 255,312 239,365 245,196 256,318 225,342 242,341 226,223 237,333 259,289 224,329 259,342 242,292 253,243 250,270 233,282 256,286 237,333 248,314 248,282 264,302 253,319 258,305 226,301 239,287 253,325 260,250 249,313 236,348 271,309 240,300 238,351 234,298 254,310 246,290 246,305 243,286 249,258 248,238 251,270 243,305 241,371 227,280 239,331 243,339 228,311 246,281 245,316 227,328 241,238 251,270 242,266 240,98 239,87 234,105 251,114 250,97 232,107 254,129 259,98 253,106 243,101 239,97 246,122 241,82 232,114 233,122 246,88 246,104",
  "409,286 414,281 413,340 411,223 404,292 425,319 413,300 410,342 405,314 409,312 427,348 429,311 410,314 407,329 420,319 424,331 404,271 418,325 406,265 416,370 435,324 424,333 421,275 402,270 406,302 415,264 401,318 414,307 417,235 400,275 405,312 436,258 415,297 414,351 407,284 417,287 403,366 423,314 404,348 421,275 406,285 423,251 417,366 411,305 412,324 413,324 420,346 405,297 409,301 418,234 411,320 399,310 405,202 418,206 413,203 414,208 410,202 428,202 422,200 433,186 423,196 418,210 413,204 409,202 422,200 416,195 422,198 413,201 422,209 412,203 420,211 418,198 426,90 420,143 415,145 431,137 419,173 417,156 410,129 426,140 412,177 424,149 424,180 412,221 395,142 398,133 407,111 423,229 431,192 436,153 430,182 420,75 411,128 420,97 400,92 416,170 433,178 395,195 425,93 434,171 418,94 411,90 417,115 426,125 419,144 414,68 415,181 405,153 407,192 405,131 422,138 408,62 413,95 438,105 429,121 420,184 398,183 421,177 417,139 407,157 418,139 416,145 423,213 412,183",
  "590,339 587,279 566,331 586,333 563,232 558,240 577,246 587,292 577,219 594,287 567,265 579,311 576,319 560,292 556,304 588,263 587,290 574,174 562,352 592,262 575,213 564,191 570,285 569,227 582,288 578,273 564,220 570,272 593,283 571,208 566,284 596,298 563,278 577,306 555,276 580,166 578,294 578,229 579,245 562,286 569,225 579,256 566,260 574,270 568,228 580,341 582,305 579,314 579,253 573,359 590,244 569,101 569,154 578,152 566,76 582,121 574,144 586,106 583,127 593,138 558,177 574,126 578,154 573,106 562,150 586,114 584,123 577,159 558,135 584,150 570,92 585,154 577,103 580,112 580,141 576,141",
  "759,105 749,126 723,91 735,130 742,146 749,45 748,88 742,38 746,94 730,178 742,64 730,72 729,81 722,107 738,106 734,88 756,92 735,175 734,79 750,63 736,104 731,43 731,115 746,30 744,106 738,154 757,72 743,134 747,150 721,164 738,42 732,67 735,82 735,63 734,49 741,108 752,158 717,81 744,7 754,100 757,62 725,7 718,84 743,151 755,82 740,87 750,137 732,133 756,145 750,14 724,141 754,42 724,283 736,264 725,262 719,291 733,314 751,300 722,248 742,237 752,272 748,260 736,269 739,273 742,316 747,291 738,313 729,254 752,286",
];

const DAYS = [2, 9, 16, 23, 6, 13, 20, 27, 4, 11, 18, 25, 1, 8, 15, 22, 6, 13, 20, 27, 3, 10, 17, 24, 7, 14, 21, 28];
const MONTHS = ["MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP"];
const CHART_MONTHS = ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026"];
const FEATURES = ["Projects", "Documents", "Pulse", "Initiatives", "Visual planning", "Insights"];

const RED = "#eb5757";
const BLUE = "rgb(33, 179, 255)";

type Marker = { left: number; kind: "dot" | "planned"; color: string };
type Row = {
  id: string;
  left: number;
  top: number;
  width: number;
  icon: keyof typeof ICONS;
  iconColor: string;
  name: string;
  status: "risk" | "track";
  solid: number;
  tail?: { width: number; accent: string; tint: string };
  markers: Marker[];
  labels: { left: number; text: string }[];
};

const Q = "var(--color-text-quaternary)";

const ROWS: Row[] = [
  {
    id: "a",
    left: 603,
    top: 0,
    width: 448,
    icon: "tools",
    iconColor: "var(--color-teal)",
    name: "UI Refresh",
    status: "risk",
    solid: 320,
    tail: { width: 128, accent: RED, tint: "rgba(235, 87, 87, 0.2)" },
    markers: [
      { left: 155, kind: "dot", color: Q },
      { left: 275, kind: "planned", color: "var(--color-red-alt)" },
    ],
    labels: [
      { left: 130, text: "Core screens" },
      { left: 265, text: "Polish" },
    ],
  },
  {
    id: "b",
    left: 692,
    top: 108,
    width: 750,
    icon: "bill",
    iconColor: "var(--color-green)",
    name: "Split fares",
    status: "track",
    solid: 519,
    tail: { width: 231, accent: BLUE, tint: "rgba(33, 179, 255, 0.2)" },
    markers: [
      { left: 156, kind: "dot", color: Q },
      { left: 475, kind: "planned", color: Q },
    ],
    labels: [
      { left: 144, text: "Internal" },
      { left: 455, text: "Public Beta" },
    ],
  },
  {
    id: "c",
    left: 1073,
    top: 216,
    width: 750,
    icon: "robot",
    iconColor: "var(--color-text-tertiary)", // TODO(spec): icon tint not in capture
    name: "Autonomy status clarity",
    status: "track",
    solid: 519,
    tail: { width: 231, accent: BLUE, tint: "rgba(33, 179, 255, 0.2)" },
    markers: [{ left: 212, kind: "planned", color: Q }],
    labels: [{ left: 205, text: "Alpha" }],
  },
  {
    id: "d",
    left: 401,
    top: 324,
    width: 519,
    icon: "car",
    iconColor: "var(--color-blue)", // TODO(spec): icon tint not in capture
    name: "Autonomy telemetry reliability",
    status: "track",
    solid: 519,
    markers: [
      { left: 165, kind: "dot", color: Q },
      { left: 445, kind: "dot", color: Q },
    ],
    labels: [
      { left: 161, text: "Beta" },
      { left: 443, text: "GA" },
    ],
  },
];

const ICONS = {
  tools: (
    <path d="m4.285 1.324 10.278 10.278a.5.5 0 0 1 0 .707l-2.431 2.432a.5.5 0 0 1-.708 0L9.8 13.116l1.166-1.166.074-.085a.832.832 0 0 0-1.251-1.092L8.623 11.94 7.58 10.896l1.167-1.165.074-.085A.832.832 0 0 0 7.570 8.554L6.403 9.719 5.36 8.677l1.166-1.166.075-.085A.832.832 0 0 0 5.35 6.334L4.184 7.5 3.142 6.458l1.166-1.166.074-.085a.832.832 0 0 0-1.251-1.092L1.965 5.281l-.819-.818a.5.5 0 0 1 0-.707l2.432-2.432a.5.5 0 0 1 .707 0m-.192 8.439 2.405 2.405-1.306 1.344c-.639.64-3.247 1.362-3.707 1.238l-.046-.02c-.275-.197.777-2.923 1.450-3.720l.076-.082zm10.430-8.264c.627.627.664 1.620.111 2.290l-.11.12-2.613 2.688L9.5 4.189l2.612-2.690a1.705 1.705 0 0 1 2.410 0" />
  ),
  bill: (
    <>
      <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 4.25C1 3.56 1.56 3 2.25 3h11.5c.69 0 1.25.56 1.25 1.25v7.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 13 1 12.44 1 11.75zm1.5 4.78V6.97A1.834 1.834 0 0 0 4 5.167V4.5h8v.667c0 .898.647 1.646 1.5 1.803v2.06c-.853.157-1.5.905-1.5 1.803v.667H4v-.667c0-.898-.647-1.646-1.5-1.803"
      />
    </>
  ),
  robot: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.999 1a1 1 0 0 1 .5 1.866V3.5a.5.5 0 0 0 .5.5h.5c1.398 0 2.097 0 2.649.229a3 3 0 0 1 1.623 1.623c.228.55.228 1.25.228 2.648s0 2.097-.229 2.648a3 3 0 0 1-1.622 1.624c-.435.18-.962.218-1.85.226a.3.3 0 0 0-.299.3v.402a.3.3 0 0 0 .3.3h.2a.5.5 0 0 1 .5.5v.3a.2.2 0 0 1-.2.2h-5.6a.2.2 0 0 1-.2-.2v-.3a.5.5 0 0 1 .5-.5h.2a.3.3 0 0 0 .3-.3v-.4a.3.3 0 0 0-.299-.301c-.888-.008-1.415-.046-1.85-.226a3 3 0 0 1-1.622-1.624c-.229-.55-.229-1.250-.229-2.648s0-2.097.229-2.648A3 3 0 0 1 3.85 4.229C4.4 4 5.1 4 6.499 4h.5a.5.5 0 0 0 .5-.5v-.634A1 1 0 0 1 7.999 1m-1.5 8c-.276 0-.507.228-.438.495a2.001 2.001 0 0 0 3.877 0C10.006 9.228 9.775 9 9.499 9zm-1.5-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2m6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
    />
  ),
  car: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 4.667A5 5 0 0 0 2.286 6H1.5a.5.5 0 0 0-.5.5 1 1 0 0 0 1 1h.003L2 7.667v2.493c0 .312.072.608.2.873V13.2c0 .28 0 .42.055.527a.5.5 0 0 0 .218.218C2.58 14 2.72 14 3 14h.4c.28 0 .42 0 .527-.055a.5.5 0 0 0 .219-.218c.054-.107.054-.247.054-.527v-1.017l.644.054c2.1.175 4.212.175 6.312 0l.644-.054V13.2c0 .28 0 .42.054.527a.5.5 0 0 0 .219.218c.107.055.247.055.527.055h.4c.28 0 .42 0 .527-.055a.5.5 0 0 0 .218-.218c.055-.107.055-.247.055-.527v-2.167c.128-.265.2-.561.2-.873V7.667q0-.084-.003-.167H14a1 1 0 0 0 1-1 .5.5 0 0 0-.5-.5h-.786A5 5 0 0 0 13 4.667L11.6 2.8A2 2 0 0 0 10 2H6a2 2 0 0 0-1.6.8zm10 3.552v.686C13 9.51 12.471 10 11.819 10h-1.582c-.234 0-.326-.281-.131-.401l2.527-1.562c.157-.097.367.007.367.182M3 8.905V8.22c0-.175.21-.279.367-.182L5.894 9.6c.195.12.103.401-.13.401H4.18C3.53 10 3 9.51 3 8.905M5.11 3.220 3.593 5.757c-.226.379-.012.89.393.94l.886.11c2.080.257 4.179.257 6.258 0l.886-.11c.406-.05.62-.561.393-.94l-1.520-2.537a.42.42 0 0 0-.455-.21 11.200 11.200 0 0 1-4.868 0 .42.42 0 0 0-.455.21"
    />
  ),
};

const STATUS_PATH = {
  risk: "M5.578 10.648a.66.66 0 0 1-.558-.186L2.999 8.441a.656.656 0 0 1 .928-.928l1.4 1.4L7.94 4.126a.656.656 0 0 1 1.04-.15L11 5.997a.656.656 0 0 1-.928.928l-1.4-1.401-2.612 4.788a.66.66 0 0 1-.482.336",
  track: "M2.904 9.01a.656.656 0 0 1-.061-.926l2.652-3.032a.656.656 0 0 1 1.04.068l1.546 2.32 2.089-2.387a.656.656 0 1 1 .987.864L8.504 8.948a.656.656 0 0 1-1.04-.068L5.92 6.561 3.83 8.948a.656.656 0 0 1-.926.062",
};
const STATUS_FILL = { risk: "#d4a600", track: "#008d2c" };

const MARKER_DOT =
  "M7.3406 2.32C7.68741 1.89333 8.31259 1.89333 8.6594 2.32L12.7903 7.402C13.0699 7.74597 13.0699 8.25403 12.7903 8.598L8.6594 13.68C8.31259 14.1067 7.68741 14.1067 7.3406 13.68L3.2097 8.598C2.9301 8.25403 2.9301 7.74597 3.2097 7.402L7.3406 2.32Z";
const MARKER_PLANNED =
  "M6.679 1.122a1.715 1.715 0 0 1 2.642 0L14.104 6.9a1.726 1.726 0 0 1 0 2.2l-4.783 5.778a1.715 1.715 0 0 1-2.642 0L1.896 9.1a1.726 1.726 0 0 1 0-2.2zm1.706 2.006a.5.5 0 0 0-.77 0L3.845 7.68a.5.5 0 0 0 0 .638l3.77 4.553a.5.5 0 0 0 .77 0l3.77-4.553a.5.5 0 0 0 0-.638z";

const PERCENTILES = [
  {
    d: "M1 129C1 129 73.531 129 150.275 129C152.635 129 154.877 127.958 156.397 126.153L175.603 103.347C177.123 101.542 179.362 100.5 181.722 100.5L314.33 100.5C317.216 100.5 319.877 102.054 321.296 104.566L340.704 138.934C342.123 141.446 344.784 143 347.67 143H481.663C482.872 143 484.065 142.726 485.153 142.199L506.597 131.801C507.685 131.274 508.878 131 510.087 131H645.835C647.642 131 649.395 130.389 650.81 129.265L671.628 112.735C673.042 111.611 674.796 111 676.602 111H826",
    stroke: "rgba(235, 87, 87, 0.6)",
  },
  {
    d: "M1 190C1 190 73.9491 190 150.938 190C152.908 190 154.811 190.727 156.279 192.041L175.721 209.459C177.189 210.773 179.089 211.5 181.059 211.5H316.904C318.278 211.5 319.629 211.146 320.826 210.473L341.174 199.027C342.371 198.354 343.722 198 345.096 198H479.428C481.987 198 484.391 199.223 485.896 201.292L505.854 228.708C507.359 230.777 509.763 232 512.322 232H647.49C648.569 232 649.637 231.782 650.629 231.358L671.058 222.642C672.051 222.218 673.119 222 674.198 222H826",
    stroke: "rgba(252, 120, 64, 0.6)",
  },
  {
    d: "M1 217C1 217 72.9694 217 149.382 217C152.238 217 154.881 218.523 156.31 220.995L175.69 254.505C177.119 256.977 179.759 258.5 182.615 258.5H314.963C317.502 258.5 319.89 259.705 321.398 261.748L340.602 287.752C342.11 289.795 344.498 291 347.037 291H479.574C482.05 291 484.387 289.853 485.902 287.894L505.848 262.106C507.363 260.147 509.7 259 512.176 259H647.13C648.44 259 649.73 258.678 650.887 258.063L671.801 246.937C672.958 246.322 674.248 246 675.558 246H826",
    stroke: "rgba(138, 143, 152, 0.6)",
  },
];

const TAIL_PATH = "M 0,0.25 L 96,0.25 Q 99.75,0.25 99.75,4 L 99.75,20 Q 99.75,23.75 96,23.75 L 0,23.75";

// TODO(spec): no motion spec for this section yet; simple reveal values are guesses.
const REVEAL = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

function RoadmapRow({ row }: { row: Row }) {
  return (
    <div className="pn-row" style={{ left: row.left, top: row.top, width: row.width }}>
      <div className="pn-rowlabel">
        <span className="pn-ico">
          <svg width="14" height="14" viewBox="0 0 16 16" fill={row.iconColor} aria-hidden="true">
            {ICONS[row.icon]}
          </svg>
        </span>
        <span className="pn-rowname">{row.name}</span>
        <span className="pn-ico">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <g fill={STATUS_FILL[row.status]}>
              <rect width="14" height="14" rx="7" opacity="0.2" />
              <path fillRule="evenodd" clipRule="evenodd" d={STATUS_PATH[row.status]} />
            </g>
          </svg>
        </span>
      </div>
      <div className="pn-blocks">
        <div className={row.tail ? "pn-solid pn-solid-tail" : "pn-solid"} style={{ width: row.solid }}>
          {row.markers.map((m) => (
            <span key={m.left} className="pn-marker" style={{ left: m.left, color: m.color }}>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                {m.kind === "dot" ? (
                  <path d={MARKER_DOT} />
                ) : (
                  <path fillRule="evenodd" clipRule="evenodd" d={MARKER_PLANNED} />
                )}
              </svg>
            </span>
          ))}
        </div>
        {row.tail && (
          <div
            className="pn-tail"
            style={{
              width: row.tail.width,
              backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, ${row.tail.tint} 100%), linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
            }}
          >
            <svg className="pn-tailline" preserveAspectRatio="none" viewBox="0 0 100 24" aria-hidden="true">
              <defs>
                <linearGradient id={`pn-tail-g-${row.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.05" />
                  <stop offset="15%" stopColor="white" stopOpacity="1" />
                </linearGradient>
                <mask id={`pn-tail-m-${row.id}`}>
                  <rect x="0" y="0" width="100" height="24" fill={`url(#pn-tail-g-${row.id})`} />
                </mask>
              </defs>
              <path
                d={TAIL_PATH}
                fill="none"
                stroke={row.tail.accent}
                strokeWidth="1"
                strokeDasharray="4 3"
                vectorEffect="non-scaling-stroke"
                mask={`url(#pn-tail-m-${row.id})`}
              />
            </svg>
          </div>
        )}
      </div>
      <div className="pn-miles">
        {row.labels.map((l) => (
          <div key={l.text} className="pn-mile" style={{ left: l.left }}>
            <span>{l.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Scatter() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  let i = 0;
  return (
    <svg
      ref={ref}
      className={inView ? "pn-dots pn-dots-in" : "pn-dots"}
      viewBox="1 0.5 825 400"
      width="825"
      height="400"
      aria-hidden="true"
    >
      {DOTS.map((cluster, c) => (
        <g key={c} className="pn-cluster">
          {cluster.split(" ").map((pt) => {
            const [cx, cy] = pt.split(",");
            const idx = i++;
            return (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r="3.5"
                style={{ transitionDelay: `${(idx % 120) * 4}ms` }} // TODO(spec)
              />
            );
          })}
        </g>
      ))}
      {PERCENTILES.map((p) => (
        <path key={p.stroke} className="pn-pct" d={p.d} fill="none" stroke={p.stroke} strokeWidth="1" />
      ))}
    </svg>
  );
}

export function Planning() {
  return (
    <section data-section="planning" className="pn-root">
      <style>{CSS}</style>
      <div className="pn-divider" aria-hidden="true">
        <div className="pn-divider-shadow" />
        <div className="pn-divider-line" />
      </div>
      <div className="pn-wrap">
        <div className="pn-sec">
          <motion.div className="pn-header" {...REVEAL}>
            <div className="pn-titlebox">
              <h2 className="pn-title">
                Planning
                <br />
                and monitoring
              </h2>
            </div>
            <div className="pn-descbox">
              <p className="pn-desc">
                Plan and navigate from idea to launch. Align your team with product initiatives, strategic roadmaps,
                and clear, up-to-date PRDs.
              </p>
              <div className="pn-action">
                <a href="/plan" className="pn-link">
                  <span className="pn-link-text">Learn more</span>
                  <span className="pn-link-arrow">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          <div className="pn-ill">
            <div className="pn-mobile">
              <img src="/img/img-f19ac0a534.svg" alt="" width={390} height={312} loading="lazy" decoding="async" />
            </div>
            <motion.div className="pn-stage" {...REVEAL}>
              <div className="pn-clip">
                <div className="pn-container">
                  <div className="pn-panel">
                    <div className="pn-tl">
                      <div className="pn-gridlines">
                        {Array.from({ length: 11 }, (_, k) => (
                          <span key={k} className="pn-gridline" style={{ left: k * 160 }} />
                        ))}
                      </div>
                      <div className="pn-scale">
                        <div className="pn-months">
                          {MONTHS.map((m) => (
                            <div key={m} className="pn-month">
                              <span>{m}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          {DAYS.map((_, k) => (
                            <span key={k} className="pn-tick" style={{ left: 10.5 + k * 40 }} />
                          ))}
                        </div>
                        <div className="pn-days">
                          {DAYS.map((d, k) => (
                            <div key={k} className="pn-day">
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pn-roadmap">
                        <svg className="pn-connector" width="153" height="109" viewBox="0 0 153 109" fill="none" aria-hidden="true">
                          <path
                            d="M0 108.5C28.1329 108.5 54.4078 94.452 70.0323 71.0569L97.2461 30.3091C109.685 11.6838 130.603 0.5 153 0.5"
                            stroke="url(#pn-connector-g)"
                          />
                          <defs>
                            <linearGradient id="pn-connector-g" x1="153" y1="54.5" x2="0" y2="54.5" gradientUnits="userSpaceOnUse">
                              <stop stopColor="white" stopOpacity="0.1" />
                              <stop offset="1" stopColor="white" stopOpacity="0.3" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {ROWS.map((r) => (
                          <RoadmapRow key={r.id} row={r} />
                        ))}
                      </div>
                    </div>
                    <div className="pn-grain" />
                  </div>
                </div>
              </div>
              <div className="pn-box">
                <div className="pn-boxfade">
                <div className="pn-shine" />
                <header className="pn-boxhead">
                  <span className="pn-boxtitle">Cycle time by agent</span>
                </header>
                <div className="pn-graph">
                  <div className="pn-plot">
                    {[0, 80, 160, 240, 320].map((t) => (
                      <span key={t} className="pn-hline" style={{ top: t }} />
                    ))}
                    <span className="pn-hline pn-hline-base" style={{ top: 400 }} />
                    <Scatter />
                  </div>
                  <div className="pn-key">
                    {CHART_MONTHS.map((m) => (
                      <div key={m} className="pn-keylabel">
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="pn-footer">
            <div className="pn-footlabel">
              <span className="pn-footlabel-text">
                <span>Features</span>
              </span>
            </div>
            <div className="pn-footcontent">
              <div className="pn-ingredients">
                {FEATURES.map((f, k) => (
                  <div key={f} className={k % 2 ? "pn-ing pn-ing-uneven" : "pn-ing"}>
                    <button type="button" className="pn-ingbtn">
                      <span className="pn-ingtext">
                        {f} <span className="pn-plus">+</span>
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

const CSS = `
.pn-root { --pn-gutter: 48px; --pn-inset: 32px; --pn-box-right: 32px; position: relative; width: 100%; }
.pn-divider { position: relative; width: 100%; height: 2px; }
.pn-divider-shadow { height: 1px; background: #000; }
.pn-divider-line { height: 1px; background: rgba(255, 255, 255, 0.08); }
.pn-wrap { box-sizing: border-box; max-width: calc(1344px + var(--pn-gutter) * 2); margin: 0 auto; padding: 8px var(--pn-gutter) 0; }
.pn-sec { padding: 128px 0; }

.pn-header { display: grid; grid-template-columns: 1fr 1fr; align-items: start; padding-bottom: 96px; }
.pn-titlebox { padding: 0 var(--pn-inset); margin-left: -2px; }
.pn-title { margin: 0; max-width: 18ch; font-size: 48px; line-height: 48px; font-weight: 510; letter-spacing: -1.056px; color: var(--color-text-primary); text-box: trim-both cap alphabetic; }
.pn-descbox { display: grid; grid-template-columns: minmax(0, 1fr); padding: 0 var(--pn-inset); }
.pn-desc { margin: 1.7px 0 0; max-width: 23.6em; font-size: 24px; line-height: 31.92px; letter-spacing: -0.288px; color: var(--color-text-secondary); text-box: trim-both cap alphabetic; }
.pn-action { margin-top: 48px; height: 25px; }
.pn-link { display: inline-block; height: 25px; text-decoration: none; }
.pn-link-text, .pn-link-arrow { display: inline-block; margin-top: 1px; font-size: 15px; line-height: 24px; letter-spacing: -0.165px; vertical-align: top; }
.pn-link-text { color: var(--color-text-tertiary); transition: color 0.1s; }
.pn-link-arrow { margin-left: 6px; color: var(--color-text-quaternary); transition: color 0.1s, transform 0.16s; }
.pn-link:hover .pn-link-text { color: var(--color-text-primary); }
.pn-link:hover .pn-link-arrow { color: var(--color-text-primary); transform: translateX(2px); } /* TODO(spec) */

.pn-ill { position: relative; }
.pn-mobile { display: none; }
.pn-stage { position: relative; padding-top: 24px; margin-top: -32px; margin-left: calc(var(--pn-gutter) * -1); }
.pn-clip {
  position: relative; overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent 60px, #000 420px), linear-gradient(to bottom, #000 300px, transparent 590px);
  mask-image: linear-gradient(to right, transparent 60px, #000 420px), linear-gradient(to bottom, #000 300px, transparent 590px);
  -webkit-mask-composite: source-in; mask-composite: intersect;
}
.pn-container { position: relative; padding-top: 9px; }
.pn-panel { position: relative; height: 600px; overflow: hidden; background: var(--color-bg-level-1); box-shadow: inset 0 0 0 1px #23252a; }
.pn-tl { position: relative; height: 600px; transform: translateX(var(--pn-gutter)); }
.pn-gridlines { position: absolute; left: 16px; top: 0; width: 1600px; height: 600px; }
.pn-gridline { position: absolute; top: 0; width: 1px; height: 600px; background-image: repeating-linear-gradient(rgba(255, 255, 255, 0.08) 0px, rgba(255, 255, 255, 0.08) 3px, transparent 3px, transparent 6px); }
.pn-scale { position: absolute; left: 46px; top: 10px; width: 1540px; height: 42px; }
.pn-months { position: absolute; left: 230px; top: 0; display: flex; }
.pn-month { display: grid; grid-template-columns: 160px; align-items: center; height: 16px; }
.pn-month span, .pn-day span { font-size: 12px; line-height: 16px; text-align: center; }
.pn-month span { color: var(--color-text-tertiary); }
.pn-tick { position: absolute; top: 6px; width: 1px; height: 4px; background: rgba(255, 255, 255, 0.08); }
.pn-days { position: absolute; left: 0; top: 26px; display: flex; gap: 20px; }
.pn-day { display: grid; grid-template-columns: 20px; align-items: center; height: 16px; }
.pn-day span { color: var(--color-text-quaternary); white-space: nowrap; }
.pn-roadmap { position: absolute; left: -389px; top: 116px; width: 1439px; height: 484px; opacity: 0.8; }
.pn-connector { position: absolute; left: 1073px; top: 364px; }
.pn-row { position: absolute; height: 76px; }
.pn-rowlabel { display: flex; align-items: center; gap: 5px; height: 20px; padding: 0 4px; }
.pn-ico { display: grid; grid-template-columns: 14px; align-items: center; width: 14px; height: 14px; flex: none; }
.pn-ico svg { display: block; }
.pn-rowname { font-size: 13px; line-height: 20px; letter-spacing: -0.13px; color: var(--color-text-secondary); white-space: nowrap; }
.pn-blocks { position: absolute; left: 0; top: 28px; display: flex; align-items: center; height: 24px; filter: drop-shadow(rgba(0, 0, 0, 0.15) 0 0 8px); }
.pn-solid { position: relative; box-sizing: border-box; height: 24px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 4px; box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.2); }
.pn-solid-tail { border-radius: 4px 0 0 4px; }
.pn-marker { position: absolute; top: 7px; display: grid; width: 10px; height: 10px; }
.pn-marker svg { display: block; }
.pn-tail { position: relative; height: 24px; border-radius: 0 4px 4px 0; box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.2); overflow: hidden; }
.pn-tailline { position: absolute; inset: 0; width: 100%; height: 100%; }
.pn-miles { position: absolute; left: 0; right: 0; top: 60px; height: 16px; }
.pn-mile { position: absolute; top: 0; height: 24px; }
.pn-mile span { display: block; margin-top: 8px; font-size: 10px; line-height: 12px; letter-spacing: -0.15px; color: var(--color-text-quaternary); white-space: nowrap; }
.pn-grain { position: absolute; left: 0; right: 0; top: 1px; bottom: 0; z-index: 2; opacity: 0.25; mix-blend-mode: overlay; background-image: url(/img/img-f77abaca6c.webp); background-size: 256px 256px; pointer-events: none; }

.pn-box {
  position: absolute; top: 0; right: var(--pn-box-right); width: 672px; height: 632px; box-sizing: border-box;
  transform: translateX(32px); border-radius: 12px; overflow: hidden; background: var(--color-bg-primary);
}
.pn-box::before {
  -webkit-mask-image: var(--pn-box-mask-x), var(--pn-box-mask-y);
  mask-image: var(--pn-box-mask-x), var(--pn-box-mask-y);
  -webkit-mask-composite: source-in; mask-composite: intersect;
}
.pn-boxfade {
  -webkit-mask-image: linear-gradient(to right, #000 45%, rgba(0,0,0,0.35) 80%, transparent 100%), linear-gradient(to bottom, #000 440px, rgba(0,0,0,0.45) 520px, transparent 620px);
  mask-image: linear-gradient(to right, #000 45%, rgba(0,0,0,0.35) 80%, transparent 100%), linear-gradient(to bottom, #000 440px, rgba(0,0,0,0.45) 520px, transparent 620px);
  -webkit-mask-composite: source-in; mask-composite: intersect;
}
.pn-box {
  --pn-box-mask-x: linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.62) 20%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.28) 62%, rgba(0,0,0,0.1) 90%, transparent 100%);
  --pn-box-mask-y: linear-gradient(to bottom, #000 250px, rgba(0,0,0,0.62) 425px, rgba(0,0,0,0.37) 485px, rgba(0,0,0,0.2) 545px, transparent 610px);
}
.pn-box::before { content: ""; position: absolute; inset: 0; background: radial-gradient(120% 90% at 0% 0%, #202122 0%, #1c1d1e 45%, #161718 100%); }
.pn-boxfade { position: absolute; inset: 0; }
.pn-shine { position: absolute; inset: 0; z-index: 1; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08); pointer-events: none; }
.pn-boxhead { position: relative; display: flex; align-items: center; height: 56px; box-sizing: border-box; padding: 24px 32px 0; }
.pn-boxtitle { font-size: 14px; line-height: 32px; font-weight: 510; letter-spacing: -0.182px; color: var(--color-text-secondary); opacity: 0.8; white-space: nowrap; }
.pn-graph { position: relative; width: 825px; margin: 24px 0 0 32px; opacity: 0.8; }
.pn-plot { position: relative; height: 400px; }
.pn-hline { position: absolute; left: 0; width: 825px; height: 1px; background-image: repeating-linear-gradient(to right, #2e2e32 0px, #2e2e32 2px, transparent 2px, transparent 6px); }
.pn-hline-base { background: #2e2e32; }
.pn-dots { position: absolute; left: 0; top: 0; overflow: visible; }
.pn-cluster { filter: drop-shadow(rgba(240, 191, 0, 0.1) 0 0 32px); }
.pn-dots circle { fill: rgb(0, 205, 223); stroke: #08090a; stroke-width: 1; opacity: 0; transform: scale(0.4); transform-box: fill-box; transform-origin: center; transition: opacity 0.42s ease-out, transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94); } /* TODO(spec) */
.pn-dots-in circle { opacity: 1; transform: none; }
.pn-pct { filter: drop-shadow(#08090a 0 0 1px); }
.pn-key { display: flex; margin-top: 24px; height: 16px; }
.pn-keylabel { width: 165px; flex: none; text-align: center; }
.pn-keylabel span { font-size: 12px; line-height: 16px; color: var(--color-text-tertiary); }

.pn-footer { display: grid; grid-template-columns: 1fr 1fr; }
.pn-footlabel { padding: 36px var(--pn-inset) 0; }
.pn-footlabel-text { display: flex; align-items: center; height: 28px; }
.pn-footlabel-text span { font-size: 15px; line-height: 24px; letter-spacing: -0.165px; color: var(--color-text-quaternary); }
.pn-footcontent { padding: 36px var(--pn-inset) 0; }
.pn-ingredients { display: grid; grid-template-columns: 1fr 1fr; }
.pn-ing { position: relative; display: flex; align-items: center; height: 28px; }
.pn-ing-uneven { padding-left: 32px; }
.pn-ing-uneven::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: rgba(255, 255, 255, 0.08); }
.pn-ingbtn { appearance: none; background: none; border: 0; padding: 0; margin: 0; cursor: pointer; font: inherit; font-size: 13.3333px; line-height: normal; color: inherit; }
.pn-ingtext { font-size: 15px; line-height: 24px; letter-spacing: -0.165px; color: var(--color-text-tertiary); transition: color 0.1s; }
.pn-plus { margin-left: 4px; font-size: 18px; line-height: 28.8px; color: var(--color-text-quaternary); transition: color 0.1s; }
.pn-ingbtn:hover .pn-ingtext, .pn-ingbtn:hover .pn-plus { color: var(--color-text-primary); }

@media (max-width: 1024px) {
  .pn-root { --pn-gutter: 28px; --pn-inset: 8px; --pn-box-right: 24px; }
  .pn-header { grid-template-columns: minmax(0, 1fr); padding-bottom: 64px; }
  .pn-title { font-size: 40px; line-height: 44px; letter-spacing: -0.88px; }
  .pn-descbox { margin-top: 32px; }
  .pn-desc { margin-top: 0; font-size: 20px; line-height: 26.6px; letter-spacing: -0.24px; }
  .pn-action { margin-top: 40px; }
  .pn-footer { grid-template-columns: minmax(0, 1fr); }
  .pn-footcontent { padding-top: 0; }
  .pn-footcontent::before { content: ""; display: block; height: 36px; }
}

@media (max-width: 640px) {
  .pn-root { --pn-gutter: 16px; }
  .pn-sec { display: flex; flex-direction: column-reverse; padding: 0; }
  .pn-header { padding: 40px 0 48px; }
  .pn-titlebox { margin-left: -1px; }
  .pn-title { font-size: 24px; line-height: 31.92px; letter-spacing: -0.288px; }
  .pn-descbox { margin-top: 24px; }
  .pn-desc { font-size: 15px; line-height: 24px; letter-spacing: -0.165px; color: var(--color-text-tertiary); }
  .pn-action { margin-top: 24px; }
  .pn-stage, .pn-footer { display: none; }
  .pn-mobile { display: block; margin: 0 calc(var(--pn-gutter) * -1); padding-top: 16px; height: 306px; box-sizing: border-box; }
  .pn-mobile img { display: block; width: 100%; height: auto; }
}
`;
