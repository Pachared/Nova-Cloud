"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/shared/navigation/Navbar";
import HeroSection from "../components/HeroSection";
import LogoLoopSection from "../components/LogoLoopSection";
import LazyMount from "../components/LazyMount";
import Login from "@/features/auth/components/Login";

const CardSection = dynamic(() => import("../components/CardSection"), {
    ssr: false,
});
const ScrollVelocitySection = dynamic(
    () => import("../components/ScrollVelocitySection"),
    { ssr: false }
);
const CurvedLoopSection = dynamic(() => import("../components/CurvedLoopSection"), {
    ssr: false,
});

function Home() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <section id="home" className="scroll-mt-28">
                <HeroSection />
            </section>
            <div className="relative flex flex-col items-center container mx-auto md:px-24">
                <div
                    id="technologies"
                    className="relative w-full scroll-mt-32 backdrop-blur-lg mb-15 md:px-2"
                    style={{
                        WebkitMaskImage: `
                            linear-gradient(to bottom, transparent 0%, black 0%, black 85%, transparent 100%),
                            linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)
                            `,
                                        maskImage: `
                            linear-gradient(to bottom, transparent 0%, black 0%, black 85%, transparent 100%),
                            linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)
                            `,
                        WebkitMaskComposite: "intersect",
                        maskComposite: "intersect",
                    }}
                >
                    <LogoLoopSection />
                </div>
                <LazyMount className="w-full" rootMargin="500px" minHeight="420px">
                    <div id="features" className="scroll-mt-32">
                        <CardSection />
                    </div>
                </LazyMount>
                <div
                    className="relative w-full backdrop-blur-lg mt-20 mb-15"
                    style={{
                        WebkitMaskImage: `
                            linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)
                            `,
                        maskImage: `
                            linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)
                            `,
                        WebkitMaskComposite: "intersect",
                        maskComposite: "intersect",
                    }}
                >
                    <LazyMount rootMargin="400px" minHeight="180px">
                        <ScrollVelocitySection />
                        <CurvedLoopSection />
                    </LazyMount>
                </div>
            </div>

            {showLogin && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="relative rounded-2xl bg-black">
                        <button className="absolute top-8 right-12 cursor-pointer text-gray-500" onClick={() => setShowLogin(false)}>
                            ✕
                        </button>
                        <Login />
                    </div>
                </div> 
            )}
        </div>
    );
}

export default Home
