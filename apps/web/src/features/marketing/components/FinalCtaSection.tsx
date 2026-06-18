function FinalCtaSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(255,92,122,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,255,209,0.14),transparent_30%),#111018] px-6 py-12 text-center shadow-2xl shadow-black/40 sm:px-10">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          พร้อมสำหรับ workflow ใหม่ของทีมคุณ
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          เปิด workspace แรก เชื่อม repository แล้วให้ Nova จัดการเส้นทางสู่ production
          ที่เหลือให้เป็นระบบเดียวกัน
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="/new"
            className="cursor-pointer rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            สร้างโปรเจกต์ใหม่
          </a>
        </div>
      </div>
      <footer className="mx-auto flex max-w-6xl flex-col gap-3 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <span>Nova Cloud</span>
        <span>Deployment platform for modern teams</span>
      </footer>
    </section>
  );
}

export default FinalCtaSection;
