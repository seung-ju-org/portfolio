import Link from "next/link";
import type { Locale, PageKind, SiteContent } from "@/lib/site-content";
import { HeroScene } from "./hero-scene";
import { CopyEmail, Header, ProjectCard, ProjectFilter } from "./site-controls";
import { pagePath } from "./paths";

const copy: Record<
  Locale,
  {
    profile: string;
    capabilities: string;
    experience: string;
    work: string;
    contact: string;
    education: string;
    contactMethod: string;
  }
> = {
  ko: {
    profile: "소개",
    capabilities: "할 수 있는 일",
    experience: "최근 경력",
    work: "주요 작업",
    contact: "함께 이야기해요",
    education: "교육",
    contactMethod: "메일과 LinkedIn으로 연락하실 수 있습니다."
  },
  en: {
    profile: "Profile",
    capabilities: "Capabilities",
    experience: "Recent experience",
    work: "Selected work",
    contact: "Let’s work together",
    education: "Education",
    contactMethod: "You can reach me by email or LinkedIn."
  },
  ja: {
    profile: "プロフィール",
    capabilities: "できること",
    experience: "最近の経歴",
    work: "主な仕事",
    contact: "ご相談ください",
    education: "学歴",
    contactMethod: "メールまたはLinkedInからご連絡いただけます。"
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
        <div className="masthead">
          <span>
            {content.profile.name} / {content.profile.location}
          </span>
          <Link href={pagePath(locale, "contact")}>Contact ↗</Link>
        </div>
        <section className={`hero ${home ? "hero-home" : "page-intro"}`}>
          <div className="hero-copy">
            <p className="eyebrow">
              {home
                ? `${content.profile.name} · ${content.profile.role}`
                : text[page === "portfolio" ? "work" : page === "contact" ? "contact" : "profile"]}
            </p>
            <h1>
              {home ? (
                <>
                  SEUNG JU
                  <br />
                  OH
                </>
              ) : page === "about" ? (
                text.profile
              ) : page === "portfolio" ? (
                text.work
              ) : page === "contact" ? (
                "Contact"
              ) : (
                text.contact
              )}
            </h1>
            <p className="lede">
              {home ? content.profile.headline : page === "contact" ? text.contactMethod : content.profile.summary}
            </p>
            {home && <p className="current-summary">{content.profile.current}</p>}
            {home && (
              <div className="hero-actions">
                <Link className="button button-primary" href={pagePath(locale, "portfolio")}>
                  {text.work} <span>↗</span>
                </Link>
                <Link className="button button-secondary" href={pagePath(locale, "about")}>
                  {text.profile}
                </Link>
              </div>
            )}
          </div>
          {home && (
            <div className="hero-art">
              <HeroScene />
            </div>
          )}
        </section>
        {home && (
          <section className="intro">
            <p className="section-kicker">01 / {text.profile}</p>
            <p>{content.profile.summary}</p>
          </section>
        )}
        {about && (
          <section className="essay">
            <p className="section-kicker">01 / {text.profile}</p>
            <div>
              {content.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}
        {(home || about) && (
          <section className="capabilities">
            <div className="section-heading">
              <p className="section-kicker">02 / {text.capabilities}</p>
              <h2>Capabilities</h2>
            </div>
            <div className="capability-grid">
              {content.capabilities.map((capability, index) => (
                <article key={capability.title}>
                  <span>0{index + 1}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <small>{capability.skills.join(" · ")}</small>
                </article>
              ))}
            </div>
          </section>
        )}
        {(home || about) && (
          <section className="timeline">
            <div className="section-heading">
              <p className="section-kicker">03 / {text.experience}</p>
              <h2>Experience</h2>
            </div>
            <div className="timeline-list">
              {content.careers.slice(0, home ? 3 : undefined).map((career) => (
                <article key={career.company + career.period}>
                  <p>
                    {career.period}
                    {career.location ? ` · ${career.location}` : ""}
                  </p>
                  <div>
                    <h3>{career.company}</h3>
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
                  </div>
                </article>
              ))}
            </div>
            {about && (
              <div className="education">
                <p className="section-kicker">04 / {text.education}</p>
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
            <div className="section-heading">
              <p className="section-kicker">
                {home ? "04" : "01"} / {text.work}
              </p>
              <h2>Selected work</h2>
            </div>
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
            <p className="section-kicker">{home ? "05" : "01"} / CONTACT</p>
            <h2>{text.contact}</h2>
            <CopyEmail email={content.profile.email} locale={locale} />
            <p className="social-links">
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
