import { fireEvent, render, screen } from "@testing-library/react";

import { ThemeToggle } from "@/components/portfolio/theme-toggle";

const setTheme = vi.fn();

vi.mock("@/components/providers", () => ({
  useTheme: () => ({ setTheme })
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    setTheme.mockReset();
  });

  it("renders three theme buttons and triggers setTheme", () => {
    render(<ThemeToggle locale="en" />);

    fireEvent.click(screen.getByRole("button", { name: "Light" }));
    fireEvent.click(screen.getByRole("button", { name: "System" }));
    fireEvent.click(screen.getByRole("button", { name: "Dark" }));

    expect(setTheme).toHaveBeenNthCalledWith(1, "light");
    expect(setTheme).toHaveBeenNthCalledWith(2, "system");
    expect(setTheme).toHaveBeenNthCalledWith(3, "dark");
  });
});
