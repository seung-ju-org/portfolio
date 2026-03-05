"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (reduceMotion) {
    return <div className={cn("interactive-lift", className)}>{children}</div>;
  }

  if (!mounted) {
    return (
      <div
        className={cn("interactive-lift", className)}
        style={{ opacity: 0, transform: "translateY(18px)" }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("interactive-lift", className)}
      initial={{ opacity: 0, y: 18 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      whileHover={isVisible ? { y: -2 } : undefined}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ amount: 0.2, once: false }}
      onViewportEnter={() => setIsVisible(true)}
      onViewportLeave={(entry) => {
        if (entry && entry.boundingClientRect.top > 0) {
          setIsVisible(false);
        }
      }}
    >
      {children}
    </motion.div>
  );
}
