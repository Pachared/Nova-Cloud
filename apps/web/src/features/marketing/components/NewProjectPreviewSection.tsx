function NewProjectPreviewSection() {
  return (
    <section id="templates" aria-labelledby="why-nova-title" className="nova-page-gutter w-full scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl border-y border-white/20 py-16 sm:py-24 lg:py-32">
        <h2 id="why-nova-title" className="flex items-center gap-3 text-sm font-semibold text-white sm:text-base">
          <span aria-hidden="true" className="text-5xl font-light leading-none text-[#c084fc]">{'{'}</span>
          ทำไมต้อง Nova Cloud
          <span aria-hidden="true" className="text-5xl font-light leading-none text-[#c084fc]">{'}'}</span>
        </h2>
        <p className="mt-10 max-w-7xl text-[clamp(1.75rem,4.3vw,4.5rem)] font-normal leading-[1.5] tracking-tight text-white sm:mt-14 lg:mt-16">
          Nova Cloud รวมการ Build, Test และ Deploy จาก GitHub ไว้ในที่เดียว
          ให้คุณจัดการโปรเจกต์ ตั้งค่า service และติดตามทุก release
          ผ่าน workflow เดียวที่เข้าใจง่าย เพื่อให้ทีมมีเวลาโฟกัสกับการสร้างสิ่งที่สำคัญ
        </p>
      </div>
    </section>
  );
}

export default NewProjectPreviewSection;
