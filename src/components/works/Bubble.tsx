import { useEffect, useRef } from "react";
import { GLOW_COLORS } from "@/components/works/Jellyfish";
import type { Work } from "@/lib/types/work";

export const BUBBLE_WIDTH = 315;
export const BUBBLE_HEIGHT = 315;

const RISE_DURATION_MS = 15000;
// 確定: コントラスト+明度を落として「落ち着いた静かな世界観」に寄せる(B+C案)
const IMG_FILTER = "grayscale(0.75) contrast(0.8) brightness(0.62)";
const IDLE_BOB_DURATION_MS = 4200;
const IDLE_BOB_AMPLITUDE = 10;

const toSoftGlow = (rgba: string) => rgba.replace(/[\d.]+\)$/, "0.35)");

const startIdleBob = (el: HTMLElement, delay = 0) =>
  el.animate(
    [{ transform: "translateY(0)" }, { transform: `translateY(-${IDLE_BOB_AMPLITUDE}px)` }],
    {
      duration: IDLE_BOB_DURATION_MS,
      delay,
      easing: "ease-in-out",
      iterations: Infinity,
      direction: "alternate",
    }
  );

export type Pos = { top: number; left: number; sinkY: number; openRight: boolean };

// 🫧のように主要な泡の脇に添える小さい泡のレイアウト定義(主要バブル基準の相対位置)
// dxFracは「泡カードがクラゲの右に開く(openRight)」場合の位置。
// 逆向きのときはSatelliteBubble側で左右反転する。
type SatelliteLayout = { sizeFrac: number; dxFrac: number; dyFrac: number; delay: number };

const SATELLITE: SatelliteLayout = { sizeFrac: 0.24, dxFrac: -0.16, dyFrac: 0.68, delay: 140 };

const SatelliteBubble = ({
  visible,
  mainPos,
  layout,
  glow,
  glowSoft,
}: {
  visible: boolean;
  mainPos: Pos;
  layout: SatelliteLayout;
  glow: string;
  glowSoft: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const size = BUBBLE_WIDTH * layout.sizeFrac;
  // クラゲカードが泡カードの左右どちら側にあるかに合わせて、付属バブルの位置を反転
  const dxFrac = mainPos.openRight ? layout.dxFrac : 1 - layout.dxFrac;
  const top = mainPos.top + BUBBLE_HEIGHT * layout.dyFrac - size / 2;
  const left = mainPos.left + BUBBLE_WIDTH * dxFrac - size / 2;
  const sinkY = typeof window !== "undefined" ? window.innerHeight - top + 60 : 0;

  useEffect(() => {
    if (!visible || !ref.current) return;
    const el = ref.current;
    const rise = el.animate(
      [
        { transform: `translateY(${sinkY}px) scale(0.8)`, offset: 0 },
        { transform: "translateY(-24px) scale(1.06)", offset: 0.68 },
        { transform: "translateY(12px) scale(0.96)", offset: 0.87 },
        { transform: "translateY(0px) scale(1)", offset: 1 },
      ],
      {
        duration: RISE_DURATION_MS * 0.9,
        delay: layout.delay,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );
    let idle: Animation | null = null;
    rise.finished.then(() => {
      idle = startIdleBob(el, layout.delay);
    });
    return () => {
      rise.cancel();
      idle?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 30%, ${glowSoft}, rgba(10,20,40,0.85) 75%)`,
        border: `1px solid ${glowSoft}`,
        boxShadow: `0 0 18px ${glow}`,
        opacity: visible ? 1 : 0,
        transform: `translateY(${sinkY}px) scale(0.8)`,
        transition: "opacity 1s ease",
        pointerEvents: "none",
        zIndex: 49,
      }}
    />
  );
};

type Props = {
  work: Work;
  index: number;
  visible: boolean;
  pos: Pos;
};

// 泡: ホバー後に画面下から浮上し、クラゲの隣で静止する情報バブル(付属の小さい泡込み)
const Bubble = ({ work, index, visible, pos }: Props): React.ReactElement => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const idleAnimRef = useRef<Animation | null>(null);
  const riseAnimRef = useRef<Animation | null>(null);
  const glow = GLOW_COLORS[index % GLOW_COLORS.length];
  const glowSoft = toSoftGlow(glow);

  // 上がって(オーバーシュート)→下がって(アンダーシュート)→少しだけ上がって着地、
  // 着地後はクラゲのbobと同じようにゆっくり上下し続ける
  useEffect(() => {
    if (!visible || !bubbleRef.current) return;
    const el = bubbleRef.current;
    // 短いホバーを繰り返した際に前回の浮上アニメーションが残っていたら差し替える
    riseAnimRef.current?.cancel();
    idleAnimRef.current?.cancel();
    const rise = el.animate(
      [
        { transform: `translateY(${pos.sinkY}px) scale(0.85)`, offset: 0 },
        { transform: "translateY(-48px) scale(1.05)", offset: 0.68 },
        { transform: "translateY(24px) scale(0.97)", offset: 0.87 },
        { transform: "translateY(0px) scale(1)", offset: 1 },
      ],
      {
        duration: RISE_DURATION_MS,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );
    riseAnimRef.current = rise;
    rise.finished.then(() => {
      idleAnimRef.current = startIdleBob(el);
    });
    // ホバーが外れて非表示になるだけならtransformはそのまま(着地位置)にして、
    // opacityのフェードだけで消えるようにする。rise/idleのキャンセルはアンマウント時のみ行う。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // アンマウント時のみアニメーションを破棄
  useEffect(() => {
    return () => {
      riseAnimRef.current?.cancel();
      idleAnimRef.current?.cancel();
    };
  }, []);

  return (
    <>
      <SatelliteBubble
        visible={visible}
        mainPos={pos}
        layout={SATELLITE}
        glow={glow}
        glowSoft={glowSoft}
      />
      <div
        ref={bubbleRef}
        style={{
          position: "fixed",
          top: pos.top,
          left: pos.left,
          width: BUBBLE_WIDTH,
          minHeight: BUBBLE_HEIGHT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "51px 39px",
          background: `radial-gradient(circle at 50% 30%, ${glowSoft}, rgba(10,20,40,0.85) 75%)`,
          border: `1px solid ${glowSoft}`,
          boxShadow: `0 0 30px ${glow}, 0 12px 40px rgba(0,0,0,0.5)`,
          borderRadius: "62% 38% 55% 45% / 48% 60% 40% 52%",
          opacity: visible ? 1 : 0,
          transform: `translateY(${pos.sinkY}px) scale(0.85)`,
          transition: "opacity 1s ease",
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        {/* 写真をグレースケール化し、glowカラーでデュオトーン風に色調統一 */}
        <div
          style={{
            position: "relative",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "15px",
            boxShadow: `0 0 16px ${glowSoft}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={work.image_url}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: IMG_FILTER,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: glow,
              mixBlendMode: "color",
              opacity: 0.85,
            }}
          />
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "10px",
            lineHeight: 1.5,
            padding: "0 4px",
          }}
        >
          {work.description}
        </p>
      </div>
    </>
  );
};

export default Bubble;
