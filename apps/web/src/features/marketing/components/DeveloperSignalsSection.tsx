import type { CSSProperties } from "react";
import { FiActivity, FiArrowUpRight, FiBox, FiCheckCircle, FiClock, FiCode, FiDatabase, FiGitBranch, FiGlobe } from "react-icons/fi";

type Signal = {
  title: string;
  detail: string;
  label: string;
  Icon: typeof FiActivity;
};

const signalColumns: Signal[][] = [
  [
    { title: "เชื่อม repository แล้ว", detail: "เชื่อม GitHub source พร้อมสำหรับ build อัตโนมัติ.", label: "Source", Icon: FiGitBranch },
    { title: "สภาพแวดล้อม Preview", detail: "ทุกการเปลี่ยนแปลงมี Preview URL แยกสำหรับตรวจสอบ.", label: "Preview", Icon: FiGlobe },
    { title: "ผ่าน health check", detail: "ตรวจ runtime เรียบร้อยก่อนรับ production traffic.", label: "Runtime", Icon: FiCheckCircle },
    { title: "Build pipeline พร้อม", detail: "workflow เดียวจัดลำดับ build, test และ deploy.", label: "Workflow", Icon: FiActivity },
  ],
  [
    { title: "ซิงก์ environment แล้ว", detail: "Secrets และ configuration ถูกแยกตามแต่ละ service.", label: "Config", Icon: FiCode },
    { title: "เชื่อมฐานข้อมูลแล้ว", detail: "เพิ่ม data service ไปพร้อมกับ application ของคุณ.", label: "Data", Icon: FiDatabase },
    { title: "อยู่ในคิว deploy", detail: "เห็น release ได้ตั้งแต่ commit จน service เปิดใช้งาน.", label: "Deploy", Icon: FiClock },
    { title: "Service runtime", detail: "Frontend, API และ worker ใช้ deployment flow เดียวกัน.", label: "Platform", Icon: FiBox },
  ],
  [
    { title: "จาก branch สู่ production", detail: "เปลี่ยน repository ที่เชื่อมไว้เป็น endpoint ที่ใช้งานจริง.", label: "Release", Icon: FiGitBranch },
    { title: "กำหนด domain แล้ว", detail: "ติดตาม address ของ preview และ production ได้ง่าย.", label: "Network", Icon: FiGlobe },
    { title: "ติดตาม deployment ได้", detail: "ตรวจสถานะของแต่ละ service ได้ตลอดการเปลี่ยนแปลง.", label: "Observe", Icon: FiActivity },
    { title: "Release เสร็จสมบูรณ์", detail: "ทีมได้รับสัญญาณชัดเจนเมื่อ service เปิดใช้งานแล้ว.", label: "Ready", Icon: FiCheckCircle },
  ],
];

function SignalCard({ signal }: { signal: Signal }) {
  const { Icon } = signal;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#c084fc]/45 hover:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-[#c084fc]">
          <Icon aria-hidden="true" />
          {signal.label}
        </span>
        <FiArrowUpRight aria-hidden="true" className="text-zinc-600" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-white">{signal.title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{signal.detail}</p>
    </article>
  );
}

function DeveloperSignalsSection() {
  return (
    <section className="w-full px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="developer-signals-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 id="developer-signals-title" className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            สร้างเพื่อทีมที่ส่งงานขึ้น production
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
            Nova ทำให้สัญญาณสำคัญของทีมอยู่ใกล้ deployment workflow ตั้งแต่เชื่อม source จน service เปิดใช้งานจริง.
          </p>
        </div>

        <div className="relative mt-12 h-[520px] overflow-hidden sm:mt-14 md:h-[580px]">
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
            {signalColumns.map((signals, columnIndex) => (
              <div key={columnIndex} className={`overflow-hidden ${columnIndex > 0 ? "hidden md:block" : ""}`}>
                <div
                  className={`nova-signal-track space-y-4 ${columnIndex === 1 ? "nova-signal-track-reverse" : ""}`}
                  style={{ "--signal-delay": `${columnIndex * -6}s` } as CSSProperties}
                >
                  {[...signals, ...signals].map((signal, index) => (
                    <SignalCard key={`${signal.title}-${index}`} signal={signal} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/75 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default DeveloperSignalsSection;
