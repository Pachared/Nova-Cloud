import {
  FiBox,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGithub,
  FiGlobe,
  FiPlus,
  FiStar,
  FiServer,
  FiUploadCloud,
  FiZap,
} from "react-icons/fi";

export type ProjectActionId =
  | "github"
  | "database"
  | "template"
  | "docker"
  | "function"
  | "bucket"
  | "empty";

export const commandSuggestions = [
  {
    id: "todo-db",
    title: "Create to-do list function with a database",
    actionId: "function",
    icon: FiStar,
  },
  {
    id: "infra-pack",
    title: "Deploy Redis, Postgres, and a Bucket",
    actionId: "database",
    icon: FiStar,
  },
] as const;

export const projectActions = [
  {
    id: "github",
    title: "GitHub Repository",
    description: "Import repository แล้ว deploy อัตโนมัติ",
    icon: FiGithub,
    meta: "Source",
  },
  {
    id: "database",
    title: "Database",
    description: "เพิ่ม PostgreSQL หรือ Redis พร้อม env binding",
    icon: FiDatabase,
    meta: "Data",
  },
  {
    id: "template",
    title: "Template",
    description: "เลือก starter สำหรับ frontend, API หรือ full-stack",
    icon: FiBox,
    meta: "Template",
  },
  {
    id: "docker",
    title: "Docker Image",
    description: "Deploy container image จาก registry",
    icon: FiUploadCloud,
    meta: "Image",
  },
  {
    id: "function",
    title: "Function",
    description: "สร้าง serverless function พร้อม runtime",
    icon: FiCode,
    meta: "Compute",
  },
  {
    id: "bucket",
    title: "Bucket",
    description: "สร้าง object storage สำหรับ assets",
    icon: FiCpu,
    meta: "Storage",
  },
  {
    id: "empty",
    title: "Empty Project",
    description: "เริ่ม workspace เปล่าแล้วค่อยเพิ่ม service",
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
