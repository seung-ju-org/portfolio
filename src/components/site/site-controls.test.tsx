import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeroScene } from "./hero-scene";
import { CopyEmail, localePath, pagePath, ProjectFilter } from "./site-controls";

describe("site controls", () => {
  it("builds trailing-slash locale routes without protocol-relative paths", () => {
    expect(pagePath("ko", "about")).toBe("/about/");
    expect(pagePath("en", "home")).toBe("/en/");
    expect(localePath("ja", "/en/portfolio/")).toBe("/ja/portfolio/");
    expect(localePath("ko", "/ja/contact/")).toBe("/contact/");
  });
  it("filters projects using accessible pressed state", () => {
    render(
      <ProjectFilter
        locale="en"
        projects={[
          {
            id: "one",
            title: "One",
            company: "A",
            period: "2025",
            role: "Engineer",
            achievements: ["Done"],
            stack: "TS"
          },
          {
            id: "two",
            title: "Two",
            company: "B",
            period: "2024",
            role: "Engineer",
            achievements: ["Done"],
            stack: "TS"
          }
        ]}
      />
    );
    fireEvent.change(screen.getByLabelText("Filter work by company"), { target: { value: "A" } });
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.queryByText("Two")).not.toBeInTheDocument();
  });
  it("keeps fallback semantics and announces copied email", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    });
    class Observer {
      observe = vi.fn();
      disconnect = vi.fn();
    }
    global.IntersectionObserver = Observer as never;
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    const { container } = render(
      <>
        <HeroScene />
        <CopyEmail email="contact@example.com" locale="en" />
      </>
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Copy address" }));
    expect(await screen.findByText("Email address copied.")).toBeInTheDocument();
  });

  it("does not schedule empty frames across motion and visibility changes, and cleans up", () => {
    let reduced = true;
    let motionChange: (() => void) | undefined;
    const addMotion = vi.fn((_name: string, handler: () => void) => {
      motionChange = handler;
    });
    const removeMotion = vi.fn();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn(() => ({
        get matches() {
          return reduced;
        },
        addEventListener: addMotion,
        removeEventListener: removeMotion
      }))
    });
    const observe = vi.fn(),
      disconnect = vi.fn();
    class Observer {
      observe = observe;
      disconnect = disconnect;
    }
    global.IntersectionObserver = Observer as never;
    const request = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(9);
    const cancel = vi.spyOn(window, "cancelAnimationFrame");
    const visibilityAdd = vi.spyOn(document, "addEventListener");
    const { unmount } = render(<HeroScene />);
    reduced = false;
    motionChange?.();
    document.dispatchEvent(new Event("visibilitychange"));
    expect(request).not.toHaveBeenCalled();
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(removeMotion).toHaveBeenCalledOnce();
    expect(visibilityAdd).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
    expect(cancel).toHaveBeenCalled();
  });
});
