import * as Sentry from "@sentry/nextjs";

declare global {
  var __sentryProcessHandlersRegistered: boolean | undefined;
}

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");

    if (!globalThis.__sentryProcessHandlersRegistered) {
      process.on("unhandledRejection", (reason) => {
        Sentry.captureException(reason);
      });

      process.on("uncaughtException", (error) => {
        Sentry.captureException(error);
      });

      globalThis.__sentryProcessHandlersRegistered = true;
    }
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
