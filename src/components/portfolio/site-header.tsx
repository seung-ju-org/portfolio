"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Brand } from "@/components/portfolio/brand";
import { LocaleSwitcher } from "@/components/portfolio/locale-switcher";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { getMessages, isLocale, withLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  locale?: Locale;
};

export function SiteHeader({ locale = "ko" }: SiteHeaderProps) {
  const pathname = usePathname();
  const t = getMessages(locale);
  const navItems = [
    { label: t.nav.home, href: withLocale(locale, "/") },
    { label: t.nav.about, href: withLocale(locale, "/about") },
    { label: t.nav.portfolio, href: withLocale(locale, "/portfolio") },
    { label: t.nav.contact, href: withLocale(locale, "/contact") }
  ];
  const [isOpen, setIsOpen] = useState(false);
  const scrollYRef = useRef(0);

  const normalizePath = (path: string) => {
    const parts = path.split("/").filter(Boolean);
    if (parts.length > 0 && isLocale(parts[0])) {
      parts.shift();
    }
    const normalized = `/${parts.join("/")}`;
    return normalized === "//" ? "/" : normalized;
  };

  const currentPath = normalizePath(pathname);
  const isActiveNav = (href: string) => {
    const targetPath = normalizePath(href);
    if (targetPath === "/") {
      return currentPath === "/";
    }
    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  useEffect(() => {
    const { body } = document;
    if (isOpen) {
      scrollYRef.current = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      return;
    }

    const savedY = Math.abs(parseInt(body.style.top || "0", 10)) || scrollYRef.current;
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    body.style.overflow = "";
    window.scrollTo(0, savedY);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      const { body } = document;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link className="inline-flex md:hidden" href={withLocale(locale, "/")}>
            <Image alt="Seung Ju logo mark" className="h-8 w-8 dark:hidden" height={32} priority src="/seungju-mark-black.svg" width={32} />
            <Image alt="Seung Ju logo mark" className="hidden h-8 w-8 dark:block" height={32} priority src="/seungju-mark-white.svg" width={32} />
          </Link>
          <Brand className="hidden md:inline-flex" href={withLocale(locale, "/")} showMark={false} />
          <div className="hidden items-center gap-3 md:flex">
            <nav className="hidden gap-6 md:flex">
              {navItems.map((item) => (
                <Link
                  aria-current={isActiveNav(item.href) ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActiveNav(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <LocaleSwitcher locale={locale} />
            <ThemeToggle locale={locale} />
          </div>
          <button
            aria-label="Open menu"
            className={cn(buttonVariants({ size: "sm", variant: "outline" }), "md:hidden")}
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/40 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsOpen(false)}
      />
      <aside
        aria-hidden={!isOpen}
        className={cn(
          "fixed right-0 top-0 z-[70] h-dvh w-[82%] max-w-sm overflow-y-auto border-l bg-background p-5 shadow-2xl transition-transform md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <Brand href={withLocale(locale, "/")} showMark={false} />
          <button
            aria-label="Close menu"
            className={buttonVariants({ size: "sm", variant: "outline" })}
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              aria-current={isActiveNav(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-base transition-colors",
                isActiveNav(item.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="my-4 border-t" />
        <LocaleSwitcher locale={locale} />
        <div className="mt-3">
          <ThemeToggle locale={locale} />
        </div>
      </aside>
    </>
  );
}
