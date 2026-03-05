"use client";

import Link from "next/link";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="bg-background text-foreground antialiased">
        <main className="container flex min-h-dvh flex-col items-center justify-center px-4 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground">ERROR</p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">페이지를 불러오는 중 문제가 발생했습니다</h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            일시적인 오류일 수 있습니다. 다시 시도하거나 홈으로 이동해 주세요.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button className={cn(buttonVariants({ variant: "default", size: "lg" }))} onClick={reset} type="button">
              다시 시도
            </button>
            <Link className={cn(buttonVariants({ variant: "outline", size: "lg" }))} href="/">
              홈으로 이동
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
