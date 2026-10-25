"use client";

import { useState } from "react";

import Navbar from "@/shared/navigation/Navbar";
import SpaceIntroSection from "../components/SpaceIntroSection";
import LogoLoopSection from "../components/LogoLoopSection";
import DeveloperSignalsSection from "../components/DeveloperSignalsSection";
import Login from "@/features/auth/components/Login";
import WorkflowSection from "../components/WorkflowSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import NewProjectPreviewSection from "../components/NewProjectPreviewSection";
import LaserFlowSection from "../components/LaserFlowSection";
import FinalCtaSection from "../components/FinalCtaSection";
import FooterSection from "../components/FooterSection";
import DeployStorySection from "../components/DeployStorySection";

function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [navbarReady, setNavbarReady] = useState(false);

    return (
        <div className="overflow-x-clip bg-black">
            <div inert={!navbarReady} aria-hidden={!navbarReady}
                style={{ opacity: navbarReady ? 1 : 0, visibility: navbarReady ? 'visible' : 'hidden' }}
                className="relative z-40 transition-opacity duration-500 motion-reduce:transition-none">
                <Navbar onLoginClick={() => setShowLogin(true)} />
            </div>

            <main id="main-content">
                <section id="home" className="scroll-mt-28">
                    <SpaceIntroSection onReadyChange={setNavbarReady} />
                </section>
                <div className="relative flex flex-col items-center">
                    <NewProjectPreviewSection />
                    <DeployStorySection />
                    <LaserFlowSection />
                    <WorkflowSection />
                    <CapabilitiesSection />
                    <LogoLoopSection />
                    <DeveloperSignalsSection />
                    <FinalCtaSection />
                </div>
            </main>
            <FooterSection />

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
