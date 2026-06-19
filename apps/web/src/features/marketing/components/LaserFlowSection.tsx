"use client";

import { useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";

import LaserFlow from "../style/LaserFlow";

function LaserFlowSection() {
  const revealRef = useRef<HTMLImageElement | null>(null);

  const moveReveal = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    revealRef.current?.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    revealRef.current?.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const hideReveal = () => {
    revealRef.current?.style.setProperty("--mx", "-9999px");
    revealRef.current?.style.setProperty("--my", "-9999px");
  };

  return (
    <section id="laser-flow" className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className="group relative min-h-[640px] overflow-hidden rounded-3xl bg-[#100d17] shadow-2xl shadow-black/40"
          onPointerMove={moveReveal}
          onPointerLeave={hideReveal}
        >
          <img
            ref={revealRef}
            src="/CICD.jpg"
            alt="CI/CD pipeline reveal"
            className="pointer-events-none absolute inset-x-0 -top-16 z-0 h-[66%] w-full object-cover opacity-10 mix-blend-lighten transition-opacity duration-300 group-hover:opacity-35"
            style={{
              "--mx": "-9999px",
              "--my": "-9999px",
              WebkitMaskImage:
                "radial-gradient(circle at var(--mx) var(--my), white 0, rgba(255,255,255,.85) 90px, rgba(255,255,255,.35) 170px, transparent 270px)",
              maskImage:
                "radial-gradient(circle at var(--mx) var(--my), white 0, rgba(255,255,255,.85) 90px, rgba(255,255,255,.35) 170px, transparent 270px)",
            } as React.CSSProperties}
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#100d17]/55 via-[#100d17]/10 to-[#100d17]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[76%] opacity-100">
            <LaserFlow
              color="#c084fc"
              horizontalBeamOffset={0}
              verticalBeamOffset={0.04}
              horizontalSizing={0.95}
              verticalSizing={1.8}
              fogIntensity={0.42}
              fogScale={0.32}
              wispDensity={1.2}
              wispIntensity={4.5}
              flowSpeed={0.32}
              mouseTiltStrength={0.02}
            />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-[74%] w-1 -translate-x-1/2 bg-[#c084fc] shadow-[0_0_20px_8px_rgba(192,132,252,0.65),0_0_80px_32px_rgba(168,85,247,0.42)]" />
          <div className="pointer-events-none absolute bottom-[230px] left-[8%] right-[8%] z-20 h-1 rounded-full bg-[#c084fc] shadow-[0_0_18px_7px_rgba(192,132,252,0.75),0_0_70px_24px_rgba(168,85,247,0.45)] sm:bottom-[260px]" />
          <div className="pointer-events-none absolute bottom-[224px] left-1/2 z-20 h-20 w-56 -translate-x-1/2 rounded-full bg-[#c084fc]/55 blur-3xl sm:bottom-[254px]" />
          <button
            type="button"
            className="absolute right-6 top-6 z-30 flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-white/[0.045] text-white transition hover:bg-white/[0.08] hover:text-[#c084fc]"
            aria-label="Refresh laser preview"
          >
            <FiRefreshCw className="text-2xl" aria-hidden="true" />
          </button>
          <div className="absolute inset-x-6 bottom-0 z-30 mx-auto h-[230px] max-w-6xl rounded-t-3xl border-x-2 border-t-2 border-[#c084fc] bg-[#100d17]/96 p-6 shadow-[0_-24px_80px_rgba(168,85,247,0.22)] sm:h-[260px]">
            <div className="grid h-full grid-cols-2 gap-4 opacity-55 sm:grid-cols-4">
              {Array.from({ length: 32 }).map((_, index) => (
                <span key={index} className="h-1 w-1 rounded-full bg-[#c084fc]/30" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LaserFlowSection;
