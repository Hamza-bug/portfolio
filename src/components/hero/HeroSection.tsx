"use client";

import dynamic from "next/dynamic";

const ParticlePortrait = dynamic(() => import("@/components/hero/ParticlePortrait"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full" />
  ),
});

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[calc(100svh-4.25rem)] min-h-[420px] w-full overflow-hidden [container-type:inline-size]"
    >
      <div className="relative h-full w-full">
        <ParticlePortrait />
      </div>
      <h1
        className="pointer-events-none absolute inset-x-3 bottom-[20%] z-10 whitespace-nowrap text-center text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.12)] sm:bottom-[14%] md:bottom-[8%]"
        style={{
          fontFamily: "var(--font-editorial)",
          fontSize: "clamp(2.25rem, 9cqw, 10rem)",
          fontStyle: "italic",
          lineHeight: 0.9,
        }}
      >
        HAMZA IMTIAZ
      </h1>
    </section>
  );
}
