"use client";

import React from "react";

function Navbar({ onLoginClick }) {
  return (
    <div>
      <nav className="fixed top-4 left-45 right-45 z-50 md:left-40 md:right-40 lg:left-40 lg:right-40 xl:left-40 xl:right-40 2xl:left-100 2xl:right-100">
        <div className="flex items-center justify-between p-3 backdrop-blur-xl border-b border-white/30 rounded-3xl shadow-xl">
          <div onClick={() => window.location.assign("/")} className="flex items-center space-x-2 group">
            <img
              src="/Nova.svg"
              alt="Nova Logo"
              className="w-10 h-10 object-cover transition-all duration-300 ease-out group-hover:rotate-6 group-hover:scale-90"
            />
            <span className="text-white text-lg font-bold">Nova</span>
          </div>
          <button onClick={ onLoginClick } className="px-6 py-3 text-white tracking-tight text-xs sm:text-sm md:text-base font-medium cursor-pointer rounded-2xl border-t border-white/30 backdrop-blur-xl hover:bg-gray-500/15 transition-all duration-300">
            เข้าสู่ระบบ
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
