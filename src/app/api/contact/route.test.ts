import nodemailer from "nodemailer";
import { POST } from "@/app/api/contact/route";

vi.mock("nodemailer", () => {
  const verify = vi.fn().mockResolvedValue(undefined);
  const sendMail = vi.fn().mockResolvedValue(undefined);
  const createTransport = vi.fn(() => ({ verify, sendMail }));
  return {
    default: {
      createTransport
    }
  };
});

function buildRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
}

describe("POST /api/contact", () => {
  const envBackup = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...envBackup,
      NODE_ENV: "test",
      SMTP_HOST: "smtp.real.com",
      SMTP_PORT: "587",
      SMTP_USER: "real-user",
      SMTP_PASS: "real-pass",
      CONTACT_FROM_EMAIL: "no-reply@portfolio.seung-ju.com",
      CONTACT_TO_EMAIL: "seung-ju@seung-ju.com"
    };
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it("returns 400 for invalid payload", async () => {
    const response = await POST(buildRequest({ email: "a@a.com" }));
    expect(response.status).toBe(400);
  });

  it("sends email and returns ok for valid payload", async () => {
    const response = await POST(
      buildRequest({
        email: "user@example.com",
        phone: "+82 10 0000 0000",
        subject: "Hello",
        message: "Test body"
      })
    );

    expect(response.status).toBe(200);
    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);

    const transport = (nodemailer.createTransport as unknown as ReturnType<typeof vi.fn>).mock.results[0].value;
    expect(transport.verify).toHaveBeenCalledTimes(1);
    expect(transport.sendMail).toHaveBeenCalledTimes(1);
  });

  it("returns 500 when smtp env is placeholder", async () => {
    process.env.SMTP_HOST = "smtp.example.com";

    const response = await POST(
      buildRequest({
        email: "user@example.com",
        phone: "+82 10 0000 0000",
        subject: "Hello",
        message: "Test body"
      })
    );

    expect(response.status).toBe(500);
  });
});
