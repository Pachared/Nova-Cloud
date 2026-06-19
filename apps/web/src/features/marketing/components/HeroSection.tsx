"use client";

import React, { useState } from 'react'

import RotatingText from '../style/RotatingText'
import ColorBends from '../style/ColorBends'
import { FiCheckCircle, FiGitBranch, FiTerminal } from 'react-icons/fi'

import { HeroConstants } from '../constants/constants'

function HeroSection() {
    const [activeStep, setActiveStep] = useState(0);
    const rotatingWords = ['Build', 'Test', 'Deploy'];
    const previewSteps = [
        {
            label: 'Build 42s',
            command: '$ nova build --branch main',
            output: 'Build completed with cache',
        },
        {
            label: 'Tests passed',
            command: '$ nova test --env preview',
            output: '12 checks passed',
        },
        {
            label: 'Live',
            command: '$ nova deploy --env production',
            output: 'Deployment ready in 1m 12s',
        },
    ];

    return (
        <div className="relative w-full overflow-hidden px-4 pt-28 pb-16 sm:px-6 md:pt-32 md:pb-24 lg:px-8 2xl:py-32">
            <div className="absolute inset-0 opacity-40 z-0 overflow-hidden">
                <ColorBends
                    className="pointer-events-auto"
                    colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
                    rotation={90}
                    speed={0.2}
                    scale={1}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={1}
                    parallax={0.5}
                    noise={0.15}
                    transparent
                    style={{
                        WebkitMaskImage: "linear-gradient(to bottom, white 30%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, white 30%, transparent 100%)"
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl items-center gap-10 md:min-h-[700px] xl:grid-cols-[minmax(690px,1fr)_minmax(360px,480px)]">
                <div
                    data-testid="hero-copy"
                    className="min-w-0 overflow-visible flex flex-col items-center text-center xl:items-start xl:text-left"
                >
                    <div className="flex max-w-full flex-nowrap items-center justify-center gap-2 overflow-visible lg:justify-start xl:gap-3">
                        <h1 className="shrink-0 whitespace-nowrap text-2xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">
                            {HeroConstants.mainTitle}
                        </h1>
                        <RotatingText
                            texts={rotatingWords}
                            mainClassName="inline-flex min-h-[1.15em] min-w-[5.75ch] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/5 px-2.5 py-1.5 text-2xl font-bold leading-none tracking-tight text-white shadow-xl backdrop-blur-xl sm:px-3 sm:text-4xl md:text-5xl xl:px-4 xl:py-2 xl:text-6xl"
                            staggerFrom={"first"}
                            initial={{ y: "100%", opacity: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%", opacity: 0 }}
                            animatePresenceMode={"wait"}
                            animatePresenceInitial={false}
                            loop={true}
                            delay={2}
                            duration={0.5}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                            onNext={setActiveStep}
                        />
                    </div>
                    <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">
                        {HeroConstants.subTitle}
                    </h1>
                    <p className="mt-6 max-w-2xl text-sm tracking-tight text-zinc-400 sm:text-base 2xl:text-xl">
                        {HeroConstants.description}
                    </p>
                    <a
                        href="/new"
                        className="mt-8 cursor-pointer rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold tracking-tight text-black shadow-xl shadow-black/20 transition hover:bg-zinc-200 sm:px-6 sm:py-4 sm:text-base"
                    >
                        {HeroConstants.buttonTextNewProject}
                    </a>
                </div>
                <div
                    data-testid="hero-preview"
                    className="w-full min-w-0 rounded-2xl bg-[#111018]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl"
                >
                    <div className="rounded-2xl bg-black/45 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold">nova-cloud/web</p>
                                <p className="text-xs text-zinc-500">main · production</p>
                            </div>
                            <FiCheckCircle className="text-emerald-300" aria-hidden="true" />
                        </div>
                        <div className="mt-5 h-1.5 overflow-hidden rounded-2xl bg-white/10">
                            <div
                                className="h-full rounded-2xl bg-cyan-300 transition-all duration-700 ease-out"
                                style={{ width: `${((activeStep + 1) / previewSteps.length) * 100}%` }}
                            />
                        </div>
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {previewSteps.map((step, index) => (
                                <div
                                    key={step.label}
                                    className={`rounded-2xl p-3 text-xs transition-all duration-500 ${
                                        activeStep === index
                                            ? 'bg-cyan-300 text-black shadow-lg shadow-cyan-300/20'
                                            : 'bg-white/[0.06] text-zinc-300'
                                    }`}
                                >
                                    {step.label}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 space-y-3 text-sm">
                            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3">
                                <FiGitBranch className="text-cyan-300" aria-hidden="true" />
                                <span className="text-zinc-300">GitHub connected</span>
                            </div>
                            <div className="rounded-2xl bg-[#07070b] p-4 font-mono text-xs leading-6 text-zinc-400">
                                <FiTerminal className="mb-3 text-violet-300" aria-hidden="true" />
                                <p className="transition-colors duration-500">
                                    {previewSteps[activeStep].command}
                                </p>
                                <p className="text-emerald-300 transition-colors duration-500">
                                    {previewSteps[activeStep].output}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
