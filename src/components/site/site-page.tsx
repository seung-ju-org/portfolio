import Link from "next/link";
import type { Locale, PageKind, SiteContent } from "@/lib/site-content";
import { HeroScene } from "./hero-scene";
import { CopyEmail, Header, ProjectCard, ProjectFilter } from "./site-controls";
import { pagePath } from "./paths";

const copy: Record<
  Locale,
  { profile: string; capabilities: string; experience: string; work: string; contact: string; education: string }
> = {
  ko: {
    profile: "소개",
    capabilities: "할 수 있는 일",
    experience: "최근 경력",
    work: "주요 작업",
    contact: "함께 이야기해요",
    education: "교육"
  },
  en: {
    profile: "Profile",
    capabilities: "Capabilities",
    experience: "Recent experience",
    work: "Selected work",
    contact: "Let’s work together",
    education: "Education"
  },
  ja: {
    profile: "プロフィール",
    capabilities: "できること",
    experience: "最近の経歴",
    work: "主な仕事",
    contact: "ご相談ください",
    education: "学歴"
  }
};
export function SitePage({ locale, page, content }: { locale: Locale; page: PageKind; content: SiteContent }) {
  const text = copy[locale],
    home = page === "home",
    about = page === "about";
  return (
    <>
      <Header locale={locale} page={page} />
      <main className={`site-main page-${page}`}>
        <section className={`hero ${home ? "" : "page-intro"}`}>
          <div>
            <p className="eyebrow">
              {home
                ? content.profile.location
                : text[page === "portfolio" ? "work" : page === "contact" ? "contact" : "profile"]}
            </p>
            <h1>
              {home ? (
                <>
                  {content.profile.name}
                  <br />
                  <em>{content.profile.role}</em>
                </>
              ) : page === "about" ? (
                text.profile
              ) : page === "portfolio" ? (
                text.work
              ) : (
                text.contact
              )}
            </h1>
            <p className="lede">{home ? content.profile.headline : content.profile.summary}</p>
            {home && <p className="current-summary">{content.profile.current}</p>}
            {home && (
              <Link className="text-link" href={pagePath(locale, "portfolio")}>
                {text.work} <span>↓</span>
              </Link>
            )}
          </div>
          {home && <HeroScene />}
        </section>
        {home && (
          <section className="summary">
            <p className="section-number">01 / {text.profile}</p>
            <p>{content.profile.summary}</p>
          </section>
        )}
        {about && (
          <section className="essay">
            <p className="section-number">01 / {text.profile}</p>
            <div>
              {content.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}
        {(home || about) && (
          <section className="capabilities">
            <p className="section-number">
              {home ? "02" : "02"} / {text.capabilities}
            </p>
            <div>
              {content.capabilities.map((capability, index) => (
                <article key={capability.title}>
                  <span>0{index + 1}</span>
                  <h2>{capability.title}</h2>
                  <p>{capability.description}</p>
                  <small>{capability.skills.join(" · ")}</small>
                </article>
              ))}
            </div>
          </section>
        )}
        {(home || about) && (
          <section className="timeline">
            <p className="section-number">
              {home ? "03" : "03"} / {text.experience}
            </p>
            {content.careers.slice(0, home ? 3 : undefined).map((career) => (
              <article key={career.company + career.period}>
                <p>
                  {career.period}
                  {career.location ? ` · ${career.location}` : ""}
                </p>
                <h2>{career.company}</h2>
                <strong>{career.role}</strong>
                <p>{career.summary}</p>
                {about && (
                  <>
                    <ul>
                      {career.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <small>{career.skills.join(" · ")}</small>
                  </>
                )}
              </article>
            ))}
            {about && (
              <div className="education">
                <p className="section-number">{text.education}</p>
                {content.education.map((item) => (
                  <div key={item.school}>
                    <p>
                      <b>{item.school}</b> / {item.course} / {item.period}
                    </p>
                    {item.details.map((detail) => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
        {(home || page === "portfolio") && (
          <section className="work">
            <p className="section-number">
              {home ? "04" : "01"} / {text.work}
            </p>
            {page === "portfolio" ? (
              <ProjectFilter locale={locale} projects={content.projects} />
            ) : (
              <div className="project-grid">
                {(["unicorea-payment", "brassone", "19", "1"] as const)
                  .flatMap((id) => {
                    const project = content.projects.find((item) => item.id === id);
                    return project ? [project] : [];
                  })
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </div>
            )}
          </section>
        )}
        {(home || page === "contact") && (
          <section className="contact">
            <p className="section-number">{home ? "05" : "01"} / CONTACT</p>
            <h2>{text.contact}</h2>
            <CopyEmail email={content.profile.email} locale={locale} />
            <p>
              <a href={content.profile.linkedin} rel="noreferrer" target="_blank">
                LinkedIn ↗
              </a>
              <a href={content.profile.github} rel="noreferrer" target="_blank">
                GitHub ↗
              </a>
            </p>
          </section>
        )}
      </main>
      <footer>
        © {new Date().getFullYear()} {content.profile.name}
        <span>Designed with intention.</span>
      </footer>
    </>
  );
}
