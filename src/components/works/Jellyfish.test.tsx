import Jellyfish from "@/components/works/Jellyfish";
import type { Work } from "@/lib/types/work";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

// テスト環境では Next.js の RouterContext を再現できないため
// useRouter() を push のみを実装したモックに差し替える
const push = vi.fn();
vi.mock("next/router", () => ({
  useRouter: () => ({ push }),
}));

const buildWork = (link_url: string): Work => ({
  id: 1,
  title: "dummy",
  image_url: "/works/1.png",
  description: "",
  created_at: "2026-01-01",
  link_url,
});

describe("Jellyfish", () => {
  it("内部リンクの場合、同一タブで遷移する", async () => {
    // Arrange
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const { container } = render(<Jellyfish work={buildWork("/about")} index={0} />);

    // Act
    // .jelly-cardはrole/ラベルを持たないdivのため、クラス名で指定
    await userEvent.click(container.querySelector(".jelly-card")!);

    // Assert
    expect(push).toHaveBeenCalledWith("/about");
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("外部リンクの場合、新規タブで開く", async () => {
    // Arrange
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const { container } = render(<Jellyfish work={buildWork("https://example.com")} index={0} />);

    // Act
    // .jelly-cardはrole/ラベルを持たないdivのため、クラス名で指定
    await userEvent.click(container.querySelector(".jelly-card")!);

    // Assert
    expect(push).not.toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledWith("https://example.com", "_blank", "noopener");
  });
});
