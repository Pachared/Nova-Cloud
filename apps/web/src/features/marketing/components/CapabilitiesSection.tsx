import { FiDatabase, FiEye, FiLock, FiServer, FiTerminal, FiZap } from "react-icons/fi";

const capabilities = [
  ["Deployments", "Preview, production, rollback และ release history สำหรับทุก branch", FiZap],
  ["Environments", "แยก dev, staging, production พร้อม secret และ config ต่อ service", FiLock],
  ["Logs", "ค้นหา build logs, runtime logs และ error events ได้จากที่เดียว", FiTerminal],
  ["Databases", "จัดการ PostgreSQL, Redis และ service dependency สำหรับแต่ละ project", FiDatabase],
  ["Services", "รัน frontend, API, workers และ cron jobs แยกกันใน workspace เดียว", FiServer],
  ["Monitoring", "ดูสถานะ deploy, health, uptime และเหตุการณ์สำคัญของระบบ", FiEye],
] as const;

function CapabilitiesSection() {
  return (
    <section id="features" className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              สิ่งสำคัญสำหรับ deployment platform อยู่ครบ
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-400 sm:text-base">
              ออกแบบสำหรับทีมที่ต้อง ship งานเร็ว แต่ยังต้องควบคุม config,
              observability และ release quality ให้มั่นใจ
            </p>
          </div>
          <div className="mt-8 rounded-2xl bg-[#0d0c12] p-4 font-mono text-xs leading-6 text-zinc-500">
            <p className="text-violet-300">$ nova status --project nova-cloud</p>
            <p>deployments: healthy</p>
            <p>services: web, api, worker</p>
            <p>environments: preview, production</p>
            <p className="text-cyan-300">observability: logs + health checks active</p>
          </div>
        </div>

        <div className="divide-y divide-white/[0.06] rounded-2xl bg-white/[0.045] px-5">
          {capabilities.map(([title, description, Icon]) => (
            <article key={title} className="flex gap-4 py-5">
              <Icon className="mt-1 shrink-0 text-xl text-violet-300" aria-hidden="true" />
              <div>
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CapabilitiesSection;
