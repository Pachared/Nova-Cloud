"use client";

import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export type StaggeredMenuItem = {
  ariaLabel: string;
  href: string;
  label: string;
};

type SocialItem = { label: string; link: string };

type StaggeredMenuProps = {
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  colors?: string[];
  displayItemNumbering?: boolean;
  displaySocials?: boolean;
  items: StaggeredMenuItem[];
  menuButtonColor?: string;
  onLoginClick: () => void;
  onMenuClose?: () => void;
  onMenuOpen?: () => void;
  openMenuButtonColor?: string;
  position?: "left" | "right";
  socialItems?: SocialItem[];
};

function StaggeredMenu({
  accentColor = "#5227ff",
  changeMenuColorOnOpen = true,
  closeOnClickAway = true,
  colors = ["#b497cf", "#5227ff"],
  displayItemNumbering = true,
  displaySocials = true,
  items,
  menuButtonColor = "#fff",
  onLoginClick,
  onMenuClose,
  onMenuOpen,
  openMenuButtonColor = "#000",
  position = "right",
  socialItems = [{ label: "GitHub", link: "https://github.com/Pachared/Nova-Cloud" }],
}: StaggeredMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const layerRefs = useRef<HTMLDivElement[]>([]);

  const offscreen = position === "left" ? -100 : 100;

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const context = gsap.context(() => {
      gsap.set([panel, ...layerRefs.current], { xPercent: offscreen });
      gsap.set(panel.querySelectorAll("[data-menu-item-label]"), { rotate: 10, yPercent: 140 });
      gsap.set(panel.querySelectorAll("[data-menu-number]"), { opacity: 0 });
      setIsReady(true);
    });

    return () => context.revert();
  }, [offscreen]);

  const closeMenu = useCallback(() => {
    const panel = panelRef.current;
    if (!panel || !isOpen) return;

    gsap.killTweensOf([panel, ...layerRefs.current]);
    gsap.to([panel, ...layerRefs.current], {
      duration: 0.32,
      ease: "power3.in",
      stagger: 0.035,
      xPercent: offscreen,
    });
    gsap.set(panel.querySelectorAll("[data-menu-item-label]"), { delay: 0.32, rotate: 10, yPercent: 140 });
    gsap.set(panel.querySelectorAll("[data-menu-number]"), { delay: 0.32, opacity: 0 });
    setIsOpen(false);
    onMenuClose?.();
  }, [isOpen, offscreen, onMenuClose]);

  const toggleMenu = useCallback(() => {
    const panel = panelRef.current;
    if (!panel || !isReady) return;
    if (isOpen) {
      closeMenu();
      return;
    }

    const labels = panel.querySelectorAll("[data-menu-item-label]");
    const numbers = panel.querySelectorAll("[data-menu-number]");
    gsap.killTweensOf([panel, ...layerRefs.current, labels, numbers]);
    gsap.set([panel, ...layerRefs.current], { xPercent: offscreen });
    gsap.set(labels, { rotate: 10, yPercent: 140 });
    gsap.set(numbers, { opacity: 0 });
    gsap.timeline()
      .to(layerRefs.current, { duration: 0.5, ease: "power4.out", stagger: 0.07, xPercent: 0 })
      .to(panel, { duration: 0.65, ease: "power4.out", xPercent: 0 }, 0.08)
      .to(labels, { duration: 1, ease: "power4.out", rotate: 0, stagger: 0.1, yPercent: 0 }, 0.18)
      .to(numbers, { duration: 0.6, ease: "power2.out", opacity: 1, stagger: 0.08 }, 0.28);
    setIsOpen(true);
    onMenuOpen?.();
  }, [closeMenu, isOpen, isReady, offscreen, onMenuOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && closeMenu();
    const onPointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node) && !toggleRef.current?.contains(event.target as Node)) closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    if (closeOnClickAway) document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (closeOnClickAway) document.removeEventListener("mousedown", onPointerDown);
    };
  }, [closeMenu, closeOnClickAway, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="pointer-events-none fixed inset-0 z-[60] xl:hidden" data-open={isOpen || undefined}>
      <div className={`absolute inset-y-0 z-[5] w-full sm:w-[min(430px,calc(100vw-2rem))] ${isReady ? "visible" : "invisible"} ${position === "left" ? "left-0" : "right-0"}`} aria-hidden="true">
        {colors.slice(0, 4).map((color, index) => (
          <div key={color} ref={(node) => { if (node) layerRefs.current[index] = node; }} className="absolute inset-0" style={{ background: color }} />
        ))}
      </div>

      <header className="nova-page-gutter pointer-events-none fixed inset-x-0 top-3 z-20 sm:top-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-1 sm:px-2">
          <a href="#home" className="pointer-events-auto flex items-center gap-2" aria-label="Nova home">
            <img src="/Nova.svg" alt="" className="h-9 w-9" />
            <span className="text-base font-bold sm:text-lg" style={{ color: isOpen ? openMenuButtonColor : menuButtonColor }}>Nova</span>
          </a>
          <button ref={toggleRef} type="button" onClick={toggleMenu} className="pointer-events-auto inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ color: isOpen && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor }} aria-controls="nova-staggered-menu" aria-expanded={isOpen} aria-label={isOpen ? "Close menu" : "Open menu"}>
            <span>{isOpen ? "Close" : "Menu"}</span>
            <span className="relative grid h-4 w-4 place-items-center" aria-hidden="true">
              <span className={`absolute h-0.5 w-full rounded-full bg-current transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} />
              <span className={`absolute h-0.5 w-full rounded-full bg-current transition-transform duration-500 ${isOpen ? "-rotate-45" : "rotate-90"}`} />
            </span>
          </button>
        </div>
      </header>

      <aside id="nova-staggered-menu" ref={panelRef} className={`pointer-events-auto absolute inset-y-0 z-10 flex w-full flex-col overflow-y-auto bg-black px-6 pb-8 pt-28 text-white ${isReady ? "visible" : "invisible"} sm:w-[min(430px,calc(100vw-2rem))] sm:px-10 ${position === "left" ? "left-0" : "right-0"}`} aria-hidden={!isOpen}>
        <nav aria-label="Mobile navigation" className="flex-1">
          <ol className="m-0 flex list-none flex-col gap-2 p-0">
            {items.map((item, index) => (
              <li key={item.href} className="overflow-hidden leading-none">
                <a href={item.href} onClick={closeMenu} aria-label={item.ariaLabel} className="group inline-flex items-start gap-4 py-1 text-5xl font-semibold uppercase leading-none tracking-tight text-white transition-colors hover:text-[var(--menu-accent)] sm:text-[2.5rem]" style={{ "--menu-accent": accentColor } as CSSProperties}>
                  {displayItemNumbering && <span data-menu-number className="mt-1.5 font-mono text-sm font-normal text-[var(--menu-accent)]" style={{ "--menu-accent": accentColor } as CSSProperties}>0{index + 1}</span>}
                  <span data-menu-item-label className="inline-block origin-bottom">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {displaySocials && socialItems.length > 0 && <div className="mt-10 border-t border-white/10 pt-5">
          <p className="text-sm font-medium" style={{ color: accentColor }}>Socials</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {socialItems.map((item) => <a key={item.link} href={item.link} target="_blank" rel="noreferrer" className="text-base font-medium text-white/70 transition hover:text-white">{item.label}</a>)}
          </div>
          <button type="button" onClick={() => { closeMenu(); onLoginClick(); }} className="mt-6 w-full rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/80">เข้าสู่ระบบ</button>
        </div>}
      </aside>
    </div>
  );
}

export default StaggeredMenu;
