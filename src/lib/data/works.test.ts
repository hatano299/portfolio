import { describe, expect, it } from "vitest";
import works from "@/lib/data/works.json";
import { ROUTES } from "@/lib/data/routes";

describe("works.json", () => {
  it("work(/about)のタイトル、画像が正しい", () => {
    // Arrange
    const aboutWork = works.find((work) => work.link_url === ROUTES.ABOUT);

    // Assert
    expect(aboutWork).toBeDefined();
    expect(aboutWork?.title).toBe("about hatano");
    expect(aboutWork?.image_url).toBe("/favicon/apple-touch-icon.png");
  });
});
