import type { CSSProperties, RefObject } from "react";

const metrics = [["Uptime", "99.99%"], ["Latency", "42ms"], ["Requests", "1.2M"], ["Errors", "0.02%"]] as const;
const trafficBars = [34, 52, 44, 70, 58, 82, 64, 90, 74, 96, 84, 100];

type DashboardRevealProps = {
  revealRef: RefObject<HTMLDivElement | null>;
  style: CSSProperties;
};

function DashboardReveal({ revealRef, style }: DashboardRevealProps) {
  return (
    <div ref={revealRef} className="pointer-events-none absolute inset-x-0 -top-48 z-0 mx-auto h-[820px] w-full max-w-6xl opacity-0 mix-blend-lighten transition-opacity duration-300 group-hover:opacity-45 sm:-top-40 lg:-top-32" style={style}>
      <div className="absolute inset-x-4 top-10 grid h-[660px] grid-cols-[180px_1fr] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#07060b] text-white shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
        <aside className="border-r border-white/[0.07] bg-white/[0.025] p-5">
          <div className="text-sm font-semibold">Nova Cloud</div>
          <div className="mt-8 space-y-3 text-xs text-zinc-500">
            {["Overview", "Deployments", "Services", "Domains", "Logs"].map((item, index) => (
              <div key={item} className={`rounded-xl px-3 py-2 ${index === 0 ? "bg-[#a855f7]/15 text-[#e9d5ff]" : ""}`}>{item}</div>
            ))}
          </div>
        </aside>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div><p className="text-xl font-semibold">nova-cloud/web</p><p className="mt-1 text-xs text-zinc-500">production · main · Bangkok edge</p></div>
            <span className="rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-semibold text-emerald-200">Healthy</span>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {metrics.map(([label, value]) => <div key={label} className="rounded-2xl bg-white/[0.045] p-4"><p className="text-[0.68rem] uppercase tracking-[0.14em] text-zinc-600">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></div>)}
          </div>
          <div className="mt-4 grid grid-cols-[1.2fr_0.8fr] gap-4">
            <div className="rounded-2xl bg-white/[0.045] p-4">
              <div className="flex items-center justify-between text-xs text-zinc-500"><span>Traffic</span><span className="text-[#c084fc]">live</span></div>
              <div className="mt-8 flex h-28 items-end gap-2">
                {trafficBars.map((height, index) => <span key={index} className="flex-1 rounded-t bg-gradient-to-t from-[#6366f1] to-[#c084fc]" style={{ height: `${height}%` }} />)}
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.045] p-4">
              <p className="text-xs text-zinc-500">Latest deploy</p><p className="mt-4 text-sm font-semibold">Production ready</p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">Build passed, migrations synced, preview promoted.</p>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full w-full rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#c084fc]" /></div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-black/45 p-4 font-mono text-xs text-zinc-500"><p className="text-[#c084fc]">$ nova logs --service web --tail</p><p className="mt-2">200 GET /dashboard 42ms</p><p>200 POST /api/deployments 88ms</p><p className="text-emerald-300">health check passed · region bkk-1</p></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardReveal;
