const stackIcons = [
  { title: "React", href: "https://react.dev", src: "/icons/thesvg/react.svg" },
  { title: "Next.js", href: "https://nextjs.org", src: "/icons/thesvg/nextdotjs.svg" },
  { title: "Tailwind CSS", href: "https://tailwindcss.com", src: "/icons/thesvg/tailwind-css.svg" },
  { title: "TypeScript", href: "https://typescriptlang.org", src: "/icons/thesvg/typescript.svg" },
  { title: "JavaScript", href: "https://developer.mozilla.org/docs/Web/JavaScript", src: "/icons/thesvg/javascript.svg" },
  { title: "Node.js", href: "https://nodejs.org", src: "/icons/thesvg/nodedotjs.svg" },
  { title: "Bun", href: "https://bun.sh", src: "/icons/thesvg/bun.svg" },
  { title: "Vite", href: "https://vite.dev", src: "/icons/thesvg/vite.svg" },
  { title: "Vue", href: "https://vuejs.org", src: "/icons/thesvg/vue.svg" },
  { title: "Svelte", href: "https://svelte.dev", src: "/icons/thesvg/svelte.svg" },
  { title: "GitHub", href: "https://github.com", src: "/icons/thesvg/github.svg" },
  { title: "Docker", href: "https://docker.com", src: "/icons/thesvg/docker.svg" },
  { title: "PostgreSQL", href: "https://postgresql.org", src: "/icons/thesvg/postgresql.svg" },
  { title: "MongoDB", href: "https://mongodb.com", src: "/icons/thesvg/mongodb.svg" },
  { title: "MySQL", href: "https://mysql.com", src: "/icons/thesvg/mysql.svg" },
  { title: "Redis", href: "https://redis.io", src: "/icons/thesvg/redis.svg" },
  { title: "Cloudflare", href: "https://cloudflare.com", src: "/icons/thesvg/cloudflare.svg" },
  { title: "Railway", href: "https://railway.com", src: "/icons/thesvg/railway.svg" },
  { title: "Supabase", href: "https://supabase.com", src: "/icons/thesvg/supabase.svg" },
  { title: "Vercel", href: "https://vercel.com", src: "/icons/thesvg/vercel.svg" },
];

function LogoLoopSection() {
  return (
    <section id="technologies" className="nova-page-gutter w-full scroll-mt-32 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-normal text-[#c084fc]">
            Nova Runtime
          </p>
          <h2 className="mt-8 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Deploy apps from your favorite stack.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">
            เลือก stack ที่ทีมใช้อยู่ แล้วจัดการ frontend, backend, static site และ service
            runtime จาก workspace เดียว โดยไม่บังคับให้เปลี่ยนเครื่องมือที่คุ้นเคย
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-end">
          <div className="grid w-full max-w-[492px] grid-cols-3 justify-items-center gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {stackIcons.map((item) => (
              <a
                key={item.title}
                href={item.href}
                aria-label={item.title}
                className="group relative flex h-16 w-full max-w-16 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08] sm:h-20 sm:max-w-20 lg:h-[88px] lg:max-w-[88px]"
              >
                <span className="pointer-events-none absolute h-20 w-20 rounded-full bg-[#a855f7]/20 opacity-0 blur-xl transition duration-300 group-hover:opacity-100" aria-hidden="true" />
                <img
                  src={item.src}
                  alt={item.title}
                  className="relative z-10 h-7 w-7 object-contain transition duration-300 group-hover:scale-110 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogoLoopSection;
