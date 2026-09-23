"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale, PageKind, SiteContent } from "@/lib/site-content";
import type { ProjectCategory } from "@/lib/project-evidence";
import { localePath, pagePath } from "./paths";

const pageNames: Record<PageKind, Record<Locale, string>> = {
  home: { ko: "소개", en: "Home", ja: "ホーム" },
  about: { ko: "이력", en: "About", ja: "経歴" },
  portfolio: { ko: "작업", en: "Work", ja: "作品" },
  contact: { ko: "연락", en: "Contact", ja: "連絡" }
};
const localeNames: Record<Locale, string> = { ko: "한국어", en: "EN", ja: "日本語" };

export { localePath, pagePath } from "./paths";

export function Header({ locale, page }: { locale: Locale; page: PageKind }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    // Route changes must collapse the mobile disclosure before its next link can receive focus.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [locale, pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <Link className="wordmark" href={pagePath(locale, "home")}>
        SEUNG JU <i>OH</i>
      </Link>
      <button
        aria-controls="site-navigation"
        aria-expanded={open}
        aria-label="Toggle navigation"
        className="menu-button"
        onClick={() => setOpen(!open)}
        ref={button}
        type="button"
      >
        <span className="menu-icon" aria-hidden="true" /> <span className="menu-label">MENU</span>
      </button>
      <nav className={open ? "open" : ""} id="site-navigation">
        {(Object.keys(pageNames) as PageKind[]).map((key) => (
          <Link
            aria-current={page === key ? "page" : undefined}
            href={pagePath(locale, key)}
            key={key}
            onClick={() => setOpen(false)}
          >
            {pageNames[key][locale]}
          </Link>
        ))}
        <span className="nav-separator" />
        <div className="locale-links">
          {(["ko", "en", "ja"] as Locale[]).map((target) => (
            <Link
              aria-current={locale === target ? "true" : undefined}
              href={localePath(target, pathname)}
              key={target}
            >
              {localeNames[target]}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

type Project = SiteContent["projects"][number];
const fullImageLabel: Record<Locale, string> = {
  ko: "이미지 크게 보기",
  en: "View full-size image",
  ja: "画像を拡大表示"
};

export function ProjectCard({
  project,
  full = false,
  locale = "ko"
}: {
  project: Project;
  full?: boolean;
  locale?: Locale;
}) {
  const card = useRef<HTMLElement>(null);
  const cover = useRef<HTMLElement>(null);
  const point = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const fine = useRef<MediaQueryList | null>(null);
  const reduced = useRef<MediaQueryList | null>(null);
  const resetVars = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    cover.current?.style.removeProperty("--cover-x");
    cover.current?.style.removeProperty("--cover-y");
    cover.current?.style.removeProperty("--light-x");
    cover.current?.style.removeProperty("--light-y");
  };
  useEffect(() => {
    if (!window.matchMedia) return;
    fine.current = window.matchMedia("(hover: hover) and (pointer: fine)");
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => resetVars();
    fine.current.addEventListener("change", change);
    reduced.current.addEventListener("change", change);
    return () => {
      fine.current?.removeEventListener("change", change);
      reduced.current?.removeEventListener("change", change);
      resetVars();
    };
  }, []);
  const pointer = (event: React.PointerEvent<HTMLElement>) => {
    if (reduced.current?.matches || !fine.current?.matches) return;
    point.current = { x: event.clientX, y: event.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const box = card.current?.getBoundingClientRect();
      if (!box) return;
      if (!box || !cover.current) return;
      const x = Math.max(-1, Math.min(1, ((point.current.x - box.left) / box.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((point.current.y - box.top) / box.height) * 2 - 1));
      cover.current.style.setProperty("--cover-x", String(x));
      cover.current.style.setProperty("--cover-y", String(y));
      cover.current.style.setProperty("--light-x", `${(x + 1) * 50}%`);
      cover.current.style.setProperty("--light-y", `${(y + 1) * 50}%`);
    });
  };
  const reset = () => {
    resetVars();
  };
  return (
    <article className={`project project-${project.id}`} onPointerLeave={reset} onPointerMove={pointer} ref={card}>
      {project.image ? (
        <figure
          className="project-media"
          ref={(element) => {
            cover.current = element;
          }}
        >
          <a
            aria-label={`${project.title} ${fullImageLabel[locale]}`}
            href={project.image.src}
            rel="noreferrer"
            target="_blank"
          >
            <div className="project-media-viewport">
              <Image
                alt={project.image.alt}
                decoding="async"
                height={project.image.height}
                loading="lazy"
                sizes="(max-width: 700px) 100vw, 50vw"
                src={project.image.src}
                style={{ objectFit: project.image.fit ?? "cover" }}
                unoptimized
                width={project.image.width}
              />
            </div>
          </a>
          <figcaption>
            <span>{project.image.caption}</span>
            {project.image.sourceUrl ? (
              <a href={project.image.sourceUrl} rel="noreferrer" target="_blank">
                {project.image.provenance} ↗
              </a>
            ) : (
              <span>{project.image.provenance}</span>
            )}
          </figcaption>
        </figure>
      ) : null}
      <p>{project.company ? `${project.company} · ${project.period}` : project.period}</p>
      <h3>{project.title}</h3>
      <strong>{project.role}</strong>
      <ul>
        {(full ? project.achievements : project.achievements.slice(0, 1)).map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
      <small>{project.stack}</small>
      {project.links?.map((link) => (
        <a href={link.url} key={link.url} rel="noreferrer" target="_blank">
          {link.label} ↗
        </a>
      ))}
    </article>
  );
}
const filterLabels: Record<
  Locale,
  {
    all: string;
    allCategories: string;
    other: string;
    label: string;
    category: string;
    empty: string;
    categories: Record<ProjectCategory, string>;
  }
> = {
  ko: {
    all: "전체 회사",
    allCategories: "전체 분류",
    other: "기타",
    label: "회사별 작업 필터",
    category: "작업 분류",
    empty: "선택한 조건에 맞는 작업이 없습니다.",
    categories: { work: "개발", design: "디자인", archive: "아카이브", opensource: "오픈 소스" }
  },
  en: {
    all: "All companies",
    allCategories: "All categories",
    other: "Other",
    label: "Filter work by company",
    category: "Work category",
    empty: "No work matches these filters.",
    categories: { work: "Development", design: "Design", archive: "Archive", opensource: "Open source" }
  },
  ja: {
    all: "すべての会社",
    allCategories: "すべてのカテゴリ",
    other: "その他",
    label: "会社で作品を絞り込む",
    category: "作品カテゴリ",
    empty: "選択した条件に一致する作品はありません。",
    categories: { work: "開発", design: "デザイン", archive: "アーカイブ", opensource: "オープンソース" }
  }
};
const otherCompany = "__other__";
export function ProjectFilter({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState<"all" | ProjectCategory>("all");
  const labels = filterLabels[locale];
  const tags = ["all", ...Array.from(new Set(projects.map((project) => project.company ?? otherCompany)))];
  const categories = Array.from(new Set(projects.map((project) => project.category ?? "work"))) as ProjectCategory[];
  const visible = projects.filter(
    (project) =>
      (filter === "all" || (project.company ?? otherCompany) === filter) &&
      (category === "all" || (project.category ?? "work") === category)
  );
  const resetFilters = () => {
    setFilter("all");
    setCategory("all");
  };
  return (
    <>
      <div className="filters">
        <label htmlFor="project-filter">{labels.label}</label>
        <select
          id="project-filter"
          onChange={(event) => setFilter(event.target.value)}
          onKeyDown={(event) => event.key === "Escape" && resetFilters()}
          value={filter}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag === "all" ? labels.all : tag === otherCompany ? labels.other : tag}
            </option>
          ))}
        </select>
      </div>
      <div
        aria-label={labels.category}
        className="category-filters"
        onKeyDown={(event) => event.key === "Escape" && resetFilters()}
        role="group"
      >
        {(["all", ...categories] as const).map((value) => (
          <button aria-pressed={category === value} key={value} onClick={() => setCategory(value)} type="button">
            {value === "all" ? labels.allCategories : labels.categories[value]}
          </button>
        ))}
      </div>
      <div className="project-grid" data-filter-transition key={`${filter}-${category}`}>
        {visible.length ? (
          visible.map((project) => <ProjectCard full key={project.id} locale={locale} project={project} />)
        ) : (
          <p className="project-empty" role="status">
            {labels.empty}
          </p>
        )}
      </div>
    </>
  );
}
export function CopyEmail({ email, locale }: { email: string; locale: Locale }) {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus(
        locale === "ko"
          ? "이메일 주소를 복사했습니다."
          : locale === "ja"
            ? "メールアドレスをコピーしました。"
            : "Email address copied."
      );
    } catch {
      setStatus(email);
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 3000);
  };
  return (
    <div className="email-actions">
      <a className="contact-email" href={`mailto:${email}`}>
        {email}
      </a>
      <button onClick={copy} type="button">
        {locale === "ko" ? "주소 복사" : locale === "ja" ? "アドレスをコピー" : "Copy address"}
      </button>
      <span aria-live="polite" className="copy-feedback" role="status">
        {status}
      </span>
    </div>
  );
}
