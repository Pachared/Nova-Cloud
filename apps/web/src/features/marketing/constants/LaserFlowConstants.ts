import { FiCheckCircle, FiDatabase, FiGitBranch, FiGithub, FiGlobe, FiServer } from "react-icons/fi";

export const laserProjectResults = [
  ["Repository connected", "GitHub import พร้อม branch production", FiGithub],
  ["Environment synced", "API_URL, DATABASE_URL และ secrets ถูกผูกแล้ว", FiGitBranch],
  ["Database ready", "PostgreSQL พร้อม migration เริ่มต้น", FiDatabase],
  ["Runtime allocated", "Service runtime พร้อมรับ deploy", FiServer],
  ["Preview domain", "nova-cloud-web.preview.app พร้อมใช้งาน", FiGlobe],
  ["Deployment live", "Build ผ่านและเปิด production traffic", FiCheckCircle],
] as const;
