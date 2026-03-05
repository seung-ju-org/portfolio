"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/providers";
import { getMessages, type Locale } from "@/lib/i18n";

type ThemeToggleProps = {
  locale?: Locale;
};

export function ThemeToggle({ locale = "ko" }: ThemeToggleProps) {
  const { setTheme } = useTheme();
  const t = getMessages(locale);
  const themes = [
    { value: "light", label: t.theme.light, icon: Sun },
    { value: "system", label: t.theme.system, icon: Monitor },
    { value: "dark", label: t.theme.dark, icon: Moon }
  ] as const;

  return (
    <div className="theme-toggle inline-flex items-center gap-1 rounded-md border bg-background p-1">
      {themes.map((item) => {
        const Icon = item.icon;

        return (
          <button
            aria-label={item.label}
            className="theme-toggle-btn rounded p-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            data-theme-value={item.value}
            key={item.value}
            onClick={() => setTheme(item.value)}
            type="button"
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
