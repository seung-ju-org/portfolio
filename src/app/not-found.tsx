"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { getLocaleFromPathname, getMessages, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const t = getMessages(locale).error;

  return (
    <main className="container flex flex-1 flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground">{t.code404}</p>
      <h1 className="mt-3 text-3xl font-bold md:text-4xl">{t.notFoundTitle}</h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">{t.notFoundDescription}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link className={cn(buttonVariants({ variant: "default", size: "lg" }))} href={withLocale(locale, "/")}>
          {t.goHome}
        </Link>
      </div>
    </main>
  );
}
