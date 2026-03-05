import { render, screen } from "@testing-library/react";
import type React from "react";

vi.mock("@/components/reveal", () => ({
  Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>
}));

vi.mock("@/components/portfolio/contact-form", () => ({
  ContactForm: () => <div data-testid="contact-form-mock" />
}));

import { ContactSection } from "@/components/portfolio/contact-section";

describe("ContactSection", () => {
  it("renders contact info and form", () => {
    render(<ContactSection locale="ko" />);

    expect(screen.getByText("Contact Me")).toBeInTheDocument();
    expect(screen.getByText("seung-ju@seung-ju.com")).toBeInTheDocument();
    expect(screen.getByText("+82 10 8327 3235")).toBeInTheDocument();
    expect(screen.getByTestId("contact-form-mock")).toBeInTheDocument();
  });
});
