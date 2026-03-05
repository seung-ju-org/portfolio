import { render, screen, waitFor } from "@testing-library/react";

const { usePathnameMock, useReducedMotionMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn(),
  useReducedMotionMock: vi.fn()
}));

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock()
}));

vi.mock("framer-motion", () => ({
  useReducedMotion: () => useReducedMotionMock()
}));

import { PageTransition } from "@/components/page-transition";

describe("PageTransition", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    usePathnameMock.mockReturnValue("/en");
  });

  it("renders children with reduced motion", () => {
    useReducedMotionMock.mockReturnValue(true);
    render(
      <PageTransition>
        <div>content</div>
      </PageTransition>
    );

    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("runs enter transition when motion is enabled", async () => {
    useReducedMotionMock.mockReturnValue(false);
    const rafSpy = vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });
    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    render(
      <PageTransition>
        <div>animated-content</div>
      </PageTransition>
    );

    const content = screen.getByText("animated-content");
    await waitFor(() => {
      expect(content.parentElement).toHaveClass("opacity-100");
    });
    expect(rafSpy).toHaveBeenCalled();
    expect(cancelSpy).toHaveBeenCalledTimes(0);

    rafSpy.mockRestore();
    cancelSpy.mockRestore();
  });
});
