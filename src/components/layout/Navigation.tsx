"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { personalProfile } from "@/data/site";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      { threshold: [0.2, 0.35, 0.55], rootMargin: "-12% 0px -30% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070b]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a href="#home" className="flex items-center gap-2 text-sm font-medium tracking-[0.4em] text-white">
          <span className="text-[10px] text-[#9bb9d1]">HAMZA</span>
          <span className="text-[10px] text-[#dfe7ef]">IMTIAZ</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {personalProfile.navItems.map((item) => {
            const isActive = activeId === item.href.replace("#", "");

            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-[11px] uppercase tracking-[0.28em] transition-colors ${
                  isActive ? "text-[#edf6ff]" : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white transition hover:border-[#8ec5ff]/50 hover:bg-[#8ec5ff]/10 md:inline-flex"
        >
          Let&apos;s Talk
        </a>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 text-white md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#05070b] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            {personalProfile.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-white/10 py-3 text-[11px] uppercase tracking-[0.28em] text-slate-300"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
