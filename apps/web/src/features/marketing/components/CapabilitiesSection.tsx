"use client";

import { capabilities } from "../constants/CapabilitiesConstants";
import MagicBento from "./MagicBento";
import TerminalTyping from "./TerminalTyping";

function CapabilitiesSection() {
  return (
    <section id="features" className="nova-page-gutter relative scroll-mt-32 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl py-6 sm:py-10 lg:py-14">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              สิ่งสำคัญสำหรับ deployment platform อยู่ครบ
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-zinc-400">
              ออกแบบสำหรับทีมที่ต้อง ship งานเร็ว แต่ยังต้องควบคุม config,
              observability และ release quality ให้มั่นใจ
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#030308] font-mono text-xs leading-6 text-zinc-500 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3"><span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-yellow-300" /><span className="h-2 w-2 rounded-full bg-emerald-400" /></div>
            <div className="px-5 py-4"><p className="mb-3 text-[#c084fc]">&gt;_</p><TerminalTyping command="$ nova status --project nova-cloud" className="text-zinc-400" /><div className="mt-3"><p>deployments: healthy</p><p>services: web, api, worker</p><p>environments: preview, production</p><p className="text-[#c084fc]">observability: logs + health checks active</p></div></div>
          </div>
        </div>
        <div className="mt-10">
          <MagicBento items={capabilities} textAutoHide={true} enableStars={true} enableSpotlight={true} enableBorderGlow={true} disableAnimations={false} spotlightRadius={300} particleCount={12} enableTilt={false} glowColor="132, 0, 255" clickEffect={true} enableMagnetism={true} />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}

export default CapabilitiesSection;
