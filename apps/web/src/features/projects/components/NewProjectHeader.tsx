import { FiBell, FiChevronDown } from "react-icons/fi";

type NewProjectHeaderProps = {
  current?: string;
};

function NewProjectHeader({ current }: NewProjectHeaderProps) {
  return (
    <header className="relative z-10 flex h-14 items-center justify-between px-4 sm:px-5">
      <div className="flex min-w-0 items-center gap-3 text-sm">
        <a href="/" aria-label="Back to home" className="flex h-8 w-8 items-center justify-center">
          <img src="/Nova.svg" alt="Nova" className="h-7 w-7" />
        </a>
        <div className="h-5 w-px bg-white/10" />
        <a href="/new" className="flex items-center gap-1.5 font-semibold text-zinc-200 transition hover:text-white">
          New project
          <FiChevronDown className="text-zinc-500" aria-hidden="true" />
        </a>
        {current ? <span className="truncate text-zinc-500">/ {current}</span> : null}
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="Notifications" className="text-zinc-500 transition hover:text-white">
          <FiBell aria-hidden="true" />
        </button>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12091f] text-[9px] font-bold text-[#c084fc] ring-1 ring-[#7c3aed]/25">
          NOVA
        </span>
      </div>
    </header>
  );
}

export default NewProjectHeader;
