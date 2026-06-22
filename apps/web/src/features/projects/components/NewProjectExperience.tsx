"use client";

import {
  FiBell,
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiSearch,
} from "react-icons/fi";
import { useNewProjectFlow } from "../hooks/useNewProjectFlow";

function rowState(isSelected: boolean) {
  return isSelected
    ? "bg-[#281845] text-white shadow-[inset_3px_0_0_#a855f7]"
    : "text-zinc-400 hover:bg-[#1d1630] hover:text-white";
}

function NewProjectExperience() {
  const flow = useNewProjectFlow();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050407] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-2 top-14 bottom-3 rounded-xl border border-[#7c3aed]/25 bg-[#0b0713]"
      >
        <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_82%,rgba(99,102,241,0.22),transparent_34%),linear-gradient(rgba(192,132,252,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(192,132,252,0.055)_1px,transparent_1px)] bg-[size:100%_100%,7px_7px,7px_7px]" />
        <div className="absolute inset-x-0 bottom-0 h-56 rounded-b-xl bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.22),transparent_58%)]" />
      </div>

      <header className="relative z-10 flex h-14 items-center justify-between px-4 sm:px-5">
        <div className="flex items-center gap-4">
          <a
            href="/"
            aria-label="Back to home"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#f8f7ff] text-black transition hover:bg-[#e9ddff]"
          >
            <img src="/Nova.svg" alt="" className="h-4 w-4 invert" />
          </a>
          <div className="h-5 w-px bg-[#7c3aed]/20" />
          <button className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-zinc-200 transition hover:text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#12091f] ring-1 ring-[#7c3aed]/25">
              <img src="/Nova.svg" alt="" className="h-3 w-3" />
            </span>
            New project
            <FiChevronDown className="text-zinc-500" aria-hidden="true" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="hidden cursor-pointer text-zinc-500 transition hover:text-white sm:block"
          >
            <FiBell aria-hidden="true" />
          </button>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12091f] text-[9px] font-bold text-[#c084fc] ring-1 ring-[#7c3aed]/25">
            NOVA
          </span>
        </div>
      </header>

      <section className="relative z-10 flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            flow.submitProject();
          }}
          className="w-full max-w-[372px] rounded-xl border border-[#7c3aed]/30 bg-[#171123]/95 p-2 shadow-[0_22px_90px_rgba(124,58,237,0.22)] backdrop-blur-xl"
        >
          <label className="flex h-10 items-center gap-2 rounded-md border border-[#7c3aed]/25 bg-[#080610] px-3 text-zinc-500 focus-within:border-[#c084fc]">
            <FiSearch className="text-sm" aria-hidden="true" />
            <input
              value={flow.query}
              onChange={(event) => flow.setQuery(event.target.value)}
              placeholder="What would you like to create?"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </label>

          <div className="py-2">
            {flow.filteredSuggestions.map((suggestion) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => flow.selectAction(suggestion.actionId)}
                  className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-md px-3 text-left text-sm text-zinc-400 transition hover:bg-[#1d1630] hover:text-white"
                >
                  <Icon className="text-[#c084fc]/70" aria-hidden="true" />
                  <span className="truncate">{suggestion.title}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#7c3aed]/15 py-2">
            {flow.filteredActions.map((action) => {
              const Icon = action.icon;
              const isSelected = flow.selectedAction === action.id;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => flow.selectAction(action.id)}
                  className={`flex h-10 w-full cursor-pointer items-center gap-3 rounded-md px-3 text-left text-sm transition ${rowState(isSelected)}`}
                >
                  <Icon className="shrink-0 text-[#c084fc]/75" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{action.title}</span>
                  {isSelected ? (
                    <FiCheck className="text-[#c084fc]" aria-hidden="true" />
                  ) : (
                    <FiChevronRight className="text-zinc-500" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#7c3aed]/15 pt-2">
            <input
              value={flow.projectName}
              onChange={(event) => flow.setProjectName(event.target.value)}
              className="mb-2 h-9 w-full rounded-md border border-[#7c3aed]/20 bg-[#080610]/80 px-3 text-sm font-medium text-white outline-none placeholder:text-zinc-600 focus:border-[#c084fc]"
              placeholder="Project name"
            />
            <button
              type="submit"
              className="h-10 w-full cursor-pointer rounded-md bg-[#7c3aed]/25 text-sm font-semibold text-white transition hover:bg-[#7c3aed]/35"
            >
              Create {flow.projectName || "project"}
            </button>
          </div>

          {flow.createdProject ? (
            <div className="mt-2 rounded-md border border-[#a855f7]/30 bg-[#140d20] px-3 py-2 text-xs text-zinc-400">
              <span className="font-semibold text-[#c084fc]">Created</span>{" "}
              {flow.createdProject.name} from {flow.createdProject.source}
            </div>
          ) : null}
        </form>
      </section>
    </main>
  );
}

export default NewProjectExperience;
