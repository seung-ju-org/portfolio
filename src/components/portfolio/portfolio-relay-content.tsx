"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { PortfolioMasonry } from "@/components/portfolio/portfolio-masonry";
import { PortfolioSkeleton } from "@/components/portfolio/portfolio-skeleton";
import type { Locale } from "@/lib/i18n";
import type { CareerProjectConnection } from "@/lib/project-repository";

type Labels = {
  companyLabel: string;
  periodLabel: string;
  roleLabel: string;
  stackLabel: string;
  achievementsLabel: string;
};

type PortfolioRelayContentProps = {
  locale: Locale;
  labels: Labels;
  initialConnection: CareerProjectConnection;
};

const NEXT_PAGE_QUERY = `
  query PortfolioNextPage($locale: Locale!, $count: Int!, $cursor: String) {
    projectsConnection(locale: $locale, first: $count, after: $cursor) {
      edges {
        cursor
        node {
          id
          title
          company
          period
          role
          stack
          achievements
          links {
            label
            url
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

const localeMap = {
  ko: "KO",
  en: "EN",
  ja: "JA"
} as const;

const PAGE_SIZE = 8;

async function fetchNextPage(locale: Locale, cursor: string | null) {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: NEXT_PAGE_QUERY,
      variables: { locale: localeMap[locale], count: PAGE_SIZE, cursor }
    }),
    cache: "no-store"
  });

  const payload = (await response.json()) as {
    data?: {
      projectsConnection?: CareerProjectConnection;
    };
    errors?: Array<{ message?: string }>;
  };

  if (!response.ok || payload.errors?.length || !payload.data?.projectsConnection) {
    throw new Error(payload.errors?.[0]?.message ?? "Failed to load projects.");
  }

  return payload.data.projectsConnection;
}

export function PortfolioRelayContent({ locale, labels, initialConnection }: PortfolioRelayContentProps) {
  const [connection, setConnection] = useState(initialConnection);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        if (!connection.pageInfo.hasNextPage || isLoadingNext) return;

        setIsLoadingNext(true);
        void fetchNextPage(locale, connection.pageInfo.endCursor)
          .then((nextConnection) => {
            setConnection((prev) => ({
              ...nextConnection,
              edges: [...prev.edges, ...nextConnection.edges]
            }));
          })
          .finally(() => {
            setIsLoadingNext(false);
          });
      },
      {
        rootMargin: "320px 0px"
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [connection.pageInfo.endCursor, connection.pageInfo.hasNextPage, isLoadingNext, locale]);

  const projects = useMemo(
    () =>
      connection.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        company: edge.node.company ?? undefined,
        period: edge.node.period,
        role: edge.node.role,
        stack: edge.node.stack,
        achievements: [...edge.node.achievements],
        links: edge.node.links?.map((link) => ({ label: link.label, url: link.url }))
      })),
    [connection.edges]
  );

  return (
    <>
      <PortfolioMasonry labels={labels} projects={projects} />
      <div className="py-8 text-center" ref={loadMoreRef}>
        {isLoadingNext ? <PortfolioSkeleton count={2} /> : null}
      </div>
    </>
  );
}
