import {
  FiArrowLeft,
  FiBox,
  FiChevronRight,
  FiCode,
  FiDatabase,
  FiGithub,
  FiGlobe,
  FiPlus,
  FiSearch,
  FiServer,
} from "react-icons/fi";

const projectActions = [
  {
    title: "Deploy from GitHub repo",
    description: "Connect a repository and let Nova detect the framework.",
    icon: FiGithub,
  },
  {
    title: "Deploy a template",
    description: "Start from a prepared app, API, or full-stack template.",
    icon: FiBox,
  },
  {
    title: "Empty project",
    description: "Create a blank workspace and add services manually.",
    icon: FiPlus,
  },
];

const serviceOptions = [
  { label: "PostgreSQL", icon: FiDatabase },
  { label: "Redis", icon: FiServer },
  { label: "Static site", icon: FiGlobe },
  { label: "API service", icon: FiCode },
];

function NewProjectPage() {
  return (
    <main className="min-h-screen bg-[#0b0911] text-white">
      <header className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <a
            href="/"
            aria-label="Back to home"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
          >
            <FiArrowLeft aria-hidden="true" />
          </a>
          <div className="flex min-w-0 items-center gap-3">
            <img src="/Nova.svg" alt="Nova" className="h-8 w-8 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Nova</p>
              <p className="truncate text-xs text-zinc-500">New project</p>
            </div>
          </div>
        </div>
        <button className="cursor-pointer rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200">
          Upgrade
        </button>
      </header>

      <section className="grid min-h-[calc(100vh-4rem)] grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)]">
        <div className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-8 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(138,92,255,0.3),transparent_35%),linear-gradient(135deg,rgba(255,92,122,0.16),rgba(0,255,209,0.08),transparent_65%)]" />
          <div className="absolute left-12 top-14 rounded-2xl bg-black/40 p-4 shadow-2xl backdrop-blur-xl">
            <p className="text-xs text-zinc-500">Workspace</p>
            <p className="mt-1 text-sm font-medium">Personal / Production</p>
          </div>
          <div className="absolute bottom-16 left-16 right-16 grid grid-cols-2 gap-4">
            {serviceOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div key={option.label} className="rounded-2xl bg-white/5 p-4 backdrop-blur-xl">
                  <Icon className="mb-8 text-zinc-400" aria-hidden="true" />
                  <p className="text-sm font-medium">{option.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex min-h-full flex-col bg-[#111018] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-8">
            <p className="text-sm text-zinc-500">Personal workspace</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Create a new project
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Start from source code, a template, or create an empty project and
              add services when you need them.
            </p>

            <label className="mt-8 flex items-center gap-3 rounded-2xl bg-black/35 px-4 py-3 text-sm text-zinc-400">
              <FiSearch className="shrink-0" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search repositories, templates, or services"
                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
              />
            </label>

            <div className="mt-5 space-y-3">
              {projectActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.title}
                    className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl bg-white/[0.06] p-4 text-left transition hover:bg-white/[0.1]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black/35 text-zinc-300">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{action.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-zinc-500">
                        {action.description}
                      </span>
                    </span>
                    <FiChevronRight
                      className="shrink-0 text-zinc-600 transition group-hover:text-white"
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {serviceOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.label}
                    className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl bg-black/30 px-3 py-4 text-xs text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    <Icon className="text-lg" aria-hidden="true" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NewProjectPage;
