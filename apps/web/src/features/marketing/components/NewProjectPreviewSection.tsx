import { FiBox, FiDatabase, FiGithub, FiPlus, FiSearch, FiServer } from "react-icons/fi";

const createOptions = [
  ["Deploy from GitHub", "Import repository แล้ว deploy อัตโนมัติ", FiGithub],
  ["Start from template", "เลือก starter สำหรับ frontend, API หรือ full-stack", FiBox],
  ["Add database", "เพิ่ม PostgreSQL หรือ Redis พร้อม env binding", FiDatabase],
  ["Empty project", "เริ่ม workspace เปล่าแล้วค่อยเพิ่ม service", FiPlus],
] as const;

function NewProjectPreviewSection() {
  return (
    <section id="templates" className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            เริ่มโปรเจกต์ใหม่แบบเดียวกับเครื่องมือ production
          </h2>
          <p className="mt-4 text-sm leading-6 text-zinc-400 sm:text-base">
            หน้า New Project ของ Nova ถูกออกแบบให้ต่อยอดจาก GitHub, template,
            database หรือ empty service ได้โดยตรง
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-[#08080d]/90 p-4 shadow-2xl shadow-black/40 sm:p-5">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
          <div className="grid gap-3 lg:grid-cols-[190px_1fr]">
            <div className="rounded-2xl bg-white/[0.055] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">New project</p>
                  <p className="mt-1 text-xs text-zinc-500">Personal workspace</p>
                </div>
                <FiServer className="shrink-0 text-violet-300" aria-hidden="true" />
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-2xl bg-white/[0.06]">
                <div className="h-full w-2/3 rounded-2xl bg-gradient-to-r from-indigo-400 via-violet-300 to-fuchsia-300" />
              </div>
            </div>
            <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/[0.055] px-4 py-3 text-sm text-zinc-500">
              <FiSearch className="shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate">Search repositories, templates, or services</span>
            </div>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {createOptions.map(([title, description, Icon]) => (
              <button
                key={title}
                className="group flex min-h-36 cursor-pointer flex-col justify-between rounded-2xl bg-white/[0.045] p-4 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/35 text-zinc-300 transition group-hover:text-violet-300">
                  <Icon aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">{title}</span>
                  <span className="mt-2 block text-xs leading-5 text-zinc-500">{description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewProjectPreviewSection;
