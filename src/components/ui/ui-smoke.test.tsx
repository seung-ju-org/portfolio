import { render, screen } from "@testing-library/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

describe("ui smoke", () => {
  it("renders button variants", () => {
    render(<Button variant="default">OK</Button>);
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
  });

  it("renders card composition", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Desc</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("renders skeleton", () => {
    render(<Skeleton className="h-4 w-4" />);
    expect(document.querySelector(".h-4.w-4")).toBeInTheDocument();
  });
});
