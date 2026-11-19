"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const ParticlePortrait = dynamic(
  () => import("@/components/hero/ParticlePortrait"),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  }
);

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[calc(100svh-4.25rem)] min-h-[420px] w-full overflow-hidden [container-type:inline-size]"
    >
      {/* Signature - Only Visible Outside Particle Portrait */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          bottom-[1%]
          z-[1]
          h-[34%]
          w-[76%]
          -translate-x-1/2
          sm:h-[36%]
          md:h-[38%]
        "
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, #fff 0%, #fff 17.1%, transparent 17.1%, transparent 82.9%, #fff 82.9%, #fff 100%)",
          maskImage:
            "linear-gradient(to right, #fff 0%, #fff 17.1%, transparent 17.1%, transparent 82.9%, #fff 82.9%, #fff 100%)",
        }}
      >
        <Image
          src="/images/new-signature.png"
          alt=""
          fill
          priority
          sizes="76vw"
          className="object-contain brightness-0 invert opacity-100"
        />
      </div>

      {/* Particle Portrait */}
      <div className="relative z-[2] h-full w-full">
        <ParticlePortrait />
      </div>

      {/* Name Typography */}
      <h1
        className="pointer-events-none absolute inset-x-3 bottom-[20%] z-10 whitespace-nowrap text-center text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.12)] sm:bottom-[14%] md:bottom-[8%]"
        style={{
          fontFamily: "var(--font-editorial)",
          fontSize: "clamp(2.25rem, 9cqw, 10rem)",
          fontStyle: "italic",
          lineHeight: 0.9,
        }}
      >
        Hamza Imtiaz
      </h1>
    </section>
  );
}