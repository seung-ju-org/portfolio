"use client";

import Masonry from "react-masonry-css";

import { Reveal } from "@/components/reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CareerProject } from "@/lib/projects";

type Labels = {
  companyLabel: string;
  periodLabel: string;
  roleLabel: string;
  stackLabel: string;
  achievementsLabel: string;
};

type PortfolioMasonryProps = {
  labels: Labels;
  projects: CareerProject[];
};

const breakpointCols = {
  default: 3,
  1279: 2,
  767: 1
};

export function PortfolioMasonry({ labels, projects }: PortfolioMasonryProps) {
  return (
    <Masonry breakpointCols={breakpointCols} className="-ml-5 flex w-auto" columnClassName="bg-clip-padding pl-5">
      {projects.map((project, index) => (
        <Reveal className="mb-5" delay={(index % 6) * 0.04} key={project.id}>
          <Card className="interactive-card bg-card/90">
            <CardHeader>
              <CardTitle>
                {project.title}
              </CardTitle>
              <CardDescription>
                {labels.companyLabel}: {project.company ?? "-"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{labels.periodLabel}: </span>
                {project.period}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{labels.roleLabel}: </span>
                {project.role}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{labels.stackLabel}: </span>
                {project.stack}
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">{labels.achievementsLabel}</p>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  {project.achievements.map((achievement) => (
                    <li key={achievement}>- {achievement}</li>
                  ))}
                </ul>
              </div>
              {project.links?.length ? (
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a className="inline-block text-sm font-medium text-primary hover:underline" href={link.url} key={link.url} rel="noreferrer" target="_blank">
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </Reveal>
      ))}
    </Masonry>
  );
}
