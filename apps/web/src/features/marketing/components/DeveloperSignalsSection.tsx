import type { CSSProperties } from "react";
import { FiActivity, FiAlertCircle, FiArrowUpRight, FiBell, FiClipboard, FiClock, FiFileText, FiGlobe, FiShield, FiUserCheck } from "react-icons/fi";

type Signal = {
  title: string;
  detail: string;
  label: string;
  Icon: typeof FiActivity;
};

const signalColumns: Signal[][] = [
  [
    { title: "ระบุเจ้าของ release", detail: "เห็นผู้รับผิดชอบของแต่ละ deployment ก่อนเริ่ม rollout.", label: "Ownership", Icon: FiUserCheck },
    { title: "สรุปการเปลี่ยนแปลง", detail: "ทีมเห็นสิ่งที่เปลี่ยนไปพร้อมบริบทของ release เดียวกัน.", label: "Changes", Icon: FiFileText },
    { title: "ลิงก์ preview สำหรับรีวิว", detail: "แชร์ environment ที่ตรวจสอบได้ให้คนที่เกี่ยวข้องโดยตรง.", label: "Review", Icon: FiGlobe },
    { title: "บันทึกการอนุมัติ", detail: "เก็บสถานะการอนุมัติไว้กับ release ที่ทีมกำลังติดตาม.", label: "Approval", Icon: FiShield },
  ],
  [
    { title: "แจ้งเตือนสิ่งที่ต้องดู", detail: "ส่งสัญญาณให้ทีมเมื่อ release ต้องการการตรวจสอบเพิ่มเติม.", label: "Alerts", Icon: FiBell },
    { title: "ติดตามเหตุการณ์สำคัญ", detail: "รวมเหตุการณ์ของ release ไว้ใน timeline ที่ทีมอ่านร่วมกัน.", label: "Timeline", Icon: FiActivity },
    { title: "บันทึกการตัดสินใจ", detail: "ย้อนดูการเปลี่ยนสถานะและเหตุผลของ release ได้ตามเวลา.", label: "Audit", Icon: FiClipboard },
    { title: "กำหนดเวลาติดตาม", detail: "เห็นช่วงที่ release อยู่ระหว่างตรวจสอบหรือรอการดำเนินการ.", label: "Follow-up", Icon: FiClock },
  ],
  [
    { title: "ประวัติ release ที่ค้นหาได้", detail: "เปิดดูสิ่งที่เกิดขึ้นกับ deployment ก่อนหน้าได้ทันที.", label: "History", Icon: FiClock },
    { title: "สรุปผลกระทบ", detail: "ให้ทีมรับรู้ว่า service ใดและใครได้รับผลจากการเปลี่ยนแปลง.", label: "Context", Icon: FiAlertCircle },
    { title: "ติดตามสถานะร่วมกัน", detail: "ทุกคนเห็นความคืบหน้าจากหน้าข้อมูลเดียวกัน.", label: "Visibility", Icon: FiActivity },
    { title: "ส่งมอบพร้อมหลักฐาน", detail: "ให้ข้อมูล release อยู่พร้อมสำหรับการทบทวนของทีม.", label: "Record", Icon: FiFileText },
  ],
];

function SignalCard({ signal }: { signal: Signal }) {
  const { Icon } = signal;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#c084fc]/45 hover:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-[#c084fc]">
          <Icon aria-hidden="true" />
          {signal.label}
        </span>
        <FiArrowUpRight aria-hidden="true" className="text-zinc-600" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-white">{signal.title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{signal.detail}</p>
    </article>
  );
}

function DeveloperSignalsSection() {
  return (
    <section className="nova-page-gutter w-full py-20" aria-labelledby="developer-signals-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 id="developer-signals-title" className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            ทุก deployment มีบริบทให้ทีมตัดสินใจ
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
            Nova รวบรวม ownership, approval, alerts และประวัติ release ไว้ในจุดที่ทีมใช้ติดตามงานร่วมกัน.
          </p>
        </div>

        <div className="relative mt-12 h-[520px] overflow-hidden sm:mt-14 md:h-[580px]">
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
            {signalColumns.map((signals, columnIndex) => (
              <div key={columnIndex} className={`overflow-hidden ${columnIndex > 0 ? "hidden md:block" : ""}`}>
                <div
                  className={`nova-signal-track space-y-4 ${columnIndex === 1 ? "nova-signal-track-reverse" : ""}`}
                  style={{ "--signal-delay": `${columnIndex * -6}s` } as CSSProperties}
                >
                  {[...signals, ...signals].map((signal, index) => (
                    <SignalCard key={`${signal.title}-${index}`} signal={signal} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/75 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default DeveloperSignalsSection;
