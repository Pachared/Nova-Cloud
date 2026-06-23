import { notFound } from "next/navigation";
import NewProjectSourceExperience from "@/features/projects/components/NewProjectSourceExperience";

const sources = ["github", "database", "template", "docker"] as const;
type Source = (typeof sources)[number];

export const metadata = { robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ source: string }> }) {
  const { source } = await params;
  if (!sources.includes(source as Source)) notFound();
  return <NewProjectSourceExperience source={source as Source} />;
}
