import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandProps = {
  className?: string;
  href?: string;
  showMark?: boolean;
  wordmarkClassName?: string;
};

export function Brand({ className, href = "/about", showMark = true, wordmarkClassName }: BrandProps) {
  return (
    <Link className={cn("inline-flex items-center gap-2", className)} href={href}>
      {showMark ? (
        <>
          <Image alt="Seung Ju logo mark" className="h-8 w-8 dark:hidden" height={32} priority src="/seungju-mark-black.svg" width={32} />
          <Image alt="Seung Ju logo mark" className="hidden h-8 w-8 dark:block" height={32} priority src="/seungju-mark-white.svg" width={32} />
        </>
      ) : null}
      <Image
        alt="Seung Ju wordmark"
        className={cn("h-6 w-auto dark:hidden", wordmarkClassName)}
        height={24}
        priority
        src="/seungju-wordmark-black.svg"
        width={112}
      />
      <Image
        alt="Seung Ju wordmark"
        className={cn("hidden h-6 w-auto dark:block", wordmarkClassName)}
        height={24}
        priority
        src="/seungju-wordmark-white.svg"
        width={112}
      />
    </Link>
  );
}
