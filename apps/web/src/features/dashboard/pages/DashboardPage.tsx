import { FiBell, FiGrid, FiList, FiPlus } from "react-icons/fi";
import DashboardSidebar from "../components/DashboardSidebar";
import ProjectCard from "../components/ProjectCard";
import { projectCards } from "../constants/DashboardConstants";

function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#050407] text-white lg:flex">
      <DashboardSidebar />

      <section className="min-w-0 flex-1">
        <header className="flex h-14 items-center justify-between border-b border-[#7c3aed]/20 bg-[#0b0713] px-4 lg:hidden">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f8f7ff]">
              <img src="/Nova.svg" alt="" className="h-4 w-4 invert" />
            </span>
            <span className="text-sm font-bold">Projects</span>
          </div>
          <FiBell className="text-zinc-500" aria-hidden="true" />
        </header>

        <div className="h-screen overflow-y-auto bg-[radial-gradient(circle_at_78%_8%,rgba(99,102,241,0.18),transparent_26%)] px-4 py-5 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto min-h-[calc(100vh-7rem)] max-w-6xl rounded-lg border border-[#7c3aed]/25 bg-[#0b0713] p-5 shadow-[0_24px_90px_rgba(124,58,237,0.16)] sm:p-8 lg:p-14">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-3xl font-medium tracking-tight">Projects</h1>
              <a
                href="/new"
                className="flex cursor-pointer items-center gap-2 rounded-md bg-[#7c3aed] px-4 py-2 text-sm font-bold text-white shadow-[0_16px_40px_rgba(124,58,237,0.25)] transition hover:bg-[#8b5cf6]"
              >
                <FiPlus aria-hidden="true" />
                New
              </a>
            </div>

            <div className="mt-10 flex flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 font-bold text-zinc-300">
                  <FiGrid className="text-[#c084fc]" aria-hidden="true" />
                  {projectCards.length} Projects
                </span>
                <span className="hidden h-4 w-px bg-[#7c3aed]/25 sm:block" />
                <button className="cursor-pointer font-semibold transition hover:text-white">
                  Sort By: Recent Activity
                </button>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-[#7c3aed]/15 bg-[#171123] p-1">
                <button className="cursor-pointer rounded bg-[#281845] p-2 text-[#c084fc]">
                  <FiGrid aria-hidden="true" />
                </button>
                <button className="cursor-pointer rounded p-2 transition hover:bg-[#1d1630] hover:text-white">
                  <FiList aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projectCards.map((project) => (
                <ProjectCard
                  key={project.name}
                  name={project.name}
                  services={project.services}
                  icons={project.icons}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FiBell className="fixed right-5 top-5 hidden text-zinc-500 lg:block" aria-hidden="true" />
    </main>
  );
}

export default DashboardPage;
