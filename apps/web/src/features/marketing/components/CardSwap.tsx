"use client";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import gsap from "gsap";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  customClass?: string;
};

type CardSwapProps = {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  skewAmount?: number;
  children: ReactNode;
};

type Slot = { x: number; y: number; z: number; zIndex: number };

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    data-card-swap-item
    className={`absolute left-1/2 top-1/2 overflow-hidden rounded-3xl bg-[#181520] shadow-2xl shadow-black/45 [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform] ${customClass ?? ""} ${className ?? ""}`.trim()}
  />
));

Card.displayName = "Card";

function getSlot(index: number, distance: number, verticalDistance: number, total: number): Slot {
  return {
    x: index * distance,
    y: -index * verticalDistance,
    z: -index * distance * 1.5,
    zIndex: total - index,
  };
}

function CardSwap({
  width = "100%",
  height = "100%",
  cardDistance = 18,
  verticalDistance = 22,
  delay = 5200,
  pauseOnHover = true,
  skewAmount = 0,
  children,
}: CardSwapProps) {
  const cards = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const order = useRef(cards.map((_, index) => index));
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const nodes = Array.from(containerRef.current?.querySelectorAll<HTMLDivElement>("[data-card-swap-item]") ?? []);
    if (nodes.length < 2) return;

    const place = (node: HTMLDivElement, slot: Slot) => {
      gsap.set(node, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skewAmount,
        transformOrigin: "center center",
        zIndex: slot.zIndex,
        force3D: true,
      });
    };

    order.current = cards.map((_, index) => index);
    nodes.forEach((node, index) => place(node, getSlot(index, cardDistance, verticalDistance, nodes.length)));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const swap = () => {
      const [front, ...rest] = order.current;
      const frontNode = nodes[front];
      if (frontNode === null || rest.length === 0) return;

      const dropDistance = containerRef.current?.offsetHeight ?? 360;
      const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      timelineRef.current = timeline;

      timeline.to(frontNode, { y: `+=${dropDistance}`, duration: 0.7 });
      rest.forEach((cardIndex, index) => {
        const node = nodes[cardIndex];
        if (node === null) return;
        const slot = getSlot(index, cardDistance, verticalDistance, nodes.length);
        timeline.set(node, { zIndex: slot.zIndex }, "<+=0.1");
        timeline.to(node, { x: slot.x, y: slot.y, z: slot.z, duration: 0.72 }, "<");
      });

      const backSlot = getSlot(nodes.length - 1, cardDistance, verticalDistance, nodes.length);
      timeline.set(frontNode, { zIndex: backSlot.zIndex });
      timeline.to(frontNode, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: 0.72 }, ">-=0.25");
      timeline.call(() => {
        order.current = [...rest, front];
      });
    };

    let isPaused = false;
    let isInView = true;
    const timer = window.setInterval(() => {
      if (!isPaused && isInView) swap();
    }, delay);
    const container = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (!isInView) timelineRef.current?.pause();
        if (isInView && !isPaused) timelineRef.current?.play();
      },
      { rootMargin: "120px" },
    );
    if (container) observer.observe(container);
    const pause = () => {
      isPaused = true;
      timelineRef.current?.pause();
    };
    const resume = () => {
      isPaused = false;
      timelineRef.current?.play();
    };

    if (pauseOnHover && container) {
      container.addEventListener("mouseenter", pause);
      container.addEventListener("mouseleave", resume);
    }

    return () => {
      window.clearInterval(timer);
      timelineRef.current?.kill();
      observer.disconnect();
      if (container) {
        container.removeEventListener("mouseenter", pause);
        container.removeEventListener("mouseleave", resume);
      }
    };
  }, [cards, cardDistance, delay, pauseOnHover, skewAmount, verticalDistance]);

  return (
    <div ref={containerRef} className="relative max-w-full [perspective:900px]" style={{ width, height }}>
      {cards.map((card, index) =>
        isValidElement<CardProps>(card)
          ? cloneElement(card, {
              key: card.key ?? index,
              style: { width: "100%", height: "100%", ...card.props.style } as CSSProperties,
            })
          : card,
      )}
    </div>
  );
}

export default CardSwap;
