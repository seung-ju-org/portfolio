import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="container flex flex-1 flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-bold md:text-4xl">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
        요청하신 주소가 잘못되었거나, 페이지가 이동 또는 삭제되었을 수 있습니다.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link className={cn(buttonVariants({ variant: "default", size: "lg" }))} href="/">
          홈으로 이동
        </Link>
      </div>
    </main>
  );
}
