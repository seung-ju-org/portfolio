"use client";

import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type PageTransitionProps = {
  children: React.ReactNode;
};

type TransitionFrameProps = {
  children: React.ReactNode;
  shouldReduceMotion: boolean;
};

function TransitionFrame({ children, shouldReduceMotion }: TransitionFrameProps) {
  const [entered, setEntered] = useState(shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [shouldReduceMotion]);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col transition-[opacity,transform] duration-300 ease-out",
        shouldReduceMotion || entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
    >
      {children}
    </div>
  );
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = !!useReducedMotion();

  return <TransitionFrame key={pathname} shouldReduceMotion={shouldReduceMotion}>{children}</TransitionFrame>;
}
