"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as Sentry from "@sentry/nextjs";

import { buttonVariants } from "@/components/ui/button";
import { getLocaleFromPathname, getMessages, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const t = getMessages(locale).error;

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="container flex flex-1 flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground">{t.codeRuntime}</p>
      <h1 className="mt-3 text-3xl font-bold md:text-4xl">{t.runtimeTitle}</h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">{t.runtimeDescription}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button className={cn(buttonVariants({ variant: "default", size: "lg" }))} onClick={reset} type="button">
          {t.retry}
        </button>
        <Link className={cn(buttonVariants({ variant: "outline", size: "lg" }))} href={withLocale(locale, "/")}>
          {t.goHome}
        </Link>
      </div>
    </main>
  );
}
