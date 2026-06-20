import { FiArrowUpRight, FiGithub, FiShield, FiZap } from "react-icons/fi";

const footerGroups = [
  {
    title: "แพลตฟอร์ม",
    links: [
      ["ขั้นตอนการ deploy", "#workflow"],
      ["ความสามารถของแพลตฟอร์ม", "#features"],
      ["เทคโนโลยีที่รองรับ", "#technologies"],
    ],
  },
  {
    title: "เริ่มต้นใช้งาน",
    links: [
      ["สร้างโปรเจกต์", "/new"],
      ["เชื่อม repository", "/new"],
      ["ความพร้อมสำหรับ production", "#laser-flow"],
    ],
  },
] as const;

function FooterSection() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#09080f]" aria-label="Nova Cloud footer">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36" aria-hidden="true">
        <div className="absolute inset-x-[14%] top-0 h-px bg-gradient-to-r from-transparent via-[#c084fc]/35 to-transparent" />
        <div className="absolute left-1/2 top-0 h-28 w-[min(62rem,84vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(192,132,252,0.14),rgba(168,85,247,0.055)_42%,rgba(76,29,149,0.025)_66%,transparent_90%)] blur-2xl" />
        <div className="absolute left-1/2 top-0 h-20 w-[min(42rem,62vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(240,200,255,0.18),rgba(192,132,252,0.075)_46%,rgba(126,34,206,0.035)_70%,transparent_92%)] blur-xl" />
        <div className="absolute left-1/2 top-10 h-24 w-[min(56rem,76vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.035),rgba(88,28,135,0.018)_52%,transparent_86%)] blur-3xl" />
      </div>
      <div className="nova-page-gutter mx-auto max-w-7xl pt-10">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(11rem,0.55fr)_minmax(11rem,0.55fr)] lg:gap-12">
          <div className="max-w-sm">
            <a href="#home" className="inline-flex items-center gap-2 text-lg font-bold text-white">
              <img src="/Nova.svg" alt="" className="h-8 w-8" />
              Nova Cloud
            </a>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Deploy, ดูแล และขยายทุก service จาก workflow เดียวที่พร้อมสำหรับ production.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#c084fc]">
              <FiZap aria-hidden="true" />
              ออกแบบเพื่อการส่งมอบที่เชื่อถือได้
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="lg:justify-self-end">
              <h3 className="text-sm font-semibold text-white">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="group inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white">
                      {label}
                      <FiArrowUpRight className="text-xs opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Nova Cloud. สร้างสำหรับทีมยุคใหม่.</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-2">
              <FiShield className="text-[#c084fc]" aria-hidden="true" />
              workflow การ deploy ที่ปลอดภัย
            </span>
            <a href="https://github.com/Pachared/Nova-Cloud" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
              <FiGithub aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
