"use client";

import { useMemo, useState } from "react";
import {
  projectActions,
  recentRepositories,
  regionOptions,
  serviceOptions,
  templateOptions,
  type ProjectActionId,
} from "../constants/NewProjectConstants";

type CreatedProject = {
  id: string;
  name: string;
  source: string;
  region: string;
  services: string[];
  createdAt: string;
};

type RepositoryId = (typeof recentRepositories)[number]["id"];
type TemplateId = (typeof templateOptions)[number]["id"];
type Region = (typeof regionOptions)[number];

const historyKey = "nova:new-project-history";

function matchesQuery(values: string[], query: string) {
  const normalized = query.trim().toLowerCase();
  return normalized.length === 0 || values.join(" ").toLowerCase().includes(normalized);
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createProjectName(actionId: ProjectActionId, source?: string) {
  if (source) return toSlug(source.split("/").pop() ?? source);
  return actionId === "database" ? "nova-database" : "nova-project";
}

export function useNewProjectFlow() {
  const [query, setQuery] = useState("");
  const [selectedAction, setSelectedAction] = useState<ProjectActionId>("empty");
  const [selectedRepo, setSelectedRepo] = useState<RepositoryId>(recentRepositories[0].id);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(templateOptions[0].id);
  const [selectedServices, setSelectedServices] = useState<string[]>(["postgres"]);
  const [region, setRegion] = useState<Region>("Singapore");
  const [projectName, setProjectName] = useState("nova-project");
  const [createdProject, setCreatedProject] = useState<CreatedProject | null>(null);

  const filteredRepos = useMemo(
    () =>
      recentRepositories.filter((repo) =>
        matchesQuery([repo.name, repo.description, repo.branch], query),
      ),
    [query],
  );

  const filteredTemplates = useMemo(
    () =>
      templateOptions.filter((template) =>
        matchesQuery([template.name, template.description], query),
      ),
    [query],
  );

  const filteredServices = useMemo(
    () =>
      serviceOptions.filter((service) => matchesQuery([service.label], query)),
    [query],
  );

  const filteredActions = useMemo(
    () =>
      projectActions.filter((action) =>
        matchesQuery([action.title, action.description, action.meta], query),
      ),
    [query],
  );

  const selectedSource = useMemo(() => {
    const repo = recentRepositories.find((item) => item.id === selectedRepo);
    const template = templateOptions.find((item) => item.id === selectedTemplate);
    const action = projectActions.find((item) => item.id === selectedAction);
    if (selectedAction === "github") return repo?.name ?? "GitHub repository";
    if (selectedAction === "template") return template?.name ?? "Template";
    if (selectedAction === "database") return "Database service";
    return action?.title ?? "Empty project";
  }, [selectedAction, selectedRepo, selectedTemplate]);

  function selectAction(actionId: ProjectActionId) {
    setSelectedAction(actionId);
    const source = actionId === "github"
      ? recentRepositories.find((repo) => repo.id === selectedRepo)?.name
      : undefined;
    setProjectName(createProjectName(actionId, source));
  }

  function selectRepository(repoId: RepositoryId) {
    const repo = recentRepositories.find((item) => item.id === repoId);
    setSelectedRepo(repoId);
    setSelectedAction("github");
    setProjectName(createProjectName("github", repo?.name));
  }

  function selectTemplate(templateId: TemplateId) {
    const template = templateOptions.find((item) => item.id === templateId);
    setSelectedTemplate(templateId);
    setSelectedAction("template");
    setProjectName(createProjectName("template", template?.name));
  }

  function toggleService(serviceId: string) {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((item) => item !== serviceId)
        : [...current, serviceId],
    );
  }

  function submitProject() {
    const services = serviceOptions
      .filter((service) => selectedServices.includes(service.id))
      .map((service) => service.label);
    const nextProject = {
      id: crypto.randomUUID(),
      name: projectName.trim() || createProjectName(selectedAction, selectedSource),
      source: selectedSource,
      region,
      services,
      createdAt: new Date().toISOString(),
    };
    setCreatedProject(nextProject);

    const current = JSON.parse(localStorage.getItem(historyKey) ?? "[]") as CreatedProject[];
    localStorage.setItem(historyKey, JSON.stringify([nextProject, ...current].slice(0, 5)));
  }

  return {
    createdProject,
    filteredActions,
    filteredRepos,
    filteredServices,
    filteredTemplates,
    projectName,
    query,
    region,
    selectedAction,
    selectedRepo,
    selectedServices,
    selectedSource,
    selectedTemplate,
    setProjectName,
    setQuery,
    setRegion,
    selectAction,
    selectRepository,
    selectTemplate,
    submitProject,
    toggleService,
  };
}
