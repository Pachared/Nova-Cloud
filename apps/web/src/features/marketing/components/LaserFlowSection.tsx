"use client";

import { useRef } from "react";
import { FiCheckCircle, FiDatabase, FiGitBranch, FiGithub, FiGlobe, FiServer } from "react-icons/fi";
import LaserFlow from "../style/LaserFlow";

const projectResults = [
  ["Repository connected", "GitHub import พร้อม branch production", FiGithub],
  ["Environment synced", "API_URL, DATABASE_URL และ secrets ถูกผูกแล้ว", FiGitBranch],
  ["Database ready", "PostgreSQL พร้อม migration เริ่มต้น", FiDatabase],
  ["Runtime allocated", "Service runtime พร้อมรับ deploy", FiServer],
  ["Preview domain", "nova-cloud-web.preview.app พร้อมใช้งาน", FiGlobe],
  ["Deployment live", "Build ผ่านและเปิด production traffic", FiCheckCircle],
] as const;

function LaserFlowSection() {
  const revealRef = useRef<HTMLImageElement | null>(null);

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
    <section id="laser-flow" className="w-full scroll-mt-32 px-4 pb-20 pt-0 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className="group relative min-h-[860px] overflow-hidden bg-transparent"
          onPointerMove={moveReveal}
          onPointerLeave={hideReveal}
        >
          <img
            ref={revealRef}
            src="/nova-laser-reveal.svg"
            alt="Nova deployment dashboard reveal"
            className="pointer-events-none absolute inset-x-0 -top-48 z-0 h-[820px] w-full object-contain opacity-0 mix-blend-lighten transition-opacity duration-300 group-hover:opacity-40 sm:-top-40 lg:-top-32"
            style={{
              "--mx": "-9999px",
              "--my": "-9999px",
              WebkitMaskImage:
                "radial-gradient(circle at var(--mx) var(--my), white 0, rgba(255,255,255,.85) 90px, rgba(255,255,255,.35) 170px, transparent 270px)",
              maskImage:
                "radial-gradient(circle at var(--mx) var(--my), white 0, rgba(255,255,255,.85) 90px, rgba(255,255,255,.35) 170px, transparent 270px)",
            } as React.CSSProperties}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[810px] bg-gradient-to-b from-transparent via-[#100d17]/15 to-[#100d17]/75 sm:h-[860px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[780px] overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[390px] w-5 -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c084fc]/55 to-white/90 blur-md" />
            <div className="absolute left-[8%] right-[8%] top-[388px] h-1 rounded-full bg-gradient-to-r from-transparent via-[#f0c7ff] to-transparent blur-[2px]" />
            <div className="absolute left-1/2 top-[322px] h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#a855f7]/25 blur-3xl" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[780px] overflow-hidden opacity-100 mix-blend-screen">
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
          <div className="absolute inset-x-6 top-[390px] z-30 mx-auto h-[420px] max-w-6xl overflow-hidden rounded-t-3xl border-x-2 border-t-2 border-[#c084fc]/55 bg-[#100d17] p-6 sm:h-[470px]">
            <div className="grid h-full gap-4">
              <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
                <div className="rounded-2xl bg-white/[0.055] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">Project provisioned</p>
                      <p className="mt-1 text-xs text-zinc-500">nova-cloud/web · main · production</p>
                    </div>
                    <span className="rounded-full bg-[#c084fc]/15 px-3 py-1 text-xs font-semibold text-[#e9d5ff]">
                      Ready
                    </span>
                  </div>
                  <div className="mt-5 h-1.5 overflow-hidden rounded-2xl bg-white/[0.06]">
                    <div className="h-full w-full rounded-2xl bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#c084fc]" />
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.055] p-4">
                  <p className="text-xs font-medium uppercase text-[#c084fc]">Result</p>
                  <p className="mt-3 text-sm font-semibold text-white">Production workflow created</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Source, runtime, database และ deploy pipeline ถูกเตรียมครบแล้ว
                  </p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {projectResults.map(([title, description, Icon]) => (
                  <div key={title} className="rounded-2xl bg-white/[0.045] p-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-black/40 text-[#c084fc]">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-white">{title}</span>
                        <span className="mt-1 block text-xs leading-5 text-zinc-500">{description}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-black/50 px-4 py-3 font-mono text-xs text-zinc-400">
                <p>$ nova deploy --source github --env production</p>
                <p className="mt-1 text-[#c084fc]">Deployment ready · domain assigned · health checks passed</p>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-20 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default LaserFlowSection;
