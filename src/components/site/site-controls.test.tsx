import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeroScene } from "./hero-scene";
import { SiteMotion } from "./site-motion";
import { CopyEmail, Header, localePath, pagePath, ProjectCard, ProjectFilter } from "./site-controls";

vi.mock("next/navigation", () => ({ usePathname: () => "/en/" }));

describe("site controls", () => {
  it("builds trailing-slash locale routes without protocol-relative paths", () => {
    expect(pagePath("ko", "about")).toBe("/about/");
    expect(pagePath("en", "home")).toBe("/en/");
    expect(localePath("ja", "/en/portfolio/")).toBe("/ja/portfolio/");
    expect(localePath("ko", "/ja/contact/")).toBe("/contact/");
  });
  it("combines company and accessible category filters, and resets categories with Escape", () => {
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
            stack: "TS",
            category: "design"
          },
          {
            id: "two",
            title: "Two",
            company: "B",
            period: "2024",
            role: "Engineer",
            achievements: ["Done"],
            stack: "TS",
            category: "archive"
          }
        ]}
      />
    );
    fireEvent.change(screen.getByLabelText("Filter work by company"), { target: { value: "A" } });
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.queryByText("Two")).not.toBeInTheDocument();
    const design = screen.getByRole("button", { name: "Design" });
    fireEvent.click(design);
    expect(design).toHaveAttribute("aria-pressed", "true");
    fireEvent.keyDown(screen.getByRole("group", { name: "Work category" }), { key: "Escape" });
    expect(screen.getByRole("button", { name: "All categories" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Two")).toBeInTheDocument();
    expect(document.querySelector(".project-grid")?.hasAttribute("data-filter-transition")).toBe(true);
  });
  it("uses image semantics and keeps no-image cards editorial", () => {
    const { container, rerender } = render(
      <ProjectCard
        locale="en"
        project={{
          id: "image",
          title: "Image work",
          period: "2026",
          role: "Engineer",
          achievements: [],
          stack: "TS",
          image: {
            src: "/projects/image.webp",
            width: 1600,
            height: 900,
            alt: "Accessible project preview",
            caption: "Project interface",
            provenance: "Project archive",
            sourceUrl: "https://example.com/archive"
          }
        }}
      />
    );
    const image = screen.getByRole("img", { name: "Accessible project preview" });
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("width", "1600");
    expect(screen.getByRole("link", { name: "Image work View full-size image" })).toHaveAttribute(
      "href",
      "/projects/image.webp"
    );
    expect(screen.getByRole("link", { name: "Project archive ↗" })).toHaveAttribute(
      "href",
      "https://example.com/archive"
    );
    rerender(
      <ProjectCard
        locale="en"
        project={{ id: "none", title: "No image", period: "2026", role: "Engineer", achievements: [], stack: "TS" }}
      />
    );
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("figure")).toBeNull();
    expect(screen.getByText("No image")).toBeInTheDocument();
  });
  it("uses a localized other bucket without inventing an affiliation", () => {
    render(
      <ProjectFilter
        locale="en"
        projects={[
          { id: "mkwp", title: "mKWP", period: "2023", role: "Engineer", achievements: [], stack: "React Native" }
        ]}
      />
    );
    expect(screen.getByRole("option", { name: "Other" })).toHaveValue("__other__");
    expect(screen.queryByText(/Independent/)).not.toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });
  it("closes the menu with Escape and returns focus to its control", () => {
    render(<Header locale="en" page="home" />);
    const button = screen.getByRole("button", { name: "Toggle navigation" });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
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
  it("marks below-viewport targets pending and reveals them through the observer", () => {
    const callbacks: Array<(entries: IntersectionObserverEntry[]) => void> = [];
    class Observer {
      constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
        callbacks.push(callback);
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    global.IntersectionObserver = Observer as never;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    });
    const bounds = vi
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockReturnValue({ top: window.innerHeight + 1 } as DOMRect);
    const { container } = render(
      <main>
        <SiteMotion />
        <div className="section-heading" />
      </main>
    );
    const target = container.querySelector<HTMLElement>(".section-heading")!;
    expect(target.dataset.motion).toBe("pending");
    callbacks[0]?.([{ isIntersecting: true, target } as IntersectionObserverEntry]);
    expect(target.dataset.motion).toBe("shown");
    bounds.mockRestore();
  });
  it("limits project pointer movement and resets it on leave while coarse pointers do nothing", () => {
    let fine = false;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn((query: string) => ({
        get matches() {
          return query.includes("pointer") ? fine : false;
        },
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      }))
    });
    const callbacks: FrameRequestCallback[] = [];
    const request = vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    const project = {
      id: "x",
      title: "X",
      period: "2026",
      role: "Engineer",
      achievements: [],
      stack: "TS",
      image: {
        src: "/projects/x.webp",
        width: 1600,
        height: 1000,
        alt: "X",
        caption: "X",
        provenance: "Public service"
      }
    };
    const { container, rerender } = render(<ProjectCard project={project} />);
    const card = container.querySelector("article")!;
    fireEvent.pointerMove(card, { clientX: 200, clientY: 200 });
    expect(container.querySelector(".project-media")?.getAttribute("style")).toBeNull();
    fine = true;
    rerender(<ProjectCard project={project} />);
    fireEvent.pointerMove(card, { clientX: 999, clientY: 999 });
    callbacks.forEach((callback) => callback(0));
    expect(container.querySelector(".project-media")?.style.getPropertyValue("--cover-x")).toBe("1");
    fireEvent.pointerLeave(card);
    expect(container.querySelector(".project-media")?.style.getPropertyValue("--cover-x")).toBe("");
    request.mockRestore();
  });
});
