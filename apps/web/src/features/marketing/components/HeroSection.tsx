import React from 'react'

import RotatingText from '../style/RotatingText'
import ColorBends from '../style/ColorBends'

import { HeroConstants } from '../constants/constants'

function HeroSection() {
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

            <div className="relative z-10 mx-auto flex min-h-[calc(100svh-10rem)] max-w-6xl flex-col items-center justify-center gap-6 text-center md:min-h-[620px] lg:min-h-[700px]">
                <div className="flex max-w-full flex-col items-center justify-center gap-3 lg:flex-row lg:flex-wrap lg:gap-x-5">
                    <h1 className="max-w-full text-center text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl 2xl:text-7xl">
                        {HeroConstants.mainTitle}
                    </h1>
                    <RotatingText
                        texts={['Build', 'Test', 'Deploy']}
                        mainClassName="flex min-h-[1.15em] min-w-[5.75ch] items-center justify-center overflow-hidden rounded-2xl bg-white/5 px-3 py-1.5 text-4xl font-bold leading-none tracking-tight text-white shadow-xl backdrop-blur-xl sm:px-4 sm:py-2 sm:text-5xl md:text-6xl 2xl:text-7xl"
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
                </div>
                <h1 className="max-w-5xl text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl 2xl:text-6xl">
                    {HeroConstants.subTitle}
                </h1>
                <p className="mt-6 max-w-4xl px-2 text-center text-sm tracking-tight text-zinc-400 sm:text-base 2xl:text-xl">
                    {HeroConstants.description}
                </p>
                <a
                    href="/new"
                    className="mt-2 cursor-pointer rounded-2xl bg-white/10 px-5 py-3.5 text-sm font-medium tracking-tight text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:bg-white/15 sm:px-6 sm:py-4 sm:text-base 2xl:text-xl"
                >
                    {HeroConstants.buttonTextNewProject}
                </a>
            </div>
        </div>
    )
}

export default HeroSection
