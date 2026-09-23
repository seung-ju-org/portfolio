"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const motionSelector = ".section-heading, .capability-grid article, .timeline-list article, .page-home .project";
const motionThreshold = 0.08;

// A pending target that sits above the viewport can never reach the observer threshold again while
// scrolling down, so scroll restoration and jump scrolls would leave it hidden. Reveal those directly.
export function scrolledPast({ bottom, height }: { bottom: number; height: number }) {
  return bottom < height * motionThreshold;
}

export function SiteMotion() {
  const anchor = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = anchor.current?.closest("main");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const targets = Array.from(root.querySelectorAll<HTMLElement>(motionSelector));
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let pointerFrame = 0;
    let magnetic: HTMLElement | undefined;
    let pointer = { x: 0, y: 0 };
    let enabled = false;
    const resetPointer = () =>
      root.querySelectorAll<HTMLElement>("[data-magnetic], .project-cover").forEach((element) => {
        element.style.removeProperty("--magnetic-x");
        element.style.removeProperty("--magnetic-y");
        element.style.removeProperty("--cover-x");
        element.style.removeProperty("--cover-y");
        element.style.removeProperty("--light-x");
        element.style.removeProperty("--light-y");
      });
    const showAll = () => targets.forEach((target) => (target.dataset.motion = "shown"));
    const revealPassed = () =>
      targets.forEach((target) => {
        if (target.dataset.motion !== "pending" || !scrolledPast(target.getBoundingClientRect())) return;
        target.dataset.motion = "shown";
        observer?.unobserve(target);
      });
    const updateProgress = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", String(max > 0 ? window.scrollY / max : 0));
      revealPassed();
    };
    const scheduleProgress = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };
    const disable = () => {
      enabled = false;
      observer?.disconnect();
      observer = undefined;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      frame = 0;
      pointerFrame = 0;
      magnetic = undefined;
      window.removeEventListener("scroll", scheduleProgress);
      window.removeEventListener("resize", scheduleProgress);
      showAll();
      resetPointer();
    };
    const enable = () => {
      if (enabled || preference.matches) return;
      enabled = true;
      observer =
        typeof IntersectionObserver === "undefined"
          ? undefined
          : new IntersectionObserver(
              (entries) =>
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    (entry.target as HTMLElement).dataset.motion = "shown";
                    observer?.unobserve(entry.target);
                  }
                }),
              { threshold: motionThreshold }
            );
      targets.forEach((target) => {
        target.dataset.motion = target.getBoundingClientRect().top <= window.innerHeight ? "shown" : "pending";
        observer?.observe(target);
      });
      if (!observer) showAll();
      updateProgress();
      window.addEventListener("scroll", scheduleProgress, { passive: true });
      window.addEventListener("resize", scheduleProgress);
    };
    const onPreference = () => (preference.matches ? disable() : enable());
    const onFinePointer = () => resetPointer();
    const onFocus = (event: FocusEvent) => {
      const target =
        event.target instanceof HTMLElement ? event.target.closest<HTMLElement>("[data-motion='pending']") : null;
      if (target) {
        target.dataset.motion = "shown";
        observer?.unobserve(target);
      }
    };
    const magneticMove = (event: PointerEvent) => {
      if (!enabled || preference.matches || !finePointer.matches) return;
      const element = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>("[data-magnetic]") : null;
      if (!element) return;
      magnetic = element;
      pointer = { x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!magnetic || preference.matches) return;
        const box = magnetic.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (pointer.x - (box.left + box.width / 2)) / Math.max(1, box.width / 2))) * 4;
        const y = Math.max(-1, Math.min(1, (pointer.y - (box.top + box.height / 2)) / Math.max(1, box.height / 2))) * 4;
        magnetic.style.setProperty("--magnetic-x", `${x}px`);
        magnetic.style.setProperty("--magnetic-y", `${y}px`);
      });
    };
    const magneticLeave = (event: PointerEvent) => {
      const element = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>("[data-magnetic]") : null;
      element?.style.removeProperty("--magnetic-x");
      element?.style.removeProperty("--magnetic-y");
      magnetic = undefined;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
    };
    if (preference.matches) showAll();
    else enable();
    preference.addEventListener("change", onPreference);
    finePointer.addEventListener("change", onFinePointer);
    root.addEventListener("focusin", onFocus);
    root.addEventListener("pointermove", magneticMove);
    root.addEventListener("pointerleave", magneticLeave, true);
    return () => {
      disable();
      preference.removeEventListener("change", onPreference);
      finePointer.removeEventListener("change", onFinePointer);
      root.removeEventListener("focusin", onFocus);
      root.removeEventListener("pointermove", magneticMove);
      root.removeEventListener("pointerleave", magneticLeave, true);
    };
  }, [pathname]);

  return <span aria-hidden="true" ref={anchor} />;
}
