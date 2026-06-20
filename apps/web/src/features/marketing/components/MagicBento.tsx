"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { IconType } from "react-icons";
import { gsap } from "gsap";

export type MagicBentoItem = {
  title: string;
  description: string;
  label: string;
  Icon: IconType;
};

type MagicBentoProps = {
  items: MagicBentoItem[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
};

type MagicStyle = CSSProperties & Record<`--magic-${string}`, string>;

function MagicBentoCard({ item, index, animationsDisabled, textAutoHide, enableStars, enableBorderGlow, particleCount, enableTilt, glowColor, clickEffect, enableMagnetism }: MagicBentoItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLSpanElement[]>([]);
  const { Icon } = item;

  const clearParticles = () => {
    particlesRef.current.forEach((particle) => {
      gsap.killTweensOf(particle);
      particle.remove();
    });
    particlesRef.current = [];
  };

  useEffect(() => clearParticles, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || animationsDisabled) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--magic-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--magic-y", `${(y / rect.height) * 100}%`);
    const offsetX = x - rect.width / 2;
    const offsetY = y - rect.height / 2;
    gsap.to(card, {
      x: enableMagnetism ? offsetX * 0.035 : 0,
      y: enableMagnetism ? offsetY * 0.035 : 0,
      rotateX: enableTilt ? -(offsetY / rect.height) * 7 : 0,
      rotateY: enableTilt ? (offsetX / rect.width) * 7 : 0,
      duration: 0.24,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const handlePointerEnter = () => {
    const card = cardRef.current;
    if (!card || animationsDisabled || !enableStars) return;
    clearParticles();
    const rect = card.getBoundingClientRect();
    particlesRef.current = Array.from({ length: particleCount }, (_, particleIndex) => {
      const particle = document.createElement("span");
      particle.className = "nova-magic-particle";
      particle.style.left = `${Math.random() * rect.width}px`;
      particle.style.top = `${Math.random() * rect.height}px`;
      particle.style.backgroundColor = `rgb(${glowColor})`;
      card.appendChild(particle);
      gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.8, duration: 0.24, delay: particleIndex * 0.035, ease: "back.out(1.7)" });
      gsap.to(particle, { x: (Math.random() - 0.5) * 56, y: (Math.random() - 0.5) * 56, opacity: 0.2, duration: 1.8 + Math.random(), repeat: -1, yoyo: true, ease: "sine.inOut" });
      return particle;
    });
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    clearParticles();
    if (!card || animationsDisabled) return;
    gsap.to(card, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.35, ease: "power2.out" });
  };

  const handleClick = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || animationsDisabled || !clickEffect) return;
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "nova-magic-ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    ripple.style.background = `radial-gradient(circle, rgba(${glowColor}, 0.42), transparent 68%)`;
    card.appendChild(ripple);
    gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.7, ease: "power2.out", onComplete: () => ripple.remove() });
  };

  const cardStyle: MagicStyle = { "--magic-color": glowColor, "--magic-x": "50%", "--magic-y": "50%" };
  const descriptionClass = textAutoHide ? "max-h-12 overflow-hidden" : "";
  const sizeClass = index === 0 ? "lg:col-span-2 lg:row-span-2" : index >= 3 ? "lg:col-span-2" : "";

  return (
    <article ref={cardRef} style={cardStyle} onPointerMove={handlePointerMove} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} onClick={handleClick} className={`nova-magic-card group relative z-10 min-h-48 overflow-hidden rounded-2xl bg-[#15131c] p-6 ${enableBorderGlow ? "nova-magic-border" : ""} ${sizeClass}`}>
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase text-[#c084fc]">{item.label}</span>
        <Icon className="text-2xl text-[#c084fc]" aria-hidden="true" />
      </div>
      <div className="relative z-10 mt-10">
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <p className={`mt-3 max-w-md text-sm leading-6 text-zinc-400 ${descriptionClass}`}>{item.description}</p>
      </div>
    </article>
  );
}

type MagicBentoItemProps = Omit<MagicBentoProps, "items" | "enableSpotlight" | "spotlightRadius" | "disableAnimations"> & {
  item: MagicBentoItem;
  index: number;
  animationsDisabled: boolean;
};

function MagicBento({ items, textAutoHide = true, enableStars = true, enableSpotlight = true, enableBorderGlow = true, disableAnimations = false, spotlightRadius = 300, particleCount = 12, enableTilt = false, glowColor = "132, 0, 255", clickEffect = true, enableMagnetism = true }: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [animationsDisabled, setAnimationsDisabled] = useState(disableAnimations);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
    const update = () => setAnimationsDisabled(disableAnimations || mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [disableAnimations]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enableSpotlight || animationsDisabled || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    gridRef.current.style.setProperty("--magic-spotlight-x", `${event.clientX - rect.left}px`);
    gridRef.current.style.setProperty("--magic-spotlight-y", `${event.clientY - rect.top}px`);
    gridRef.current.style.setProperty("--magic-spotlight-opacity", "1");
  };

  return (
    <div ref={gridRef} onPointerMove={handlePointerMove} onPointerLeave={() => gridRef.current?.style.setProperty("--magic-spotlight-opacity", "0")} className="nova-magic-bento relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" style={{ "--magic-radius": `${spotlightRadius}px`, "--magic-spotlight-opacity": "0" } as MagicStyle}>
      {enableSpotlight && <div className="nova-magic-spotlight pointer-events-none absolute inset-0" aria-hidden="true" />}
      {items.map((item, index) => <MagicBentoCard key={item.title} item={item} index={index} textAutoHide={textAutoHide} enableStars={enableStars} enableBorderGlow={enableBorderGlow} particleCount={particleCount} enableTilt={enableTilt} glowColor={glowColor} clickEffect={clickEffect} enableMagnetism={enableMagnetism} animationsDisabled={animationsDisabled} />)}
    </div>
  );
}

export default MagicBento;
