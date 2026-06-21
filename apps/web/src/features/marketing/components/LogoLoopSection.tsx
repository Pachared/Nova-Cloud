import { stackIcons } from "../constants/LogoLoopConstants";

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
