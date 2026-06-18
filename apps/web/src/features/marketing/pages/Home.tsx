"use client";

import { useState } from "react";

import Navbar from "@/shared/navigation/Navbar";
import HeroSection from "../components/HeroSection";
import CurvedLoopSection from "../components/CurvedLoopSection";
import CardSection from "../components/CardSection";
import ScrollVelocitySection from "../components/ScrollVelocitySection";
import LogoLoopSection from "../components/LogoLoopSection";
import Login from "@/features/auth/components/Login";

function Home() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <HeroSection />
            <div className="relative flex flex-col items-center container mx-auto md:px-24">
                <div
                    className="relative w-full backdrop-blur-lg mb-15 md:px-2"
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
                <CardSection />
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
                    <ScrollVelocitySection />
                    <CurvedLoopSection />
                </div>
            </div>

            {showLogin && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-black rounded-xl relative">
                        <button className="absolute top-8 right-12 text-gray-500" onClick={() => setShowLogin(false)}>
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
