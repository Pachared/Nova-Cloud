import { FiBox, FiDatabase, FiGithub, FiPlus } from "react-icons/fi";

export const createOptions = [
  ["deploy-github", "Deploy from GitHub", "Import repository แล้ว deploy อัตโนมัติ", FiGithub],
  ["start-template", "Start from template", "เลือก starter สำหรับ frontend, API หรือ full-stack", FiBox],
  ["add-database", "Add database", "เพิ่ม PostgreSQL หรือ Redis พร้อม env binding", FiDatabase],
  ["empty-project", "Empty project", "เริ่ม workspace เปล่าแล้วค่อยเพิ่ม service", FiPlus],
] as const;
