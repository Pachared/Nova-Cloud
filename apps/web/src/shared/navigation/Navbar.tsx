"use client";

import React from "react";
import GlassSurface from "@/shared/ui/GlassSurface";

type NavbarProps = {
  onLoginClick: () => void;
};

const navLinks = [
  { href: "#templates", label: "Templates" },
  { href: "#workflow", label: "Workflow" },
  { href: "#features", label: "ฟีเจอร์" },
  { href: "#technologies", label: "Technologies" },
];

function Navbar({ onLoginClick }: NavbarProps) {
  return (
    <nav
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6 lg:px-8"
      aria-label="Primary navigation"
    >
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={16}
        backgroundOpacity={0.05}
        saturation={1.6}
        enableSvgFilter
        contentClassName="grid w-full grid-cols-[auto_auto] items-center gap-x-4 gap-y-3 px-3 py-2.5 sm:px-4 md:grid-cols-[minmax(150px,1fr)_auto_minmax(150px,1fr)] md:gap-x-8 lg:px-5"
        className="mx-auto w-full max-w-7xl rounded-2xl"
      >
        <button
          type="button"
          onClick={() => window.location.assign("/")}
          className="group flex min-w-0 cursor-pointer items-center gap-2 justify-self-start rounded-2xl pr-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a855f7]/70"
          aria-label="Go to Nova home"
        >
          <img
            src="/Nova.svg"
            alt="Nova Logo"
            className="h-9 w-9 shrink-0 object-cover transition-all duration-300 ease-out group-hover:rotate-6 group-hover:scale-90 sm:h-10 sm:w-10"
          />
          <span className="truncate text-base font-bold text-white sm:text-lg">
            Nova
          </span>
        </button>
        <div className="order-3 col-span-2 flex w-full items-center justify-center gap-1 overflow-x-auto rounded-2xl bg-white/5 p-1 md:order-none md:col-span-1 md:w-auto md:justify-self-center md:overflow-visible md:bg-transparent md:p-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-2xl px-3 py-2 text-xs font-medium text-white/75 transition-all duration-300 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]/70 sm:text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={onLoginClick}
          className="shrink-0 cursor-pointer justify-self-end rounded-2xl bg-white px-4 py-2.5 text-xs font-medium tracking-tight text-black shadow-lg shadow-black/20 transition-all duration-300 hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a855f7]/70 sm:px-5 sm:text-sm md:px-6 md:text-base"
        >
          เข้าสู่ระบบ
        </button>
      </GlassSurface>
    </nav>
  );
}

export default Navbar;
