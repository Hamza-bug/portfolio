import Image from "next/image";

import { personalProfile } from "@/data/site";

export default function AboutSection() {
  const hasCv = Boolean(personalProfile.cvUrl);

  return (
    <section id="about" data-reveal className="relative py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.38em] text-[#a9c8e6]">A little about me</p>
          <h2 className="mt-5 text-3xl font-medium uppercase tracking-[-0.05em] text-white md:text-5xl">
            A LITTLE ABOUT ME
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-none">
            <Image
              src="/images/hamza-portrait-transparent.png"
              alt="Hamza Imtiaz portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-8 rounded-[32px] border border-white/10 bg-[rgba(10,12,18,0.78)] p-6 md:p-8">
              <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                {personalProfile.about}
              </p>

              <div className="flex flex-wrap gap-3">
                {["JavaScript", "Angular", "React.js", "React Native", "Next.js", "Node.js"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Signature</p>
                  <div className="relative mt-4 h-20 w-full max-w-[260px]">
                    <Image
                      src="/images/hamza-signature.jpg"
                      alt="Hamza Imtiaz handwritten signature"
                      fill
                      sizes="(max-width: 768px) 100vw, 260px"
                      className="object-contain object-left"
                    />
                  </div>
                </div>

                <a
                  href={hasCv ? personalProfile.cvUrl : undefined}
                  aria-disabled={!hasCv}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-[10px] uppercase tracking-[0.28em] transition ${
                    hasCv
                      ? "bg-[#edf6ff] text-[#070b11] hover:bg-white"
                      : "cursor-not-allowed border border-white/10 bg-white/5 text-slate-400"
                  }`}
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
