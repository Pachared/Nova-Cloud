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
  easing?: "linear" | "elastic";
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
    z: -index * Math.abs(distance) * 1.5,
    zIndex: total - index,
  };
}

function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5200,
  pauseOnHover = false,
  skewAmount = 6,
  easing = "elastic",
  children,
}: CardSwapProps) {
  const cards = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const order = useRef(cards.map((_, index) => index));
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const nodes = Array.from(containerRef.current?.querySelectorAll<HTMLDivElement>("[data-card-swap-item]") ?? []);
    if (nodes.length < 2) return;
    const timing =
      easing === "elastic"
        ? { ease: "elastic.out(0.6,0.9)", durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
        : { ease: "power1.inOut", durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

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

      const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      timelineRef.current = timeline;

      timeline.to(frontNode, { y: "+=500", duration: timing.durDrop, ease: timing.ease });
      timeline.addLabel("promote", `-=${timing.durDrop * timing.promoteOverlap}`);
      rest.forEach((cardIndex, index) => {
        const node = nodes[cardIndex];
        if (node === null) return;
        const slot = getSlot(index, cardDistance, verticalDistance, nodes.length);
        timeline.set(node, { zIndex: slot.zIndex }, "promote");
        timeline.to(node, { x: slot.x, y: slot.y, z: slot.z, duration: timing.durMove, ease: timing.ease }, `promote+=${index * 0.15}`);
      });

      const backSlot = getSlot(nodes.length - 1, cardDistance, verticalDistance, nodes.length);
      timeline.addLabel("return", `promote+=${timing.durMove * timing.returnDelay}`);
      timeline.call(() => {
        gsap.set(frontNode, { zIndex: backSlot.zIndex });
      }, undefined, "return");
      timeline.to(frontNode, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: timing.durReturn, ease: timing.ease }, "return");
      timeline.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
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
  }, [cards, cardDistance, delay, easing, pauseOnHover, skewAmount, verticalDistance]);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 right-0 max-w-full origin-bottom-right -translate-x-[18%] translate-y-[20%] overflow-visible [perspective:900px] max-md:scale-75 max-md:-translate-x-[2%] max-md:translate-y-[25%]"
      style={{ width, height }}
    >
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
