import { FiDatabase, FiEye, FiLock, FiServer, FiTerminal, FiZap } from "react-icons/fi";
import type { MagicBentoItem } from "../components/MagicBento";

export const capabilities: MagicBentoItem[] = [
  { title: "Deployments", description: "Preview, production, rollback และ release history สำหรับทุก branch", label: "Deploy", Icon: FiZap },
  { title: "Environments", description: "แยก dev, staging, production พร้อม secret และ config ต่อ service", label: "Config", Icon: FiLock },
  { title: "Logs", description: "ค้นหา build logs, runtime logs และ error events ได้จากที่เดียว", label: "Observe", Icon: FiTerminal },
  { title: "Databases", description: "จัดการ PostgreSQL, Redis และ service dependency สำหรับแต่ละ project", label: "Data", Icon: FiDatabase },
  { title: "Services", description: "รัน frontend, API, workers และ cron jobs แยกกันใน workspace เดียว", label: "Runtime", Icon: FiServer },
  { title: "Monitoring", description: "ดูสถานะ deploy, health, uptime และเหตุการณ์สำคัญของระบบ", label: "Health", Icon: FiEye },
];
