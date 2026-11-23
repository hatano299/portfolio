import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/pages/about";

describe("AboutPage", () => {
  it.each(["経歴", "目標"])("%s の見出しと本文が表示される", (heading) => {
    // Arrange
    render(<AboutPage />);

    // Assert
    const headingElement = screen.getByRole("heading", { name: heading });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.nextElementSibling?.textContent?.length).toBeGreaterThan(0);
  });
});
