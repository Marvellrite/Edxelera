'use client';

import { type CSSProperties, useEffect, useRef, useState } from "react";

export default function useFixedAnchoredElement<T extends HTMLElement>() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<T>(null);
  const [layout, setLayout] = useState({ left: 0, width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      const anchor = anchorRef.current;
      const fixed = fixedRef.current;

      if (!anchor || !fixed) return;

      const anchorRect = anchor.getBoundingClientRect();
      const fixedRect = fixed.getBoundingClientRect();

      setLayout((prev) => {
        const next = {
          left: anchorRect.left,
          width: anchorRect.width,
          height: fixedRect.height,
        };

        if (
          prev.left === next.left &&
          prev.width === next.width &&
          prev.height === next.height
        ) {
          return prev;
        }

        return next;
      });
    };

    update();

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(update);
      if (anchorRef.current) observer.observe(anchorRef.current);
      if (fixedRef.current) observer.observe(fixedRef.current);
    }

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, []);

  return {
    anchorRef,
    fixedRef,
    spacerHeight: layout.height,
    fixedStyle: {
      position: "fixed",
      top: 0,
      left: layout.left,
      width: layout.width,
      zIndex: 50,
    } satisfies CSSProperties,
  };
}
