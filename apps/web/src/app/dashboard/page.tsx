import type { Metadata } from "next";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

export const metadata: Metadata = {
  title: "Projects Dashboard | Nova Cloud",
  description: "Manage Nova Cloud projects, services, usage, and workspace settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <DashboardPage />;
}
