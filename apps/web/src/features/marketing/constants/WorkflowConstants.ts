import { FiActivity, FiGitBranch, FiSettings, FiUploadCloud } from "react-icons/fi";

export const workflowSteps = [
  {
    title: "Connect repository",
    description: "เชื่อม GitHub repository แล้วให้ Nova ตรวจ framework และคำสั่ง build ให้ทันที",
    icon: FiGitBranch,
    tags: ["Source", "Branch", "Build"],
  },
  {
    title: "Configure runtime",
    description: "ตั้งค่า environment variables, region, branch และ service runtime ในจุดเดียว",
    icon: FiSettings,
    tags: ["Runtime", "Env", "Region"],
  },
  {
    title: "Deploy safely",
    description: "ปล่อย build แบบ preview หรือ production พร้อม rollback เมื่อมีปัญหา",
    icon: FiUploadCloud,
    tags: ["Preview", "Release", "Rollback"],
  },
  {
    title: "Monitor releases",
    description: "ดู deployment status, logs, uptime และ runtime events หลัง deploy",
    icon: FiActivity,
    tags: ["Logs", "Health", "Events"],
  },
];
