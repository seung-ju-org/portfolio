"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale, PageKind, SiteContent } from "@/lib/site-content";
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
  return (
    <header className="site-header">
      <Link className="wordmark" href={pagePath(locale, "home")}>
        SEUNG JU <i>OH</i>
      </Link>
      <button
        aria-expanded={open}
        aria-label="Toggle navigation"
        className="menu-button"
        onClick={() => setOpen(!open)}
        type="button"
      >
        MENU
      </button>
      <nav className={open ? "open" : ""}>
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
export function ProjectCard({ project, full = false }: { project: Project; full?: boolean }) {
  return (
    <article className={`project project-${project.id}`}>
      <div aria-hidden="true" className="project-cover" />
      <p>
        {project.company || "Independent"} · {project.period}
      </p>
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
const filterLabels: Record<Locale, { all: string; label: string }> = {
  ko: { all: "전체 작업", label: "회사별 작업 필터" },
  en: { all: "All work", label: "Filter work by company" },
  ja: { all: "すべての作品", label: "会社で作品を絞り込む" }
};
export function ProjectFilter({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const [filter, setFilter] = useState("all");
  const tags = ["all", ...Array.from(new Set(projects.map((project) => project.company || "Independent")))];
  const labels = filterLabels[locale];
  const visible =
    filter === "all" ? projects : projects.filter((project) => (project.company || "Independent") === filter);
  return (
    <>
      <div className="filters">
        <label htmlFor="project-filter">{labels.label}</label>
        <select id="project-filter" onChange={(event) => setFilter(event.target.value)} value={filter}>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag === "all" ? labels.all : tag}
            </option>
          ))}
        </select>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard full key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
export function CopyEmail({ email, locale }: { email: string; locale: Locale }) {
  const [status, setStatus] = useState("");
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
  };
  return (
    <div className="email-actions">
      <a className="contact-email" href={`mailto:${email}`}>
        {email}
      </a>
      <button onClick={copy} type="button">
        {locale === "ko" ? "주소 복사" : locale === "ja" ? "アドレスをコピー" : "Copy address"}
      </button>
      <span aria-live="polite" className="sr-only">
        {status}
      </span>
    </div>
  );
}
