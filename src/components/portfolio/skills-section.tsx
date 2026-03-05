const skills = ["Next.js", "TypeScript", "React", "Tailwind CSS", "shadcn/ui", "Zustand", "Jest", "Playwright"];

export function SkillsSection() {
  return (
    <section className="container py-10 md:py-16" id="skills">
      <h2 className="text-2xl font-bold !leading-[1.35]">Skills</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
