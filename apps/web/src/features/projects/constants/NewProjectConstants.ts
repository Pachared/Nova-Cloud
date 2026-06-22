import {
  FiBox,
  FiCode,
  FiDatabase,
  FiGithub,
  FiGlobe,
  FiPlus,
  FiServer,
  FiUploadCloud,
  FiZap,
} from "react-icons/fi";

export type ProjectActionId =
  | "github"
  | "database"
  | "template"
  | "docker"
  | "empty";

export const projectActions = [
  {
    id: "github",
    title: "GitHub Repository",
    description: "นำ source code จาก GitHub มา build และ deploy",
    icon: FiGithub,
    meta: "Source",
  },
  {
    id: "database",
    title: "Database",
    description: "สร้าง PostgreSQL หรือ Redis เพื่อเชื่อมต่อกับแอป",
    icon: FiDatabase,
    meta: "Data",
  },
  {
    id: "template",
    title: "Template",
    description: "เริ่มจาก starter ที่เตรียม workflow ไว้ให้",
    icon: FiBox,
    meta: "Template",
  },
  {
    id: "docker",
    title: "Docker Image",
    description: "deploy image ที่ build มาแล้วจาก container registry",
    icon: FiUploadCloud,
    meta: "Image",
  },
  {
    id: "empty",
    title: "Empty Project",
    description: "เริ่ม workspace เปล่า แล้วประกอบ service ตามต้องการ",
    icon: FiPlus,
    meta: "Blank",
  },
] as const;

export const serviceOptions = [
  { id: "postgres", label: "PostgreSQL", icon: FiDatabase },
  { id: "redis", label: "Redis", icon: FiServer },
  { id: "static", label: "Static site", icon: FiGlobe },
  { id: "api", label: "API service", icon: FiCode },
] as const;

export const recentRepositories = [
  {
    id: "web",
    name: "nova-cloud/web",
    description: "Next.js application",
    branch: "main",
  },
  {
    id: "api",
    name: "nova-cloud/api",
    description: "Production API service",
    branch: "main",
  },
  {
    id: "worker",
    name: "nova-cloud/worker",
    description: "Queue and deploy worker",
    branch: "production",
  },
] as const;

export const templateOptions = [
  {
    id: "next-app",
    name: "Next.js app",
    description: "SSR, SEO, dashboard ready",
    icon: FiZap,
  },
  {
    id: "api-service",
    name: "API service",
    description: "Node runtime พร้อม health check",
    icon: FiCode,
  },
  {
    id: "static-site",
    name: "Static site",
    description: "Deploy landing page ได้ทันที",
    icon: FiGlobe,
  },
] as const;

export const regionOptions = ["Singapore", "Tokyo", "Bangkok"] as const;
