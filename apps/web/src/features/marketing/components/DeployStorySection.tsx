"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DeployStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      let scene: gsap.Context | undefined;
      let resizeTimer: ReturnType<typeof setTimeout>;
      let alive = true;
      let viewportWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;
      const build = () => {
        scene?.revert();
        scene = gsap.context(() => {
          const width = section.clientWidth;
          const distance = Math.max(0, rail.scrollWidth - width);
          const introDuration = 0.85;
          const travelDuration = Math.max(2, distance / width * 2);
          const total = introDuration + travelDuration + 0.35;
          gsap.set(section, { height: window.innerHeight + distance + window.innerHeight * 0.85 });
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "nova-deploy-story",
              trigger: section,
              start: "top top",
              end: () => `+=${section.offsetHeight - window.innerHeight}`,
              scrub: 0.55,
              invalidateOnRefresh: true,
            },
          });

          const entrance = gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 85%", end: "top 10%", scrub: 0.4 },
          });
          // Reveal the composition on approach, then pin the horizontal journey.
          entrance.from(".nova-story-intro h2 .nova-story-tag", {
            y: 85, rotation: -12, scale: 0.8, opacity: 0,
            duration: 0.48, stagger: 0.16, ease: "back.out(1.7)",
          }, 0);
          entrance.from(".nova-story-intro-copy p", { y: 36, opacity: 0, duration: 0.45, ease: "power2.out" }, 0.24);
          entrance.from(".nova-story-dome", { y: 110, rotation: 18, scale: 0.6, opacity: 0, duration: 0.7, ease: "back.out(1.4)" }, 0.08);
          entrance.from(".nova-story-star", { y: -130, rotation: -100, scale: 0, duration: 0.65, ease: "back.out(2)" }, 0.18);
          entrance.from(".nova-story-orbit", { x: -70, y: 60, scale: 0, rotation: -120, duration: 0.6, ease: "back.out(2)" }, 0.1);
          entrance.from(".nova-story-spark", { scale: 0, rotation: 150, duration: 0.5, ease: "back.out(3)" }, 0.32);
          timeline.to(rail, { x: -distance, duration: travelDuration }, introDuration);
          timeline.to(".nova-story-star", { y: -90, rotation: 210, duration: 1.5 }, introDuration);
          timeline.to(".nova-story-orbit", { y: 100, x: 55, rotation: 280, duration: 1.5 }, introDuration);
          timeline.to(".nova-story-spark", { y: -65, rotation: -190, duration: 1.5 }, introDuration);
          timeline.to(".nova-story-dome", { y: 65, rotation: -25, duration: 1.5 }, introDuration);

          const words = Array.from(rail.querySelectorAll<HTMLElement>(".nova-story-sentence > span:not([aria-hidden])"));
          const railLeft = rail.getBoundingClientRect().left;
          words.forEach((word, index) => {
            const left = word.getBoundingClientRect().left - railLeft;
            const entry = Math.max(0, Math.min(0.94, (left - width * 0.92) / Math.max(1, distance)));
            const start = introDuration + entry * travelDuration;
            const isTag = word.classList.contains("nova-story-tag");
            const lift = index % 3 === 0 ? -22 : index % 3 === 1 ? 20 : 0;
            timeline.fromTo(word, {
              y: index % 2 ? 100 : -90,
              rotation: index % 2 ? -18 : 15,
              scale: isTag ? 0.65 : 0.88,
              opacity: 0,
            }, {
              y: lift, rotation: isTag ? (index % 2 ? -4 : 4) : 0,
              scale: 1, opacity: 1, duration: 0.45,
              ease: isTag ? "back.out(2.2)" : "power3.out",
            }, start);
            if (isTag) timeline.to(word, { rotation: index % 2 ? 3 : -3, y: -lift, duration: 0.7, ease: "sine.inOut" }, start + 0.45);
          });
          timeline.fromTo(".nova-story-inline-shape", { rotation: -100, scale: 0.3, y: -80 }, { rotation: 240, scale: 1, y: 40, duration: travelDuration }, introDuration);
          timeline.fromTo(".nova-story-inline-ring", { rotation: 0, y: 100 }, { rotation: -300, y: -70, duration: travelDuration }, introDuration);
          timeline.fromTo(".nova-story-curve path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: travelDuration * 0.65 }, introDuration);
          timeline.fromTo(".nova-story-diamond", { y: -100, rotation: -80 }, { y: 70, rotation: 100, duration: travelDuration }, introDuration);
          timeline.fromTo(".nova-story-progress", { scaleX: 0 }, { scaleX: 1, duration: total }, 0);
        }, section);
        ScrollTrigger.refresh();
      };
      const onResize = () => {
        if (viewportWidth === window.innerWidth && Math.abs(viewportHeight - window.innerHeight) < 100) return;
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(build, 180);
      };
      build();
      window.addEventListener("resize", onResize);
      document.fonts.ready.then(() => { if (alive) build(); });
      return () => {
        alive = false;
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        scene?.revert();
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} className="nova-deploy-story w-full" aria-labelledby="deploy-story-title">
      <div className="nova-story-stage">
        <div ref={railRef} className="nova-story-rail">
          <div className="nova-story-intro">
            <div className="nova-story-intro-copy">
              <h2 id="deploy-story-title" className="text-[clamp(2rem,4.5vw,5rem)] font-semibold leading-tight tracking-tight">
                <span className="nova-story-tag bg-[#c084fc] text-black">จากไอเดีย</span>
                <span className="nova-story-tag ml-8 mt-3 -rotate-3 bg-[#f5b8ff] text-black">สู่โลกออนไลน์</span>
              </h2>
              <p className="mt-12 max-w-md text-xl leading-relaxed text-zinc-300 sm:text-2xl">เชื่อมโค้ดของคุณ แล้วให้ทุกขั้นตอนของการส่งมอบอยู่ใน flow เดียว</p>
            </div>
            <div className="nova-story-art" aria-hidden="true">
              <div className="nova-story-orbit" />
              <svg className="nova-story-star" viewBox="0 0 100 100"><path d="M50 0 61 33 85 15 67 39 100 50 67 61 85 85 61 67 50 100 39 67 15 85 33 61 0 50 33 39 15 15 39 33Z" fill="currentColor" /></svg>
              <div className="nova-story-dome" />
              <span className="nova-story-spark">✦</span>
            </div>
          </div>
          <p className="nova-story-sentence">
            <span>เริ่มจาก</span>
            <span className="nova-story-tag -rotate-3 bg-[#c084fc] text-black">โค้ดของคุณ</span>
            <span className="nova-story-inline-shape" aria-hidden="true">✦</span>
            <span className="nova-story-build">Build
              <svg className="nova-story-curve" aria-hidden="true" viewBox="0 0 240 130"><path d="M15 110 C70 115 120 120 220 15" pathLength="1" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="1" /><circle cx="15" cy="110" r="7" fill="currentColor" /><rect x="211" y="6" width="18" height="18" fill="currentColor" /></svg>
            </span>
            <span className="nova-story-tag rotate-3 bg-[#ddd6fe] text-black">ทดสอบ</span>
            <span>แล้ว</span>
            <span className="nova-story-tag -rotate-3 bg-[#a3f7d0] text-black">Deploy</span>
            <span className="nova-story-inline-ring" aria-hidden="true" />
            <span className="nova-story-grow">พร้อมเติบโต<i className="nova-story-diamond" aria-hidden="true" /></span>
            <span className="text-[#c084fc]">ไปด้วยกัน.</span>
          </p>
        </div>
        <div className="nova-story-progress" aria-hidden="true" />
        <div className="nova-story-caption" aria-hidden="true">NOVA CLOUD <span>BUILD / TEST / DEPLOY</span></div>
      </div>
    </section>
  );
}
