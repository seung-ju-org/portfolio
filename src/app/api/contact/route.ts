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
  const normalized = value.trim().toLowerCase();

  return (
    normalized === "smtp-user" ||
    normalized === "smtp-password" ||
    normalized === "smtp.example.com" ||
    normalized === "smtp-user@example.com" ||
    normalized === "example.com" ||
    normalized.endsWith(".example.com") ||
    normalized.endsWith("@example.com")
  );
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(value: string) {
  if (value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isReasonableLength(value: string, min: number, max: number) {
  return value.length >= min && value.length <= max;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      phone?: string;
      subject?: string;
      message?: string;
    };

    const email = sanitizeHeaderValue(body.email?.trim() ?? "");
    const phone = sanitizeHeaderValue(body.phone?.trim() ?? "");
    const subject = sanitizeHeaderValue(body.subject?.trim() ?? "");
    const message = (body.message?.trim() ?? "").replace(/\r\n/g, "\n");

    if (!isValidEmail(email)) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!isReasonableLength(phone, 7, 40)) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!isReasonableLength(subject, 1, 200)) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!isReasonableLength(message, 1, 5000)) {
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

    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text: `Email: ${email}\nPhone: ${phone}\n\n${message}`,
      html: `
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr />
        <p>${safeMessage}</p>
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
