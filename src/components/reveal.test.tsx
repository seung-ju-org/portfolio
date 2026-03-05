import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const { useReducedMotionMock } = vi.hoisted(() => ({
  useReducedMotionMock: vi.fn()
}));

type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & {
  animate?: unknown;
  whileHover?: unknown;
  onViewportEnter?: () => void;
  onViewportLeave?: (entry?: { boundingClientRect: { top: number } }) => void;
};

vi.mock("framer-motion", () => ({
  useReducedMotion: () => useReducedMotionMock(),
  motion: {
    div: ({ children, animate, onViewportEnter, onViewportLeave, ...props }: MotionDivProps) => {
      const safeProps = { ...props };
      Reflect.deleteProperty(safeProps, "whileHover");

      return (
        <div data-animate={JSON.stringify(animate)} data-testid="motion" {...safeProps}>
          <button onClick={() => onViewportEnter?.()} type="button">
            enter
          </button>
          <button onClick={() => onViewportLeave?.({ boundingClientRect: { top: 1 } })} type="button">
            leave-top
          </button>
          <button onClick={() => onViewportLeave?.({ boundingClientRect: { top: -1 } })} type="button">
            leave-bottom
          </button>
          {children}
        </div>
      );
    }
  }
}));

import { Reveal } from "@/components/reveal";

describe("Reveal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders fallback div when reduced motion is enabled", () => {
    useReducedMotionMock.mockReturnValue(true);
    render(<Reveal className="box">hello</Reveal>);
    const node = screen.getByText("hello");
    expect(node).toBeInTheDocument();
    expect(node.closest(".box")).toBeInTheDocument();
  });

  it("toggles visible state on viewport enter/leave", async () => {
    useReducedMotionMock.mockReturnValue(false);
    render(<Reveal>animated</Reveal>);

    const motion = screen.getByTestId("motion");
    expect(motion.getAttribute("data-animate")).toContain('"opacity":0');

    fireEvent.click(screen.getByRole("button", { name: "enter" }));
    await waitFor(() => {
      expect(screen.getByTestId("motion").getAttribute("data-animate")).toContain('"opacity":1');
    });

    fireEvent.click(screen.getByRole("button", { name: "leave-bottom" }));
    await waitFor(() => {
      expect(screen.getByTestId("motion").getAttribute("data-animate")).toContain('"opacity":1');
    });

    fireEvent.click(screen.getByRole("button", { name: "leave-top" }));
    await waitFor(() => {
      expect(screen.getByTestId("motion").getAttribute("data-animate")).toContain('"opacity":0');
    });
  });
});
