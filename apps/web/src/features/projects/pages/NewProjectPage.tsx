import { Suspense } from "react";
import NewProjectExperience from "../components/NewProjectExperience";

function NewProjectPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#050407]" />}>
      <NewProjectExperience />
    </Suspense>
  );
}

export default NewProjectPage;
