"use client";

import { useRef } from "react";
import { laserProjectResults } from "../constants/LaserFlowConstants";
import LaserFlow from "../style/LaserFlow";
import DashboardReveal from "./DashboardReveal";
import TerminalTyping from "./TerminalTyping";
function LaserFlowSection() {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);

  const moveReveal = (event: React.PointerEvent<HTMLElement>) => {
    const rect = revealRef.current?.getBoundingClientRect();
    if (!rect) return;
    revealRef.current?.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    revealRef.current?.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const hideReveal = () => {
    revealRef.current?.style.setProperty("--mx", "-9999px");
    revealRef.current?.style.setProperty("--my", "-9999px");
  };

  return (
    <section id="laser-flow" className="nova-page-gutter w-full scroll-mt-32 overflow-hidden pb-20 pt-0">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className="group relative min-h-[900px] bg-transparent sm:min-h-[860px]"
          onPointerMove={moveReveal}
          onPointerLeave={hideReveal}
        >
          <DashboardReveal
            revealRef={revealRef}
            style={{
              "--mx": "-9999px",
              "--my": "-9999px",
              WebkitMaskImage: "radial-gradient(circle at var(--mx) var(--my), white 0, rgba(255,255,255,.85) 90px, rgba(255,255,255,.35) 170px, transparent 270px)",
              maskImage: "radial-gradient(circle at var(--mx) var(--my), white 0, rgba(255,255,255,.85) 90px, rgba(255,255,255,.35) 170px, transparent 270px)",
            } as React.CSSProperties}
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 z-40 w-[calc(100vw+12rem)] -translate-x-1/2"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, transparent, black 80px, black calc(100% - 120px), transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, transparent, black 80px, black calc(100% - 120px), transparent)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
            aria-hidden="true"
          >
            <LaserFlow
              surfaceRef={surfaceRef}
              beamPosition={0.5}
              color="#c084fc"
              intensity={1.8}
              beamWidth={1.5}
              flare={1.5}
              spread={1.5}
              spill={1}
              fog={0.2}
              dust={1.6}
              dpr={1.25}
            />
          </div>
          <div ref={surfaceRef} className="absolute inset-x-2 top-[300px] z-30 mx-auto h-[430px] max-w-6xl overflow-hidden rounded-t-3xl border-x-2 border-t-2 border-[#c084fc]/55 bg-[#100d17] p-3 sm:inset-x-6 sm:top-[390px] sm:h-[470px] sm:p-6">
            <div className="grid h-full gap-2 sm:gap-4">
              <div className="grid grid-cols-[1fr_auto] gap-2 sm:gap-3 lg:grid-cols-[1fr_280px]">
                <div className="rounded-2xl bg-white/[0.055] p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">Project provisioned</p>
                      <p className="mt-1 text-xs text-zinc-500">nova-cloud/web · main · production</p>
                    </div>
                    <span className="rounded-full bg-[#c084fc]/15 px-3 py-1 text-xs font-semibold text-[#e9d5ff]">
                      Ready
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.055] p-3 sm:p-4">
                  <p className="text-xs font-medium uppercase text-[#c084fc]">Result</p>
                  <p className="mt-2 text-sm font-semibold text-white sm:mt-3">Production workflow created</p>
                  <p className="mt-1 hidden text-xs leading-5 text-zinc-500 sm:block">
                    Source, runtime, database และ deploy pipeline ถูกเตรียมครบแล้ว
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {laserProjectResults.map(([title, description, Icon]) => (
                  <div key={title} className="group/result cursor-default rounded-2xl bg-white/[0.045] p-2.5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-[0_14px_36px_rgba(168,85,247,0.12)] sm:p-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/40 text-[#c084fc] transition group-hover/result:bg-[#a855f7]/20 group-hover/result:text-[#e9d5ff] group-hover/result:shadow-[0_0_28px_rgba(168,85,247,0.48)] sm:h-9 sm:w-9 sm:rounded-2xl">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-medium text-white sm:text-sm">{title}</span>
                        <span className="mt-1 hidden text-xs leading-5 text-zinc-500 sm:block">{description}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="overflow-hidden rounded-2xl bg-[#030308] font-mono text-[0.65rem] text-zinc-400 shadow-inner shadow-black/70 sm:text-xs">
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2 sm:px-4 sm:py-3">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-300" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-3">
                  <p className="mb-2 text-[#c084fc] sm:mb-3">&gt;_</p>
                  <TerminalTyping command="$ nova deploy --source github --env production" output="Deployment ready · domain assigned · health checks passed" className="text-zinc-400 [&>p:last-child]:text-[#c084fc]" />
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-40 h-20 w-screen -translate-x-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
export default LaserFlowSection;
