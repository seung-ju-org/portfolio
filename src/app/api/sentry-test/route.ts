import * as Sentry from "@sentry/nextjs";

export async function POST() {
  const eventId = Sentry.captureMessage("sentry connectivity test", "error");
  await Sentry.flush(2_000);
  return Response.json({ ok: true, eventId });
}
