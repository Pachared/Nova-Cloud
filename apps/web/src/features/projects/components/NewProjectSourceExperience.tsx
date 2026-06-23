"use client";

import { useMemo, useState } from "react";
import { FiArrowLeft, FiCheck, FiChevronRight, FiInfo, FiSearch } from "react-icons/fi";
import {
  databaseOptions,
  recentRepositories,
  templateOptions,
  type ProjectActionId,
} from "../constants/NewProjectConstants";
import NewProjectBackdrop from "./NewProjectBackdrop";
import NewProjectHeader from "./NewProjectHeader";

type SourceId = Exclude<ProjectActionId, "empty">;

type NewProjectSourceExperienceProps = {
  source: SourceId;
};

const labels: Record<SourceId, string> = {
  github: "GitHub Repository",
  database: "Database",
  template: "Template",
  docker: "Docker Image",
};

function NewProjectSourceExperience({ source }: NewProjectSourceExperienceProps) {
  const [query, setQuery] = useState("");
  const [dockerImage, setDockerImage] = useState("");
  const [notice, setNotice] = useState("");
  const items = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();
    const sourceItems = source === "github" ? recentRepositories : source === "database" ? databaseOptions : templateOptions;
    return sourceItems.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(lowerQuery));
  }, [query, source]);

  function choose(name: string) {
    window.location.assign(`/new?source=${source}&name=${encodeURIComponent(name)}`);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050407] text-white">
      <NewProjectBackdrop />
      <NewProjectHeader current={labels[source]} />
      <section className="pointer-events-none relative z-10 flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-10">
        <div className="pointer-events-auto w-full max-w-[372px] rounded-xl bg-[#171123] p-2">
          <a href="/new" className="flex h-10 items-center gap-2 rounded-md border border-[#7c3aed]/30 bg-[#080610] px-3 text-sm text-zinc-500 transition hover:text-white">
            <FiArrowLeft aria-hidden="true" />
            What would you like to create?
          </a>
          {source === "docker" ? (
            <form
              className="space-y-2 p-1 pt-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (dockerImage.trim()) choose(dockerImage.trim());
                else setNotice("Enter a Docker image before continuing.");
              }}
            >
              <label className="flex items-center gap-2 rounded-md bg-[#092143] px-3 py-2 text-xs text-[#7db1ff]">
                <FiInfo aria-hidden="true" /> Enter a Docker image from a supported registry
              </label>
              <input
                value={dockerImage}
                onChange={(event) => setDockerImage(event.target.value)}
                placeholder="ghcr.io/owner/image:latest"
                className="h-10 w-full rounded-md bg-[#0c0912] px-3 text-sm outline-none ring-1 ring-white/10 focus:ring-[#c084fc]"
              />
              <div className="rounded-md bg-[#211b2d] p-3 text-xs leading-5 text-zinc-400">
                <p className="mb-1 font-semibold text-zinc-200">Examples</p>
                <p>hello-world</p><p>ghcr.io/username/repo:latest</p><p>quay.io/username/repo:tag</p><p>registry.gitlab.com/username/repo:tag</p>
              </div>
              {notice ? <p className="text-xs text-rose-300">{notice}</p> : null}
              <button type="submit" className="h-10 w-full rounded-md bg-[#4c267c] text-sm font-semibold transition hover:bg-[#613098]">Continue</button>
            </form>
          ) : (
            <>
              <label className="mt-2 flex h-10 items-center gap-2 rounded-md bg-[#0c0912] px-3 text-zinc-500 ring-1 ring-white/10 focus-within:ring-[#c084fc]">
                <FiSearch aria-hidden="true" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${labels[source].toLowerCase()}`} className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" />
              </label>
              <div className="mt-2 max-h-[58vh] space-y-1 overflow-y-auto pb-1">
                {items.map((item) => {
                  const Icon = "icon" in item ? item.icon : undefined;
                  return <button key={item.id} type="button" onClick={() => choose(item.name)} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition hover:bg-[#281845]">
                    {Icon ? <Icon className="shrink-0 text-[#c084fc]" aria-hidden="true" /> : <FiCheck className="shrink-0 text-[#c084fc]" aria-hidden="true" />}
                    <span className="min-w-0 flex-1"><span className="block text-sm font-medium text-zinc-100">{item.name}</span><span className="block truncate text-xs text-zinc-500">{item.description}</span></span>
                    <FiChevronRight className="text-zinc-500" aria-hidden="true" />
                  </button>;
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default NewProjectSourceExperience;
