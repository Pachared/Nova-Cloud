"use client";

import { FiDatabase, FiEye, FiLock, FiServer, FiTerminal, FiZap } from "react-icons/fi";
import MagicBento, { type MagicBentoItem } from "./MagicBento";

const capabilities: MagicBentoItem[] = [
  { title: "Deployments", description: "Preview, production, rollback และ release history สำหรับทุก branch", label: "Deploy", Icon: FiZap },
  { title: "Environments", description: "แยก dev, staging, production พร้อม secret และ config ต่อ service", label: "Config", Icon: FiLock },
  { title: "Logs", description: "ค้นหา build logs, runtime logs และ error events ได้จากที่เดียว", label: "Observe", Icon: FiTerminal },
  { title: "Databases", description: "จัดการ PostgreSQL, Redis และ service dependency สำหรับแต่ละ project", label: "Data", Icon: FiDatabase },
  { title: "Services", description: "รัน frontend, API, workers และ cron jobs แยกกันใน workspace เดียว", label: "Runtime", Icon: FiServer },
  { title: "Monitoring", description: "ดูสถานะ deploy, health, uptime และเหตุการณ์สำคัญของระบบ", label: "Health", Icon: FiEye },
];

function CapabilitiesSection() {
  return (
    <section id="features" className="nova-page-gutter scroll-mt-32 py-24">
      <div className="mx-auto max-w-7xl py-10 sm:py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              สิ่งสำคัญสำหรับ deployment platform อยู่ครบ
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-zinc-400">
              ออกแบบสำหรับทีมที่ต้อง ship งานเร็ว แต่ยังต้องควบคุม config,
              observability และ release quality ให้มั่นใจ
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-black/45 font-mono text-xs leading-6 text-zinc-500 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
            <div className="flex items-center gap-2 px-5 py-3 text-zinc-600"><span className="h-2 w-2 rounded-full bg-[#6366f1]" /><span className="h-2 w-2 rounded-full bg-[#a855f7]" /><span className="h-2 w-2 rounded-full bg-[#c084fc]" /><span className="ml-2">nova system status</span></div>
            <div className="border-t border-white/[0.06] px-5 py-4"><p className="text-[#c084fc]">$ nova status --project nova-cloud</p><p>deployments: healthy</p><p>services: web, api, worker</p><p>environments: preview, production</p><p className="text-[#a855f7]">observability: logs + health checks active</p></div>
          </div>
        </div>
        <div className="mt-10">
          <MagicBento items={capabilities} textAutoHide={true} enableStars={true} enableSpotlight={true} enableBorderGlow={true} disableAnimations={false} spotlightRadius={300} particleCount={12} enableTilt={false} glowColor="132, 0, 255" clickEffect={true} enableMagnetism={true} />
        </div>
      </div>
    </section>
  );
}

export default CapabilitiesSection;
