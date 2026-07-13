import { useEffect, useRef, useState } from "react";
import Jellyfish from "@/components/works/Jellyfish";
import Bubble, { BUBBLE_WIDTH, BUBBLE_HEIGHT, type Pos } from "@/components/works/Bubble";
import type { Work } from "@/lib/types/work";

type Props = {
  work: Work;
  index: number;
};

const HOVER_DELAY_MS = 3000;
const SIDE_GAP = 110;
// jelly-info(title/日付)はカード上端からこの高さ付近に表示されている
const INFO_CENTER_OFFSET = 65;

// Jellyfish(クラゲの見た目)とBubble(ホバー時の泡)を対等に並べ、
// ホバー状態・タイマー・位置計算(スクロール追従含む)だけをここで管理する
const WorkContainer = ({ work, index }: Props): React.ReactElement => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const openRightRef = useRef(true);

  const computeTopLeft = (rect: DOMRect, openRight: boolean) => ({
    top: rect.top + INFO_CENTER_OFFSET - BUBBLE_HEIGHT / 2,
    left: openRight ? rect.right + SIDE_GAP : rect.left - SIDE_GAP - BUBBLE_WIDTH,
  });

  const handleEnter = () => {
    timerRef.current = setTimeout(() => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;

      // 画面中央より左のカードは右へ、右のカードは左へ開く(画面外はみ出し防止)
      const cardCenterX = rect.left + rect.width / 2;
      const openRight = cardCenterX <= window.innerWidth / 2;
      openRightRef.current = openRight;
      const { top, left } = computeTopLeft(rect, openRight);
      const sinkY = window.innerHeight - top + 60; // 画面下(さらに少し外)からスタート

      setPos({ top, left, sinkY, openRight });
      setVisible(true);
    }, HOVER_DELAY_MS);
  };

  const handleLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  // 表示中(浮上〜着地後のidle bob含む)はスクロール・リサイズに追従してクラゲの隣に留まる
  useEffect(() => {
    if (!pos) return;
    const reposition = () => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const { top, left } = computeTopLeft(rect, openRightRef.current);
      setPos((prev) => (prev ? { ...prev, top, left } : prev));
    };
    window.addEventListener("scroll", reposition, { passive: true });
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition);
      window.removeEventListener("resize", reposition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!pos]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ display: "inline-flex" }}
    >
      {pos && <Bubble work={work} index={index} visible={visible} pos={pos} />}
      <Jellyfish work={work} index={index} />
    </div>
  );
};

export default WorkContainer;
