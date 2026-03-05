import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ContactForm } from "@/components/portfolio/contact-form";

const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
    error: (...args: unknown[]) => toastError(...args)
  }
}));

const labels = {
  email: "Email",
  phone: "Phone",
  subject: "Subject",
  message: "Message",
  submit: "Send",
  sending: "Sending...",
  success: "Sent",
  error: "Error"
};

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    toastSuccess.mockReset();
    toastError.mockReset();
  });

  it("submits and shows success toast", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } }))
    );

    render(<ContactForm labels={labels} />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "+82 10 0000 0000" } });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Hi" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Body" } });
    fireEvent.submit(screen.getByRole("button", { name: "Send" }).closest("form") as HTMLFormElement);

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Sent"));
  });

  it("shows error toast on failed response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ error: "SMTP error" }), {
            status: 500,
            headers: { "content-type": "application/json" }
          })
      )
    );

    render(<ContactForm labels={labels} />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "+82 10 0000 0000" } });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Hi" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Body" } });
    fireEvent.submit(screen.getByRole("button", { name: "Send" }).closest("form") as HTMLFormElement);

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Error", { description: "SMTP error" });
    });
  });
});
