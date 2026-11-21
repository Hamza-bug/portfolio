"use client";

import { personalProfile } from "@/data/site";
import { rowan } from "@/app/fonts/rowan";

const CONTACT_DETAILS = {
  email: "hamzaimtiaz246@gmail.com",
  gmailUrl:
    "https://mail.google.com/mail/?view=cm&fs=1&to=hamzaimtiaz246@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/hamza-imtiaz-58979a209/",
  githubUrl: "https://github.com/Hamza-bug",
} as const;

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <span
    aria-hidden="true"
    className={`inline-block text-[1.1em] leading-none transition-transform duration-300 group-hover:-translate-y-0.5 ${
      diagonal ? "-rotate-45 group-hover:rotate-0" : "group-hover:translate-x-1"
    }`}
  >
    ↗
  </span>
);

export default function ContactSection() {
  const projectMailUrl = CONTACT_DETAILS.gmailUrl;

  return (
    <section
      id="contact"
      data-reveal
      className="relative isolate overflow-hidden bg-[#080909] text-[#f4f4f1]"
      aria-labelledby="contact-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 38% at 78% 18%, rgba(255,255,255,0.035), transparent 72%), radial-gradient(ellipse 48% 40% at 12% 72%, rgba(255,255,255,0.018), transparent 70%)",
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25">
        <span className="absolute left-[12%] top-[19%] h-px w-px rounded-full bg-white" />
        <span className="absolute right-[18%] top-[32%] h-px w-px rounded-full bg-white/70" />
        <span className="absolute bottom-[28%] left-[72%] h-px w-px rounded-full bg-white/50" />
        <span className="absolute bottom-[42%] left-[38%] h-px w-px rounded-full bg-white/40" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="border-t border-white/10" />

        <div className="grid min-h-[560px] items-center gap-12 py-20 md:min-h-[640px] md:py-24 lg:grid-cols-[1fr_0.74fr] lg:gap-20 xl:min-h-[700px]">
          <div>
            <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.38em] text-white/45 sm:text-[11px]">
              Have a project in mind?
            </p>

            <h2
              id="contact-heading"
              className="max-w-[820px] text-[clamp(3.8rem,8vw,8.25rem)] font-medium uppercase leading-[0.82] tracking-[-0.075em] text-white"
            >
              <span className={`${rowan.className} block`} style={{ fontFamily: rowan.style.fontFamily, fontWeight: 400 }}>Let&apos;s Build</span>
              <span className={`${rowan.className} mt-[0.10em] block text-[0.82em] font-normal normal-case italic tracking-[-0.055em] text-white/92`} style={{ fontFamily: rowan.style.fontFamily, fontStyle: "italic", fontWeight: 400 }}>
                Something Great.
              </span>
            </h2>

            <p className="mt-9 max-w-xl text-[15px] leading-7 text-white/48 sm:text-base sm:leading-8">
              Have an idea, a project, or a challenge in mind? I&apos;m always interested in building meaningful digital
              experiences and solving real-world problems.
            </p>
          </div>

          <div className="lg:border-l lg:border-white/10 lg:pl-12 xl:pl-16">
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">Let&apos;s talk</p>
            <p className="mt-4 font-serif text-3xl italic tracking-[-0.03em] text-white sm:text-4xl">
              Let&apos;s talk about it.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={projectMailUrl}
                className="group inline-flex min-h-14 items-center justify-between gap-8 rounded-full border border-white bg-[#f4f4f1] px-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[#080909] transition-all duration-300 hover:bg-white/90 sm:min-w-[190px]"
              >
                <span>Start a Project</span>
                <Arrow />
              </a>

              <a
                href={CONTACT_DETAILS.gmailUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-14 items-center justify-between gap-8 rounded-full border border-white/20 px-6 text-[11px] font-medium uppercase tracking-[0.22em] text-white/75 transition-all duration-300 hover:border-white/55 hover:text-white sm:min-w-[170px]"
              >
                <span>Get in Touch</span>
                <Arrow />
              </a>
            </div>

            <div className="mt-14 grid grid-cols-1 border-t border-white/10 sm:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)]">
              <a
                href={CONTACT_DETAILS.gmailUrl}
                target="_blank"
                rel="noreferrer"
                className="group min-w-0 border-b border-white/10 py-5 pr-5 transition-colors duration-300 sm:border-b-0 sm:border-r sm:pr-8 lg:border-b lg:border-r-0 lg:pr-0 lg:pb-5 xl:border-b-0 xl:border-r xl:pr-10"
              >
                <span className="block text-[9px] uppercase tracking-[0.28em] text-white/35">Email</span>
                <span className="mt-2 block whitespace-nowrap text-sm text-white/80 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                  {CONTACT_DETAILS.email}
                </span>
              </a>

              <a
                href={CONTACT_DETAILS.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="group border-b border-white/10 py-5 pr-5 transition-colors duration-300 sm:border-b-0 sm:border-r sm:px-5 lg:border-b lg:border-r-0 lg:px-0 lg:pb-5 xl:border-b-0 xl:border-r xl:px-5"
              >
                <span className="block text-[9px] uppercase tracking-[0.28em] text-white/35">LinkedIn</span>
                <span className="mt-2 block text-sm text-white/80 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                  LinkedIn ↗
                </span>
              </a>

              <a
                href={CONTACT_DETAILS.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group py-5 transition-colors duration-300 sm:pl-5 lg:pl-0 lg:pt-5 xl:pl-5"
              >
                <span className="block text-[9px] uppercase tracking-[0.28em] text-white/35">GitHub</span>
                <span className="mt-2 block text-sm text-white/80 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                  GitHub ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
