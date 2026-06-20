function FinalCtaSection() {
  return (
    <section className="nova-page-gutter py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl rounded-2xl bg-black px-5 py-14 text-center sm:px-10 sm:py-20">
        <div
          className="pointer-events-none absolute inset-x-[-8%] top-0 z-0 h-64 overflow-hidden"
          style={{
            WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, black 46%, transparent 78%)",
            maskImage: "radial-gradient(ellipse at top, black 0%, black 46%, transparent 78%)",
          }}
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-0 h-1 w-[min(34rem,58vw)] -translate-x-1/2 rounded-full bg-[#f5eaff] shadow-[0_4px_8px_2px_rgba(245,234,255,0.9),0_12px_34px_10px_rgba(168,85,247,0.62)]" />
          <div className="absolute left-1/2 top-1 h-40 w-[min(58rem,90vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(230,211,255,0.62),rgba(151,78,255,0.3)_34%,rgba(76,29,149,0.12)_56%,transparent_78%)]" />
          <div className="absolute left-1/2 top-1 h-32 w-[min(36rem,64vw)] -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(192,132,252,0.42),transparent)] blur-xl" />
        </div>
        <div className="relative z-10">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            เริ่มต้นใช้งาน Nova กับทีมของคุณ
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            สร้าง workspace แรกและตั้งค่าพื้นที่ทำงานให้เหมาะกับทีมของคุณได้ในไม่กี่ขั้นตอน
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/new"
              className="cursor-pointer rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              เริ่มสร้าง workspace
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCtaSection;
