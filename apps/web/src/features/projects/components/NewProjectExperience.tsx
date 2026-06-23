"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiCheck, FiChevronRight, FiSearch } from "react-icons/fi";
import type { ProjectActionId } from "../constants/NewProjectConstants";
import { useNewProjectFlow } from "../hooks/useNewProjectFlow";
import NewProjectBackdrop from "./NewProjectBackdrop";
import NewProjectHeader from "./NewProjectHeader";

function rowState(isSelected: boolean) {
  return isSelected
    ? "bg-[#281845] text-white shadow-[inset_3px_0_0_#a855f7]"
    : "text-zinc-400 hover:bg-[#1d1630] hover:text-white";
}

function NewProjectExperience() {
  const flow = useNewProjectFlow();
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedSource = searchParams.get("source");
  const selectedName = searchParams.get("name");
  const appliedSelection = useRef("");

  useEffect(() => {
    const selection = `${requestedSource ?? ""}:${selectedName ?? ""}`;
    if (appliedSelection.current === selection) return;
    appliedSelection.current = selection;
    if (["github", "database", "template", "docker"].includes(requestedSource ?? "")) {
      flow.selectAction(requestedSource as ProjectActionId);
    }
    if (selectedName) flow.setProjectName(selectedName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  }, [flow, requestedSource, selectedName]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050407] text-white">
      <NewProjectBackdrop />
      <NewProjectHeader />

      <section className="pointer-events-none relative z-10 flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            flow.submitProject();
          }}
          className="pointer-events-auto w-full max-w-[372px] rounded-xl bg-[#171123] p-2"
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
            {flow.filteredActions.map((action) => {
              const Icon = action.icon;
              const isSelected = flow.selectedAction === action.id;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() =>
                    action.id === "empty"
                      ? flow.selectAction(action.id)
                      : router.push(`/new/${action.id}`)
                  }
                  className={`flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition ${rowState(isSelected)}`}
                >
                  <Icon className="shrink-0 text-[#c084fc]/75" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{action.title}</span>
                    <span className="mt-0.5 block truncate text-xs text-zinc-500">{action.description}</span>
                  </span>
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
