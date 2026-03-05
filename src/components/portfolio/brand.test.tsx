/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import type React from "react";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : "#"} {...props}>
      {children}
    </a>
  )
}));

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
    const safeProps = { ...props };
    delete safeProps.priority;
    return <img {...safeProps} alt={safeProps.alt ?? ""} />;
  }
}));

import { Brand } from "@/components/portfolio/brand";

describe("Brand", () => {
  it("renders mark and wordmark by default", () => {
    render(<Brand href="/ko" />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/ko");
    expect(screen.getAllByAltText("Seung Ju logo mark")).toHaveLength(2);
    expect(screen.getAllByAltText("Seung Ju wordmark")).toHaveLength(2);
  });

  it("hides mark when showMark is false", () => {
    render(<Brand href="/en" showMark={false} />);
    expect(screen.queryByAltText("Seung Ju logo mark")).not.toBeInTheDocument();
    expect(screen.getAllByAltText("Seung Ju wordmark")).toHaveLength(2);
  });
});
