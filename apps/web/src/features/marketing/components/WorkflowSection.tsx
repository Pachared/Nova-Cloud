"use client";

import { FiActivity, FiGitBranch, FiSettings, FiUploadCloud } from "react-icons/fi";
import CardSwap, { Card } from "./CardSwap";

const workflowSteps = [
  { title: "Connect repository", description: "เชื่อม GitHub repository แล้วให้ Nova ตรวจ framework และคำสั่ง build ให้ทันที", icon: FiGitBranch },
  { title: "Configure runtime", description: "ตั้งค่า environment variables, region, branch และ service runtime ในจุดเดียว", icon: FiSettings },
  { title: "Deploy safely", description: "ปล่อย build แบบ preview หรือ production พร้อม rollback เมื่อมีปัญหา", icon: FiUploadCloud },
  { title: "Monitor releases", description: "ดู deployment status, logs, uptime และ runtime events หลัง deploy", icon: FiActivity },
];

function WorkflowSection() {
  return (
    <section id="workflow" className="nova-page-gutter scroll-mt-32 py-24">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            จาก repository ไป production ใน workflow เดียว
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-400">
            Nova รวมสิ่งที่ทีมต้องทำซ้ำทุกวันให้เป็นลำดับเดียว ตั้งแต่ source,
            runtime, deployment, logs และ monitoring
          </p>
          <div className="mt-10 flex items-center gap-3 text-sm text-zinc-500">
            <span className="h-px w-10 bg-[#a855f7]" />
            4 ขั้นตอนที่ทีมติดตามได้ในหน้าเดียว
          </div>
        </div>

        <div className="relative h-[380px] overflow-hidden rounded-3xl bg-[#0d0b13] p-5 sm:h-[430px] sm:p-7">
          <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-[#c084fc]/70 to-transparent" />
          <CardSwap cardDistance={16} verticalDistance={20} delay={5200} pauseOnHover>
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card key={step.title} customClass="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-mono text-xs font-semibold text-[#c084fc]">WORKFLOW 0{index + 1}</span>
                    <Icon className="text-2xl text-[#c084fc]" aria-hidden="true" />
                  </div>
                  <div className="mt-16 sm:mt-20">
                    <h3 className="text-2xl font-semibold text-white sm:text-3xl">{step.title}</h3>
                    <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">{step.description}</p>
                  </div>
                  <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#c084fc] opacity-80 sm:inset-x-8 sm:bottom-8" />
                </Card>
              );
            })}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}

export default WorkflowSection;
