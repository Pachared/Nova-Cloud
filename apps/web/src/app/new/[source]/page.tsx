import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NewProjectSourceExperience from "@/features/projects/components/NewProjectSourceExperience";

const sources = ["github", "database", "template", "docker"] as const;
type Source = (typeof sources)[number];

const sourceTitles: Record<Source, string> = {
  github: "GitHub Repository",
  database: "Database",
  template: "Template",
  docker: "Docker Image",
};

export async function generateMetadata({ params }: { params: Promise<{ source: string }> }): Promise<Metadata> {
  const { source } = await params;
  return {
    title: sourceTitles[source as Source] || "New Project",
    description: "Choose a source for your Nova Cloud project draft.",
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ source: string }> }) {
  const { source } = await params;
  if (!sources.includes(source as Source)) notFound();
  return <NewProjectSourceExperience source={source as Source} />;
}
