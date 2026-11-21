"use client";

import AbstractSculpture from "@/components/about/DigitalUniverse";
import { rowan } from "@/app/fonts/rowan";

export default function AboutSection() {
  return (
    <section id="about" data-reveal className="about-section relative overflow-hidden py-24 md:py-32">
      <div className="about-ambient" aria-hidden="true" />
      <div className="section-shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-20">
          <div className="about-copy">
            <p className="about-kicker"><span /> About me</p>
            <h2 className={rowan.className} style={{ fontFamily: rowan.style.fontFamily, fontStyle: "italic", fontWeight: 400 }}>
              <span className="!block !ml-0">Beyond</span>
              <span className="mt-[0.10em] !block">the Code.</span>
            </h2>

            <div className="about-editorial">
              <p>
                I’m <em>Hamza Imtiaz</em>, a software developer interested in the moment
                when an intricate idea becomes clear, useful and natural to use.
              </p>
              <p>
                I work across web and mobile applications, finding the balance between
                considered design, sound engineering and the real needs of the people
                using a product.
              </p>
              <p>
                My approach is practical: understand the problem, remove unnecessary
                complexity, and build with enough care that the work continues to make
                sense long after it is released.
              </p>
            </div>
          </div>

          <AbstractSculpture />
        </div>
      </div>

      <style jsx>{`
        .about-editorial {
          max-width: 560px;
          margin-top: 34px;
        }

        .about-editorial p {
          margin: 0;
          color: #9ca7b4;
          font-family: var(--font-manrope);
          font-size: clamp(.94rem, 1.25vw, 1.04rem);
          line-height: 1.95;
          letter-spacing: -.006em;
        }

        .about-editorial p + p {
          margin-top: 16px;
        }

        .about-editorial p:first-child {
          color: #eef3f7;
          font-size: clamp(1.02rem, 1.5vw, 1.16rem);
          line-height: 1.82;
        }

        .about-editorial em {
          color: #ffffff;
          font-family: var(--font-editorial);
          font-size: 1.16em;
          font-style: italic;
          letter-spacing: -.025em;
        }

        @media (max-width: 767px) {
          .about-editorial {
            margin-top: 28px;
          }

          .about-editorial p {
            line-height: 1.82;
          }

          .about-editorial p + p {
            margin-top: 14px;
          }
        }
      `}</style>
    </section>
  );
}
