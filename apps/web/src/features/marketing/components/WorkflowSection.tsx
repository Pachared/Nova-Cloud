import { FiGitBranch, FiSettings, FiUploadCloud, FiActivity } from "react-icons/fi";

const workflowSteps = [
  {
    title: "Connect repository",
    description: "เชื่อม GitHub repository แล้วให้ Nova ตรวจ framework และคำสั่ง build ให้ทันที",
    icon: FiGitBranch,
  },
  {
    title: "Configure runtime",
    description: "ตั้งค่า environment variables, region, branch และ service runtime ในจุดเดียว",
    icon: FiSettings,
  },
  {
    title: "Deploy safely",
    description: "ปล่อย build แบบ preview หรือ production พร้อม rollback เมื่อมีปัญหา",
    icon: FiUploadCloud,
  },
  {
    title: "Monitor releases",
    description: "ดู deployment status, logs, uptime และ runtime events หลัง deploy",
    icon: FiActivity,
  },
];

function WorkflowSection() {
  return (
    <section id="workflow" className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            จาก repository ไป production ใน workflow เดียว
          </h2>
          <p className="mt-4 text-sm leading-6 text-zinc-400 sm:text-base">
            Nova รวมสิ่งที่ทีมต้องทำซ้ำทุกวันให้เป็นลำดับเดียว ตั้งแต่ source,
            runtime, deployment, logs และ monitoring
          </p>
        </div>
        <div className="mt-10 space-y-3">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="grid gap-4 rounded-2xl bg-white/[0.045] p-4 sm:grid-cols-[88px_56px_1fr] sm:items-center"
              >
                <span className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-600">
                  Step 0{index + 1}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                  <Icon className="text-xl" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{step.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WorkflowSection;
