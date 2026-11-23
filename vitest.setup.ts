import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(cleanup);

// jsdomはWeb Animations API(Element.prototype.animate)を実装していないため、
// アニメーション呼び出しが例外にならないようスタブする。
if (!Element.prototype.animate) {
  Element.prototype.animate = () =>
    ({
      finished: Promise.resolve(),
      cancel: () => {},
    }) as unknown as Animation;
}
