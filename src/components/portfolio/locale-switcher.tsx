"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const pathname = usePathname();

  const buildHref = (targetLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
    return `/${segments.join("/")}`;
  };

  return (
    <div className="inline-flex items-center rounded-md border bg-background p-1">
      {locales.map((item) => (
        <Link
          className={cn(
            "rounded px-2 py-1 text-xs font-medium transition-colors",
            locale === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
          href={buildHref(item)}
          key={item}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
