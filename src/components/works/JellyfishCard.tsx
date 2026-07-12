import { useRef } from "react";
import type { Work } from "@/lib/types/work";

type Props = {
  work: Work;
  index: number;
};

const GLOW_COLORS = [
  "rgba(192,132,252,0.7)",
  "rgba(244,114,182,0.7)",
  "rgba(251,191,36,0.65)",
  "rgba(125,211,252,0.7)",
];

const BOB_TIMING = [
  { dur: "3.9s", delay: "0s" },
  { dur: "4.4s", delay: "0.7s" },
  { dur: "3.5s", delay: "1.3s" },
  { dur: "4.7s", delay: "0.4s" },
];

const JellyfishCard = ({ work, index }: Props): React.ReactElement => {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const colorIndex = index % 4;
  const { dur, delay } = BOB_TIMING[colorIndex];
  const imgOffset = -(colorIndex * 200);
  const yearMonth = work.created_at.slice(0, 7);

  const handleClick = () => {
    window.open(work.link_url, "_blank", "noopener");

    const el = hoverRef.current;
    if (!el) return;
    const isHovered = cardRef.current?.matches(":hover") ?? false;
    const baseY = isHovered ? -18 : 0;
    el.animate(
      [
        { transform: `translateY(${baseY}px) scale(1)` },
        { transform: `translateY(${baseY}px) scale(0.91)`, offset: 0.25 },
        { transform: `translateY(${baseY - 5}px) scale(1.04)`, offset: 0.65 },
        { transform: `translateY(${baseY}px) scale(1)` },
      ],
      { duration: 420, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "none" }
    );
  };

  return (
    <div ref={cardRef} className="jelly-card" onClick={handleClick}>
      <div
        ref={hoverRef}
        className="jelly-hover"
        style={{ "--glow": GLOW_COLORS[colorIndex] } as React.CSSProperties}
      >
        <div
          className="jelly-bob"
          style={{ "--dur": dur, "--delay": delay } as React.CSSProperties}
        >
          <div className="jelly-viewport">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="jelly-img"
              src="/images/jellyfish.png"
              alt=""
              draggable={false}
              style={{ left: `${imgOffset}px` }}
            />
            <div
              className="jelly-info"
              style={{
                background: "linear-gradient(transparent, rgba(2,8,24,0.88) 55%)",
                padding: "50px 14px 18px",
                pointerEvents: "none",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "12.5px", fontWeight: 500, letterSpacing: "0.3px", marginBottom: "7px" }}>
                {work.title}
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                {yearMonth}
              </p>
            </div>
            <div className="jelly-arrow" style={{ top: "12px", right: "14px", width: "22px", height: "22px" }}>
              <svg
                viewBox="0 0 10 10"
                style={{ width: "10px", height: "10px" }}
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M2 8 L8 2 M4 2 H8 V6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JellyfishCard;
