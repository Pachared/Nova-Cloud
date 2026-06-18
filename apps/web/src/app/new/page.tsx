import NewProjectPage from "@/features/projects/pages/NewProjectPage";

export const metadata = {
  title: "New Project",
  description: "Create a new Nova project from GitHub, a template, or services.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <NewProjectPage />;
}
