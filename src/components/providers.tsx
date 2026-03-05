"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Toaster } from "sonner";

export type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
};

function readThemeCookie(): ThemeMode | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)theme=(light|dark|system)(?:;|$)/);
  if (!match) return null;
  return match[1] as ThemeMode;
}

function resolveTheme(theme: ThemeMode) {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

function commitTheme(theme: ThemeMode) {
  const resolved = resolveTheme(theme);
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}

function applyTheme(theme: ThemeMode, withTransition = false) {
  void withTransition;
  commitTheme(theme);
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => readThemeCookie() ?? "system");
  const isFirstApplyRef = useRef(true);

  useEffect(() => {
    applyTheme(theme, !isFirstApplyRef.current);
    isFirstApplyRef.current = false;
    document.cookie = `theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") applyTheme("system", true);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <Toaster position="bottom-right" richColors theme={theme} />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
