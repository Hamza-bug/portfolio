"use client";

import { personalProfile } from "@/data/site";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Hamza-bug" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hamza-imtiaz-58979a209/",
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=hamzaimtiaz246@gmail.com",
  },
] as const;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#080909] text-[#f4f4f1]">
      <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-8 md:py-16 lg:px-12 xl:px-16">
        <div className="grid gap-10 md:grid-cols-[minmax(220px,0.75fr)_minmax(420px,1.25fr)] md:items-start md:justify-between lg:gap-16">
          <div>
            <h3 className="text-[clamp(2rem,3.25vw,3.5rem)] font-medium uppercase leading-none tracking-[-0.05em] text-white">
              HAMZA IMTIAZ
            </h3>
          </div>

          <div className="md:justify-self-end md:text-right">
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/55 sm:justify-end">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white"
                >
                  <span className="border-b border-transparent pb-0.5 transition-[border-color] duration-300 group-hover:border-white/55">
                    {link.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[0.95em] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <nav
              aria-label="Footer navigation"
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/38 sm:justify-end"
            >
              {personalProfile.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="border-b border-transparent pb-1 transition-all duration-300 hover:border-white/35 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.22em] text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HAMZA IMTIAZ</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex w-fit items-center gap-2 text-white/55 transition-colors duration-300 hover:text-white sm:w-auto"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <span
              aria-hidden="true"
              className="text-[1.1em] transition-transform duration-300 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
