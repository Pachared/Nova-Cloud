"use client";

import dynamic from 'next/dynamic'

import RotatingText from '../style/RotatingText'

import { HeroConstants } from '../constants/HeroConstants'
import GlassSurface from '@/shared/ui/GlassSurface'

const GradientWaves = dynamic(() => import('../style/GradientWaves'), { ssr: false });
const TechText = dynamic(() => import('../style/TechText'), {
    ssr: false,
    loading: () => <span className="flex h-full items-center justify-center font-bold">{HeroConstants.brandTitle}</span>,
});

function HeroSection({ embedded = false, active = true }: { embedded?: boolean; active?: boolean }) {
    const rotatingWords = ['Build', 'Test', 'Deploy'];

    return (
        <div className={embedded
            ? "nova-page-gutter nova-intro-hero relative flex h-full w-full items-center justify-center overflow-hidden"
            : "nova-page-gutter relative w-full overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24 2xl:py-32"}>
            <div data-hero-background className="pointer-events-none absolute inset-0">
            <div aria-hidden="true" data-testid="hero-waves" className="pointer-events-none absolute inset-0 z-0 opacity-80">
                <GradientWaves
                    horizonColor="#5227FF"
                    waveColor="#FF9FFC"
                    crestColor="#FFFFFF"
                    speed={0.4}
                    amplitude={2.5}
                    relief={1}
                    lightAngle={120}
                    quality="medium"
                    dpr={1}
                    paused={!active}
                    intro={active}
                    mouseInteraction={active}
                    swellOnClick={active}
                />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-black via-black/55 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-gradient-to-b from-transparent via-black/50 to-black md:h-80" />
            </div>

            <div className={embedded
                ? "nova-intro-hero-content relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center"
                : "relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] max-w-7xl items-center justify-center md:min-h-[700px]"}>
                <div
                    data-testid="hero-copy"
                    className="min-w-0 overflow-visible flex flex-col items-center text-center"
                >
                    <h1 className="sr-only">
                        {HeroConstants.brandTitle} {HeroConstants.titleConnector} Build, Test, Deploy {HeroConstants.subTitle}
                    </h1>
                    <div className="flex max-w-full flex-nowrap items-center justify-center gap-2 overflow-visible text-2xl sm:text-4xl md:text-5xl xl:gap-3 xl:text-6xl">
                        <div
                            aria-hidden="true"
                            data-testid="hero-tech-text"
                            className="relative min-w-0 shrink-0"
                            style={{ width: '5.5em', height: '2.2em', marginInline: '-0.25em' }}
                        >
                            <TechText
                                text={HeroConstants.brandTitle}
                                fontWeight={700}
                                fontSize={60}
                                renderScale={embedded ? 5.5 : 1}
                                reveal="letter"
                                dashLength={4}
                                dashGap={2}
                                specks={15}
                                intro="none"
                                accentColor="#c084fc"
                                sweep={active}
                                draggable={active}
                                clickKick={active}
                                guides={false}
                            />
                        </div>
                        <span className="shrink-0 whitespace-nowrap font-bold leading-tight tracking-tight">
                            {HeroConstants.titleConnector}
                        </span>
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
                                auto={active}
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
                            />
                        </GlassSurface>
                    </div>
                    <p className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">
                        {HeroConstants.subTitle}
                    </p>
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
            </div>
        </div>
    )
}

export default HeroSection
