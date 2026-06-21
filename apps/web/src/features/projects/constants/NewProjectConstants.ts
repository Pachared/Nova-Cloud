import { FiBox, FiCode, FiDatabase, FiGithub, FiGlobe, FiPlus, FiServer } from "react-icons/fi";

export const projectActions = [
  {
    title: "Deploy from GitHub repo",
    description: "Connect a repository and let Nova detect the framework.",
    icon: FiGithub,
  },
  {
    title: "Deploy a template",
    description: "Start from a prepared app, API, or full-stack template.",
    icon: FiBox,
  },
  {
    title: "Empty project",
    description: "Create a blank workspace and add services manually.",
    icon: FiPlus,
  },
];

export const serviceOptions = [
  { label: "PostgreSQL", icon: FiDatabase },
  { label: "Redis", icon: FiServer },
  { label: "Static site", icon: FiGlobe },
  { label: "API service", icon: FiCode },
];
