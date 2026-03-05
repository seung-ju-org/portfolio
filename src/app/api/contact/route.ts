import nodemailer from "nodemailer";
import * as Sentry from "@sentry/nextjs";

function readEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value.trim();
  }
  return "";
}

function isPlaceholderValue(value: string) {
  return (
    value.includes("example.com") ||
    value === "smtp-user" ||
    value === "smtp-password" ||
    value === "smtp.example.com" ||
    value === "smtp-user@example.com"
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      phone?: string;
      subject?: string;
      message?: string;
    };

    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!email || !phone || !subject || !message) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    const host = readEnv("SMTP_HOST", "smtpHost");
    const portRaw = readEnv("SMTP_PORT", "smtpPort");
    const user = readEnv("SMTP_USER", "smtpUser");
    const pass = readEnv("SMTP_PASS", "smtpPassword");
    const protocol = readEnv("SMTP_PROTOCOL", "smtpProtocol").toLowerCase();
    const domain = readEnv("SMTP_DOMAIN", "smtpDomain");
    const to = readEnv("CONTACT_TO_EMAIL", "contactToEmail") || "seung-ju@seung-ju.com";
    const from = readEnv("CONTACT_FROM_EMAIL", "contactFromEmail") || user || "seung-ju@seung-ju.com";
    const port = Number(portRaw);
    const shouldSimulate = readEnv("CONTACT_SIMULATE_EMAIL", "contactSimulateEmail") === "true";
    const hasMissingConfig = !host || !portRaw || !user || !pass;
    const hasInvalidPort = !Number.isInteger(port) || port <= 0;
    const hasPlaceholderConfig = [host, user, pass, from].some(isPlaceholderValue);
    const secure = protocol === "ssl" || port === 465;
    const requireTLS = protocol === "tls";

    if (hasMissingConfig || hasInvalidPort || hasPlaceholderConfig) {
      if (shouldSimulate) {
        console.warn("[contact] smtp config is invalid; simulating success because CONTACT_SIMULATE_EMAIL=true");
        return Response.json({ ok: true, simulated: true });
      }

      if (hasMissingConfig) {
        throw new Error("Missing SMTP configuration");
      }
      if (hasInvalidPort) {
        throw new Error(`Invalid SMTP_PORT: ${portRaw}`);
      }
      throw new Error("SMTP values are placeholders. Set real SMTP credentials.");
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS,
      name: domain || undefined,
      auth: {
        user,
        pass
      }
    });

    await transporter.verify();

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text: `Email: ${email}\nPhone: ${phone}\n\n${message}`,
      html: `
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] send failed", error);
    Sentry.captureException(error);
    const message = error instanceof Error ? error.message : "Failed to send email";
    const errorPayload = process.env.NODE_ENV === "development" ? message : "Failed to send email";
    return Response.json({ error: errorPayload }, { status: 500 });
  }
}
