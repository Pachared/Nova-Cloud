"use client";

import { useState } from "react";

import Navbar from "@/shared/navigation/Navbar";
import HeroSection from "../components/HeroSection";
import LogoLoopSection from "../components/LogoLoopSection";
import Login from "@/features/auth/components/Login";
import WorkflowSection from "../components/WorkflowSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import NewProjectPreviewSection from "../components/NewProjectPreviewSection";
import FinalCtaSection from "../components/FinalCtaSection";

function Home() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="overflow-hidden bg-black">
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <section id="home" className="scroll-mt-28">
                <HeroSection />
            </section>
            <div className="relative flex flex-col items-center">
                <LogoLoopSection />
                <WorkflowSection />
                <CapabilitiesSection />
                <NewProjectPreviewSection />
                <FinalCtaSection />
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
