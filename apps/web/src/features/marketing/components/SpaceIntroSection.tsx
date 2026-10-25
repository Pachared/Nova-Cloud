"use client";

import ScrollExpand from "../style/ScrollExpand";
import HeroSection from "./HeroSection";

export default function SpaceIntroSection({ onReadyChange }: { onReadyChange?: (ready: boolean) => void }) {

  return (
    <div className="nova-space-intro nova-hero-morph" data-testid="space-intro">
      <ScrollExpand
        scrollHint="เลื่อนลงเพื่อเริ่มต้น"
        useWindowScroll
        fadeToContent
        heroMorph
        onRevealChange={onReadyChange}
        startWidth={42}
        mobileStartWidth={84}
        startHeight={58}
        scrollDistance={1.2}
        holdDistance={0.35}
      >
        <HeroSection embedded />
      </ScrollExpand>
      <noscript>
        <style>{`
          .nova-space-intro [data-scroll-track] { height: auto !important; }
          .nova-space-intro [data-scroll-stage] { position: relative; height: 100svh !important; }
          .nova-space-intro [data-scroll-frame], .nova-space-intro [data-scroll-title], .nova-space-intro [data-scroll-hint] { display: none; }
          .nova-space-intro [data-scroll-overlay] { --hero-copy-opacity: 1; opacity: 1 !important; transform: none !important; clip-path: none !important; pointer-events: auto !important; }
        `}</style>
      </noscript>
    </div>
  );
}
