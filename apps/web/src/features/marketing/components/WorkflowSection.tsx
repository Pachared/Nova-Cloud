"use client";

import { workflowSteps } from "../constants/WorkflowConstants";
import CardSwap, { Card } from "./CardSwap";

function WorkflowSection() {
  return (
    <section id="workflow" className="nova-page-gutter scroll-mt-32 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 sm:gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-20">
        <div className="max-w-xl lg:order-2 lg:justify-self-end">
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

        <div className="relative h-[360px] overflow-hidden sm:h-[460px] lg:h-[500px] lg:order-1">
          <CardSwap
            width="min(34rem, 90vw)"
            height="25rem"
            cardDistance={-60}
            delay={5200}
            pauseOnHover
            skewAmount={0}
          >
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.title}
                  customClass="border border-white/[0.08] bg-[radial-gradient(circle_at_18%_0%,rgba(168,85,247,0.22),transparent_34%),linear-gradient(145deg,rgba(28,25,39,0.98),rgba(10,9,15,0.99))] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.55),0_0_0_1px_rgba(168,85,247,0.08)] sm:p-8"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c084fc]/75 to-transparent" />
                  <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#a855f7]/12 blur-3xl" />
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-400" />
                        <span className="h-2 w-2 rounded-full bg-yellow-300" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="mt-5 block font-mono text-3xl font-semibold leading-none text-[#c084fc] sm:text-4xl">
                        0{index + 1}
                      </span>
                    </div>
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#a855f7]/10 text-[#c084fc] ring-1 ring-[#c084fc]/20">
                      <Icon className="text-2xl" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-12 sm:mt-14">
                    <h3 className="text-2xl font-semibold text-white sm:text-3xl">{step.title}</h3>
                    <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">{step.description}</p>
                  </div>
                  <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                    <div className="h-px bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#c084fc] opacity-80" />
                    <div className="mt-4 flex flex-wrap gap-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-zinc-500">
                      {step.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/[0.04] px-2.5 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </CardSwap>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-black/65 via-black/25 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

export default WorkflowSection;
