"use client";

import React, { useState } from 'react'

import RotatingText from '../style/RotatingText'
import ColorBends from '../style/ColorBends'
import { FiCheckCircle, FiGitBranch, FiGlobe, FiTerminal } from 'react-icons/fi'

import { HeroConstants } from '../constants/constants'
import GlassSurface from '@/shared/ui/GlassSurface'

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
            <div className="pointer-events-none absolute inset-x-[-18vw] -top-28 -bottom-36 z-0 opacity-[0.58] sm:inset-x-[-14vw] md:-top-36 md:-bottom-44 xl:inset-x-[-10vw] xl:-top-44 xl:-bottom-52">
                <ColorBends
                    className="pointer-events-none"
                    colors={["#6366f1", "#7c3aed", "#a855f7", "#c084fc"]}
                    rotation={90}
                    autoRotate={0}
                    speed={0.2}
                    scale={1}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={1}
                    parallax={0.5}
                    noise={0.15}
                    iterations={1}
                    intensity={1.5}
                    bandWidth={6}
                    transparent
                    style={{}}
                />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-black via-black/55 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-gradient-to-b from-transparent via-black/50 to-black md:h-80" />

            <div className="relative z-10 mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl items-center gap-10 md:min-h-[700px] xl:grid-cols-[minmax(690px,1fr)_minmax(360px,480px)]">
                <div
                    data-testid="hero-copy"
                    className="min-w-0 overflow-visible flex flex-col items-center text-center xl:items-start xl:text-left"
                >
                    <div className="flex max-w-full flex-nowrap items-center justify-center gap-2 overflow-visible lg:justify-start xl:gap-3">
                        <h1 className="shrink-0 whitespace-nowrap text-2xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">
                            {HeroConstants.mainTitle}
                        </h1>
                        <GlassSurface
                            width="auto"
                            height="auto"
                            borderRadius={16}
                            backgroundOpacity={0.04}
                            saturation={1.5}
                            contentClassName="p-0"
                            className="shrink-0 rounded-2xl"
                        >
                            <RotatingText
                                texts={rotatingWords}
                                mainClassName="inline-flex min-h-[1.15em] min-w-[5.75ch] items-center justify-center overflow-hidden px-2.5 py-1.5 text-2xl font-bold leading-none tracking-tight text-white sm:px-3 sm:text-4xl md:text-5xl xl:px-4 xl:py-2 xl:text-6xl"
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
                        </GlassSurface>
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
                    className="w-full min-w-0"
                >
                    <div className="relative overflow-hidden rounded-3xl bg-[#08080d]/90 p-5 shadow-2xl shadow-black/40 sm:p-6">
                        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#c084fc]/50 to-transparent" />
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold leading-none text-white">nova-cloud/web</p>
                                <p className="mt-1.5 text-xs text-zinc-500">main · production</p>
                            </div>
                            <div className="flex items-center gap-2 rounded-2xl bg-[#7c3aed]/15 px-3 py-2 text-xs font-medium text-[#c084fc]">
                                <FiCheckCircle className="text-base" aria-hidden="true" />
                                Ready
                            </div>
                        </div>
                        <div className="mt-5 h-2 overflow-hidden rounded-2xl bg-white/[0.06]">
                            <div
                                className="h-full rounded-2xl bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#c084fc] transition-all duration-700 ease-out"
                                style={{ width: `${((activeStep + 1) / previewSteps.length) * 100}%` }}
                            />
                        </div>
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {previewSteps.map((step, index) => (
                                <div
                                    key={step.label}
                                    className={`rounded-2xl px-3 py-3 text-xs font-medium transition-all duration-500 ${
                                        activeStep === index
                                            ? 'bg-[#c084fc] text-black shadow-xl shadow-[#a855f7]/20'
                                            : 'bg-white/[0.045] text-zinc-400'
                                    }`}
                                >
                                    {step.label}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-[1fr_auto]">
                            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.055] p-3">
                                <FiGitBranch className="text-[#a855f7]" aria-hidden="true" />
                                <span className="text-zinc-300">GitHub connected</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-2xl bg-white/[0.045] px-3 py-3 text-xs text-zinc-400">
                                <FiGlobe className="text-[#c084fc]" aria-hidden="true" />
                                us-east
                            </div>
                        </div>
                        <div className="mt-3 overflow-hidden rounded-2xl bg-[#030308] shadow-inner shadow-black/70">
                            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                                <span className="h-2 w-2 rounded-full bg-red-400/80" />
                                <span className="h-2 w-2 rounded-full bg-yellow-300/80" />
                                <span className="h-2 w-2 rounded-full bg-[#a855f7]/80" />
                            </div>
                            <div className="p-4 font-mono text-xs leading-6 text-zinc-400">
                                <FiTerminal className="mb-3 text-[#a855f7]" aria-hidden="true" />
                                <p className="transition-colors duration-500">
                                    {previewSteps[activeStep].command}
                                </p>
                                <p className="text-[#c084fc] transition-colors duration-500">
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
