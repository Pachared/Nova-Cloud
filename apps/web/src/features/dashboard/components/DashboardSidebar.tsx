import { FiMoreVertical } from "react-icons/fi";
import { dashboardLinks, dashboardNavItems } from "../constants/DashboardConstants";

function DashboardSidebar() {
  return (
    <aside className="hidden h-screen w-[218px] shrink-0 border-r border-[#7c3aed]/20 bg-[#0b0713] text-sm text-zinc-500 lg:flex lg:flex-col">
      <div className="flex h-14 items-center px-4">
        <a href="/" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f8f7ff]">
          <img src="/Nova.svg" alt="Nova" className="h-4 w-4 invert" />
        </a>
      </div>

      <button className="mx-2 mt-3 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-[#1d1630]">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12091f] text-[8px] font-bold text-[#c084fc] ring-1 ring-[#7c3aed]/25">
          NOVA
        </span>
        <span>
          <span className="block text-sm font-bold text-white">FULLTANK</span>
          <span className="block text-[10px] font-bold uppercase text-[#c084fc]">Hobby</span>
        </span>
      </button>

      <nav className="mt-6 space-y-1 border-b border-[#7c3aed]/15 px-2 pb-5">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left font-semibold transition ${item.active ? "bg-[#281845] text-white" : "hover:bg-[#1d1630] hover:text-white"}`}
            >
              <Icon className={item.active ? "text-[#c084fc]" : ""} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <nav className="space-y-1 border-b border-[#7c3aed]/15 px-2 py-5">
        {dashboardLinks.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-[#1d1630] hover:text-white"
            >
              <Icon aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center justify-between border-t border-[#7c3aed]/15 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12091f] text-[8px] font-bold text-[#c084fc] ring-1 ring-[#7c3aed]/25">
            NOVA
          </span>
          <span className="font-bold text-white">FULLTANK</span>
        </div>
        <FiMoreVertical aria-hidden="true" />
      </div>
    </aside>
  );
}

export default DashboardSidebar;
