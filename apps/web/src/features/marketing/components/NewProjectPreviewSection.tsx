import { FiBox, FiDatabase, FiGithub, FiPlus, FiSearch, FiServer } from "react-icons/fi";
import GlassSurface from "@/shared/ui/GlassSurface";

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

        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={16}
          backgroundOpacity={0.08}
          saturation={1.5}
          contentClassName="block p-4"
          className="rounded-2xl"
        >
          <div className="flex items-center justify-between rounded-2xl bg-black/40 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">New project</p>
              <p className="text-xs text-zinc-500">Personal workspace</p>
            </div>
            <FiServer className="text-cyan-300" aria-hidden="true" />
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-black/35 px-4 py-3 text-sm text-zinc-500">
            <FiSearch aria-hidden="true" />
            <span>Search repositories, templates, or services</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {createOptions.map(([title, description, Icon]) => (
              <button
                key={title}
                className="cursor-pointer rounded-2xl bg-white/[0.06] p-4 text-left transition hover:bg-white/[0.1]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/35 text-zinc-300">
                  <Icon aria-hidden="true" />
                </span>
                <span className="mt-8 block text-sm font-medium text-white">{title}</span>
                <span className="mt-2 block text-xs leading-5 text-zinc-500">{description}</span>
              </button>
            ))}
          </div>
        </GlassSurface>
      </div>
    </section>
  );
}

export default NewProjectPreviewSection;
