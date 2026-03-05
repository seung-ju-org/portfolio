import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("sonner", () => ({
  Toaster: () => <div>Toaster</div>
}));

import { ThemeProvider, useTheme } from "@/components/providers";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("dark"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });
});

function Consumer() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span>{theme}</span>
      <button onClick={() => setTheme("dark")} type="button">
        set-dark
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  it("provides theme context", () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );

    expect(screen.getByText("system")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "set-dark" }));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
