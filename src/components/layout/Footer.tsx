import Image from "next/image";

import { personalProfile, socialLinks } from "@/data/site";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-white/10 bg-[#05070b] py-10">
      <div className="section-shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.46em] text-slate-400">Hamza Imtiaz</p>
            <h3 className="mt-4 text-3xl font-medium uppercase tracking-[-0.06em] text-white md:text-5xl">
              HAMZA IMTIAZ.
            </h3>
            <div className="relative mt-4 h-16 w-52">
              <Image
                src="/images/hamza-signature.jpg"
                alt="Hamza Imtiaz handwritten signature"
                fill
                sizes="(max-width: 768px) 100vw, 240px"
                className="object-contain object-left"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex flex-wrap gap-5 text-[10px] uppercase tracking-[0.26em] text-slate-300">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.26em] text-slate-400">
              {personalProfile.navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.24em] text-slate-500">
          <span>© {currentYear} {personalProfile.name}</span>
          <a href="#home" className="inline-flex items-center gap-2 text-slate-300 transition hover:text-white">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
