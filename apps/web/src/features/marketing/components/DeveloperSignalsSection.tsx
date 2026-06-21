import type { CSSProperties } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { signalColumns, type Signal } from "../constants/DeveloperSignalsConstants";

function SignalCard({ signal }: { signal: Signal }) {
  const { Icon } = signal;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#c084fc]/45 hover:bg-white/[0.05] hover:shadow-[0_14px_36px_rgba(168,85,247,0.14)]">
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
    <section className="nova-page-gutter w-full py-16 sm:py-20" aria-labelledby="developer-signals-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 id="developer-signals-title" className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            ทุก deployment มีบริบทให้ทีมตัดสินใจ
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
            Nova รวบรวม ownership, approval, alerts และประวัติ release ไว้ในจุดที่ทีมใช้ติดตามงานร่วมกัน.
          </p>
        </div>

        <div className="relative mt-10 h-[480px] overflow-hidden sm:mt-14 sm:h-[560px] lg:h-[580px]">
          <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {signalColumns.map((signals, columnIndex) => (
              <div key={columnIndex} className={`overflow-hidden ${columnIndex > 1 ? "hidden lg:block" : ""}`}>
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
