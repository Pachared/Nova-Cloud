import React from 'react'

import RotatingText from '../style/RotatingText'
import ColorBends from '../style/ColorBends'

import { HeroConstants } from '../constants/constants'

function HeroSection() {
    return (
        <div className="relative w-full overflow-visible items-center justify-center py-10 md:py-20 2xl:px-26 2xl:py-26">
            <div className="absolute inset-0 opacity-40 z-0 overflow-hidden">
                <ColorBends
                    className="pointer-events-auto"
                    colors={["#8A2CFF", "#7F00FF", "#3A86FF", "#C87BFF"]}
                    bendAmount={0.5}
                    rotation={0}
                    speed={0.2}
                    scale={1.1}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={1}
                    parallax={0.5}
                    noise={0}
                    transparent={false}
                    style={{
                        WebkitMaskImage: "linear-gradient(to bottom, white 30%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, white 30%, transparent 100%)"
                    }}
                />
            </div>

            <div className="relative z-10 mt-20 mb-25 2xl:mt-40 2xl:mb-25 flex flex-col items-center justify-center space-y-3">
                <div className="flex items-center justify-center space-x-5 ">
                    <h1 className="tracking-tighter text-xs sm:text-sm md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-bold"> {HeroConstants.mainTitle} </h1>
                    <RotatingText
                        texts={['Build', 'Test', 'Deploy']}
                        mainClassName="flex item-center justify-center leading-none px-2 sm:px-3 md:px-4 border-b border-white/30 backdrop-blur-xl text-white text-xs sm:text-sm md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-3xl shadow-xl"
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
                <h1 className="tracking-tighter text-xs sm:text-sm md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold"> {HeroConstants.subTitle} </h1>
                <p className="tracking-tight text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-xl text-zinc-400 mt-20"> {HeroConstants.description} </p>
                <button className="mt-6 px-6 py-4 text-white tracking-tight text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-xl font-medium cursor-pointer rounded-2xl border border-white/30 backdrop-blur-xl hover:bg-gray-500/15 transition-all duration-300 shadow-xl">
                    {HeroConstants.buttonTextNewProject}
                </button>
            </div>
        </div>
    )
}

export default HeroSection