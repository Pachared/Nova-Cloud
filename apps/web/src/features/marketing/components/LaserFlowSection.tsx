"use client";

import { useRef } from "react";
import { FiCheckCircle, FiDatabase, FiGitBranch, FiGithub, FiGlobe, FiServer } from "react-icons/fi";
import LaserFlow from "../style/LaserFlow";
import DashboardReveal from "./DashboardReveal";
import TerminalTyping from "./TerminalTyping";

const projectResults = [
  ["Repository connected", "GitHub import พร้อม branch production", FiGithub],
  ["Environment synced", "API_URL, DATABASE_URL และ secrets ถูกผูกแล้ว", FiGitBranch],
  ["Database ready", "PostgreSQL พร้อม migration เริ่มต้น", FiDatabase],
  ["Runtime allocated", "Service runtime พร้อมรับ deploy", FiServer],
  ["Preview domain", "nova-cloud-web.preview.app พร้อมใช้งาน", FiGlobe],
  ["Deployment live", "Build ผ่านและเปิด production traffic", FiCheckCircle],
] as const;
function LaserFlowSection() {
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
    <section id="laser-flow" className="nova-page-gutter w-full scroll-mt-32 pb-20 pt-0">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className="group relative min-h-[740px] overflow-hidden bg-transparent sm:min-h-[860px]"
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
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[700px] bg-gradient-to-b from-transparent via-[#100d17]/15 to-[#100d17]/75 sm:h-[860px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[680px] overflow-hidden sm:h-[780px]">
            <div className="absolute left-1/2 top-0 h-[300px] w-4 -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c084fc]/55 to-white/90 blur-md sm:h-[390px] sm:w-5" />
            <div className="absolute left-[6%] right-[6%] top-[298px] h-1 rounded-full bg-gradient-to-r from-transparent via-[#f0c7ff] to-transparent blur-[2px] sm:left-[8%] sm:right-[8%] sm:top-[388px]" />
            <div className="absolute left-1/2 top-[244px] h-28 w-[18rem] -translate-x-1/2 rounded-full bg-[#a855f7]/25 blur-3xl sm:top-[322px] sm:h-36 sm:w-[28rem]" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[680px] overflow-hidden opacity-100 mix-blend-screen sm:h-[780px]">
            <LaserFlow
              color="#c084fc"
              horizontalBeamOffset={0}
              verticalBeamOffset={0}
              horizontalSizing={0.5}
              verticalSizing={2.0}
              wispDensity={1}
              wispSpeed={15.0}
              wispIntensity={5.0}
              flowSpeed={0.35}
              flowStrength={0.25}
              fogIntensity={0.45}
              fogScale={0.3}
              fogFallSpeed={0.6}
              mouseTiltStrength={0.01}
              mouseSmoothTime={0.0}
              decay={1.1}
              falloffStart={1.2}
            />
          </div>
          <div className="absolute inset-x-2 top-[300px] z-30 mx-auto h-[430px] max-w-6xl overflow-hidden rounded-t-3xl border-x-2 border-t-2 border-[#c084fc]/55 bg-[#100d17] p-3 sm:inset-x-6 sm:top-[390px] sm:h-[470px] sm:p-6">
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
                {projectResults.map(([title, description, Icon]) => (
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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-20 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
export default LaserFlowSection;
