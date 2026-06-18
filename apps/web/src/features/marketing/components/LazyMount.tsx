"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type LazyMountProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  minHeight?: string;
};

function LazyMount({
  children,
  className,
  rootMargin = "300px",
  minHeight = "1px",
}: LazyMountProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;
    const container = containerRef.current;
    if (!container || !window.IntersectionObserver) {
      setShouldMount(true);
      return;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [rootMargin, shouldMount]);

  return (
    <div ref={containerRef} className={className} style={{ minHeight }}>
      {shouldMount ? children : null}
    </div>
  );
}

export default LazyMount;
