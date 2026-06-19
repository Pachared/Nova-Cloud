"use client";

import React from "react";

type NavbarProps = {
  onLoginClick: () => void;
};

const navLinks = [
  { href: "#home", label: "หน้าแรก" },
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
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 rounded-2xl bg-black/25 px-3 py-2.5 shadow-xl backdrop-blur-xl sm:px-4 md:flex-nowrap lg:px-5">
        <button
          type="button"
          onClick={() => window.location.assign("/")}
          className="group flex min-w-0 cursor-pointer items-center gap-2 rounded-2xl pr-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400/70"
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
        <div className="order-3 flex w-full items-center justify-center gap-1 overflow-x-auto rounded-2xl bg-white/5 p-1 md:order-none md:w-auto md:overflow-visible md:bg-transparent md:p-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-2xl px-3 py-2 text-xs font-medium text-white/75 transition-all duration-300 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/70 sm:text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={onLoginClick}
          className="shrink-0 cursor-pointer rounded-2xl bg-white px-4 py-2.5 text-xs font-medium tracking-tight text-black shadow-lg shadow-black/20 transition-all duration-300 hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400/70 sm:px-5 sm:text-sm md:px-6 md:text-base"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
